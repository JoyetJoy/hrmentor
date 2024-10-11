export const recruiterMenu = [
  {
    id: 1,
    name: "Dashboard",
    link: "/admin/recruiter",
  },
  {
    id: 2,
    name: "Jobs",
    link: "/admin/recruiter/jobs",
  },
  {
    id: 3,
    name: "Candidates",
    link: "/admin/recruiter/candidate",
    subMenu: {
      list: [
        {
          id: "3a",
          name: "Profile",
          link: "/admin/recruiter/candidate/profile",
        },
        {
          id: "3b",
          name: "Question & Answers",
          link: "/admin/recruiter/candidate/question-answers",
        },
        {
          id: "3c",
          name: "Interviews",
          link: "/admin/recruiter/candidate/interviews",
        },
        {
          id: "3d",
          name: "Discussions",
          link: "/admin/recruiter/candidate/discussions",
        },
        {
          id: "3e",
          name: "Emails",
          link: "/admin/recruiter/candidate/email/custom-mail",
        },
        {
          id: "3f",
          name: "Documents",
          link: "/admin/recruiter/candidate/documents",
        },
        {
          id: "3g",
          name: "Candidate History",
          link: "/admin/recruiter/candidate/history",
        },
      ],
    },
  },
  {
    id: 5,
    name: "Reports",
    link: "/admin/recruiter/reports/job-reports",
  },
  {
    id: 6,
    name: "Settings",
    link: "/admin/recruiter/settings/job-description",
  },
];
