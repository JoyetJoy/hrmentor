import MenuHeader from "@/components/common/MenuHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import { SettingsSidebar } from "@/components/sidebars/recruiter/SettingsSidebar";
import QueryTable from "@/components/table/QueryTable";
import { recruiterSetting } from "@/constants/sidebars/recruiter";
import { TableData } from "@/constants/tableDummy";
import { CircleHelp, Earth, MoveDiagonal, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Integrations = () => {
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
        cell: ({ row }) => (
          <div className="flex items-center  gap-3  text-xs ">
            <Link
              //   to={`/sales/invoices/detail-view/${row?.original?.id}`}
              to={""}
              className="cursor-pointer flex items-center  bg-[#EBEBF0] p-2 rounded-full"
            >
              <MoveDiagonal className="size-3" />
            </Link>
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
      <MenuHeader menu="Menu" currentpath="Recruiter" />
      <div className="flex gap-x-3 h-screen overflow-y-hidden my-4">
        <SettingsSidebar sidebarList={recruiterSetting} active="Integrations" />
        <div className="w-full bg-white rounded p-5 h-full ">
          <div className="flex justify-between w-full mb-4 items-center">
            <h3 className="text-[#2C2C2C] font-semibold">Integrations</h3>
          </div>
          <div className="w-full h-full b">
            <div className="w-full h-fit py-4 px-5 border border-[#EBEBF0] rounded">
              <p>
                LinkeIn REcruiter is a sourcing tool for finding candidates on
                the LinkedIN network. Connect your company's LinkedInRecruiter
                account to sync LinkedIn profiles,InMail conversations,and notes
                with Jazz HR.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5 text-[#7F7F7F] font-normal mt-6">
                  <div className="flex items-center gap-x-2">
                    <Earth />
                    <p>Website</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <CircleHelp />
                    <p>Support Article</p>
                  </div>
                </div>
                <div className="rounded flex items-center  w-fit px-3  font-medium  h-9  text-[#7F7F7F] border border-[#CACCDC]">More Details</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
