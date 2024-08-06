import React from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import line from "/assets/icons/employees/line.svg";
import { Link } from "react-router-dom";
import EmployeesSidebar from "../../../../../components/sidebars/employees/EmployeesSidebar";
import QueryTable from "../../../../../components/table/QueryTable";

function PrimaryInformation() {
  return (
    <div className=" flex flex-col">
      <div className="bg-white py-2 px-6 flex flex-row items-center justify-between  rounded-md my-3">
        <div className="text-base font-semibold text-black flex items-center justify-between gap-1">
          <ArrowLeft className="size-4" />
          Menu
          <ChevronRight className="size-4" />
          Employees
          <ChevronRight className="size-4" />
          <span className="text-red-600"> Add Employee</span>
        </div>
        <div className="text-sm flex items-center gap-5 font-semibold ">
          <div className="w-1">
            <img src={line} alt="line" className="object-contain w-full" />
          </div>
          <Link className="text-textcolor-blue font-extrabold text-base">
            Employees
          </Link>
          <Link className=" text-base text-[#808080]  ">Settings</Link>
        </div>
      </div>
      {/* ----sidebar---- */}
      <div className="flex ">
        <EmployeesSidebar />
        <QueryTable className="w-full" />
      </div>
    </div>
  );
}

export default PrimaryInformation;
