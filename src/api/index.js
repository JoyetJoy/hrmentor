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
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
};

addAuthorizationInterceptor(newRequest);
addAuthorizationInterceptor(XFormRequest);
addAuthorizationInterceptor(newFormRequest);

// ROLES AND PERMISSIONS ENDPOINTS
export const ROLES = "roles";
export const PAGINATED_ROLES = "paginated-roles";
export const GET_PERMISSIONS = "permissions";

// EMPLOYEE UNIQUE ID
export const EMPLOYEE_UNIQUE_ID = "employee-unique-id";

// EMPLOYEE
export const EMPLOYEE = "employee";
// ACTIVE EMPLOYEE
export const ACTIVE_EMPLOYEE = "active-employees";
// UPDATE EMPLOYEE
export const UPDATE_EMPLOYEE = "employee-update";
// WORK INFORMATION
export const EMPLOYEE_WORK_INFO = "employee-work-informations";
// SKILLS
export const EMPLOYEE_SKILLS = "employee-skill-qualifications/list";
