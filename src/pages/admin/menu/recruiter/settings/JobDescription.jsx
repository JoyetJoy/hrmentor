import MenuHeader from "@/components/common/MenuHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import { SettingsSidebar } from "@/components/sidebars/recruiter/SettingsSidebar";
import QueryTable from "@/components/table/QueryTable";
import { recruiterSetting } from "@/constants/sidebars/recruiter";
import { TableData } from "@/constants/tableDummy";
import { MoveDiagonal } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const JobDescription = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
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
            accessorKey: "dignation",
            cell: ({ row }) => <p className="">{row?.original?.designation}</p>,
    
          },
          {
            header: "Type",
            accessorKey: "type",
          },
          {
            header: "Location",
            accessorKey: "location",
          },
          {
            header: "Department",
            accessorKey: "designation",
            cell: ({ row }) => <p className="">{row?.original?.designation}</p>,
          },
          {
            header: "Status",
            accessorKey: "status",
            cell: ({ row }) => <div className="bg-[#473A990D]  w-fit	 text-[#7D067F] h-8 px-3 font-medium flex items-center justify-center rounded-md ">{row?.original?.status}</div>
          },
    
    
          {
            header: "",
            accessorKey: "action",
            cell: ({ row }) => (
              <div className="flex items-center justify-end gap-3  text-xs ">
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
                  <img src="/assets/icons/admin/marker.svg" className="w-full object-contain" />
                </Link>
                {/* <span className="cursor-pointer flex justify-center items-center text-[#A90000] bg-[#F5F5F5]  size-8 rounded-full">
                  <Trash2 className="w-5 h-5" />
                </span> */}
              </div>
            ),
          },
        ],
    
        []
      );
  return (
    <div className="flex flex-col w-full gap-x-3 h-full ">
      <MenuHeader />
      <div className="flex gap-x-3 h-full my-4">
      <SettingsSidebar sidebarList={recruiterSetting} />
      <QueryTable
        columns={columns}
        list={list}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages} />
      </div>
    </div>
  );
};
