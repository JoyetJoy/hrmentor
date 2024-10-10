import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TableData } from "@/constants/tableDummy";
import { Filter, MoveDiagonal, Plus, Search, Trash2 } from "lucide-react";

import QueryTable from "@/components/table/QueryTable";
import MenuHeader from "@/components/common/MenuHeader";

function RecruiterJobs() {
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const list = React.useMemo(() => TableData, [TableData]);

  const columns = React.useMemo(
    () => [
      {
        header: "Job Title",
        accessorKey: "name",
      },
      { header: "Job ID", accessorKey: "addNo" },
      {
        header: "Date created",
        accessorKey: "dignation",
        cell: ({ row }) => <p className="">{row?.original?.designation}</p>,
      },
      {
        header: "Type",
        accessorKey: "type",
      },
      {
        header: "Department",
        accessorKey: "designation",
        cell: ({ row }) => <p className="">{row?.original?.designation}</p>,
      },
      {
        header: "Location",
        accessorKey: "location",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div className="flex h-8 w-fit items-center justify-center rounded-md bg-[#473A990D] px-3 font-medium text-[#7D067F]">
            {row?.original?.status}
          </div>
        ),
      },

      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <Link
              to={"/admin/recruiter/candidate"}
              className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <MoveDiagonal className="size-3" />
            </Link>
            <Link
              to={""}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </Link>
            <Link className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2">
              <Trash2 className="size-3" />
            </Link>
          </div>
        ),
      },
    ],
    [],
  );
  return (
    <>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className="items-centerm flex justify-between pb-3 pt-2">
        <div className="flex items-center gap-2 text-white">
          <Link
            to="/admin/recruiter/post"
            className="btn flex h-10 min-h-10 items-center rounded bg-hrmprimaryorange px-5 text-xs font-semibold text-white hover:bg-[#030E5C]"
          >
            <Plus className="size-5" strokeWidth={2} />
            Create Job
          </Link>
          <Link className="btn h-10 min-h-10 rounded-md border border-[#E6E7EF] bg-white px-5 text-xs font-bold text-[#323232] hover:border-[#E6E7EF] hover:bg-white">
            View Career Page
          </Link>
          <label className="input flex h-10 min-h-10 min-w-80 flex-row items-center gap-2 rounded-md border border-[#E6E7EF] outline-none hover:border-[#E6E7EF]">
            <Search
              className="size-4 object-contain text-gray-200"
              strokeWidth={2}
            />
            <input
              type="text"
              className="grow text-sm placeholder:text-sm placeholder:font-medium placeholder:text-gray-200 focus:outline-none"
              placeholder="Search"
            />
          </label>
          <div className="h-10 min-h-10 rounded-md border border-gray-400 bg-white p-3">
            <Filter
              className="stroke size-4 font-medium text-black"
              strokeWidth={2}
            />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="text-sm font-bold text-black/70">All Jobs </div>
          <div className="text-sm font-bold text-black/40">Open Jobs</div>
          <div className="text-sm font-bold text-black/40"> Draft</div>
        </div>
      </div>
      <QueryTable
        columns={columns}
        list={list}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
}

export default RecruiterJobs;
