import trendingup from '/assets/icons/admin/trending-up.svg'
import trendingdown from '/assets/icons/admin/trending-down.svg'
import tickgreen from '/assets/icons/admin/tick-green.svg';
import tickgray from '/assets/icons/admin/tick-gray.svg';
import { LayoutGrid, Users, UserPlus, Briefcase } from "lucide-react"

export const employeeDetails = [
  {
    title: "Total Employees",
    value: "856",
    percentage: "10.0%",
    icon: trendingup,
    description: "Employees",
  },
  {
    title: "Job Views",
    value: "856",
    percentage: "10.0%",
    icon: trendingup,
    description: "Viewers",
  },
  {
    title: "Application",
    value: "856",
    percentage: "10.0%",
    icon: trendingdown,
    description: "Employees",
  },
  {
    title: "On leave",
    value: "856",
    percentage: "10.0%",
    icon: trendingdown,
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
        bgColor: '#D1FADF',
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
        bgColor: '#F1F1F1',
        textColor: '#667085',
        imgSrc: tickgray,
        value: [
          "Audit log and data history",
          "Unlimited individual users",
          "Unlimited individual users",
        ],
      },
      {
        title: "Employees",
        bgColor: '#F1F1F1',
        textColor: '#667085',
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
        bgColor: '#D1FADF',
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
        bgColor: '#D1FADF',
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
        bgColor: '#F1F1F1',
        textColor: '#667085',
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
        bgColor: '#D1FADF',
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
        bgColor: '#D1FADF',
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
        bgColor: '#D1FADF',
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
        bgColor: '#D1FADF',
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
        bgColor: '#D1FADF',
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
  { id: 1, icon: LayoutGrid, name: "Dashboard", path: '/admin/dashboard', active: "dashboard" },
  { id: 2, icon: Briefcase, name: "Recruiter", path: '/admin/recruiter/index', active: "recruiter" },
  { id: 3, icon: UserPlus, name: "Hiring", path: '/hiring', active: "hiring" },
  { id: 4, icon: Users, name: "Employee", path: '/admin/employees/list', active: "employees" },
  { id: 5, iconType: 'image', iconSrc: '/assets/icons/admin/attendance-black.svg', name: "Attendance", path: '/attendance', active: "attendance" }
];

export const adminItems = [
  {
    icon: '/assets/icons/admin/profilemang.svg',
    label: "Profile Management",
    path: "/profile-management",
  },
  { icon: '/assets/icons/admin/company.svg', label: "Company Settings", path: "/company-settings" },
  {
    icon: '/assets/icons/admin/ac.svg',
    label: "Account Management",
    path: "/admin/role",
  },
  { icon: '/assets/icons/admin/logout.svg', label: "Log Out", path: "/logout" },
];

export const activityItems = [
  { icon: '/assets/icons/admin/project.svg', label: "Project" },
  { icon: '/assets/icons/admin/task.svg', label: "Task" },
  { icon: '/assets/icons/admin/roster.svg', label: "Roster" },
  { icon: '/assets/icons/admin/payroll.svg', label: "Payroll" },
  { icon: '/assets/icons/admin/setup.svg', label: "Setup" },
];
