import ScrollBack from "@/components/common/ScrollBack";
import EmployeeAccessHeader from "@/components/layouts/employee_access/Header";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function EmployeeAccessLayouts() {
  const location = useLocation();

  if (location.pathname === "/employee_access") {
    return <Navigate to="/employee_access/dashboard" replace />;
  }
  return (
    <>
      <ScrollBack />
      <div className="h-full w-full bg-gray-100 px-12 py-4">
        <EmployeeAccessHeader />
        <Outlet />
      </div>
    </>
  );
}
