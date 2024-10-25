import MenuHeader from "@/components/common/MenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import { Filter, MoveDiagonal, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function RecInterviews() {
  const [totalPages, setTotalPages] = useState(10);
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
            <Link
              //   to={`/sales/invoices/detail-view/${row?.original?.id}`}
              // to={"/admin/recruiter/candidate"}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#F5F5F5] p-2 text-black"
            >
              <MoveDiagonal className="h-3 w-3" />
            </Link>
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
        <h1 className="text-lg font-semibold">Looking For UI/X Designer</h1>

        <label className="input flex h-10 min-h-10 min-w-96 items-center gap-2 border-none text-white outline-none">
          <Search className="size-4 object-contain text-gray-200" />
          <input
            type="text"
            className="grow text-sm placeholder:text-sm placeholder:font-normal placeholder:text-gray-200 focus:outline-none"
            placeholder="Search"
          />
        </label>
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
