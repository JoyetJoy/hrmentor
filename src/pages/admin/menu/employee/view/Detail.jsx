import { EMPLOYEE_DETAILS, newRequest } from "@/api";
import MenuHeader from "@/components/common/MenuHeader";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Share2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function EmployeeDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  // EMPLOYEE_DETAILS;
  // Fetch List
  const { data: employeeViewDetails, isLoading } = useQuery({
    queryKey: ["employeeViewDetails", uid],
    queryFn: () =>
      newRequest.get(`${EMPLOYEE_DETAILS}/${uid}`).then((res) => {
        return res.data;
      }),
  });
  console.log(employeeViewDetails);
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
      <div className="mt-2 flex min-h-[520px] w-full items-start bg-white px-10 py-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <div className="relative h-16 w-16 rounded-full border-2 border-hrmprimaryorange">
              <img
                className="h-full w-full object-cover"
                src={employeeViewDetails?.basic_details?.profile_image}
                alt={employeeViewDetails?.basic_details?.first_name}
              />
              <div className="absolute -bottom-2 right-0 h-4 w-4 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-2.5 flex flex-col">
              <h5 className="text-lg font-bold">
                {employeeViewDetails?.basic_details?.first_name}{" "}
                {employeeViewDetails?.basic_details?.sur_name}
              </h5>
              <p className="-mt-[1px] text-[0.9rem] text-black/70">
                {employeeViewDetails?.basic_details?.designation}{" "}
              </p>
            </div>
            <div className="ml-3 flex h-7 items-center rounded bg-[#CF1212]/5 px-3 text-[0.8rem] font-semibold text-[#CF1212]">
              On Leave
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link className="btn flex h-10 min-h-10 min-w-36 items-center justify-center gap-1 bg-[#E0E2F3] px-6 text-xs font-bold text-[#2C2C2C] shadow-none hover:bg-[#030E5C]/70">
              Activity Log
            </Link>
            <Link className="btn flex h-10 min-h-10 min-w-40 items-center justify-center gap-1 bg-hrmprimaryorange px-6 text-xs font-bold text-white shadow-none hover:bg-[#030E5C]/70">
              Exit Process
            </Link>
          </div>
          {/* akak */}
        </div>
        <div className="flex">
          {/* profile */}
          {/* log */}
        </div>
      </div>
    </>
  );
}
