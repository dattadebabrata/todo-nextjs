import "./ColumnComponent.scss";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import TaskComponent from "@/components/task/TaskComponent";

interface ColumnComponentProps {
    tasks: any;
}

const ColumnComponent = (props: ColumnComponentProps) => {
    const {tasks} = props;
    return (
        <div className={'column-component'}>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {tasks?.map((task) => {
                    return <TaskComponent key={task.id} id={task.id} title={task.title}/>
                })}
            </SortableContext>
        </div>
    );

};

export default ColumnComponent;
