
import EmployeeHeader from "@/components/common/EmployeeHeader";
import MenuSubHeader from "@/components/common/MenuSubHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";

import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import { MoveDiagonal, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const BankDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupEditOpen, setEditOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

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
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex  gap-2 text-xs ">
            <Link
              to={`/sales/invoices/detail-view/${row?.original?.id}`}
              className="cursor-pointer flex items-center  bg-gray-500 text-black p-2  size-8  rounded-full"
            >
              <MoveDiagonal className=""/>
            </Link>
            <Link
              to={""}
              onClick={setEditOpen}
              className="cursor-pointer flex items-center bg-gray-500 text-black p-2 size-8   rounded-full "
            >
              <img src="/assets/icons/admin/marker.svg"  className=""/>
            </Link>
            <Link className="cursor-pointer flex justify-center items-center text-[#A90000] bg-gray-500  p-2 size-8  rounded-full">
              <Trash2 className="" />
            </Link>
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
        <div className="w-full bg">
          <>
            {/* <div className="flex flex-row items-center justify-between"> 
            <h1 className="font-bold text-lg  ">Bank Details</h1>
            <div className="text-white font-semibold flex  items-center gap-2 ">
                <Link
                  to={""}
                  className="btn bg-btncolor text-white hover:bg-btncolor w-full  min-h-10 h-10 text-sm flex items-center gap-1"
                >
                  <Plus className="size-5" />
                  Add Account</Link>
              </div>
              </div> */}
               <MenuSubHeader
                heading={"Bank Details"}
                SecondLink={{ label: "Add Account ", onClick: setPopupOpen }}
                Secondicon={ <Plus className="size-4" />}
                />
            <div className="py-2 ">
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
