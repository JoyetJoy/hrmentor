import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import { Plus } from "lucide-react";
import { Controller,useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


const events = [
    {
      date: "2024-10-01",
      clockIn: "09:00 AM",
      clockOut: "05:30 PM",
      totalTime: "08:30:00",
      status: "P",
    },
    {
      date: "2024-10-02",
      clockIn: "09:00 AM",
      clockOut: "05:30 PM",
      totalTime: "08:30:00",
      status: "P",
    },
    {
      date: "2024-10-03",
      clockIn: "09:00 AM",
      clockOut: "05:30 PM",
      totalTime: "08:30:00",
      status: "L",
    },
    {
      date: "2024-10-04",
      clockIn: "09:15 AM",
      clockOut: "05:45 PM",
      totalTime: "08:30:00",
      status: "P",
    },
    {
      date: "2024-10-05",
      clockIn: "08:45 AM",
      clockOut: "05:15 PM",
      totalTime: "08:30:00",
      status: "P",
    },
    {
      date: "2024-10-06",
      clockIn: "09:00 AM",
      clockOut: "05:30 PM",
      totalTime: "08:30:00",
      status: "L",
    },
    {
      date: "2024-10-07",
      clockIn: "09:10 AM",
      clockOut: "05:40 PM",
      totalTime: "08:30:00",
      status: "P",
    },
    {
      date: "2024-10-08",
      clockIn: "08:50 AM",
      clockOut: "05:20 PM",
      totalTime: "08:30:00",
      status: "P",
    },
    {
      date: "2024-10-09",
      clockIn: "09:05 AM",
      clockOut: "05:35 PM",
      totalTime: "08:30:00",
      status: "L",
    },
    {
      date: "2024-10-10",
      clockIn: "09:00 AM",
      clockOut: "05:30 PM",
      totalTime: "08:30:00",
      status: "P",
    },
    {
      date: "2024-10-11",
      clockIn: "09:00 AM",
      clockOut: "05:30 PM",
      totalTime: "08:30:00",
      status: "P",
    },
    {
      date: "2024-10-12",
      clockIn: "09:20 AM",
      clockOut: "05:50 PM",
      totalTime: "08:30:00",
      status: "P",
    },
    {
      date: "2024-10-13",
      clockIn: "09:10 AM",
      clockOut: "05:40 PM",
      totalTime: "08:30:00",
      status: "P",
    },
    {
      date: "2024-10-14",
      clockIn: "09:00 AM",
      clockOut: "05:30 PM",
      totalTime: "08:30:00",
      status: "L",
    },
  ];
 
  const departmentOptions = [
    { value: 'emergency', label: 'Emergency Department' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'radiology', label: 'Radiology' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'oncology', label: 'Oncology' },
  ];
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: dayjs().month(i).format("MMMM"),
  }));

  const employee=[
    { value: 'emergency', label: 'Emergency Department' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'radiology', label: 'Radiology' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'oncology', label: 'Oncology' },
  ];
  const years = Array.from({ length: 11 }, (_, i) => ({
    value: 2020 + i,
    label: (2020 + i).toString(),
  }));
  
  const RosterCalendar = () => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        setError,
        reset,
        watch,
        formState: { errors },
      } = useForm({
        mode: "on",
        reValidateMode: "onChange",
        resolver: yupResolver(),
      });
    const [date, setDate] = useState(new Date());
  
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
  
    const findEvent = (date) => {
      return events.find((event) => dayjs(event.date).isSame(date, "day"));
    };
  
    return (
      <div className="flex flex-col py-4">
      
        <div className="flex w-full items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <Select
              options={years}
              isSearchable={true}
              onChange={handleYearChange}
              styles={customSelectStyles}
              placeholder={dayjs(date).format("YYYY")}
              className="input-box h-10 w-52 rounded-md p-0 border-[#C2C1C1] focus:border-[#C2C1C1]"
            />
            <Select
              options={months}
              isSearchable={true}
              onChange={handleMonthChange}
              styles={customSelectStyles}
              placeholder={dayjs(date).format("MMMM")}
              className="input-box h-10 w-52 rounded-md p-0 border-[#C2C1C1] focus:border-[#C2C1C1]"
            />
          </div>
          <div className="flex gap-2">
          <Select
              options={employee}
              isSearchable={true}
              styles={customSelectStyles}
              placeholder={'All employee'}
              className="input-box h-10 w-52 rounded-md p-0 border-[#C2C1C1] focus:border-[#C2C1C1] caret-white"
            />
          <button className="flex w-fit items-center justify-center gap-2 rounded-md bg-[#2B2B2B] px-5 py-2.5 text-sm font-medium text-white focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white">
          Claimed Request
          </button>
          <button className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-[#030E5C]/70 data-[focus]:outline-1 data-[focus]:outline-white">
            <Plus className="size-4" />Add Roster
          </button>
          </div>
        </div>
        <div className="mb-10 mt-7 w-full max-w-7xl">
          <Calendar
            onChange={handleDateChange}
            value={date}
            showNavigation={false}
            className="w-full font-monorope"
            formatShortWeekday={(locale, date) => dayjs(date).format("dddd")}
            tileContent={({ date, view }) => {
              if (view === "month") {
                const event = findEvent(date);
                return event ? (
                  <div className="flex w-full flex-col gap-2">
                    <div className="relative flex justify-between p-1">
                      {event.status === "L" ? (
                        <img
                          className="h-5 object-contain"
                          src="/assets/icons/tort.svg"
                          alt="late"
                        />
                      ) : null}
                      <div
                        className={`absolute -top-4 right-1 flex h-7 w-7 items-center justify-center rounded-full font-extrabold ${event.status === "P" ? "bg-[#00B448] text-white" : "hidden"}`}
                      >
                        {event.status}
                      </div>
                    </div>
                    <div className="c-af mt-2 flex h-7 w-full items-center justify-between bg-[#2832770D] px-3 text-[0.7rem] font-medium text-[#2C2C2C]">
                      <span className="font-bold">Clock In</span>{" "}
                      <span>{event.clockIn}</span>
                    </div>
                    <div className="c-af flex h-7 w-full items-center justify-between bg-[#2832770D] px-3 text-[0.7rem] font-medium text-[#2C2C2C]">
                      <span className="font-bold">Clock Out</span>{" "}
                      <span>{event.clockIn}</span>
                    </div>
                    <div className="flex h-7 w-full items-center justify-between bg-[#2832770D] px-3 text-[0.7rem] font-medium text-[#2C2C2C]">
                      <span className="font-bold">Time In</span>{" "}
                      <span
                        className={`font-semibold ${event.status === "L" ? "text-red-500" : ""}`}
                      >
                        {event.totalTime}
                      </span>
                    </div>
                  </div>
                ) : null;
              }
            }}
          />
        </div>
      </div>
    );
  };
  
  export default RosterCalendar;