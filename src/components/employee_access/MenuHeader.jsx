import { employeePaysilpMenu } from "@/constants/menus/employeePayslip";
import { ArrowLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Password from "../popups/employee_access/profile_management/Password";

function MenuHeaderEmployeeAccess({
  page,
  currentpage,
  pathlink,
  subMenu,
  icon,
}) {
  const [popupOpen, setPopupOpen] = useState(false);
  const displayMenu =
    location.pathname.includes("/employee-access/profile/payslip") ||
    location.pathname.includes("/employee-access/profile/payoff");

  return (
    <>
      <Password popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      <div className="my-2 flex flex-row items-center justify-between rounded-md bg-white px-4 py-3">
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
          <Link
            className="capitalize"
            //  to={`/employee_access/${subMenu}`}
          >
            {subMenu}
          </Link>
          {icon}
          <Link
            className="capitalize text-hrmprimaryorange"
            // to={pathlink}
          >
            {currentpage}
          </Link>
        </div>
        {displayMenu && (
          <div className="flex items-center gap-5 text-sm font-semibold">
            {employeePaysilpMenu?.map((item) => (
              <Link
                key={item?.id}
                to={item?.link}
                className={`px-2 text-sm ${
                  page === item?.id
                    ? "active-menu font-extrabold text-hrmprimaryorange before:bg-hrmprimaryorange"
                    : "font-normal text-gray-neutral"
                }`}
              >
                {item?.name}
              </Link>
            ))}
          </div>
        )}
        <button
          className="rounded-lg bg-hrmprimaryorange px-3 py-2 text-sm font-semibold text-white"
          onClick={() => setPopupOpen(true)}
        >
          Change Password
        </button>
      </div>
    </>
  );
}

export default MenuHeaderEmployeeAccess;
