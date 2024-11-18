import CompanyGeneral from "@/pages/admin/menu/company";
import CompanyBankDetails from "@/pages/admin/menu/company/BankDetails";
import CompanyCalender from "@/pages/admin/menu/company/Calender";
import CompanySignatory from "@/pages/admin/menu/company/Signatory";

export const CompanyRoutes = [
  
    { path: "general",
        element: <CompanyGeneral /> 
    },
    {
        path:"bank_details",
        element: <CompanyBankDetails/>
    },
    {
        path:"signatory",
        element:<CompanySignatory/>
    },
    {
        path:"calender",
        element:<CompanyCalender/>
    },
    
];
