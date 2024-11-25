import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Plus,Search,MoveDiagonal,Trash2} from "lucide-react";
import QueryTable from "@/components/table/QueryTable";
import Reassign from '../popups/master/roster/Calendar/Reassign';

function CalendarEmployees() {
    const [keyword, setKeyword] = useState('')
    const [popupOpen,setPopupOpen] = useState(false)

    const list=[{
        id:1,
        name:'John',
    },{
        id:2,
        name:'Stanly',
    },

]
    
  const columns = React.useMemo(
    () => [
      {
        header: "Emp.ID",
        accessorKey: "id",
        cell: ({ row }) => row.original?.id|| "N/A",
      },
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <p className="whitespace-nowrap">
            {row.original?.name ?? "N/A"}
          </p>
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                setPopupOpen(true)
              }}
              className="flex cursor-pointer items-center justify-center rounded-lg bg-black p-2 text-white px-4"
            >Re-Assign
              {/* <Files className="size-3" /> */}
            </button>
            <button
              type="button"
              onClick={() => {
                setDeletePopup(true);
                setSelectedField(row.original?.roster_details?.roster_id);
              }}
              className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );
  return (
    <div className='flex flex-col p-2 overflow-y-auto overflow-y-min h-full overflow-x-hidden'>
        <Reassign
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        />
        <div className="flex items-center gap-2 text-white justify-between">
            <p className='text-black font-semibold text-[1rem]'>Employees</p>
            <div className='flex gap-2'>
            <label className="input flex h-10 min-h-10 min-w-40 flex-row items-center gap-2 rounded-md border border-gray-platinum outline-none hover:border-gray-platinum">
            <Search
              className="size-4 object-contain text-gray-dark"
              strokeWidth={2}
            />
            <input
              type="text"
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              value={keyword}
              className="grow text-sm text-black placeholder:text-sm placeholder:font-medium placeholder:text-black/50 focus:outline-none"
              placeholder="Search"
            />
          </label>
          <Link
            to="/admin/recruiter/jobs/post"
            className="flex w-10 min-w-10 h-10 min-h-10 items-center justify-center rounded bg-hrmprimaryorange text-xs font-semibold text-white hover:bg-hrmblue"
          >
            <Plus className="size-4" strokeWidth={1.5} />
          </Link>
          
            </div>
          
        </div>
        <div className='mt-2'>
        <QueryTable
            columns={columns}
            list={list}
          />
        </div>
      
    </div>
  )
}

export default CalendarEmployees
