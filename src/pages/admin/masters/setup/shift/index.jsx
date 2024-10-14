import MenuHeader from "@/components/common/MenuHeader";
import Setup from "@/components/sidebars/setup";
import QueryTable from "@/components/table/QueryTable";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function ShiftList() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10); 

 
  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "sno",
        cell: ({ row }) => row.index + 1, 
      },
      {
        header: "Shift Name",
        accessorKey: "shift-name",
        cell: ({ row }) => row.original.details || "N/A", 
      },
      {
        header: "Department",
        accessorKey: "department",
        cell: ({ row }) => row.original.details || "N/A", 
      },
      {
        header: "Location",
        accessorKey: "location",
        cell: ({ row }) => row.original.details || "N/A", 
      },
      {
        header: "Start Time",
        accessorKey: "starttime",
        cell: ({ row }) => row.original.details || "N/A", 
      },
      {
        header: "End Time",
        accessorKey: "endtime",
        cell: ({ row }) => row.original.details || "N/A", 
      },
      {
        header: "Duration",
        accessorKey: "duration",
        cell: ({ row }) => row.original.details || "N/A", 
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => row.original.details || "N/A", 
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
                alt="Edit"
              />
            </button>
            <button
              type="button"
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

  const data = [
    { sno: 1, details: "vmffghgfhfghj" },
    { sno: 2, details: "fdgdfghfh" },
  ];

  return (
    <>
      <MenuHeader menu="Menu" currentpath="Setup" />
      <div className="flex gap-x-3">
        <Setup />
        <div className="w-full flex flex-col gap-3">
          <div className=" rounded-md bg-white px-5 py-2">
            <ul className="flex flex-col items-end justify-center gap-5 text-sm text-[#7F7F7F]">
              <li className="flex items-center gap-x-3 whitespace-nowrap text-sm font-bold text-[#E95D39]">
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    `whitespace-nowrap text-sm ${
                      isActive
                        ? "active-menu px-2 py-1 font-extrabold text-hrmprimaryorange before:bg-hrmprimaryorange"
                        : "font-normal text-[#808080]"
                    }`
                  }
                >
                  Employee
                </NavLink>

                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `whitespace-nowrap text-sm ${
                      isActive
                        ? "active-menu px-2 py-1 font-extrabold text-hrmprimaryorange before:bg-hrmprimaryorange"
                        : "font-normal text-[#808080]"
                    }`
                  }
                >
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="min-h-[570px] w-full rounded-md bg-white px-5 py-4 flex flex-col gap-4">
            <div className="flex justify-between items-center ">
                <h1 className="text-lg font-bold">Shift</h1>
            <Link
            to="/admin/setup/save-shift"
              className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-[#030E5C]/70"
            >
              <Plus className="size-4" />
              Add Shift
            </Link>

            </div>
              <QueryTable
                columns={columns}
                list={data} 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            
          </div>
        </div>
      </div>
    </>
  );
}

export default ShiftList;
