import React, { useState, useEffect } from "react";
import { Clock4, Eye, MoveDiagonal, Search, SquareMenu } from "lucide-react";
import { meetings } from "@/constants/dummyData";
import LeaveAvailability from "@/components/dashboard/employee_access/LeaveAvailability";
import { Menu } from "@headlessui/react";
import StopBreak from "@/components/popups/employee_access/dashboard/StopBreak";
import ClockIn from "@/components/popups/employee_access/dashboard/ClockIn";
import { newRequest, CLOCK_IN } from "@/api/master";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DASHBOARD,
  CLOCKIN,
  RUNNINGBREAK,
  ALL_NEWS,
  ALL_EVENT,
  NEWS,
  EXPIRY_DOC,
  NEW_JOINERS,
  BANK_HOLIDAY,
  ALL_BIRTHDAY,
} from "@/api";
import StartBreak from "@/components/popups/employee_access/dashboard/StartBreak";
import ClockOut from "@/components/popups/employee_access/dashboard/ClockOut";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

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

  const { data: employeeAllNews = [], isLoading } = useQuery({
    queryKey: ["employeeAllNews"],
    queryFn: async () => {
      const response = await newRequest.get(NEWS);
      return response.data || [];
    },
  });

  const { data: expiryDoc = [], isLoadingg } = useQuery({
    queryKey: ["expiryDoc"],
    queryFn: async () => {
      const response = await newRequest.get(EXPIRY_DOC);
      return response.data || []; // Ensure it always returns an array
    },
  });

  const { data: newJoiners = [] } = useQuery({
    queryKey: ["newJoiners"],
    queryFn: async () => {
      const response = await newRequest.get(NEW_JOINERS);
      return response.data || []; // Ensure it always returns an array
    },
  });

  const { data: bankHoliday = [] } = useQuery({
    queryKey: ["bankHoliday"],
    queryFn: async () => {
      const response = await newRequest.get(BANK_HOLIDAY);
      return response.data || []; // Ensure it always returns an array
    },
  });

  const { data: birthday = [] } = useQuery({
    queryKey: ["birthday"],
    queryFn: async () => {
      const response = await newRequest.get(ALL_BIRTHDAY);
      return response.data || []; // Ensure it always returns an array
    },
  });

  const calculateLoggedTime = () => {
    const [datePart, timePart] = clockin.clock_in_time.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hour, minute, second] = timePart.split(":");

    const clockInDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
    );

    // Get real BST time from Europe/London timezone
    const bstString = new Date().toLocaleString("en-US", {
      timeZone: "Europe/London",
    });
    const nowBST = new Date(bstString);

    console.log("Clock-in:", clockInDate.toString());
    console.log("Now (BST):", nowBST.toString());

    const elapsedTime = nowBST.getTime() - clockInDate.getTime();

    if (elapsedTime < 0) return "00:00:00";

    const totalHours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = String(
      Math.floor((elapsedTime / (1000 * 60)) % 60),
    ).padStart(2, "0");
    const seconds = String(Math.floor((elapsedTime / 1000) % 60)).padStart(
      2,
      "0",
    );

    return `${String(totalHours).padStart(2, "0")}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (!clockin?.clock_in_time) return;

    const interval = setInterval(() => {
      setLoggedTime(calculateLoggedTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [clockin?.clock_in_time]);

  const handleClockIn = async (toOpen) => {
    if (!dashboard) {
      return;
    }
    if (dashboard?.rosterOrShift) {
      setClockInPopupOpen(true);
    } else {
      if (!dashboard?.shiftTime?.id) {
        toast.error("You do not have a shift at this time");
        return;
      }
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

  const cardsData = [
    {
      title: "Documents Expiry",
      details: expiryDoc || [],
    },
    {
      title: "New Joiners",
      details: newJoiners || [],
    },
    {
      title: "Bank Holidays",
      details: bankHoliday || [],
    },
    {
      title: "Birthday in next 30 days",
      details: birthday || [],
    },
  ];

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
        setStartBreakPopupOpen={setBreakPopupOpen}
      />
      <StopBreak
        breakdata={breakdata}
        breakpopupOpen={breakpopupOpen}
        setBreakPopupOpen={setBreakPopupOpen}
        loggedTime={loggedTime}
      />
      <div className="my-3 flex items-baseline justify-between rounded-md">
        <div className="flex min-w-[72%] flex-col gap-3">
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {cardsData?.map((card, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-md bg-white p-6 shadow-sm"
              >
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="text-base font-bold text-black">
                    {card.title}
                  </h1>
                  {/* <p className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    View <Eye className="size-4 text-black/70" />
                  </p> */}
                </div>

                {/* Card Items */}
                <div className="overflow-y-min flex h-[12rem] flex-col gap-3 overflow-y-auto overflow-x-hidden">
                  {card?.details.length > 0 ? (
                    <>
                      {card.details?.map((item, idx) => (
                        <div
                          key={idx}
                          className="mr-5 flex items-center justify-between gap-4 rounded-full bg-gray-100 p-1"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 ${
                                card.title === "Bank Holidays"
                                  ? "bg-hrmprimaryorange text-white"
                                  : "bg-gray-100"
                              }`}
                            >
                              {card.title === "Documents Expiry" ? (
                                <SquareMenu
                                  className="size-5 text-black/20"
                                  strokeWidth={1.2}
                                />
                              ) : card.title === "Bank Holidays" ? (
                                <div className="text-center text-xs font-medium text-white">
                                  <p>{dayjs(item.date).format("ddd")}</p>
                                  <p>{dayjs(item.date).format("DD")}</p>
                                </div>
                              ) : (
                                <img
                                  src="/assets/images/profile.jpg"
                                  alt="Profile"
                                  className="h-full rounded-full object-cover"
                                />
                              )}
                            </div>
                            {/* Text Details */}
                            <div className="text-xs text-black">
                              <h1>
                                {item.first_name} {item?.middle_name}
                              </h1>
                              <h1>
                                {item.count ??
                                  `${dayjs(item.dob).format("MM-DD")}-${dayjs().format("YYYY")}`}
                              </h1>
                            </div>
                          </div>

                          {/* Move Icon */}
                          <div className="rounded-full border bg-gray-soft p-2">
                            <MoveDiagonal
                              className="size-3 text-black"
                              strokeWidth={1.7}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-sm text-gray-dark">Data not available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-[27%] flex-col gap-4">
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
            <div className="overflow-y-min flex max-h-[25rem] min-h-[6rem] flex-col gap-3 overflow-y-auto overflow-x-hidden">
              {employeeAllNews.length > 0 ? (
                <>
                  {employeeAllNews?.map((news, index) => (
                    <div
                      key={index}
                      className="mr-5 flex min-h-20 flex-row rounded-md border border-gray-300"
                    >
                      <h1 className="flex min-w-14 flex-col items-center justify-center bg-gray-300 text-center text-sm font-bold text-black/80">
                        {dayjs(news.start_date).format("D")} <br />
                        <span>{dayjs(news.start_date).format(" MMM")}</span>
                      </h1>
                      <h2 className="p-4 text-sm font-semibold text-black">
                        {news.news_title.length > 12
                          ? news.news_title.substring(0, 25) + "..."
                          : news.news_title}
                        <br />
                        <span className="flex items-center gap-1 text-xs font-normal text-gray-dark">
                          {news.short_summary.length > 25
                            ? news.short_summary.substring(0, 40) + "..."
                            : news.short_summary}
                          {/* <div className="h-3 border border-gray-dark"></div>You and
                                        13+ more */}
                        </span>
                      </h2>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-sm text-gray-dark">Data not available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
