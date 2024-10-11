import { AdminDashboard } from "@/pages/admin/dashboard";
import { MenuRoles } from "@/pages/admin/menu/role";
import { MenuSubscription } from "@/pages/admin/menu/subscription";
import { EmployeeRoutes } from "./children/EmployeesRoutes";
import { RecruiterRoutes } from "./children/RecruiterRoutes";
import { AttendanceRoutes } from "./children/AttendanceRoute";
import ShiftList from "@/pages/admin/masters/setup/shift";

export const AdminRoutes = [
  {
    path: "",
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
    path: "employee",
    children: EmployeeRoutes,
  },
  {
    path: "attendance",
    children: AttendanceRoutes,
  },
  {
    path: "recruiter",
    children: RecruiterRoutes,
  },
  {
    path:"setup",
    children:[
      {
        path:"shift",
        element:<ShiftList/>
      }
    ]

  }
];
