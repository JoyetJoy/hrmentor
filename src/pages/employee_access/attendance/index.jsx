import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import EmployeeAttendance from "@/components/popups/employee_access/attendance/EmployeeAttendance";
import { useQuery } from "@tanstack/react-query";
import { ATTENDANCE, newRequest, ROASTER_GET } from "@/api/master";

const events = [
  {
    date: "2024-10-01",
    shift: "Morning Shift",
    clockIn: "09:00 AM",
    clockOut: "05:30 PM",
    totalTime: "08:30:00",
    status: "P",
  },
  {
    date: "2024-10-02",
    shift: "Morning Shift",
    clockIn: "09:00 AM",
    clockOut: "05:30 PM",
    totalTime: "08:30:00",
    status: "P",
    latestatus: "true",
  },
  {
    date: "2024-10-03",
    shift: "Morning Shift",
    clockIn: "09:00 AM",
    clockOut: "05:30 PM",
    totalTime: "08:30:00",
    status: "L",
  },
  {
    date: "2024-10-04",
    shift: "Morning Shift",
    clockIn: "09:15 AM",
    clockOut: "05:45 PM",
    totalTime: "08:30:00",
    status: "P",
    latestatus: "true",
  },
  {
    date: "2024-10-05",
    shift: "Morning Shift",
    clockIn: "08:45 AM",
    clockOut: "05:15 PM",
    totalTime: "08:30:00",
    status: "P",
    latestatus: "true",
  },
  {
    date: "2024-10-06",
    shift: "Morning Shift",
    clockIn: "09:00 AM",
    clockOut: "05:30 PM",
    totalTime: "08:30:00",
    status: "A",
  },
  {
    date: "2024-10-07",
    shift: "Morning Shift",
    clockIn: "09:10 AM",
    clockOut: "05:40 PM",
    totalTime: "08:30:00",
    status: "P",
    latestatus: "true",
  },
  {
    date: "2024-10-08",
    shift: "Morning Shift",
    clockIn: "08:50 AM",
    clockOut: "05:20 PM",
    totalTime: "08:30:00",
    status: "A",
  },
  {
    date: "2024-10-09",
    shift: "Morning Shift",
    clockIn: "09:05 AM",
    clockOut: "05:35 PM",
    totalTime: "08:30:00",
    status: "A",
  },
  {
    date: "2024-10-10",
    shift: "Morning Shift",
    clockIn: "09:00 AM",
    clockOut: "05:30 PM",
    totalTime: "08:30:00",
    status: "P",
    latestatus: "true",
  },
  {
    date: "2024-10-11",
    shift: "Morning Shift",
    clockIn: "09:00 AM",
    clockOut: "05:30 PM",
    totalTime: "08:30:00",
    status: "P",
  },
  {
    date: "2024-10-12",
    shift: "Morning Shift",
    clockIn: "09:20 AM",
    clockOut: "05:50 PM",
    totalTime: "08:30:00",
    status: "P",
  },
  {
    date: "2024-10-13",
    shift: "Morning Shift",
    clockIn: "09:10 AM",
    clockOut: "05:40 PM",
    totalTime: "08:30:00",
    status: "P",
    latestatus: "true",
  },
  {
    date: "2024-10-14",
    shift: "Morning Shift",
    clockIn: "09:00 AM",
    clockOut: "05:30 PM",
    totalTime: "08:30:00",
    status: "A",
  },
];

const months = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  label: dayjs().month(i).format("MMMM"),
}));

const years = Array.from({ length: 11 }, (_, i) => ({
  value: 2020 + i,
  label: (2020 + i).toString(),
}));

const EmployeeAccessAttendanceCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [popupOpen, setPopupOpen] = useState(false);
  const year = dayjs(date).year();
  const month = dayjs(date).month() + 1;

  const { data: events = [], refetch } = useQuery({
    queryKey: ["events", month, year],
    queryFn: () =>
      newRequest
        .get(ATTENDANCE, {
          params: { month, year },
        })
        .then((res) => res.data),
    enabled: true,
    staleTime: 0,
  });

  const handleClick = () => {
    setPopupOpen(true);
  };

  useEffect(() => {
    // Refetch data whenever the `date` changes
    refetch();
  }, [date, refetch]);

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
    console.log(formattedDate);

    const shiftEvents = events?.filter((event) =>
      event?.attendance_date?.includes(formattedDate),
    );

    const availableSlots = events?.available_slots_filtered?.filter((slot) =>
      dayjs(slot.date).isSame(dayjs(date), "day"),
    );

    const requestedSlots = events?.requested_details?.filter((slot) =>
      dayjs(slot.date).isSame(dayjs(date), "day"),
    );

    return { holidayEvents, shiftEvents, availableSlots, requestedSlots };
  };

  return (
    <div className="flex flex-col">
      <EmployeeAttendance popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      <MenuHeaderEmployeeAccess pathlink={""} currentpage={"Attendance"} />
      <div className="flex w-full items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <h5 className="text-md font-bold">My Attendance</h5>
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
        <div className="flex gap-20">
          <div className="flex items-center gap-5">
            <div className="flex gap-2 text-sm">
              <img
                className="h-5 object-contain"
                src="/assets/icons/tort.svg"
                alt="late"
              />
              <p>Late</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00B448] pl-[0.10rem] pt-[0.15rem] font-extrabold text-white">
                P
              </p>
              <p>Present</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <p className="flex h-7 w-7 items-center justify-center rounded-full bg-[#db0000] pt-[0.02rem] font-extrabold text-white">
                A
              </p>
              <p>Absent</p>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Team Attendance
          </button>
        </div>
      </div>

      <div className="max-w-8xl mb-10 mt-7 w-full">
        <Calendar
          onChange={handleDateChange}
          value={date}
          showNavigation={false}
          className="w-full font-monorope"
          formatShortWeekday={(locale, date) => dayjs(date).format("dddd")}
          tileContent={({ date, view }) => {
            if (view === "month") {
              const {
                holidayEvents,
                shiftEvents,
                availableSlots,
                requestedSlots,
              } = findEvents(date);
              return event ? (
                <div className="flex w-full flex-col gap-2">
                  {shiftEvents?.slice(0, 2)?.map((event, index) => (
                    <div
                      key={index}
                      onClick={() => handleClick(event)}
                      className={`mt-2 flex h-14 w-auto flex-col rounded-sm border-l-4 px-3 py-2 lg:w-36 xl:w-44 ${getTileClass(
                        date,
                      )} justify-center text-gray-800`}
                    >
                      <span className="float-start flex text-[0.8rem] font-semibold">
                        {event.shift_name}
                      </span>
                      <span className="float-start flex text-[12px]">
                        {convertTo12HourFormat(event?.shift?.start_time)}-
                        {convertTo12HourFormat(event?.shift?.end_time)}
                      </span>
                    </div>
                  ))}
                  <div className="c-af mt-2 flex h-14 w-full items-center justify-between bg-mediumblack px-3 text-[0.7rem] font-medium text-textcolor-darkCharcoal">
                    <div className="flex flex-col justify-start">
                      <p className="text-[0.8rem] font-bold">{event.shift}</p>
                      <p className="float-start flex w-full">{event.clockIn}</p>
                    </div>
                    <div>
                      <div className="flex w-full items-end gap-1">
                        {event.status === "P" && event.latestatus && (
                          <img
                            className="h-4 object-contain"
                            src="/assets/icons/tort.svg"
                            alt="late"
                          />
                        )}
                        <p
                          className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white ${event.status == "A" ? "ml-7 bg-[#db0000] pl-[0.03rem]" : event.status === "P" && event.latestatus ? "bg-[#00B448] pt-[0.01rem]" : "ml-7 bg-[#00B448] pt-[0.01rem]"} `}
                        >
                          {event.status}
                        </p>
                      </div>
                      <div>{event.clockOut}</div>
                    </div>
                  </div>
                  <div className="c-af mt-2 flex h-14 w-full items-center justify-between bg-mediumblack px-3 text-[0.7rem] font-medium text-textcolor-darkCharcoal">
                    <div className="flex flex-col justify-start">
                      <p className="text-[0.8rem] font-bold">{event.shift}</p>
                      <p className="float-start flex w-full">{event.clockIn}</p>
                    </div>
                    <div className="">
                      <div className="flex w-full items-end gap-1">
                        {event.status === "P" && event.latestatus && (
                          <img
                            className="h-4 object-contain"
                            src="/assets/icons/tort.svg"
                            alt="late"
                          />
                        )}
                        <p
                          className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white ${event.status == "A" ? "ml-7 bg-[#db0000] pl-[0.03rem]" : event.status === "P" && event.latestatus ? "bg-[#00B448] pt-[0.01rem]" : "ml-7 bg-[#00B448] pt-[0.01rem]"} `}
                        >
                          {event.status}
                        </p>
                      </div>
                      <div>{event.clockOut}</div>
                    </div>
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

export default EmployeeAccessAttendanceCalendar;
