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
      extendedProps: { count: 10, totalCount: 20 },
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
            className="input-box h-10 w-52 rounded-md border-[#C2C1C1] p-0 focus:border-[#C2C1C1]"
          />
          <Select
            options={months}
            isSearchable={true}
            onChange={handleMonthChange}
            styles={customSelectStyles}
            placeholder={dayjs().format("MMMM")}
            className="input-box h-10 w-52 rounded-md border-[#C2C1C1] p-0 focus:border-[#C2C1C1]"
          />
        </div>
        <div className="flex gap-2">
          <Select
            options={departmentOptions}
            isSearchable={true}
            styles={customSelectStyles}
            placeholder={"All employee"}
            className="input-box h-10 w-52 rounded-md border-[#C2C1C1] p-0 focus:border-[#C2C1C1]"
          />
          <button className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white hover:bg-[#030E5C]/70 focus:outline-none focus:ring-2 focus:ring-white">
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
    </div>
  );
};

export default RosterCalendar;
