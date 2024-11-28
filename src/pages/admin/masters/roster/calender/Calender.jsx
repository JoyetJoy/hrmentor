import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import { Plus } from "lucide-react";
import { Controller,useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RosterHeader from "@/components/common/RosterHeader";


const events = [
    {
      date: "2024-10-01",
      shift:'Morning Shift',
      count:'20',
      totalCount:'20',
      time:'09:00-11:00'
    },
    {
      date: "2024-10-01",
      shift:'Evening Shift',
      count:'20',
      totalCount:'20',
      time:'14:00-18:00'
    },
    {
      date: "2024-10-02",
      shift:'Morning Shift',
      count:'20',
      totalCount:'20',
      time:'09:00-11:00'
    },
    {
      date: "2024-10-02",
      shift:'Evening Shift',
      count:'20',
      totalCount:'20',
      time:'14:00-18:00'
    },
    {
      date: "2024-10-03",
      shift:'Morning Shift',
      count:'20',
      totalCount:'20',
      time:'09:00-11:00'
    },
    {
      date: "2024-10-03",
      shift:'Evening Shift',
      count:'20',
      totalCount:'20',
      time:'14:00-18:00'
    },
    {
      date: "2024-10-04",
      shift:'Morning Shift',
      count:'20',
      totalCount:'20',
      time:'09:00-11:00'
    },
    {
      date: "2024-10-04",
      shift:'Evening Shift',
      count:'15',
      totalCount:'20',
      time:'14:00-18:00'
    },
    {
      date: "2024-10-05",
      shift:'Morning Shift',
      count:'20',
      totalCount:'20',
      time:'09:00-11:00'
    },
    {
      date: "2024-10-05",
      shift:'Evening Shift',
      count:'20',
      totalCount:'20',
      time:'14:00-18:00'
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
  
    const findEvents = (date) => {
      return events.filter((event) => dayjs(event.date).isSame(date, "day"));
    };
  
    return (
      <>
      <div className="flex flex-row py-4">
        <div>
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
          <button className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-[#030E5C]/70 data-[focus]:outline-1 data-[focus]:outline-white">
            <Plus className="size-4" />Add Roster
          </button>
          </div>
        </div>
        <div className="ml-4 mt-7 w-full max-w-6xl">
          <Calendar
            onChange={handleDateChange}
            value={date}
            showNavigation={false}
            className="w-full font-monorope"
            formatShortWeekday={(locale, date) => dayjs(date).format("dddd")}
            tileContent={({ date, view }) => {
              if (view === "month") {
                const dailyEvents = findEvents(date);
                return dailyEvents.length ? (
                  <div className="flex flex-col gap-2">
                    {dailyEvents.map((event, index) => (
                      <div
                        key={index}
                        className={`mt-2 flex flex-col h-14 w-full px-3 text-[0.7rem] font-medium border-l-4 rounded-sm ${
                          event.totalCount === event.count
                            ? "bg-[#2832770D] border-l-[#e95d39] text-[#2C2C2C]"
                            : "bg-[#e95d39] border-l-[#e95d39] text-white"
                        }`}
                      >
                        <span className={`flex float-start font-semibold text-[0.8rem]${event.totalCount === event.count?'text-[#2C2C2C]':'text-white'}`}>
                          {event.shift}
                        </span>
                        <span className={`flex float-start text-[#2C2C2C]${event.totalCount === event.count?'text-[#2C2C2C]':'text-white'}`}>{event.time}</span>
                        <span className="flex float-start font-semibold">
                          Employee: {event.count}/{event.totalCount}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null;
              }
            }}
          />
        </div>
        </div>
      </div>
      </>
    );
  };
  
  export default RosterCalendar;
