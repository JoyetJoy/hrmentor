import { ArrowLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function EmployeeHeader(props) {
  const {
    backLink,
    menu,
    subMenu,
    currentPath,
    pageHeading,
    nextLink,
    nextHeading,
  } = props;
  return (
    <div className="bg-white py-2 px-6 flex flex-row items-center justify-between  rounded-md my-2">
      <div className="text-sm font-semibold text-black flex items-center justify-between gap-1">
        <ArrowLeft className="size-4" />
        {menu}
        <ChevronRight className="size-4" />
        {subMenu}
        <ChevronRight className="size-4" />
        <span className="text-red-600"> {currentPath}</span>
      </div>
      <div className="text-sm flex items-center gap-5 font-semibold ">
        <div className="w-1">
          <img
            src={"/assets/icons/employees/line.svg"}
            alt="line"
            className="object-contain w-full"
          />
        </div>
        <Link className="text-textcolor-blue font-extrabold text-sm">
          {pageHeading}
        </Link>
        <Link to ={nextLink} className=" text-sm text-[#808080]  ">{nextHeading}</Link>
      </div>
    </div>
  );
}
