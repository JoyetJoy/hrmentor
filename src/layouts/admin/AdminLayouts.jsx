import React from "react";
import { Outlet } from "react-router-dom";
import { AdminHeader } from "../../components/layouts/admin/Header";

export const AdminLayout = () => {
  return (
    <>
      <div className="h-full w-full bg-gray-100 px-12 py-4">
        <AdminHeader />
        <Outlet />
      </div>
    </>
  );
};
