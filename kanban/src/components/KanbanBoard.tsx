import { Column, Id } from "../Type";
import PlusIcon from "../icons/PlusIcon";
import { useMemo, useState } from "react";
import ColumnConatainer from "./ColumnConatainer";
import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function generateId() {
  return Math.floor(Math.random() * 10001);
}

function KanbanBoard() {
  const [column, setColumn] = useState<Column[]>([]);
  const columnIds = useMemo(() => column.map((col) => col.id), [column]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
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

  function onDragStart(event: DragStartEvent) {
    if(event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
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
      <DndContext onDragStart={onDragStart}>
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
          <SortableContext items={columnIds}>

            {
              column.map((col)=>(<ColumnConatainer key={col.id} column={col} deleteColumn={deleteColumn}/>))
            }
          </SortableContext>
        </div>       
      </div>
      {createPortal(
        <DragOverlay>
        {activeColumn && <ColumnConatainer column={activeColumn} deleteColumn={deleteColumn}></ColumnConatainer>}
      </DragOverlay>, document.body
      )}
      </DndContext>
    </div>
  )
}

export default KanbanBoard