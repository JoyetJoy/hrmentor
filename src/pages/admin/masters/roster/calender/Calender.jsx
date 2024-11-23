import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Main component
import dayGridPlugin from "@fullcalendar/daygrid"; // Month view
import timeGridPlugin from "@fullcalendar/timegrid"; // Week/day view
import interactionPlugin from "@fullcalendar/interaction"; // Drag, resize, and click interactions
import dayjs from "dayjs";
import Select from "react-select";
import { Plus } from "lucide-react";
import { customSelectStyles } from "@/utils/customStyles";

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
      count: 20,
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
  const [calendarEvents, setCalendarEvents] = useState(events);

  const handleEventClick = (info) => {
    alert(`Event: ${info.event.title}`);
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
    console.log("Change month to:", selectedOption.value);
  };

  const handleYearChange = (selectedOption) => {
    console.log("Change year to:", selectedOption.value);
  };

  // Event click handler for the design
  const handleClick = (event, index) => {
    console.log(`Event clicked: ${event.title}, index: ${index}`);
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
          height="auto"
        />
      </div>
      <div className="mt-5">
        {calendarEvents.map((event, index) => (
          <div
            key={event.id}
            onClick={() => handleClick(event, index)}
            className={`mt-2 flex flex-col h-14 w-full px-3 text-[0.7rem] font-medium border-l-4 rounded-sm ${
              event.extendedProps.totalCount === event.extendedProps.count
                ? "bg-[#2832770D] border-l-[#e95d39] text-[#2C2C2C]"
                : "bg-[#e95d39] border-l-[#e95d39] text-white"
            }`}
          >
            <span
              className={`flex float-start font-semibold text-[0.8rem] ${
                event.extendedProps.totalCount === event.extendedProps.count
                  ? "text-[#2C2C2C]"
                  : "text-white"
              }`}
            >
              {event.extendedProps.shift}
            </span>
            <span
              className={`flex float-start text-[#2C2C2C] ${
                event.extendedProps.totalCount === event.extendedProps.count
                  ? "text-[#2C2C2C]"
                  : "text-white"
              }`}
            >
              {event.extendedProps.time}
            </span>
            <span className="flex float-start font-semibold">
              Employee: {event.extendedProps.count}/{event.extendedProps.totalCount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RosterCalendar;
