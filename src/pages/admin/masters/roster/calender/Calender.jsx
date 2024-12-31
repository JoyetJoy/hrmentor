import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import { Plus, ArrowRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RosterHeader from "@/components/common/RosterHeader";
import { useNavigate } from "react-router-dom";
import NewRoster from "@/components/popups/master/roster/NewRoster";
import { useQuery } from "@tanstack/react-query";
import { newRequest, ROASTER_LIST_GET } from "@/api/master";
import { ACTIVE_EMPLOYEE } from "@/api";
import { dividerClasses } from "@mui/material";
import RosterItemList from "@/components/sidebars/roster/Index";

const departmentOptions = [
  { value: "emergency", label: "Emergency Department" },
  { value: "cardiology", label: "Cardiology" },
  { value: "radiology", label: "Radiology" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "oncology", label: "Oncology" },
];

const employee = [
  { value: "Harshal", label: "Harshal" },
  { value: "Amit", label: "Amit" },
];
const months = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: dayjs().month(i).format("MMMM"),
}));

const years = Array.from({ length: 11 }, (_, i) => ({
  value: 2020 + i,
  label: (2020 + i).toString(),
}));

const RosterCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [popupOpen, setPopupOpen] = useState(false);
  const year = dayjs(date).year();
  const month = dayjs(date).month() + 1;
  const navigate = useNavigate();
  const [activeEmployee, setActiveEmployee] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("");
  const [activeWorkArea, setActiveWorkArea] = useState("");
  const [activeLocation, setActiveLocation] = useState("");

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
        .get(ROASTER_LIST_GET, {
          params: {
            month,
            year,
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

  const handleClick = (event,date) => {
    if (!event?.isHoliday) {
      const selectdate = dayjs(date).format("YYYY-MM-DD");
        if(date){
          navigate(`/admin/roster/calendarview?id=${event?.id}&date=${selectdate}`);
        }
    }
  };

  function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  }

  const addRoster = () => {
    setPopupOpen(true);
  };

  return (
    <div className="flex gap-2">
      <RosterItemList
        activeDepartment={activeDepartment}
        setActiveDepartment={setActiveDepartment}
        activeLocation={activeLocation}
        setActiveLocation={setActiveLocation}
        activeWorkArea={activeWorkArea}
        setActiveWorkArea={setActiveWorkArea}
      />
      <>
        <NewRoster popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
        <div className="flex flex-row py-4">
          <div>
            <div className="flex w-full items-center justify-between px-4 py-2">
              <div className="flex items-center gap-4">
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
                    (monthOption) =>
                      monthOption.value === dayjs(date).month() + 1,
                  )}
                  placeholder={dayjs(date).format("MMMM")}
                  className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
                />
              </div>
              <div className="flex gap-2">
                <Select
                  options={employee}
                  isSearchable={true}
                  onChange={(option) => setActiveEmployee(option?.id || "")}
                  styles={customSelectStyles}
                  placeholder={"All employee"}
                  className="input-box h-10 w-52 rounded-md border-[#C2C1C1] p-0 caret-white focus:border-[#C2C1C1]"
                />
                <button
                  onClick={() => addRoster()}
                  className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-[#030E5C]/70 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  <Plus className="size-4" />
                  Add Roster
                </button>
              </div>
            </div>
            <div className="ml-4 mt-7 w-full max-w-6xl">
              <Calendar
                key={date}
                onChange={handleDateChange}
                value={date}
                showNavigation={false}
                className="w-full font-monorope"
                locale="en-US"
                formatShortWeekday={(locale, date) =>
                  dayjs(date).format("dddd")
                }
                tileContent={({ date, view }) => {
                  if (view === "month") {
                    const {
                      holidayEvents,
                      shiftEvents,
                      availableSlots,
                      requestedSlots,
                    } = findEvents(date);
                    console.log(shiftEvents);
                    

                    return (
                      <div className="overflow-y-min relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
                        <>
                          <div className="absolute -top-6 right-0 flex flex-col items-end">
                            {availableSlots?.map((slot, index) => (
                              <img
                                key={`available-slot-${index}`}
                                onClick={() => {
                                  setClaimPopup(true);
                                  setSelectedField(slot);
                                }}
                                src="/assets/icons/employee_access/header/availableshift.svg"
                                alt=""
                              />
                            ))}
                            {requestedSlots?.map((slot, index) => (
                              <img
                                key={index}
                                src="/assets/icons/employee_access/header/requested_slot.svg"
                                alt=""
                              />
                            ))}
                          </div>
                          {shiftEvents?.slice(0, 2)?.map((event, index) => (
                            <div
                              key={index}
                              onClick={() => handleClick(event,date)}
                              className={`mt-2 flex h-[3.8rem] w-auto flex-col rounded-sm border-l-4 px-3 py-3 lg:w-36 xl:w-44 ${getTileClass(
                                date,
                                event,
                              )} justify-center text-gray-800`}
                            >
                              <span className="float-start flex text-[0.8rem] font-semibold">
                                {event.shift_name}
                              </span>
                              <span className="float-start flex text-[12px]">
                                {convertTo12HourFormat(
                                  event?.shift?.start_time,
                                )}
                                -{convertTo12HourFormat(event?.shift?.end_time)}
                              </span>
                              <div className="flex w-full items-center justify-between">
                                <span className="float-start flex text-[12.2px] font-semibold">
                                  Employee:{" "}
                                  {event?.assigned_total_employee_count || 0}/
                                  {event?.people_required || 0}
                                </span>
                                <ArrowRight
                                  onClick={() => handleClick(event)}
                                  size={16}
                                  color="#848484"
                                  strokeWidth={1.5}
                                />
                              </div>
                            </div>
                          ))}
                        </>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default RosterCalendar;
