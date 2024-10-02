import MenuHeader from "@/components/common/MenuHeader";
import { ChevronRight, Share2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function EmployeeDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  return (
    <>
      <MenuHeader
        menu={"Menu"}
        subMenu={"Employee"}
        currentpath={"Employee Details"}
        icon={<ChevronRight className="size-3" />}
        activeMenu={"Employee"}
      />
      <div className="flex items-center justify-between gap-7">
        <h5 className="text-lg font-bold">Employee Details </h5>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn flex h-10 min-h-10 min-w-40 items-center justify-center gap-1 bg-[#E0E2F3] px-6 text-xs font-bold text-[#2C2C2C] shadow-none hover:bg-bgColor-300"
          >
            <Share2 className="size-4" color="black" />
            Onboarding Form
          </button>
          <Link
            to={`/admin/employee/primary/?uid=${uid}`}
            className="btn flex h-10 min-h-10 min-w-24 items-center justify-center gap-1 bg-hrmblack px-6 text-xs font-bold text-white shadow-none hover:bg-[#030E5C]/70"
          >
            Edit
          </Link>
        </div>
      </div>
      <div className="mt-2 flex min-h-[520px] w-full bg-white"></div>
    </>
  );
}
