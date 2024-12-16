import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import LeaveSideBar from "@/components/sidebars/employee_access/leave/LeaveSideBar";
import QueryTable from "@/components/table/QueryTable";
import { Eye, PlusIcon, Search } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import dayjs from "dayjs";
import { customSelectStyles } from "@/utils/customStyles";
import AddLeave from "@/components/popups/employee_access/leave/AddLeave";
import ViewLeave from "@/components/popups/employee_access/leave/ViewLeave";

export default function Leave() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
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
  const columns = React.useMemo(
    () => [
      {
        header: "Sl.no",
        accessorKey: "sno",
        cell: ({ row }) => {
          return (
            <div className="">
              NA
              {/* {row.index + 1 + (currentPage - 1) * pageLimit} */}
            </div>
          );
        },
      },
      {
        header: "Start date",
        accessorKey: "date",
        cell: ({ row }) => (
          <div className="">
            <p>
              {row?.original?.first_name} {row?.original?.sur_name || "NA"}
            </p>
          </div>
        ),
      },
      {
        header: "End date",
        accessorKey: "tue",
        cell: ({ row }) => (
          <p className="">{row?.original?.employee?.unique_id || "NA"}</p>
        ),
      },
      {
        header: "Leave type",
        accessorKey: "type",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.employee?.designation?.designation_name || "NA"}
          </p>
        ),
      },
      {
        header: "Leave Count",
        accessorKey: "count",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.employee?.employment_type?.employment_type_name ||
              "NA"}
          </p>
        ),
      },
      {
        header: "LOP days",
        accessorKey: "days",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.employee?.department?.department_name || "NA"}
          </p>
        ),
      },
      {
        header: "Approval Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <p className="bg-darkgreen px-3 py-2 text-textcolor-green">
            {row?.original?.employee?.work_location?.work_location_name || "NA"}
          </p>
        ),
      },
      {
        header: "Approval date",
        accessorKey: "date",
        cell: ({ row }) => (
          <div className="whitespace-nowrap">
            {row?.original?.employee?.employment_status?.status_name || "NA"}
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
      <AddLeave popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      <MenuHeaderEmployeeAccess pathlink={""} currentpage={"Leave"} />
      <div className="flex w-full items-center justify-between px-4 py-2">
        <h5 className="text-md font-bold">My Leave</h5>
      </div>
      <div className="flex gap-3">
        <LeaveSideBar />
        <div className="flex flex-col gap-3">
          <img src="/assets/images/employee_access/leave.png" alt="" />
          <div className="max-w-8xl mb-10 w-full rounded-md bg-white p-5">
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
                <Link
                to="/employee-access/leave/team-request"
                  className="flex w-fit items-center whitespace-nowrap justify-center gap-2 rounded-md bg-black px-3 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  <PlusIcon className="size-5" />
                  Team Leave Request
                </Link>
                <Link
                  onClick={handleClick}
                  className="flex w-fit items-center whitespace-nowrap justify-center gap-2 rounded-md bg-hrmprimaryorange px-3 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
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
