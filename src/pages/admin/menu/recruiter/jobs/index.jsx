import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TableData } from "@/constants/tableDummy";
import {
  ArrowUpFromLine,
  Filter,
  MoveDiagonal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import QueryTable from "@/components/table/QueryTable";
import MenuHeader from "@/components/common/MenuHeader";

function RecruiterJobs() {
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
      { header: "  Job ID ", accessorKey: "addNo" },
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
          <div className="bg-[#473A990D]  w-fit	 text-[#7D067F] h-8 px-3 font-medium flex items-center justify-center rounded-md ">
            {row?.original?.status}
          </div>
        ),
      },

      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs   ">
          <Link
            to={"/admin/recruiter/candidate"}
            className="cursor-pointer flex items-center  bg-[#EBEBF0] p-2 rounded-full"
          >
            <MoveDiagonal className="size-3" />
            </Link>
          <Link
            to={""}
            className="cursor-pointer flex items-center bg-[#EBEBF0]  p-2 size-7   rounded-full "
          >
            <img src="/assets/icons/admin/marker.svg"   className="w-full   object-contain"/>
          </Link>
          <Link className="cursor-pointer flex justify-center items-center  bg-[#EBEBF0]  p-2  rounded-full">
            <Trash2 className="size-3" />
          </Link>
        </div>
        ),
      },    
    ],
    []
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
      
      <div className="flex justify-between items-centerm pt-2 pb-3">
      <div className="text-white  flex  items-center gap-2">
          <Link
            to={"/admin/recruiter/post"}
            className="btn hover:bg-bgColor-100 bg-bgColor-100 text-white font-normal rounded-md  text-sm  min-h-10 h-10 px-8"
          >
            <Plus className="size-5" strokeWidth={1} />
            Create Job
          </Link>
          <Link
            to={""}
            className="btn bg-white text-[#323232] text-xs border border-[#E6E7EF] hover:border-[#E6E7EF] font-bold rounded-md px-5 hover:bg-white min-h-10 h-10"
          >
            View Current Page
          </Link>
          <label className="input outline-none flex flex-row items-center border border-[#E6E7EF] hover:border-[#E6E7EF] pr-36 rounded-md  gap-2 min-h-10 h-10">
            <Search className="text-gray-200 object-contain size-4" strokeWidth={2} />
            <input
              type="text"
              className="grow placeholder:text-sm    focus:outline-none text-sm   placeholder:text-gray-200 placeholder:font-medium "
              placeholder="Search"
            />
          </label>
          <div className="bg-white rounded-md p-3 border border-gray-400 min-h-10 h-10">
            <Filter
              className="size-4 text-black font-medium stroke"
              strokeWidth={1}
            />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <Link
            to={""}
            className={` text-sm ${
              isActive(["/admin/recruiter/jobs"])
                ? "text-bgColor-100 font-bold "
                : "font-normal text-[#808080]"
            }`}
          >
            All Jobs{" "}
          </Link>
          <Link
            to={""}
            className={` text-sm ${
              isActive([""])
                ? "text-bgColor-100 font-bold "
                : "font-normal text-[#808080]"
            }`}
          >
            Open Jobs
          </Link>
          <Link
            to={""}
            className={` text-sm ${
              isActive([""])
                ? "text-bgColor-100 font-bold "
                : "font-normal text-[#808080]"
            }`}
          >
            Draft
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
    </>
  );
}

export default RecruiterJobs;
