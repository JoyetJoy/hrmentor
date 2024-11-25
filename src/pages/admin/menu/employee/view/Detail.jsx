import { EMPLOYEE_DETAILS, newRequest } from "@/api";
import MenuHeader from "@/components/common/MenuHeader";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Share2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import MonthlyCalendarPicker from "@/components/common/MonthPicker";
import { useState } from "react";
import dayjs from "dayjs";
import Reschedule from "@/components/popups/employees/view/Reschedule";

export default function EmployeeDetails() {
  const [popupOpen,setPopupOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");

  const options = ["On Leave", "Onboarding Pending", "Active", "Awaiting joining", "Resigned", "Terminated"];


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
              <button
                type="button"
                className="btn flex h-10 min-h-10 min-w-40 items-center justify-center gap-1 bg-paleblue px-6 text-xs font-bold text-textcolor-darkCharcoal shadow-none hover:bg-paleblue"
              >
                <Share2 className="size-4" color="black" />
                Onboarding Form
              </button>
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
                <div className="ml-5">
  <select
    className="h-7 rounded bg-textcolor-mediumred/5 px-3 text-[0.8rem] font-bold text-mediumred focus:outline-none focus:ring focus:ring-mediumred/30"
    defaultValue="On Leave"
  >
    {options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
</div>

              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs">
                  <p>Date of joining</p>
                  <p className="font-semibold">Oct 10,2024</p>
                </div>
              <button 
              onClick={()=>{
                setPopupOpen(true)
                setType('reschedule')
              }}
              className="flex h-10 min-h-10 min-w-36 items-center justify-center gap-1 bg-pale px-6 text-xs font-bold bg-[#e0e2f3] rounded-md text-textcolor-darkCharcoal shadow-none transition-all duration-500 hover:scale-[1.01]">
                  Reschedule
                </button>
                <Link className="flex h-10 min-h-10 min-w-36 items-center justify-center gap-1 bg-pale px-6 bg-[#e0e2f3] rounded-md text-xs font-bold text-textcolor-darkCharcoal shadow-none transition-all duration-500 hover:scale-[1.01]">
                  Activity Log
                </Link>
                <Link className="btn flex h-10 min-h-10 min-w-36 items-center justify-center gap-1 bg-hrmprimaryorange px-6 text-xs font-bold text-white shadow-none transition-all duration-500 hover:scale-[1.01]">
                  Exit Process
                </Link>
              </div>
            </div>
            <div className="grid w-full grid-cols-4 gap-3">
              <div className="col-span-2 py-7">
                <Disclosure as="div" className="w-full p-5" defaultOpen={false}>
                  <DisclosureButton className="group flex w-full items-center justify-between gap-x-2 font-bold">
                    <p className="w-fit">Basic Details</p>
                    <div className="flex size-7 items-center justify-center rounded-full bg-gray-darklight">
                      <ChevronRight className="size-5 group-data-[open]:rotate-90 group-data-[hover]:text-black/50" />
                    </div>
                  </DisclosureButton>
                  <DisclosurePanel className="my-4 w-full text-sm/5 text-black/80">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">First Name:</p>
                        <p>{employeeViewDetails?.basic_details?.first_name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">Last Name:</p>
                        <p>{employeeViewDetails?.basic_details?.sur_name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">Email:</p>
                        <p>{employeeViewDetails?.basic_details?.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">Phone:</p>
                        <p>{employeeViewDetails?.basic_details?.phone}</p>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="w-full p-5" defaultOpen={false}>
                  <DisclosureButton className="group flex w-full items-center justify-between gap-x-2 font-bold">
                    <p className="w-fit">Work Information</p>
                    <div className="flex size-7 items-center justify-center rounded-full bg-gray-darklight">
                      <ChevronRight className="size-5 group-data-[open]:rotate-90 group-data-[hover]:text-black/50" />
                    </div>
                  </DisclosureButton>
                  <DisclosurePanel className="my-4 w-full text-sm/5 text-black/80">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">First Name:</p>
                        <p>{employeeViewDetails?.basic_details?.first_name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">Last Name:</p>
                        <p>{employeeViewDetails?.basic_details?.sur_name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">Email:</p>
                        <p>{employeeViewDetails?.basic_details?.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">Phone:</p>
                        <p>{employeeViewDetails?.basic_details?.phone}</p>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </div>
              <div className="border rounded-md">
              <MonthlyCalendarPicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
              <div className="px-3 flex flex-col gap-2">
                <div className="bg-[#f8f7f7] text-sm font-medium p-4 rounded-md">
                  Clock In - 05:10 am
                </div>
                <div className="bg-[#f8f7f7] text-sm font-medium p-4 rounded-md">
                  Clock Out - 06:00 pm
                </div>

              </div>

              {/* log */}
            </div>
          </div>
        </>
      )}
    </>
  );
}
