import MenuHeader from "@/components/common/MenuHeader";
import MenuSubHeader from "@/components/common/MenuSubHeader";
import AddRegistrationMembership from "@/components/popups/employees/view/AddRegistrationMembership";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
// import EmployeesSidebar from "@/components/sidebars/employees/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import { ChevronRight, MoveDiagonal, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const RegistrationMemberships = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupEditOpen, setEditOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);


  const list = React.useMemo(() => TableData, [TableData]);
  const columns = React.useMemo(
    () => [
      {
        header: "Registration/Membership body",
        accessorKey: "registration",
      },
      { header: "Professional Registration Number", accessorKey: "number" },
      {
        header: "Expiry Date",
        accessorKey: "expirydate",
      },
      {
        header: "First Registered Date",
        accessorKey: "firstregdate",
      },
      {
        header: "Revalidation/Renewal Date",
        accessorKey: "revalidationdate",
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
      <div className="flex gap-x-3">
        <EmployeesSidebar />
        <div className=" w-full bg">
          <>
          {/* <div className="flex flex-row items-center justify-between"> 
            <h1 className="font-bold text-lg   ">Registration &Memberships</h1>
            <div className="text-white font-semibold flex  items-center gap-2 ">
                <Link
                  to={""}
                  onClick={setPopupOpen}

                  className="btn bg-btncolor text-white hover:bg-btncolor w-full  min-h-10 h-10 text-sm flex items-center gap-1"
                >
                  <Plus className="size-5" />
                  Add  </Link>
              </div> */}
               <MenuSubHeader
                heading={"Registration & Memberships"}
                SecondLink={{ label: "Add Registration", onClick: setPopupOpen }}
                Secondicon={ <Plus className="size-4" />}
                />
              <AddRegistrationMembership popupOpen={popupOpen} setPopupOpen={setPopupOpen} />

              
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
