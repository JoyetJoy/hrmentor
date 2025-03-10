// MASTER APIS ENDPOINTS
import axios from "axios";

// ---- EMPLOYEE MASTER APIS ----
export const newRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
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
// empolyee type
export const EMPLOYEE_TYPE = "employment-types";
// listing
export const EMPLOYEE_TYPE_LIST = "active-employment-types";

// employee department
export const EMPLOYEE_DEPARTMENT = "departments";
// listing
export const EMPLOYEE_DEPARTMENT_LIST = "active-departments";

// employee designation
export const EMPLOYEE_DESIGNATION = "designations";
// listing
export const EMPLOYEE_DESIGNATION_LIST = "active-designations";

// employee document type
export const EMPLOYEE_DOCUMENT_TYPE = "employee-document-types";
// listing
export const EMPLOYEE_DOCUMENT_TYPE_LIST = "active-employee-document-types";

// employee ethnicity
export const EMPLOYEE_ETHNICITY = "ethnicity";
// listing
export const EMPLOYEE_ETHNICITY_LIST = "active-ethnicity";
//employee religious/sexual orientation
export const EMPLOYEE_RELIGIOUS_AND_SEXUAL = "sexual-orientations";

// employee EeoJobCategoryType
export const EMPLOYEE_EEO_CATEGORY = "EeoJobCategoryType";
// listing
export const EMPLOYEE_EEO_CATEGORY_LIST = "active-EeoJobCategoryType";

// employee work location
export const EMPLOYEE_WORK_LOCATION = "worklocations";
// list
export const EMPLOYEE_WORK_LOCATION_LIST = "active-worklocations";
//work area
export const EMPLOYEE_WORK_AREA = "employee-work-area";
//change shift employee list
export const EMPLOYEE_LIST_SHIFT = "get-employees"
//swap shift
export const SWAP_SHIFT = "change-shift-roaster";
//add roster
export const ADD_ROSTER = "add-new-shift-roaster";

// Email Onboard Mail Send
export const EMPLOYEE_ONBOARD_MAIL_SEND = "employee-onboarding-mail-send";

// employee category
export const EMPLOYEE_DOCUMENT_CATEGORY = "document-categories";

// nationality
export const NATIONALITY = "nationalities";

// countries
export const COUNTRY = "countries";
// state from country
export const STATE_COUNTRY = "states";

// CITIES
export const COUNTRY_CITY = "cities";

// roles list
export const ROLES_LIST = "roles-lists";

// SKILL field type
export const SKILL_FIELD_TYPE = "active-qualifications-types";

// DEFAULT MASTERS
export const SALARY_DEFAULT_MASTERS = "default-masters";

// Account type
export const ACCOUNT_TYPE = "employee-bank-account-type";

// Account type list
export const ACCOUNT_TYPE_LIST = "active-bank-account-type";

// ---- RECRUITER MASTER APIS ----

// Job Description
export const JOB_DESCRIPTION = "JobDescriptions";
// LIST
export const JOB_DESCRIPTION_LIST = "Active-JobDescriptions";
// PROFILE QUESTION
export const PROFILE_QUESTION = "ProfileQuestions";
// QUALIFICATION
export const QUALIFICATION = "EducationQualifications";
// INTERVIEW TYPE
export const INTERVIEW_TYPE = "InterviewTypes";
// ROASTER LIST
export const ROASTER_LIST_GET = "/team-employee-rosters-list";
// ROASTER LISTING
export const ROASTER_LISTING = "/roaster-table"
// CANDIDATE TYPE
export const CANDIDATE_TYPE = "CandidateTypes";
// CANDIDATE TYPE LIST
export const CANDIDATE_TYPE_LIST = "Active-CandidateTypes";
//DOCUMENTS TYPE LIST
export const DOCUMENTS_TYPE = "CandidateDocumentTypes";
// Experience
export const MINIMUM_Experience = "MinimumExperience";
// LIST
// Experience
export const MINIMUM_EXPERIENCE_LIST = "Active-MinimumExperience";
// SOURCES
export const SOURCES = "Source";
// LIST
export const SOURCES_LIST = "Active-Source";
// GET PROFILE QUESTIONS
export const GET_PROFILE_QUESTIONS = "Active-ProfileQuestions";
// CAREER FILTER LIST
export const CAREER_FILTER_LIST = "career-page-filter";
// INTERVIEW TYPE LIST
export const REC_INTERVIEW_TYPES = "Active-InterviewTypes";
// CANDIDATE MASTER
export const CANDIDATE_MASTER = "candidate-default-master";
// CANDIDATE INTERVIEW START STOP
export const CANDIDATE_INTERVIEW_START_STOP = "candidate-interview-start-stop";

