import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AdminHeader } from "../../components/layouts/admin/Header";
import { useQuery } from "@tanstack/react-query";
import { GET_USER } from "@/api/auth";
import { newRequest } from "@/api";
import ScrollBack from "@/components/common/ScrollBack";
import { useUserStore } from "@/lib/slices/auth.slice";

export const AdminLayout = () => {
  const token = localStorage.getItem("super_token");
  const { setUser } = useUserStore((state) => ({
    setUser: state.setUser,
  }));
  const location = useLocation(); 

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", token],
    queryFn: () =>
      newRequest.get(GET_USER).then((res) => {
        return res.data;
      }),
    enabled: !!token,
  });

  useEffect(() => {
    if (profile) {
      setUser(profile?.data?.user);
    }
  }, [profile]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
      </div>
    );
  }

  // Redirect to dashboard if the current path is "/" without content
  if (location.pathname === "/") {
    return <Navigate to="/admin/dashboard" />;
  }

  return token ? (
    <>
      <ScrollBack />
      <div className="w-full bg-gray-100 px-12 py-4">
        <AdminHeader />
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};
