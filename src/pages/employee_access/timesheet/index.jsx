import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { Eye, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import TimeTracker from "@/components/popups/employee_access/timesheet/TimeTracker";
import AddManually from "@/components/popups/employee_access/timesheet/AddManually";

export default function TimeSheet() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [popupOpen, setPopupOpen] = useState(false);

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: dayjs().month(i).format("MMMM"),
  }));

  const years = Array.from({ length: 11 }, (_, i) => ({
    value: 2020 + i,
    label: (2020 + i).toString(),
  }));
  const handleMonthChange = (selectedOption) => {
    const updatedDate = dayjs(date).month(selectedOption.value).toDate();
    setDate(updatedDate);
  };
  const handleYearChange = (selectedOption) => {
    const updatedDate = dayjs(date).year(selectedOption.value).toDate();
    setDate(updatedDate);
  };
  const columns = React.useMemo(
    () => [
      {
        header: "Total Worked hours",
        accessorKey: "sno",
        cell: ({ row }) => {
          return (
            <div className="bg-darkgreen px-3 py-2">
              NA
              {/* {row.index + 1 + (currentPage - 1) * pageLimit} */}
            </div>
          );
        },
      },
      {
        header: "Mon",
        accessorKey: "mon",
        cell: ({ row }) => (
          <div className="bg-darkgreen px-3 py-2">
            <p>
              {row?.original?.first_name} {row?.original?.sur_name || "NA"}
            </p>
          </div>
        ),
      },
      {
        header: "Tue",
        accessorKey: "tue",
        cell: ({ row }) => (
          <p className="bg-darkgreen px-3 py-2">
            {row?.original?.employee?.unique_id || "NA"}
          </p>
        ),
      },
      {
        header: "Wen",
        accessorKey: "wed",
        cell: ({ row }) => (
          <p className="bg-darkgreen px-3 py-2">
            {row?.original?.employee?.designation?.designation_name || "NA"}
          </p>
        ),
      },
      {
        header: "Thue",
        accessorKey: "thue",
        cell: ({ row }) => (
          <p className="bg-darkgreen px-3 py-2">
            {row?.original?.employee?.employment_type?.employment_type_name ||
              "NA"}
          </p>
        ),
      },
      {
        header: "Fri",
        accessorKey: "fri",
        cell: ({ row }) => (
          <p className="bg-darkgreen px-3 py-2">
            {row?.original?.employee?.department?.department_name || "NA"}
          </p>
        ),
      },
      {
        header: "Sat",
        accessorKey: "sat",
        cell: ({ row }) => (
          <p className="bg-darkgreen px-3 py-2">
            {row?.original?.employee?.work_location?.work_location_name || "NA"}
          </p>
        ),
      },
      {
        header: "Sun",
        accessorKey: "sun",
        cell: ({ row }) => (
          <div className="whitespace-nowrap bg-darkgreen px-3 py-2">
            {row?.original?.employee?.employment_status?.status_name || "NA"}
          </div>
        ),
      },
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
    [],
  );
  const handleClick = () => {
    setPopupOpen(true);
  };
  return (
    <>
      <AddManually popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      {/* <TimeTracker  timeTrackerPopupOpen ={timeTrackerPopupOpen} setTimeTrackerPopupOpen={setTimeTrackerPopupOpen}/> */}
      <div className="flex h-screen flex-col">
        <MenuHeaderEmployeeAccess pathlink={""} currentpage={"Time Sheet"} />
        <div className="flex w-full items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <h5 className="text-md font-bold">My TimeSheet</h5>
            <Select
              options={years}
              isSearchable={true}
              onChange={handleYearChange}
              styles={customSelectStyles}
              className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
            />
            <Select
              options={months}
              isSearchable={true}
              onChange={handleMonthChange}
              styles={customSelectStyles}
              className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
            />
          </div>
          <div className="flex items-center gap-3">
            <Link
              to=""
              onClick={handleClick}
              className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <PlusIcon />
              Add Manually
            </Link>
            <Link
              to="/employee_access/timesheet/team"
              className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Team Time Sheet
            </Link>
          </div>
        </div>

        <div className="max-w-8xl mb-10 mt-3 w-full">
          <QueryTable
            columns={columns}
            list={"NA"}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
}
