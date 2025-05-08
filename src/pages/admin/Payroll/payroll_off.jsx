import QueryTable from "@/components/table/QueryTable";
import { Eye, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayrollHeader from "@/components/employee_access/common/PayrollHeader";
import { useQuery } from "@tanstack/react-query";
import { PAYROLL_LIST_GET, PAYROLL_PAYPERIOD_GET } from "@/api/payroll";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { newRequest } from "@/api";
import { customSelectStyles } from "@/utils/customStyles";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { EMPLOYEE_DEPARTMENT_LIST } from "@/api/master";
import { getCurrentDateISO } from "@/utils/helpers";

const custom = [
  {
    label: "2 week",
    value: "3",
  },
  {
    label: "4 week",
    value: "4",
  },
];

export default function PayrollOff() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const navigate = useNavigate();
  const { control } = useForm();
  const [monthValue, setMonthValue] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customVal, setCustomVal] = useState("");
  const pageLimit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["payperiod", monthValue],
    queryFn: () =>
      newRequest
        .get(PAYROLL_PAYPERIOD_GET, { params: { pay_schedule: monthValue } })
        .then((res) => res.data),
    enabled: !!monthValue,
  });

  const { data: payrollList } = useQuery({
    queryKey: ["payrollList", startDate],
    queryFn: () =>
      newRequest
        .get(PAYROLL_LIST_GET, {
          params: {
            pay_schedule: monthValue,
            start_date: startDate,
            end_date: endDate,
            page: currentPage,
            per_limit: pageLimit,
          },
        })
        .then((res) => res.data),
    enabled: !!startDate,
  });

  const { data: departmentListing } = useEmployeeMaster(
    EMPLOYEE_DEPARTMENT_LIST,
    "employeeDepartmentList",
  );

  const formatDateRange = (startDate) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };

    const formattedStartDate = new Date(startDate).toLocaleDateString(
      "en-GB",
      options,
    );
    return formattedStartDate;
  };

  const getWeekDayDate = (targetDay, referenceDate = new Date()) => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const referenceDayIndex = referenceDate.getDay();
    const targetDayIndex = daysOfWeek.indexOf(targetDay);

    // Ensure the target day is within the current week
    let daysDifference = targetDayIndex - referenceDayIndex;
    if (daysDifference < 0) {
      daysDifference += 7; // Go backward to find the same week's day
    }

    const targetDate = new Date(referenceDate);
    targetDate.setDate(
      referenceDate.getDate() - referenceDayIndex + targetDayIndex,
    );
    return targetDate;
  };

  useEffect(() => {
    if (monthValue === "1" && data) {
      const { star_day, end_day } = data;

      const startDate = getWeekDayDate(star_day);
      const endDate = getWeekDayDate(
        end_day,
        new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000),
      ); // Add 7 days for the next week

      setStartDate(formatDateRange(startDate));
      setEndDate(formatDateRange(endDate));
    } else if (monthValue === "2" && data) {
      setStartDate(formatDateRange(data?.start_date));
      setEndDate(formatDateRange(data?.end_date));
    } else if (monthValue === "3" && data) {
      setStartDate(formatDateRange(data?.first_pay_term?.start_date));
      setEndDate(formatDateRange(data?.first_pay_term?.end_date));
    }
  }, [monthValue, data]);

  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "sno",
        cell: ({ row }) => (
          <div className="flex px-2">
            {row.index + 1 + (currentPage - 1) * pageLimit}
          </div>
        ),
      },
      {
        header: "Department",
        accessorKey: "department_name",
      },
      {
        header: "Total Employee",
        accessorKey: "employee_count",
      },
      {
        header: "Total Hours",
        accessorKey: "total_overtime",
      },
      {
        header: "OT Hours",
        accessorKey: "total_overtime",
      },
      {
        header: "Net Pay",
        accessorKey: "departmentTotalSalary",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div
            className={`flex items-center justify-center gap-2 rounded-md py-2 ${row.original.status === "Pay off generated" ? "bg-[#ccf0da] text-[#13ba56]" : "bg-[#f8f2f8] text-[#7e0880]"}`}
          >
            {row.original.status}
          </div>
        ),
      },

      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                navigate(
                  `/admin/payroll/payoffdetail/${row.original?.department_id || "default"}` +
                    `?start_date=${startDate ? getCurrentDateISO(startDate) : "0"}&end_date=${getCurrentDateISO(endDate) || "0"}`,
                );
              }}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <Eye className="size-3" />
            </button>
          </div>
        ),
      },
    ],
    [startDate,endDate],
  );
  return (
    <>
      <PayrollHeader page={3} />
      <div className="min-h-screen bg-gray-100 py-6">
        {/* Header Navigation */}
        <div className="mb-4 flex items-center justify-between">
          {/* Left Section */}
          <div>
            <h4 className="text-lg font-bold">Payoff</h4>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMonthValue("1")}
              className={`rounded-md border px-4 py-2 text-sm ${
                monthValue === "1"
                  ? "bg-[#e95d39] text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Weekly
            </button>

            <button
              onClick={() => setMonthValue("2")}
              className={`rounded-md border px-4 py-2 text-sm ${
                monthValue === "2"
                  ? "bg-[#e95d39] text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Monthly
            </button>

            <div className="relative">
              <button
                onClick={() => setMonthValue("5")}
                className={`w-20 rounded-md border px-4 py-2 text-left text-sm ${
                  monthValue === "5"
                    ? "bg-[#e95d39] text-white"
                    : monthValue === "3"
                      ? "bg-[#e95d39] text-white"
                      : monthValue === "4"
                        ? "bg-[#e95d39] text-white"
                        : "bg-white text-gray-600"
                }`}
              >
                {customVal ? customVal : "Custom"}
              </button>

              {monthValue === "5" && (
                <ul className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-md">
                  {custom.map((option) => (
                    <li
                      key={option.value}
                      className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-200"
                      onClick={() => {
                        setCustomVal(option.label);
                        setMonthValue(option.value);
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label className="input flex h-10 min-h-10 items-center gap-2 rounded-md border-none pr-28 outline-none">
              <Search className="size-4 object-contain text-gray-dark" />
              <input
                type="text"
                className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
                placeholder="Search"
              />
            </label>
            <Controller
              name="department_id"
              className=" "
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isSearchable={true}
                  styles={customSelectStyles}
                  options={departmentListing}
                  placeholder="Select Department"
                  className="input-box min-w-[13rem] bg-white"
                />
              )}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-2">
          <QueryTable
            columns={columns}
            list={payrollList}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
}
