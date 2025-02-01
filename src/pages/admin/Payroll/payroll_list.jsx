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

const data = [
  {
    slNo: 1,
    department: "IT department",
    totalEmployees: 5,
    otHours: "20hr 0min",
    otPay: "£3500",
    netPay: "£25000",
    paymentDate: "30/11/2024",
    status: "Processing",
  },
  {
    slNo: 2,
    department: "Accountant",
    totalEmployees: 4,
    otHours: "20hr 0min",
    otPay: "£2500",
    netPay: "£25000",
    paymentDate: "30/11/2024",
    status: "Approval Pending",
  },
  {
    slNo: 3,
    department: "HR department",
    totalEmployees: 3,
    otHours: "20hr 0min",
    otPay: "£2950",
    netPay: "£29500",
    paymentDate: "30/11/2024",
    status: "All Approved",
  },
];

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

export default function PayrollList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const navigate = useNavigate();
  const { control } = useForm();
  const [monthValue, setMonthValue] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate2, setStartDate2] = useState("");
  const [endDate2, setEndDate2] = useState("");
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

  console.log(payrollList);

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
      setStartDate2(formatDateRange(data?.second_pay_term?.start_date));
      setEndDate2(formatDateRange(data?.second_pay_term?.end_date));
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
      prevMonth.setMonth(prevMonth.getMonth() - 1, 1); // Monthly: Start of the previous month
      setStartDate(formatDateRange(prevMonth));
      setEndDate(formatDateRange(newEndDate));
    } else if (monthValue === "3") {
      const endOfPreviousMonth = new Date(newEndDate);
      endOfPreviousMonth.setMonth(endOfPreviousMonth.getMonth(), 0); // End of previous month
      const midMonth = new Date(endOfPreviousMonth);
      midMonth.setDate(15); // Set to the 15th of the month
      setStartDate(formatDateRange(midMonth));
      setEndDate(formatDateRange(endOfPreviousMonth));
      setStartDate2(formatDateRange(prevMonth));
      setEndDate2(formatDateRange(midMonth));
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
      const endDate = new Date(newStartDate);
      endDate.setDate(endDate.getDate() + 30); // Add 30 days to newStartDate

      setStartDate(formatDateRange(newStartDate));
      setEndDate(formatDateRange(endDate));
    } else if (monthValue === "3") {
      // Set startDate to newStartDate + 1 day
      const start_Date = new Date(endDate2);
      start_Date.setDate(start_Date.getDate() + 1);
    
      // Set endDate to startDate + 15 days
      const end_Date = new Date(start_Date);
      end_Date.setDate(end_Date.getDate() + 15);
    
      // Set startDate2 to endDate + 1 day
      const start_Date2 = new Date(end_Date);
      start_Date2.setDate(start_Date2.getDate() + 1);
    
      // Set endDate2 to startDate2 + 15 days
      const end_Date2 = new Date(start_Date2);
      end_Date2.setDate(end_Date2.getDate() + 15);
    
      setStartDate(formatDateRange(start_Date));
      setEndDate(formatDateRange(end_Date));
      setStartDate2(formatDateRange(start_Date2));
      setEndDate2(formatDateRange(end_Date2));
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
        accessorKey: "employee_count",
      },
      {
        header: "OT Hours",
        accessorKey: "total_overtime",
      },
      {
        header: "OT Pay",
        accessorKey: "total_overtime_pay",
      },
      {
        header: "Net Pay",
        accessorKey: "departmentTotalSalary",
      },
      {
        header: "Payment Date",
        accessorKey: "paymentDate",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                navigate("/admin/payroll/paylistdetail");
              }}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <Eye className="size-3" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );
  return (
    <>
      <PayrollHeader page={2} />
      <div className="min-h-screen bg-gray-100">
        {/* Header Navigation */}
        <div className="mb-4 flex items-center justify-between">
          {/* Left Section */}
          <div>
            <h4 className="text-lg font-bold">Pay List</h4>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMonthValue("1")}
              className={`rounded-md border px-4 py-2 text-sm ${monthValue === "1" ? "bg-[#e95d39] text-white" : "bg-white text-gray-600"} `}
            >
              Weekly
            </button>
            <button
              onClick={() => setMonthValue("2")}
              className={`rounded-md border px-4 py-2 text-sm ${monthValue === "2" ? "bg-[#e95d39] text-white" : "bg-white text-gray-600"} `}
            >
              Monthly
            </button>
            <button
              onClick={() => setMonthValue("3")}
              className={`w-full rounded-md border px-4 py-2 text-sm ${monthValue === "3" ? "bg-[#e95d39] text-white" : "bg-white text-gray-600"} `}
            >
              Monthly twice
            </button>
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
              className=""
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isSearchable={true}
                  styles={customSelectStyles}
                  options={departmentListing}
                  placeholder="Select Department"
                  className="input-box min-w-[13rem]"
                />
              )}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-2 rounded-md bg-white p-4">
          {startDate&&endDate?(
            <><div className="flex items-center gap-2 pb-3 text-xs font-semibold">
            <button className="p-2" onClick={() => handlePreviousPeriod()}>
              <ChevronLeft size={20} color="#0d0d0d" strokeWidth={1.75} />
            </button>

            <p>
              {startDate} to {endDate}
            </p>
            {monthValue === "3" && (
              <>
                <span>|</span>
                <p>
                  {" "}
                  {startDate2} to {endDate2}
                </p>
              </>
            )}
            <button className="p-2" onClick={() => handleNextPeriod()}>
              <ChevronRight size={20} color="#171717" strokeWidth={1.75} />
            </button>
          </div>
          {payrollList?
          <QueryTable
          columns={columns}
          list={payrollList}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
        :
          <Loader />
          }
          </>
          ):(
            <Loader />
          )}
        </div>
      </div>
    </>
  );
}
