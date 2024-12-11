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
import { PayrollRoute } from "./children/PayrollRoute";
import { ProjectRoutes } from "./children/ProjectRoute";

export const AdminRoutes = [
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/role",
    element: <MenuRoles />,
  },
  {
    path: "/admin/subscription",
    element: <MenuSubscription />,
  },
  {
    path: "/admin/employee",
    children: EmployeeRoutes,
  },
  {
    path: "/admin/attendance",
    children: AttendanceRoutes,
  },
  {
    path: "/admin/recruiter",
    children: RecruiterRoutes,
  },
  {
    path: "/admin/hiring",
    children: HiringRoutes,
  },
  {
    path: "/admin/profile-management",
    element: <ProfileManagement />,
  },
  {
    path: "/admin/leave",
    children: LeaveRoutes,
  },
  {
    path: "/admin/company",
    children: CompanyRoutes,
  },
  {
    path: "/admin/setup",
    children: SetupRoutes,
  },
  {
    path: "/admin/project",
    children: ProjectRoutes,
  },
  {
    path: "/admin/shift",
    children: ShiftRoutes,
  },
  {
    path: "/admin/roster",
    children: RosterRoutes,
  },
  {
    path: "/admin/payroll",
    children: PayrollRoute,
  },
];
