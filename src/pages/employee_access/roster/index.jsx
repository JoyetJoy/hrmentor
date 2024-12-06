import React, { useEffect, useState } from "react";
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
  label: dayjs().month(i).format("MMMM"),
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

  const { data: events = [], refetch } = useQuery({
    queryKey: ["events", month, year],
    queryFn: () =>
      newRequest
        .get(ROASTER_GET, {
          params: { month, year },
        })
        .then((res) => res.data),
        enabled: true,      
        staleTime: 0,
  });

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
      return "bg-green-200 border-green-500";
    if (dayjs(date).isBefore(dayjs(), "day"))
      return "bg-blue-200 border-blue-500";
    return "bg-yellow-200 border-yellow-500";
  };

  const findEvents = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const holidayEvents = events?.result?.filter((event) =>
      event?.holidays?.includes(formattedDate),
    );
    const shiftEvents = events?.result?.filter((event) =>
      event?.date_range?.includes(formattedDate),
    );

    const availableSlots = events?.available_slots_filtered?.filter((slot) =>
      dayjs(slot.date).isSame(dayjs(date), "day"),
    );

    const requestedSlots = events?.requested_details?.filter((slot)=>
      dayjs(slot.date).isSame(dayjs(date), "day"),
    )

    return { holidayEvents, shiftEvents, availableSlots, requestedSlots };
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
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  }

  return (
    <div className="flex flex-col">
      <ShiftDetailsView
        date={date}
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        convertTo12HourFormat={convertTo12HourFormat}
      />
      <RequestClaimshift
        popupOpen={claimPopup}
        refetch={refetch}
        setPopupOpen={setClaimPopup}
        selectedField={selectedField}
        convertTo12HourFormat={convertTo12HourFormat}
      />
      <MenuHeaderEmployeeAccess pathlink={""} currentpage={"Roster"} />
      <div className="flex w-full items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <h5 className="text-md font-bold">My Roster</h5>
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
        <Link
          to="/employee-access/roster/teamroster"
          className="flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white"
        >
          Team Roster
        </Link>
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
              const { holidayEvents, shiftEvents, availableSlots, requestedSlots } =
                findEvents(date);
              return (
                <div className="flex flex-col gap-2 h-full overflow-y-auto overflow-y-min ">
                  {holidayEvents?.map((event, index) => (
                    <div
                      key={index}
                      className="mt-2 flex h-14 w-auto flex-col justify-center rounded-sm border-l-4 border-[#cf127a] bg-[#fbe8f2] px-3 text-sm text-gray-800 lg:w-36 xl:w-44"
                    >
                      <span className="float-start flex font-semibold ">
                        Holiday
                      </span>
                    </div>
                  ))}
                  {shiftEvents?.slice(0, 2)?.map((event, index) => (
                    <div
                      key={index}
                      onClick={() => handleClick(event)}
                      className={`mt-2 flex h-14 w-auto flex-col rounded-sm border-l-4 px-3 py-2 text-sm lg:w-36 xl:w-44 ${getTileClass(
                        date,
                      )} justify-center text-gray-800`}
                    >
                      <span className="float-start flex font-semibold">
                        {event.shift_name}
                      </span>
                      <span className="float-start flex">
                        {convertTo12HourFormat(event?.shift?.start_time)}-
                        {convertTo12HourFormat(event?.shift?.end_time)}
                      </span>
                    </div>
                  ))}

                  {/* "Count More" Button */}
                  {shiftEvents?.length > 2 && (
                    <button
                      onClick={() => {
                        setSelectedField({ date, shiftEvents });
                        setPopupOpen(true);
                      }}
                      className="mt-2 flex h-10 items-center justify-center rounded-sm bg-gray-200 px-3 py-1 text-sm text-gray-800 hover:bg-gray-300"
                    >
                      +{shiftEvents.length - 2} More
                    </button>
                  )}

                  {/* Available Slots */}
                  {availableSlots?.map((slot, index) => (
                    <div
                      key={`available-slot-${index}`}
                      onClick={() => {
                        setClaimPopup(true);
                        setSelectedField(slot);
                      }}
                      className="mt-2 mb-2 flex h-14 w-auto flex-col justify-center rounded-sm bg-[#a3d8f4] px-3 py-4 text-sm text-gray-800 lg:w-36 xl:w-44"
                    >
                      <span className="font-semibold">Available Slot</span>
                    </div>
                  ))}
                  
                  {requestedSlots?.map((event, index) => (
                    <div
                      key={index}
                      className="mt-2 flex h-14 w-auto flex-col justify-center rounded-sm border-l-4 border-[#cf127a] bg-[#fbe8f2] px-3 py-4 text-sm text-gray-800 lg:w-36 xl:w-44"
                    >
                      <span className="float-start flex font-semibold ">
                        Requested Slot
                      </span>
                      <span className="float-start flex">
                        Status : {event?.requests[0]?.request_status?.status_name}
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

export default EmployeeAccessRosterCalendar;
