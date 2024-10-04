import {NextRequest, NextResponse} from 'next/server';
import {connectToDatabase} from '@/lib/utils';
import {Todo} from '@/models/todoModel';

export async function POST(req: NextRequest) {
    try {
        // Parse request body
        const {title, status} = await req.json();

        // Connect to the database
        await connectToDatabase();

        // Check if the todo with the same title exists
        const existingTodo = await Todo.findOne({title});

        // If title already exists, return error
        if (existingTodo) {
            return NextResponse.json({error: 'Title already exists'}, {status: 409});
        }

        // Create new todo item
        const newTodo = await Todo.create({title, status});

        // Return success response
        return NextResponse.json({message: 'Todo added successfully', data: newTodo}, {status: 201});
    } catch (error) {
        console.error('Error adding todo:', error);
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
        const { taskId } = await req.json();

        // Ensure the taskId is provided
        if (!taskId) {
            return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
        }

        const result = await Todo.findByIdAndDelete(taskId);  // Assuming taskId is a UUID string now
        if (!result) {
            return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error deleting todo:", error);
        return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
    }
}
