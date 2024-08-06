import EmployeeHeader from "@/components/common/EmployeeHeader";
import EmployeesSidebar from "@/components/sidebars/employees/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { employeesSettingsSideList } from "@/constants/employeeSidebar";
import { TableData } from "@/constants/tableDummy";
import { MoveDiagonal, Search } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const EmployeeSettings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const list = React.useMemo(() => TableData, [TableData]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessorKey: "name",
      },
      { Header: "ID Number", accessorKey: "addNo" },
      {
        Header: "Designation",
        accessorKey: "dignation",
      },
      {
        Header: "Type",
        accessorKey: "type",
      },

      {
        Header: "Document",
        accessorKey: "designation",
        cell: ({ row }) => (
          <p className="font-medium underline  text-[#1A75FF]">
            {row?.original?.designation}
          </p>
        ),
      },
    ],

    []
  );
  return (
    <div className=" flex flex-col">
      <EmployeeHeader
        backLink={""}
        menu={"Menu"}
        subMenu={"Employee"}
        currentPath={"Settings"}
        pageHeading={"Employees"}
        nextLink={""}
        nextHeading={"Settings"}
      />
      {/* ----sidebar---- */}
      <div className="flex gap-x-3">
        <EmployeesSidebar sidebarList={employeesSettingsSideList} />
        <div className=" flex-[0.8] bg-white rounded-md px-5 py-4">
          <div className="flex items-center justify-between my-4">
            <div className="flex gap-2 placeholder:text-black items-center input-box h-10 w-72">
              <Search />
              <input
                type="text"
                className=" w-full h-full "
                placeholder="Search"
              />
            </div>
            <div className="flex gap-2 bg-[#030E5C] items-center input-box h-10 w-40 justify-center text-white">
              + Add Documents
            </div>
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
