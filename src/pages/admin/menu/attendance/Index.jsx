import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import MenuHeader from "@/components/common/MenuHeader";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import { TEAM_ATTENDANCE, newRequest } from "@/api/master";
import Atendance from "../../../../components/attendance/Index";
import DatePicker from "react-datepicker";

export default function Attendance() {
  const [date, setDate] = useState(new Date());
  const [attendance, setAttendance] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(dayjs(startDate).add(6, "day").toDate());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedOption, setSelectedOption] = useState("weekly");

  // Dummy Data (With Status)
  const dummyEmployees = [
    {
      name: "John Doe",
      days_status: [
        { date: "2025-02-01", status: "Present" },
        { date: "2025-02-02", status: "Absent" },
        { date: "2025-02-03", status: "Annual Leave" },
        { date: "2025-02-04", status: "Company Leave" },
        { date: "2025-02-05", status: "Leave" },
        { date: "2025-02-06", status: "Leave" },
        { date: "2025-02-07", status: "Holiday" },
      ],
    },
    {
      name: "Jane Smith",
      days_status: [
        { date: "2025-02-01", status: "Present" },
        { date: "2025-02-02", status: "Present" },
        { date: "2025-02-03", status: "Leave" },
      ],
    },
  ];

  // Generate months and years
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: dayjs().month(i).format("MMMM"),
  }));

  const years = Array.from({ length: 11 }, (_, i) => ({
    value: 2020 + i,
    label: (2020 + i).toString(),
  }));

  // Handle month and year selection
  const handleMonthChange = (selectedOption) => {
    setDate(dayjs(date).month(selectedOption.value).toDate());
  };

  const handleYearChange = (selectedOption) => {
    setDate(dayjs(date).year(selectedOption.value).toDate());
  };

  // Handle range change (weekly/monthly)
  const handleRangeChange = (option) => {
    setSelectedOption(option);
    if (option === "weekly") {
      setEndDate(dayjs(startDate).add(6, "day").toDate());
    } else if (option === "monthly") {
      setEndDate(dayjs(startDate).endOf("month").toDate());
    }
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

  // Generate all days in the selected month
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

  // Generate all days in the selected week
  const getWeekDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const day = dayjs(startDate).add(i, "day");
      return {
        day: day.format("ddd"),
        date: day.format("MMM DD"),
        fullDate: day.format("YYYY-MM-DD"),
      };
    });
  };

  const monthDays = getMonthDays();
  const weekDays = getWeekDays();
  const events = {
    employees: dummyEmployees,
  };

  // Function to return Present, Absent, or Leave
  const formatStatus = (status) => {
    if (!status) return "Absent"; // Default to Absent if no data is found
    return status;
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
        <div className="flex w-full flex-col items-center justify-between px-4 py-2 gap-4">
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
          <div className="flex w-full items-center justify-between gap-8">
            <div className="flex gap-2 text-sm">
              <img
                className="h-5 object-contain"
                src="/assets/icons/tort.svg"
                alt="late"
              />
              <p className="text-sm">Late</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#77c477d5] pl-[0.10rem] pt-[0.15rem] text-xs font-extrabold text-black">
                P
              </p>
              <p className="text-sm">Present</p>
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
        <div className="overflow-x-min w-full overflow-x-auto rounded-md border border-gray-300 bg-white">
          <div className="table mx-auto w-full">
            <table style={{ borderSpacing: "0", width: "100%" }}>
              <thead className="bg-gray-soft">
                <tr>
                  <th className="sticky z-10 left-0 w-full border border-gray-300 bg-[#ebebf0] text-sm font-bold capitalize text-gray-darkpale">
                    Employee Name
                  </th>
                  {selectedOption === "weekly"
                    ? weekDays.map((dayObj, index) => (
                        <th
                          key={index}
                          className="sticky top-0 border border-gray-300 text-sm font-bold bg-[#ebebf0] capitalize text-gray-darkpale"
                        >
                          {dayObj.day}
                          <p className="font-medium">{dayObj.date}</p>
                        </th>
                      ))
                    : monthDays.map((dayObj, index) => (
                        <th
                          key={index}
                          className="sticky top-0 border border-gray-300 text-sm font-bold bg-[#ebebf0] capitalize text-gray-darkpale"
                        >
                          {dayObj.day}
                          <p className="font-medium">{dayObj.date}</p>
                        </th>
                      ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "John Doe",
                    days_status: [
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Company Leave",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                    ],
                  },
                  {
                    name: "John Doe",
                    days_status: [
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Company Leave",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                    ],
                  },
                  {
                    name: "John Doe",
                    days_status: [
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Company Leave",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                    ],
                  },
                  {
                    name: "John Doe",
                    days_status: [
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Company Leave",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                    ],
                  },
                  {
                    name: "John Doe",
                    days_status: [
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Company Leave",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                    ],
                  },
                  {
                    name: "John Doe",
                    days_status: [
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Company Leave",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                    ],
                  },
                  {
                    name: "John Doe",
                    days_status: [
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Company Leave",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                    ],
                  },
                  {
                    name: "John Doe",
                    days_status: [
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Company Leave",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                    ],
                  },
                  {
                    name: "John Doe",
                    days_status: [
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Company Leave",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                    ],
                  },
                  {
                    name: "Jane Smith",
                    days_status: [
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Company Leave",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                    ],
                  },
                  {
                    name: "David Brown",
                    days_status: [
                      "Present",
                      "Present",
                      "Present",
                      "Day Off",
                      "Company Leave",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Absent",
                    ],
                  },
                  {
                    name: "Emma Wilson",
                    days_status: [
                      "Present",
                      "Absent",
                      "Present",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                    ],
                  },
                  {
                    name: "Michael Johnson",
                    days_status: [
                      "Present",
                      "Present",
                      "Annual Leave",
                      "Present",
                      "Present",
                      "Day Off",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                    ],
                  },
                  {
                    name: "Sophia Lee",
                    days_status: [
                      "Present",
                      "Holiday",
                      "Present",
                      "Present",
                      "Company Leave",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                      "Absent",
                      "Holiday",
                      "Present",
                      "Present",
                      "Day Off",
                      "Absent",
                      "Present",
                      "Present",
                      "Day Off",
                      "Present",
                      "Present",
                    ],
                  },
                ].map((employee, empIndex) => (
                  <tr key={empIndex} className="border-b-2 text-left">
                    <td className="sticky left-0 z-10 border-r-2 bg-gray-300 text-[0.8rem] font-medium capitalize text-gray-darkpale">
                      {employee.name}
                    </td>
                    {employee.days_status.map((status, index) => (
                      <td
                        key={index}
                        className={`text-center text-[0.8rem] font-semibold ${
                          status === "Present"
                            ? "bg-[#77c477d5] text-black"
                            : status === "Holiday"
                              ? "bg-[#e68ecf] text-black"
                              : status === "Company Leave"
                                ? "bg-[#FDE3AA] text-black"
                                : status === "Annual Leave"
                                  ? "bg-[#AEB6E7] text-black"
                                  : status === "Absent"
                                    ? "bg-[#e47f7f] text-black"
                                    : "bg-[#c5c5cb] text-black"
                        } border-r-2`}
                      >
                        {status === "Present" ? (
                          <div
                            onClick={() => setAttendance(true)}
                            className="flex items-center justify-between p-4 text-sm font-extrabold"
                          >
                            <span>P</span>
                            <img
                              className="ml-2 w-5 object-contain"
                              src="/assets/icons/tort.svg"
                              alt="late"
                            />
                          </div>
                        ) : status === "Absent" ? (
                          <span className="text-sm font-extrabold">A</span>
                        ) : status === "Annual Leave" ? (
                          <span className="font-extrabold">AL</span>
                        ) : status === "Company Leave" ? (
                          <span className="font-extrabold">CL</span>
                        ) : status === "Holiday" ? (
                          <span className="text-sm font-extrabold">H</span>
                        ) : (
                          <span className="font-extrabold">DO</span>
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
    </>
  );
}
