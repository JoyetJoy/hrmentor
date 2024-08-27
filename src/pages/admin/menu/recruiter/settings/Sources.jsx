
import MenuHeader from "@/components/common/MenuHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import { SettingsSidebar } from "@/components/sidebars/recruiter/SettingsSidebar";
import QueryTable from "@/components/table/QueryTable";
import { recruiterSetting } from "@/constants/sidebars/recruiter";
import { TableData } from "@/constants/tableDummy";
import { MoveDiagonal, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Sources = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const list = React.useMemo(() => TableData, [TableData]);
  const columns = React.useMemo(
    () => [
      {
        header: "Descriptions",
        accessorKey: "name",
      },


      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div className="bg-[#473A990D]  w-24 h-8 border border-[#E39E9E]	 text-[#2C2C2C]  font-medium flex items-center justify-center rounded ">
            Inactive
          </div>
        ),
      },

      {
        header: "Action",
        accessorKey: "action",
        accessorFn: row => row.lastName,
          header: () => <span className="flex justify-center font-bold">Action</span>,
    
        cell: ({ row }) => (
          <div className="flex items-center justify-center  gap-3  text-xs ">
            <Link
              to={"/admin/employees/primary"}
              className="cursor-pointer flex items-center bg-[#EBEBF0]  p-2  size-7 rounded-full"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
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
    <div className="flex flex-col w-full gap-x-3 h-full ">
      <MenuHeader menu="Menu" currentpath="Recruiter"  activeMenu={"Settings"} />
      <div className="flex flex-row justify-between items-center px-1 mt-2">
        <h1 className="font-bold text-base flex items-center gap-1 ">
          Settings
        </h1>
        <div className="flex gap-5 ">
          <Link
            to="#"
            className="text-sm font-extrabold text-bgColor-100 active-menu before:bg-[#181C3A] px-2 py-0.5"
          >
            General settings
          </Link>
          <Link to="#" className="text-sm font-medium text-gray-200">
            Notification
          </Link>
        </div>
      </div>  
      <div className="flex gap-x-3 h-full my-4">
        <SettingsSidebar sidebarList={recruiterSetting} active="Sources" />
        <div className="w-full bg-white rounded p-5">
          <div className="flex justify-between w-full mb-4 items-center">
            <h3 className="text-[#2C2C2C] font-semibold">Sources</h3>
            <div className="h-10 w-fit px-5 text-white bg-[#181C3A] flex items-center font-medium rounded">+ Insert Descriptions</div>
          </div>
          <QueryTable
            columns={columns}
            list={list}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};
