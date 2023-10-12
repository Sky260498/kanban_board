import { Column, Id } from "../Type";
import PlusIcon from "../icons/PlusIcon";
import { useMemo, useState } from "react";
import ColumnConatainer from "./ColumnConatainer";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function generateId() {
  return Math.floor(Math.random() * 10001);
}

function KanbanBoard() {
  const [column, setColumn] = useState<Column[]>([]);
  const columnIds = useMemo(() => column.map((col) => col.id), [column]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

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

  function updateTitle(id: Id, title: string) {
    const newColumn = column.map(col => {
      if(col.id !== id) return col;
      return {...col, title};
    });

    setColumn(newColumn);
  }

  function onDragStart(event: DragStartEvent) {
    if(event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if(!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if(activeColumnId === overColumnId) return;

    setColumn(column => {
      const activeColumnIndex = column.findIndex(col => col.id === activeColumnId)
      const overColumnIndex = column.findIndex(col => col.id === overColumnId);

      return arrayMove(column, activeColumnIndex, overColumnIndex);
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      }
    })
  )

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
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors}>
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
              column.map((col)=>(<ColumnConatainer key={col.id} column={col} deleteColumn={deleteColumn} updateTitle={updateTitle}/>))
            }
          </SortableContext>
        </div>       
      </div>
      {createPortal(
        <DragOverlay>
        {activeColumn && <ColumnConatainer column={activeColumn} deleteColumn={deleteColumn} updateTitle={updateTitle}></ColumnConatainer>}
      </DragOverlay>, document.body
      )}
      </DndContext>
    </div>
  )
}

export default KanbanBoard