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
    link: "/admin/recruiter/candidatelist",
    subMenu: {
      list: [
        {
          id: "3a",
          name: "Profile",
          link: "/admin/recruiter/profile",
        },
        {
          id: "3b",
          name: "Question & Answers",
          link: "/admin/recruiter/question-answers",
        },
        {
          id: "3c",
          name: "Interviews",
          link: "/admin/recruiter/interviews",
        },
        {
          id: "3d",
          name: "Discussions",
          link: "/admin/recruiter/discussions",
        },
        {
          id: "3e",
          name: "Emails",
          link: "/admin/recruiter/email",
        },
        {
          id: "3f",
          name: "Documents",
          link: "/admin/recruiter/documents",
        },
        {
          id: "3g",
          name: "Candidate History",
          link: "/admin/recruiter/history",
        },
      ],
    },
  },
  {
    id: 4,
    name: "Interview",
    link: "/admin/recruiter/interview/interview-list",
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
