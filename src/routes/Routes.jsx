import { AdminLayout } from "@/layouts/admin/AdminLayouts";
import Login from "@/pages/auth/admin/Login";
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AdminRoutes } from "./admin/AdminRoutes";
import ErrorPage from "@/pages/Error";
import JobAreaListing from "@/pages/jobarea/Listing";
import CareerDetail from "@/pages/jobarea/Detail";
import ApplyJob from "@/pages/jobarea/Apply";
import EmployeeAccessLayouts from "@/layouts/employee_access/EmployeeAccessLayouts";
import { EmployeeAccessRoutes } from "./employee_access/EmployeeAccessRoutes";
import OnboardingForm from "@/pages/onboarding";

export const appRoutes = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/careers",
    element: <JobAreaListing />,
  },
  {
    path: "/career/:id",
    element: <CareerDetail />,
  },
  {
    path: "/career/apply/:id",
    element: <ApplyJob />,
  },
  {
    path: "",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: AdminRoutes,
  },
  {
    path:"employee-access",
    element:<EmployeeAccessLayouts/>,
    errorElement: <ErrorPage />,
    children:EmployeeAccessRoutes,
  },
  {
    path: "onboarding-form",
    element: <OnboardingForm/>,
  },
]);
