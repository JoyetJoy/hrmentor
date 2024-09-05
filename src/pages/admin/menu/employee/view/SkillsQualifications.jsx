import MenuHeader from "@/components/common/MenuHeader";
import MenuSubHeader from "@/components/common/MenuSubHeader";
import AddEducation from "@/components/popups/employees/view/AddEducation";
import EditEducation from "@/components/popups/employees/view/EditEducation";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable"; 
import { TableData } from "@/constants/tableDummy";
import { ChevronRight, MoveDiagonal, Plus, Trash2 } from "lucide-react";
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
          <div className="flex items-center gap-2 text-xs   ">
            <Link
              to={`/sales/invoices/detail-view/${row?.original?.id}`}
              className="cursor-pointer flex items-center  bg-[#EBEBF0] p-2 rounded-full"
            >
              <MoveDiagonal className="size-3" />
              </Link>
            <Link
              to={""}
              onClick={setEditOpen}
              className="cursor-pointer flex items-center bg-[#EBEBF0]  p-2 size-7   rounded-full "
            >
              <img src="/assets/icons/admin/marker.svg"   className="w-full   object-contain"/>
            </Link>
            <Link className="cursor-pointer flex justify-center items-center text-[#AB2727] bg-[#EBEBF0]  p-2  rounded-full">
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
      currentpath={"Employee Detail"}
      icon={<ChevronRight className="size-3" />}
      activeMenu={'Employees'}
      />
      {/* ----sidebar---- */}
      <div className="flex gap-x-3 ">
      <EditEducation  popupEditOpen={popupEditOpen} setEditOpen={setEditOpen}/>
        <EmployeesSidebar />
        <div className=" w-full bg">
          <>
                <MenuSubHeader
                heading={"Skills/Qualifications"}
                SecondLink={{ label: "Add Skills/Qualification", onClick: setPopupOpen }}
                Secondicon={ <Plus className="size-4" />}
                />
              <AddEducation popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
            <div className="pt-2">
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
