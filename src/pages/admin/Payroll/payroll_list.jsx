import QueryTable from "@/components/table/QueryTable";
import { ChevronLeft, ChevronRight, Eye, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import PayrollHeader from "@/components/employee_access/common/PayrollHeader";
import { useNavigate } from "react-router-dom";
import { EMPLOYEE_DEPARTMENT_LIST } from "@/api/master";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "@/api";
import Loader from "@/components/ui/Loader";
import { PAYROLL_LIST_GET, PAYROLL_PAYPERIOD_GET } from "@/api/payroll";
import { formatDateRange } from "@/utils/helpers";
import dayjs from "dayjs";
import { formatDate } from "@/utils/date";
import { usePermissionStore } from "@/lib/slices/auth.slice";
import { CREATE_PAYRUN } from "@/api/setup";
import toast from "react-hot-toast";

const getWeekDayDate = (targetDay, referenceDate = new Date()) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Adjust reference day index to match our array (Monday = 0, ..., Sunday = 6)
  const referenceDayIndex = referenceDate.getDay();
  const adjustedReferenceDayIndex =
    referenceDayIndex === 0 ? 6 : referenceDayIndex - 1;

  const targetDayIndex = daysOfWeek.indexOf(targetDay);
  if (targetDayIndex === -1) {
    throw new Error("Invalid targetDay provided.");
  }

  let daysDifference = targetDayIndex - adjustedReferenceDayIndex;

  // Ensure startDate is in the current week and endDate is after startDate
  const targetDate = new Date(referenceDate);
  targetDate.setDate(referenceDate.getDate() + daysDifference);

  return targetDate;
};

