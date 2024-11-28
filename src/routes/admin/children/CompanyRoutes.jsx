import CompanyGeneral from "@/pages/admin/menu/company";
import CompanyAddCalender from "@/pages/admin/menu/company/AddCalender";
import CompanyBankDetails from "@/pages/admin/menu/company/BankDetails";
import CompanyCalender from "@/pages/admin/menu/company/Calender";
import CompanySignatory from "@/pages/admin/menu/company/Signatory";

export const CompanyRoutes = [
  { path: "general", element: <CompanyGeneral /> },
  {
    path: "bank_details/:id",
    element: <CompanyBankDetails />,
  },
  {
    path: "signatory/:id",
    element: <CompanySignatory />,
  },
  {
    path: "calender/:id",
    element: <CompanyCalender />,
  },
  {
    path: "add_calender/:id",
    element: <CompanyAddCalender />,
  },
];
