import EmployeeLists from "@/pages/admin/menu/employee";
import CreateEmployee from "@/pages/admin/menu/employee/create";
import { BankDetails } from "@/pages/admin/menu/employee/view/BankDetails";
import { Compensation } from "@/pages/admin/menu/employee/view/Compensation";
import { Documents } from "@/pages/admin/menu/employee/view/Documents";
import { EmergencyContacts } from "@/pages/admin/menu/employee/view/EmergencyContacts";
import { Experience } from "@/pages/admin/menu/employee/view/Experience";
import { Payslip } from "@/pages/admin/menu/employee/view/Payslip";
import PrimaryInformation from "@/pages/admin/menu/employee/view/PrimaryInformation";
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
    element: <CreateEmployee />,
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
];
