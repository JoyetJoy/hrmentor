import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import { Plus, ArrowRight, AlignJustify, ChevronDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RosterHeader from "@/components/common/RosterHeader";
import { useNavigate } from "react-router-dom";
import NewRoster from "@/components/popups/master/roster/NewRoster";
import { useQuery } from "@tanstack/react-query";
import { newRequest, ROASTER_LIST_GET, ROASTER_LISTING } from "@/api/master";
import { ACTIVE_EMPLOYEE } from "@/api";
import { dividerClasses } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  EMPLOYEE_DEPARTMENT_LIST,
  EMPLOYEE_WORK_AREA,
  EMPLOYEE_WORK_LOCATION_LIST,
} from "@/api/master";
import { formatDate } from "@/utils/date";
import ChangeShift from "@/components/popups/master/roster/ChangeShift";

const RosterCalendar = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [activeDepartment, setActiveDepartment] = useState([]);
  const [activeWorkArea, setActiveWorkArea] = useState([]);
  const [activeLocation, setActiveLocation] = useState([]);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [selectedOption, setSelectedOption] = useState("weekly");
  const [days, setDays] = useState([]);
  const [startDate, setStartDate] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(null); // Track which popup is open
  const [endDate, setEndDate] = useState();
  const [shiftPopup, setShiftPopup] = useState(false);
  const [hoveredShift, setHoveredShift] = useState({
    id: "",
    date: "",
    type: "",
    empid: "",
  });
  const [shiftDetails, setShiftDetails] = useState({
    empId: "",
    date: "",
    shiftId: "",
    type: "",
  });
  const [shiftIds, setShiftIds] = useState([]);

  const useFetchData = (key, url) => {
    return useQuery({
      queryKey: [key],
      queryFn: () => newRequest.get(url).then((res) => res.data),
    });
  };

  // console.log(activeDepartment);
  // console.log(endDate);

  const { data, refetch, isLoading } = useQuery({
    queryKey: [
      "events",
      startDate,
      endDate,
      activeDepartment,
      activeLocation,
      activeWorkArea,
    ],
    queryFn: () =>
      newRequest
        .get(ROASTER_LISTING, {
          params: {
            start_date: startDate,
            end_date: endDate,
            role: "hrmanager",
            department_id: activeDepartment,
            location_id: activeLocation,
            work_area_id: activeWorkArea,
          },
        })
        .then((res) => res.data),
    enabled: Boolean(startDate) && Boolean(endDate),
  });

  useEffect(() => {
    refetch();
  }, [
    refetch,
    startDate,
    endDate,
    activeDepartment,
    activeLocation,
    activeWorkArea,
  ]);

  const addRoster = () => {
    setPopupOpen(true);
  };

  const handleOpen = (rowIndex, colIndex) => {
    setOpenPopup((prev) =>
      prev?.row === rowIndex && prev?.col === colIndex
        ? null
        : { row: rowIndex, col: colIndex },
    );
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

  const shifts = [
    { name: "Morning Shift", time: "09:00 - 17:30" },
    { name: "Saturday Shift", time: "09:00 - 16:30" },
  ];

  const [search, setSearch] = useState("");

  const filteredShifts = shifts.filter((shift) =>
    shift.name.toLowerCase().includes(search.toLowerCase()),
  );

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

  // console.log("work_area data:", work_area);
  // console.log("department data:", department);
  // console.log("location data:", location);

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

  const monthDays = getMonthDays();
  const weekDays = getWeekDays();

  const findEvents = (date, data, day) => {
    const workingDays = data?.shift?.weeks || [];
    const allDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const selectedDay = dayjs(date).format("ddd").toUpperCase();

    const formattedDate = date;
    const holidayEvents = data?.filter((event) =>
      event?.holidays?.includes(formattedDate),
    );
    const shiftEvents = data?.filter((event) =>
      event?.date_range?.includes(formattedDate),
    );

    const weekOffDays = allDays.filter((day) => !workingDays.includes(day));

    const isDayOff = weekOffDays.includes(selectedDay);

    const requestedSlots = data?.requested_details?.filter((slot) =>
      dayjs(slot.date).isSame(dayjs(date), "day"),
    );

    return { holidayEvents, shiftEvents, isDayOff, requestedSlots };
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
    }
  }, [selectedOption, startDate, endDate]);

  const handleYearChange = (date) => {
    const newYear = dayjs(date).year();
    setSelectedYear(newYear);

    // Preserve the selected month while changing the year
    setStartDate(dayjs(startDate).year(newYear).format("YYYY-MM-DD"));
    setEndDate(dayjs(endDate).year(newYear).format("YYYY-MM-DD"));

    setIsOpen(false);
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

    console.log("Start Date:", dateRange.start);
    console.log("End Date:", dateRange.end);
  };

  const changeShift = async (
    empId,
    shiftId,
    date,
    type,
    departmentId,
    rosterid,
    shifts,
  ) => {
    // if (type === "add") {
    //   shifts?.map((shift) => {
    //     setShiftIds((prev) => {
    //       return [...prev, { shift_id: shift?.shift_id }];
    //     });
    //   });
    // }

    setShiftDetails({
      empId,
      date,
      shiftId,
      rosterid,
      type,
      departmentId,
    });
    setShiftPopup(true);
  };
  console.log(shiftDetails, "shiftDetails");

  return (
    <>
      <ChangeShift
        popupOpen={shiftPopup}
        setPopupOpen={setShiftPopup}
        datas={shiftDetails}
        shiftIds={shiftIds} 
        refetch={refetch}
     />     
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
                      ? "bg-hrmprimaryorange text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleFilter(option)}
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
                  type="text "
                  value={`${dayjs(startDate).format("DD/MM/YYYY")} - ${dayjs(endDate).format("DD/MM/YYYY")}`}
                  readOnly
                  className="h-8 w-44 rounded-md border border-gray-300 bg-white px-3 py-1 text-center text-xs"
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
          <div className="flex w-full items-center justify-between py-2">
            <div className="flex items-center gap-4">
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

              <Select
                options={locationOptions}
                isSearchable={true}
                styles={customSelectStyles}
                onChange={(selectedOption) =>
                  setActiveLocation([selectedOption.value])
                }
                placeholder="Select Location"
                className="input-box z-20 h-10 w-52 rounded-md border-gray-muted bg-white focus:border-gray-muted"
              />
            </div>

            <div className="flex items-center gap-4">
              <Select
                options={workAreaOptions}
                isSearchable={true}
                styles={customSelectStyles}
                onChange={(selectedOption) =>
                  setActiveWorkArea([selectedOption.value])
                }
                placeholder="Select Work Area"
                className="input-box z-20 h-10 w-52 rounded-md border-gray-muted bg-white focus:border-gray-muted"
              />
            </div>
          </div>

          <div className="overflow-x-min mt-4 min-h-screen w-full overflow-x-auto bg-gray-100">
            <div className="overflow-x-min overflow-y-min mt-4 h-screen w-full overflow-x-auto overflow-y-auto bg-white shadow-md">
              {isLoading ? (
                <div className="flex min-h-96 w-full items-center justify-center bg-white">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
                </div>
              ) : (
                <table className="w-full border-collapse overflow-x-auto rounded-md">
                  <thead className="w-full border bg-gray-soft">
                    <tr className="border border-gray-300 bg-[#00000036] text-sm text-gray-600">
                      <th className="sticky left-0 top-0 z-20 min-w-[12rem] bg-[#ebebf0] p-5 text-left">
                        Employee Name
                      </th>
                      {days.map((dayObj, index) => (
                        <th
                          key={index}
                          className="sticky top-0 z-10 min-w-[8rem] border border-gray-300 bg-[#ebebf0] text-sm font-bold capitalize text-gray-darkpale"
                        >
                          {dayObj.day}
                          <p className="font-medium">{dayObj.date}</p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="border">
                    {data?.results?.map((emp, rowIndex) => (
                      <tr key={rowIndex} className="h-[12.5rem] w-full border">
                        <td className="sticky left-0 z-10 flex h-[12.5rem] min-w-[14rem] items-center space-x-3 bg-white p-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                            {emp?.employee?.name.charAt(0)}
                          </span>
                          <span className="text-sm font-bold text-gray-800">
                            {emp?.employee?.name}
                          </span>
                        </td>
                        {days.map((day, index) => {
                          // Find attendance status for the given date
                          const {
                            holidayEvents,
                            shiftEvents,
                            isDayOff,
                            requestedSlots,
                          } = findEvents(day.fullDate, emp?.rosters, day.day);
                          console.log(shiftEvents, "suhft");
                          console.log(holidayEvents, "jholiuday");

                          return (
                            <td
                              key={index}
                              className="overflow-y-min relative w-full overflow-y-auto border p-2 text-center"
                            >
                              {shiftEvents?.length > 0 ? 
                              (
                                <div className="overflow-y-min flex h-[12rem] w-full min-w-[11.4rem] flex-col gap-3 overflow-y-auto">
                                  {shiftEvents?.map((shift, index) => (
                                    <div
                                      key={index}
                                      onClick={() =>
                                        changeShift(
                                          emp?.employee?.id,
                                          shift?.shift_id,
                                          day.fullDate,
                                          "change",
                                          emp?.employee?.department_id,
                                          shift?.id,
                                        )
                                      }
                                      style={{
                                        background:
                                          shift?.shift_color || "#bfdbfe",
                                      }}
                                      className={`h-[3.5rem] min-w-44 cursor-pointer rounded-md py-3 text-black`}
                                    >
                                      <p className="relative text-xs font-semibold">
                                        {shift.shift_name}
                                        <span
                                          className="absolute -top-2 right-1"
                                          onMouseEnter={() =>
                                            setHoveredShift({
                                              id: shift.shift_id,
                                              date: day.fullDate,
                                              type: "change",
                                              empid: emp?.employee?.id,
                                            })
                                          }
                                          onMouseLeave={() =>
                                            setHoveredShift({
                                              id: "",
                                              date: "",
                                              type: "",
                                              empid: "",
                                            })
                                          }
                                        >
                                          <ChevronDown size={20} />
                                          {/* Tooltip */}
                                          {hoveredShift?.id ===
                                            shift.shift_id &&
                                            hoveredShift?.date ===
                                              day.fullDate &&
                                            hoveredShift?.type === "change" &&
                                            hoveredShift?.empid ===
                                              emp?.employee?.id && (
                                              <span className="absolute right-0 top-6 w-[7rem] rounded-md bg-gray-800 px-2 py-2 text-xs text-white shadow-md">
                                                Reassign
                                              </span>
                                            )}
                                        </span>
                                      </p>
                                      <p className="text-sm">
                                        {shift?.shift?.start_time} -{" "}
                                        {shift?.shift?.end_time}
                                      </p>
                                    </div>
                                  ))}
                                  {/* <p className="relative flex w-full items-center justify-center">
                                    <button
                                      onClick={() =>
                                        changeShift(
                                          emp?.id,
                                          "",
                                          day.fullDate,
                                          "add",
                                          "",
                                          "",
                                          shiftEvents,
                                        )
                                      }
                                      onMouseEnter={() =>
                                        setHoveredShift({
                                          id: emp?.employee?.id,
                                          date: day.fullDate,
                                          type: "add",
                                          empid: "",
                                        })
                                      }
                                      onMouseLeave={() =>
                                        setHoveredShift({
                                          id: "",
                                          date: "",
                                          type: "",
                                          empid: "",
                                        })
                                      }
                                      className="h-10 w-10 cursor-pointer text-2xl font-bold text-blue-500"
                                    >
                                      +
                                    </button>
                                    
                                    {hoveredShift?.id === emp?.employee?.id &&
                                      hoveredShift?.date === day.fullDate &&
                                      hoveredShift?.type === "add" && (
                                        <span className="absolute right-8 top-10 w-[7rem] rounded-md bg-gray-800 px-2 py-2 text-xs text-white shadow-md">
                                          Add Shift
                                        </span>
                                      )}
                                  </p> */}
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
                                          {filteredShifts.map(
                                            (shift, index) => (
                                              <div
                                                key={index}
                                                className="flex justify-between border-b p-2 text-sm last:border-none"
                                              >
                                                <span>{shift.name}</span>
                                                <span className="text-gray-500">
                                                  {shift.time}
                                                </span>
                                              </div>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                    )}
                                </div>
                              ) :
                              (<>
                              
                                
                              {holidayEvents?.map((shift, index) => (
                                    <div
                                      key={index}
                                      className=" h-[3.5rem]  z-10 -mt-24 min-w-44 cursor-pointer rounded-md bg-[#c5c5cb] py-3 text-black"
                                    >
                                      <p className="text-center text-xs font-semibold">Day Off</p>
                                    </div>
                                  ))}
    
                                  <div className="min-w-[11.4rem]">
                                    <button
                                      className="text-2xl font-bold text-blue-500 "
                                      onMouseEnter={() =>
                                        setHoveredShift({
                                          id: emp?.employee?.id,
                                          date: day.fullDate,
                                          type: "add",
                                          empid: "",
                                        })
                                      }
                                      onMouseLeave={() =>
                                        setHoveredShift({
                                          id: emp?.employee?.id,
                                          date: day.fullDate,
                                          type: "",
                                          empid: "",
                                        })
                                      }
                                      onClick={() =>
                                        changeShift(
                                          emp?.employee?.id,
                                          '',
                                          day.fullDate,
                                          "add",
                                          emp?.employee?.department_id,
                                          '',
                                        )}
                                    >
                                      +
                                    </button>
                              
                                    {/* Tooltip */}
                                    {hoveredShift?.id === emp?.employee?.id &&
                                      hoveredShift?.date === day.fullDate &&
                                      hoveredShift?.type === "add" && (
                                        <span className="absolute bottom-10 right-10 w-[7rem] rounded-md bg-gray-800 px-2 py-2 text-xs text-white shadow-md">
                                          Add Shift
                                        </span>
                                      )}
                              
                                    {/* Popup Box (only opens for clicked cell) */}
                                    {openPopup?.row === rowIndex && openPopup?.col === colIndex && (
                                      <div className="absolute left-1/2 top-full z-50 -mt-28 w-64 -translate-x-1/2 rounded-lg border bg-white p-2 shadow-md">
                                        {/* Close Button */}
                                        <div className="flex items-center justify-between border-b pb-2">
                                          <span className="text-sm font-semibold">Select Shift</span>
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
                                              <span className="text-gray-500">{shift.time}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>

                              </>
                                
                              ) 
                              }
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
      </div>
    </>
  );
};

export default RosterCalendar;
