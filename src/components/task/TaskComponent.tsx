import "./TaskComponent.scss";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

interface TaskComponentProps {
    id: number | string;
    title: string;
}

const TaskComponent = (props: TaskComponentProps) => {
    const {id, title} = props;
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    return (
        <div ref={setNodeRef} {...attributes} {...listeners}
             style={style}
             className={'task-component'}>
            <input type="checkbox" name={title} id={id as string} className={'check-box'}/>
            <span>{title}</span>
        </div>
    );

};

export default TaskComponent;
