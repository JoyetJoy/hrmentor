import Payroll from "@/pages/employee_access/menu/Payroll/Payroll_dashboard";
import PayrollList from "@/pages/employee_access/menu/Payroll/payroll_list";
import PayrollOff from "@/pages/employee_access/menu/Payroll/payroll_off";
import PayrollSettings from "@/pages/employee_access/menu/Payroll/payroll_settings";

export const PayrollRoute = [
  {
    path: "/employee-access/payroll/dashboard",
    element: <Payroll />,
  },
  {
    path: "/employee-access/payroll/list",
    element: <PayrollList />,
  },
  {
    path: "/employee-access/payroll/payoff",
    element: <PayrollOff />,
  },
  {
    path: "/employee-access/payroll/settings",
    element: <PayrollSettings />,
  },
];
