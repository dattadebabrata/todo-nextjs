import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs

const todoSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 }, // Generate a unique ID for each todo
    title: { type: String, required: true },
    status: { type: String, default: 'Pending' },//Pending,Progress,Done
    priority: { type: String, default: 'Low' },
    createdAt: { type: Date, default: Date.now },
});

// Export the Todo model, using the generated unique ID at schema level
export const Todo = mongoose.models?.Todos || mongoose.model("Todos", todoSchema);
