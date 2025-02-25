import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import { Plus, ArrowRight, AlignJustify } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RosterHeader from "@/components/common/RosterHeader";
import { useNavigate } from "react-router-dom";
import NewRoster from "@/components/popups/master/roster/NewRoster";
import { useQuery } from "@tanstack/react-query";
import { newRequest, ROASTER_LIST_GET } from "@/api/master";
import { ACTIVE_EMPLOYEE } from "@/api";
import { dividerClasses } from "@mui/material";
import RosterItemList from "@/components/sidebars/roster/Index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  EMPLOYEE_DEPARTMENT_LIST,
  EMPLOYEE_WORK_AREA,
  EMPLOYEE_WORK_LOCATION_LIST,
} from "@/api/master";

const departmentOptions = [
  { value: "emergency", label: "Emergency Department" },
  { value: "cardiology", label: "Cardiology" },
  { value: "radiology", label: "Radiology" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "oncology", label: "Oncology" },
];

const employee = [
  { value: "Harshal", label: "Harshal" },
  { value: "Amit", label: "Amit" },
];
const months = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: dayjs().month(i).format("MMMM"),
}));

const years = Array.from({ length: 11 }, (_, i) => ({
  value: 2020 + i,
  label: (2020 + i).toString(),
}));

const RosterCalendar = () => {
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
  const [selectedYear, setSelectedYear] = useState(null);

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

  const handleMonthChange = (selectedOption) => {
    const currentDay = dayjs(date).date();
    const updatedDate = dayjs(date)
      .month(selectedOption.value - 1)
      .date(1)
      .date(
        Math.min(
          currentDay,
          dayjs(date)
            .month(selectedOption.value - 1)
            .daysInMonth(),
        ),
      )
      .toDate();
    handleDateChange(updatedDate);
  };

  const handleYearChange = (selectedOption) => {
    const updatedDate = dayjs(date).year(selectedOption.value).toDate();
    handleDateChange(updatedDate);
  };

  const getTileClass = (date) => {
    // if (event?.assigned_total_employee_count !== event?.people_required)
    //   return "bg-blue-200 border-blue-500 hover:bg-[#b4d1f3]";
    if (dayjs(date).isSame(dayjs(), "day"))
      return "bg-green-200 border-green-500 hover:bg-[#c0e9c0]";
    if (dayjs(date).isBefore(dayjs(), "day"))
      return "bg-blue-200 border-blue-500 hover:bg-[#b4d1f3]";
    return "bg-yellow-200 border-yellow-500 hover:bg-[#f1e584]";
  };
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
          `/admin/roster/calendarview?id=${event?.id}&date=${selectdate}`,
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

  const addRoster = () => {
    setPopupOpen(true);
  };
  const getMonthDays = () => {
    const startOfMonth = dayjs(date).startOf("month");
    const daysInMonth = dayjs(date).daysInMonth();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = startOfMonth.add(i, "day");
      return {
        day: day.format("ddd"),
        date: day.format("MMM DD"),
        fullDate: day.format("YYYY-MM-DD"),
      };
    });
  };
  const [selectedOption, setSelectedOption] = useState("weekly");
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopUp] = useState(false);
  const [openPopup, setOpenPopup] = useState(null); // Track which popup is open

  const handleOpen = (rowIndex, colIndex) => {
    setOpenPopup((prev) =>
      prev?.row === rowIndex && prev?.col === colIndex
        ? null
        : { row: rowIndex, col: colIndex },
    );
  };

  const [endDate, setEndDate] = useState(
    dayjs(startDate).add(6, "day").toDate(),
  );
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
    setEndDate(
      dayjs(newStartDate)
        .add(selectedOption === "monthly" ? 1 : 6, "day")
        .toDate(),
    );
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
    setEndDate(
      dayjs(newStartDate)
        .add(selectedOption === "monthly" ? 1 : 6, "day")
        .toDate(),
    );
  };
  const monthDays = getMonthDays();
  const employees = [
    {
      id: "BTRV002",
      name: "Mammutty P S",

      shifts: ["TI", "MT"],
      shiftTime: ["09:00", "17:30"],

      shiftType: "Morning Shift",
      shiftType2: "Night Shift",
    },
    {
      id: "BTRV001",
      name: "Tojo Thomas",

      shifts: [],
      shiftTime: ["09:00", "17:30"],

      shiftType: "",
    },
    {
      id: "BTRV21",
      name: "Valsakh T G",

      shifts: ["T2", "OS"],
      shiftTime: ["09:00", "17:30"],

      shiftType: "Evening Shift",
    },
    {
      id: "BTRV24",
      name: "Vishnu S L",

      shifts: ["TI", "IT"],
      shiftTime: ["09:00", "17:30"],

      shiftType: "Night Shift",
    },
    {
      id: "BTRV24",
      name: "Mariya S L",

      shifts: ["TI", "IT"],
      shiftTime: ["09:00", "17:30"],

      shiftType: "Night Shift",
    },
    {
      id: "BTRV0027",
      name: "John Doe",

      shifts: [],
      shiftTime: ["09:00", "17:30"],

      shiftType: "Afternoon Shift",
    },
    {
      id: "BTRV0029",
      name: "Dudy St",

      shifts: [],
      shiftTime: ["12:00", "17:30"],

      shiftType: "Afternoon Shift",
    },
    {
      id: "BTRV0027",
      name: "Leo Doe",

      shifts: [],
      shiftTime: ["09:00", "17:30"],
      shiftType: "Afternoon Shift",
    },
  ];
  const shifts = [
    { name: "Morning Shift", time: "09:00 - 17:30" },
    { name: "Saturday Shift", time: "09:00 - 16:30" },
  ];

  const [search, setSearch] = useState("");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDate = new Date();
  const weekDates = days.map((_, index) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + index);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });
  const filteredShifts = shifts.filter((shift) =>
    shift.name.toLowerCase().includes(search.toLowerCase()),
  );
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
  const useFetchData = (key, url) => {
    return useQuery({
      queryKey: [key],
      queryFn: () => newRequest.get(url).then((res) => res.data),
    });
  };

  // Fetch data from APIs
  const { data: department } = useFetchData(
    "department",
    EMPLOYEE_DEPARTMENT_LIST,
  );
  const { data: work_area } = useFetchData("work_area", EMPLOYEE_WORK_AREA);
  const { data: location } = useFetchData(
    "location",
    EMPLOYEE_WORK_LOCATION_LIST,
  );

  // Debugging
  console.log("work_area data:", work_area);
  console.log("department data:", department);
  console.log("location data:", location);

  // Ensure the data is an array
  const departmentOptions = Array.isArray(department)
    ? department.map((dep) => ({ value: dep.id, label: dep.value }))
    : [];
  const locationOptions = Array.isArray(location)
    ? location.map((loc) => ({ value: loc.id, label: loc.value }))
    : [];
  const workAreaOptions = work_area
    ? work_area?.data?.original?.data?.map((area) => ({
        value: area.id,
        label: area.name,
      }))
    : [];
  const weekDate = weekDates.map((date, index) => {
    return date;
  });
  console.log(weekDate);
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

  const weekDays = getWeekDays();

  return (
    <>
      <NewRoster popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      <div className="flex py-4">
        <div className="w-full">
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

                        const newStartDate = dayjs(`${newYear}-01-01`).toDate();
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
                options={departmentOptions}
                isSearchable={true}
                styles={customSelectStyles}
                placeholder="Select Department"
                className="input-box h-10 w-52 rounded-md border-gray-muted bg-white focus:border-gray-muted"
              />

              <Select
                options={locationOptions}
                isSearchable={true}
                styles={customSelectStyles}
                placeholder="Select Location"
                className="input-box h-10 w-52 rounded-md border-gray-muted bg-white focus:border-gray-muted"
              />
            </div>

            <div className="flex items-center gap-4">
              <Select
                options={workAreaOptions}
                isSearchable={true}
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
          </div>

          <div className="overflow-x-min mt-4 min-h-screen w-full overflow-x-auto bg-gray-100">
            <div className="mt-4 w-full overflow-x-auto bg-white shadow-md">
              <table className="overflow-x-min min-h-screen w-full border-collapse overflow-x-auto rounded-md">
                <thead className="border bg-gray-soft">
                  <tr className="border border-gray-300 bg-[#00000036] text-sm text-gray-600">
                    <th className="p-5 text-left">Employee Name</th>
                    {selectedOption === "weekly"
                      ? weekDays.map((dayObj, index) => (
                          <th
                            key={index}
                            className="sticky top-0 border border-gray-300 bg-[#ebebf0] text-sm font-bold capitalize text-gray-darkpale"
                          >
                            {dayObj.day}
                            <p className="font-medium">{dayObj.date}</p>
                          </th>
                        ))
                      : monthDays.map((dayObj, index) => (
                          <th
                            key={index}
                            className="sticky top-0 border border-gray-300 bg-[#ebebf0] text-sm font-bold capitalize text-gray-darkpale"
                          >
                            {dayObj.day}
                            <p className="font-medium">{dayObj.date}</p>
                          </th>
                        ))}
                  </tr>
                </thead>

                <tbody className="border">
                  {employees
                    .filter((emp) =>
                      emp.name.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((emp, rowIndex) => (
                      <tr key={rowIndex} className="border">
                        <td className="flex items-center space-x-3 p-3">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                            {emp.name.charAt(0)}
                          </span>
                          <span className="text-xs font-bold text-gray-600">
                            {emp.name}
                          </span>
                        </td>
                        {days.map((_, colIndex) => (
                          <td
                            key={colIndex}
                            className="relative border p-2 text-center"
                          >
                            {emp.shifts.length > 0 ? (
                              <>
                                <div
                                  className={`rounded-md py-2 text-white min-w-44 ${
                                    emp.shiftType === "Morning Shift"
                                      ? "bg-[#439393]"
                                      : emp.shiftType === "Evening Shift"
                                        ? "bg-[#e5881f]"
                                        : emp.shiftType === "Night Shift"
                                          ? "bg-[#b670d7]"
                                          : emp.shiftType === "Afternoon Shift"
                                            ? "bg-yellow-500"
                                            : "bg-gray-400"
                                  }`}
                                >
                                  <div>
                                    <p className="text-xs">{emp.shiftType}</p>
                                    <p className="text-sm">
                                      {emp.shiftTime.join(" - ")}
                                    </p>
                                  </div>
                                </div>
                                {emp.shiftType2 && (
                                  <div
                                    className={`mt-3 rounded-md py-2 text-white min-w-44 ${
                                      emp.shiftType2 === "Morning Shift"
                                        ? "bg-[#439393]"
                                        : emp.shiftType2 === "Evening Shift"
                                          ? "bg-[#e5881f]"
                                          : emp.shiftType2 === "Night Shift"
                                            ? "bg-[#af70d7]"
                                            : emp.shiftType2 ===
                                                "Afternoon Shift"
                                              ? "bg-yellow-500"
                                              : "bg-gray-400"
                                    }`}
                                  >
                                    <div>
                                      <p className="text-xs">
                                        {emp.shiftType2}
                                      </p>
                                      <p className="text-sm">
                                        {emp.shiftTime.join(" - ")}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                <button
                                  onClick={() => handleOpen(rowIndex, colIndex)}
                                  className="cursor-pointer text-2xl font-bold text-blue-500"
                                >
                                  +
                                </button>
                                {openPopup?.row === rowIndex &&
                                  openPopup?.col === colIndex && (
                                    <div className="absolute left-1/2 top-full z-50 -mt-28 w-64 -translate-x-1/2 rounded-lg border bg-white p-2 shadow-md">
                                      {/* Close Button */}
                                      <div className="flex items-center justify-between border-b pb-2">
                                        <span className="text-sm font-semibold">
                                          Select Shift
                                        </span>
                                        <button
                                          className="text-lg font-bold text-gray-500 hover:text-gray-700"
                                          onClick={() => setOpenPopup(null)} // Close popup when clicked
                                        >
                                          &times;
                                        </button>
                                      </div>

                                      {/* Search Input */}
                                      <input
                                        type="text"
                                        placeholder="Search shift name"
                                        className="mt-2 w-full rounded-md border p-2 outline-none"
                                      />

                                      {/* Shift List */}
                                      <div className="mt-2">
                                        {filteredShifts.map((shift, index) => (
                                          <div
                                            key={index}
                                            className="flex justify-between border-b p-2 text-sm last:border-none"
                                          >
                                            <span>{shift.name}</span>
                                            <span className="text-gray-500">
                                              {shift.time}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                              </>
                            ) : colIndex > 4 ? (
                              <div className="text-xs text-gray-500">
                                DAY OFF
                              </div>
                            ) : (
                              <div>
                                {/* Button to Open Popup */}
                                <button
                                  className="text-2xl font-bold text-blue-500"
                                  onClick={() => handleOpen(rowIndex, colIndex)}
                                >
                                  +
                                </button>

                                {/* Popup Box (only opens for clicked cell) */}
                                {openPopup?.row === rowIndex &&
                                  openPopup?.col === colIndex && (
                                    <div className="absolute left-1/2 top-full z-50 -mt-28 w-64 -translate-x-1/2 rounded-lg border bg-white p-2 shadow-md">
                                      {/* Close Button */}
                                      <div className="flex items-center justify-between border-b pb-2">
                                        <span className="text-sm font-semibold">
                                          Select Shift
                                        </span>
                                        <button
                                          className="text-lg font-bold text-gray-500 hover:text-gray-700"
                                          onClick={() => setOpenPopup(null)} // Close popup when clicked
                                        >
                                          &times;
                                        </button>
                                      </div>

                                      {/* Search Input */}
                                      <input
                                        type="text"
                                        placeholder="Search shift name"
                                        className="mt-2 w-full rounded-md border p-2 outline-none"
                                      />

                                      {/* Shift List */}
                                      <div className="mt-2">
                                        {filteredShifts.map((shift, index) => (
                                          <div
                                            key={index}
                                            className="flex justify-between border-b p-2 text-sm last:border-none"
                                          >
                                            <span>{shift.name}</span>
                                            <span className="text-gray-500">
                                              {shift.time}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RosterCalendar;
