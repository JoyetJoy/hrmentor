import { recruiterMenu } from "@/constants/menus/recruiter";
import { leaveMenu } from "@/constants/menus/leave";
import { employeeMenu } from "@/constants/menus/employee";
import { AccountManngerMenu } from "@/constants/menus/employee";
import { ArrowLeft, ChevronRight, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function 
MenuHeader(props) {
  const location = useLocation();
  const isActive = (paths) => paths.includes(location.pathname);
  const {
    menu,
    subMenu,
    currentpath,
    activeMenu,
    activeSubMenu = "none",
    icon,
    centertextmain,
    centertext,
  } = props;

  const currentMenu = location.pathname.includes("/admin/recruiter")
    ? recruiterMenu
    : location.pathname.includes("/admin/employee")
      ? employeeMenu
      : ["/admin/role", "/admin/subscription"].some((path) =>
            location.pathname.includes(path),
          )
        ? AccountManngerMenu
        : [];

  const menuItem = currentMenu.find((item) => item.name === activeSubMenu);
  const defaultActiveMenu = activeSubMenu;

  const isSpecialPath = [
    "Employee",
    "Settings",
    "Role",
    "Subscription",
    "Add Employee",
    "Employee Detail",
    "Roster List",
  ].includes(currentpath);

  return (
    <>
      <div
        className={`my-2 flex min-h-11 flex-row items-center justify-between rounded-md bg-white py-2 ${isSpecialPath ? "pl-6 pr-20" : "pl-6 pr-6"}`}
      >
        <div
          className={`flex items-center justify-between text-sm font-semibold text-textcolor-blue`}
        >
          
            <ArrowLeft
              onClick={() => {
                history.back();
              }}
              className="mr-2 size-4 cursor-pointer"
            />
          
          {menu}
          <ChevronRight className="size-3" />
          <Link className="capitalize" to={`/admin/${subMenu}`}>
            {subMenu}
          </Link>
          {icon}
          <span className="text-sm text-hrmprimaryorange">{currentpath}</span>
        </div>
        <h1 className="flex cursor-pointer items-center justify-between gap-1 text-[0.8rem] font-medium text-black">
          {centertextmain}
          <span className="font-bold text-hrmprimaryorange underline underline-offset-4">
            {centertext}
          </span>
        </h1>
        <div
          className={`flex items-center text-sm ${isSpecialPath ? "gap-7" : "gap-8"}`}
        >
          {currentMenu?.map((item) => (
            <React.Fragment key={item?.id}>
              <Link
                to={item?.link}
                className={`text-sm ${
                  activeMenu === item?.name || defaultActiveMenu === item.name
                    ? "active-menu px-2 py-1 font-extrabold text-hrmprimaryorange before:bg-hrmprimaryorange"
                    : `text-gray-neutral ${isSpecialPath ? "font-semibold" : "font-normal"}`
                }`}
              >
                {item?.name}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
      {menuItem?.subMenu && menuItem.subMenu.list && (
        <div className="mb-3 flex flex-row items-center justify-between rounded-md">
          <div className="flex items-center justify-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full border">
              <User className="size-4 fill-black" />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-semibold">Sandeep Biju</div>
              <div className="text-xs text-gray-dark">
                Clinical Quality Analyst
              </div>
            </div>
          </div>
          <div className="flex items-center gap-10 text-sm font-semibold">
            {menuItem.subMenu.list?.map((item) => (
              <Link
                key={item?.id}
                to={item?.link}
                className={`px-2 py-1 text-sm ${
                  isActive([item?.link])
                    ? "active-menu font-extrabold text-hrmprimaryorange before:bg-hrmprimaryorange"
                    : "font-normal text-hrmblue "
                }`}
              >
                {item?.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MenuHeader;
