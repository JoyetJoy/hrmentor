import { AdminDashboard } from "@/pages/admin/dashboard";
import { MenuRoles } from "@/pages/admin/menu/role";
import { MenuSubscription } from "@/pages/admin/menu/subscription";
import { EmployeeRoutes } from "./children/EmployeesRoutes";


export const AdminRoutes = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "role",
    element: <MenuRoles />,
  },
  {
    path: "subscription",
    element: <MenuSubscription />,
  },
  {
    path: "employees",
    children:EmployeeRoutes
  },
];
