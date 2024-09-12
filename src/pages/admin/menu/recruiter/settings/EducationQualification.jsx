

import MenuHeader from "@/components/common/MenuHeader";
import CreateEducationQualification from "@/components/popups/recruiter/createjob/settings/CreateEducationQualification";
import DeleteItem from "@/components/popups/recruiter/createjob/settings/DeleteItem";
import EditEducation from "@/components/popups/recruiter/createjob/settings/EditEducation";
import { SettingsSidebar } from "@/components/sidebars/recruiter/SettingsSidebar";
import QueryTable from "@/components/table/QueryTable";
import { recruiterSetting } from "@/constants/sidebars/recruiter";
import { TableData } from "@/constants/tableDummy";
import {  Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const EducationQualification = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupEditOpen, setPopupEditOpen] = useState(false);
  const [popupdeleteOpen, setPopupdeleteOpen] = useState(false)
  const list = React.useMemo(() => TableData, [TableData]);
  const columns = React.useMemo(
    () => [
      {
        header: "Qualifiaction",
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
              to={""}
              onClick={()=>setPopupEditOpen(true)}
              className="cursor-pointer flex items-center bg-[#EBEBF0]  p-2  size-7 rounded-full"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </Link>
            <Link
              onClick={() => setPopupdeleteOpen(true)}
              className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#AB2727]"
            >
              <Trash2 className="size-3" />
            </Link>
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
            className="text-sm font-extrabold text-bgColor-100 active-menu before:bg-[#181C3A] px-2 "
          >
            General settings
          </Link>
          <Link to="#" className="text-sm font-medium text-gray-200">
            Notification
          </Link>
        </div>
      </div>
      <div className="flex gap-x-3 h-full my-4">
        <SettingsSidebar sidebarList={recruiterSetting} active="Education Qualification" />
        <div className="w-full bg-white rounded px-9 py-7">
          <div className="mb-4 flex w-full items-center justify-between">
            <h3 className="text-base font-bold text-[#2C2C2C]">
              Education Qualification
            </h3>
            <Link
              onClick={() => setPopupOpen(true)}
              className="flex h-10 w-fit items-center rounded bg-[#181C3A] px-5 gap-2 text-sm font-normal text-white"
            >
              <Plus className="size-5" strokeWidth={1.7} /> Create Qualification
            </Link>
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
      
      {popupOpen && (
        <CreateEducationQualification popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      )}
      {popupEditOpen && (
        <EditEducation popupEditOpen={popupEditOpen} setPopupEditOpen={setPopupEditOpen} />
      )}
      {
        popupdeleteOpen&&(
          <DeleteItem popupdeleteOpen={popupdeleteOpen} setPopupdeleteOpen={setPopupdeleteOpen}/>
        )
      }
    </div>
  );
};
