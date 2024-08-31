import React from "react";
import { Outlet } from "react-router-dom";

import { AdminHeader } from "../../components/layouts/admin/Header";

export const AdminLayout =()=> {
  return (
    <>
      <div className="bg-gray-100 px-14 py-4 h-full w-full">
        <AdminHeader />
        <Outlet />
      </div>
    </>
  );
}

