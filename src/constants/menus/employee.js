export const getEmployeeMenu = (permissions = []) => [
  {
    id: 1,
    name: "Employee",
    link: "/admin/employee",
  },
  ...(
    permissions.includes("employee-create")
      ? [{
          id: 2,
          name: "Settings",
          link: "/admin/employee/settings/employment-type",
        }]
      : []
  ),
];


export const getAccountManngerMenu = (permissions = []) => [
  {
    id: 1,
    name: "Role",
    link: "/admin/role",
  },
  ...(
    permissions.includes("subscription-list")
      ? [{
        id: 1,
        name: "Subscription",
        link: "/admin/subscription",
      },]
      : []
  ),
];
export const PaysilpMenu = [
  {
    id: 1,
    name: "PayOff",
    link: "/admin/employee/payslip/payoff",
  },
  {
    id: 2,
    name: "PaySlip",
    link: "/admin/employee/payslip",
  },
];
