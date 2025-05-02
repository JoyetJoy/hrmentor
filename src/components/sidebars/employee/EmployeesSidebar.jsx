import { getemployeeSidebarList } from "@/constants/employeeSidebar";
import { usePermissionStore } from "@/lib/slices/auth.slice";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function EmployeesSidebar({sidebarList}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");

  const { permissions } = usePermissionStore((state) => ({
    permissions: state.permissions,
  }));

  const sidebarLists = sidebarList||getemployeeSidebarList(permissions);

  return (
    <div className="min-h-full min-w-56 rounded-md bg-white px-5 py-4">
      <ul className="flex flex-col justify-center gap-5 text-[0.9rem] font-medium text-gray-dark">
        {sidebarLists?.map((item) => {
          const linkTo = uid ? `${item?.link}?uid=${uid}` : item?.link;
          return (
            <li
              key={item?.id}
              className={
                location.pathname.includes(item?.link) &&
                "whitespace-nowrap font-bold text-hrmprimaryorange"
              }
            >
              <Link to={linkTo} className="whitespace-nowrap">
                {item?.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default EmployeesSidebar;
