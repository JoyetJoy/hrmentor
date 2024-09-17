import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AdminHeader } from "../../components/layouts/admin/Header";
import { useQuery } from "@tanstack/react-query";
import { GET_USER } from "@/api/auth";
import { newRequest } from "@/api";
import ScrollBack from "@/components/common/ScrollBack";
import { useUserStore } from "@/lib/slices/auth.slice";

export const AdminLayout = () => {
  let token = localStorage.getItem("token");
  const { setUser } = useUserStore((state) => ({
    setUser: state.setUser,
  }));

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", token],
    queryFn: () =>
      newRequest.get(GET_USER).then((res) => {
        return res.data;
      }),
    cacheTime: 5000000,
    staleTime: 5000000,
    enabled: !!token,
  });

  useEffect(() => {
    if (profile) {
      setUser(profile?.data);
    }
  }, [profile]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-yipred h-9 w-9 animate-spin rounded-full border-b-2 border-t-2"></div>
      </div>
    );
  }

  return token ? (
    <>
      <ScrollBack />
      <div className="h-full w-full bg-gray-100 px-12 py-4">
        <AdminHeader />
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};
