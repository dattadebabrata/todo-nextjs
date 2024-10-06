import ImageConfig from "@/constants/ImageConfig";
import { IconBaseProps } from "react-icons";
import {TaskStatus} from "@/models/todo.model"; // Ensure this is imported

// Define the structure for task status
export interface ITaskStatus {
    label: string;
    value: TaskStatus;
}

// Creating the task status object directly
const taskStatus: Record<TaskStatus, ITaskStatus> = {
    [TaskStatus.TODO]: {
        label: 'Todo',
        value: TaskStatus.TODO,
    },
    [TaskStatus.IN_PROGRESS]: {
        label: 'In Progress',
        value: TaskStatus.IN_PROGRESS,
    },
    [TaskStatus.DONE]: {
        label: 'Done',
        value: TaskStatus.DONE,
    }
};

// Define enum for task priorities
export enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

// Define the structure for task priority
export interface ITaskPriority {
    label: string;
    value: TaskPriority;
    icon: (props: IconBaseProps) => JSX.Element; // Assuming IconBaseProps is defined somewhere
}

// Creating the task priority object directly
const taskPriority: Record<TaskPriority, ITaskPriority> = {
    [TaskPriority.LOW]: {
        label: 'Low',
        value: TaskPriority.LOW,
        icon: ImageConfig.LowPriority,
    },
    [TaskPriority.MEDIUM]: {
        label: 'Medium',
        value: TaskPriority.MEDIUM,
        icon: ImageConfig.MediumPriority,
    },
    [TaskPriority.HIGH]: {
        label: 'High',
        value: TaskPriority.HIGH,
        icon: ImageConfig.HighPriority,
    }
};

// Creating lists for easier mapping
const taskStatusList = Object.values(taskStatus);
const taskPriorityList = Object.values(taskPriority);

const StaticService = {
    taskStatus,
    taskStatusList,
    taskPriority,
    taskPriorityList
};

export default StaticService;
