import MenuHeader from "@/components/common/MenuHeader";
import CreateJobDescription from "@/components/popups/recruiter/createjob/settings/CreateJobDescription";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import { SettingsSidebar } from "@/components/sidebars/recruiter/SettingsSidebar";
import QueryTable from "@/components/table/QueryTable";
import { recruiterSetting } from "@/constants/sidebars/recruiter";
import { TableData } from "@/constants/tableDummy";
import { MoveDiagonal, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const JobDescription = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);
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
          <div className="flex h-8 w-24 items-center justify-center rounded border border-[#E39E9E] bg-[#473A990D] font-medium text-[#2C2C2C]">
            Inactive
          </div>
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        accessorFn: (row) => row.lastName,
        header: () => (
          <span className="flex justify-center font-bold">Action</span>
        ),

        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-3 text-xs">
            <Link
              to={""}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
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

    [],
  );
  return (
    <div className="flex h-full w-full flex-col gap-x-3">
      <MenuHeader menu="Menu" currentpath="Recruiter" activeMenu={"Settings"} />
      <div className="mt-2 flex flex-row items-center justify-between px-1">
        <h1 className="flex items-center gap-1 text-base font-bold">
          Settings
        </h1>
        <div className="flex gap-5">
          <Link
            to="#"
            className="active-menu px-2 text-sm font-extrabold text-bgColor-100 before:bg-[#181C3A]"
          >
            General settings
          </Link>
          <Link to="#" className="text-sm font-medium text-gray-200">
            Notification
          </Link>
        </div>
      </div>
      <div className="my-4 flex h-full gap-x-3">
        <SettingsSidebar
          sidebarList={recruiterSetting}
          active="Job Description"
        />
        <div className="w-full rounded bg-white px-9 py-7">
          <div className="mb-4 flex w-full items-center justify-between">
            <h3 className="text-base font-bold text-[#2C2C2C]">
              Job Description
            </h3>
            <Link
              onClick={() => setPopupOpen(true)}
              className="flex h-10 w-fit items-center rounded bg-[#181C3A] px-5 gap-2 text-sm font-normal text-white"
            >
              <Plus className="size-5" strokeWidth={1.7} /> Insert Descriptions
            </Link>
            <CreateJobDescription
              popupOpen={popupOpen}
              setPopupOpen={setPopupOpen}
            />
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
