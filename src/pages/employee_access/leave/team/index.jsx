import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import LeaveSideBar from "@/components/sidebars/employee_access/leave/LeaveSideBar";
import QueryTable from "@/components/table/QueryTable";
import { Eye, PlusIcon, Search, Trash, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import dayjs from "dayjs";
import { customSelectStyles } from "@/utils/customStyles";
import AddLeave from "@/components/popups/employee_access/leave/AddLeave";
import ViewLeave from "@/components/popups/employee_access/leave/ViewLeave";
import { EMPLOYEE_TEAM_LEAVE_APPLICATIONS } from "@/api/master";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "@/api";
export default function TeamLeaveRequest() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [viewLeavePopupOpen, setViewLeavePopupOpen] = useState(false);

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: dayjs().month(i).format("MMMM"),
  }));

  const years = Array.from({ length: 11 }, (_, i) => ({
    value: 2020 + i,
    label: (2020 + i).toString(),
  }));
  const [employeeTeamHoliday, setEmployeeTeamHoliday] =
    useState("Team_Holiday");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const pageLimit = 10;

  const { data: employeeTeamHolidays } = useQuery({
    queryKey: ["employeeTeamHolidays"],
    queryFn: () =>
      newRequest.get(EMPLOYEE_TEAM_LEAVE_APPLICATIONS).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (employeeTeamHolidays) {
      setTotalPages(employeeTeamHolidays?.last_page);
    }
  }, [employeeTeamHolidays]);

  console.log(employeeTeamHolidays, "employeeTeamHolidaysemployeeTeamHolidays");

  const columns = React.useMemo(
    () => [
      {
        header: "Sl.no",
        accessorKey: "sno",
        cell: ({ row }) => {
          return (
            <div className="">
              {row.index + 1 + (currentPage - 1) * pageLimit}
            </div>
          );
        },
      },
      {
        header: "Employee ID",
        accessorKey: "id",
        cell: ({ row }) => (
          <div className="">
            <p>{row?.original?.unique_id}</p>
          </div>
        ),
      },
      {
        header: "Employee",
        accessorKey: "date",
        cell: ({ row }) => (
          <div className="">
            <p>{row?.original?.employee_name || "-"}</p>
          </div>
        ),
      },
      {
        header: "Start date",
        accessorKey: "date",
        cell: ({ row }) => (
          <div className="">
            <p>{row?.original?.from_date}</p>
          </div>
        ),
      },
      {
        header: "End date",
        accessorKey: "tue",
        cell: ({ row }) => <p className="">{row?.original?.to_date}</p>,
      },
      {
        header: "Leave type",
        accessorKey: "type",
        cell: ({ row }) => (
          <p className="">{row?.original?.leave_type_name || "NA"}</p>
        ),
      },
      {
        header: "Leave Count",
        accessorKey: "count",
        cell: ({ row }) => (
          <p className="">{row?.original?.leave_count || "-"}</p>
        ),
      },
      //   {
      //     header: "LOP days",
      //     accessorKey: "days",
      //     cell: ({ row }) => (
      //       <p className="">
      //         {row?.original?.employee?.department?.department_name || "NA"}
      //       </p>
      //     ),
      //   },
      {
        header: "Approval Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <p className="bg-darkgreen px-3 py-2 text-textcolor-green">
            {row?.original?.leave_status_name || "NA"}
          </p>
        ),
      },
      {
        header: "Approval date",
        accessorKey: "date",
        cell: ({ row }) => (
          <div className="whitespace-nowrap">
            {row?.original?.approval_date || "NA"}
          </div>
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center justify-start gap-3 text-xs">
            <Link
              onClick={handleClickView}
              className="flex cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <Eye className="size-3" />
            </Link>
            <button
              type="button"
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </button>
            <Link className="flex cursor-pointer items-center rounded-full bg-gray-soft p-2">
              <Trash2 className="size-3" />
            </Link>
          </div>
        ),
      },
    ],
    [],
  );
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  const handleClick = () => {
    setPopupOpen(true);
  };
  const handleClickView = () => {
    setViewLeavePopupOpen(true);
  };
  const handleMonthChange = (selectedOption) => {
    const updatedDate = dayjs(date).month(selectedOption.value).toDate();
    setDate(updatedDate);
  };
  const handleYearChange = (selectedOption) => {
    const updatedDate = dayjs(date).year(selectedOption.value).toDate();
    setDate(updatedDate);
  };

  const findEvent = (date) => {
    return events.find((event) => dayjs(event.date).isSame(date, "day"));
  };
  return (
    <div className="flex flex-col">
      <ViewLeave
        viewLeavePopupOpen={viewLeavePopupOpen}
        setViewLeavePopupOpen={setViewLeavePopupOpen}
      />
      <AddLeave
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        employeeTeamHoliday={employeeTeamHoliday}
      />
      <MenuHeaderEmployeeAccess pathlink={""} currentpage={"Leave"} />
      <div className="flex w-full items-center justify-between px-4 py-2">
        <h5 className="text-md font-bold">My Leave</h5>
      </div>
      <div className="flex gap-3">
        {/* <LeaveSideBar /> */}
        <div className="flex w-full flex-col gap-3">
          <div className="max-w-8xl mb-10 h-screen w-full rounded-md bg-white p-5">
            <div className="mb-2 flex w-full items-center justify-between py-2">
              <div className="flex items-center gap-3">
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
                <label className="input flex h-10 min-h-10 min-w-72 items-center gap-2 rounded-md border border-gray-soft outline-none">
                  <Search className="size-4 object-contain text-gray-dark" />
                  <input
                    type="text"
                    onChange={(e) => {
                      setKeyword(e.target.value);
                    }}
                    className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
                    placeholder="Search"
                  />
                </label>
                {/* <Link
                className="flex w-fit items-center whitespace-nowrap justify-center gap-2 rounded-md bg-black px-3 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                <PlusIcon className="size-5" />
                Team Leave Request
              </Link> */}
                <Link
                  onClick={handleClick}
                  className="flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md bg-hrmprimaryorange px-3 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  <PlusIcon className="size-5" />
                  Add Leave Request
                </Link>
              </div>
            </div>
            <QueryTable
              columns={columns}
              list={"NA"}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
