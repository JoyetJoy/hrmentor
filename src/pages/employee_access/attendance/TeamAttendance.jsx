import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import EmployeeAttendance from "@/components/popups/employee_access/attendance/EmployeeAttendance";
import { useQuery } from "@tanstack/react-query";
import { ATTENDANCE, EMPLOYEE_LIST, newRequest, ROASTER_GET, TEAM_ATTENDANCE } from "@/api/master";
import TeamAttendanceSideBar from "@/components/sidebars/employee_access/attendance/TeamAttendanceSideBar";
import TeamTimeSheetSideBar from "@/components/sidebars/employee_access/timesheet/TeamTimeSheetSideBar";
import { Link } from "react-router-dom";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { ROSTER_EMPLIST, SHIFT_LIST } from "@/api/setup";

const months = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  label: dayjs().month(i).format("MMMM"),
}));

const years = Array.from({ length: 11 }, (_, i) => ({
  value: 2020 + i,
  label: (2020 + i).toString(),
}));

const TeamAttendanceCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState('')
  const year = dayjs(date).year();
  const month = dayjs(date).month() + 1;

  const { data: shiftList } = useEmployeeMaster(SHIFT_LIST, "shiftList");
  console.log(selectedShift);

  const { data: rosterEmpList } = useQuery({
    queryKey: ["rosterEmpList", selectedShift],
    queryFn: () => {
      console.log(`Fetching employee list for shift ID: ${selectedShift}`);
      return newRequest
        .get(`${ROSTER_EMPLIST}/${selectedShiftId}`)
        .then((res) => {
          return res.data;
        });
    },
    enabled: !!selectedShift,
    onSuccess: (data) => {
      console.log("Fetched employee list:", data);
    },
    onError: (error) => {
      console.error("Error fetching employee list:", error?.message || error);
    },
  });
  

  const { data: events = [], refetch } = useQuery({
    queryKey: ["events", month, year],
    queryFn: () =>
      newRequest
        .get(TEAM_ATTENDANCE, {
          params: { month, year },
        })
        .then((res) => res.data),
    enabled: true,
    staleTime: 0,
  });

  const { data: employeeLists = [] } = useQuery({
    queryKey: ["employeeLists"],
    queryFn: () =>
      newRequest
        .get(EMPLOYEE_LIST)
        .then((res) => res.data),
    enabled: true,
    staleTime: 0,
  });

  const handleClick = () => {
    setPopupOpen(true);
  };
  useEffect(() => {
    console.log("Initial fetch for:", { month, year });
    refetch(); // Initial fetch when the component mounts
  }, []);

  useEffect(() => {
    if (month && year) {
      console.log("Refetching events for:", { month, year });
      refetch();
    }
  }, [date, month, year, refetch]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleMonthChange = (selectedOption) => {
    const currentDay = dayjs(date).date();
    const updatedDate = dayjs(date)
      .month(selectedOption.value)
      .date(1)
      .date(
        Math.min(
          currentDay,
          dayjs(date).month(selectedOption.value).daysInMonth(),
        ),
      )
      .toDate();
    setDate(updatedDate); // Synchronize date state
  };

  const handleYearChange = (selectedOption) => {
    const updatedDate = dayjs(date).year(selectedOption.value).toDate();
    setDate(updatedDate); // Synchronize date state
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
    const holidayEvents = Array.isArray(events?.result)
      ? events.result.filter((event) => event.holidays?.includes(formattedDate))
      : [];
    const shiftEvents = Array.isArray(events)
      ? events.filter((event) => event.attendance_date?.includes(formattedDate))
      : [];
    const availableSlots = Array.isArray(events?.available_slots_filtered)
      ? events.available_slots_filtered.filter((slot) =>
          dayjs(slot.date).isSame(dayjs(date), "day"),
        )
      : [];
    const requestedSlots = Array.isArray(events?.requested_details)
      ? events.requested_details.filter((slot) =>
          dayjs(slot.date).isSame(dayjs(date), "day"),
        )
      : [];
    return { holidayEvents, shiftEvents, availableSlots, requestedSlots };
  };

  function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  }
  console.log(date);

  return (
    <div className="flex flex-col">
      <EmployeeAttendance popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      <MenuHeaderEmployeeAccess pathlink={""} currentpage={"Attendance"} />
        <div className="flex w-full items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <h5 className="text-md font-bold">Team Attendance</h5>
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
          <div className="flex items-center gap-3">
            <Link
              to={'/employee-access/attendance'}
              className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Attendance
            </Link>
            <button className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white">
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mb-10 mt-2 flex w-full gap-3">
      <TeamTimeSheetSideBar
          years={years}
          months={months}
          // weeks={weeks}
          // handleWeekChange={handleWeekChange}
          // selectedWeek={selectedWeek}
          employeeLists={employeeLists}
          handleMonthChange={handleMonthChange}
          date={date}
          handleYearChange={handleYearChange}
          type='attendance'
          shiftList={shiftList}
          setSelectedShift={setSelectedShift}
          rosterEmpList={rosterEmpList}
          setSelectedEmployee={setSelectedEmployee}
        />
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
                    {shiftEvents?.slice(0, 2)?.map((event, index) => (
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

export default TeamAttendanceCalendar;
