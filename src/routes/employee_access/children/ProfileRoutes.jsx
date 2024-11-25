import BankDetails from "@/pages/employee_access/profile_mangement/BankDetails";
import DbsCheck from "@/pages/employee_access/profile_mangement/DbsCheck";
import Documents from "@/pages/employee_access/profile_mangement/Documents";
import EmergencyContact from "@/pages/employee_access/profile_mangement/EmergencyContact";
import Experience from "@/pages/employee_access/profile_mangement/Experience";
import PaySlip from "@/pages/employee_access/profile_mangement/PaySlip";
import PrimaryInformation from "@/pages/employee_access/profile_mangement/PrimaryInformation";
import Reference from "@/pages/employee_access/profile_mangement/Reference";
import Registration from "@/pages/employee_access/profile_mangement/Registration";
import RightToWork from "@/pages/employee_access/profile_mangement/RightToWork";
import Skills from "@/pages/employee_access/profile_mangement/Skills";
import WorkInformation from "@/pages/employee_access/profile_mangement/WorkInformation";

export const ProfileRoutes =[
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
        element: <Skills />,
      },
      {
        path: "experience",
        element: <Experience />,
      },
      {
        path: "registration-membership",
        element: <Registration />,
      },
      {
        path: "dbs-check",
        element: <DbsCheck/>
      },
      {
        path: "reference",
        element:<Reference/>
      },
      {
        path: "right-to-work",
        element: <RightToWork />,
      },
      {
        path: "emergency-contact",
        element: <EmergencyContact />,
      },
      {
        path: "bank-details",
        element: <BankDetails />,
      },
      {
        path: "documents",
        element: <Documents />,
      },
      {
        path: "payslip",
        element: <PaySlip />,
      },

    ]