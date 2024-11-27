import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const events = [
  { date: "2024-11-01", shift: "Morning Shift", time: "06:00-12:00" },
  { date: "2024-11-01", shift: "Evening Shift", time: "06:00-12:00" },
  { date: "2024-11-03", shift: "Morning Shift", time: "06:00-12:00" },
  { date: "2024-11-03", shift: "Evening Shift", time: "06:00-12:00" },
  // Add more events as needed
];

const months = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  label: dayjs().month(i).format("MMMM"),
}));

const years = Array.from({ length: 11 }, (_, i) => ({
  value: 2020 + i,
  label: (2020 + i).toString(),
}));

const EmployeeAccessRosterCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    // Filter events based on selected year and month
    const filtered = events.filter(
      (event) =>
        dayjs(event.date).isSame(date, "month") && dayjs(event.date).isSame(date, "year")
    );
    setFilteredEvents(filtered);
  }, [date]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleMonthChange = (selectedOption) => {
    const updatedDate = dayjs(date).month(selectedOption.value).toDate();
    setDate(updatedDate);
  };

  const handleYearChange = (selectedOption) => {
    const updatedDate = dayjs(date).year(selectedOption.value).toDate();
    setDate(updatedDate);
  };

  const findEvents = (date) => {
    return filteredEvents.filter((event) => dayjs(event.date).isSame(date, "day"));
  };

  return (
    <div className="flex flex-col">
      <MenuHeaderEmployeeAccess pathlink={""} currentpage={"Roster"} />
      <div className="flex items-center justify-between px-4 py-2 w-full">
        <div className="flex items-center gap-4">
          <h5 className="text-md font-bold">My Roster</h5>
          <Select
            options={years}
            isSearchable={true}
            onChange={handleYearChange}
            styles={customSelectStyles}
            placeholder={dayjs(date).format("YYYY")}
            className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
          />
          <Select
            options={months}
            isSearchable={true}
            onChange={handleMonthChange}
            styles={customSelectStyles}
            placeholder={dayjs(date).format("MMMM")}
            className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
          />
        </div>
        <Link
          to="/employee_access/roster/teamroster"
          className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white"
        >
          Team Roster
        </Link>
      </div>

      <div className="mb-10 mt-7 w-full max-w-8xl">
        <Calendar
          onChange={handleDateChange}
          value={date}
          showNavigation={false}
          className="w-full font-monorope"
          formatShortWeekday={(locale, date) => dayjs(date).format("dddd")}
          tileContent={({ date, view }) => {
            if (view === "month") {
              const eventsForDay = findEvents(date);
              if (eventsForDay.length > 0) {
                return (
                  <div className="flex w-full flex-col gap-2">
                    {eventsForDay.map((event, index) => (
                      <div
                      key={index}
                      onClick={()=>toast.success(event.id)}
                      className={`mt-2 flex flex-col h-14 w-full px-3 text-[0.7rem] font-medium border-l-4 rounded-sm bg-[#2832770D] border-l-[#e95d39] text-[#2C2C2C] justify-center `}
                    >
                      <span
                        className={`flex float-start font-semibold text-[0.8rem] text-[#2C2C2C]`}
                      >
                        {event.shift}
                      </span>
                      <span
                        className={`flex float-start text-[#2C2C2C]`}
                      >
                        {event.time}
                      </span>
                    </div>
                    ))}
                  </div>
                );
              } else {
                return <div className="h-16 w-16 bg-transparent"></div>;
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default EmployeeAccessRosterCalendar;