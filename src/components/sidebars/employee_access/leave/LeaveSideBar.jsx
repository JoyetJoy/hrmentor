import { LinkOffRounded } from "@mui/icons-material";
import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function LeaveSideBar(isActive) {
  const isActives = isActive?.isActive;

  return (
    <div className="h-screen min-w-[15%] rounded-md bg-white">
      <div className="flex w-full flex-col rounded-md bg-white px-3 py-7">
        <NavLink
          to="/employee-access/leave/request"
          className={({ isActive }) =>
            `cursor-pointer px-3 py-2 text-sm ${
              isActives
                ? "font-semibold text-hrmprimaryorange"
                : isActive
                  ? "font-semibold text-hrmprimaryorange"
                  : "text-gray-dark"
            }`
          }
        >
          Leave Request
        </NavLink>
        {!isActives ? (
          <>
            <NavLink
              to="/employee-access/leave/bank-holiday"
              className={({ isActive }) =>
                `cursor-pointer px-3 py-2 text-sm ${
                  isActive
                    ? "font-semibold text-hrmprimaryorange"
                    : "text-gray-dark"
                }`
              }
            >
              Bank Holiday
            </NavLink>
            <NavLink
              to="/employee-access/leave/team-leave"
              className={({ isActive }) =>
                `cursor-pointer px-3 py-2 text-sm ${
                  isActive
                    ? "font-semibold text-hrmprimaryorange"
                    : "text-gray-dark"
                }`
              }
            >
              Team Leave
            </NavLink>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
