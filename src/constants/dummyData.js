import tickgreen from "/assets/icons/admin/tick-green.svg";
import tickgray from "/assets/icons/admin/tick-gray.svg";

export const employeeDetails = [
  {
    title: "Total Employees",
    value: "750",
    percentage: "10.0%",
    trend: "plus",
    description: "Employees",
  },
  {
    title: "Job Open",
    value: "27",
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
    title: "Resigned Employees",
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
    path: "/admin",
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
    path: "/company-settings",
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
    path: "/admin/setup/calender",
  },
  {
    id: 2,
    name: "Shift",
    active: "shift",
    path: "/admin/setup/shift",
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
 export const rosterHeaderList =[
  {id:1, name:"Roster List" ,link:"/admin/roster"},
  {
    id:2, name:"Settings",link:""
  }
 ]
export const activityItems = [
  { icon: "/assets/icons/admin/project.svg", label: "Project" },
  { icon: "/assets/icons/admin/task.svg", label: "Task" },
  { icon: "/assets/icons/admin/roster.svg", label: "Roster", path:"/admin/roster" },
  { icon: "/assets/icons/admin/payroll.svg", label: "Payroll" },
  { icon: "/assets/icons/admin/payroll.svg", label: "Leave", path: "/admin/leave/holidayrequest" },
  {
    icon: "/assets/icons/admin/setup.svg",
    label: "Setup",
    path: "/admin/setup/shift",
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
export const LeaveList = [
  {
    id: 1,
    name: "Leave request list",
    link: "/admin/leave/holidayrequest",
    icon: `<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.4193 18.8203V16.737H7.91927C7.68927 16.737 7.5026 16.5503 7.5026 16.3203C7.5026 16.0903 7.68927 15.9036 7.91927 15.9036H10.4193C10.4193 14.9845 11.1668 14.237 12.0859 14.237C12.0859 14.0924 12.1101 13.9545 12.1451 13.8203H7.91927C7.68927 13.8203 7.5026 13.6336 7.5026 13.4036C7.5026 13.1736 7.68927 12.987 7.91927 12.987H12.6618C12.9547 12.7307 13.3334 12.5703 13.7526 12.5703H15.4193C15.7243 12.5703 16.0064 12.6586 16.2526 12.802V5.75823C16.2526 5.66656 16.2405 5.57615 16.2259 5.48698H13.3359C12.6468 5.48698 12.0859 4.92615 12.0859 4.23698V1.34615C12.0005 1.33281 11.9151 1.32031 11.8276 1.32031H3.7526C2.83219 1.32031 2.08594 2.06656 2.08594 2.98698V17.987C2.08594 18.9074 2.83219 19.6536 3.7526 19.6536H10.6509C10.5072 19.4074 10.4193 19.1253 10.4193 18.8203ZM12.9193 10.9036H7.91927C7.68927 10.9036 7.5026 10.717 7.5026 10.487C7.5026 10.257 7.68927 10.0703 7.91927 10.0703H12.9193C13.1493 10.0703 13.3359 10.257 13.3359 10.487C13.3359 10.717 13.1493 10.9036 12.9193 10.9036ZM12.9193 7.15365C13.1493 7.15365 13.3359 7.34031 13.3359 7.57031C13.3359 7.80031 13.1493 7.98698 12.9193 7.98698H7.91927C7.68927 7.98698 7.5026 7.80031 7.5026 7.57031C7.5026 7.34031 7.68927 7.15365 7.91927 7.15365H12.9193ZM4.58594 4.23698H9.16927C9.39927 4.23698 9.58594 4.42365 9.58594 4.65365C9.58594 4.88365 9.39927 5.07031 9.16927 5.07031H4.58594C4.35594 5.07031 4.16927 4.88365 4.16927 4.65365C4.16927 4.42365 4.35594 4.23698 4.58594 4.23698ZM6.54719 15.8511L5.43594 16.9624C5.3576 17.0407 5.25177 17.0845 5.14135 17.0845C5.03094 17.0845 4.92469 17.0407 4.84677 16.9624L4.29135 16.407C4.12844 16.2441 4.12844 15.9807 4.29135 15.8178C4.45427 15.6549 4.7176 15.6549 4.88052 15.8178L5.14135 16.0786L5.9576 15.262C6.12052 15.0991 6.38385 15.0991 6.54677 15.262C6.70969 15.4245 6.7101 15.6882 6.54719 15.8511ZM6.54719 12.9345L5.43594 14.0457C5.3576 14.1241 5.25177 14.1678 5.14135 14.1678C5.03094 14.1678 4.92469 14.1241 4.84677 14.0457L4.29135 13.4903C4.12844 13.3274 4.12844 13.0641 4.29135 12.9011C4.45427 12.7382 4.7176 12.7382 4.88052 12.9011L5.14135 13.162L5.9576 12.3453C6.12052 12.1824 6.38385 12.1824 6.54677 12.3453C6.70969 12.5078 6.7101 12.7716 6.54719 12.9345ZM6.54719 10.0178L5.43594 11.1291C5.3576 11.2074 5.25177 11.2511 5.14135 11.2511C5.03094 11.2511 4.92469 11.2074 4.84677 11.1291L4.29135 10.5736C4.12844 10.4107 4.12844 10.1474 4.29135 9.98448C4.45427 9.82156 4.7176 9.82156 4.88052 9.98448L5.14135 10.2453L5.9576 9.42865C6.12052 9.26573 6.38385 9.26573 6.54677 9.42865C6.70969 9.59115 6.7101 9.8549 6.54719 10.0178ZM6.54719 7.10115L5.43594 8.2124C5.3576 8.29073 5.25177 8.33448 5.14135 8.33448C5.03094 8.33448 4.92469 8.29073 4.84677 8.2124L4.29135 7.65698C4.12844 7.49406 4.12844 7.23073 4.29135 7.06781C4.45427 6.9049 4.7176 6.9049 4.88052 7.06781L5.14135 7.32865L5.9576 6.51198C6.12052 6.34906 6.38385 6.34906 6.54677 6.51198C6.70969 6.67448 6.7101 6.93823 6.54719 7.10115Z" fill="currentColor"/>
<path d="M12.9141 4.23591C12.9141 4.46549 13.1011 4.65258 13.3307 4.65258H15.8199C15.7995 4.62966 15.7836 4.60341 15.762 4.58174L13.0036 1.81008C12.9761 1.78258 12.9432 1.76174 12.9141 1.73633V4.23591Z" fill="currentColor"/>
<path d="M17.0833 15.069H16.25V14.2357C16.25 13.7761 15.8762 13.4023 15.4167 13.4023H13.75C13.2904 13.4023 12.9167 13.7761 12.9167 14.2357V15.069H12.0833C11.6229 15.069 11.25 15.4419 11.25 15.9023V18.819C11.25 19.2794 11.6229 19.6523 12.0833 19.6523H17.0833C17.5437 19.6523 17.9167 19.2794 17.9167 18.819V15.9023C17.9167 15.4419 17.5437 15.069 17.0833 15.069ZM13.75 14.2357H15.4167V15.069H13.75V14.2357Z" fill="currentColor"/>
</svg>
`,
  },
  {
    id: 2,
    name: "Awaiting Approval",
    link: "/admin/leave/holidayrequest/awaitingapproval",
    icon: `<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.72506 14.6409C9.72616 13.9809 9.86224 13.3281 10.1249 12.7227C10.3876 12.1172 10.7714 11.5719 11.2526 11.1203C11.3476 11.0282 11.4478 10.9417 11.5526 10.861C11.2908 10.7657 11.0238 10.6854 10.7528 10.6204C15.0256 8.60579 13.6829 2.20275 8.89417 2.13281C4.0998 2.20004 2.76457 8.61594 7.04165 10.6236C5.73908 10.9349 4.53631 11.5703 3.54507 12.4709C2.55382 13.3715 1.80626 14.508 1.37181 15.7748C0.858127 17.1442 2.04614 18.7056 3.49288 18.6644H11.8899C11.2256 18.224 10.6804 17.6262 10.3027 16.9243C9.92503 16.2223 9.72661 15.438 9.72506 14.6409Z" fill="currentColor"/>
<path d="M14.5423 10.4395C13.7117 10.4398 12.8999 10.6863 12.2094 11.1479C11.519 11.6096 10.9809 12.2656 10.6632 13.033C10.3455 13.8003 10.2624 14.6447 10.4245 15.4593C10.5866 16.2739 10.9866 17.0221 11.5739 17.6094C12.1612 18.1967 12.9095 18.5967 13.724 18.7588C14.5386 18.9209 15.383 18.8379 16.1504 18.5202C16.9178 18.2025 17.5738 17.6644 18.0354 16.9739C18.497 16.2835 18.7436 15.4717 18.7439 14.6411C18.7421 13.5273 18.2989 12.4596 17.5113 11.672C16.7237 10.8845 15.6561 10.4412 14.5423 10.4395ZM14.5329 17.3776C14.4503 17.3772 14.3713 17.3441 14.3131 17.2855C14.2549 17.227 14.2222 17.1478 14.2222 17.0652C14.2222 16.9827 14.2549 16.9035 14.3131 16.845C14.3713 16.7864 14.4504 16.7533 14.5329 16.7529C14.6155 16.7533 14.6945 16.7864 14.7527 16.845C14.8109 16.9035 14.8436 16.9827 14.8436 17.0653C14.8436 17.1478 14.8109 17.227 14.7527 17.2855C14.6945 17.3441 14.6154 17.3772 14.5329 17.3776ZM15.0952 14.9191C15.0223 14.944 14.9587 14.9905 14.9129 15.0525C14.8671 15.1144 14.8414 15.1889 14.839 15.2659V16.1656C14.8378 16.2476 14.8043 16.3259 14.7459 16.3834C14.6874 16.441 14.6087 16.4733 14.5266 16.4733C14.4446 16.4732 14.3658 16.441 14.3074 16.3834C14.2489 16.3258 14.2155 16.2476 14.2142 16.1656V15.2659C14.2159 15.0632 14.2793 14.8659 14.396 14.7001C14.5126 14.5344 14.677 14.4081 14.8671 14.3381C15.0263 14.2762 15.1655 14.1722 15.2699 14.037C15.3743 13.9019 15.4397 13.7409 15.4593 13.5712C15.4789 13.4016 15.4518 13.2299 15.381 13.0746C15.3101 12.9192 15.1982 12.7861 15.0574 12.6897C14.9165 12.5933 14.752 12.5371 14.5815 12.5273C14.4111 12.5174 14.2412 12.5543 14.0901 12.6339C13.9391 12.7135 13.8126 12.8328 13.7244 12.979C13.6362 13.1252 13.5895 13.2927 13.5895 13.4634C13.5882 13.5454 13.5548 13.6237 13.4963 13.6812C13.4379 13.7388 13.3591 13.7711 13.2771 13.7711C13.195 13.7711 13.1163 13.7388 13.0578 13.6812C12.9994 13.6236 12.9659 13.5454 12.9647 13.4634C12.9646 13.1789 13.0421 12.8998 13.1889 12.6562C13.3358 12.4125 13.5463 12.2136 13.7978 12.0808C14.0493 11.9479 14.3324 11.8863 14.6164 11.9024C14.9004 11.9186 15.1746 12.0119 15.4094 12.1724C15.6443 12.3329 15.8309 12.5544 15.9492 12.8131C16.0674 13.0718 16.1128 13.3579 16.0805 13.6405C16.0482 13.9231 15.9393 14.1915 15.7657 14.4169C15.5921 14.6422 15.3602 14.8159 15.0952 14.9191Z" fill="currentColor"/>
</svg>
`,
  },
  {
    id: 3,
    name: "Completed",
    link: "/admin/leave/holidayrequest/completed",
    icon: `<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.2395 16.6367H1.93652C1.02743 16.6367 0.23955 17.364 0.300156 18.3034C0.330459 18.6973 0.481974 19.061 0.754701 19.3034C1.05773 19.6064 1.45167 19.7579 1.87591 19.7579H15.2395C15.4214 19.7579 15.5426 19.6064 15.5426 19.4549V16.9397C15.5426 16.7882 15.4214 16.6367 15.2395 16.6367Z" fill="currentColor"/>
<path d="M13.7528 11.5465C13.6316 11.5465 13.5104 11.5162 13.4195 11.4859L9.84375 9.91016V12.2435C9.84375 12.3344 9.87405 12.4253 9.96496 12.4859C10.0559 12.5465 11.4195 13.5162 13.6013 13.5162C14.7225 13.5162 16.0256 13.2738 17.4801 12.5162C17.571 12.4556 17.6316 12.3647 17.6316 12.2435V9.91016L14.0862 11.4556C13.9953 11.5465 13.8741 11.5465 13.7528 11.5465Z" fill="currentColor"/>
<path d="M19.6918 12.2438V13.2135C19.6918 13.3953 19.5402 13.5165 19.3887 13.5165H18.3584C18.2069 13.5165 18.0554 13.3953 18.0554 13.2135V12.2438C18.0554 11.9105 18.2675 11.6377 18.5705 11.5468V8.84985L13.8736 10.9105C13.8433 10.9105 13.7827 10.9408 13.7524 10.9408C13.7221 10.9408 13.6615 10.9408 13.6312 10.9105L8.50994 8.66803C8.38873 8.63773 8.32812 8.51651 8.32812 8.3953C8.32812 8.27409 8.38873 8.15288 8.50994 8.12257L13.6312 5.88015C13.7221 5.84985 13.7827 5.84985 13.8736 5.88015L18.9948 8.12257C19.116 8.18318 19.1766 8.30439 19.1766 8.3953V11.5468C19.4796 11.6377 19.6918 11.9105 19.6918 12.2438Z" fill="currentColor"/>
<path d="M2.26831 1.27344V16.031H1.96528C1.35921 16.031 0.753154 16.2734 0.328912 16.728V3.72798C0.298609 2.54616 1.14709 1.51586 2.26831 1.27344Z" fill="currentColor"/>
<path d="M7.72348 8.39471C7.72348 8.75835 7.93561 9.09168 8.26894 9.21289L9.23864 9.63713V12.2432C9.23864 12.5462 9.39015 12.819 9.60227 12.9705C9.69318 13.0311 11.178 14.122 13.6023 14.122C14.2386 14.122 14.9053 14.0311 15.5417 13.8796V16.0614C15.4508 16.0311 15.3295 16.0008 15.2386 16.0008H2.875V1.21289H15.2689C15.3598 1.21289 15.4205 1.24319 15.4811 1.3038C15.5417 1.36441 15.572 1.42501 15.572 1.51592V5.94016L14.1477 5.3038C14.0265 5.24319 13.9053 5.24319 13.7841 5.24319C13.6629 5.24319 13.5417 5.2735 13.4205 5.3341L8.29924 7.57653C7.96591 7.69774 7.72348 8.03107 7.72348 8.39471Z" fill="currentColor"/>
</svg>
`,
  },
];

