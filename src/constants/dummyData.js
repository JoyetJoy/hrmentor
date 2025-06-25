import tickgreen from "/assets/icons/admin/tick-green.svg";
import tickgray from "/assets/icons/admin/tick-gray.svg";

export const meetings = [
  
];

export const roleSidebarData = [
  { id: "1", name: "Project Manager", no: "5" },
  { id: "2", name: "UI/UX Designer", no: "4" },
  { id: "3", name: "Frontend Developer", no: "1" },
  { id: "4", name: "UI/UX Designer", no: "4" },
  { id: "5", name: "Project Manager", no: "5" },
  { id: "6", name: "Frontend Developer", no: "7" },
  { id: "7", name: "UI/UX Designer", no: "1" },
  { id: "8", name: "Project Manager", no: "0" },
  { id: "9", name: "Frontend Developer", no: "2" },
];

export const availablePlanData = [
  {
    price: "$10",
    name: "Basic Plan",

    list: [
      {
        title: "Recruiter",
        bgColor: "#D1FADF",
        textColor: "#000000",
        imgSrc: tickgreen,

        value: [
          "Audit log and data history",
          "Unlimited individual users",
          "Unlimited individual users",
        ],
      },
      {
        title: "Hiring",
        bgColor: "#F1F1F1",
        textColor: "#667085",
        imgSrc: tickgray,
        value: [
          "Audit log and data history",
          "Unlimited individual users",
          "Unlimited individual users",
        ],
      },
      {
        title: "Employees",
        bgColor: "#F1F1F1",
        textColor: "#667085",
        imgSrc: tickgray,
        value: [
          "Audit log and data history",
          "Unlimited individual users",
          "Unlimited individual users",
        ],
      },
    ],
  },
  {
    price: "$10",
    name: "Business",

    list: [
      {
        title: "Recruiter",
        bgColor: "#D1FADF",
        textColor: "#000000",
        imgSrc: tickgreen,
        value: [
          "Audit log and data history",
          "Unlimited individual users",
          "Unlimited individual users",
        ],
      },
      {
        title: "Hiring",
        bgColor: "#D1FADF",
        textColor: "#000000",
        imgSrc: tickgreen,
        value: [
          "Audit log and data history",
          "Unlimited individual users",
          "Unlimited individual users",
        ],
      },
      {
        title: "Employee",
        bgColor: "#F1F1F1",
        textColor: "#667085",
        imgSrc: tickgray,
        value: [
          "Audit log and data history",
          "Unlimited individual users",
          "Unlimited individual users",
        ],
      },
    ],
  },
  {
    price: "$10",
    name: "Enterprises",

    list: [
      {
        title: "Recruiter",
        bgColor: "#D1FADF",
        textColor: "#000000",
        imgSrc: tickgreen,
        value: [
          "Audit log and data history",
          "Unlimited individual users",
          "Unlimited individual users",
        ],
      },
      {
        title: "Hiring",
        bgColor: "#D1FADF",
        textColor: "#000000",
        imgSrc: tickgreen,
        value: [
          "Audit log and data history",
          "Unlimited individual users",
          "Unlimited individual users",
        ],
      },
      {
        title: "Employee",
        bgColor: "#D1FADF",
        textColor: "#000000",
        imgSrc: tickgreen,
        value: [
          "Audit log and data history",
          "Unlimited individual users",
          "Unlimited individual users",
        ],
      },
    ],
  },
];

