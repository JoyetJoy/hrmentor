import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import { Eye, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import AddManually from "@/components/popups/employee_access/timesheet/AddManually";
import { TIME_SHEET, newRequest } from "@/api/master";
import { useQuery } from "@tanstack/react-query";
import { getISOWeek, format } from "date-fns";
import TimeTracker from "@/components/popups/employee_access/timesheet/TimeTracker";

export default function TimeSheet() {
  const [date, setDate] = useState(new Date());
  const [popupOpen, setPopupOpen] = useState(false);
  const [timeTrackerPopupOpen, setTimeTrackerPopupOpen] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedId, setSelectedId] = useState();

  const [weeks, setWeeks] = useState([]);

  // Calculate months and years
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: dayjs().month(i).format("MMMM"),
  }));

  const years = Array.from({ length: 11 }, (_, i) => ({
    value: 2020 + i,
    label: (2020 + i).toString(),
  }));

  useEffect(() => {
    const daysInMonth = dayjs(date).daysInMonth();
    const newWeeks = Array.from(
      { length: Math.ceil(daysInMonth / 7) },
      (_, i) => ({
        value: i + 1,
        label: `Week ${i + 1}`,
      })
    );
  
    setWeeks(newWeeks);
  
    // Reset selectedWeek when a new month is selected
    if (selectedWeek > newWeeks.length) {
      setSelectedWeek(1);
    } else {
      // Automatically set current week if within selected month & year
      const today = dayjs();
      
      if (today.month() === dayjs(date).month() && today.year() === dayjs(date).year()) {
        // Get the first Monday of the current month
        const firstMonday = dayjs().startOf("month").day(1);
        
        // If the first day of the month is after Monday, shift to the next Monday
        const adjustedFirstMonday = firstMonday.date() > 1 ? firstMonday.add(7, "day") : firstMonday;
      
        // Calculate the current week relative to the first Monday
        const currentWeek = Math.ceil(today.diff(adjustedFirstMonday, "day") / 7) + 1;
      
        setSelectedWeek(currentWeek);
      } else {
        setSelectedWeek(1);
      }
    }
  }, [date]);
  
  // Handle month change
  const handleMonthChange = (selectedOption) => {
    const updatedDate = dayjs(date).month(selectedOption.value).toDate();
    setDate(updatedDate);
    setSelectedWeek(1); // Reset to the 1st week on month change
  };

  // Handle year change
  const handleYearChange = (selectedOption) => {
    const updatedDate = dayjs(date).year(selectedOption.value).toDate();
    setDate(updatedDate);
    setSelectedWeek(1); // Reset to the 1st week on year change
  };

  // Handle week change
  const handleWeekChange = (selectedOption) => {
    setSelectedWeek(selectedOption.value);
  };

  // Calculate the start and end dates for the selected week
  const getStartAndEndOfWeek = () => {
    const startOfWeek = dayjs(date)
      .startOf("month")
      .add((selectedWeek - 1) * 7, "day")
      .startOf("week") // Start of the week (Sunday)
      .add(1, "day"); // Adjust to Monday
  
    const endOfWeek = startOfWeek.add(6, "day"); // Sunday
  
    return {
      start: startOfWeek.format("YYYY-MM-DD"),
      end: endOfWeek.format("YYYY-MM-DD"),
    };
  };
  

  // Calculate week dates for the selected week
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const startOfWeek = dayjs(date)
      .startOf("month")
      .add((selectedWeek - 1) * 7, "day")
      .startOf("week") // Start of the week (Sunday)
      .add(1, "day") // Adjust to Monday
      .add(i, "day"); // Get the rest of the week (Monday - Sunday)
  
    return {
      day: startOfWeek.format("ddd"), // Abbreviated day (Mon, Tue, ...)
      date: startOfWeek.format("MMM DD"), // Display the date (e.g., Jan 01)
      fullDate: startOfWeek.format("YYYY-MM-DD"),
    };
  });

  const { start,end } = getStartAndEndOfWeek();
  
  // Fetch the data for the selected week
  const { data: events, refetch } = useQuery({
    queryKey: ["events", selectedWeek, date], // Unique query key
    queryFn: () =>
      newRequest.get(`${TIME_SHEET}/${end}`).then((res) => res.data),
  });

  // Trigger the query on mount and when selectedWeek > 0
  useEffect(() => {
    if (selectedWeek > 0) {
      refetch();
    }
  }, [selectedWeek, refetch]);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours} hr ${minutes} min`;
  };
  
  return (
    <>
    <TimeTracker timeTrackerPopupOpen={timeTrackerPopupOpen} setTimeTrackerPopupOpen={setTimeTrackerPopupOpen} selectedId={end} weekDays={weekDays} />
      <AddManually popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      <div className="flex flex-col h-screen">
        <MenuHeaderEmployeeAccess pathlink={""} currentpage={"Time Sheet"} />
        <div className="flex w-full items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <h5 className="text-md font-bold">My TimeSheet</h5>
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
                (monthOption) => monthOption.value === dayjs(date).month(),
              )}
              placeholder={dayjs(date).format("MMMM")}
              className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
            />
            <Select
              options={weeks}
              isSearchable={true}
              onChange={handleWeekChange}
              styles={customSelectStyles}
              value={weeks.find(
                (weekOption) => weekOption.value === selectedWeek,
              )}
              placeholder={`Week ${selectedWeek}`}
              className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
            />
          </div>
          <div className="flex items-center gap-3">
            {/* <Link
              to=""
              onClick={() => setPopupOpen(true)}
              className="flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <PlusIcon />
              Add Manually
            </Link> */}
            {/* <Link
              to="/employee-access/timesheet/team"
              className="flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Team Time Sheet
            </Link> */}
          </div>
        </div>
        <div className="w-full rounded-md border border-gray-300 bg-white pb-2">
          <div className="table mx-auto w-full">
            <table style={{ borderSpacing: "0", width: "100%" }}>
              <thead className="overflow-hidden rounded-md bg-gray-soft">
                <tr>
                  <th className="text-sm font-bold capitalize text-gray-darkpale">
                    Total Worked hours
                  </th>
                  {weekDays?.map((dayObj, index) => (
                    <th
                      key={index}
                      className="text-sm font-bold capitalize text-gray-darkpale"
                    >
                      {dayObj.day} <p className="font-medium">{dayObj.date}</p>
                    </th>
                  ))}
                  <th className="text-sm font-semibold capitalize text-gray-darkpale">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="borde-b-2 borde-[#C0C0C0] text-left last:border-none">
                  <td className="justify-end text-[0.8rem] font-medium capitalize text-gray-darkpale">
                    {events?.days_hours?.length > 0
                      ? formatTime(events?.total_working_hours)
                      : "00Hr 00Min"}
                  </td>
                  {weekDays?.map((dayObj, index) => {
                    // Convert weekDays date to match the format in events.days_hours
                    const formattedWeekDate = dayjs(dayObj.fullDate).format(
                      "YYYY-MM-DD",
                    );

                    // Find matching data from events.days_hours
                    const dayData = events?.days_hours?.find(
                      (data) => data.date === formattedWeekDate,
                    );

                    return (
                      <td
                        key={index}
                        className="text-[12px] font-bold capitalize text-gray-darkpale"
                      >
                        {dayData ? (
                          <>
                            <span className="flex gap-4">
                              {formatTime(dayData.working_hours || "00:00:00")}
                            </span>

                            <span className="text-[0.75rem] font-medium">
                              BT: {formatTime(dayData.break_time || "00:00:00")}
                            </span>
                            <p className="text-[0.75rem] font-medium text-red-500">
                              [OT:{formatTime(dayData.over_time)}]
                            </p>
                          </>
                        ) : (
                          <>
                            <span className="flex gap-4">00 Hr 00 Min</span>
                            {/* <span className="text-[0.75rem] font-medium">
                              BT: 00 Hr 00 Min
                            </span>
                            <p className="text-[0.75rem] font-medium text-red-500">
                              [OT:00 Hr 00 Min]
                            </p> */}
                          </>
                        )}
                      </td>
                    );
                  })}
                  <td className="flex items-center justify-start gap-3 text-xs">
                    <div
                      onClick={()=>{setTimeTrackerPopupOpen(true)
                        // setSelectedId(row.original.id);

                      }}
                      className="flex cursor-pointer items-center rounded-full bg-gray-soft p-2"
                    >
                      <Eye className="size-3" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
