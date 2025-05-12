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
  const [type, setType] = useState("");
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


// Step 1: Filter by selected date
const filteredByDate = events?.available_slots_filtered?.filter((slotGroup) =>
  dayjs(slotGroup.date).isSame(dayjs(date), "day")
);

// Step 2: Separate into requested and available groups (by date)
const requestedSlots = filteredByDate?.map(({ date, slots }) => {
  const requested = slots.filter((slot) => slot.status === 'requested');
  return requested.length ? { date, slots: requested } : null;
}).filter(Boolean); // Remove null entries

const availableSlots = filteredByDate?.map(({ date, slots }) => {
  const available = slots.filter((slot) => slot.status !== 'requested');
  return available.length ? { date, slots: available } : null;
}).filter(Boolean); // Remove null entries

    return { holidayEvents, shiftEvents, availableSlots, requestedSlots };
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
        refetch={refetch}
        type={type}
        setPopupOpen={setClaimPopup}
        selectedField={selectedField}
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
        <div className="flex items-center gap-14">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 text-sm">
              <img
                src="/assets/icons/employee_access/header/availableshift.svg"
                alt=""
              />
              <p>Available slot</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <img
                src="/assets/icons/employee_access/header/requested_slot.svg"
                alt=""
              />
              <p>Requested slot</p>
            </div>
          </div>
          <Link
            to="/employee-access/roster/teamroster"
            className="flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white"
          >
            Team Roster
          </Link>
        </div>
      </div>

      <div className="max-w-8xl mb-10 mt-7 w-full hover:bg-white active:bg-white">
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
              console.log(availableSlots);
              
              return (
                <div className="relative flex h-full w-full flex-col overflow-visible">
                  <>
                    <div className="absolute -top-6 left-0 flex flex-col items-end">
                      {requestedSlots?.map((slot, index) => (
                        <img
                          key={`requested-slot-${index}`}
                          onClick={() => {
                            setClaimPopup(true);
                            setSelectedField(slot);
                            setType("request");
                          }}
                          src="/assets/icons/employee_access/header/requested_slot.svg"
                          alt=""
                        />
                      ))}
                    </div>
                    <div className="absolute -top-6 right-0 flex flex-col items-end">
                      {availableSlots?.map((slot, index) => (
                        <img
                          key={`available-slot-${index}`}
                          onClick={() => {
                            setClaimPopup(true);
                            setType("claim");
                            setSelectedField(slot);
                          }}
                          src="/assets/icons/employee_access/header/availableshift.svg"
                          alt=""
                        />
                      ))}
                    </div>
                    {shiftEvents?.length > 0
                      ? shiftEvents?.slice(0, 2)?.map((event, index) => (
                          <div
                            key={index}
                            onClick={() => handleClick(event)}
                            style={{
                              backgroundColor: event?.shift?.shift_color,
                              borderLeft: `4px solid ${adjustLightness(event?.shift?.shift_color, -18)}`,
                            }}
                            className={`mt-2 flex h-14 w-auto flex-col justify-center rounded-sm border-l-4 px-3 py-2 text-gray-800`}
                          >
                            <span className="float-start flex text-[0.8rem] font-semibold">
                              {event.shift_name}
                            </span>
                            <span className="float-start flex text-[12px]">
                              {event?.shift?.start_time} -{" "}
                              {event?.shift?.end_time}
                            </span>
                          </div>
                        ))
                      : holidayEvents?.map((event, index) => (
                          <div
                            key={index}
                            className="mt-2 flex h-14 w-auto flex-col justify-center rounded-sm border-l-4 border-[#75757e] bg-[#d5d5dc] px-3 text-[12px] text-gray-800 hover:bg-[#e9c5d8]"
                          >
                            <span className="float-start flex w-full font-semibold">
                              Day Off
                            </span>
                          </div>
                        ))}
                  </>

                  {/* "Count More" Button */}
                  {/* {shiftEvents?.length > 2 && (
                    <button
                      onClick={() => {
                        setSelectedField({ date, shiftEvents });
                        setPopupOpen(true);
                      }}
                      className="mt-2 flex h-10 items-center justify-center rounded-sm bg-gray-200 px-3 py-1 text-sm text-gray-800 hover:bg-gray-300"
                    >
                      +{shiftEvents.length - 2} More
                    </button>
                  )} */}

                  {/* Available Slots */}

                  {/* {availableSlots?.map((slot, index) => (
                    <div
                      key={`available-slot-${index}`}
                      onClick={() => {
                        setClaimPopup(true);
                        setSelectedField(slot);
                      }}
                      className="mb-2 mt-2 flex h-11 w-auto items-center justify-between rounded-sm bg-[#a3d8f4] px-3 py-4 text-left text-[12px] text-gray-800 lg:w-36 xl:w-44"
                    >
                      <span className="font-semibold">Available Slot</span>
                    </div>
                  ))}

                  {requestedSlots?.map((event, index) => (
                    <div
                      key={index}
                      className="mt-2 flex h-11 w-auto flex-col justify-center rounded-sm border-l-4 border-[#cf127a] bg-[#fbe8f2] px-3 py-4 text-sm text-gray-800 lg:w-36 xl:w-44"
                    >
                      <span className="float-start flex text-[12px] font-semibold">
                        Requested Slot
                      </span>
                      <span className="float-start flex text-[10px]">
                        Status :{" "}
                        {event?.requests[0]?.request_status?.status_name}
                      </span>
                    </div>
                  ))} */}
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
