import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Search,
  Filter,
  ArrowUpFromLine,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { TableData } from "@/constants/tableDummy";
import { MoveDiagonal, Trash2 } from "lucide-react";

import QueryTable from "@/components/table/QueryTable";




export default function EmployeeLists() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const list = React.useMemo(() => TableData, [TableData]);

  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      { header: "ID Number", accessorKey: "addNo" },
      {
        header: "Designation",
        accessorKey: "dignation",
        cell: ({ row }) => <p className="font-medium">{row?.original?.designation}</p>,

      },
      {
        header: "Type",
        accessorKey: "type",
      },
      {
        header: "Location",
        accessorKey: "location",
      },
      {
        header: "Department",
        accessorKey: "designation",
        cell: ({ row }) => <p className="font-medium">{row?.original?.designation}</p>,
      },
      {
        header:"Status",
        accessorKey:"status",
        cell:({row}) => <div className="bg-pink-100 text p-1 rounded-md">{row?.original?.status}</div>
    },

      {
        header: "",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex relative gap-1 text-xs ">
            <Link
              to={`/sales/invoices/detail-view/${row?.original?.id}`}
              className="cursor-pointer flex items-center  bg-[#F5F5F5] text-black p-2  size-8 rounded-full"
            >
              <MoveDiagonal />
            </Link>
            <Link
              to={""}
              className="cursor-pointer flex items-center bg-[#F5F5F5] text-black p-2  size-8 rounded-full"
            >
              <img src="/assets/icons/admin/marker.svg" />
            </Link>
            {/* <span className="cursor-pointer flex justify-center items-center text-[#A90000] bg-[#F5F5F5]  size-8 rounded-full">
              <Trash2 className="w-5 h-5" />
            </span> */}
          </div>
        ),
      },
    ],
  
    []
  );
  return (
    <div className="my-2">
      <div className="bg-white py-2 px-6 flex flex-row items-center justify-between  rounded-md">
        <div className="text-base font-semibold text-black flex items-center justify-between gap-1">
          <ArrowLeft className="size-4" />
          Menu
          <ChevronRight className="size-4" />
          <span className="text-red-600">Employee</span>
        </div>
        <h1 className="text-base font-semibold text-black flex items-center justify-between gap-1">
          {" "}
          Number of licence is limited to 8:{" "}
          <span className="text-red-600 underline">Add More Licence</span>{" "}
        </h1>
        <div className="text-sm flex items-center gap-5 font-semibold ">
          <div className="w-1">
            <img
              src={"/assets/icons/employees/line.svg"}
              alt="line"
              className="object-contain w-full"
            />
          </div>
          <Link className="text-textcolor-blue font-extrabold text-base">
            Employees
          </Link>
          <Link className=" text-base text-[#808080]  ">Settings</Link>
        </div>
      </div>
      <div className="flex justify-between items-center my-2">
        <label className="input outline-none border-none pr-28 flex items-center  h-11 gap-2">
          <Search className="text-gray-200 object-contain size-5" />
          <input
            type="text"
            className="grow placeholder:text-sm focus:outline-none placeholder:text-gray-200 "
            placeholder="Search"
          />
        </label>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-md p-3 border border-gray-400">
          <Filter className="size-4"/>
          </div>
          <div className="bg-white flex flex-row items-center justify-center min-h-11 h-11 rounded-md py-1 px-4 border border-gray-400 gap-1">
            <ArrowUpFromLine className="size-4" />
            <h1 className="text-base font-semibold">Export</h1>
          </div>
          <div className="text-white font-semibold flex  items-center">
            <Link
              to={"/admin/employees/create"}
              className="btn bg-btncolor text-white hover:bg-btncolor"
            >
              <Plus />
              Add Employee{" "}
            </Link>
          </div>
        </div>
      </div>
      <QueryTable 
       columns={columns}
       list={list}
       currentPage={currentPage}
       setCurrentPage={setCurrentPage}
       totalPages={totalPages}/>
    </div>
  );
}
