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
        cell: ({ row }) => row.original.pay_node || "",
      },
      {
        header: "Start Time",
        accessorKey: "start_time",
        cell: ({ row }) => row.original.start_time || "00:00",
      },
      {
        header: "End Time",
        accessorKey: "end_time",
        cell: ({ row }) => row.original.end_time || "00:00",
      },
      {
        header: "Duration",
        accessorKey: "duration",
        cell: ({ row }) => {
          let duration;
          if (row?.original?.start_time) {
            const parseTime = (time) => {
              const [hours, minutes] = time?.split(":").map(Number);
              return hours * 60 + minutes;
            };

            const startTime = row.original.start_time;
            const endTime = row.original.end_time;

            if (!startTime || !endTime) {
              return "N/A";
            }

            const startMinutes = parseTime(startTime);
            const endMinutes = parseTime(endTime);

            // Calculate the duration in minutes
            const durationMinutes = Math.abs(endMinutes - startMinutes);

            // Convert minutes to hours and remaining minutes
            const hours = Math.floor(durationMinutes / 60);
            const minutes = durationMinutes % 60;

            // Format the result as hh:mm
            const formattedDuration = `${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}`;

            duration = formattedDuration;
          } else {
            duration = row.original.time
          }
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
              className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-darkCharcoal"
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
        id={deleteId}
        setId={setDeleteId}
        type={"break"}
        setNew_break={setNew_break}
      />
      <div className="my-1 flex w-full items-center justify-between">
        <h1 className="text-lg font-bold">Break Time</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCreate}
            className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70"
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