export default function PayrollList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const navigate = useNavigate();
  const { control } = useForm();
  const [monthValue, setMonthValue] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loader, setLoader] = useState(false);
  const pageLimit = 10;

  const { permissions } = usePermissionStore((state) => ({
    permissions: state.permissions,
  }));

  const { data, isLoading } = useQuery({
    queryKey: ["payperiod", monthValue],
    queryFn: () =>
      newRequest
        .get(PAYROLL_PAYPERIOD_GET, { params: { pay_schedule: monthValue } })
        .then((res) => res.data),
    enabled: !!monthValue,
  });

  const start = dayjs(startDate).format("YYYY-MM-DD");
  const end = dayjs(endDate).format("YYYY-MM-DD");

  const { data: payrollList } = useQuery({
    queryKey: ["payrollList", start],
    queryFn: () =>
      newRequest
        .get(PAYROLL_LIST_GET, {
          params: {
            schedule: monthValue,
            start_date: start,
            end_date: end,
            page: currentPage,
            per_limit: pageLimit,
          },
        })
        .then((res) => res.data),
    enabled: !!start,
  });

  useEffect(() => {
    if (monthValue === "1" && data) {
      const { star_day, end_day } = data;
  
      const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
      // Use date 7 days ago as reference
    const referenceDate = new Date();
    referenceDate.setDate(referenceDate.getDate() - 7);
  
      // Get index of today and start_day
      const todayIndex = referenceDate.getDay(); // 0 (Sun) - 6 (Sat)
      const startIndex = weekdays.indexOf(star_day?.toUpperCase());
      const endIndex = weekdays.indexOf(end_day?.toUpperCase());
  
      // Calculate this week's start date for the given star_day
      const startDate = new Date(referenceDate);
      startDate.setDate(referenceDate.getDate() - ((todayIndex - startIndex + 7) % 7));
  
      // Calculate end date based on end_day
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + ((endIndex - startIndex + 7) % 7));
  
      setStartDate(formatDateRange(startDate));
      setEndDate(formatDateRange(endDate));
    } else if (
      (monthValue === "2" || monthValue === "3" || monthValue === "4") &&
      data
    ) {
      setStartDate(formatDateRange(data?.start_date));
      setEndDate(formatDateRange(data?.end_date));
    }
  }, [monthValue, data]);
  
  const handlePreviousPeriod = () => {
    const newEndDate = new Date(
      new Date(startDate).getTime() - 24 * 60 * 60 * 1000,
    ); // Decrement startDate by 1 day

    if (monthValue === "1") {
      const newStartDate = new Date(
        newEndDate.getTime() - 6 * 24 * 60 * 60 * 1000,
      ); // Weekly: Subtract 6 days
      setStartDate(formatDateRange(newStartDate));
      setEndDate(formatDateRange(newEndDate));
    } else if (monthValue === "2") {
      const prevMonth = new Date(newEndDate);
      prevMonth.setMonth(prevMonth.getMonth() - 1); // Move back one month
      prevMonth.setDate(new Date(startDate).getDate()); // Preserve the day of the month

      setStartDate(formatDateRange(prevMonth));
      setEndDate(formatDateRange(newEndDate));
    } else if (monthValue === "3") {
      const endOfPreviousMonth = new Date(newEndDate);
      endOfPreviousMonth.setMonth(endOfPreviousMonth.getMonth(), 0); // End of previous month
      const midMonth = new Date(endOfPreviousMonth);
      midMonth.setDate(15); // Set to the 15th of the month
      setStartDate(formatDateRange(midMonth));
      setEndDate(formatDateRange(endOfPreviousMonth));
    }
  };

  const handleNextPeriod = () => {
    const newStartDate = new Date(
      new Date(endDate).getTime() + 24 * 60 * 60 * 1000,
    ); // Increment endDate by 1 day

    if (monthValue === "1") {
      const newEndDate = new Date(
        newStartDate.getTime() + 6 * 24 * 60 * 60 * 1000,
      ); // Weekly: Add 6 days
      setStartDate(formatDateRange(newStartDate));
      setEndDate(formatDateRange(newEndDate));
    } else if (monthValue === "2") {
      const newEndDate = new Date(newStartDate);
      newEndDate.setMonth(newEndDate.getMonth() + 1); // Move to next month
      newEndDate.setDate(newStartDate.getDate() - 1); // Set end date to one day before the same day next month

      setStartDate(formatDateRange(newStartDate));
      setEndDate(formatDateRange(newEndDate));
    } else if (monthValue === "3") {
      const newEndDate = new Date(
        newStartDate.getTime() + 15 * 24 * 60 * 60 * 1000,
      );
      setStartDate(formatDateRange(newStartDate));
      setEndDate(formatDateRange(newEndDate));
    }
  };

  const CreatePayrun = async () => {
    const body= {
      pay_schedule: monthValue,
      state_date: start,
      end_date: end,
    }
      try {
        setLoader(true);
        const response = await newRequest.post(CREATE_PAYRUN,body);
        setLoader(false);
        toast.success(response.data.original.message);
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong. Try after somtimes')
        setLoader(false);
      }
    };

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
        accessorKey: "total_employees",
      },
      {
        header: "Total Hours",
        accessorKey: "total_hours",
      },
      {
        header: "Net Pay",
        accessorKey: "net_pay",
        cell: ({ getValue }) => {
          const value = parseFloat(getValue());
          return isNaN(value) ? "-" : value.toFixed(2);
        },
      },      
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div
            className={`flex max-w-[10rem] items-center justify-center gap-2 rounded-md px-3 py-2 ${row.original.status === "Approved" ? "bg-[#ccf0da] text-[#13ba56]" : row.original.status === "processing" ? "bg-[#f8f2f8] text-[#7e0880]" : "bg-[#fdf3dc] text-[#ebb425]"}`}
          >
            {row.original.status === "not_approved"
              ? "Not Approved"
              : row.original.status === "pending"
                ? "Approval Pending"
                : "Approved"}
          </div>
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            {permissions.includes("paylist-view") && (
            <button
              type="button"
              onClick={() => {
                navigate(
                  `/admin/payroll/paylistdetail/${row.original?.department_id || "default"}/${monthValue}` +
                    `?start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}&department=${row.original.department_name}`,
                );
              }}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <Eye className="size-3" />
            </button>
            )}
          </div>
        ),
      },
    ],
    [startDate, endDate],
  );

  return (
    <>
      <PayrollHeader page={2} />
      <div className="min-h-screen bg-gray-100">
        {/* Header Navigation */}
        <div className="mb-4 flex items-center justify-between">
          {/* Left Section */}
          <div className="lg:min-w-[20rem] min-w-max">
            <h4 className="text-lg font-bold">Pay List</h4>
          </div>
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
            {/* <button
              onClick={() => setMonthValue("3")}
              className={`whitespace-nowrap rounded-md border px-4 py-2 text-sm ${
                monthValue === "3"
                  ? "bg-[#e95d39] text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Biweekly
            </button>
            <button
              onClick={() => setMonthValue("4")}
              className={`whitespace-nowrap rounded-md border px-4 py-2 text-sm ${
                monthValue === "4"
                  ? "bg-[#e95d39] text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              4-weekly
            </button> */}
           </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            <label className="input flex h-10 min-h-10 max-w-[20rem] items-center gap-2 rounded-md border-none pr-28 outline-none">
              <Search className="size-4 object-contain text-gray-dark" />
              <input
                type="text"
                className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
                placeholder="Search"
              />
            </label>
            {/* <Controller
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
            /> */}
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-2 rounded-md bg-white p-4">
          {startDate && endDate ? (
            <>
              <div className="flex justify-between">
              <div className="flex items-center gap-2 pb-3 text-xs font-semibold">
                <button className="p-2" onClick={() => handlePreviousPeriod()}>
                  <ChevronLeft size={20} color="#0d0d0d" strokeWidth={1.75} />
                </button>

                <p>
                  {startDate} to {endDate}
                </p>
                <button className="p-2" onClick={() => handleNextPeriod()}>
                  <ChevronRight size={20} color="#171717" strokeWidth={1.75} />
                </button>
              </div>
              <div className="mb-4 flex items-center justify-between">
              <button
                className="rounded-md px-4 py-2 text-white"
                onClick={() => CreatePayrun()}
                style={{ backgroundColor: "#e95d39" }}
              >
                {loader ? (
                  <div className="flex items-center gap-3">
                    <p className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></p>
                    Creating
                  </div>
                ) : (
                  <>Create Payrun</>
                )}
              </button>
            </div>
              </div>
              {payrollList ? (
                <QueryTable
                  columns={columns}
                  list={payrollList}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              ) : (
                <Loader />
              )}
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
}
