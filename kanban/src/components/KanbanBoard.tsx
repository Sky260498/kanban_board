import { Column, Id } from "../Type";
import PlusIcon from "../icons/PlusIcon";
import { useState } from "react";
import ColumnConatainer from "./ColumnConatainer";

function generateId() {
  return Math.floor(Math.random() * 10001);
}

function KanbanBoard() {
  const [column, setColumn] = useState<Column[]>([]);
  console.log(column);
  function createNewColumn() {

    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${column.length + 1}`
    };
    
    setColumn([...column, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumn = column.filter((col)=> col.id!==id);
    setColumn(filteredColumn);
  }

  return (
    <div
    className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center
    overflow-x-auto
    overflow-y-hidden
    px-[40px]
    ">
      <div className="m-auto">
      <button 
        onClick={() => {
          createNewColumn();
        }}
        className="
        my-2
        h-[60px]
        cursor-pointer
        rounded-lg
        bg-mainBackgroundColor
        border-2
        border-columnBackgroundColor
        p-4
        ring-rose-500
        hover:ring-2
        flex
        gap-2
        ">
          <PlusIcon/>  Add Column
        </button>
     <div className="flex gap-2">
        {
          column.map((col)=>(<ColumnConatainer key={col.id} column={col} deleteColumn={deleteColumn}/>))
        }
     </div>
       
      </div>
    </div>
  )
}

export default KanbanBoard