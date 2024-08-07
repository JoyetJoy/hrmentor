import { employeesSidebarList } from "@/constants/employeeSidebar";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function EmployeesSidebar({ sidebarList = employeesSidebarList }) {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="bg-white rounded-md px-5 py-4 flex-[0.2]">
      <ul className="flex flex-col  gap-y-3 justify-center text-[#7F7F7F] font-medium">
        {sidebarList?.map((item) => (
          <li
            key={item?.id}
            className={
              pathname.includes(item?.link) && "text-[#E95D39] font-bold text-base whitespace-nowrap"
            }
          >
            <Link to={item?.link} className="whitespace-nowrap">{item?.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeesSidebar;
