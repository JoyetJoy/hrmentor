import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import { Link } from "react-router-dom";
import ShiftDetailsView from "@/components/popups/employee_access/roster/ShiftDetailsView";
import RequestClaimshift from "@/components/popups/employee_access/roster/RequestClaimshift";
import { ROASTER_GET, newRequest } from "@/api/master";
import { useQuery } from "@tanstack/react-query";

const months = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1, 
  label: dayjs().month(i).format("MMMM")
}));

const years = Array.from({ length: 11 }, (_, i) => ({
  value: 2020 + i,
  label: (2020 + i).toString(),
}));

const EmployeeAccessRosterCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [claimPopup, setClaimPopup] = useState(false);

  const year = dayjs(date).year();
  const month = dayjs(date).month() + 1;

  const { data: events = [] } = useQuery({
    queryKey: ["events", month, year],
    queryFn: () =>
      newRequest.get(ROASTER_GET, {
        params: {
          month: month,
          year: year,
        },
      }).then((res) => res.data),
    enabled: !!date,
  });

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleMonthChange = (selectedOption) => {
    const updatedDate = dayjs(date).month(selectedOption.value - 1).toDate();
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
    return events.filter((event) =>
      event.date_range.includes(formattedDate) || event.holidays.includes(formattedDate)
    );
  };

  const handleClick = (event) => {
    if (!event?.isHoliday) {
      setSelectedField(event);
      setPopupOpen(true);
    }
  };

  return (
    <div className="flex flex-col">
      <ShiftDetailsView
        date={date}
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
      />
      <RequestClaimshift
        popupOpen={claimPopup}
        setPopupOpen={setClaimPopup}
        selectedField={selectedField}
      />
      <MenuHeaderEmployeeAccess pathlink={""} currentpage={"Roster"} />
      <div className="flex items-center justify-between px-4 py-2 w-full">
        <div className="flex items-center gap-4">
          <h5 className="text-md font-bold">My Roster</h5>
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
        <Link
          to="/employee-access/roster/teamroster"
          className="flex w-fit items-center whitespace-nowrap justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white"
        >
          Team Roster
        </Link>
      </div>

      <div className="mb-10 mt-7 w-full max-w-8xl">
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
                        className={`mt-2 flex flex-col h-14 w-auto lg:w-36 xl:w-44 px-3 text-sm border-l-4 rounded-sm ${
                          event.isHoliday
                            ? "bg-[#fbe8f2] border-[#cf127a]"
                            : getTileClass(date)
                        } text-gray-800 justify-center`}
                      >
                        {event.isHoliday ? (
                          <span className="font-semibold flex float-start">
                            Holiday
                          </span>
                        ) : (
                          <>
                            <span className="font-semibold flex float-start">
                              {event.shift_name}
                            </span>
                            <span className="flex float-start">
                              {event.shift.start_time}
                            </span>
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

export default EmployeeAccessRosterCalendar;
