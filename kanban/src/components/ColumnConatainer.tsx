import { useSortable } from "@dnd-kit/sortable";
import { Column, Id } from "../Type"
import DeleteIcon from "../icons/DeleteIcon";
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react";


interface Props {
    column: Column,
    deleteColumn: (id:Id) => void;
    updateTitle: (id:Id, title: string) => void;
}

function ColumnConatainer(props: Props) {
    const {column, deleteColumn, updateTitle} = props;
    const [editMode, setEditMode] = useState(false);
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
    className="text-white bg-columnBackgroundColor w-[350px] h-[500px] my-4 p-1 rounded-md flex flex-col">
        <div onClick={()=>{
            setEditMode(true);
        }} {...attributes} {...listeners} className="flex items-center gap-2 p-3 bg-mainBackgroundColor rounded-md">
            <div className="bg-columnBackgroundColor py-1 px-2 rounded-md">
                0
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
            content
        </div>
        <div className="mt-auto">
            Footer
        </div>
    </div>
  )
}

export default ColumnConatainer