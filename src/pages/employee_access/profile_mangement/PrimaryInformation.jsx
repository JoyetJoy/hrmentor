import ProfileManagmentForm from "@/components/employee_access/edit/Form";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import ProfileSidebar from "@/components/sidebars/employee_access/profile_management/ProfileSideBar";
import { ChevronRight } from "lucide-react";
import React from "react";

export default function PrimaryInformation() {
  return (
    <div className="flex flex-col">
      <MenuHeaderEmployeeAccess
        pathlink={""}
        currentpage={"Primary Information"}
        subMenu={"ProfileManagement"}
        icon={<ChevronRight className="size-3" />}
      />
      <div className="flex gap-x-3">
        <ProfileSidebar />
        <ProfileManagmentForm />
      </div>
    </div>
  );
}