//-----EMPLOYEE SECTION API-----

//EMPLOYEE CLOCKIN
export const CLOCK_IN = "/employee-access/employee-clock-in";
//ROASTER GET
export const ROASTER_GET = "/employee-rosters";
// TEAM ROSTER GET
export const TEAM_ROSTER_GET = "/employee-team-rosters";
// TIME SHEET
export const TIME_SHEET = "/employee-time-sheets";

//ATTENDANCE
export const ATTENDANCE = "/employee-attendances";
// TEAM ATTENDANCE
export const TEAM_ATTENDANCE = "/employee-team-attendances";
// ATTENDANCES
export const ATTENDANCES = "/role-attendances";
// ATTENDACE GET
export const ATTENDANCE_GET = "/attendance-by-id";
// CHANGE ATTENDANCE
export const CHANGE_ATTENDANCE = "/change-attendance";
//SHIFT EMPLOYEE DETAILS
export const TEAMROSTER_EMPLOYEELIST = "/roster-employee-list";
//EMPLOYEE TEAM TIMESHEET LIST
export const TEAM_TIMESHEET_EMPLOYEELIST = "/employee-team-time-sheets";
// EMPLOYEE LIST
export const EMPLOYEE_LIST = "/team-employees";

//  LEAVE REQUEST LIST
export const LEAVE_REQUEST_LIST = "admin-employee-leave-requests";

export const PENDING_LEAVE_REQUEST_LIST = "admin-employee-pending-leave-request-list";
// COMPLETED LEAVE REQUEST LIST
export const COMPLETED_LEAVE_REQUEST_LIST = "admin-employee-completed-leave-request-list";


//REFERENCE TEMPLATE
export const TEMPLATE="reference-mail-templates"
// EMPLOYEE LEAVE REQUEST LIST
export const EMPLOYEE_LEAVE_REQUEST_LIST = "employee-leave-requests";

// EMPLOYEE BANK HOLIDAYS
export const EMPLOYEE_BANK_HOLIDAYS = "employee-bank-holidays";

// EMPLOYEE TEAM LEAVE APPLICATIONS
export const EMPLOYEE_TEAM_LEAVE_APPLICATIONS =
  "employee-team-leave-applications";

// EMPLOYEE LEAVE SHIFTS
export const EMPLOYEE_LEAVE_SHIFTS = "employee-leave-shifts";

// EMPLOYEE LEAVE TYPE
export const EMPLOYEE_LEAVE_TYPE = "employee-leave-types";

// EMPLOYEE LEAVE REQUEST
export const EMPLOYEE_LEAVE_REQUEST = "employee-leave-requests-send";

// EMPLOYEE LEAVE REQUEST DETAILS
export const EMPLOYEE_LEAVE_REQUEST_DEATAILS = "employee-leave-request-details";

// EMPLOYEE LIST
export const EMPLOYEE_TEAM_LIST = "employee-team-list";

// EMPLOYEE TEAM LEAVE LIST
export const EMPLOYEE_TEAM_LEAVE_TYPE = "employee-team-leave-types";

// EMPLOYEE TEAM LEAVE APPLY
export const EMPLOYEE_TEAM_LEAVE_APPLY = "employee-team-leave-apply";
//STATUS LIST
export const STATUS_UPDATELIST ="reference-status-list"

// ADMIN EMPLOYEE LEAVE UPDATE
export const ADMIN_EMPLOYEE_LEAVE_UPDATE ="admin-employee-leave-update"
