import RecruiterSideBar from "@/components/sidebars/recruiter/RecruiterSideBar";
import QueryTable from "@/components/table/QueryTable";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TableData } from "@/constants/tableDummy";
import {
  ArrowLeft,
  ArrowUpFromLine,
  Filter,
  MoveDiagonal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import MenuHeader from "@/components/common/MenuHeader";

function Candidate() {
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const list = React.useMemo(() => TableData, [TableData]);

  const columns = React.useMemo(
    () => [
      {
        header: "Applied Date",
        accessorKey: "addNo",
        className: "text-[#181C3A] ",
      },
      {
        header: "Candidate name",
        accessorKey: "name",
      },

      {
        header: "Candidate Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div className="bg-[#473A990D]  w-fit text-[#7D067F] h-8 px-3 font-medium flex items-center justify-center rounded-md ">
            {row?.original?.status}
          </div>
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex relative gap-1 text-xs text-[#181C3A] ">
            <Link
              //   to={`/sales/invoices/detail-view/${row?.original?.id}`}
              to={"/admin/recruiter/candidate"}
              className="cursor-pointer flex items-center  bg-[#F5F5F5] text-black p-2  size-8 rounded-full"
            >
              <MoveDiagonal className="w-4 h-4" />
            </Link>

            <span className="cursor-pointer flex justify-center items-center text-red-700 bg-[#F5F5F5]  size-8 rounded-full">
              <Trash2 className="w-4 h-4" />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
          <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className="flex flex-row justify-between items-center my-5 ">
        <h1 className="font-bold text-base flex items-center gap-1 ">
          <ArrowLeft className="size-4" />
          Project manger
        </h1>
        <div className="flex gap-5 ">
        <Link
        to="/admin/recruiter/candidate"
        className={`text-sm ${location.pathname === "/admin/recruiter/candidate"
          ? "font-extrabold text-[#181C3A] before:bg-[#181C3A] py-1 px-2 active-menu"
          : "text-[#808080]"
        }`}
      >
        Candidate
      </Link>
      
      <Link
        to="/admin/recruiter/promote"
        className={`text-sm ${location.pathname === "/admin/recruiter/promote"
          ? "font-extrabold text-[#181C3A] before:bg-[#181C3A] py-1 px-2 active-menu"
          : "text-[#808080]"
        }`}
      >
        Promote
      </Link>

      <Link
        to="/admin/recruiter/refer"
        className={`text-sm ${location.pathname === "/admin/recruiter/refer"
          ? "font-extrabold text-[#181C3A] before:bg-[#181C3A] py-1 px-2 active-menu"
          : "text-[#808080]"
        }`}
      >
        Refer
      </Link>
        </div>
      </div>
      
      <div className="flex flex-row gap-2 my-3 ">
        <RecruiterSideBar />

        <div className="bg-white w-full rounded-md p-7 flex justify-between flex-col ">
          <div className="flex flex-row  items-center justify-between mb-5 ">
            <h1 className="text-base font-semibold text-black">Candidate</h1>
            <div className="text-white font-semibold flex  items-center gap-2">
              <label className="input outline-none border-gray-300 pr-28 flex items-center   min-h-10 h-10 gap-2">
                <Search className="text-gray-200 object-contain size-4" />
                <input
                  type="text"
                  className="grow placeholder:text-sm focus:outline-none placeholder:text-gray-200 "
                  placeholder="Search"
                />
              </label>
              <div className="bg-white rounded-md p-3 border border-gray-400  min-h-10 h-10">
                <Filter className="size-4 text-black" />
              </div>
              <Link
                to={""}
                className="btn bg-bgColor-100 text-white text-sm hover:bg-bgColor-100 min-h-10 h-10"
              >
                <Plus className=" size-5" />
                Add Candidate
              </Link>
              <Link
                to={""}
                className="btn bg-bgColor-100 text-sm text-white hover:bg-bgColor-100  min-h-10 h-10"
              >
                <ArrowUpFromLine className="text-white size-4" />
                Export
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
    </div>
  );
}

export default Candidate;
