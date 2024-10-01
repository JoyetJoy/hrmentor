import EmployeeLists from "@/pages/admin/menu/employee";
import EmployeeCreation from "@/pages/admin/menu/employee/create";
import EmployeeBankDetails from "@/pages/admin/menu/employee/edit/BankDetails";
import { EmployeeDocuments } from "@/pages/admin/menu/employee/edit/Document";
import EmployeeEmergencyContact from "@/pages/admin/menu/employee/edit/EmergencyContact";
import EmployeeExperienceEdit from "@/pages/admin/menu/employee/edit/Experience";
import EmployeeMembershipEdit from "@/pages/admin/menu/employee/edit/Membership";
import PrimaryInformation from "@/pages/admin/menu/employee/edit/PrimaryInformation";
import EmployeeRightToWorkEdit from "@/pages/admin/menu/employee/edit/RightToWork";
import EmployeeSalaryEdit from "@/pages/admin/menu/employee/edit/SalaryDetails";
import SkillsQualifications from "@/pages/admin/menu/employee/edit/Skills";
import { WorkInformation } from "@/pages/admin/menu/employee/edit/WorkInformation";
import { EmployeeSettings } from "@/pages/admin/menu/employee/settings";
import { EmployeeDepartment } from "@/pages/admin/menu/employee/settings/Department";
import { EmployeeDesignation } from "@/pages/admin/menu/employee/settings/Designation";
import { EmployeeDocumentCategory } from "@/pages/admin/menu/employee/settings/DocumentCategory";
import { EmployeeDocumentType } from "@/pages/admin/menu/employee/settings/DocumentType";
import { EmployeeEeoCategory } from "@/pages/admin/menu/employee/settings/EeoCategory";
import { EmployeeEthncity } from "@/pages/admin/menu/employee/settings/Ethnicity";
import { EmployeeWorkLocation } from "@/pages/admin/menu/employee/settings/WorkLocation";
import { Payslip } from "@/pages/admin/menu/employee/view/Payslip";

export const EmployeeRoutes = [
  {
    path: "",
    element: <EmployeeLists />,
  },
  {
    path: "create",
    element: <EmployeeCreation />,
  },
  {
    path: "primary",
    element: <PrimaryInformation />,
  },
  {
    path: "work-information",
    element: <WorkInformation />,
  },
  {
    path: "skill-qulification",
    element: <SkillsQualifications />,
  },
  {
    path: "experience",
    element: <EmployeeExperienceEdit />,
  },
  {
    path: "registration-membership",
    element: <EmployeeMembershipEdit />,
  },
  {
    path: "right-to-work",
    element: <EmployeeRightToWorkEdit />,
  },
  {
    path: "emergency-contact",
    element: <EmployeeEmergencyContact />,
  },
  {
    path: "bank-details",
    element: <EmployeeBankDetails />,
  },
  {
    path: "compensation",
    element: <EmployeeSalaryEdit />,
  },
  {
    path: "documents",
    element: <EmployeeDocuments />,
  },
  {
    path: "payslip",
    element: <Payslip />,
  },
  {
    path: "settings",
    children: [
      {
        path: "employment-type",
        element: <EmployeeSettings />,
      },
      {
        path: "designation",
        element: <EmployeeDesignation />,
      },
      {
        path: "department",
        element: <EmployeeDepartment />,
      },
      {
        path: "work-location",
        element: <EmployeeWorkLocation />,
      },
      {
        path: "document-category",
        element: <EmployeeDocumentCategory />,
      },
      {
        path: "document-type",
        element: <EmployeeDocumentType />,
      },
      {
        path: "ethnicity",
        element: <EmployeeEthncity />,
      },
      {
        path: "eeo-category",
        element: <EmployeeEeoCategory />,
      },
    ],
  },
];
