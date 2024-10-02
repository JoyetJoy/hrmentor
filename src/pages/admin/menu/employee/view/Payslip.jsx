import MenuHeader from "@/components/common/MenuHeader";
import MenuSubHeader from "@/components/common/MenuSubHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import { ChevronRight } from "lucide-react";

export const Payslip = () => {
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
        <div className="w-full">
          <>
            <MenuSubHeader heading={"Payslip"} />
            <div className="mt-5 min-h-[520px] rounded-md bg-white"></div>
          </>
        </div>
      </div>
    </div>
  );
};
