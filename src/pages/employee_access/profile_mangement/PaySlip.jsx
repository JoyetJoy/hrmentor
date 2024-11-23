import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import ProfileSidebar from "@/components/sidebars/employee_access/profile_management/ProfileSideBar";
import { ChevronRight, Search } from "lucide-react";
import React from "react";

export default function PaySlip() {
  return (
    <div className="flex flex-col">
      <MenuHeaderEmployeeAccess
        pathlink={""}
        currentpage={"PaySlip"}
        subMenu={"ProfileManagement"}
        icon={<ChevronRight className="size-3" />}
      />
      <div className="flex gap-x-3">
        <ProfileSidebar />
        <div className="mt-2 w-full">
          <>
            <div className="flex items-center justify-between">
              <h5 className="text-lg font-bold">PaySlip</h5>
              <div className="input flex h-10 min-h-10 w-80 items-center gap-2 border border-gray-platinum text-sm outline-none placeholder:text-black hover:border-gray-platinum">
                <Search className="size-4 text-gray-dark" />
                <input
                  type="text"
                  onChange={(e) => setKeyword(e.target.value)}
                  className="h-full w-full placeholder:text-gray-dark"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="overflow-y-min mt-5 h-full w-full overflow-y-auto rounded-md bg-white pb-7"></div>
          </>
        </div>
      </div>
    </div>
  );
}
