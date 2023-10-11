import { Column, Id } from "../Type"
import DeleteIcon from "../icons/DeleteIcon";

interface Props {
    column: Column,
    deleteColumn: (id:Id) => void;
}

function ColumnConatainer(props: Props) {
    const {column, deleteColumn} = props;
    
  return (
    <div className="text-white bg-columnBackgroundColor w-[350px] h-[500px] my-4 p-1 rounded-md flex flex-col">
        
        <div className="flex items-center gap-2 p-3 bg-mainBackgroundColor rounded-md">
            <div className="bg-columnBackgroundColor py-1 px-2 rounded-md">
                0
            </div>
            <div>
                {column.title}
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