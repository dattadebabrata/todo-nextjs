import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import StaticService from "@/services/static.service"; // Import uuid for generating unique IDs

const todoSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 }, // Generate a unique ID for each todo
    title: { type: String, required: true },
    status: {
        type: String,
        default: 'todo', // Default to the value from StaticService
        validate: {
            validator: function(value) {
                return StaticService.taskStatusList.some(item => item.value === value); // Validate against StaticService
            },
            message: props => `${props.value} is not a valid status!`, // Error message for invalid status
        },
    },
    priority: {
        type: String,
        default: 'low', // Default to the value from StaticService
        validate: {
            validator: function(value) {
                return StaticService.taskPriorityList.some(item => item.value === value); // Validate against StaticService
            },
            message: props => `${props.value} is not a valid priority!`, // Error message for invalid priority
        },
    },
    createdAt: { type: Date, default: Date.now },
});

// Export the Todo model, using the generated unique ID at schema level
export const Todo = mongoose.models?.Todos || mongoose.model("Todos", todoSchema);
