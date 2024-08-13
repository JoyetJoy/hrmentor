
import EmployeeHeader from "@/components/common/EmployeeHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
// import EmployeesSidebar from "@/components/sidebars/employees/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import React, { useState } from "react";
import { MoveDiagonal, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import AddRightToWork from "@/components/popups/employees/view/AddRightToWork";


export const RightToWork = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);


  const list = React.useMemo(() => TableData,[TableData]);
  const columns = React.useMemo(
    () => [
      {
        header: "Document NO",
        accessorKey: "documentNo",
      },
      { header: "Share/Check Code", accessorKey: "shareCheckCode" },
      {
        header: "Share/Check Code expiry",
        accessorKey: "shareCheckCodeExpiry",
      },
      {
        header: "Review Date",
        accessorKey: "reviewDate",
      },
      {
        header: "Review by",
        accessorKey: "reviewBy",
      },
      {
        header: "Document",
        accessorKey: "document",
      },
      {
        header: "Expiry Date",
        accessorKey: "expiryDate",
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex relative gap-1 text-xs ">
            <Link
              to={`/sales/invoices/detail-view/${row?.original?.id}`}
              className="cursor-pointer flex items-center  bg-gray-500text-black p-2  size-8 rounded-full"
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
        <div className=" w-full bg">
          <>
            <div className="flex flex-row items-center justify-between"> 
            <h1 className="font-bold text-lg  ">Right to Work</h1>            
            <div className="text-white text-sm font-semibold flex  items-center gap-2 ">
                <Link
                  to={""}
                  onClick={setPopupOpen}

                  className="btn bg-btncolor text-white hover:bg-btncolor w-full  text-sm flex items-center gap-1"
                >
                  <Plus className="size-5" />
                  Add Right to Work </Link>
              </div>
              <AddRightToWork popupOpen={popupOpen} setPopupOpen={setPopupOpen} />

              </div>
            <div className="py-2">
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
