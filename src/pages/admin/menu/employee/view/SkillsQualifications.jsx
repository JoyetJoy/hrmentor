import EmployeeHeader from "@/components/common/EmployeeHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
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
        header: "Type",
        accessorKey: "type",
      },
      { header: "Title", accessorKey: "title" },
      {
        header: "Instituation",
        accessorKey: "instituation",
      },
      {
        header: "Start Date",
        accessorKey: "start type",
      },
      {
        header: "End Date",
        accessorKey: "start type",
      },
      {
        header: "Status",
        accessorKey: "start type",
      },

      {
        header: "Document",
        accessorKey: "designation",
        cell: ({ row }) => <p className="font-medium underline  text-[#1A75FF]">{row?.original?.designation}</p>,
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex relative gap-1 text-xs ">
            <Link
              to={`/sales/invoices/detail-view/${row?.original?.id}`}
              className="cursor-pointer flex items-center  bg-gray-500 text-black p-2  size-8 rounded-full"
            >
              <MoveDiagonal />
            </Link>
            <Link
              to={""}
              className="cursor-pointer flex items-center bg-gray-500 text-black p-2  size-8 rounded-full"
            >
              <img src="/assets/icons/admin/marker.svg" />
            </Link>
            <span className="cursor-pointer flex justify-center items-center text-[#A90000] bg-gray-500 size-8 rounded-full">
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
            <h1 className="font-bold text-lg  ">Skills/Qualifications</h1>
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
