import BreakTime from "@/components/popups/master/shift/BreakTime";
import QueryTable from "@/components/table/QueryTable";
import { Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";

export default function Break({ setNew_break, new_break, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [popupOpen, setPopupOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const deleteBreakTime = (id) => {
    setDeleteId(id);
    setDeletePopup(true);
  };

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
        cell: ({ row }) => {
          const parseTime = (time) => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes; 
          };

          const startTime = row.original.start_time;
          const endTime = row.original.end_time;

          if (!startTime || !endTime) {
            return "N/A";
          }

          const startMinutes = parseTime(startTime);
          const endMinutes = parseTime(endTime);

          const duration = Math.abs(endMinutes - startMinutes);
          return `${duration} mins`;
        },
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => deleteBreakTime(row.original.id)}
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
        setNew_break={setNew_break}
        new_break={new_break}
      />
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        selectedId={deleteId}
        type={"break"}
        setNew_break={setNew_break}
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
      {error && <h2 className="text-sm text-red-500">{error}</h2>}
      <QueryTable columns={columns} list={new_break || []} />
    </>
  );
}
