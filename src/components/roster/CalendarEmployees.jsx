import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, MoveDiagonal, Trash2 } from "lucide-react";
import QueryTable from "@/components/table/QueryTable";
import Reassign from "../popups/master/roster/Calendar/Reassign";
import { newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";

function CalendarEmployees({ rosterCalim }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const pageLimit = 10;

  useEffect(() => {
    if (rosterCalim) {
      setTotalPages(rosterCalim?.last_page);
    }
  }, [rosterCalim]);
  const columns = React.useMemo(
    () => [
      {
        header: "Emp.ID",
        accessorKey: "unique_id",
        cell: ({ row }) => <span>#EMP{row.original?.unique_id ?? "NA"}</span>,
      },
      {
        header: "Name",
        accessorKey: "first_name",
        cell: ({ row }) => (
          <p className="whitespace-nowrap">
            {row.original?.first_name ?? "N/A"}
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
                setPopupOpen(true);
              }}
              className="flex cursor-pointer items-center justify-center rounded-lg bg-black px-4 py-[6px] text-white"
            >
              Re-Assign
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
    <div className="overflow-y-min flex h-full flex-col overflow-y-auto overflow-x-hidden p-2">
      <Reassign
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        type={"reassign"}
      />
      <div className="flex items-center justify-between gap-2 text-white">
        <p className="text-[1rem] font-semibold text-black">Employees</p>
        <div className="flex gap-2">
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
            // to="/admin/recruiter/jobs/post"
            className="flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded bg-hrmprimaryorange text-xs font-semibold text-white hover:bg-hrmblue"
          >
            <Plus className="size-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
      <div className="mt-2">
        <QueryTable
          columns={columns}
          list={rosterCalim?.roster_details?.employees ?? []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default CalendarEmployees;
