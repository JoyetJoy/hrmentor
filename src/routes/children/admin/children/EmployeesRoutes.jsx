import EmployeeLists from "@/pages/admin/menu/employee";
import EmployeeCreation from "@/pages/admin/menu/employee/create";
import PrimaryInformation from "@/pages/admin/menu/employee/edit/PrimaryInformation";
import { EmployeeSettings } from "@/pages/admin/menu/employee/settings";
import { EmployeeDepartment } from "@/pages/admin/menu/employee/settings/Department";
import { EmployeeDesignation } from "@/pages/admin/menu/employee/settings/Designation";
import { EmployeeDocumentCategory } from "@/pages/admin/menu/employee/settings/DocumentCategory";
import { EmployeeDocumentType } from "@/pages/admin/menu/employee/settings/DocumentType";
import { EmployeeEeoCategory } from "@/pages/admin/menu/employee/settings/EeoCategory";
import { EmployeeEthncity } from "@/pages/admin/menu/employee/settings/Ethnicity";
import { EmployeeWorkLocation } from "@/pages/admin/menu/employee/settings/WorkLocation";
import { BankDetails } from "@/pages/admin/menu/employee/view/BankDetails";
import { Compensation } from "@/pages/admin/menu/employee/view/Compensation";
import { Documents } from "@/pages/admin/menu/employee/view/Documents";
import { EmergencyContacts } from "@/pages/admin/menu/employee/view/EmergencyContacts";
import { Experience } from "@/pages/admin/menu/employee/view/Experience";
import { Payslip } from "@/pages/admin/menu/employee/view/Payslip";
import { RegistrationMemberships } from "@/pages/admin/menu/employee/view/RegistrationMemberships";
import { RightToWork } from "@/pages/admin/menu/employee/view/RightToWork";
import { SkillsQualifications } from "@/pages/admin/menu/employee/view/SkillsQualifications";
import { WorkInformation } from "@/pages/admin/menu/employee/view/WorkInformation";

export const EmployeeRoutes = [
  {
    path: "list",
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
    element: <Experience />,
  },
  {
    path: "registration-membership",
    element: <RegistrationMemberships />,
  },
  {
    path: "right-to-work",
    element: <RightToWork />,
  },
  {
    path: "emergency-contact",
    element: <EmergencyContacts />,
  },
  {
    path: "bank-details",
    element: <BankDetails />,
  },
  {
    path: "compensation",
    element: <Compensation />,
  },
  {
    path: "documents",
    element: <Documents />,
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
