import { ChevronRight } from "lucide-react";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import MenuHeader from "@/components/common/MenuHeader";
import SaveEmployeeForm from "@/components/employee/Form";

function PrimaryInformation() {
  return (
    <div className="flex flex-col">
      <MenuHeader
        menu={"Menu"}
        subMenu={"Employee"}
        currentpath={"Employee Detail"}
        icon={<ChevronRight className="size-3" />}
        activeMenu={"Employees"}
      />
      <div className="flex gap-x-3">
        <EmployeesSidebar />
        <SaveEmployeeForm formtype="update" />
      </div>
    </div>
  );
}

export default PrimaryInformation;
