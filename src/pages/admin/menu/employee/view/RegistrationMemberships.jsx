import EmployeeHeader from "@/components/common/EmployeeHeader";
import MenuSubHeader from "@/components/common/MenuSubHeader";
import AddRegistrationMembership from "@/components/popups/employees/view/AddRegistrationMembership";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
// import EmployeesSidebar from "@/components/sidebars/employees/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import { MoveDiagonal, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const RegistrationMemberships = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);


  const list = React.useMemo(() => TableData, [TableData]);
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
            <span className="cursor-pointer flex justify-center items-center text-[#A90000] bg-gray-500  size-8 rounded-full">
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

              
            <div className="py-3">
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
