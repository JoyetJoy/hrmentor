import React, { useState } from "react";
import { Search, Filter, ArrowUpFromLine, Plus } from "lucide-react";
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
          <div className="flex items-center gap-x-2">
            <p
              style={{ backgroundColor: getRandomPastelColor() }}
              className="flex size-8 items-center justify-center rounded-full bg-[#F3] font-medium text-[#202020]"
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
          <div className="flex items-center justify-start gap-3 text-xs">
            <Link
              to={""}
              className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <MoveDiagonal className="size-3" />
            </Link>
            <Link
              to={"/admin/employees/primary"}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
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
        menu={"Menu"}
        currentpath={"Employee"}
        centertextmain={"  Number of licence is limited to 8:"}
        centertext={"Add More Licence"}
        activeMenu={"Employees"}
      />
      <div className="mb-4 mt-1 flex items-center justify-between">
        <label className="input flex h-10 min-h-10 min-w-96 items-center gap-2 rounded-md border border-[#EBEBF0] outline-none">
          <Search className="size-4 object-contain text-gray-200" />
          <input
            type="text"
            className="grow placeholder:text-sm placeholder:text-gray-200 focus:outline-none"
            placeholder="Search"
          />
        </label>
        <div className="flex items-center gap-2">
          <div className="h-10 min-h-10 rounded-md border border-gray-400 bg-white p-3">
            <Filter className="size-4" />
          </div>
          <div className="flex h-10 min-h-10 flex-row items-center justify-center gap-1 rounded-md border border-gray-400 bg-white px-4 py-1">
            <ArrowUpFromLine className="size-4" />
            <h1 className="text-xs font-semibold">Export</h1>
          </div>

          <Link
            to={"/admin/employees/create"}
            className="btn flex h-10 min-h-10 items-center bg-[#030E5C] px-3 text-xs font-semibold text-white hover:bg-[#030E5C]"
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
        totalPages={totalPages}
      />
    </div>
  );
}
