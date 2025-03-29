import Payroll from "@/pages/admin/Payroll/Payroll_dashboard";
import PayrollList from "@/pages/admin/Payroll/payroll_list";
import PayListDetails from "@/pages/admin/Payroll/payroll_list_details";
import PayrollListEdit from "@/pages/admin/Payroll/payroll_list_edit";
import PayrollOff from "@/pages/admin/Payroll/payroll_off";
import PayrollOffDetails from "@/pages/admin/Payroll/payroll_off_details";
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
    path: "payoffdetail/:id",
    element: <PayrollOffDetails />,
  },
  {
    path: "paylistedit/:id",
    element: <PayrollListEdit />,
  },
  {
    path: "paylistdetail/:id/:monthid",
    element: <PayListDetails />,
  },
];
