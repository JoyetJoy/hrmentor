import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Main component
import dayGridPlugin from "@fullcalendar/daygrid"; // Month view
import timeGridPlugin from "@fullcalendar/timegrid"; // Week/day view
import interactionPlugin from "@fullcalendar/interaction"; // Drag, resize, and click interactions
import dayjs from "dayjs";
import Select from "react-select";
import { Plus } from "lucide-react";
import { customSelectStyles } from "@/utils/customStyles";
import { useNavigate } from "react-router-dom";

const events = [
  {
    id: "1",
    title: "Morning Shift",
    start: "2024-10-01T09:00:00",
    end: "2024-10-01T11:00:00",
    extendedProps: {
      count: 20,
      totalCount: 20,
      shift: "Morning Shift",
      time: "09:00 AM - 11:00 AM",
    },
  },
  {
    id: "2",
    title: "Evening Shift",
    start: "2024-10-01T14:00:00",
    end: "2024-10-01T18:00:00",
    extendedProps: {
      count: 20,
      totalCount: 20,
      shift: "Evening Shift",
      time: "02:00 PM - 06:00 PM",
    },
  },
  {
    id: "3",
    title: "Morning Shift",
    start: "2024-10-02T09:00:00",
    end: "2024-10-02T11:00:00",
    extendedProps: {
      count: 15,
      totalCount: 20,
      shift: "Morning Shift",
      time: "09:00 AM - 11:00 AM",
    },
  },
];

const departmentOptions = [
  { value: "emergency", label: "Emergency Department" },
  { value: "cardiology", label: "Cardiology" },
  { value: "radiology", label: "Radiology" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "oncology", label: "Oncology" },
];

const months = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  label: dayjs().month(i).format("MMMM"),
}));

const years = Array.from({ length: 11 }, (_, i) => ({
  value: 2020 + i,
  label: (2020 + i).toString(),
}));

const RosterCalendar = () => {
  const navigate = useNavigate();
  const [calendarEvents, setCalendarEvents] = useState(events);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month()); // Default to current month
  const [selectedYear, setSelectedYear] = useState(dayjs().year()); // Default to current year

  const handleEventClick = (info) => {
    navigate(`/admin/roster/calendarview?id=${info.event.id}`);
  };
  
  const handleDateClick = (info) => {
    const newEvent = {
      id: String(calendarEvents.length + 1),
      title: "New Event",
      start: info.dateStr,
      end: dayjs(info.dateStr).add(2, "hour").toISOString(),
      extendedProps: { count: 10, totalCount: 20, shift: "New Shift", time: "Time Not Set" },
    };
    setCalendarEvents([...calendarEvents, newEvent]);
    alert(`Date clicked: ${info.dateStr}`);
  };

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption.value);
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };

  // Calculate the initial date for the calendar based on selected month and year
  const initialDate = dayjs(`${selectedYear}-${selectedMonth + 1}-01`).toDate();

  // Custom event render to show shift details inside the day
  const eventContent = (eventInfo) => {
    const { event } = eventInfo;
    const shiftDetails = event.extendedProps;

    return (
      <div
        className={`mt-2 flex flex-col h-14 w-full px-3 text-[0.7rem] font-medium border-l-4 rounded-sm ${
          shiftDetails.totalCount === shiftDetails.count
            ? "bg-[#2832770D] border-l-[#e95d39] text-[#2C2C2C]"
            : "bg-[#e95d39] border-l-[#e95d39] text-white"
        }`}
      >
        <span
          className={`flex float-start font-semibold text-[0.8rem] ${
            shiftDetails.totalCount === shiftDetails.count
              ? "text-[#2C2C2C]"
              : "text-white"
          }`}
        >
          {shiftDetails.shift}
        </span>
        <span
          className={`flex float-start text-[#2C2C2C] ${
            shiftDetails.totalCount === shiftDetails.count
              ? "text-[#2C2C2C]"
              : "text-white"
          }`}
        >
          {shiftDetails.time}
        </span>
        <span className="flex float-start font-semibold">
          Employee: {shiftDetails.count}/{shiftDetails.totalCount}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <Select
            options={years}
            isSearchable={true}
            onChange={handleYearChange}
            styles={customSelectStyles}
            placeholder={dayjs().format("YYYY")}
            className="input-box h-10 w-52 rounded-md p-0 border-[#C2C1C1] focus:border-[#C2C1C1]"
          />
          <Select
            options={months}
            isSearchable={true}
            onChange={handleMonthChange}
            styles={customSelectStyles}
            placeholder={dayjs().format("MMMM")}
            className="input-box h-10 w-52 rounded-md p-0 border-[#C2C1C1] focus:border-[#C2C1C1]"
          />
        </div>
        <div className="flex gap-2">
          <Select
            options={departmentOptions}
            isSearchable={true}
            styles={customSelectStyles}
            placeholder={"All employee"}
            className="input-box h-10 w-52 rounded-md p-0 border-[#C2C1C1] focus:border-[#C2C1C1]"
          />
          <button className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none hover:bg-[#030E5C]/70 focus:ring-2 focus:ring-white">
            <Plus className="size-4" />
            Add Roster
          </button>
        </div>
      </div>
      <div className="ml-4 mt-7 w-full max-w-6xl">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          selectable={true}
          editable={true}
          showNavigation={false}
          eventContent={eventContent} // Apply custom content
          height="auto"
          style={{ backgroundColor: "white" }}
          // headerToolbar={false}
          initialDate={initialDate} // Set initial date based on selected month and year
        />
      </div>
    </div>
  );
};

export default RosterCalendar;
