import { useState } from "react";
import { Task } from "../Type"
import DeleteIcon from "../icons/DeleteIcon";

interface Props {
    task: Task,
    // deleteTask: (id:Id) => void,
}

function TaskCard(props: Props) {
  const [mouseOver, setMouseOver] = useState(false);
  const {task} = props;
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
  return (
    <div 
    onMouseOver={()=>{
        setMouseOver(true);
    }} 
    onMouseLeave={()=>{
        setMouseOver(false);
    }}
    className={`flex flex-col border-t-2 my-2 p-2 bg-mainBackgroundColor rounded hover:ring-1 hover:ring-inset ${checkPriority(task.priority,"border")}`}>
        <div className="flex justify-between align-middle">
            <h2 className={`${checkPriority(task.priority,"text")}`}>{task.title}</h2>
            {mouseOver && <button onClick={()=>{
                // deleteTask(task.id);
            }} className="ml-auto stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor px-1 py-1 rounded-md">
                <DeleteIcon />
            </button>}
        </div>
        <p>{task.description}</p>
    </div>
  )
}

export default TaskCard