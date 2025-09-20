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
  const [days, setDays] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [selectedOption, setSelectedOption] = useState("weekly");
  const [empId, setEmpId] = useState();
  const [hoveredShift, setHoveredShift] = useState(null);

  const { data, isLoading, refetch } = useQuery({
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
        fullDay: day.format("dddd"),
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
        fullDay: day.format("dddd"),
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
        fullDay: day.format("dddd"),
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
      setDays(weekDays);
      setStartDate(weekDays[0].fullDate);
      setEndDate(weekDays[weekDays.length - 1].fullDate);
    } else if (selectedOption === "monthly") {
      setDays(monthDays);
      setStartDate(monthDays[0].fullDate);
      setEndDate(monthDays[monthDays.length - 1].fullDate);
    } else if (selectedOption === "custom") {
      setDays(customDays);
    }
  }, [selectedOption, startDate, endDate]);

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
      const selectedMonth = dayjs().month(); // Get the current month dynamically
      dateRange = getCurrentMonth(selectedYear, selectedMonth);
    }
    setStartDate(dateRange.start);
    setEndDate(dateRange.end);
  };

  const eventClick = (id, empname, date, day, attendance) => {
    setEmpId({
      id,
      empname,
      date,
      day,
      attendance,
    });
    setAttendance(true);
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
                      ? "bg-hrmprimaryorange text-white"
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
                  className="mr-2 h-8 rounded-md border px-2 text-center text-xs"
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
                  className="ml-2 h-8 rounded-md border px-2 text-center text-xs"
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
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00b448] pl-[0.10rem] pt-[0.15rem] text-xs font-extrabold text-black">
                P
              </p>
              <p className="text-sm">Present</p>
            </div>
            {/* <div className="flex gap-2 text-sm">
              <img
                className="h-5 object-contain"
                src="/assets/icons/tort.svg"
                alt="late"
              />
              <p className="text-sm">Late</p>
            </div> */}
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#cb2020] pt-[0.02rem] text-xs font-extrabold text-black">
                A
              </p>
              <p className="text-sm">Absent</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c5a2fb] pt-[0.02rem] text-xs font-extrabold text-black">
                AL
              </p>
              <p className="text-sm">Annual Leave</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fb643e] pt-[0.02rem] text-xs font-extrabold text-black">
                SL
              </p>
              <p className="text-sm">Sick Leave</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FBE51E] pt-[0.02rem] text-xs font-extrabold text-black">
                OL
              </p>
              <p className="text-sm">Other Leaves</p>
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
            <Atendance
              attendance={attendance}
              setAttendance={setAttendance}
              empId={empId}
              refetch={refetch}
            />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-y-medium w-full overflow-x-auto rounded-md border border-gray-300 bg-white">
          <div className="table mx-auto w-full">
            {isLoading ? (
              <div className="flex min-h-96 w-full items-center justify-center bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <table
                style={{ borderSpacing: "0", width: "100%" }}
                className="mb-8"
              >
                <thead className="bg-gray-soft">
                  <tr>
                    <th className="sticky left-0 top-0 z-10 border border-gray-300 bg-[#ebebf0] text-sm font-bold capitalize text-gray-darkpale">
                      Employee Name
                    </th>
                    {days?.map((dayObj, index) => (
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
                  {data?.map((employee) => (
                    <tr
                      key={employee?.employee_id}
                      className="border-b-[3px] border-[#d1d5db] text-left"
                    >
                      <td className="sticky left-0 border-r-2 border-b-slate-500 bg-[#ffffff] text-sm font-bold capitalize text-slate-800">
                        {employee?.employee_name}
                      </td>
                      {days?.map((day) => {
                        // Find attendance status for the given date
                        const attendanceEntry = employee.attendances.find(
                          (att) => att.attendance_date === day.fullDate,
                        );

                        let uniqueShifts = [];
                        if (attendanceEntry?.shifts?.length) {
                          const tempSet = new Set();
                          for (let shift of attendanceEntry.shifts) {
                            if (!tempSet.has(shift.shift_id)) {
                              tempSet.add(shift.shift_id);
                              uniqueShifts.push(shift);
                            }
                          }

                          // If there are multiple "Leave" entries, keep only one
                          const leaveShifts = uniqueShifts.filter(
                            (s) => s.status === "Leave",
                          );
                          if (leaveShifts.length > 1) {
                            // Keep only the first Leave, remove others
                            const firstLeave = leaveShifts[0];
                            uniqueShifts = uniqueShifts.filter(
                              (s) => s.status !== "Leave" || s === firstLeave,
                            );
                          }
                        }

                        return (
                          <td className="border-r-[3px] border-[#d1d5db]">
                            {uniqueShifts?.length > 0 ? (
                              <>
                                {uniqueShifts?.map((shift, index) => (
                                  <div
                                    key={`${day.fullDate}-${index}`}
                                    onClick={() => {
                                      eventClick(
                                        employee?.employee_id,
                                        employee?.employee_name,
                                        day.fullDate,
                                        day.fullDay,
                                        shift,
                                      );
                                    }}
                                    className={`flex cursor-pointer justify-center text-center text-[0.8rem] font-semibold`}
                                  >
                                    <div
                                      className={`mb-2 flex h-10 w-full items-center justify-center text-sm font-extrabold text-black ${
                                        shift?.status === "Present"
                                          ? "bg-[#00b448]"
                                          : shift?.status === "Holiday"
                                            ? "bg-[#e68ecf]"
                                            : shift?.status === "Absent"
                                              ? "bg-[#cb2020]"
                                              : shift?.status === "Day Off"
                                                ? "bg-[#c5c5cb]"
                                                : shift?.status === "Leave" &&
                                                    shift?.leave_type_id ===
                                                      "AL"
                                                  ? "bg-[#c5a2fb]"
                                                  : shift?.status === "Leave" &&
                                                      shift?.leave_type_id ===
                                                        "170"
                                                    ? "bg-[#fb643e]"
                                                    : shift?.status ===
                                                          "Leave" &&
                                                        shift?.leave_type_id !==
                                                          "AL" &&
                                                        shift?.leave_type_id !==
                                                          "170"
                                                      ? "bg-[#FBE51E]"
                                                      : ""
                                      }`}
                                      onMouseEnter={() => {
                                        {
                                          setHoveredShift({
                                            id: employee?.employee_id,
                                            date: day.fullDate,
                                            shiftName: shift?.shift_name,
                                            status: shift?.status,
                                          });
                                        }
                                      }}
                                      onMouseLeave={() => {
                                        setHoveredShift({
                                          id: "",
                                          date: "",
                                          shiftName: "",
                                        });
                                      }}
                                    >
                                      <span>
                                        {shift?.status === "Present"
                                          ? "P"
                                          : shift?.status === "Holiday"
                                            ? "H"
                                            : shift?.status === "Absent"
                                              ? "A"
                                              : shift?.status === "Day Off"
                                                ? "DO"
                                                : shift?.status === "Leave" &&
                                                    shift?.leave_type_id ===
                                                      "AL"
                                                  ? "AL"
                                                  : shift?.status === "Leave" &&
                                                      shift?.leave_type_id ===
                                                        "170"
                                                    ? "SL"
                                                    : shift?.status ===
                                                          "Leave" &&
                                                        shift?.leave_type_id !==
                                                          "AL" &&
                                                        shift?.leave_type_id !==
                                                          "170"
                                                      ? "OL"
                                                      : ""}
                                      </span>
                                      {shift?.delay_status && (
                                        <img
                                          className="ml-2 w-5 object-contain"
                                          src="/assets/icons/tort.svg"
                                          alt="late"
                                        />
                                      )}
                                    </div>
                                    <div className="relative">
                                      {hoveredShift?.id ===
                                        employee?.employee_id &&
                                        shift?.status !== "Holiday" &&
                                        hoveredShift?.date === day.fullDate &&
                                        hoveredShift?.shiftName ===
                                          shift?.shift_name && (
                                          <span className="absolute -right-5 top-14 h-9 w-[7rem] whitespace-nowrap rounded-md bg-gray-800 px-2 py-2 text-sm text-white shadow-md">
                                            {hoveredShift?.shiftName?.length >
                                            13
                                              ? hoveredShift.shiftName.slice(
                                                  0,
                                                  10,
                                                ) + "..."
                                              : hoveredShift?.shiftName}
                                          </span>
                                        )}
                                    </div>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <>
                                <div
                                  className={`flex cursor-pointer justify-center text-center text-[0.8rem] font-semibold`}
                                >
                                  <div
                                    className={`mb-2 flex h-10 w-full items-center justify-center bg-[#c5c5cb] text-sm font-extrabold text-black`}
                                  >
                                    <span>DO</span>
                                  </div>
                                </div>
                              </>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
