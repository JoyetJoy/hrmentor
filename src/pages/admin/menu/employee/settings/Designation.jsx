import MenuHeader from "@/components/common/MenuHeader";
import AddDesignation from "@/components/popups/employees/settings/AddDesignation";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { employeesSettingsSideList } from "@/constants/employeeSidebar";
import { TableData } from "@/constants/tableDummy";
import { ChevronRight, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Designation() {
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
      { header: "Designation", accessorKey: "designation" },
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
      {/* ----sidebar---- */}
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
            <Link onClick={()=>setPopupOpen(true)}  className="btn bg-[#030E5C] text-white text-xs items-center flex flex-row gap-1 rounded-[0.3rem] hover:bg-[#030E5C] min-w-28 min-h-11 h-11 whitespace-nowrap">
               <Plus className="size-4"/>Add 
            </Link>
            <AddDesignation popupOpen={popupOpen} setPopupOpen={setPopupOpen} />

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
}

export default Designation;
