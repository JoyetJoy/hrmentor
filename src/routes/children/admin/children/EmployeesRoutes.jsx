import EmployeeLists from "@/pages/admin/menu/employee";
import CreateEmployee from "@/pages/admin/menu/employee/create";
import PrimaryInformation from "@/pages/admin/menu/employee/view/PrimaryInformation";


export const EmployeeRoutes = [
  {
    path: "list",
    element: <EmployeeLists />,
  },
  {
    path: "create",
    element: <CreateEmployee />,
  },
  {
    path: "primary",
    element: <PrimaryInformation />,
  },
];
