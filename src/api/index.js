import axios from "axios";

export const basicRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const basicXFormRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const newRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const XFormRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const newFormRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const addAuthorizationInterceptor = (request) => {
  request.interceptors.request.use((config) => {
    const token =
      localStorage.getItem("super_token") ||
      localStorage.getItem("hr_token") ||
      localStorage.getItem("manager_token") ||
      localStorage.getItem("employee_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
};

addAuthorizationInterceptor(newRequest);
addAuthorizationInterceptor(XFormRequest);
addAuthorizationInterceptor(newFormRequest);

// ADMIN DASHBOARD
export const ADMIN_DASHBOARD = "main-dashboard";

// ROLES AND PERMISSIONS ENDPOINTS
export const ROLES = "roles";
export const PAGINATED_ROLES = "paginated-roles";
export const GET_PERMISSIONS = "permissions";

// EMPLOYEE UNIQUE ID
export const EMPLOYEE_UNIQUE_ID = "employee-unique-id";

// EMPLOYEE
export const EMPLOYEE = "employee";
// EMPLOYEE RESCHEDULE
export const EMPLOYEE_RESCHEDULE = "employee-reschedule";
// EMPLOYEE STATUS
export const EMPLOYEE_STATUS = "employee-status-update";
// EMPLOYEE DETAILS
export const EMPLOYEE_DETAILS = "view-employee-page";
// ACTIVE EMPLOYEE
export const ACTIVE_EMPLOYEE = "active-employees";
// UPDATE EMPLOYEE
export const UPDATE_EMPLOYEE = "employee-update";
//SEND ONBORDING
export const SEND_ONBORDING = "employee-onboarding-mail-send";
// WORK INFORMATION
export const EMPLOYEE_WORK_INFO = "employee-work-informations";
// SKILLS
export const EMPLOYEE_SKILLS = "employee-skill-qualifications";
// EXPERIENCE
export const EMPLOYEE_EXPERIENCE = "employee-experiences";
//DBS CHECK
export const EMPLOYEE_DBS_CHECK = "employee-dbscheck";
//REFERENCE
export const EMPLOYEE_REFERENCE = "employee-references";
// MEMBERSHIP
export const EMPLOYEE_MEMBERSHIP = "employee-registraion-membership";
// MEMBERSHIP UPDATE
export const EMPLOYEE_MEMBERSHIP_UPDATE =
  "update-employee-registration-membership";
// RIGHT TO WORK
export const EMPLOYEE_RIGHT_TO_WORK = "employee-rightToWork";
// RIGHT TO WORK UPDATE
export const EMPLOYEE_RIGHT_TO_WORK_UPDATE = "update-employee-rightToWork";
// EMERGENCY CONTACTS
export const EMPLOYEE_EMERGENCY_CONTACTS = "employee-emergency-contacts";
// UPDATE EMERGENCY CONTACTS
export const UPDATE_EMPLOYEE_EMERGENCY_CONTACTS =
  "update-employee-emergency-contacts";
// BANK DETAILS
export const EMPLOYEE_BANK_DETAILS = "employee-bank-details";
// UPDATE BANK DETAILS
export const UPDATE_BANK_DETAILS = "update-bank-account";
// EMPLOYEE DOCUMENTS
export const EMPLOYEE_DOCUMENTS = "employee-documents";
// UPDATE EMPLOYEE DOCUMENTS
export const UPDATE_EMPLOYEE_DOCUMENTS = "update-employee-document";
// EMPLOYEE SALARY DETAILS
export const EMPLOYEE_SALARY_DETAILS = "employee-salary-details";

// PROFILE MANAGEMENT
export const PROFILE_MANAGEMENT = "profile";

// BANK HOLIDAYS
export const TEAM_BANK_HOLIDAY = "team-bank-holiday";

// WORK LOCATIONS
export const WORK_LOCATIONS = "active-worklocations";

// HOLIDAY STATUS
export const HOLIDAY_STATUS = "employee-holiday-basic-settings";

// HOLIDAY AVAILABLE SETTING
export const HOLIDAY_AVAILABLE_SETTING =
  "employee-holiday-availabilty-settings";

// HOLIDAY ADVANCE SETTINGS
export const HOLIDAY_ADVANCE_SETTINGS = "holiday-advance-settings";

// COMPANY PROFILE BASIC
export const COMPANY_PROFILE_BASIC = "company-profile-settings";

// COMPANY BANK DETAILS
export const COMPANY_BANK_DETAILS = "company-profile-bank-details";

// COMPANY SIGNATURE

export const COMPANY_SIGNATURE = "company-profile-signature";

// BUSINESS TYPE
export const BUSINESS_TYPE = "company-bussiness-type";

// COMPANY CALENDER
export const COMPANY_CALENDER = "company-calender-settings";

//EMPLOYEE SECTION

//DASHBOARD
export const DASHBOARD = "employee-access/dashboard";
//CLOCKIN
export const CLOCKIN = "employee-current-running-shift";
//BREAKLIST
export const BREAKLIST = "employee-shift-break-times";
//RUNNINGBREAK
export const RUNNINGBREAK = "employee-running-break";
//STARTBREAK
export const STARTBREAK = "employee-start-break";
//ENDBREAK
export const ENDBREAK = "employee-running-break-stop";
//CLOCKOUT
export const CLOCKOUT = "employee-access/employee-clock-out";
//AVAILABLE SLOT
export const AVAILABLE_SLOT = "shift-claim-request";

// ADMIN NEWS
export const NEWS_LISt = "news";

//NEWS ALL VIEW
export const ALL_NEWS ="news-list"

// EVENT ALL VIEW
export const ALL_EVENT ="event-list"

// ROSTER CLAIM DETAILS
export const ROSTER_CLAIM = "get-and-show-roster-count-details";

// Admin event
export const EVENT_LIST = "events";

//Shift claim
export const SHIFT_CLAIM = "shift-claim-on-of";

// Project
export const PROJECT_LIST = "project";

// Task
export const TASK_LIST = "task";

// ALL STATUS LIST
export const ALL_STATUS_LIST = "get-all-status";
