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
      localStorage.getItem("super_token")||
      localStorage.getItem("hr_token")||
      localStorage.getItem("manager_token")||
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

// employee EeoJobCategoryType
export const EMPLOYEE_EEO_CATEGORY = "EeoJobCategoryType";
// listing
export const EMPLOYEE_EEO_CATEGORY_LIST = "active-EeoJobCategoryType";

// employee work location
export const EMPLOYEE_WORK_LOCATION = "worklocations";
// list
export const EMPLOYEE_WORK_LOCATION_LIST = "active-worklocations";
//work area
export const EMPLOYEE_WORK_AREA="employee-work-area"

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
// CANDIDATE TYPE
export const CANDIDATE_TYPE = "CandidateTypes";
// CANDIDATE TYPE LIST
export const CANDIDATE_TYPE_LIST = "Active-CandidateTypes";
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
//SHIFT EMPLOYEE DETAILS
export const TEAMROSTER_EMPLOYEELIST = "/roster-employee-list";
//EMPLOYEE TEAM TIMESHEET LIST
export const TEAM_TIMESHEET_EMPLOYEELIST = "/employee-team-time-sheets"

//  LEAVE REQUEST LIST
export const LEAVE_REQUEST_LIST = "admin-employee-leave-requests"

