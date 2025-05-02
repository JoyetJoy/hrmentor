export const gethiringMenu = (permissions = []) => [
  {
    id: 1,
    name: "Hiring",
    link: "/admin/hiring",
  },
  ...(
    permissions.includes("Hired-candidates-list")
      ? [{
        id: 2,
        name: "Hired candidates",
        link: "/admin/hiring/hired",
      },]
      : []
  ),
  ...(
    permissions.includes("Hiring-settings-list")
      ? [{
        id: 3,
        name: "Settings",
        link: "/admin/hiring/settings",
      },]
      : []
  ),
];
