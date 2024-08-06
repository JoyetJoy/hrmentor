import { employeesSidebarList } from "@/constants/employeeSidebar";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function EmployeesSidebar() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="bg-white rounded-b-md px-5 py-4 flex-[0.2]">
      <ul className="flex flex-col  gap-y-3 justify-center text-[#7F7F7F] font-medium">
        {employeesSidebarList?.map((item) => (
          <li
            key={item?.id}
            className={
              pathname.includes(item?.link) && "text-[#E95D39] font-semibold"
            }
          >
            <Link to={item?.link}>{item?.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeesSidebar;
