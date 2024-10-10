import MenuHeader from "@/components/common/MenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import {
  ArrowLeft,
  Bookmark,
  Filter,
  MoveDiagonal,
  Plus,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function List() {
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const list = React.useMemo(() => TableData, [TableData]);

  const location = useLocation();
  const isActive = (path) => path.includes(location.pathname);
  const columns = React.useMemo(
    () => [
      {
        header: "Job Title",
        accessorKey: "name",
      },
      {
        header: "Date created",
        accessorKey: "dignation",
        cell: ({ row }) => <p className="">{row?.original?.designation}</p>,
      },
      {
        header: "Job Status",
        accessorKey: "status",
      },
      {
        header: "Total candidates",
        accessorKey: "totalcandidates",
      },
      {
        header: "New candidates",
        accessorKey: "newcandidates",
      },
      {
        header: "Active candidates",
        accessorKey: "activecandidates",
      },
      {
        header: "Hired candidates",
        accessorKey: "hiredcandidates",
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
        activeMenu={"Reports"}
      />
      <div className="rounded-md bg-white px-10 py-6">
        <div className="mb-4 mt-2 flex items-center justify-between">
          <div className="flex flex-row items-center gap-2 text-[#2C2C2C]">
            <ArrowLeft className="size-5" />
            <h1 className="text-base font-bold">Job Report</h1>
          </div>
          <div className="flex items-center gap-2 font-semibold text-white">
            <div className="h-10 min-h-10 rounded-md border border-gray-400 bg-white p-3">
              <Filter
                className="stroke size-4 font-medium text-black"
                strokeWidth={2}
              />
            </div>
            <Link
              to={""}
              className="btn h-11 min-h-11 bg-bgColor-100 px-6 text-sm text-white hover:bg-bgColor-100"
            >
              <Plus className="size-5" />
              Export
            </Link>
            <Link
              to={""}
              className="btn h-11 min-h-11 bg-bgColor-100 px-6 text-sm text-white hover:bg-bgColor-100"
            >
              <Bookmark className="size-5" />
              Save
            </Link>
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
    </div>
  );
}

export default List;
