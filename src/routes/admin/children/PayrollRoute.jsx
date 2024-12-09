import Payroll from "@/pages/admin/Payroll/Payroll_dashboard";
import PayrollList from "@/pages/admin/Payroll/payroll_list";
import PayrollListEdit from "@/pages/admin/Payroll/payroll_list_edit";
import PayrollOff from "@/pages/admin/Payroll/payroll_off";
import PayrollOffEdit from "@/pages/admin/Payroll/payroll_off_edit";
import PayrollSettings from "@/pages/admin/Payroll/payroll_settings";

export const PayrollRoute = [
  {
    path: "",
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
  {
    path: "payoffedit",
    element: <PayrollOffEdit />,
  },
  {
    path: "paylistedit",
    element: <PayrollListEdit />,
  },
];
