import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import MenuHeader from "@/components/common/MenuHeader";
import { useQuery } from "@tanstack/react-query";
import { ATTENDANCES, newRequest } from "@/api/master";
import Atendance from "../../../../components/attendance/Index";
import DatePicker from "react-datepicker";
import { formatDate } from "@/utils/date";

export default function Attendance() {
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [selectedOption, setSelectedOption] = useState("weekly");

  const { data } = useQuery({
    queryKey: ["attendance", startDate, endDate],
    queryFn: () =>
      newRequest
        .get(
          `${ATTENDANCES}?start_date=${startDate}&end_date=${endDate}&role=hrmanager`,
        )
        .then((res) => res.data),
    enabled: !!startDate && !!endDate,
  });

  const handlePrev = () => {
    let newStartDate;
    let newEndDate;
    if (selectedOption === "daily") {
      newStartDate = dayjs(startDate).subtract(1, "day").toDate();
    } else if (selectedOption === "weekly") {
      newStartDate = dayjs(startDate).subtract(1, "week").toDate();
    } else {
      newStartDate = dayjs(startDate).subtract(1, "month").toDate();
    }
    const start = formatDate(newStartDate);
    setStartDate(start);

    if (selectedOption === "daily") {
      newEndDate = dayjs(newStartDate).add(6, "day").toDate();
    } else if (selectedOption === "weekly") {
      newEndDate = dayjs(newStartDate).add(6, "day").toDate();
    } else {
      newEndDate = dayjs(newStartDate)
        .add(1, "month")
        .subtract(1, "day")
        .toDate();
    }
    const end = formatDate(newEndDate);
    setEndDate(end);
  };

  const handleNext = () => {
    let newStartDate;
    let newEndDate;

    if (selectedOption === "daily") {
      newStartDate = dayjs(startDate).add(1, "day").toDate();
    } else if (selectedOption === "weekly") {
      newStartDate = dayjs(startDate).add(1, "week").toDate();
    } else {
      newStartDate = dayjs(startDate).add(1, "month").toDate();
    }
    const start = formatDate(newStartDate);
    setStartDate(start);

    if (selectedOption === "daily") {
      newEndDate = dayjs(newStartDate).add(6, "day").toDate();
    } else if (selectedOption === "weekly") {
      newEndDate = dayjs(newStartDate).add(6, "day").toDate();
    } else {
      newEndDate = dayjs(newStartDate)
        .add(1, "month")
        .subtract(1, "day")
        .toDate();
    }

    const end = formatDate(newEndDate);
    setEndDate(end);
  };

  // Generate all days in the selected month
  const getMonthDays = () => {
    const startOfMonth = dayjs(startDate).startOf("month");
    const daysInMonth = dayjs(startDate).daysInMonth();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = startOfMonth.add(i, "day");
      return {
        day: day.format("ddd"),
        date: day.format("MMM DD"),
        fullDate: day.format("YYYY-MM-DD"),
      };
    });
  };

  // Generate all days in the selected week
  const getWeekDays = () => {
    // Ensure startDate is in the correct week
    const startOfWeek = dayjs(startDate).startOf("week").add(1, "day"); // Monday as start

    return Array.from({ length: 7 }, (_, i) => {
      const day = startOfWeek.add(i, "day");
      return {
        day: day.format("ddd"),
        date: day.format("MMM DD"),
        fullDate: day.format("YYYY-MM-DD"),
      };
    });
  };

  const getCustomDays = () => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const diffDays = end.diff(start, "day") + 1; // Include end date

    return Array.from({ length: diffDays }, (_, i) => {
      const day = start.add(i, "day");
      return {
        day: day.format("ddd"),
        date: day.format("MMM DD"),
        fullDate: day.format("YYYY-MM-DD"),
      };
    });
  };

  const monthDays = getMonthDays();
  const weekDays = getWeekDays();
  const customDays = getCustomDays();

  const handleYearChange = (date) => {
    const newYear = dayjs(date).year();
    setSelectedYear(newYear);

    // Preserve the selected month while changing the year
    setStartDate(dayjs(startDate).year(newYear).format("YYYY-MM-DD"));
    setEndDate(dayjs(endDate).year(newYear).format("YYYY-MM-DD"));

    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedOption === "weekly") {
      setStartDate(weekDays[0].fullDate);
      setEndDate(weekDays[weekDays.length - 1].fullDate);
    } else if (selectedOption === "monthly") {
      setStartDate(monthDays[0].fullDate);
      setEndDate(monthDays[monthDays.length - 1].fullDate);
    }
  }, [selectedOption]);

  const getCurrentWeek = (year) => {
    const today = dayjs().year(year).toDate();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const sundayOffset = mondayOffset + 6;
    const monday = dayjs(today).add(mondayOffset, "day").format("YYYY-MM-DD");
    const sunday = dayjs(today).add(sundayOffset, "day").format("YYYY-MM-DD");
    return { start: monday, end: sunday };
  };

  const getCurrentMonth = (year, month) => {
    const start = dayjs(`${year}-${month + 1}-01`)
      .startOf("month")
      .format("YYYY-MM-DD");
    const end = dayjs(`${year}-${month + 1}-01`)
      .endOf("month")
      .format("YYYY-MM-DD");

    return { start, end };
  };

  const handleFilter = (filterType) => {
    setSelectedOption(filterType);

    let dateRange;

    if (filterType === "weekly") {
      dateRange = getCurrentWeek(selectedYear);
    } else if (filterType === "monthly") {
      const selectedMonth = dayjs(startDate).month(); // Get the currently selected month
      dateRange = getCurrentMonth(selectedYear, selectedMonth);
    }

    setStartDate(dateRange.start);
    setEndDate(dateRange.end);

    console.log("Start Date:", dateRange.start);
    console.log("End Date:", dateRange.end);
  };

  return (
    <>
      <div className="flex h-screen flex-col">
        <MenuHeader
          menu={"Menu"}
          subMenu={""}
          currentpath={"Attendance"}
          icon={""}
          activeMenu={""}
        />
        {/* Filters */}
        <div className="flex w-full flex-col items-center justify-between gap-4 px-4 py-2">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-md">
              {/* Daily, Weekly, Monthly Buttons */}
              {["weekly", "monthly", "custom"].map((option) => (
                <button
                  key={option}
                  className={`btn-sm flex items-center rounded-md px-4 py-2 ${
                    selectedOption === option
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleFilter(option)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}

              {/* Previous Button */}
              {selectedOption !== "custom" && (
                <button
                  onClick={handlePrev}
                  className="btn-sm flex items-center justify-center rounded-md bg-gray-200 p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#434242"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-left"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
              )}

              {/* Date Range Input */}
              <div className="relative flex items-center">
                <input
                  type="date"
                  className="mr-2 h-8 rounded-md border px-2 text-sm"
                  value={startDate}
                  disabled={selectedOption !== "custom"}
                  onChange={(e) => setStartDate(e.target.value)}
                />{" "}
                -
                <input
                  type="date"
                  value={endDate}
                  disabled={selectedOption !== "custom"}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="ml-2 h-8 rounded-md border px-2 text-sm"
                />
              </div>

              {/* Next Button */}
              {selectedOption !== "custom" && (
                <button
                  onClick={handleNext}
                  className="btn-sm flex items-center justify-center rounded-md bg-gray-200 p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#434242"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              )}

              {/* Calendar Icon */}
              <div className="relative">
                {/* Year Picker Button */}
                {selectedOption !== "custom" && (
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center rounded-md bg-gray-200 p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#464444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-calendar"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                  </button>
                )}

                {/* Year Picker (Appears Below) */}
                {isOpen && (
                  <div
                    className="absolute -right-12 top-10 z-50 p-2"
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "0px",
                    }}
                  >
                    <DatePicker
                      selected={
                        selectedYear ? new Date(selectedYear, 0, 1) : new Date()
                      } // Ensure it selects the current year
                      onChange={handleYearChange}
                      showYearPicker
                      dateFormat="yyyy"
                      inline
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#77c477d5] pl-[0.10rem] pt-[0.15rem] text-xs font-extrabold text-black">
                P
              </p>
              <p className="text-sm">Present</p>
            </div>
            <div className="flex gap-2 text-sm">
              <img
                className="h-5 object-contain"
                src="/assets/icons/tort.svg"
                alt="late"
              />
              <p className="text-sm">Late</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e47f7f] pt-[0.02rem] text-xs font-extrabold text-black">
                A
              </p>
              <p className="text-sm">Absent</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#AEB6E7] pt-[0.02rem] text-xs font-extrabold text-black">
                AL
              </p>
              <p className="text-sm">Annual Leave</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FDE3AA] pt-[0.02rem] text-xs font-extrabold text-black">
                CL
              </p>
              <p className="text-sm">Casual Leave</p>
            </div>

            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e68ecf] pt-[0.02rem] text-xs font-extrabold text-black">
                H
              </p>
              <p className="text-sm">Holiday</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c5c5cb] pt-[0.02rem] text-xs font-extrabold text-black">
                DO
              </p>
              <p className="text-sm">Day Off</p>
            </div>
            <Atendance attendance={attendance} setAttendance={setAttendance} />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-min overflow-y-min w-full overflow-x-auto rounded-md border border-gray-300 bg-white">
          <div className="table mx-auto w-full">
            <table style={{ borderSpacing: "0", width: "100%" }}>
              <thead className="bg-gray-soft">
                <tr>
                  <th className="sticky left-0 top-0 z-10 border border-gray-300 bg-[#ebebf0] text-sm font-bold capitalize text-gray-darkpale">
                    Employee Name
                  </th>
                  {selectedOption === "weekly"
                    ? weekDays.map((dayObj, index) => (
                        <th
                          key={index}
                          className="sticky top-0 z-0 border border-gray-300 bg-[#ebebf0] text-sm font-bold capitalize text-gray-darkpale"
                        >
                          {dayObj.day}
                          <p className="font-medium">{dayObj.date}</p>
                        </th>
                      ))
                    : selectedOption === "monthly"
                      ? monthDays.map((dayObj, index) => (
                          <th
                            key={index}
                            className="sticky top-0 z-0 border border-gray-300 bg-[#ebebf0] text-sm font-bold capitalize text-gray-darkpale"
                          >
                            {dayObj.day}
                            <p className="font-medium">{dayObj.date}</p>
                          </th>
                        ))
                      : customDays.map((dayObj, index) => (
                          <th
                            key={index}
                            className="sticky top-0 z-0 border border-gray-300 bg-[#ebebf0] text-sm font-bold capitalize text-gray-darkpale"
                          >
                            {dayObj.day}
                            <p className="font-medium">{dayObj.date}</p>
                          </th>
                        ))}
                </tr>
              </thead>
              <tbody>
                {data?.map((employee, empIndex) => (
                  <tr key={empIndex} className="border-b-2 text-left">
                    <td className="sticky left-0 w-auto border-r-2 bg-[#ffffff] text-[0.8rem] font-medium capitalize text-gray-darkpale">
                      {employee.employee_name}
                    </td>
                    {selectedOption === "weekly"
                      ? weekDays.map((day) => {
                          // Find attendance status for the given date
                          const attendanceEntry = employee.attendances.find(
                            (att) => att.attendance_date === day.fullDate,
                          );
                          return (
                            <td
                              key={day.fullDate}
                              onClick={() => setAttendance(true)}
                              className={`text-center text-[0.8rem] cursor-pointer font-semibold ${
                                attendanceEntry?.status === "Present"
                                  ? "bg-[#77c477d5] text-black"
                                  : attendanceEntry?.status === "Holiday"
                                    ? "bg-[#e68ecf] text-black"
                                    : attendanceEntry?.status ===
                                        "Company Leave"
                                      ? "bg-[#FDE3AA] text-black"
                                      : attendanceEntry?.status ===
                                          "Annual Leave"
                                        ? "bg-[#AEB6E7] text-black"
                                        : attendanceEntry?.status === "Absent"
                                          ? "bg-[#e47f7f] text-black"
                                          : "bg-[#c5c5cb] text-black"
                              } border-r-2`}
                            >
                              {attendanceEntry?.status === "Present" ? (
                                <div
                                  className="flex items-center justify-center text-sm font-extrabold"
                                >
                                  <span>P</span>
                                  {attendanceEntry?.delay_status && (
                                    <img
                                      className="ml-2 w-5 object-contain"
                                      src="/assets/icons/tort.svg"
                                      alt="late"
                                    />
                                  )}
                                </div>
                              ) : attendanceEntry?.status === "Absent" ? (
                                <span className="text-sm font-extrabold">
                                  A
                                </span>
                              ) : attendanceEntry?.status === "Annual Leave" ? (
                                <span className="font-extrabold">AL</span>
                              ) : attendanceEntry?.status ===
                                "Company Leave" ? (
                                <span className="font-extrabold">CL</span>
                              ) : attendanceEntry?.status === "Holiday" ? (
                                <span className="text-sm font-extrabold">
                                  H
                                </span>
                              ) : (
                                <span className="font-extrabold">DO</span>
                              )}
                            </td>
                          );
                        })
                      : selectedOption === "weekly"
                        ? monthDays.map((day) => {
                            // Find attendance status for the given date
                            const attendanceEntry = employee.attendances.find(
                              (att) => att.attendance_date === day.fullDate,
                            );
                            return (
                              <td
                                key={day.fullDate}
                                className={`text-center text-[0.8rem] font-semibold ${
                                  attendanceEntry?.status === "Present"
                                    ? "bg-[#77c477d5] text-black"
                                    : attendanceEntry?.status === "Holiday"
                                      ? "bg-[#e68ecf] text-black"
                                      : attendanceEntry?.status ===
                                          "Company Leave"
                                        ? "bg-[#FDE3AA] text-black"
                                        : attendanceEntry?.status ===
                                            "Annual Leave"
                                          ? "bg-[#AEB6E7] text-black"
                                          : attendanceEntry?.status === "Absent"
                                            ? "bg-[#e47f7f] text-black"
                                            : "bg-[#c5c5cb] text-black"
                                } border-r-2`}
                              >
                                {attendanceEntry?.status === "Present" ? (
                                  <div
                                    onClick={() => setAttendance(true)}
                                    className="flex items-center justify-center text-sm font-extrabold"
                                  >
                                    <span>P</span>
                                    {attendanceEntry?.delay_status && (
                                      <img
                                        className="ml-2 w-5 object-contain"
                                        src="/assets/icons/tort.svg"
                                        alt="late"
                                      />
                                    )}
                                  </div>
                                ) : attendanceEntry?.status === "Absent" ? (
                                  <span className="text-sm font-extrabold">
                                    A
                                  </span>
                                ) : attendanceEntry?.status ===
                                  "Annual Leave" ? (
                                  <span className="font-extrabold">AL</span>
                                ) : attendanceEntry?.status ===
                                  "Company Leave" ? (
                                  <span className="font-extrabold">CL</span>
                                ) : attendanceEntry?.status === "Holiday" ? (
                                  <span className="text-sm font-extrabold">
                                    H
                                  </span>
                                ) : (
                                  <span className="font-extrabold">DO</span>
                                )}
                              </td>
                            );
                          })
                        : customDays.map((day) => {
                            // Find attendance status for the given date
                            const attendanceEntry = employee.attendances.find(
                              (att) => att.attendance_date === day.fullDate,
                            );
                            return (
                              <td
                                key={day.fullDate}
                                className={`text-center text-[0.8rem] font-semibold ${
                                  attendanceEntry?.status === "Present"
                                    ? "bg-[#77c477d5] text-black"
                                    : attendanceEntry?.status === "Holiday"
                                      ? "bg-[#e68ecf] text-black"
                                      : attendanceEntry?.status ===
                                          "Company Leave"
                                        ? "bg-[#FDE3AA] text-black"
                                        : attendanceEntry?.status ===
                                            "Annual Leave"
                                          ? "bg-[#AEB6E7] text-black"
                                          : attendanceEntry?.status === "Absent"
                                            ? "bg-[#e47f7f] text-black"
                                            : "bg-[#c5c5cb] text-black"
                                } border-r-2`}
                              >
                                {attendanceEntry?.status === "Present" ? (
                                  <div
                                    onClick={() => setAttendance(true)}
                                    className="flex items-center justify-center text-sm font-extrabold"
                                  >
                                    <span>P</span>
                                    {attendanceEntry?.delay_status && (
                                      <img
                                        className="ml-2 w-5 object-contain"
                                        src="/assets/icons/tort.svg"
                                        alt="late"
                                      />
                                    )}
                                  </div>
                                ) : attendanceEntry?.status === "Absent" ? (
                                  <span className="text-sm font-extrabold">
                                    A
                                  </span>
                                ) : attendanceEntry?.status ===
                                  "Annual Leave" ? (
                                  <span className="font-extrabold">AL</span>
                                ) : attendanceEntry?.status ===
                                  "Company Leave" ? (
                                  <span className="font-extrabold">CL</span>
                                ) : attendanceEntry?.status === "Holiday" ? (
                                  <span className="text-sm font-extrabold">
                                    H
                                  </span>
                                ) : (
                                  <span className="font-extrabold">DO</span>
                                )}
                              </td>
                            );
                          })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
