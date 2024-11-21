
import { EmployeeDashboard } from "@/pages/employee_access/dashbord";
import { Navigate } from "react-router-dom";

export const EmployeeAccessRoutes = [
  {
    path: "dashboard",
    element: <EmployeeDashboard />,
  },
  {
    path: "*",
    element: <Navigate to="/employee_access/dashboard" replace />,
  },
 
];
