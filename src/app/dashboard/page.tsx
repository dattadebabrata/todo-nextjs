'use client'
import {closestCorners, DndContext, DragEndEvent} from "@dnd-kit/core";
import {useCallback, useEffect, useState} from "react";
import ColumnComponent from "@/components/column/ColumnComponent";
import {arrayMove} from "@dnd-kit/sortable";
import InputComponent from "@/components/form-controls/input/InputComponent";
import ButtonComponent from "@/components/button/ButtonComponent";
import "./page.scss"
import TextAreaComponent from "@/components/form-controls/text-area/TextAreaComponent";
import ImageConfig from "@/constrant/ImageConfig";
import {CgMoreVerticalO as MoreIcon} from "react-icons/cg";
import {MdDeleteOutline as DeleteIcon} from "react-icons/md";

const initialTaskConfig = {
    status: "",
    // input: ""
}
export default function Page() {
    const [task, setTask] = useState([]);
    const [input, setInput] = useState('');
    const [taskConfig, setTaskConfig] = useState(initialTaskConfig);
    const handleAddTask = useCallback(async (status: "Pending" | "Progress" | "Done" = "Pending") => {
        try {
            const response = await fetch('/dashboard/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title: input, status}),
            });

            const result = await response.json();
            if (response.ok) {
                setTask([...task, result.data])
                setInput('');
            } else if (result.error) {
            }
            console.log('the logs', result)
        } catch (err) {
            setError('An error occurred during add.');
        }

    }, [input, task]);
    const getAllTask = useCallback(async () => {
        try {
            const response = await fetch('/dashboard/api', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            if (response.ok) {
                setTask(result.data)
            } else if (result.error) {
            }
            console.log('the logs', result)
        } catch (err) {
            setError('An error occurred during get task.');
        }
    }, [])

    const handleTaskConfig = useCallback((status: "Pending" | "Progress" | "Done") => {
        setTaskConfig({
            status
        })
    }, [])
    const handleDeleteTask=useCallback(async(taskId:string|number)=>{
        try {
            const response = await fetch(`/dashboard/api`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({taskId}),
            });

            const result = await response.json();
            if (response.ok) {
                setTask(task.filter(task => task.id!== taskId))
            } else if (result.error) {
            }
            console.log('the logs', result)
        } catch (err) {
            // setError('An error occurred during delete task.');
        }
    },[task])
    // const getTaskPos = useCallback((id) => {
    //     return task.findIndex((task) => task.id === id);
    // }, [task])
    // const handleDragEnd = useCallback((event: DragEndEvent) => {
    //     const {active, over} = event;
    //     console.log(event, 'the event')
    //     if (active.id === over?.id) return;
    //     setTask((prev) => {
    //         const originalPos = getTaskPos(active.id);
    //         const newPos = getTaskPos(over?.id);
    //         return arrayMove(task, originalPos, newPos);
    //     })
    // }, [getTaskPos, task])
    useEffect(() => {
        getAllTask();
    }, [getAllTask]);
    return <div className={'dashboard-screen'}>
        <h1>Dashboard</h1>
        <div className="add-task-wrapper">
            <InputComponent type={'text'} value={input} onChange={(value) => setInput(value)}/>
            <ButtonComponent onClick={handleAddTask}>Add</ButtonComponent>
        </div>
        <section title={'todos'}>
            <div className="todos-wrapper">
                <div className="todo-section-container todo-section">
                    <div className="todo-section-heading">Todo</div>
                    <div className="todos-list">
                        {task.filter(task => task.status === "Pending").map((task) => (
                            <div key={task.id} className={`todo-item ${task.status}`}>
                                <div>{task.title}</div>
                                <div className={'todo-more-cra'}>
                                    <ImageConfig.DeleteIcon onClick={()=>handleDeleteTask(task.id)}/>
                                </div>
                            </div>
                        ))}
                    </div>
                    {taskConfig.status === "Pending" ? <div className="todo-text-area">
                            <TextAreaComponent
                                fullWidth
                                rows={3}
                                autoFocus
                                value={input}
                                onChange={(value) => setInput(value)}
                                onEnterPress={() => {
                                    if (taskConfig.status) {
                                        handleAddTask(taskConfig.status)
                                    }
                                }}
                            />
                        </div> :
                        <div className="todo-add-cra">
                            <ButtonComponent size={'xs'}
                                             fullWidth
                                             onClick={() => handleTaskConfig('Pending')}
                                             variant={'outlined'}
                                             color={'primary'}>
                                Add new
                            </ButtonComponent>
                        </div>
                    }
                </div>
                <div className="todo-section-container in-progress-section">
                    <div className="todo-section-heading">In progress</div>
                    <div className="todos-list">
                        {task.filter(task => task.status === "Progress").map((task) => (
                            <div key={task.id} className={`todo-item ${task.status}`}>
                                <div>{task.title}</div>
                            </div>
                        ))}
                    </div>
                    {taskConfig.status === "Progress" ?
                        <div className="todo-text-area">
                            <TextAreaComponent
                                fullWidth
                                rows={3}
                                autoFocus
                                value={input}
                                onChange={(value) => setInput(value)}
                                onEnterPress={() => {
                                    if (taskConfig.status) {
                                        handleAddTask(taskConfig.status)
                                    }
                                }}
                            />
                        </div>
                        :
                        <div className="todo-add-cra">
                            <ButtonComponent
                                size={'xs'}
                                fullWidth
                                variant={'outlined'}
                                onClick={() => handleTaskConfig('Progress')}
                                color={'primary'}>
                                Add new
                            </ButtonComponent>
                        </div>
                    }
                </div>
                <div className="todo-section-container task-done-section">
                    <div className="todo-section-heading">Done</div>
                    <div className="todos-list">
                        {task.filter(task => task.status === "Done").map((task) => (
                            <div key={task.id} className={`todo-item ${task.status}`}>
                                <div>{task.title}</div>
                            </div>
                        ))}
                    </div>
                    {taskConfig.status === "Done" ? <div className="todo-text-area">
                            <TextAreaComponent
                                fullWidth
                                rows={3}
                                autoFocus
                                value={input}
                                onChange={(value) => setInput(value)}
                                onEnterPress={() => {
                                    if (taskConfig.status) {
                                        handleAddTask(taskConfig.status)
                                    }
                                }}
                            />
                        </div> :
                        <div className="todo-add-cra">
                            <ButtonComponent size={'xs'}
                                             fullWidth
                                             variant={'outlined'}
                                             onClick={() => handleTaskConfig('Done')}
                                             color={'primary'}>
                                Add new
                            </ButtonComponent>
                        </div>
                    }
                </div>
            </div>
        </section>
        {/*<DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>*/}
        {/*    <ColumnComponent tasks={task}/>*/}
        {/*</DndContext>*/}
    </div>
}
