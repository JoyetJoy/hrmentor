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
import MenuHeader from "@/components/common/MenuHeader";
import { getRandomPastelColor } from "@/utils/helpers";




export default function EmployeeLists() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const list = React.useMemo(() => TableData, [TableData]);

  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="flex gap-x-2 items-center ">
            <p
              style={{ backgroundColor: getRandomPastelColor() }}
              className="bg-[#F3] font-medium text-[#202020] size-8 rounded-full flex justify-center items-center"
            >
              {row?.original?.name?.match(/\b\w/g).join("")}
            </p>
            <p>{row?.original?.name}</p>
          </div>
        ),

      },
      { header: "ID Number", accessorKey: "addNo" },
      {
        header: "Designation",
        accessorKey: "dignation",
        cell: ({ row }) => <p className="">{row?.original?.designation}</p>,

      },
      {
        header: "Employment Type",
        accessorKey: "type",
      },
      {
        header: "Department",
        accessorKey: "designation",
        cell: ({ row }) => <p className="">{row?.original?.designation}</p>,
      },
      {
        header: " Work Location",
        accessorKey: "location",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => <div className="bg-[#473A990D]  w-fit	 text-[#7D067F] h-8 px-3 font-medium flex items-center justify-center rounded-md ">{row?.original?.status}</div>
      },


      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center justify-start gap-3  text-xs ">
            <Link
              to={""}
              className="cursor-pointer flex items-center  bg-[#EBEBF0] p-2 rounded-full"
            >
              <MoveDiagonal className="size-3" />
            </Link>
            <Link
              to={"/admin/employees/primary"}
              className="cursor-pointer flex items-center bg-[#EBEBF0]  p-2  size-7 rounded-full"
            >
              <img src="/assets/icons/admin/marker.svg" className="w-full object-contain" />
            </Link>
          
          </div>
        ),
      },
    ],

    []
  );
  return (
    <div className="">
      <MenuHeader
      menu={"Menu"}
      currentpath={"Employee"}
      centertextmain={"  Number of licence is limited to 8:"}
      centertext={"Add More Licence"}
      activeMenu={'Employees'}

      />
      <div className="flex justify-between items-center mt-1 mb-4">
        <label className="input outline-none  border  border-[#EBEBF0] rounded-md min-w-96  flex items-center min-h-10  h-10 gap-2">
          <Search className="text-gray-200 object-contain size-4" />
          <input
            type="text"
            className="grow placeholder:text-sm focus:outline-none placeholder:text-gray-200 "
            placeholder="Search"
          />
        </label>
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-md p-3 border border-gray-400 min-h-10 h-10  ">
            <Filter className="size-4" />
          </div>
          <div className="bg-white flex flex-row items-center justify-center min-h-10 h-10 rounded-md py-1 px-4 border border-gray-400 gap-1">
            <ArrowUpFromLine className="size-4" />
            <h1 className="text-xs font-semibold">Export</h1>
          </div>
        
            <Link
              to={"/admin/employees/create"}
              className="btn bg-[#030E5C]  font-semibold flex  items-center px-3 text-white text-xs hover:bg-[#030E5C] min-h-10 h-10"
            >
              <Plus className="size-4" />
              Add Employee{" "}
            </Link>
         
        </div>
      </div>
      <QueryTable
        columns={columns}
        list={list}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages} />
    </div>
  );
}
