import ScrollBack from "@/components/common/ScrollBack";
import EmployeeAccessHeader from "@/components/layouts/employee_access/Header";
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { usePermissionStore, useUserStore } from "@/lib/slices/auth.slice";
import { GET_USER } from "@/api/auth";
import { newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";

export default function EmployeeAccessLayouts() {
  const token = localStorage.getItem("token");
  const { setUser } = useUserStore((state) => ({
    setUser: state.setUser,
  }));
  const { setPermissions } = usePermissionStore((state) => ({
    setPermissions: state.setPermissions,
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
      setUser(profile?.data);
      setPermissions(profile?.data?.permission);
    }
  }, [profile]);
(location);

  if (location.pathname === "/employee-access") {
    return <Navigate to="/employee-access/dashboard" replace />;
  }
  return token?(
    <>
      <ScrollBack />
      <div className="w-full bg-gray-100 px-12 py-4">
        <EmployeeAccessHeader />
        <Outlet />
      </div>
    </>
  ): (
    <Navigate to="/login" />
  );
}