export const subcriptionModalData = [
  {
    text: "Get advanced features and priority support for $20 per user per month, billed annually. Boost productivity and streamline operations with our comprehensive Business Plan. Invest in your business’s success today!",
    list: [
      {
        title: "Recruiter",
        bgColor: "#D1FADF",
        textColor: "#000000",
        imgSrc: tickgreen,
        value: [
          "Audit log and data history",
          "Unlimited individual users",
          "Unlimited individual users",
        ],
      },
      {
        title: "Hiring",
        bgColor: "#D1FADF",
        textColor: "#000000",
        imgSrc: tickgreen,
        value: [
          "Audit log and data history",
          "Unlimited individual users",
          "Unlimited individual users",
        ],
      },
    ],
  },
];
// header list
export const getmenuitems = (permissions = []) => [
  {
    id: 1,
    iconType: "image",
    iconSrcBlack: "/assets/icons/admin/dashbordBlack.svg",
    iconSrcActive: "/assets/icons/admin/dashbordcolor.svg",
    name: "Dashboard",
    path: "/admin/dashboard",
    active: "dashboard",
  },
  ...(
    [
      "job-list",
      "candidate-list",
      "report-list",
      "settings-list"
    ].some(permission => permissions.includes(permission))
      ? [{
        id: 2,
        iconType: "image",
        iconSrcBlack: "/assets/icons/admin/recruiter-black.svg",
        iconSrcActive: "/assets/icons/admin/recruterColor.svg",
        name: "Recruiter",
        path: "/admin/recruiter",
        active: "recruiter",
      }]
      : []
  ),
  ...(
    permissions.includes("Hiring-dashboard")
      ? [{
        id: 3,
        iconType: "image",
        iconSrcBlack: "/assets/icons/admin/hiring-black.svg",
        iconSrcActive: "/assets/icons/admin/hiringColor.svg",
        name: "Hiring",
        path: "/admin/hiring",
        active: "hiring",
      },]
      : []
  ),
  ...(
    permissions.includes("employee-list")
      ? [{
        id: 4,
        iconType: "image",
        iconSrcBlack: "/assets/icons/admin/employee-black.svg",
        iconSrcActive: "/assets/icons/admin/employeeColor.svg",
        name: "Employee",
        path: "/admin/employee",
        active: "employee",
      },]
      : []
  ),
  ...(
    permissions.includes("roster-list")
      ? [{
        id: 5,
        iconType: "image",
        iconSrcBlack: "/assets/icons/admin/roster.svg",
        iconSrcActive: "/assets/icons/admin/rosterfill.svg",
        name: "Roster",
        path: "/admin/roster",
        active: "roster",
      },]
      : []
  ),
  ...(
    permissions.includes("roster-list")
      ? [{
        id: 6,
        iconType: "image",
        iconSrcBlack: "/assets/icons/admin/attendance-black.svg",
        iconSrcActive: "/assets/icons/admin/attendance-color.svg",
        name: "Attendance",
        path: "/admin/attendance",
        active: "attendance",
      },]
      : []
  ),
  ...(
    permissions.includes("leave-request-list")
      ? [{
        id: 7,
        iconType: "image",
        iconSrcBlack: "/assets/icons/admin/leaveday.svg",
        iconSrcActive: "/assets/icons/admin/leave.svg",
        name: "Leave",
        path: "/admin/leave/request",
        active: "leave",
      },]
      : []
  ),
];

export const getadminItems = (permissions = [], role = []) => [
  ...(
    role.includes(1)
      ? [{
        icon: "/assets/icons/admin/profilemang.svg",
        label: "Profile Management",
        path: "/admin/profile-management",
        active: "profile-management",
      },]
      : []
  ),
  ...(
    role.includes(1)
      ? [{
        icon: "/assets/icons/admin/company.svg",
        label: "Company Settings",
        path: "/admin/company/general",
      },]
      : []
  ),
  ...(
    permissions.includes("role-list")
      ? [{
        icon: "/assets/icons/admin/ac.svg",
        label: "Account Management",
        path: "/admin/role",
      },]
      : []
  ),
  ...(
    !role.includes(1)
      ? [{
          icon: "/assets/icons/employee_access/header/switch.svg",
          label: `Switch to Employee`,
          path: "/employee-access/dashboard",
        }]
      : []
  ),
  { icon: "/assets/icons/admin/logout.svg", label: "Log Out", path: "/login" },
];

