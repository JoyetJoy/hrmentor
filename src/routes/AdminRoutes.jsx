import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/admin/Login";
import { AdminLayout } from "../layouts/admin/AdminLayouts";

import ForgotPassword from "../pages/auth/admin/ForgotPass";
import { AdminDashboard } from "../pages/admin/dashboard";
import { MenuRoles } from "../pages/admin/menu/role";
import { MenuSubscription } from "../pages/admin/menu/subscription";

// function AdminRoutes() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* <Route path="login" element={<Login />} />
//         <Route path="forgotpassword" element={<ForgotPass />} /> */}
//         <Route path="/" element={<AdminLayouts />}>
// <Route index element={<Dashbord />} />
// <Route path="/admin-management/role" element={<Role />} />
// <Route
//   path="/admin-management/subscription"
//   element={<Subscription />}
// />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AdminRoutes;

export const appRoutes = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <div>NOT FOUND</div>,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "roles",
        element: <MenuRoles />,
      },
      {
        path: "subscription",
        element: <MenuSubscription />,
      },
    ],
  },
]);
