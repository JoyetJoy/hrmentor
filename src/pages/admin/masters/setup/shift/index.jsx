import MenuHeader from "@/components/common/MenuHeader";
import Setup from "@/components/sidebars/setup";
import QueryTable from "@/components/table/QueryTable";
import { Button } from "@headlessui/react";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

function ShiftList() {
    const columns = React.useMemo(
        () =>
          [
            {
              header: "Sl No",
              accessorKey: "sno",
              cell: ({ row }) => {
             
              },
            },
            {
              header:"Fsdf" ,
              accessorKey:"fdfg" ,
              cell: ({ row}) => {
               
              },
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
      );
  return (
    <>
      <MenuHeader menu={"Menu"} currentpath={"Setup"} />
      <div className="flex gap-x-3">
        <Setup />
        <div className="w-full">
          <div className="min-h-full rounded-md bg-white px-5 py-6">
            <ul className="flex flex-col justify-center items-end gap-5 text-sm text-[#7F7F7F]">
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
          <div className="min-h-[570px] w-full rounded-md bg-white px-5 py-4">
                <Button
                  onClick={() => {
                    setPopupOpen(true);
                  }}
                  className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-[#030E5C]/70 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  <Plus className="size-4" />
                  Add Shift
                </Button>
              <div>
                <QueryTable
                  columns={columns}
                  list={data?.listing ?? []}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default ShiftList;
