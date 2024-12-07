import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { ChevronRight, Eye, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import TeamTimeTracker from "@/components/popups/employee_access/timesheet/team/TeamTimeTracker";
import TeamTimeSheetSideBar from "@/components/sidebars/employee_access/timesheet/TeamTimeSheetSideBar";
import TeamAddManually from "@/components/popups/employee_access/timesheet/team/AddManually";
import { useQuery } from "@tanstack/react-query";

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
    const [hours, minutes] = time.split(":"); // Split the time into hours, minutes, and seconds
    return `${hours} hr ${minutes} min`;
  };
  console.log(date);

  const columns = React.useMemo(
    () => [
      {
        header: "Employee Name",
        accessorKey: "mon",
        cell: ({ row }) => (
          <div className="bg-blurecool px-3 py-2">
            <p>{row?.original?.first_name || "NA"}</p>
            <p>
              #{row?.original?.first_name} {row?.original?.sur_name || "NA"}
            </p>
          </div>
        ),
      },
      {
        header: "Total Worked Hours",
        accessorKey: "sno",
        cell: ({ row }) => (
          <div className="px-3 py-2">
            {/* Replace "NA" with the actual calculation */}
            NA
          </div>
        ),
      },
      ...weekDays.map((dayObj) => ({
        header: (
          <div className="text-center">
            <span className="text-sm font-bold capitalize text-gray-darkpale">
              {dayObj.day}
            </span>
            <p className="font-medium">{dayObj.date}</p>
          </div>
        ),
        accessorKey: dayObj.fullDate, // Unique key for each day
        cell: ({ row }) => (
          <div className="text-sm font-bold capitalize text-gray-darkpale">
            {/* You can customize this to show the respective data */}
            {row?.original?.[dayObj.fullDate] || "NA"}
          </div>
        ),
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
    <div className="flex flex-col">
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
      <div className="max-w-8xl mb-10 mt-2 flex w-full gap-3">
        <TeamTimeSheetSideBar
          years={years}
          months={months}
          weeks={weeks}
          handleWeekChange={handleWeekChange}
          selectedWeek={selectedWeek}
          handleMonthChange={handleMonthChange}
          date={date}
          handleYearChange={handleYearChange}
        />
        <QueryTable
          columns={columns}
          list={"NA"}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
