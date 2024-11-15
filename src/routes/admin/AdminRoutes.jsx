import { AdminDashboard } from "@/pages/admin/dashboard";
import { MenuRoles } from "@/pages/admin/menu/role";
import { MenuSubscription } from "@/pages/admin/menu/subscription";
import { AttendanceRoutes } from "./children/AttendanceRoute";
import { EmployeeRoutes } from "./children/EmployeesRoutes";
import { RecruiterRoutes } from "./children/RecruiterRoutes";
import ShiftList from "@/pages/admin/masters/setup/shift";
import AddShift from "@/pages/admin/masters/setup/shift/Save";
import SaveMasterShift from "@/pages/admin/masters/setup/shift/Save";
import RosterList from "@/pages/admin/masters/roster/Index";
import RosterDepartment from "@/pages/admin/masters/roster/calender/Department";
import Claim from "@/pages/admin/masters/roster/Claim";
import EmployeeAttendanceCalendar from "@/pages/admin/menu/attendance/Index";
import { HiringRoutes } from "./children/HiringRoute";
import ProfileManagement from "@/pages/admin/dashboard/profile-management";

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
    path: "setup",
    children: [
      {
        path: "calender",
        element: <EmployeeAttendanceCalendar />,
      },
      {
        path: "shift",
        element: <ShiftList />,
      },
      {
        path: "save-shift",
        element: <SaveMasterShift />,
      },
      {
        path: "calender-department",
        element: <RosterDepartment />,
      },
    ]
  },
  {
    path:"roster",
    children:[
      {
        path:"",
        element:<RosterList/>,
      },
        {
          path:"claim",
          element:<Claim/>
        }
      
    ]
  },
];
