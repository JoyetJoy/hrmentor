import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NewRoster from "@/components/popups/master/roster/NewRoster";
import { useQuery } from "@tanstack/react-query";
import { newRequest, ROASTER_LIST_GET } from "@/api/master";
import { ACTIVE_EMPLOYEE } from "@/api";
import RosterItemList from "@/components/sidebars/roster/Index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const months = Array.from({ length: 12 }, (_, i) => ({
//   value: i + 1,
//   label: dayjs().month(i).format("MMMM"),
// }));

// const years = Array.from({ length: 11 }, (_, i) => ({
//   value: 2020 + i,
//   label: (2020 + i).toString(),
// }));

const ShiftCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [popupOpen, setPopupOpen] = useState(false);
  const year = dayjs(date).year();
  const month = dayjs(date).month() + 1;
  const navigate = useNavigate();
  const [activeEmployee, setActiveEmployee] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("");
  const [activeWorkArea, setActiveWorkArea] = useState("");
  const [activeLocation, setActiveLocation] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("monthly");
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [endDate, setEndDate] = useState(
    dayjs(startDate).add(6, "day").toDate(),
  );

  const { data: employee } = useQuery({
    queryKey: ["employee"],
    queryFn: () => newRequest.get(ACTIVE_EMPLOYEE).then((res) => res.data),
  });

  const { data: events = [], refetch } = useQuery({
    queryKey: [
      "events",
      month,
      year,
      activeEmployee,
      activeDepartment,
      activeLocation,
      activeWorkArea,
    ],
    queryFn: () =>
      newRequest
        .get(ROASTER_LIST_GET, {
          params: {
            month,
            year,
            employee: activeEmployee,
            department: activeDepartment,
            location: activeLocation,
            work_area: activeWorkArea,
          },
        })
        .then((res) => res.data),
    enabled: true,
    staleTime: 0,
  });

  useEffect(() => {
    refetch();
  }, [
    date,
    refetch,
    activeEmployee,
    activeDepartment,
    activeLocation,
    activeWorkArea,
  ]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // const handleMonthChange = (selectedOption) => {
  //   const currentDay = dayjs(date).date();
  //   const updatedDate = dayjs(date)
  //     .month(selectedOption.value - 1)
  //     .date(1)
  //     .date(
  //       Math.min(
  //         currentDay,
  //         dayjs(date)
  //           .month(selectedOption.value - 1)
  //           .daysInMonth(),
  //       ),
  //     )
  //     .toDate();
  //   handleDateChange(updatedDate);
  // };

  // const handleYearChange = (selectedOption) => {
  //   const updatedDate = dayjs(date).year(selectedOption.value).toDate();
  //   handleDateChange(updatedDate);
  // };

  const findEvents = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const holidayEvents = events?.result?.filter((event) =>
      event?.holidays?.includes(formattedDate),
    );
    const shiftEvents = events?.result?.filter((event) =>
      event?.date_range?.includes(formattedDate),
    );

    const availableSlots = events?.available_slots_filtered?.filter((slot) =>
      dayjs(slot.date).isSame(dayjs(date), "day"),
    );

    const requestedSlots = events?.requested_details?.filter((slot) =>
      dayjs(slot.date).isSame(dayjs(date), "day"),
    );

    return { holidayEvents, shiftEvents, availableSlots, requestedSlots };
  };

  const handleClick = (event, date) => {
    if (!event?.isHoliday) {
      const selectdate = dayjs(date).format("YYYY-MM-DD");
      if (date) {
        navigate(
          `/admin/shift/calendarview?id=${event?.id}&date=${selectdate}`,
        );
      }
    }
  };

  function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  }
  const handleRangeChange = (option) => {
    setSelectedOption(option);
    let newEndDate;

    if (option === "daily") {
      newEndDate = startDate;
    } else if (option === "weekly") {
      newEndDate = dayjs(startDate).add(6, "day").toDate();
    } else if (option === "monthly") {
      newEndDate = dayjs(startDate).add(1, "month").subtract(1, "day").toDate();
    }

    setEndDate(newEndDate);
  };

  const handlePrev = () => {
    let newStartDate;
    if (selectedOption === "daily") {
      newStartDate = dayjs(startDate).subtract(1, "day").toDate();
    } else if (selectedOption === "weekly") {
      newStartDate = dayjs(startDate).subtract(1, "week").toDate();
    } else {
      newStartDate = dayjs(startDate).subtract(1, "month").toDate();
    }
    setStartDate(newStartDate);
    setEndDate(dayjs(newStartDate).add(1, "month").subtract(1, "day").toDate());
  };

  const handleNext = () => {
    let newStartDate;
    if (selectedOption === "daily") {
      newStartDate = dayjs(startDate).add(1, "day").toDate();
    } else if (selectedOption === "weekly") {
      newStartDate = dayjs(startDate).add(1, "week").toDate();
    } else {
      newStartDate = dayjs(startDate).add(1, "month").toDate();
    }
    setStartDate(newStartDate);
    setEndDate(dayjs(newStartDate).add(1, "month").subtract(1, "day").toDate());
  };
  const adjustLightness = (hex, percent) => {
    hex = hex.replace("#", "");

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Convert to HSL
    let hsl = rgbToHsl(r, g, b);
    hsl[2] = Math.min(100, Math.max(0, hsl[2] + percent)); // Adjust Lightness
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  };

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

  const monthDays = getMonthDays();

  useEffect(() => {
    if (selectedOption === "monthly") {
      // setDays(monthDays);
      setStartDate(monthDays[0].fullDate);
      setEndDate(monthDays[monthDays.length - 1].fullDate);
    }
  }, [selectedOption, startDate, endDate]);

  // RGB to HSL Conversion
  const rgbToHsl = (r, g, b) => {
    (r /= 255), (g /= 255), (b /= 255);
    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // Grayscale
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h =
        max === r
          ? (g - b) / d + (g < b ? 6 : 0)
          : max === g
            ? (b - r) / d + 2
            : (r - g) / d + 4;
      h = Math.round(h * 60);
    }
    return [h, Math.round(s * 100), Math.round(l * 100)];
  };

  return (
    <div className="flex gap-2">
      <>
        <NewRoster popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
        <div className="flex flex-row py-4">
          <div>
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-md">
                {/* Daily, Weekly, Monthly Buttons */}
                {["weekly", "monthly"].map((option) => (
                  <button
                    key={option}
                    className={`btn-sm flex items-center rounded-md px-4 py-2 ${
                      selectedOption === option
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleRangeChange(option)}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}

                {/* Previous Button */}
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

                {/* Date Range Input */}
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={`${dayjs(startDate).format("DD/MM/YYYY")} - ${dayjs(endDate).format("DD/MM/YYYY")}`}
                    readOnly
                    className="w-44 rounded-md border border-gray-300 bg-white px-3 py-1 text-center text-xs"
                  />
                </div>

                {/* Next Button */}
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

                {/* Calendar Icon */}
                <div className="relative">
                  {/* Year Picker Button */}
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-calendar"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                  </button>

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
                        selected={selectedYear}
                        onChange={(date) => {
                          setSelectedYear(date);

                          const newYear = dayjs(date).year();

                          const newStartDate = dayjs(
                            `${newYear}-01-01`,
                          ).toDate();
                          const newEndDate = dayjs(`${newYear}-12-31`).toDate();

                          setStartDate(newStartDate);
                          setEndDate(newEndDate);

                          setIsOpen(false);
                        }}
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

            <div className="flex w-full items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <Select
                  options={[
                    { value: "HR", label: "HR" },
                    { value: "Engineering", label: "Engineering" },
                    { value: "Marketing", label: "Marketing" },
                  ]}
                  isSearchable={true}
                  //   onChange={handleDepartmentChange}
                  styles={customSelectStyles}
                  placeholder="Select Department"
                  className="input-box h-10 w-52 rounded-md border-gray-muted bg-white focus:border-gray-muted"
                />

                <Select
                  options={[
                    { value: "New York", label: "New York" },
                    { value: "San Francisco", label: "San Francisco" },
                    { value: "Chicago", label: "Chicago" },
                  ]}
                  isSearchable={true}
                  //   onChange={handleLocationChange}
                  styles={customSelectStyles}
                  placeholder="Select Location"
                  className="input-box h-10 w-52 rounded-md border-gray-muted bg-white focus:border-gray-muted"
                />

                {/* <Select
                  options={[
                    { value: "Office", label: "Office" },
                    { value: "Remote", label: "Remote" },
                    { value: "Hybrid", label: "Hybrid" },
                  ]}
                  isSearchable={true}
                  //   onChange={handleWorkAreaChange}
                  styles={customSelectStyles}
                  placeholder="Select Work Area"
                  className="input-box h-10 w-52 rounded-md border-gray-muted bg-white focus:border-gray-muted"
                />
                <Select
                  options={employee}
                  isSearchable={true}
                  onChange={(option) => setActiveEmployee(option?.id || "")}
                  styles={customSelectStyles}
                  placeholder={"All employee"}
                  className="input-box h-10 w-52 rounded-md border-[#C2C1C1] bg-white p-0 px-2 caret-white focus:border-[#C2C1C1]"
                /> */}
              </div>
              <div className="flex items-center gap-4">
                <Select
                  options={[
                    { value: "Office", label: "Office" },
                    { value: "Remote", label: "Remote" },
                    { value: "Hybrid", label: "Hybrid" },
                  ]}
                  isSearchable={true}
                  //   onChange={handleWorkAreaChange}
                  styles={customSelectStyles}
                  placeholder="Select Work Area"
                  className="input-box h-10 w-52 rounded-md border-gray-muted bg-white focus:border-gray-muted"
                />
                <Select
                  options={employee}
                  isSearchable={true}
                  onChange={(option) => setActiveEmployee(option?.id || "")}
                  styles={customSelectStyles}
                  placeholder={"All employee"}
                  className="input-box h-10 w-52 rounded-md border-[#C2C1C1] bg-white p-0 px-2 caret-white focus:border-[#C2C1C1]"
                />
              </div>

              {/* <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-md">
                {["daily", "weekly", "monthly"].map((option) => (
                  <button
                    key={option}
                    className={`btn-sm flex items-center justify-center rounded-md px-4 py-2 ${
                      selectedOption === option
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleRangeChange(option)}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}

                <button
                  onClick={handlePrev}
                  className="rounded-md bg-gray-200 px-2 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#434242"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chevron-left"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                <input
                  type="text"
                  value={`${dayjs(startDate).format("DD/MM/YYYY")} - ${dayjs(endDate).format("DD/MM/YYYY")}`}
                  readOnly
                  className="rounded-md border px-2 py-1 text-center text-sm"
                />

                <button
                  onClick={handleNext}
                  className="rounded-md bg-gray-200 px-2 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#434242"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chevron-right"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>

                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="hidden"
                  customInput={
                    <button className="rounded-md bg-gray-200 px-2 py-1">
                      📅
                    </button>
                  }
                />
                
              </div> */}

              {/* <div className="flex gap-2">
                <Select
                  options={employee}
                  isSearchable={true}
                  onChange={(option) => setActiveEmployee(option?.id || "")}
                  styles={customSelectStyles}
                  placeholder={"All employee"}
                  className="input-box h-10 w-52 rounded-md border-[#C2C1C1] bg-white p-0 px-2 caret-white focus:border-[#C2C1C1]"
                />
                <button
                  onClick={() => addRoster()}
                  className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-[#030E5C]/70 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  <Plus className="size-4" />
                  Add Roster
                </button>
              </div> */}
            </div>
            <div className="mt-7 w-full">
              {isExpanded && (
                <RosterItemList
                  activeDepartment={activeDepartment}
                  setActiveDepartment={setActiveDepartment}
                  activeLocation={activeLocation}
                  setActiveLocation={setActiveLocation}
                  activeWorkArea={activeWorkArea}
                  setActiveWorkArea={setActiveWorkArea}
                />
              )}
              <Calendar
                key={date}
                onChange={handleDateChange}
                value={date}
                showNavigation={false}
                className="w-full font-monorope"
                locale="en-US"
                formatShortWeekday={(locale, date) =>
                  dayjs(date).format("dddd")
                }
                tileContent={({ date, view }) => {
                  if (view === "month") {
                    const {
                      holidayEvents,
                      shiftEvents,
                      availableSlots,
                      requestedSlots,
                    } = findEvents(date);
                    console.log(shiftEvents);

                    return (
                      <div className="overflow-y-min relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
                        <>
                          <div className="absolute -top-6 right-0 flex flex-col items-end">
                            {availableSlots?.map((slot, index) => (
                              <img
                                key={`available-slot-${index}`}
                                onClick={() => {
                                  setClaimPopup(true);
                                  setSelectedField(slot);
                                }}
                                src="/assets/icons/employee_access/header/availableshift.svg"
                                alt=""
                              />
                            ))}
                            {requestedSlots?.map((slot, index) => (
                              <img
                                key={index}
                                src="/assets/icons/employee_access/header/requested_slot.svg"
                                alt=""
                              />
                            ))}
                          </div>
                          {shiftEvents?.map((event, index) => (
                            <div
                              key={index}
                              onClick={() => handleClick(event, date)}
                              style={{
                                backgroundColor: event?.shift?.shift_color,
                                borderLeft: `4px solid ${adjustLightness(event?.shift?.shift_color, -18)}`,
                              }}
                              className={`mt-2 flex h-[3.8rem] w-auto flex-col justify-center rounded-sm border-l-4 border-blue-400 bg-blue-200 py-3 pl-2 pr-3 text-gray-800 hover:opacity-65 lg:w-36 xl:w-44`}
                            >
                              <span className="float-start flex text-[0.8rem] font-semibold">
                                {event.shift_name}
                              </span>
                              <span className="float-start flex text-[12px]">
                                {convertTo12HourFormat(
                                  event?.shift?.start_time,
                                )}
                                -{convertTo12HourFormat(event?.shift?.end_time)}
                              </span>
                              <div className="flex w-full items-center justify-between pr-2">
                                <span className="float-start flex text-[12.2px] font-semibold">
                                  Employee:{" "}
                                  {event?.assigned_total_employee_count || 0}/
                                  {event?.people_required || 0}
                                </span>
                                <ArrowRight
                                  onClick={() => handleClick(event)}
                                  size={16}
                                  color="#848484"
                                  strokeWidth={1.5}
                                />
                              </div>
                            </div>
                          ))}
                        </>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ShiftCalendar;
