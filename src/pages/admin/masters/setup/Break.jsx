import BreakTime from '@/components/popups/master/shift/BreakTime';
import QueryTable from '@/components/table/QueryTable';
import { Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { newFormRequest, newRequest, XFormRequest } from "@/api";
import { SHIFT_BREAK_TIME,SHIFT_LIST } from "@/api/setup";
import { useQuery } from "@tanstack/react-query";

export default function Break({ formtype, sid ,break_time, setBreak_time, setNew_break,new_break}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [popupOpen, setPopupOpen] = useState(false);
    
// if(shiftbreaktime){
//   setBreak_time(shiftbreaktime)
// }

    const [totalPages, setTotalPages] = useState(10);
    const handleCreate = () => {
        setPopupOpen(true);
      };
    const columns = React.useMemo(
        () => [
          {
            header: "Name",
            accessorKey: "type_name",
          },
          {
            header: "Pay Mode",
            accessorKey: "pay_node",
            cell: ({ row }) => row.original.pay_node || "N/A",
          },
          {
            header: "Start Time",
            accessorKey: "start_time",
            cell: ({ row }) => row.original.start_time || "N/A",
          },
          {
            header: "End Time",
            accessorKey: "end_time",
            cell: ({ row }) => row.original.end_time || "N/A",
          },
          {
            header: "Duration",
            accessorKey: "duration",
            cell: ({ row }) => row.original.shiftDetails || "N/A",
          },
          {
            header: "Action",
            accessorKey: "action",
            cell: ({ row }) => (
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
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
    <>
    <BreakTime
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        break_time={break_time}
        setBreak_time={setBreak_time}
        setNew_break={setNew_break}
        new_break={new_break}
      />
      <div className="my-1 flex w-full items-center justify-between">
                <h1 className="text-lg font-bold">Break Time</h1>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCreate}
                    className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-[#030E5C]/70"
                  >
                    <Plus className="size-4" />
                    Add Break Time
                  </button>
                </div>
              </div>
              <QueryTable
                columns={columns}
                list={break_time.data || []}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
    </>
  )
}
