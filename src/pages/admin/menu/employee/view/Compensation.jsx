
import EmployeeHeader from "@/components/common/EmployeeHeader";
import EmployeesSidebar from "@/components/sidebars/employees/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import React, { useState } from "react";


export const Compensation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const list = React.useMemo(() => TableData,[TableData]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessorKey: "name",
      },
      { Header: "ID Number", accessorKey: "addNo" },
      {
        Header: "Designation",
        accessorKey: "designation",
      },
      {
        Header: "Type",
        accessorKey: "type",
      },
      {
        Header: "Department",
        accessorKey: "department",
      },
      {
        Header: "Location",
        accessorKey: "location",
      },
      {
        Header: "Status",
        accessorKey: "status",
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
        currentPath={" Employee Detail"}
        pageHeading={"Employees"}
        nextLink={""}
        nextHeading={"Settings"}
      />
      {/* ----sidebar---- */}
      <div className="flex gap-x-3">
        <EmployeesSidebar />
        <div className=" flex-[0.8] bg">
          <>
            <h1 className="font-bold text-lg  ">Add New Employees</h1>
            <div>
              <QueryTable
                columns={columns}
                list={list}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};
