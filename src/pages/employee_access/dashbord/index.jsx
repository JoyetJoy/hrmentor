import React, { useState } from "react";
import { Clock4, Search } from "lucide-react";
import { meetings } from "@/constants/dummyData";
import LeaveAvailability from "@/components/dashboard/employee_access/LeaveAvailability";
import { Menu } from "@headlessui/react";
import StopBreak from "@/components/popups/employee_access/dashboard/StopBreak";
import ClockIn from "@/components/popups/employee_access/dashboard/ClockIn";
// import ClockOut from "@/components/popups/employee_access/dashboard/ClockOut";
import {
  EMPLOYEE_DEPARTMENT_LIST,
  newRequest,
  ROLES_LIST,
  CLOCK_IN,
  SALARY_DEFAULT_MASTERS,
} from "@/api/master";
import { useQuery} from "@tanstack/react-query";
import { HOLIDAY_AVAILABLE_SETTING, DASHBOARD } from "@/api";

export const EmployeeDashboard = () => {
  const sampleData = ["Lunch Break", "Tea Break"];
  const [data, setData] = useState([]);
  const [breakpopupOpen, setBreakPopupOpen] = useState(false);
  const [clockInpopupOpen, setClockInPopupOpen] = useState(false);
  const [clockIn, SetClockIn] = useState('');

  
  const { data: dashboard } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => 
      newRequest
        .get(DASHBOARD)
        .then((res) => res.data),
  });
  console.log(dashboard);

  const handleClick = () => {
    setData(sampleData);
  };
  const handleCreate = (toOpen) => {
    setBreakPopupOpen(true);
  };

  const handleClockIn = async(toOpen) => {
    if(!dashboard){
      return;
    }
    if(dashboard?.rosterOrShift){
      setClockInPopupOpen(true);
    }else{
      const formData={company_setting_id:dashboard?.shiftTime?.id}
      let res;
      res = await newRequest.post(CLOCK_IN, formData);
      console.log(res);
      if (res?.status === 200) {
        toast.success("Saved roster details successfully");
        queryClient.invalidateQueries([""]);
        setPopupOpen(false);
      } else {
        toast.error("Failed to save roster.");
      }
    }
    
  };
  //   const handleClockOut = (toOpen) => {
  //     setClockOutPopupOpen(true);
  //   };

  return (
    <>
      {/* <ClockOut clockOutpopupOpen={clockOutpopupOpen} setClockOutPopupOpen={setClockOutPopupOpen}/> */}
      <ClockIn
        clockInpopupOpen={clockInpopupOpen}
        setClockInPopupOpen={setClockInPopupOpen}
        api={CLOCK_IN}
        data={dashboard?.rosterOrShift}
      />
      <StopBreak
        breakpopupOpen={breakpopupOpen}
        setBreakPopupOpen={setBreakPopupOpen}
      />
      <div className="my-3 flex items-baseline justify-between gap-4 rounded-md">
        <aside className="flex min-w-[70%] flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-black">Dashbord</h1>
            <div className="flex items-center gap-3">
              <Menu as="div" className="relative inline-block text-left">
                <div className="btn flex h-10 min-h-10 items-center justify-center rounded-md bg-hrmprimaryorange px-6 text-xs font-normal text-white hover:bg-hrmprimaryorange">
                  <Menu.Button onClick={handleClick}>Break </Menu.Button>
                </div>
                <Menu.Items className="bg-soft absolute top-12 z-20 w-36 rounded-lg px-4 py-3 shadow-lg">
                  <ul className="">
                    {sampleData.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => handleCreate()}
                        className="py-1 text-sm font-medium text-textcolor-darkCharcoal"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Menu.Items>
              </Menu>
              <div
                onClick={handleClockIn}
                // onClick={handleClockOut}
                className="btn flex h-10 min-h-10 items-center justify-center rounded-md bg-[#2B2B2B] px-6 text-xs font-normal text-white hover:bg-hrmdarkblue"
              >
                <Clock4 className="size-4" />
                Clock in
              </div>
              <p className="text-xs font-semibold text-hrmprimaryorange">
                Logged Time : 00: 00{" "}
              </p>
              <label className="input flex h-10 min-h-10 items-center gap-2 rounded-md border-none pr-28 outline-none">
                <Search className="size-4 object-contain text-gray-dark" />
                <input
                  type="text"
                  className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
                  placeholder="Search"
                />
              </label>
            </div>
          </div>
          <img src="/assets/images/employee_access/dummy.png" />
        </aside>
        <aside className="flex w-[27%] flex-col">
          <LeaveAvailability />
          <div className="mt-4 rounded-md bg-white p-6 shadow-sm">
            <h1 className="mb-4 text-lg font-semibold text-black">
              News & Events
            </h1>
            <div className="flex flex-col gap-3">
              {meetings.map((meeting, index) => (
                <div
                  key={index}
                  className="flex flex-row rounded-md border border-gray-300"
                >
                  <h1 className="flex w-16 flex-col items-center justify-center bg-gray-300 text-center text-sm font-bold text-black/80">
                    {meeting.date} <br />
                    <span>{meeting.month}</span>
                  </h1>
                  <h2 className="p-4 text-sm font-semibold text-black">
                    {meeting.title} <br />
                    <span className="text-xs font-normal text-gray-dark">
                      {meeting.details}
                    </span>
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};
