export const getrecruiterMenu = (permissions = []) => [
  {
    id: 1,
    name: "Dashboard",
    link: "/admin/recruiter",
  },
  ...(
    permissions.includes("job-list")
      ? [{
        id: 2,
        name: "Jobs",
        link: "/admin/recruiter/jobs",
      }]
      : []
  ),
  ...(
    permissions.includes("candidate-list")
      ? [{
        id: 3,
        name: "Candidates",
        link: "/admin/recruiter/candidate",
      },]
      : []
  ),
  ...(
    permissions.includes("report-list")
      ? [{
        id: 5,
        name: "Reports",
        link: "/admin/recruiter/reports/job-reports",
      },]
      : []
  ),
  {
    id: 6,
    name: "Interviews",
    link: "/admin/recruiter/interviews",
  },
  ...(
    permissions.includes("settings-list")
      ? [{
        id: 7,
        name: "Settings",
        link: "/admin/recruiter/settings/job-description",
      },]
      : []
  ),
];

export const recCandidateMenus = [
  {
    id: 1,
    name: "Profile",
    link: "/admin/recruiter/candidate/profile",
  },
  {
    id: 2,
    name: "Question & Answers",
    link: "/admin/recruiter/candidate/question-answers",
  },
  {
    id: 3,
    name: "Interviews",
    link: "/admin/recruiter/candidate/interviews",
  },
  {
    id: 4,
    name: "Discussions",
    link: "/admin/recruiter/candidate/discussions",
  },
  // {
  //   id: 5,
  //   name: "Emails",
  //   link: "/admin/recruiter/candidate/email/custom-mail",
  // },
  {
    id: 6,
    name: "Documents",
    link: "/admin/recruiter/candidate/documents",
  },
  // {
  //   id: 7,
  //   name: "Candidate History",
  //   link: "/admin/recruiter/candidate/history",
  // },
];
