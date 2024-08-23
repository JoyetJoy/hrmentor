
import EmployeeHeader from "@/components/common/EmployeeHeader";
import MenuSubHeader from "@/components/common/MenuSubHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import { Plus } from "lucide-react";
import React, { useState } from "react";


export const Payslip = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const list = React.useMemo(() => TableData,[TableData]);
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      { header: "ID Number", accessorKey: "addNo" },
      {
        header: "Designation",
        accessorKey: "designation",
      },
      {
        header: "Type",
        accessorKey: "type",
      },
      {
        header: "Department",
        accessorKey: "department",
      },
      {
        header: "Location",
        accessorKey: "location",
      },
      {
        header: "Status",
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
        <EmployeesSidebar  />
        <div className="w-full bg">
          <>
            {/* <h1 className="font-bold text-base my-2   ">Payslip</h1> */}
            <MenuSubHeader
                heading={"Payslip"}
                SecondLink={{ label: "Add Payslip", }}
                Secondicon={ <Plus className="size-4" />}
                />
            <div>
              {/* <QueryTable
                columns={columns}
                list={list}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              /> */}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};
