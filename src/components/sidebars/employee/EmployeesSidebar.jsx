import { employeesSidebarList } from "@/constants/employeeSidebar";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function EmployeesSidebar({ sidebarList = employeesSidebarList }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const empid = searchParams.get("empid");

  return (
    <div className="min-h-full min-w-56 rounded-md bg-white px-5 py-4">
      <ul className="flex flex-col justify-center gap-5 text-[0.9rem] font-medium text-[#7F7F7F]">
        {sidebarList?.map((item) => (
          <li
            key={item?.id}
            className={
              location.pathname.includes(item?.link) &&
              "whitespace-nowrap text-sm font-bold text-[#E95D39]"
            }
          >
            <Link
              to={`${item?.link}?empid=${empid}`}
              className="whitespace-nowrap"
            >
              {item?.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeesSidebar;
