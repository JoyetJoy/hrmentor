import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import {
  EMPLOYEE_DEPARTMENT_LIST,
  newRequest,
  ROASTER_LISTING,
} from "@/api/master";
import { formatDate } from "@/utils/date";
import RosterHeader from "@/components/common/RosterHeader";
import html2pdf from "html2pdf.js";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";

export default function Rosterpdf() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [days, setDays] = useState([]);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [selectedOption, setSelectedOption] = useState("weekly");
  const [activeDepartment, setActiveDepartment] = useState([]);

  const useFetchData = (key, url) => {
    return useQuery({
      queryKey: [key],
      queryFn: () => newRequest.get(url).then((res) => res.data),
    });
  };

  const { data: department } = useFetchData(
    "department",
    EMPLOYEE_DEPARTMENT_LIST,
  );

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["event", startDate, endDate, activeDepartment],
    queryFn: () =>
      newRequest
        .get(ROASTER_LISTING, {
          params: {
            start_date: startDate,
            end_date: endDate,
            role: "hrmanager",
            department_id: activeDepartment,
            location_id: "",
            work_area_id: "",
          },
        })
        .then((res) => res.data),
    enabled: false, // Disable auto-fetch
  });

  useEffect(() => {
    if (startDate && endDate && activeDepartment) {
      refetch();
    }
  }, [startDate, endDate, activeDepartment]);

  const handleDownloadPDF = () => {
    const element = document.getElementById("attendance-table");

    if (!element) {
      console.error("Element not found!");
      return;
    }

    const opt = {
      margin: 0.5,
      filename: `Roster ${startDate} to ${endDate}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a3", orientation: "landscape" },
    };

    html2pdf().set(opt).from(element).save();
  };

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

  const findEvents = (date, data, day) => {
    const workingDays = data?.shift?.weeks || [];
    const allDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const selectedDay = dayjs(date).format("ddd").toUpperCase();
    const formattedDate = date;
    const holidayEvents = data?.filter(
      (event) =>
        Array.isArray(event?.holidays) &&
        event.holidays.includes(formattedDate),
    );

    const swapedEvents = data?.filter(
      (event) =>
        Array.isArray(event?.date_swaps) &&
        event.date_swaps.includes(formattedDate),
    );

    const deletedEvents = data?.filter(
      (event) =>
        Array.isArray(event?.date_deletions) &&
        event.date_deletions.includes(formattedDate),
    );

    const leaveEventsRaw =
      data?.filter(
        (event) =>
          Array.isArray(event?.date_leaves) &&
          event.date_leaves.some((leave) =>
            dayjs(leave.date).isSame(formattedDate, "day"),
          ),
      ) || [];

    // Deduplicate leaveEvents by user (or by _id if user isn't available)
    const leaveEvents = Array.from(
      new Map(
        leaveEventsRaw?.map((event) => [event._id, event]), // replace `_id` with `event.user_id` if applicable
      ).values(),
    );

    // console.log(leaveEvents);

    let shiftEventsRaw = data?.filter(
      (event) =>
        Array.isArray(event?.date_range) &&
        event.date_range.includes(formattedDate),
    );

    // Step 2: Deduplicate by (shift_id + date) combination
    const shiftEventMap = new Map();
    shiftEventsRaw.forEach((event) => {
      const key = `${event.shift_id}_${formattedDate}`;
      if (!shiftEventMap.has(key)) {
        shiftEventMap.set(key, event);
      }
    });
    const shiftEvents = Array.from(shiftEventMap.values());

    // Step 3: Create a set of shift event IDs for exclusion
    const shiftEventIds = new Set(shiftEvents?.map((event) => event._id));

    // Combine dayOff candidates and filter out duplicates and shiftEvents
    const combinedDayOff = [
      ...swapedEvents,
      ...deletedEvents,
      ...holidayEvents,
      ...leaveEvents,
    ];

    // Use Map to remove duplicate events based on _id
    const dayOff = Array.from(
      new Map(
        combinedDayOff
          .filter((event) => !shiftEventIds.has(event._id)) // remove if also in shiftEvents
          ?.map((event) => [event._id, event]), // use _id as unique key
      ).values(),
    );

    const weekOffDays = allDays.filter((day) => !workingDays.includes(day));

    const isDayOff = weekOffDays.includes(selectedDay);

    const requestedSlots = data?.requested_details?.filter((slot) =>
      dayjs(slot.date).isSame(dayjs(date), "day"),
    );

    return {
      holidayEvents,
      shiftEvents,
      isDayOff,
      requestedSlots,
      swapedEvents,
      deletedEvents,
      leaveEvents,
      dayOff,
    };
  };

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

  const departmentOptions = Array.isArray(department)
    ? department?.map((dep) => ({ value: dep.id, label: dep.value }))
    : [];

  return (
    <>
      <div className="flex h-screen flex-col">
        <RosterHeader page={3} />
        {/* Filters */}
        <div className="relative flex w-full items-center justify-between gap-4 px-4 py-2">
          <Select
            options={departmentOptions}
            isSearchable={true}
            styles={customSelectStyles}
            onChange={(selectedOption) =>
              setActiveDepartment([selectedOption.value])
            }
            placeholder="Select Department"
            className="input-box z-30 h-10 w-52 rounded-md border-gray-muted bg-white focus:border-gray-muted"
          />
          <div className="flex items-center justify-center">
            <div className="mb-2 flex items-center space-x-2 rounded-md bg-white p-2 shadow-md">
              {/* Daily, Weekly, Monthly Buttons */}
              {["weekly"].map((option) => (
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
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="mb-4 rounded-md bg-hrmprimaryorange px-4 py-2 text-white"
          >
            Download PDF
          </button>
        </div>

        {/* Attendance Table */}
        <div
          className="overflow-y-medium min-h-screen w-full rounded-md border border-gray-300 bg-white"
          style={{ backgroundColor: "#fff" }}
        >
          <div className="table mx-auto w-full">
            {isLoading ? (
              <div className="flex min-h-96 w-full items-center justify-center bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <div id="attendance-table" style={{ backgroundColor: "#fff" }}>
                <table style={{ borderSpacing: "0", width: "100%" }}>
                  <thead className="bg-gray-soft">
                    <tr>
                      <th className="sticky left-0 top-0 z-10 border border-gray-300 bg-[#ebebf0] text-sm font-bold capitalize text-gray-darkpale">
                        Employee Name
                      </th>
                      {days?.map((dayObj, index) => (
                        <th
                          key={index}
                          className="sticky top-0 z-0 border border-gray-300 bg-[#ebebf0] pb-3 text-sm font-bold capitalize text-gray-darkpale"
                        >
                          {dayObj.day}
                          <p className="font-medium">{dayObj.date}</p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.results?.map((employee, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b-[3px] border-[#d1d5db] text-left"
                      >
                        <td className="sticky left-0 min-h-32 border-b-[3px] border-l-[3px] border-r-[3px] border-[#d1d5db] bg-[#ffffff] px-5 pb-2 text-sm font-bold capitalize text-slate-800">
                          {employee?.employee?.name}
                        </td>
                        {days?.map((day, index) => {
                          // Find attendance status for the given date
                          const { shiftEvents, leaveEvents, dayOff } =
                            findEvents(
                              day.fullDate,
                              employee?.rosters,
                              day.day,
                            );

                          return (
                            <td
                              key={index}
                              className="border-r-[3px] border-[#d1d5db]"
                            >
                              {shiftEvents?.length > 0 ? (
                                <div className="">
                                  {shiftEvents?.map((shift, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        background:
                                          shift?.shift_color || "#bfdbfe",
                                      }}
                                      className={`mx-2 my-2 flex min-h-12 min-w-36 cursor-pointer items-center justify-center rounded-md text-center text-xs pb-2 font-semibold`}
                                    >
                                      <div
                                        className={`flex w-full flex-col items-center justify-center rounded-md text-center text-xs font-semibold`}
                                      >
                                        <span>{shift.shift_name}</span>
                                        {shift?.shift?.start_time && (
                                          <p className="text-center text-xs">
                                            {shift?.shift?.start_time} -{" "}
                                            {shift?.shift?.end_time}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                  {leaveEvents?.map((event, index) =>
                                    event?.date_leaves
                                      ?.filter((leave) =>
                                        dayjs(leave.date).isSame(
                                          day.fullDate,
                                          "day",
                                        ),
                                      )
                                      ?.map((leave, i) => (
                                        <div
                                          key={`${index}-${i}`}
                                          className="mx-2 my-2 flex items-center justify-center min-h-12 min-w-36 cursor-pointer rounded-md bg-[#815fb3] py-3 text-black"
                                        >
                                           <p className="flex h-[1.6rem] w-full justify-center text-center text-xs font-semibold">
                                            {leave.leave_name || "Leave"}
                                          </p>
                                        </div>
                                      )),
                                  )}
                                </div>
                              ) : leaveEvents?.length > 0 ? (
                                <div className="">
                                  {leaveEvents?.map((event, index) =>
                                    event?.date_leaves
                                      ?.filter((leave) =>
                                        dayjs(leave.date).isSame(
                                          day.fullDate,
                                          "day",
                                        ),
                                      )
                                      ?.map((leave, i) => (
                                        <div
                                          key={`${index}-${i}`}
                                          className="mx-2 my-2 flex min-h-5 min-w-36 items-center justify-center cursor-pointer rounded-md bg-[#815fb3] py-3 text-black"
                                        >
                                          <p className="flex h-[1.6rem] w-full justify-center text-center text-xs font-semibold">
                                            {leave.leave_name || "Leave"}
                                          </p>
                                        </div>
                                      )),
                                  )}
                                </div>
                              ) : (
                                <div className="">
                                  <div
                                    key={index}
                                    className="mx-2 my-2 flex min-h-12 min-w-36 items-center justify-center cursor-pointer rounded-md bg-[#c5c5cb] pb-2 text-black"
                                  >
                                    <p className="flex h-[1.2rem] w-full justify-center text-center text-xs font-semibold">
                                      Day Off
                                    </p>
                                  </div>
                                 
                                </div>
                              )}
                              {/* {dayOff?.map((shift, index) => (
                                <div
                                  key={index}
                                  className="mx-2 my-2 flex h-12 min-w-36 cursor-pointer items-center justify-center rounded-md bg-[#ba1a1a] text-black"
                                >
                                  <p className="text-center text-xs font-semibold">
                                    Day Of
                                  </p>
                                </div>
                              ))} */}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
