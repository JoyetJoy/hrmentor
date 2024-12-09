import { LinkOffRounded } from "@mui/icons-material";
import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function LeaveSideBar() {
  return (
    <div className="h-screen min-w-64 rounded-md bg-white">
      <div className="w-full rounded-md flex flex-col bg-white px-5 py-7">
  <NavLink
    to="/employee-access/leave/request"
    className={({ isActive }) =>
      `cursor-pointer px-3 py-2 text-sm  ${
        isActive ? "text-hrmprimaryorange font-semibold" : "text-gray-dark"
      }`
    }
  >
    Leave Request
  </NavLink>
  <NavLink
    to="/employee-access/leave/bank-holiday"
    className={({ isActive }) =>
      `cursor-pointer px-3 py-2 text-sm ${
        isActive ? "text-hrmprimaryorange font-semibold" : "text-gray-dark"
      }`
    }
  >
    Bank Holiday
  </NavLink>
  <NavLink
    to="/employee-access/leave/team-leave"
    className={({ isActive }) =>
      `cursor-pointer px-3 py-2 text-sm ${
        isActive ? "text-hrmprimaryorange font-semibold" : "text-gray-dark"
      }`
    }
  >
    Team Leave
  </NavLink>
</div>
    </div>
  );
}
