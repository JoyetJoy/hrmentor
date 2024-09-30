import { EMPLOYEE_SKILLS } from "@/api";
import MenuHeader from "@/components/common/MenuHeader";
import { EmployeeEditCommonListing } from "@/components/employee/edit/Listing";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import { employeeColumnKeysForSkills } from "@/lib/columns/employee";
import { ChevronRight } from "lucide-react";

export default function SkillsQualifications() {
  return (
    <div className="flex flex-col">
      <MenuHeader
        menu={"Menu"}
        subMenu={"Employee"}
        currentpath={"Employee Detail"}
        icon={<ChevronRight className="size-3" />}
        activeMenu={"Employee"}
      />
      <div className="flex gap-x-3">
        <EmployeesSidebar />
        <EmployeeEditCommonListing
          api={EMPLOYEE_SKILLS}
          qryKey={"employeeTypeList"}
          colKeys={employeeColumnKeysForSkills}
          type={"Skills/Qualifications"}
        />
      </div>
    </div>
  );
}
