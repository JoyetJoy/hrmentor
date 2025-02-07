import { EMPLOYEE_DETAILS, newRequest } from "@/api";
import MenuHeader from "@/components/common/MenuHeader";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Share2, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import MonthlyCalendarPicker from "@/components/common/MonthPicker";
import { useState } from "react";
import dayjs from "dayjs";
import Reschedule from "@/components/popups/employees/view/Reschedule";

export default function EmployeeActivitylogDetails() {
  const [type, setType] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [click, setClick] = useState("");
  const [keyword, setKeyword] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");

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
        currentpath={"Activity Log"}
        icon={<ChevronRight className="size-3" />}
        activeMenu={"Employee"}
      />
      <Reschedule
        data={employeeViewDetails?.basic_details?.employmentStatus}
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        id={uid}
        type={type}
      />
      {isLoading ? (
        <div className="flex min-h-96 w-full items-center justify-center bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
        </div>
      ) : (
        <>
          <div className="mt-2 grid min-h-[520px] w-full grid-cols-3 gap-16 bg-white px-10 py-10">
            <div>
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
                  onClick={() => {
                    setPopupOpen(true);
                    setType("status");
                  }}
                  className="text-mediumred ml-5 flex h-7 cursor-pointer items-center rounded bg-textcolor-mediumred/5 px-3 text-[0.8rem] font-bold"
                >
                  {employeeViewDetails?.basic_details?.employmentStatus?.value}
                </div>
              </div>
              <div className="mt-5 rounded-md border">
                <MonthlyCalendarPicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
            </div>

            <div className="overflow-y-min flex flex-col overflow-y-auto overflow-x-hidden px-4 py-3">
              <p className="text-[1rem] font-semibold text-black">
                Activity log
              </p>
              <div
                onClick={() => setClick("1")}
                className="cursor-pointer pt-4 text-sm text-[#797979]"
              >
                <div className="grid grid-cols-3">
                  <div
                    className={`pt-5 ${click === "1" ? "border-r border-r-black" : "border-r"}`}
                  >
                    <p>9:20 PM</p>
                  </div>
                  <div className="col-span-2 ml-2 pt-5">
                    <p>Clocked in , mobile</p>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setClick("2")}
                className="cursor-pointer text-sm text-[#797979]"
              >
                <div className="grid grid-cols-3">
                  <div
                    className={`pt-8 ${click === "2" ? "border-r border-r-black" : "border-r"}`}
                  >
                    <p>9:20 PM</p>
                  </div>
                  <div className="col-span-2 ml-2 pt-8">
                    <p>Email id updated</p>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setClick("3")}
                className="cursor-pointer text-sm text-[#797979]"
              >
                <div className="grid grid-cols-3">
                  <div
                    className={`pt-8 ${click === "3" ? "border-r border-r-black" : "border-r"}`}
                  >
                    <p>9:20 PM</p>
                  </div>
                  <div className="col-span-2 ml-2 pt-8">
                    <p>Clocked out , PC</p>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setClick("4")}
                className="cursor-pointer text-sm text-[#797979]"
              >
                <div className="grid grid-cols-3">
                  <div
                    className={`pt-8 ${click === "4" ? "border-r border-r-black" : "border-r"}`}
                  >
                    <p>9:20 PM</p>
                  </div>
                  <div className="col-span-2 ml-2 pt-8">
                    <p>Username updated</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <label className="input flex h-10 min-h-10 min-w-80 max-w-80 items-center gap-2 rounded-md border border-gray-soft outline-none">
                <Search className="size-4 object-contain text-gray-dark" />
                <input
                  type="text"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
                  placeholder="Search"
                />
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
}
