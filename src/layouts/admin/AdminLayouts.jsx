import React from "react";
import { Outlet } from "react-router-dom";

import { AdminHeader } from "../../components/layouts/admin/Header";

export const AdminLayout =()=> {
  return (
    <>
      <div className="bg-gray-100 px-8 py-3 h-screen w-screen">
        <AdminHeader />
        <Outlet />
      </div>
    </>
  );
}

