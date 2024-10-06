import {NextRequest, NextResponse} from 'next/server';
import {connectToDatabase} from '@/lib/utils';
import {Todo} from '@/models/db/todoModel';
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
    try {
        // Parse request body
        const {title, status, priority} = await req.json();

        // Connect to the database
        await connectToDatabase();

        // Check if the todo with the same title exists
        const existingTodo = await Todo.findOne({title});

        // If title already exists, return error
        if (existingTodo) {
            return NextResponse.json({error: 'Title already exists'}, {status: 409});
        }

        // Create new todo item
        const newTodo = await Todo.create({title, status, priority});

        // Return success response
        return NextResponse.json({message: 'Todo added successfully', data: newTodo}, {status: 201});
    } catch (error) {
        console.error('Error adding todo:', error);

        // Check for validation errors
        if (error.name === 'ValidationError') {
            const errorDetails = Object.keys(error.errors).map((key) => {
                return {
                    field: key,
                    message: error.errors[key].message, // Use the specific validation message
                };
            });

            // Create a dynamic error message based on the validation errors
            const dynamicErrorMessage = errorDetails.map(err => `${err.field}: ${err.message}`).join(', ');

            return NextResponse.json({error: dynamicErrorMessage, details: errorDetails}, {status: 400});
        }
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}

export async function GET(req: NextRequest) {
    try {
        // Connect to the database
        await connectToDatabase();

        // Fetch all todos
        const todos = await Todo.find({});

        // Return the todos in the response
        return NextResponse.json({message: 'Success', data: todos}, {status: 200});
    } catch (error) {
        console.error('Error fetching todos:', error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const {taskId} = await req.json();

        // Ensure the taskId is provided
        if (!taskId) {
            return NextResponse.json({error: 'Task ID is required'}, {status: 400});
        }

        const result = await Todo.deleteOne({id: taskId});  // Assuming taskId is a UUID string now
        if (!result) {
            return NextResponse.json({error: 'Todo not found'}, {status: 404});
        }

        return NextResponse.json({message: 'Todo deleted successfully'}, {status: 200});
    } catch (error) {
        console.error("Error deleting todo:", error);
        return NextResponse.json({error: "Failed to delete todo"}, {status: 500});
    }
}

export async function PATCH(req: NextRequest) {
    try {
        // Parse request body
        const {taskId, title, status, priority} = await req.json();

        // Ensure the taskId is provided
        if (!taskId) {
            return NextResponse.json({error: 'Task ID is required'}, {status: 400});
        }

        // Connect to the database
        await connectToDatabase();

        // Prepare the update object (only update provided fields)
        const update: unknown = {};
        if (title) update.title = title;
        if (status) update.status = status;
        if (priority) update.priority = priority;

        // Check if a task with the same title exists (only if the title is being updated)
        if (title) {
            const existingTodo = await Todo.findOne({title});
            if (existingTodo && existingTodo.id.toString() !== taskId) {
                return NextResponse.json({error: 'Title already exists'}, {status: 409});
            }
        }

        // Find the task by taskId and update it
        const updatedTodo = await Todo.findOneAndUpdate(
            {id: taskId},      // Filter by taskId
            {$set: update},     // Update fields dynamically
            {new: true}         // Return the updated document
        );

        // If no task was found, return an error
        if (!updatedTodo) {
            return NextResponse.json({error: 'Task not found'}, {status: 404});
        }

        // Return the updated task
        return NextResponse.json({message: 'Task updated successfully', data: updatedTodo}, {status: 200});
    } catch (error) {
        console.error('Error updating todo:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errorDetails = Object.keys(error.errors).map((key) => ({
                field: key,
                message: error.errors[key].message, // Use the specific validation message
            }));

            // Create a dynamic error message based on the validation errors
            const dynamicErrorMessage = errorDetails.map(err => `${err.field}: ${err.message}`).join(', ');

            return NextResponse.json({error: dynamicErrorMessage, details: errorDetails}, {status: 400});
        }

        // Handle other known errors
        if (error instanceof mongoose.Error.CastError) {
            return NextResponse.json({error: 'Invalid Task ID format'}, {status: 400});
        }

        if (error.message.includes('ECONNREFUSED')) {
            return NextResponse.json({error: 'Database connection failed'}, {status: 500});
        }

        // Return generic server error for unexpected cases
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}
