import { hiringMenu } from "@/constants/menus/hiring";
import { ArrowLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function MenuHeaderEmployeeAccess({ page ,currentpage,pathlink,subMenu,icon }) {
  return (
    <>
      <div className="my-2 flex flex-row items-center justify-between rounded-md bg-white px-4 py-2">
        <div
          className={`flex items-center justify-between text-sm font-semibold text-hrmblue`}
        >
          <ArrowLeft
            onClick={() => {
              history.back();
            }}
            className="mr-2 size-4 cursor-pointer"
          />
          Menu
          <ChevronRight className="size-3" />
          <Link className="capitalize"
          //  to={`/employee_access/${subMenu}`}
           >
            {subMenu}
          </Link>
          {icon}
          <Link
            className="capitalize text-hrmprimaryorange"
            to={pathlink}
          >
            {currentpage}
          </Link>
        </div>
      </div>
    </>
  );
}

export default MenuHeaderEmployeeAccess;
