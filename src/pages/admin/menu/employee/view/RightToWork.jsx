
import EmployeeHeader from "@/components/common/EmployeeHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
// import EmployeesSidebar from "@/components/sidebars/employees/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import React, { useState } from "react";
import { MoveDiagonal, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import AddRightToWork from "@/components/popups/employees/view/AddRightToWork";
import MenuSubHeader from "@/components/common/MenuSubHeader";
import MenuHeader from "@/components/common/MenuHeader";


export const RightToWork = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupEditOpen, setEditOpen] = useState(false);
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
      <MenuHeader
      menu={"Menu"}
      subMenu={"Employee"}
      currentpath={"Employee Detail"}
      icon={<ChevronRight className="size-3" />}
      activeMenu={'Employees'}
      />
      {/* ----sidebar---- */}
      <div className="flex gap-x-3">
        <EmployeesSidebar />
        <div className=" w-full bg">
          <>
            {/* <div className="flex flex-row items-center justify-between"> 
            <h1 className="font-bold text-lg  ">Right to Work</h1>            
            <div className="text-white text-sm font-semibold flex  items-center gap-2 ">
                <Link
                  to={""}
                  onClick={setPopupOpen}

                  className="btn bg-btncolor text-white hover:bg-btncolor w-full  text-sm flex items-center gap-1"
                >
                  <Plus className="size-5" />
                  Add Right 
                  to Work </Link>
              </div> */}
               <MenuSubHeader
                heading={"Right to Work"}
                SecondLink={{ label: "Add Right ", onClick: setPopupOpen }}
                Secondicon={ <Plus className="size-4" />}
                />
              <AddRightToWork popupOpen={popupOpen} setPopupOpen={setPopupOpen} />

              
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
