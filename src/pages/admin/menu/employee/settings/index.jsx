import MenuHeader from "@/components/common/MenuHeader";
import AddEmployementType from "@/components/popups/employees/settings/AddEmployementType";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { employeesSettingsSideList } from "@/constants/employeeSidebar";
import { TableData } from "@/constants/tableDummy";
import { Button } from "@headlessui/react";
import { ChevronRight, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const EmployeeSettings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);

  const list = React.useMemo(() => TableData, [TableData]);
  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "sl no",
      },
      { header: "Employee Type Name", accessorKey: "name" },
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
              to={""}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </Link>
            <Link className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]">
              <Trash2 className="size-3" />
            </Link>
          </div>
        ),
      },
    ],

    [],
  );
  return (
    <div className="flex flex-col">
      <MenuHeader
        menu={"Menu"}
        subMenu={"Employee"}
        currentpath={"Settings"}
        icon={<ChevronRight className="size-3" />}
        activeMenu={"Settings"}
      />
      <div className="flex gap-x-3">
        <EmployeesSidebar sidebarList={employeesSettingsSideList} />
        <div className="w-full rounded-md bg-white px-5 py-4">
          <div className="my-4 flex items-center justify-between">
            <div className="input-box flex min-h-11 min-w-96 items-center gap-2 rounded-md border border-[#EBEBF0] placeholder:text-black">
              <Search className="size-4 text-[#7F7F7F]" />
              <input
                type="text"
                className="h-full w-full placeholder:text-[#7F7F7F]"
                placeholder="Search"
              />
            </div>
            <Button
              onClick={() => {
                setPopupOpen(true);
              }}
              className="flex w-fit items-center justify-center gap-2 rounded-md bg-[#030E5C] px-5 py-2 text-sm font-medium text-white focus:outline-none data-[hover]:bg-[#030E5C]/70 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <Plus className="size-4" />
              Add
            </Button>
            <AddEmployementType
              popupOpen={popupOpen}
              setPopupOpen={setPopupOpen}
            />
          </div>
          <div>
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
    </div>
  );
};
