import React from "react";
import { BrowserRouter , Routes ,Route } from "react-router-dom";
import Login from "../pages/auth/admin/Login";
import ForgotPass from "../pages/auth/admin/ForgotPass";
import AdminLayouts from "../layouts/admin/AdminLayouts";
import Dashbord from "../pages/admin/Dashbord";
import Role from "../pages/admin/superadmin/accountmanagement/Role";
import Subscription from "../pages/admin/superadmin/accountmanagement/Subscription";

function AdminRoutes() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='login' element={<Login />} />
    <Route path='forgotpassword' element={<ForgotPass />} />
      <Route path='/' element={<AdminLayouts />}>
        <Route index element={<Dashbord />} />
       <Route path="/admin-management/role" element={<Role/>}/>
       <Route path="/admin-management/subscription" element={<Subscription/>}/>
      </Route>
    </Routes>
  </BrowserRouter>

  
  )
}

export default AdminRoutes;
