import axios from "axios";


export const basicRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const newRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
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
    const token = localStorage.getItem("secret_itoken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
};

addAuthorizationInterceptor(newRequest);
addAuthorizationInterceptor(XFormRequest);
addAuthorizationInterceptor(newFormRequest);



