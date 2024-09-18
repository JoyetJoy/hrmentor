import { AdminLayout } from "@/layouts/admin/AdminLayouts";
import Login from "@/pages/auth/admin/Login";
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AdminRoutes } from "./children/admin/AdminRoutes";
import ErrorPage from "@/pages/Error";

export const appRoutes = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: AdminRoutes,
  },
  {
    path: "*",
    element: <Navigate to="/admin/dashboard" replace />,
  },
]);
