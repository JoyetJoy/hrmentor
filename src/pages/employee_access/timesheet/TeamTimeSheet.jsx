import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { ChevronRight, Eye, LogIn, LogInIcon, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import TeamTimeTracker from "@/components/popups/employee_access/timesheet/team/TeamTimeTracker";
import TeamTimeSheetSideBar from "@/components/sidebars/employee_access/timesheet/TeamTimeSheetSideBar";
import TeamAddManually from "@/components/popups/employee_access/timesheet/team/AddManually";
import { useQuery } from "@tanstack/react-query";
import { newRequest, TEAM_TIMESHEET_EMPLOYEELIST } from "@/api/master";
import { ACTIVE_EMPLOYEE } from "@/api";

export default function TeamTimeSheet() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
  const pageLimit = 10;
  const [teamTimeTrackerPopupOpen, setTeamTimeTrackerPopupOpen] =
    useState(false);

  const [date, setDate] = useState(new Date());
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [weeks, setWeeks] = useState([]);
  const [activeEmployee, setActiveEmployee] = useState("");

  const { data: employee } = useQuery({
    queryKey: ["employee"],
    queryFn: () => newRequest.get(ACTIVE_EMPLOYEE).then((res) => res.data),
  });

  // Fetch the data for the selected week
  const { data: timesheetlist, refetch } = useQuery({
    queryKey: ["timesheetlist", selectedWeek, date,activeEmployee], // Unique query key
    queryFn: () =>
      newRequest.get(TEAM_TIMESHEET_EMPLOYEELIST).then((res) => res.data),
  });

  // Trigger the query on mount and when selectedWeek > 0
  useEffect(() => {
    if (selectedWeek > 0) {
      refetch();
    }
  }, [selectedWeek, refetch]);

  // Calculate months and years
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: dayjs().month(i).format("MMMM"),
  }));

  const years = Array.from({ length: 11 }, (_, i) => ({
    value: 2020 + i,
    label: (2020 + i).toString(),
  }));

  // Calculate weeks based on selected month and year
  useEffect(() => {
    const daysInMonth = dayjs(date).daysInMonth();
    const newWeeks = Array.from(
      { length: Math.ceil(daysInMonth / 7) },
      (_, i) => ({
        value: i + 1,
        label: `Week ${i + 1}`,
      }),
    );
    setWeeks(newWeeks);

    const today = dayjs(); // Current date
    if (
      today.month() === dayjs(date).month() &&
      today.year() === dayjs(date).year()
    ) {
      const firstDayOfMonth = dayjs(date).startOf("month");
      const defaultWeek = Math.ceil(today.diff(firstDayOfMonth, "day") / 7);
      setSelectedWeek(defaultWeek);
    } else {
      setSelectedWeek(1);
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
      .add((selectedWeek - 1) * 7, "day");
    const endOfWeek = startOfWeek.add(6, "day");
    return {
      start: startOfWeek.format("YYYY-MM-DD"),
      end: endOfWeek.format("YYYY-MM-DD"),
    };
  };

  // Calculate week dates for the selected week
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    // Calculate the start of the week (Monday)
    const startOfWeek = dayjs(date)
      .startOf("month") // Start of the month
      .add((selectedWeek - 1) * 7, "day") // Adjust for the selected week
      .startOf("week") // Start of the week (Sunday by default)
      .add(1, "day") // Adjust to Monday (add one day)
      .add(i, "day"); // Add days to get Monday to Sunday

    return {
      day: startOfWeek.format("ddd"), // Abbreviated day (Mon, Tue, ...)
      date: startOfWeek.format("MMM DD"), // Display the date (e.g., Jan 01)
      fullDate: startOfWeek.format("YYYY-MM-DD"),
    };
  });

  const { end } = getStartAndEndOfWeek();

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":"); // Split the time into hours, minutes, and seconds
    return `${hours} hr ${minutes} min`;
  };

  const columns = React.useMemo(
    () => [
      {
        header: "Employee Name",
        accessorKey: "mon",
        cell: ({ row }) => (
          <div className="px-3 py-2 text-sm font-bold">
            <p>{row?.original?.employee_detail?.first_name || "NA"}</p>
            <p>#{row?.original?.employee_detail?.id}</p>
          </div>
        ),
      },
      {
        header: "Total Worked Hours",
        accessorKey: "sno",
        cell: ({ row }) => (
          <div className="px-3 py-2 text-sm font-bold">
            {row?.original?.total_working_hours}
          </div>
        ),
      },
      ...weekDays?.map((dayObj) => ({
        header: (
          <div className="text-center">
            <span className="text-sm font-bold capitalize text-gray-darkpale">
              {dayObj.day}
            </span>
            <p className="font-medium">{dayObj.date}</p>
          </div>
        ),
        accessorKey: dayObj.fullDate, // Unique key for each day
        cell: ({ row }) => {
          const dayData = row?.original?.days_hours?.find(
            (data) => data.date === dayObj.fullDate,
          );

          return (
            <div className="text-sm font-bold capitalize text-gray-darkpale">
              <p>{dayData?.working_hours || "00:00"}</p>
              {dayData?.over_time && (
                <p className="font-medium text-[#e95d39]">
                  [OT:{dayData?.over_time || ""}]
                </p>
              )}
              {dayData?.break_time && (
                <p className="font-medium">BT:{dayData?.break_time || "NA"}</p>
              )}
            </div>
          );
        },
      })),
      {
        header: "",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center justify-start gap-3 text-xs">
            <Link
              to={""}
              className="flex cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <Eye className="size-3" />
            </Link>
          </div>
        ),
      },
    ],
    [weekDays],
  );

  const handleClick = () => {
    setTeamTimeTrackerPopupOpen(true);
  };
  const handleAddClick = () => {
    setPopupOpen(true);
  };
  return (
    <div className="flex flex-col h-screen">
      <TeamTimeTracker
        teamTimeTrackerPopupOpen={teamTimeTrackerPopupOpen}
        setTeamTimeTrackerPopupOpen={setTeamTimeTrackerPopupOpen}
      />
      <TeamAddManually popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      <MenuHeaderEmployeeAccess
        pathlink={""}
        subMenu={"Time Sheet"}
        icon={<ChevronRight className="size-3" />}
        currentpage={" My Time Sheet"}
      />
      <div className="flex w-full items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <h5 className="text-md font-bold">My Team Sheet</h5>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to=""
            onClick={handleAddClick}
            className="flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            <PlusIcon />
            Add Manually
          </Link>
          <Link
            to="/employee-access/timesheet"
            className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            My Team Sheet
          </Link>
        </div>
      </div>
      <div className="max-w-8xl mb-10 mt-2 flex  w-full gap-3">
        <TeamTimeSheetSideBar
          years={years}
          months={months}
          weeks={weeks}
          handleWeekChange={handleWeekChange}
          selectedWeek={selectedWeek}
          handleMonthChange={handleMonthChange}
          date={date}
          type={"timesheet"}
          handleYearChange={handleYearChange}
          employeelist={timesheetlist}
          employee={employee}
          setActiveEmployee={setActiveEmployee}
        />
        <QueryTable
          columns={columns}
          list={timesheetlist?.employee_data}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
