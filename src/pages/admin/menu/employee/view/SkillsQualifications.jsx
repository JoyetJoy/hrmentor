import EmployeeHeader from "@/components/common/EmployeeHeader";
import AddEducation from "@/components/popups/employees/view/AddEducation";
import EditEducation from "@/components/popups/employees/view/EditEducation";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable"; 
import { TableData } from "@/constants/tableDummy";
import { MoveDiagonal, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SkillsQualifications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupEditOpen, setEditOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);


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
        nextHeading={"Setting"}
      />
      {/* ----sidebar---- */}
      <div className="flex gap-x-3">
      <EditEducation  popupEditOpen={popupEditOpen} setEditOpen={setEditOpen}/>

        <EmployeesSidebar />
        <div className=" w-full bg">
          <>
          <div className="flex flex-row items-center justify-between mb-2"> <h1 className="font-bold text-lg   ">Skills/Qualifications</h1>
            <div className="text-white text-sm font-semibold flex  items-center gap-2 ">
                <Link
                  to={""}
                  className="btn bg-btncolor text-white hover:bg-btncolor w-full  text-xs flex items-center gap-1"
                  onClick={setPopupOpen}
                >
                  <Plus className="size-4" />
                  Add Skills/Qualification</Link>
              </div>
              <AddEducation popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
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
