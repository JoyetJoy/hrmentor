import MenuHeader from "@/components/common/MenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import { Filter, MoveDiagonal, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function RecInterviews() {
  const [totalPages, setTotalPages] = useState(10);
  const [byStatus, setByStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const list = React.useMemo(() => TableData, [TableData]);

  const location = useLocation();
  const isActive = (path) => path.includes(location.pathname);
  const columns = React.useMemo(
    () => [
      {
        header: "Candidate name",
        accessorKey: "name",
      },
      { header: "interview Date ", accessorKey: "date" },

      {
        header: "Interviewer",
        accessorKey: "interviewer",
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center justify-start gap-3 text-xs">
            <div className="flex size-7 cursor-pointer items-center rounded-full bg-[#F5F5F5] p-2 text-black">
              <MoveDiagonal className="h-3 w-3" />
            </div>
          </div>
        ),
      },
    ],

    [],
  );
  return (
    <div className="">
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Interviews"}
      />
      <div className="mb-4 mt-2 flex items-center justify-between">
        <label className="input flex h-11 min-h-11 min-w-96 items-center gap-2 border border-black/10 text-white outline-none">
          <Search className="size-4 object-contain text-gray-200" />
          <input
            type="text"
            className="grow text-sm placeholder:text-sm placeholder:font-normal placeholder:text-gray-200 focus:outline-none"
            placeholder="Search"
          />
        </label>
        <div className="flex items-center gap-7">
          <div
            onClick={() => {
              setByStatus(null);
            }}
            className={`cursor-pointer text-sm font-bold ${byStatus === null ? "text-hrmprimaryorange" : "text-black/40"}`}
          >
            All interviews
          </div>
          <div
            onClick={() => {
              setByStatus(2);
            }}
            className={`cursor-pointer text-sm font-bold ${byStatus === 2 ? "text-hrmprimaryorange" : "text-black/40"}`}
          >
            Scheduled
          </div>
          <div
            onClick={() => {
              setByStatus(1);
            }}
            className={`cursor-pointer text-sm font-bold ${byStatus === 1 ? "text-hrmprimaryorange" : "text-black/40"}`}
          >
            Shortlisted
          </div>
          <div
            onClick={() => {
              setByStatus(1);
            }}
            className={`cursor-pointer text-sm font-bold ${byStatus === 1 ? "text-hrmprimaryorange" : "text-black/40"}`}
          >
            Selected
          </div>
        </div>
      </div>
      <QueryTable
        columns={columns}
        list={list}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default RecInterviews;
