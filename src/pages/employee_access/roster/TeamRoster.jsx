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
import { TEAM_ROSTER_GET, newRequest } from "@/api/master";
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
  const [activeDepartment, setActiveDepartment] = useState("");
  const [activeWorkArea, setActiveWorkArea] = useState("");
  const [activeLocation, setActiveLocation] = useState("");
  const [activeEmployee, setActiveEmployee] = useState("");

  const year = dayjs(date).year();
  const month = dayjs(date).month() + 1;

  const { data: employee } = useQuery({
    queryKey: ["employee"],
    queryFn: () => newRequest.get(ACTIVE_EMPLOYEE).then((res) => res.data),
  });

  const { data: events = [], refetch } = useQuery({
    queryKey: [
      "events",
      month,
      year,
      activeEmployee,
      activeDepartment,
      activeLocation,
      activeWorkArea,
    ],
    queryFn: () =>
      newRequest
        .get(TEAM_ROSTER_GET, {
          params: {
            month: month,
            year: year,
            employee: activeEmployee,
            department: activeDepartment,
            location: activeLocation,
            work_area: activeWorkArea,
          },
        })
        .then((res) => res.data),
        enabled: true,
        staleTime: 0, 
  });

  useEffect(() => {
    refetch();
  }, [
    date,
    refetch,
    activeEmployee,
    activeDepartment,
    activeLocation,
    activeWorkArea,
  ]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleMonthChange = (selectedOption) => {
    const currentDay = dayjs(date).date();
    const updatedDate = dayjs(date)
      .month(selectedOption.value - 1) // Update the month
      .date(1) // Temporarily set the date to the first day of the month
      .date(
        Math.min(
          currentDay,
          dayjs(date)
            .month(selectedOption.value - 1)
            .daysInMonth(),
        ),
      ) // Ensure the date stays valid
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

  const adjustLightness = (hex, percent) => {
    hex = hex.replace("#", "");

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Convert to HSL
    let hsl = rgbToHsl(r, g, b);
    hsl[2] = Math.min(100, Math.max(0, hsl[2] + percent)); // Adjust Lightness
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  };

  // RGB to HSL Conversion
  const rgbToHsl = (r, g, b) => {
    (r /= 255), (g /= 255), (b /= 255);
    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // Grayscale
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h =
        max === r
          ? (g - b) / d + (g < b ? 6 : 0)
          : max === g
            ? (b - r) / d + 2
            : (r - g) / d + 4;
      h = Math.round(h * 60);
    }
    return [h, Math.round(s * 100), Math.round(l * 100)];
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

    const requestedSlots = events?.requested_details?.filter((slot) =>
      dayjs(slot.date).isSame(dayjs(date), "day"),
    );

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
    const formattedHours = hours % 12 || 12; // Convert hours to 12-hour format
    return `${formattedHours}:${minutes} ${period}`;
  }

  return (
    <div className="flex flex-col">
      <TeamRosterShiftView
        date={date}
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        convertTo12HourFormat={convertTo12HourFormat}
      />
      <RequestClaimshift
        popupOpen={claimPopup}
        setPopupOpen={setClaimPopup}
        selectedField={selectedField}
        convertTo12HourFormat={convertTo12HourFormat}
      />
      {/* <RequestCalimshift popupOpen={popupOpen} setPopupOpen={setPopupOpen}/> */}
      <MenuHeaderEmployeeAccess pathlink={""} currentpage={"Roster"} />
      <div className="flex w-full items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <h5 className="text-md font-bold">Team Roster</h5>
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
        <div className="flex gap-3">
          <Select
            options={employee}
            isSearchable={true}
            onChange={(option) => setActiveEmployee(option?.id || "")}
            styles={customSelectStyles}
            placeholder={"All employee"}
            className="input-box h-10 w-52 rounded-md border-[#C2C1C1] p-0 caret-white focus:border-[#C2C1C1]"
          />
          <Link
            to="/employee-access/roster"
            className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            My Roster
          </Link>
        </div>
      </div>
      <div className="max-w-8xl mb-10 mt-2 flex w-full gap-3">
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
              console.log(shiftEvents);
              return (
                <div className={`relative flex h-full w-full flex-col overflow-visible ${shiftEvents?.length >= 3 ? 'pt-[0.6rem]' : ''}`}>
                  {shiftEvents?.length >= 3 && (
                    <div className="absolute right-0 -top-[0.9rem] flex flex-col items-end">
                      <p
                        className={`flex min-h-7 w-7 items-center justify-center rounded-full bg-[#00B448] pl-[0.10rem] pt-[0.15rem] font-extrabold text-white`}
                      >
                        {shiftEvents?.length}
                      </p>
                    </div>
                  )}
                 <div className=" overflow-y-auto overflow-y-min overflow-x-hidden">
                  {shiftEvents?.map((event, index) => (
                    <div
                      key={index}
                      onClick={() => handleClick(event)}
                      style={{
                        backgroundColor: event?.shift_color,
                        borderLeft: `4px solid ${adjustLightness(event?.shift_color, -18)}`,
                      }}
                      className={`mt-2 flex h-14 w-auto flex-col rounded-sm border-l-4 px-3 py-1 text-sm justify-center text-gray-800`}
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
                 </div>
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
