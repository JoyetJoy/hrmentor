import { EMPLOYEE_DETAILS, newRequest } from "@/api";
import MenuHeader from "@/components/common/MenuHeader";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Eye, Share2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MonthlyCalendarPicker from "@/components/common/MonthPicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Reschedule from "@/components/popups/employees/view/Reschedule";
import Share from "@/components/popups/employees/view/Share";
import { set } from "date-fns";

export default function EmployeeDetails() {
  const [type, setType] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [sharePopupOpen, setSharePopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [active, setActive] = useState();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const navigate = useNavigate();

  // EMPLOYEE DETAILS;
  const { data: employeeViewDetails, isLoading } = useQuery({
    queryKey: ["employeeViewDetails", uid],
    queryFn: () =>
      newRequest.get(`${EMPLOYEE_DETAILS}/${uid}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <>
      <MenuHeader
        menu={"Menu"}
        subMenu={"Employee"}
        currentpath={"Employee Details"}
        icon={<ChevronRight className="size-3" />}
        activeMenu={"Employee"}
      />
      <Reschedule
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        type={type}
        id={employeeViewDetails?.basic_details?.employee_id}
      />
      <Share
        sharePopupOpen={sharePopupOpen}
        setSharePopupOpen={setSharePopupOpen}
      />
      {isLoading ? (
        <div className="flex min-h-96 w-full items-center justify-center bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-7">
            <h5 className="text-lg font-bold">Employee Details </h5>
            <div className="flex items-center gap-2">
              {employeeViewDetails?.basic_details?.employmentStatus?.id !==
                9 && (
                <button
                  type="button"
                  className="hover:bg-bgColor-300 btn flex h-10 min-h-10 min-w-40 items-center justify-center gap-1 bg-paleblue px-6 text-xs font-bold text-[#2C2C2C] shadow-none"
                  onClick={() => {
                    if (
                      employeeViewDetails?.basic_details?.employmentStatus
                        ?.id === 1
                    ) {
                      setSharePopupOpen(true);
                    } else {
                      navigate(`/onboarding-form?uid=${uid}&employee_id=${employeeViewDetails?.basic_details?.employee_id}`);
                    }
                  }}
                >
                  {employeeViewDetails?.basic_details?.employmentStatus?.id ===
                  1 ? (
                    <Share2 className="size-4" color="black" />
                  ) : (
                    <Eye className="size-4" color="black" />
                  )}
                  Onboarding Form
                </button>
              )}
              <Link
                to={`/admin/employee/primary/?uid=${uid}`}
                className="btn flex h-10 min-h-10 min-w-24 items-center justify-center gap-1 bg-hrmblack px-6 text-xs font-bold text-white shadow-none hover:bg-hrmblue/70"
              >
                Edit
              </Link>
            </div>
          </div>
          <div className="mt-2 flex min-h-[520px] w-full flex-col items-start bg-white px-10 py-5">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-hrmprimaryorange">
                    <img
                      className="h-full w-full object-cover"
                      src={employeeViewDetails?.basic_details?.profile_image}
                      alt={employeeViewDetails?.basic_details?.first_name}
                    />
                  </div>
                  <div className="absolute -bottom-1 right-0 h-5 w-5 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-2.5 flex flex-col">
                  <h5 className="text-lg font-bold">
                    {employeeViewDetails?.basic_details?.first_name}{" "}
                    {employeeViewDetails?.basic_details?.sur_name}
                  </h5>
                  <p className="text-[0.9rem] text-black/50">
                    {employeeViewDetails?.basic_details?.designation}{" "}
                  </p>
                </div>
                <div
                  className="ml-5 flex h-7 cursor-pointer items-center rounded bg-[#E3FCEF] px-3 text-[0.8rem] font-bold text-[#28A745]"
                  onClick={() => {
                    if (
                      employeeViewDetails?.basic_details?.employmentStatus
                        ?.label !== "Active"
                    ) {
                      setPopupOpen(true);
                      setType("status");
                    }
                  }}
                >
                  {employeeViewDetails?.basic_details?.employmentStatus?.label}
                </div>
                {/* {employeeViewDetails?.basic_details?.employmentStatus?.label !== "active" ? (
                  <div className="ml-5 flex h-7 cursor-default items-center rounded bg-[#E3FCEF] px-3 text-[0.8rem] font-bold text-[#28A745]">
                   {employeeViewDetails?.basic_details?.employmentStatus?.label}
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setPopupOpen(true);
                      setType("status");
                    }}
                    className="ml-5 flex h-7 items-center rounded bg-gray-200 px-3 text-[0.8rem] font-bold text-gray-400"
                  >
                    Active
                  </div>
                )} */}
              </div>
              <div className="flex items-center gap-3">
                {employeeViewDetails?.basic_details?.employmentStatus?.label ===
                "Active" ? (
                  <>
                    {" "}
                    <Link
                      to={`/admin/employee/activitylog/?uid=${uid}`}
                      className="bg-pale flex h-10 min-h-10 min-w-36 items-center justify-center gap-1 rounded-md bg-[#e0e2f3] px-6 text-xs font-bold text-textcolor-darkCharcoal shadow-none transition-all duration-500 hover:scale-[1.01]"
                    >
                      Activity Log
                    </Link>
                    <Link className="btn flex h-10 min-h-10 min-w-36 items-center justify-center gap-1 bg-hrmprimaryorange px-6 text-xs font-bold text-white shadow-none transition-all duration-500 hover:scale-[1.01]">
                      Exit Process
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="text-xs">
                      <p>Date of joining</p>
                      <p className="font-semibold">{employeeViewDetails?.basic_details?.date_of_joining}</p>
                    </div>
                    <button
                      onClick={() => {
                        setPopupOpen(true);
                        setType("reschedule");
                      }}
                      className="bg-pale flex h-10 min-h-10 min-w-36 items-center justify-center gap-1 rounded-md bg-[#e0e2f3] px-6 text-xs font-bold text-textcolor-darkCharcoal shadow-none transition-all duration-500 hover:scale-[1.01]"
                    >
                      Reschedule
                    </button>
                    <Link
                      to={`/admin/employee/activitylog/?uid=${uid}`}
                      className="bg-pale flex h-10 min-h-10 min-w-36 items-center justify-center gap-1 rounded-md bg-[#e0e2f3] px-6 text-xs font-bold text-textcolor-darkCharcoal shadow-none transition-all duration-500 hover:scale-[1.01]"
                    >
                      Activity Log
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="mt-7 grid w-full grid-cols-4 gap-3">
              <div className="col-span-2 flex flex-col gap-3">
                <Link
                  to={`/admin/employee/primary/?uid=${uid}`}
                  className="group flex items-center justify-between gap-x-2 rounded-md bg-gray-darklight px-6 py-4 font-bold"
                >
                  Basic Details
                </Link>
                <Link
                  to={`/admin/employee/primary/?uid=${uid}`}
                  className="group flex items-center justify-between gap-x-2 rounded-md bg-gray-darklight px-6 py-4 font-bold"
                >
                  Work Information
                </Link>
              </div>
              <div className="mr-4 rounded-md border">
                <MonthlyCalendarPicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
              <div
                className={`flex flex-col gap-2 px-3 ${employeeViewDetails?.basic_details?.status === active ? "flex" : "hidden"} `}
              >
                <div className="rounded-md bg-[#f8f7f7] p-4 text-sm font-medium">
                  Clock In - 05:10 am
                </div>
                <div className="rounded-md bg-[#f8f7f7] p-4 text-sm font-medium">
                  Clock Out - 06:00 pm
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
