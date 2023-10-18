import { useState } from "react";
import { Id, Task } from "../Type"
import DeleteIcon from "../icons/DeleteIcon";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

interface Props {
    task: Task,
    deleteTask: (id:Id) => void,
    updateTaskTitle: (id:Id, title:string) => void;
    updateTaskDescription: (id:Id, description:string) => void;
}

function TaskCard(props: Props) {
  const [mouseOver, setMouseOver] = useState(false);
  const {task, deleteTask, updateTaskTitle, updateTaskDescription} = props;
  const [editMode, setEditMode] = useState(false);
  const [editDescMode, setEditDescMode] = useState(false);

  function toggleEditMode(isTitle:boolean) {
    isTitle ? setEditMode((prev) => !prev) : setEditDescMode((prev) => !prev);
    setMouseOver(false);
  }

  function checkPriority(value:string, valueFor:string) {
    switch (value) {
        case "low":
            return valueFor === "border" ? "border-green-600": "text-lime-500";
        case "medium":
            return valueFor === "border" ? "border-yellow-600": "text-yellow-500";
        case "high":
            return valueFor === "border" ? "border-red-600": "text-rose-600";
        default:
            break;
    }
  }

  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task
        },
        disabled: editMode
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    if(isDragging) {
        return (
            <div 
    ref={setNodeRef}
    style={style}
    {...attributes} 
    {...listeners}
    className={`flex flex-col border-t-2 my-2 p-2 bg-mainBackgroundColor rounded hover:ring-1 opacity-50 border-t-pink-200`}>
        <div className="flex justify-between align-middle">
            <h2 className={`${checkPriority(task.priority,"text")}`} onClick={() => toggleEditMode(true)}>{task.title}</h2>            
        </div>
        <p>{task.description}</p>
    </div>
        );
    }

    if(editMode) {
        return (
            <div 
            ref={setNodeRef}
            style={style}
            {...attributes} {...listeners}
    className={`flex flex-col border-t-2 my-2 p-2 bg-mainBackgroundColor rounded hover:border-teal-50 ${checkPriority(task.priority,"border")}`}>
        <div className="flex justify-between align-middle">
            <input className="text-black w-full mb-2" type="text" value={task.title} autoFocus
            onChange={(e)=> updateTaskTitle(task.id, e.target.value)}
            onKeyDown={(e) => {
                    if(e.key !== "Enter")return;
                    toggleEditMode(true);
                }} onBlur={()=> {
                    toggleEditMode(true);   
                }}/>
        </div>
        <p>{task.description}</p>
    </div>
        );
    }

    if(editDescMode) {
        return (
            <div 
            ref={setNodeRef}
            style={style}
            {...attributes} {...listeners}
    className={`flex flex-col border-t-2 my-2 p-2 bg-mainBackgroundColor rounded hover:border-teal-50 ${checkPriority(task.priority,"border")}`}>
        <div className="flex justify-between align-middle">
        <h2 className={`${checkPriority(task.priority,"text")}`}>{task.title}</h2>
        </div>
        <p><textarea className="text-black w-full mt-2" placeholder={task.description} value={task.description} autoFocus
            onChange={(e)=> updateTaskDescription(task.id, e.target.value)}
            onKeyDown={(e) => {
                    if(e.key !== "Enter")return;
                    toggleEditMode(false);
                }} onBlur={()=> {
                    toggleEditMode(false);   
                }}/></p>
    </div>
        );
    }

  return (
    <div 
    ref={setNodeRef}
    style={style}
    {...attributes} 
    {...listeners}
    onMouseOver={()=>{
        setMouseOver(true);
    }} 
    onMouseLeave={()=>{
        setMouseOver(false);
    }}
    className={`flex flex-col border-t-2 my-2 p-2 bg-mainBackgroundColor rounded hover:border-teal-50 ${checkPriority(task.priority,"border")}`}>
        <div className="flex justify-between align-middle">
            <h2 className={`${checkPriority(task.priority,"text")}`} onClick={() => toggleEditMode(true)}>{task.title}</h2>
            {mouseOver && <button onClick={()=>{
                deleteTask(task.id);
            }} className="ml-auto stroke-gray-500 hover:stroke-white h-4 hover:bg-columnBackgroundColor px-1 py-1 rounded-md">
                <DeleteIcon />
            </button>}
        </div>
        <p className="mt-2" onClick={() => toggleEditMode(false)}>{task.description}</p>
    </div>
  )
}

export default TaskCard