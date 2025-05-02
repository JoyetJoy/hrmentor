export const getemployeeSidebarList = (permissions = []) => [
  {
    id: 1,
    link: "/admin/employee/primary",
    name: "Primary Information",
  },
  ...(
    permissions.includes("employee-work-information-view")
      ? [{
        id: 2,
        link: "/admin/employee/work-information",
        name: "Work Information",
      },]
      : []
  ),
  ...(
    permissions.includes("employee-skill-qualification-list")
      ? [{
        id: 3,
        link: "/admin/employee/skill-qulification",
        name: "Skills/Qualifications",
      },]
      : []
  ),
  ...(
    permissions.includes("employee-experience-list")
      ? [{
        id: 4,
        link: "/admin/employee/experience",
        name: "Experience",
      },]
      : []
  ),
  ...(
    permissions.includes("employee-registration-training-list")
      ? [{
        id: 5,
        link: "/admin/employee/registration-membership",
        name: "Registration/Training",
      },]
      : []
  ),
  ...(
    permissions.includes("employee-dbs-check-list")
      ? [{
        id: 6,
        link: "/admin/employee/dbs-check",
        name: "DBS Check",
      },]
      : []
  ),
  ...(
    permissions.includes("employee-reference-list")
      ? [{
        id: 7,
        link: "/admin/employee/reference",
        name: "Reference",
      },]
      : []
  ),
  ...(
    permissions.includes("employee-right-to-work-list")
      ? [{
        id: 8,
        link: "/admin/employee/right-to-work",
        name: "Right to work",
      },]
      : []
  ),
  ...(
    permissions.includes("employee-emergency-contacts-list")
      ? [{
        id: 9,
        link: "/admin/employee/emergency-contact",
        name: "Emergency Contacts",
      },]
      : []
  ),
  ...(
    permissions.includes("employee-bank-details-list")
      ? [{
        id: 10,
        link: "/admin/employee/bank-details",
        name: "Bank Details",
      },]
      : []
  ),
  ...(
    permissions.includes("employee-salary-details-list")
      ? [{
        id: 11,
        link: "/admin/employee/compensation",
        name: "Salary Details",
      },]
      : []
  ),
  ...(
    permissions.includes("employee-documents-list")
      ? [{
        id: 12,
        link: "/admin/employee/documents",
        name: "Documents",
      },]
      : []
  ),
  ...(
    permissions.includes("employee-pay-slip-list")
      ? [{
        id: 13,
        link: "/admin/employee/payslip/payoff",
        name: "Payslip",
      },]
      : []
  ),
];
export const employeeSettingSideList = [
  {
    id: 1,
    link: "/admin/employee/settings/employment-type",
    name: "Employee Type",
  },
  {
    id: 2,
    link: "/admin/employee/settings/designation",
    name: "Designation",
  },
  {
    id: 3,
    link: "/admin/employee/settings/department",
    name: "Department",
  },
  {
    id: 4,
    link: "/admin/employee/settings/work-location",
    name: "Work Location",
  },
  {
    id: 5,
    link: "/admin/employee/settings/work-area",
    name: "Work Area",
  },
  {
    id: 6,
    link: "/admin/employee/settings/document-category",
    name: "Document Category",
  },
  {
    id: 7,
    link: "/admin/employee/settings/document-type",
    name: "Document Type",
  },
  {
    id: 8,
    link: "/admin/employee/settings/ethnicity",
    name: "Ethnicity",
  },
  {
    id: 9,
    link: "/admin/employee/settings/eeo-category",
    name: "EEO Job Categories",
  },
];
