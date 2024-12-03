import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import MenuHeader from "@/components/common/MenuHeader";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import { Link } from "react-router-dom";
import RosterItemList from "@/components/sidebars/employee_access/roster/RosterSideBar";
import { TEAM_ROSTER_GET,newRequest } from "@/api/master";
import { useQuery } from "@tanstack/react-query";
import ShiftDetailsView from "@/components/popups/employee_access/roster/ShiftDetailsView";
import RequestClaimshift from "@/components/popups/employee_access/roster/RequestClaimshift";
import TeamRosterShiftView from "@/components/popups/employee_access/roster/team/TeamRosterShiftView";
import { ACTIVE_EMPLOYEE } from "@/api";

const months = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: dayjs().month(i).format("MMMM"),
}));

const years = Array.from({ length: 11 }, (_, i) => ({
  value: 2020 + i,
  label: (2020 + i).toString(),
}));

const EmployeeAccessTeamRoster = () => {
  const [date, setDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [claimPopup, setClaimPopup] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState('');
  const [activeWorkArea, setActiveWorkArea] = useState('');
  const [activeLocation, setActiveLocation] = useState('');
  const [activeEmployee,setActiveEmployee] = useState('');

  const year = dayjs(date).year();
  const month = dayjs(date).month() + 1;

  const { data:employee } = useQuery({
    queryKey: ["employee"],
    queryFn: () =>
      newRequest.get(ACTIVE_EMPLOYEE).then((res) => res.data),
  });

  const { data: events = [], refetch } = useQuery({
    queryKey: ["events", month, year, activeEmployee, activeDepartment, activeLocation, activeWorkArea],
    queryFn: () =>
      newRequest.get(TEAM_ROSTER_GET, {
        params: { 
          month:month, 
          year:year,
          employee:activeEmployee,
          department:activeDepartment,
          location:activeLocation,
          work_area:activeWorkArea
         },
      }).then((res) => res.data),
    enabled: false, // Prevent the query from auto-fetching on mount
  });

  useEffect(() => {
    // Refetch data whenever the `date` changes
    refetch();
  }, [date, refetch, activeEmployee, activeDepartment, activeLocation, activeWorkArea]);
  
  
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleMonthChange = (selectedOption) => {
    const currentDay = dayjs(date).date();
  const updatedDate = dayjs(date)
    .month(selectedOption.value - 1) // Update the month
    .date(1) // Temporarily set the date to the first day of the month
    .date(Math.min(currentDay, dayjs(date).month(selectedOption.value - 1).daysInMonth())) // Ensure the date stays valid
    .toDate();
  handleDateChange(updatedDate);
  };

  const handleYearChange = (selectedOption) => {
    const updatedDate = dayjs(date).year(selectedOption.value).toDate();
    handleDateChange(updatedDate);
  };

  const getTileClass = (date) => {
    if (dayjs(date).isSame(dayjs(), "day")) return "bg-green-200 border-green-500";
    if (dayjs(date).isBefore(dayjs(), "day")) return "bg-blue-200 border-blue-500";
    return "bg-yellow-200 border-yellow-500";
  };

  const findEvents = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const holidayEvents = events.filter((event) =>
      event?.holidays?.includes(formattedDate)
    );
    const shiftEvents = events.filter((event) =>
      event?.date_range?.includes(formattedDate)
    );
    return { holidayEvents, shiftEvents };
  };

  const handleClick = (event) => {
    if (!event?.isHoliday) {
      setSelectedField(event);
      setPopupOpen(true);
    }
  };

  function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = ((hours % 12) || 12);  // Convert hours to 12-hour format
    return `${formattedHours}:${minutes} ${period}`;
  }


  return (
    <div className="flex flex-col">
      <TeamRosterShiftView
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
      />
      <RequestClaimshift
        popupOpen={claimPopup}
        setPopupOpen={setClaimPopup}
        selectedField={selectedField}
        convertTo12HourFormat={convertTo12HourFormat}
      />
      {/* <RequestCalimshift popupOpen={popupOpen} setPopupOpen={setPopupOpen}/> */}
      <MenuHeaderEmployeeAccess
        pathlink={""}
        currentpage={"Roster"}

      />
      <div className="flex items-center justify-between px-4 py-2 w-full">
        <div className="flex items-center gap-4">
          <h5 className="text-md font-bold">Team Roster</h5>
          <Select
            options={years}
            isSearchable={true}
            onChange={handleYearChange}
            styles={customSelectStyles}
            value={years.find((yearOption) => yearOption.value === dayjs(date).year())}
            placeholder={dayjs(date).format("YYYY")}
            className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
          />
          <Select
            options={months}
            isSearchable={true}
            onChange={handleMonthChange}
            styles={customSelectStyles}
            value={months.find((monthOption) => monthOption.value === dayjs(date).month() + 1)} 
            placeholder={dayjs(date).format("MMMM")}
            className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
          />
        </div>
        <div className="flex gap-3">
        <Select
              options={employee}
              isSearchable={true}
              onChange={(option) => setActiveEmployee(option?.id || "")}
              styles={customSelectStyles}
              placeholder={'All employee'}
              className="input-box h-10 w-52 rounded-md p-0 border-[#C2C1C1] focus:border-[#C2C1C1] caret-white"
            />
        <Link
        to="/employee-access/roster" 
        className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white">
          My Roster
        </Link>
        </div>
      </div>
      <div className="mb-10 mt-2 w-full max-w-8xl flex gap-3">
        <RosterItemList
        activeDepartment={activeDepartment}
        setActiveDepartment={setActiveDepartment}
        activeLocation={activeLocation}
        setActiveLocation={setActiveLocation}
        activeWorkArea={activeWorkArea}
        setActiveWorkArea={setActiveWorkArea}
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
              const { holidayEvents, shiftEvents } = findEvents(date);
              return (
                <div className="flex flex-col gap-2">
                  {holidayEvents.map((event, index) => (
                    <div
                      key={index}
                      className="mt-2 flex flex-col h-14 w-auto lg:w-28 xl:w-36 px-3 text-sm border-l-4 rounded-sm bg-[#fbe8f2] border-[#cf127a] text-gray-800 justify-center"
                    >
                      <span className="font-semibold flex float-start">Holiday</span>
                    </div>
                  ))}
                  {shiftEvents.map((event, index) => (
                    <div
                      key={index}
                      onClick={() => handleClick(event)}
                      className={`mt-2 flex flex-col h-14 w-auto lg:w-28 xl:w-36 px-3 text-sm border-l-4 rounded-sm ${
                        getTileClass(date)
                      } text-gray-800 justify-center`}
                    >
                      <span className="font-semibold flex float-start">{event.shift_name}</span>
                      <span className="flex float-start">
                      {convertTo12HourFormat(event?.shift?.start_time)}-
                      {convertTo12HourFormat(event?.shift?.end_time)}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
      </div>
    </div>
  );
};

export default EmployeeAccessTeamRoster;

