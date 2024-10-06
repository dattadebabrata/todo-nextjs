import { IconBaseProps } from "react-icons";

// Define enums for task status and priority
export enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "progress",
    DONE = "done",
}

// Define the structure for task status
export interface ITaskStatus {
    label: string;
    value: TaskStatus;
}

// Define enums for task priorities
export enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

// Define the structure for task priority
export interface ITaskPriority {
    label: string;
    value: TaskPriority;
    icon: (props: IconBaseProps) => JSX.Element;
}

// Define the structure of a task object
export interface TaskObject {
    id: string;
    title: string;
    status: TaskStatus;  // Changed to use the TaskStatus enum
    priority: TaskPriority; // Changed to use the TaskPriority enum
    createdAt: Date; // Consider using string if you're dealing with serialized data
}
