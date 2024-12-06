import Payroll from "@/pages/admin/Payroll/Payroll_dashboard";
import PayrollList from "@/pages/admin/Payroll/payroll_list";
import PayrollOff from "@/pages/admin/Payroll/payroll_off";
import PayrollSettings from "@/pages/admin/Payroll/payroll_settings";

export const PayrollRoute = [
  {
    path: "dashboard",
    element: <Payroll />,
  },
  {
    path: "list",
    element: <PayrollList />,
  },
  {
    path: "payoff",
    element: <PayrollOff />,
  },
  {
    path: "settings",
    element: <PayrollSettings />,
  },
];
