import React from "react";
import Dashbord from "../../pages/admin/Dashbord";
import { Outlet } from "react-router-dom";
import Login from "../../pages/auth/admin/Login";
import ForgotPass from "../../pages/auth/admin/ForgotPass";
import { AdminHeader } from "../../components/layouts/admin/Header";

function AdminLayouts() {
  return (
    <>
      <div className="bg-gray-100 px-14 py-4">
        <AdminHeader />
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayouts;
