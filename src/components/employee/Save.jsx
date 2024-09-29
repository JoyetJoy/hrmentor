import { ChevronRight } from "lucide-react";
import MenuHeader from "@/components/common/MenuHeader";
import SaveEmployeeForm from "./Form";

export default function SaveEmployee() {
  return (
    <>
      <MenuHeader
        menu={"Menu"}
        subMenu={"Employee"}
        currentpath={"Add Employee"}
        icon={<ChevronRight className="size-3" />}
        activeMenu={"Employee"}
      />
      <SaveEmployeeForm formtype="save" />
    </>
  );
}
