import React, { useState, useEffect } from "react";
import { Clock4, Eye, MoveDiagonal, Search, SquareMenu } from "lucide-react";
import { meetings } from "@/constants/dummyData";
import LeaveAvailability from "@/components/dashboard/employee_access/LeaveAvailability";
import { Menu } from "@headlessui/react";
import StopBreak from "@/components/popups/employee_access/dashboard/StopBreak";
import ClockIn from "@/components/popups/employee_access/dashboard/ClockIn";
import { newRequest, CLOCK_IN } from "@/api/master";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DASHBOARD, CLOCKIN, RUNNINGBREAK } from "@/api";
import StartBreak from "@/components/popups/employee_access/dashboard/StartBreak";
import ClockOut from "@/components/popups/employee_access/dashboard/ClockOut";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export const EmployeeDashboard = () => {
  const queryClient = useQueryClient();
  const [breakpopupOpen, setBreakPopupOpen] = useState(false);
  const [clockInpopupOpen, setClockInPopupOpen] = useState(false);
  const [loggedTime, setLoggedTime] = useState("00:00:00");
  const [timer, setTimer] = useState("");
  const [runningbreak, setRunningbreak] = useState(false);
  const [clockOutPopupOpen, setClockOutPopupOpen] = useState(false);
  const [breakdata, setBreakdata] = useState("");

  // Fetch dashboard data
  const { data: dashboard } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => newRequest.get(DASHBOARD).then((res) => res.data),
    enabled: true,
    staleTime: 0,
  });

  // Fetch clock-in data
  const { data: clockin, refetch } = useQuery({
    queryKey: ["clockin", timer],
    queryFn: () => newRequest.get(CLOCKIN).then((res) => res.data),
    enabled: true,
    staleTime: 0,
  });

  // Update logged time dynamically
  useEffect(() => {
    if (!clockin?.clock_in_time) return;

    const calculateLoggedTime = () => {
      const clockInDateUTC = new Date(
        `${clockin?.clock_in_time.replace(" ", "T")}Z`,
      ).getTime();
      const elapsedTime = Date.now() - clockInDateUTC;
      return new Date(elapsedTime).toISOString().substr(11, 8);
    };

    const interval = setInterval(
      () => setLoggedTime(calculateLoggedTime()),
      1000,
    );
    return () => clearInterval(interval);
  }, [clockin?.clock_in_time]);

  const handleClockIn = async (toOpen) => {
    if (!dashboard) {
      return;
    }
    if (dashboard?.rosterOrShift) {
      setClockInPopupOpen(true);
    } else {
      try {
        const formData = { company_setting_id: dashboard?.shiftTime?.id };
        const res = await newRequest.post(CLOCK_IN, formData);

        if (res?.status === 200) {
          toast.success("Clockin successfully");
          refetch();
          setTimer(res.data);
        }
      } catch (error) {
        console.error("Failed to clock in:", error);
        toast.error(
          error?.response?.data?.message || "Failed to clock in, Try again.",
        );
      }
    }
  };
  const BreakClick = async () => {
    try {
      const res = await newRequest.get(RUNNINGBREAK);
      if (res?.status === 200) {
        queryClient.invalidateQueries(["runninbreak"]);
        setBreakdata(res?.data);
        if (res?.data?.id) {
          setBreakPopupOpen(true);
        } else {
          setRunningbreak(true);
        }
      } else {
        toast.error("Unexpected error occurred while fetching break.");
      }
    } catch (error) {
      console.error("Failed to fetch running break:", error);
    }
  };

  return (
    <>
      <ClockIn
        clockInpopupOpen={clockInpopupOpen}
        setClockInPopupOpen={setClockInPopupOpen}
        api={CLOCK_IN}
        clockindata={clockin}
        data={dashboard?.rosterOrShift}
        setTimer={setTimer}
      />
      <ClockOut
        loggedTime={loggedTime}
        setLoggedTime={setLoggedTime}
        clockindata={clockin}
        clockOutPopupOpen={clockOutPopupOpen}
        setClockOutPopupOpen={setClockOutPopupOpen}
        setTimer={setTimer}
      />
      <StartBreak
        attendanceId={clockin?.id}
        breakpopupOpen={runningbreak}
        setBreakPopupOpen={setRunningbreak}
      />
      <StopBreak
        breakdata={breakdata}
        breakpopupOpen={breakpopupOpen}
        setBreakPopupOpen={setBreakPopupOpen}
        loggedTime={loggedTime}
      />
      <div className="my-3 flex items-baseline justify-between rounded-md">
        <aside className="flex min-w-[72%] flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-black">Dashboard</h1>
            <div className="flex items-center gap-3">
              {clockin?.clock_in_time && dashboard?.rosterOrShift && (
                <Menu as="div" className="relative inline-block text-left">
                  <div
                    onClick={() => BreakClick()}
                    className="btn flex h-10 min-h-10 items-center justify-center rounded-md bg-hrmprimaryorange px-6 text-xs font-normal text-white hover:bg-hrmprimaryorange"
                  >
                    <Menu.Button>Break</Menu.Button>
                  </div>
                </Menu>
              )}
              {clockin?.clock_in_time ? (
                <div
                  onClick={() => setClockOutPopupOpen(true)}
                  className={`btn flex h-10 min-h-10 items-center justify-center whitespace-nowrap rounded-md px-6 text-xs font-normal text-white ${clockin?.clock_in_time ? "bg-[#2B2B2B] hover:bg-hrmdarkblue" : "bg-hrmprimaryorange hover:bg-hrmprimaryorange"}`}
                >
                  <Clock4 className="size-4" />
                  Clock Out
                </div>
              ) : (
                <div
                  onClick={handleClockIn}
                  className={`btn flex h-10 min-h-10 items-center justify-center whitespace-nowrap rounded-md px-6 text-xs font-normal text-white ${clockin?.clock_in_time ? "bg-[#2B2B2B] hover:bg-hrmdarkblue" : "bg-hrmprimaryorange hover:bg-hrmprimaryorange"}`}
                >
                  <Clock4 className="size-4" />
                  Clock In
                </div>
              )}
              <p className="w-36 text-xs font-semibold text-hrmprimaryorange">
                Logged Time: {loggedTime || "00:00:00"}
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
          <div className="grid grid-cols-2 items-center justify-center gap-4">
            <div className="flex flex-col gap-2 rounded-md bg-white p-9">
              <label className="mb-4 flex items-center justify-between">
                <h1 className="text-base font-bold text-black">
                  Documents Expiry
                </h1>
                <p className="flex items-center gap-2 text-sm font-medium text-gray-dark">
                  View <Eye className="size-4 text-black/70" />
                </p>
              </label>
              <div className="flex items-center justify-between gap-2 rounded-full bg-gray-soft p-1">
                <div className="flex items-center gap-1">
                  <div className="rounded-full border border-[#C9C9C9] p-2">
                    <SquareMenu
                      className="text-blacl/20 size-5"
                      strokeWidth={1.2}
                    />
                  </div>
                  <label className="text-xs text-black">
                    <h1 className="">Visa</h1>
                    <h1>5/233</h1>
                  </label>
                </div>
                <div className="rounded-full border bg-[#C9C9C9] p-1">
                  <MoveDiagonal
                    className="text-blacl/20 size-3"
                    strokeWidth={1.2}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-full bg-gray-soft p-1">
                <div className="flex items-center gap-1">
                  <div className="rounded-full border border-[#C9C9C9] p-2">
                    <SquareMenu
                      className="text-blacl/20 size-5"
                      strokeWidth={1.2}
                    />
                  </div>
                  <label className="text-xs text-black">
                    <h1 className="">Visa</h1>
                    <h1>5/233</h1>
                  </label>
                </div>
                <div className="rounded-full border bg-[#C9C9C9] p-1">
                  <MoveDiagonal
                    className="text-blacl/20 size-3"
                    strokeWidth={1.2}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-full bg-gray-soft p-1">
                <div className="flex items-center gap-1">
                  <div className="rounded-full border border-[#C9C9C9] p-2">
                    <SquareMenu
                      className="text-blacl/20 size-5"
                      strokeWidth={1.2}
                    />
                  </div>
                  <label className="text-xs text-black">
                    <h1 className="">Visa</h1>
                    <h1>5/233</h1>
                  </label>
                </div>
                <div className="rounded-full border bg-[#C9C9C9] p-1">
                  <MoveDiagonal
                    className="text-blacl/20 size-3"
                    strokeWidth={1.2}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-md bg-white p-9">
              <label className="mb-4 flex items-center justify-between">
                <h1 className="text-base font-bold text-black">New Joiners</h1>
                <p className="flex items-center gap-2 text-xs font-medium text-gray-dark">
                  View <Eye className="size-4 text-black/70" />
                </p>
              </label>
              <div className="flex items-center justify-between gap-2 rounded-full bg-gray-soft p-1">
                <div className="flex items-center gap-1">
                  <div className="rounded-full border border-[#C9C9C9] p-2">
                    <SquareMenu
                      className="text-blacl/20 size-5"
                      strokeWidth={1.2}
                    />
                  </div>
                  <label className="text-xs text-black">
                    <h1 className="">Visa</h1>
                    <h1>5/233</h1>
                  </label>
                </div>
                <div className="rounded-full border bg-[#C9C9C9] p-1">
                  <MoveDiagonal
                    className="text-blacl/20 size-3"
                    strokeWidth={1.2}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-full bg-gray-soft p-1">
                <div className="flex items-center gap-1">
                  <div className="rounded-full border border-[#C9C9C9] p-2">
                    <SquareMenu
                      className="text-blacl/20 size-5"
                      strokeWidth={1.2}
                    />
                  </div>
                  <label className="text-xs text-black">
                    <h1 className="">Visa</h1>
                    <h1>5/233</h1>
                  </label>
                </div>
                <div className="rounded-full border bg-[#C9C9C9] p-1">
                  <MoveDiagonal
                    className="text-blacl/20 size-3"
                    strokeWidth={1.2}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-full bg-gray-soft p-1">
                <div className="flex items-center gap-1">
                  <div className="rounded-full border border-[#C9C9C9] p-2">
                    <SquareMenu
                      className="text-blacl/20 size-5"
                      strokeWidth={1.2}
                    />
                  </div>
                  <label className="text-xs text-black">
                    <h1 className="">Visa</h1>
                    <h1>5/233</h1>
                  </label>
                </div>
                <div className="rounded-full border bg-[#C9C9C9] p-1">
                  <MoveDiagonal
                    className="text-blacl/20 size-3"
                    strokeWidth={1.2}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-md bg-white p-9">
              <label className="mb-4 flex items-center justify-between">
                <h1 className="text-base font-bold text-black">
                  Bank holidays
                </h1>
                <p className="flex items-center gap-2 text-xs font-medium text-gray-dark">
                  View <Eye className="size-4 text-black/70" />
                </p>
              </label>
              <div className="flex items-center justify-between gap-2 rounded-full bg-gray-soft p-1">
                <div className="flex items-center gap-1">
                  <div className="rounded-full border border-[#C9C9C9] p-2">
                    <SquareMenu
                      className="text-blacl/20 size-5"
                      strokeWidth={1.2}
                    />
                  </div>
                  <label className="text-xs text-black">
                    <h1 className="">Visa</h1>
                    <h1>5/233</h1>
                  </label>
                </div>
                <div className="rounded-full border bg-[#C9C9C9] p-1">
                  <MoveDiagonal
                    className="text-blacl/20 size-3"
                    strokeWidth={1.2}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-full bg-gray-soft p-1">
                <div className="flex items-center gap-1">
                  <div className="rounded-full border border-[#C9C9C9] p-2">
                    <SquareMenu
                      className="text-blacl/20 size-5"
                      strokeWidth={1.2}
                    />
                  </div>
                  <label className="text-xs text-black">
                    <h1 className="">Visa</h1>
                    <h1>5/233</h1>
                  </label>
                </div>
                <div className="rounded-full border bg-[#C9C9C9] p-1">
                  <MoveDiagonal
                    className="text-blacl/20 size-3"
                    strokeWidth={1.2}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-full bg-gray-soft p-1">
                <div className="flex items-center gap-1">
                  <div className="rounded-full border border-[#C9C9C9] p-2">
                    <SquareMenu
                      className="text-blacl/20 size-5"
                      strokeWidth={1.2}
                    />
                  </div>
                  <label className="text-xs text-black">
                    <h1 className="">Visa</h1>
                    <h1>5/233</h1>
                  </label>
                </div>
                <div className="rounded-full border bg-[#C9C9C9] p-1">
                  <MoveDiagonal
                    className="text-blacl/20 size-3"
                    strokeWidth={1.2}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-md bg-white p-9">
              <label className="mb-4 flex items-center justify-between">
                <h1 className="text-base font-bold text-black">
                  Birthday in next 30 days
                </h1>
                <p className="flex items-center gap-2 text-xs font-medium text-gray-dark">
                  View <Eye className="size-4 text-black/70" />
                </p>
              </label>
              <div className="flex items-center justify-between gap-2 rounded-full bg-gray-soft p-1">
                <div className="flex items-center gap-1">
                  <div className="rounded-full border border-[#C9C9C9] p-2">
                    <SquareMenu
                      className="text-blacl/20 size-5"
                      strokeWidth={1.2}
                    />
                  </div>
                  <label className="text-xs text-black">
                    <h1 className="">Visa</h1>
                    <h1>5/233</h1>
                  </label>
                </div>
                <div className="rounded-full border bg-[#C9C9C9] p-1">
                  <MoveDiagonal
                    className="text-blacl/20 size-3"
                    strokeWidth={1.2}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-full bg-gray-soft p-1">
                <div className="flex items-center gap-1">
                  <div className="rounded-full border border-[#C9C9C9] p-2">
                    <SquareMenu
                      className="text-blacl/20 size-5"
                      strokeWidth={1.2}
                    />
                  </div>
                  <label className="text-xs text-black">
                    <h1 className="">Visa</h1>
                    <h1>5/233</h1>
                  </label>
                </div>
                <div className="rounded-full border bg-[#C9C9C9] p-1">
                  <MoveDiagonal
                    className="text-blacl/20 size-3"
                    strokeWidth={1.2}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-full bg-gray-soft p-1">
                <div className="flex items-center gap-1">
                  <div className="rounded-full border border-[#C9C9C9] p-2">
                    <SquareMenu
                      className="text-blacl/20 size-5"
                      strokeWidth={1.2}
                    />
                  </div>
                  <label className="text-xs text-black">
                    <h1 className="">Visa</h1>
                    <h1>5/233</h1>
                  </label>
                </div>
                <div className="rounded-full border bg-[#C9C9C9] p-1">
                  <MoveDiagonal
                    className="text-blacl/20 size-3"
                    strokeWidth={1.2}
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>
        <aside className="flex w-[27%] flex-col gap-4">
          <LeaveAvailability />
          <div className="rounded-md bg-white p-6 shadow-sm">
            <Link
              to="/employee-access/news-events/view"
              className="mb-4 flex items-center justify-between text-lg font-semibold text-black"
            >
              News & Events
              <span className="flex cursor-pointer items-center gap-2 text-xs font-medium text-gray-dark">
                View <Eye className="size-4 text-black/70" />
              </span>
            </Link>
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