export const setupItems = [
  {
    id: 1,
    name: "Email",
    active: "email",
    path: "/admin/setup/email",
  },
  // {
  //   id: 1,
  //   name: "Basic Settings",
  //   active: "basic settings",
  //   path: "/admin/setup/basic-settings",
  // },
];
export const rosterItems = [
  {
    id: 1,
    name: "Department",
    active: "Department",
  },
  {
    id: 2,
    name: "Location",
    active: "Location",
  },
  {
    id: 3,
    name: "WorkArea",
    active: "WorkArea",
  },
];
export const getrosterHeaderList = (permissions = []) => [
  { id: 1, name: "Roster Calendar", link: "/admin/roster" },
  ...(
    permissions.includes("roster-list")
      ? [{
        id: 2,
        name: "Roster List",
        link: "/admin/roster/list",
      },]
      : []
  ),
  { id: 3, name: "Roster Download", link: "/admin/roster/rosterpdf" },
];
export const getshiftHeaderList = (permissions = []) => [
  { id: 1, name: "Shift Calendar", link: "/admin/shift" },
  ...(
    permissions.includes("shift-list")
      ? [{
        id: 2,
        name: "Shift List",
        link: "/admin/shift/list",
      },]
      : []
  ),
];
export const getactivityItems = (permissions = []) => [
  ...(
    permissions.includes("project-list")
      ? [{
        icon: "/assets/icons/admin/projectTask.svg",
        label: "Project & Task",
        path: "/admin/project/projectManagement",
      },]
      : []
  ),
  ...(
    permissions.includes("news-list")
      ? [{
        icon: "/assets/icons/admin/newsEvent.svg",
        label: "News & Events ",
        path: "admin/news-event/news",
      },]
      : []
  ),
  ...(
    permissions.includes("paylist-view")
      ? [{
        icon: "/assets/icons/admin/payroll.svg",
        label: "Payroll",
        path: "/admin/payroll",
      },]
      : []
  ),
  ...(
    permissions.includes("shift-list")
      ? [{
        icon: "/assets/icons/admin/shift.svg",
        label: "Shift",
        path: "/admin/shift",
      },]
      : []
  ),
  ...(
    permissions.includes("Hiring-dashboard")
      ? [{
        icon: "/assets/icons/admin/setup.svg",
        label: "Setup",
        path: "/admin/setup/email",
      },]
      : []
  ),
];
export const EmailData = [
  {
    heading: "Final Interview Schedule",
    content:
      "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum",
    time: "8.45am",
  },

  {
    heading: "Final Interview Schedule",
    content:
      "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum",
    time: "8.45am",
  },
  {
    heading: "Final Interview Schedule",
    content:
      "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum",
    time: "8.45am",
  },
  {
    heading: "Final Interview Schedule",
    content:
      "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum",
    time: "8.45am",
  },
  {
    heading: "Final Interview Schedule",
    content:
      "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum",
    time: "8.45am",
  },
  {
    heading: "Final Interview Schedule",
    content:
      "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum",
    time: "8.45am",
  },

  {
    heading: "Final Interview Schedule",
    content:
      "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum",
    time: "8.45am",
  },
  {
    heading: "Final Interview Schedule",
    content:
      "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum",
    time: "8.45am",
  },
];
export const calimList = [
  { title: "Total Required", value: 18, description: "Employee" },
  { title: "Available", value: 12, description: "Employee" },
  { title: "On Leave", value: 4, description: "Employee" },
  { title: "Pending Approval", value: 2, description: "Employee" },
];
export const shiftHistoryData = [
  {
    date: "30/04/2024 9:20 PM",
    user: "Mammutty P S",
    action: "Added to shift",
    role: "Administrator",
  },
  {
    date: "27/04/2024 9:20 PM",
    user: "Vaisakh T G",
    action: "New leave requested",
  },
  { date: "26/04/2024 9:20 PM", user: "Shehna Shaji", action: "Claimed shift" },
  {
    date: "25/04/2024 9:20 PM",
    user: "Mammutty P S",
    action: "Opened shift claim",
  },
  {
    date: "25/04/2024 9:20 PM",
    action: "Shift Created",
    additional: "with 15 Employees",
  },
];
export const companySettingSideList = [
  {
    id: 1,
    link: "/admin/company/general",
    name: "Company profile",
  },
  {
    id: 2,
    link: "/admin/company/bank_details",
    name: "Organisation bank and tax details",
  },
  {
    id: 3,
    link: "/admin/company/signatory",
    name: "Company Signatory",
  },
  {
    id: 4,
    link: "/admin/company/calender",
    name: "Calender settings",
  },
];

export const jobSubList = [
  {
    id: 1,
    link: "",
    name: "Candidate",
  },
  {
    id: 2,
    link: "",
    name: "Promote",
  },
  {
    id: 3,
    link: "",
    name: "Refer",
  },
];

