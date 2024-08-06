import EmployeeHeader from "@/components/common/EmployeeHeader";
import EmployeesSidebar from "@/components/sidebars/employees/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import { MoveDiagonal, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SkillsQualifications = () => {
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
        cell: ({ row }) => <p className="font-medium underline  text-[#1A75FF]">{row?.original?.designation}</p>,
      },
      {
        Header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex relative gap-1 text-xs ">
            <Link
              to={`/sales/invoices/detail-view/${row?.original?.id}`}
              className="cursor-pointer flex items-center  bg-[#F5F5F5] text-black p-2  size-8 rounded-full"
            >
              <MoveDiagonal />

              {/* <Eye className="w-6 h-6" /> */}
            </Link>
            <Link
              to={""}
              className="cursor-pointer flex items-center bg-[#F5F5F5] text-black p-2  size-8 rounded-full"
            >
              <img src="/assets/icons/admin/marker.svg" />
            </Link>
            <span className="cursor-pointer flex justify-center items-center text-[#A90000] bg-[#F5F5F5]  size-8 rounded-full">
              <Trash2 className="w-5 h-5" />
            </span>
          </div>
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
