
import { EmployeeDashboard } from "@/pages/employee_access/dashbord";
import { Navigate } from "react-router-dom";
import { AttendanceRoutes } from "./children/AttendanceRoute";
import { RosterRoutes } from "./children/RosterRoute";
import { TimeSheetRoutes } from "./children/TimeSheetRoute";
import { LeaveRoute } from "./children/LeaveRoute";
import { ProfileRoutes } from "./children/ProfileRoutes";
import { ChatRoutes } from "./children/ChatRoute";

export const EmployeeAccessRoutes = [
  {
    path: "dashboard",
    element: <EmployeeDashboard />,
  },
  {
    path: "attendance",
    children: AttendanceRoutes,
  },
  {
    path: "roster",
    children: RosterRoutes,
  },
  {
    path: "timesheet",
    children: TimeSheetRoutes,
  },
  {
    path: "leave",
    children: LeaveRoute,
  },
  {
    path: "profile",
    children: ProfileRoutes,
  },
  {
  path:"chat",
  children:ChatRoutes,
  },
  {
    path: "*",
    element: <Navigate to="/employee-access/dashboard" replace />,
  },
 
];




