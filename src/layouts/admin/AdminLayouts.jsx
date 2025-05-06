import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AdminHeader } from "../../components/layouts/admin/Header";
import { useQuery } from "@tanstack/react-query";
import { GET_USER } from "@/api/auth";
import { newRequest } from "@/api";
import convertToNumbersArray from 'array-to-numbers';
import ScrollBack from "@/components/common/ScrollBack";
import { usePermissionStore, useRoleStore, useUserStore } from "@/lib/slices/auth.slice";

export const AdminLayout = () => {
  const token = localStorage.getItem("token");
  const { setUser } = useUserStore((state) => ({
    setUser: state.setUser,
  }));
  const { setPermissions } = usePermissionStore((state) => ({
    setPermissions: state.setPermissions,
  }));
  const { permissions } = usePermissionStore((state) => ({
    permissions: state.permissions,
  }));
  const { setRole } = useRoleStore((state) => ({
      setRole: state.setRole,
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
      const userdata = {
        ...profile?.data?.user, // spread the user object safely
        designation_name: profile?.data?.employee_data?.designation?.designation_name,
        department_id: profile?.data?.employee_data?.department_id,
        worklocation_id: profile?.data?.employee_data?.worklocation_id,
      };
      
      setUser(userdata);  
      const result = convertToNumbersArray(profile?.data?.roles);    
      setRole(result);
      setPermissions(profile?.data?.permission);
    }
  }, [profile]);
console.log(permissions);

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
      <div className="w-full h-full bg-gray-100 px-12 py-4">
        <AdminHeader permissions={permissions}/>
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};