// list menu items
export const employeemenuitems = [
  {
    id: 1,
    iconType: "image",
    iconSrcBlack: "/assets/icons/employee_access/header/dashbord-black.svg",
    iconSrcActive:
      "/assets/icons/employee_access/header/dashboard/dashbordColor.svg",
    name: "Dashboard",
    path: "/employee-access/dashboard",
    active: "dashboard",
  },
  {
    id: 2,
    iconType: "image",
    iconSrcBlack:
      "/assets/icons/employee_access/header/attendance-black (2).svg",
    iconSrcActive: "/assets/icons/employee_access/header/attendance-color.svg",
    name: "Attendance",
    path: "/employee-access/attendance",
    active: "attendance",
  },
  {
    id: 3,
    iconType: "image",
    iconSrcBlack: "/assets/icons/employee_access/header/roster-black.svg",
    iconSrcActive: "/assets/icons/employee_access/header/roster-color.svg",
    name: "Roster",
    path: "/employee-access/roster",
    active: "roster",
  },
  {
    id: 4,
    iconType: "image",
    iconSrcBlack: "/assets/icons/employee_access/header/time-black.svg",
    iconSrcActive: "/assets/icons/employee_access/header/time-sheet-color.svg",
    name: "Time Sheet",
    path: "/employee-access/timesheet",
    active: "timesheet",
  },
  {
    id: 5,
    iconType: "image",
    iconSrcBlack: "/assets/icons/employee_access/header/leave-black.svg",
    iconSrcActive: "/assets/icons/employee_access/header/leaveColor.svg",
    name: "Leave",
    path: "/employee-access/leave/request",
    active: "leave",
  },
];

// list activity items

export const employeeAccessActivityList = [
  {
    icon: "/assets/icons/admin/projectTask.svg",
    label: "Project & Task",
    path: "/employee-access/project/projectManagement",
  },
  {
    icon: "/assets/icons/admin/newsEvent.svg",
    label: "News & Events ",
    path: "/employee-access/news-events/view",
  },
  // {
  //   icon: "/assets/icons/admin/payroll.svg",
  //   label: "Payroll",
  //   path: "/employee-access/payroll",
  // },
  // {
  //   icon: "/assets/icons/admin/leaveday.svg",
  //   label: "Leave",
  //   // path: "/admin/leave/request",
  // },
  // {
  //   icon: "/assets/icons/admin/shift.svg",
  //   label: "Shift",
  //   // path: "/admin/shift",
  // },
  // {
  //   icon: "/assets/icons/admin/roster.svg",
  //   label: "Roster",
  //   // path: "/admin/roster",
  // },

  // {
  //   icon: "/assets/icons/admin/setup.svg",
  //   label: "Setup",
  //   // path: "/admin/setup/email",
  // },
  // {
  //   icon: "/assets/icons/admin/recruiter-black.svg",
  //   label: "Recruiter",
  //   // path: "/admin/recruiter",
  // },
  // {
  //   icon: "/assets/icons/admin/hiring-black.svg",
  //   label: "Hiring",
  //   // path: "/admin/hiring",
  // },
  // {
  //   icon: "/assets/icons/admin/employee-black.svg",
  //   label: "Employee",
  //   // path: "/admin/employee",
  // },
];
export const getemployeeaccessItems = (permissions = []) => [
  {
    icon: "/assets/icons/employee_access/header/profilemang.svg",
    label: "Profile Management",
    path: "/employee-access/profile/primary",
    active: "profile-management",
  },
  ...(
    ["role-list", "subscription-list","employee-list", "job-list","candidate-list","report-list","settings-list","Hiring-dashboard","shift-list","project-list","task-list","news-list","events-list","holiday-type-list","bank-holiday-list","leave-request-list","roster-list","roster-calendar-list",].some(permission => permissions.includes(permission))
      ? [{
          icon: "/assets/icons/employee_access/header/switch.svg",
          label: `Switch to Admin`,
          path: "/admin/dashboard",
        }]
      : []
  ),
  {
    icon: "/assets/icons/admin/logout.svg",
    label: "Log Out",
    path: "/login",
  },
];


//ADMIN NEWS & EVENT HEADER
export const getnewsEventHeaderList = (permissions = []) => [
  { id: 1, name: "News", link: "/admin/news-event/news" },
  ...(
    permissions.includes("events-list")
      ? [{ id: 2, name: "Events", link: "/admin/news-event/event" },]
      : []
  ),
  { id: 3, name: "News & Events", link: "/admin/news-event/view" },
];
