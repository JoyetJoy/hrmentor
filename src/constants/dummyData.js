import tickgreen from "/assets/icons/admin/tick-green.svg";
import tickgray from "/assets/icons/admin/tick-gray.svg";

export const employeeDetails = [
  {
    title: "Total Employees",
    value: "750",
    path:"/admin/employee",
    percentage: "10.0%",
    trend: "plus",
    description: "Employees",
  },
  {
    title: "Job Open",
    value: "27",
    path:"/admin/recruiter/jobs",
    percentage: "10.0%",
    trend: "plus",
    description: "Jobs",
  },
  {
    title: "Job Applied",
    value: "1270",
    percentage: "10.0%",
    trend: "minus",
    description: "Applicants",
  },
  {
    title: "Employees on Holiday",
    value: "85",
    percentage: "10.0%",
    trend: "plus",
    description: "Employees",
  },
];
export const meetings = [
  {
    date: "16",
    month: "July",
    title: "Board meeting",
    details: "11:30  |  You and 13+ more",
  },
  {
    date: "17",
    month: "July",
    title: "Team Standup",
    details: "09:00  |  You and 5+ more",
  },
  {
    date: "18",
    month: "July",
    title: "Project Review",
    details: "15:00  |  You and 8+ more",
  },
  {
    date: "19",
    month: "July",
    title: "Client Call",
    details: "14:00  |  You and 3+ more",
  },
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
export const menuitems = [
  {
    id: 1,
    iconType: "image",
    iconSrcBlack: "/assets/icons/admin/dashbordBlack.svg",
    iconSrcActive: "/assets/icons/admin/dashbordcolor.svg",
    name: "Dashboard",
    path: "/admin/dashboard",
    active: "dashboard",
  },
  {
    id: 2,
    iconType: "image",
    iconSrcBlack: "/assets/icons/admin/recruiter-black.svg",
    iconSrcActive: "/assets/icons/admin/recruterColor.svg",
    name: "Recruiter",
    path: "/admin/recruiter",
    active: "recruiter",
  },
  {
    id: 3,
    iconType: "image",
    iconSrcBlack: "/assets/icons/admin/hiring-black.svg",
    iconSrcActive: "/assets/icons/admin/hiringColor.svg",
    name: "Hiring",
    path: "/admin/hiring",
    active: "hiring",
  },
  {
    id: 4,
    iconType: "image",
    iconSrcBlack: "/assets/icons/admin/employee-black.svg",
    iconSrcActive: "/assets/icons/admin/employeeColor.svg",
    name: "Employee",
    path: "/admin/employee",
    active: "employee",
  },
  {
    id: 5,
    iconType: "image",
    iconSrcBlack: "/assets/icons/admin/attendance-black.svg",
    iconSrcActive: "/assets/icons/admin/attendance-color.svg",
    name: "Attendance",
    path: "/admin/attendance",
    active: "attendance",
  },
];

export const adminItems = [
  {
    icon: "/assets/icons/admin/profilemang.svg",
    label: "Profile Management",
    path: "/admin/profile-management",
    active: "profile-management",
  },
  {
    icon: "/assets/icons/admin/company.svg",
    label: "Company Settings",
    path: "/admin/company/general",
  },
  {
    icon: "/assets/icons/admin/ac.svg",
    label: "Account Management",
    path: "/admin/role",
  },
  { icon: "/assets/icons/admin/logout.svg", label: "Log Out", path: "/logout" },
];

export const setupItems = [
  {
    id: 1,
    name: "Attendance",
    active: "attendance",
    path: "",
  },
  {
    id: 2,
    name: "Shift",
    active: "shift",
    path: "/",
  },
  {
    id: 3,
    name: "Roster",
    active: "roster",
    path: "",
  },
  {
    id: 4,
    name: "Email",
    active: "email",
    path: "/admin/setup/email",
  },
  {
    id: 5,
    name: "Basic Settings",
    active: "basic settings",
    path: "/admin/setup/basic-settings",
  },
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
export const rosterHeaderList = [
  { id: 1, name: "Roster List", link: "/admin/roster" },
  {
    id: 2,
    name: "Settings",
    link: "",
  },
];
export const activityItems = [
  { icon: "/assets/icons/admin/project.svg", label: "Project" },
  { icon: "/assets/icons/admin/task.svg", label: "Task" },
  { icon: "/assets/icons/admin/payroll.svg", label: "Payroll" },
  {
    icon: "/assets/icons/admin/leaveday.svg",
    label: "Leave",
    path: "/admin/leave/request",
  },
  {
    icon: "/assets/icons/admin/shift.svg",
    label: "Shift",
    path: "/admin/shift",
  },
  {
    icon: "/assets/icons/admin/roster.svg",
    label: "Roster",
    path: "/admin/roster",
  },

  {
    icon: "/assets/icons/admin/setup.svg",
    label: "Setup",
    path: "/admin/setup",
  },
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
    link: "/admin/company/",
    name: "Company profile",
  },
  {
    id: 2,
    link: "/admin/company",
    name: "Organisation bank and tax details",
  },
  {
    id: 3,
    link: "/admin/company",
    name: "Company Signatory",
  },
  {
    id: 4,
    link: "/admin/company",
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
 
// EMPLOYEE ACCESS

 // list menu items
export const employeemenuitems = [
  {
    id: 1,
    iconType: "image",
    iconSrcBlack: "/assets/icons/employee_access/header/dashbord-black.svg",
    iconSrcActive: "/assets/icons/employee_access/header/dashbord-color.svg",
    name: "Dashboard",
    path: "/employee_access/dashboard",
    active: "dashboard",
  },
  {
    id: 2,
    iconType: "image",
    iconSrcBlack: "/assets/icons/employee_access/header/attendance-black (2).svg",
    iconSrcActive: "/assets/icons/employee_access/header/attendance-color.svg",
    name: "Attendance",
    path: "/employee_access/attendance",
    active: "attendance",
  },
  {
    id: 3,
    iconType: "image",
    iconSrcBlack: "/assets/icons/employee_access/header/roster-black.svg",
    iconSrcActive: "/assets/icons/employee_access/header/roster-color.svg",
    name: "Roster",
    path: "/employee_access/roster",
    active: "roster",
  },
  {
    id: 4,
    iconType: "image",
    iconSrcBlack: "/assets/icons/employee_access/header/time-black.svg",
    iconSrcActive: "/assets/icons/employee_access/header/time-sheet-color.svg",
    name: "Time Sheet",
    path: "/employee_access/timesheet",
    active: "timesheet",
  },
  {
    id: 5,
    iconType: "image",
    iconSrcBlack: "/assets/icons/employee_access/header/leave-black.svg",
    iconSrcActive: "/assets/icons/employee_access/header/leave-color.svg",
    name: "Leave",
    path: "/employee_access/leave",
    active: "leave",
  },
 
];
 
// list activity items

export const employeeAccessActivityList =[
  { icon: "/assets/icons/admin/project.svg", label: "Project" },
  { icon: "/assets/icons/admin/task.svg", label: "Task" },
] 
export const employeeaccessItems = [
  {
    icon: "/assets/icons/employee_access/header/profilemang.svg",
    label: "Profile Management",
    path: "/employee_access/profile/primary",
    active: "profile-management",
  },
  { icon: "/assets/icons/admin/logout.svg", label: "Log Out", path: "/logout" },

]