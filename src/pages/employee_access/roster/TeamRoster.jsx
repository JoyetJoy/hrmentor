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
import { ROASTER_GET,newRequest } from "@/api/master";
import { useQuery } from "@tanstack/react-query";
import ShiftDetailsView from "@/components/popups/employee_access/roster/ShiftDetailsView";
import RequestClaimshift from "@/components/popups/employee_access/roster/RequestClaimshift";
import TeamRosterShiftView from "@/components/popups/employee_access/roster/team/TeamRosterShiftView";

const months = Array.from({ length: 12 }, (_, i) => ({
  value: i,
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

  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: () => newRequest.get(ROASTER_GET).then((res) => res.data),
  });
  
  // Preprocess events to map each date to its event, checking if it's a holiday
  useEffect(() => {
    const dateEventMap = {};

    // Map all events to their respective dates
    events?.forEach((event) => {
        // Map regular shift dates
        event?.date_range.forEach((eventDate) => {
            const formattedDate = dayjs(eventDate).format("YYYY-MM-DD");
            dateEventMap[formattedDate] = {
                ...event,
                isHoliday: false, // Default as not a holiday
            };
        });

        // Mark holidays
        event?.holidays.forEach((holidayDate) => {
            const formattedHolidayDate = dayjs(holidayDate).format("YYYY-MM-DD");
            dateEventMap[formattedHolidayDate] = {
                ...event,
                isHoliday: true, // Mark as holiday
            };
        });
    });

    setFilteredEvents(dateEventMap);
}, [events]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleMonthChange = (selectedOption) => {
    const updatedDate = dayjs(date).month(selectedOption.value).toDate();
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
    return filteredEvents[formattedDate] ? [filteredEvents[formattedDate]] : [];
  };

  const handleClick = (event) => {
    if (!event?.isHoliday) {
      setSelectedField(event);
      setPopupOpen(true);
    } 
  };

  const employee=[
    { value: 'emergency', label: 'Emergency Department' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'radiology', label: 'Radiology' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'oncology', label: 'Oncology' },
  ];

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
        <div className="flex gap-3">
        <Select
              options={employee}
              isSearchable={true}
              styles={customSelectStyles}
              placeholder={'All employee'}
              className="input-box h-10 w-52 rounded-md p-0 border-[#C2C1C1] focus:border-[#C2C1C1] caret-white"
            />
        <Link
        to="" 
        className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white">
          My Roster
        </Link>
        </div>
      </div>
      <div className="mb-10 mt-2 w-full max-w-8xl flex gap-3">
        <RosterItemList/>
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
                  <div className="flex flex-col gap-2">
                    {eventsForDay.map((event, index) => (
                      <div
                        key={index}
                        onClick={() => handleClick(event)}
                        className={`mt-2 flex flex-col h-14 w-32 xl:w-[9.5rem] px-3 text-sm border-l-4 rounded-sm ${event.isHoliday?'bg-[#fbe8f2] border-[#cf127a]':getTileClass(date)} text-gray-800 justify-center`}
                      >
                        {event.isHoliday ? (
                          <span className="font-semibold flex float-start">Holiday</span>
                        ) : (
                          <>
                          <span className="font-semibold flex float-start">{event.shift_name}</span>
                          <span className="flex float-start">{event.shift.start_time}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                );
              }
            }
            return null;
          }}
        />
      </div>
    </div>
  );
};

export default EmployeeAccessTeamRoster;

