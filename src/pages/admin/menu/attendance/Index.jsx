import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import MenuHeader from "@/components/common/MenuHeader";
import { useQuery } from "@tanstack/react-query";
import { EMPLOYEE_LIST, newRequest, TEAM_ATTENDANCE } from "@/api/master";
import { ACTIVE_EMPLOYEE } from "@/api";

const months = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  label: dayjs().month(i).format("MMMM"),
}));

const years = Array.from({ length: 11 }, (_, i) => ({
  value: 2020 + i,
  label: (2020 + i).toString(),
}));

const EmployeeAttendanceCalendar = () => {
  const [date, setDate] = useState(new Date());
  const year = dayjs(date).year();
  const month = dayjs(date).month() + 1;
  const [activeEmployee, setActiveEmployee] = useState("");

  const { data: employee } = useQuery({
    queryKey: ["employee"],
    queryFn: () => newRequest.get(ACTIVE_EMPLOYEE).then((res) => res.data),
  });

  const { data: events = [], refetch } = useQuery({
    queryKey: ["events", month, year, activeEmployee],
    queryFn: () =>
      newRequest
        .get(TEAM_ATTENDANCE, {
          params: {
            month,
            year,
            employee_id: activeEmployee,
          },
        })
        .then((res) => res.data),
    enabled: true,
    staleTime: 0,
  });

  useEffect(() => {
    refetch();
  }, [date, refetch, activeEmployee]);

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

  const getTileClass = (date, event) => {
    if (event?.assigned_total_employee_count !== event?.people_required)
      return "bg-slate-300 border-[#283277] hover:bg-slate-400";
    if (dayjs(date).isSame(dayjs(), "day"))
      return "bg-green-200 border-green-500 hover:bg-[#c0e9c0]";
    if (dayjs(date).isBefore(dayjs(), "day"))
      return "bg-blue-200 border-blue-500 hover:bg-[#b4d1f3]";
    return "bg-yellow-200 border-yellow-500 hover:bg-[#f1e584]";
  };

  const findEvents = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    console.log(events);
    console.log(formattedDate);
    
    
    const holidayEvents = events?.result?.filter((event) =>
      event?.holidays?.includes(formattedDate),
    );
    const shiftEvents = events?.filter((event) =>
      event?.attendance_date?.includes(formattedDate)
    );
console.log(shiftEvents);

    const availableSlots = events?.available_slots_filtered?.filter((slot) =>
      dayjs(slot.date).isSame(dayjs(date), "day"),
    );

    const requestedSlots = events?.requested_details?.filter((slot) =>
      dayjs(slot.date).isSame(dayjs(date), "day"),
    );

    return { holidayEvents, shiftEvents, availableSlots, requestedSlots };
  };

  const handleClick = (event) => {
    if (!event?.isHoliday) {
      console.log(event, date);
      const selectdate = new Date(date);
      const formattedDate = selectdate
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "/");
      if (date) {
        navigate(
          `/admin/roster/calendarview?id=${event?.id}&date=${formattedDate}`,
        );
      }
    }
  };
  return (
    <div className="flex flex-col">
      <MenuHeader
        menu={"Menu"}
        subMenu={""}
        currentpath={"Attendance"}
        icon={""}
        activeMenu={""}
      />
      <div className="flex w-full items-center justify-between bg-white px-4 py-2">
        <div className="flex items-center gap-4">
          <h5 className="text-lg font-bold">My Attendance</h5>
          <Select
            options={years}
            isSearchable={true}
            onChange={handleYearChange}
            styles={customSelectStyles}
            value={years.find(
              (yearOption) => yearOption.value === dayjs(date).year(),
            )}
            placeholder={dayjs(date).format("YYYY")}
            className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
          />
          <Select
            options={months}
            isSearchable={true}
            onChange={handleMonthChange}
            styles={customSelectStyles}
            value={months.find(
              (monthOption) => monthOption.value === dayjs(date).month() + 1,
            )}
            placeholder={dayjs(date).format("MMMM")}
            className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
          />
        </div>
        <div className="flex gap-2">
          <Select
            options={employee}
            isSearchable={true}
            onChange={(option) => setActiveEmployee(option?.employee_id || "")}
            styles={customSelectStyles}
            placeholder={"All employee"}
            className="input-box h-10 w-52 rounded-md border-[#C2C1C1] p-0 caret-white focus:border-[#C2C1C1]"
          />
          <button className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white">
            Team Attendance
          </button>
        </div>
      </div>

      <div className="max-w-8xl mb-10 mt-7 w-full">
      <Calendar
          key={date}
          onChange={handleDateChange}
          value={date}
          showNavigation={false}
          className="w-full font-monorope"
          locale="en-US"
          formatShortWeekday={(locale, date) => dayjs(date).format("dddd")}
          tileContent={({ date, view }) => {
            if (view === "month") {
              const {
                holidayEvents,
                shiftEvents,
                availableSlots,
                requestedSlots,
              } = findEvents(date);
              console.log(shiftEvents);

              return events ? (
                <div className="flex h-full w-full flex-col gap-2">
                  <>
                    {shiftEvents?.map((event, index) => (
                      <div
                        key={index}
                        onClick={() => handleClick(event)}
                        className={`mt-2 flex h-14 w-auto flex-col rounded-sm border-l-4 px-3 py-2 ${getTileClass(
                          date,
                        )} justify-center text-gray-800`}
                      >
                        <span className="float-start flex text-[0.8rem] font-semibold">
                          {event?.shift_detail
                            ? event.shift_detail?.name
                            : "Present"}
                        </span>
                        <span className="float-start flex text-[12px]">
                          {event?.total_working_hour}
                        </span>
                      </div>
                    ))}
                  </>
                </div>
              ) : null;
            }
          }}
        />
      </div>
    </div>
  );
};

export default EmployeeAttendanceCalendar;
