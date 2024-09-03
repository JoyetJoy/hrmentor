import { recruiterMenu } from "@/constants/menus/recruiter";
import { employeeMenu } from "@/constants/menus/employee";
import { AccountManngerMenu } from "@/constants/menus/employee";
import { ArrowLeft, ChevronRight, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function MenuHeader(props) {
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

  const currentMenu = location.pathname.includes('/admin/recruiter')
    ? recruiterMenu
    : location.pathname.includes('/admin/employee')
      ? employeeMenu 
      : ['/admin/role', '/admin/subscription'].some(path => location.pathname.includes(path))
        ? AccountManngerMenu
        : [];

  const menuItem = currentMenu.find((item) => item.name === activeSubMenu);


  const isSpecialPath = ['Employee','Settings', 'Role', 'Subscription','Add Employee',"Employee Detail"].includes(currentpath);

  return (
    <div className="flex flex-col">
      <div className={`bg-white min-h-11 py-2 flex flex-row items-center justify-between rounded-md my-2 ${isSpecialPath ? "pl-6 pr-20" : "pl-6 pr-6"} `}>
        <div className={`text-sm font-semibold  text-[#030E5C] flex items-center justify-between`}>
          <ArrowLeft className="size-4 mr-2" />
          {menu}
          <ChevronRight className="size-3" />
          {subMenu}
          {icon}
          <span className="text-textcolor-lightred text-sm">
            {currentpath}
          </span>
        </div>
        <h1 className="text-[0.8rem] font-medium text-black flex items-center cursor-pointer justify-between gap-1">
          {centertextmain}
          <span className="text-textcolor-lightred font-bold underline underline-offset-4">
            {centertext}
          </span>
        </h1>
        <div className={`text-sm flex items-center   ${isSpecialPath ? " gap-7  " : "gap-8"}`}>
          {currentMenu?.map((item) => (
            <React.Fragment key={item?.id}>
              <Link
                to={item?.link}
                className={`text-base ${activeMenu === item?.name
                    ? "font-extrabold text-[#181C3A] before:bg-[#181C3A] py-1 px-2 active-menu"
                    : `text-[#808080] ${isSpecialPath ? "font-semibold" : "font-normal"}`
                  }`}
              >
                {item?.name}
              </Link>

            </React.Fragment>
          ))}
        </div>
      </div>
      {menuItem?.subMenu && menuItem.subMenu.list && (
        <div className="flex mb-3 flex-row items-center justify-between rounded-md">
          <div className="flex justify-center items-center gap-2">
            <div className="rounded-full border size-7 flex justify-center items-center">
              <User className="fill-black size-4" />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-semibold">Sandeep Biju</div>
              <div className="text-xs text-[#7F7F7F]">
                Clinical Quality Analyst
              </div>
            </div>
          </div>
          <div className="text-sm flex items-center gap-10 font-semibold">
            {menuItem.subMenu.list?.map((item) => (
              <Link
                key={item?.id}
                to={item?.link}
                className={`text-sm px-2 py-1 ${isActive([item?.link])
                    ? "font-extrabold active-menu before:bg-[#181C3A]  text-bgColor-100"
                    : "font-normal text-[#808080]"
                  }`}
              >
                {item?.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuHeader;
