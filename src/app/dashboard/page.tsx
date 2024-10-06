'use client'
import {useCallback, useEffect, useState} from "react";
import ButtonComponent from "@/components/button/ButtonComponent";
import "./page.scss";
import ImageConfig from "@/constants/ImageConfig";
import TextAreaComponent from "@/components/text-area/TextAreaComponent";
import MenuDropdownComponent, {MenuDropdownItems, MenuLabel} from "@/components/menu-dropdown/MenuDropdownComponent";
import {ColorConfig} from "@/constants";
import StaticService from "@/services/static.service";
import {TaskObject, TaskPriority, TaskStatus} from "@/models/todo.model";

interface TaskConfigTypes {
    status: TaskStatus | null; // Directly use TaskStatus enum
    taskId: string | null;
    priority: TaskPriority | null; // Directly use TaskPriority enum
}

const initialTaskConfig: TaskConfigTypes = {
    status: null,
    taskId: null,
    priority: TaskPriority.LOW
};

export default function Page() {
    const [task, setTask] = useState<(TaskObject & { isEdit?: boolean })[]>([]);
    const [input, setInput] = useState('');
    const [taskConfig, setTaskConfig] = useState<TaskConfigTypes>(initialTaskConfig);

    const handleAddTask = useCallback(async (status: TaskStatus) => {
        try {
            const response = await fetch('/dashboard/api', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title: input, status, priority: taskConfig.priority}),
            });

            const result = await response.json();
            if (response.ok) {
                setTask([...task, result.data]);
                setInput('');
            }
        } catch (err) {
            console.error('An error occurred during add.', err);
        }
    }, [input, task, taskConfig.priority]);

    const getAllTask = useCallback(async () => {
        try {
            const response = await fetch('/dashboard/api', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });

            const result = await response.json();
            if (response.ok) {
                setTask(result.data);
            }
        } catch (err) {
            console.error(err, 'error occurred');
        }
    }, []);

    const handleEditTask = (taskId: string) => {
        const taskStatus = task.find(t => t.id === taskId)?.status;
        const taskTitle = task.find(t => t.id === taskId)?.title || '';

        if (taskStatus) {
            setTaskConfig((prev) => {
                return {...prev, status: taskStatus, taskId};
            });
            setInput(taskTitle);
        }
    };

    const handleUpdateTask = async (taskConfig: TaskConfigTypes) => {
        try {
            const response = await fetch(`/dashboard/api`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({taskId: taskConfig.taskId, title: input, priority: taskConfig.priority}),
            });

            const result = await response.json() as TaskObject;
            if (response.ok) {
                setTask(task.map(t => t.id === taskConfig.taskId ? {...t, ...result.data} : t));
                setTaskConfig(initialTaskConfig);
                setInput('');
            }
        } catch (err) {
            console.error('An error occurred during task update.', err);
        }
    };

    const handleDeleteTask = useCallback(async (taskId) => {
        try {
            const response = await fetch(`/dashboard/api`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({taskId}),
            });

            const result = await response.json();
            if (response.ok) {
                setTask(task.filter(t => t.id !== taskId));
            }
        } catch (err) {
            console.error('An error occurred during delete task.', err);
        }
    }, [task]);

    useEffect(() => {
        getAllTask();
    }, [getAllTask]);

    const renderTasks = (status) => (
        task.filter(t => t.status === status).map((task) => {
            const CurrentPriority = StaticService.taskPriority[task.priority].icon;
            return <div key={task.id} className={`todo-item todo-with-action-wrapper ${task.status}`}>
                {taskConfig.taskId === task.id ? (
                    <TextAreaComponent
                        value={input}
                        onChange={setInput}
                        placeholder="Enter task title"
                        autoFocus
                        minRows={1}
                        autoSize
                    />
                ) : (
                    <div className={'task-title'}>{task.title}</div>
                )}

                <MenuDropdownComponent
                    withArrow={false}
                    trigger={"click"}
                    position={'bottom'}
                    target={
                        <div className={'todo-more-cra'}>
                            <ImageConfig.MoreIcon/>
                        </div>
                    }
                >
                    <MenuLabel>Options</MenuLabel>
                    <MenuDropdownItems
                        color={'primary'}
                        leftElement={<ImageConfig.EditIcon/>}
                        onClick={() => handleEditTask(task.id)}
                    >
                        Edit
                    </MenuDropdownItems>
                    <MenuDropdownItems
                        color={ColorConfig.error}
                        onClick={() => handleDeleteTask(task.id)}
                        leftElement={<ImageConfig.DeleteIcon/>}
                    >
                        Delete
                    </MenuDropdownItems>
                </MenuDropdownComponent>

                <div className="todo-action">
                    <div className="todo-left-action">
                        <MenuDropdownComponent target={
                            <div className="task-priority">
                                <CurrentPriority/>
                            </div>
                        }>
                            {
                                StaticService.taskPriorityList.map((taskPriority) => {
                                    return (
                                        <MenuDropdownItems
                                            key={taskPriority.value}
                                            leftElement={<taskPriority.icon/>}
                                            onClick={() => {
                                                setTaskConfig((prev) => {
                                                    const updatedTask = {
                                                        ...prev,
                                                        priority: taskPriority.value as TaskPriority, // Ensure taskPriority.value is of type TaskPriority
                                                        taskId: task.id,
                                                    }
                                                    handleUpdateTask(updatedTask);
                                                    return updatedTask
                                                });
                                            }}
                                        >
                                            {StaticService.taskPriority[taskPriority.value].label}
                                        </MenuDropdownItems>
                                    );
                                })
                            }
                        </MenuDropdownComponent>
                    </div>
                    <div className="todo-right-action">
                        <ImageConfig.CheckIcon
                            onClick={() => handleUpdateTask(taskConfig)}/>
                        <ImageConfig.CrossIcon/>
                    </div>
                </div>
            </div>
        })
    );

    return (
        <div className={'dashboard-screen'}>
            <h1>Dashboard</h1>
            <section>
                <div className="todos-wrapper">
                    {StaticService.taskStatusList.map(({value: status, label}) => {
                        const CurrentPriority = StaticService.taskPriority[taskConfig.priority].icon;
                        return <div key={status} className={`todo-section-container ${status.toLowerCase()}-section`}>
                            <div className="todo-section-heading">{label}</div>
                            <div className="todos-list">{renderTasks(status)}</div>
                            {taskConfig.status === status && !taskConfig.taskId ? (
                                <div className="todo-text-area todo-with-action-wrapper">
                                    <TextAreaComponent
                                        value={input}
                                        onChange={setInput}
                                        placeholder={"Enter task title"}
                                        autoFocus
                                        minRows={1}
                                        autoSize={true}
                                    />
                                    <div className="todo-action">
                                        <div className="todo-left-action">
                                            <MenuDropdownComponent target={
                                                <div className="task-priority">
                                                    <CurrentPriority/>
                                                </div>
                                            }>
                                                {
                                                    StaticService.taskPriorityList.map((taskPriority) => {
                                                        return <MenuDropdownItems
                                                            key={taskPriority.value}
                                                            leftElement={<taskPriority.icon/>}
                                                            onClick={() => setTaskConfig((prev) => {
                                                                return {
                                                                    ...prev,
                                                                    priority: taskPriority.value as TaskPriority
                                                                }
                                                            })}
                                                        >
                                                            {StaticService.taskPriority[taskPriority.value].label}
                                                        </MenuDropdownItems>
                                                    })
                                                }
                                            </MenuDropdownComponent>
                                        </div>
                                        <div className="todo-right-action">
                                            <ImageConfig.CheckIcon
                                                onClick={() => handleAddTask(status)}/>
                                            <ImageConfig.CrossIcon/>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="todo-add-cra">
                                    <ButtonComponent
                                        onClick={() => setTaskConfig((prev) => {
                                            setInput('')
                                            return {...prev, status, taskId: null}
                                        })}
                                        variant={"outline"}
                                        color={"primary"}
                                        fullWidth
                                    >
                                        Add New
                                    </ButtonComponent>
                                </div>
                            )}
                        </div>
                    })}
                </div>
            </section>
        </div>
    );
}
