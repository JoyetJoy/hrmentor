import { AdminDashboard } from "@/pages/admin/dashboard";
import { MenuRoles } from "@/pages/admin/menu/role";
import { MenuSubscription } from "@/pages/admin/menu/subscription";
import { AttendanceRoutes } from "./children/AttendanceRoute";
import { EmployeeRoutes } from "./children/EmployeesRoutes";
import { RecruiterRoutes } from "./children/RecruiterRoutes";
import { CompanyRoutes } from "./children/CompanyRoutes";
import { LeaveRoutes } from "./children/LeaveRoute";
import { HiringRoutes } from "./children/HiringRoutes";
import ProfileManagement from "@/pages/admin/dashboard/profile-management";
import { SetupRoutes } from "./children/SetupRoutes";
import { ShiftRoutes } from "./children/ShiftRoutes";
import { RosterRoutes } from "./children/RosterRoutes";

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
    path: "hiring",
    children: HiringRoutes,
  },
  {
    path: "profile-management",
    element: <ProfileManagement />,
  },
  {
    path: "leave",
    children: LeaveRoutes,
  },
  {
    path: "company",
    children: CompanyRoutes,
  },
  {
    path:"setup",
    children:SetupRoutes
  },
  {
    path:"shift",
    children:ShiftRoutes
  },
  {
    path:"roster",
    children:RosterRoutes
  },
];
