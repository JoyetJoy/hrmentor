import EmployeeHeader from "@/components/common/EmployeeHeader";
import MenuHeader from "@/components/common/MenuHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
// import EmployeesSidebar from "@/components/sidebars/employees/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { employeesSettingsSideList } from "@/constants/employeeSidebar";
import { TableData } from "@/constants/tableDummy";
import { ChevronRight, MoveDiagonal, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const EmployeeSettings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const list = React.useMemo(() => TableData, [TableData]);
  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "sl no",
      },
      { header: "Work Location", accessorKey: "location" },
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
            {/* <Link
              //   to={`/sales/invoices/detail-view/${row?.original?.id}`}
              to={""}

              className="cursor-pointer flex items-center  bg-[#EBEBF0] p-2 rounded-full"
            >
              <MoveDiagonal className="size-3" />
            </Link> */}
            <Link
              to={"/admin/employees/primary"}
              className="cursor-pointer flex items-center bg-[#EBEBF0]  p-2  size-7 rounded-full"
            >
              <img src="/assets/icons/admin/marker.svg" className="w-full object-contain" />
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
    <div className=" flex flex-col">
        <MenuHeader
      menu={"Menu"}
      subMenu={"Employee"}
      currentpath={"Settings"}
      icon={<ChevronRight className="size-3" />}
      activeMenu={'Settings'}
      />
      {/* ----sidebar---- */}
      <div className="flex gap-x-3">
        <EmployeesSidebar sidebarList={employeesSettingsSideList} />
        <div className=" w-full bg-white rounded-md px-5 py-4">
          <div className="flex items-center justify-between my-4">
            <div className="flex gap-2 placeholder:text-black items-center rounded-md input-box min-h-11 min-w-96 border border-[#EBEBF0]">
              <Search className="size-4 text-[#7F7F7F]" />
              <input
                type="text"
                className=" w-full h-full placeholder:text-[#7F7F7F]"
                placeholder="Search"
              />
            </div>
            <Link className="btn bg-[#030E5C] text-white text-xs items-center flex flex-row gap-1 rounded-[0.3rem] hover:bg-[#030E5C] min-w-28 min-h-11 h-11 whitespace-nowrap">
               <Plus className="size-4"/>Add 
            </Link>
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
