import { AdminLayout } from "@/layouts/admin/AdminLayouts";
import Login from "@/pages/auth/admin/Login";
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AdminRoutes } from "./admin/AdminRoutes";
import ErrorPage from "@/pages/Error";
import JobAreaListing from "@/pages/jobarea/Listing";
import CareerDetail from "@/pages/jobarea/Detail";

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
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: AdminRoutes,
  },

  {
    path: "*",
    element: <Navigate to="/admin" replace />,
  },
]);
