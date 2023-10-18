import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "../Type"
import DeleteIcon from "../icons/DeleteIcon";
import { CSS } from "@dnd-kit/utilities"
import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

interface Props {
    column: Column,
    deleteColumn: (id:Id) => void;
    updateTitle: (id:Id, title: string) => void;
    createTask: (columnId:Id) => void;
    tasks: Task[];
    deleteTask: (id:Id) => void;
    updateTaskTitle: (id:Id, title:string) => void;
    updateTaskDescription: (id:Id, description:string) => void;
}

function ColumnConatainer(props: Props) {
    const {column, deleteColumn, updateTitle, createTask, tasks, deleteTask, updateTaskTitle, updateTaskDescription} = props;
    const [editMode, setEditMode] = useState(false);
    const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);
    const {setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column
        },
        disabled: editMode
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    if(isDragging) {
        return (
            <div ref={setNodeRef}
            style={style} className="bg-columnBackgroundColor w-[350px] h-[500px] my-4 p-1 rounded-md flex flex-col border-2 border-rose-500"></div>
        );
    }

  return (
    <div 
    ref={setNodeRef}
    style={style}
    className="text-white bg-columnBackgroundColor w-[350px] min-h-[500px] my-4 p-1 rounded-md flex flex-col">
        <div onClick={()=>{
            setEditMode(true);
        }} {...attributes} {...listeners} className="flex items-center gap-2 p-3 bg-mainBackgroundColor rounded-md">
            <div className="bg-columnBackgroundColor py-1 px-2 rounded-md">
                {tasks.length}
            </div>
            <div>
                {!editMode && column.title}
                {editMode && <input className="text-black" type="text" value={column.title} autoFocus onChange={(e) => updateTitle(column.id, e.target.value)} onKeyDown={(e) => {
                    if(e.key !== "Enter")return;
                    setEditMode(false);
                }} onBlur={()=> {
                    setEditMode(false)
                }}/>}
            </div>
            <button onClick={()=>deleteColumn(column.id)} className="ml-auto stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor px-1 py-1 rounded-md">
                <DeleteIcon />
            </button>
        </div>
        <div className="flex-1">
            <SortableContext items={taskIds}>
            {
                tasks.map(task => <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTaskTitle={updateTaskTitle} updateTaskDescription={updateTaskDescription}/>)
            }
            </SortableContext>
        </div>
        <button className="mt-auto flex items-center p-3 justify-center bg-mainBackgroundColor rounded-md hover:bg-black" onClick={() => createTask(column.id)}>
            <PlusIcon />
            <span className="mx-1">Add Task</span>
        </button>
    </div>
  )
}

export default ColumnConatainer