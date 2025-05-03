import { newRequest } from "@/api";
import { CREATE_PAYRUN, PAYROLL_DASHBOARD, ROSTER_LIST } from "@/api/setup";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import PayrollHeader from "@/components/employee_access/common/PayrollHeader";
import Expense from "@/components/payroll/LineChart";
import dayjs from "dayjs";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import SemiDonutChart from "@/components/payroll/DonutChart";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => ({
  value: currentYear - i,
  label: (currentYear - i).toString(),
}));


export default function Payroll() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [selectedRoster, setSelectedRoster] = useState(null);
  const pageLimit = 10;
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState(new Date());
  const year = dayjs(date).year();
  const [monthValue, setMonthValue] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate2, setStartDate2] = useState("");
  const [endDate2, setEndDate2] = useState("");
  const [loader, setLoader] = useState(false);

  const { data } = useQuery({
    queryKey: ["payroll_dashboard",date],
    queryFn: () =>
      newRequest
        .get(PAYROLL_DASHBOARD, {
          params: {
            year:year
          },
        })
        .then((res) => {
          return res?.data 
        }),
  });

  const total = data?.graph.reduce((sum, item) => sum + item.value, 0);

  const handleYearChange = (selectedOption) => {
    const updatedDate = dayjs(date).year(selectedOption.value).toDate();
    setDate(updatedDate);
  };


  const CreatePayrun = async () => {
    try {
      setLoader(true);
      const response = await newRequest.post(CREATE_PAYRUN);
      console.log(response);
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
        header: "Sl.No",
        accessorKey: "sl_no",
      },
      {
        header: "Department",
        accessorKey: "department",
      },
      {
        header: "Total Employee",
        accessorKey: "total_employee",
      },
      {
        header: "Net Pay",
        accessorKey: "net_pay",
      },
      {
        header: "Payment Date",
        accessorKey: "payment_date",
      },
    ],
    [],
  );
  return (
    <>
      <PayrollHeader page={1} />
      <div className="flex gap-4">
      <div className="flex flex-col h-screen  gap-8 w-3/4">
        {/* Left Section */}
        <div className="col-span-7 h-[28rem] w-full gap-4 rounded-md bg-white px-10 py-10">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold">Expense</h1>
            <p className="mb-3 flex items-center gap-3">
              <h2 className="text-xs font-semibold">
                01 Jan {year} to 31 Dec {year}
              </h2>
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
            </p>
          </div>
          <Expense datas={data}/>
        </div>

        {/* Left Section */}
        {/* <div className="col-span-7 w-full rounded-md bg-white px-6 py-4">
        
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Transaction History</h3>

            <div className="flex items-center gap-2">
              <select className="w-50% ml-4 rounded-md border border-gray-300 bg-white px-4 py-1 text-sm text-gray-600 focus:outline-none">
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>
          &lt;
          <span className="text-sm text-gray-500">
            Monday, 11 Nov 2024 to Saturday, 16 Nov 2024
          </span>
          &gt;
        
          <div className="mt-2">
            <QueryTable
              columns={columns}
              list={rosterDetailss?.listing}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div> */}
        
      </div>
      <div className="flex flex-col gap-4 w-1/3">
        {/* Right Section */}
        <div className="col-span-3 h-[6rem] w-full bg-white p-6 rounded-lg">
          <div className="mb-6">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Process pay run</h3>
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
                  <>Create pay run</>
                )}
              </button>
            </div>

            {/* Content */}
            {/* <div className="text-sm">
              <div className="mb-2 flex justify-between">
                <span className="text-gray-500">Cost of the Company</span>
                <span className="text-gray-500">Pay day</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-medium">₹705000</span>

                <span className="font-medium">May 25, 2024</span>
              </div>
              <div className="mt-4 text-gray-600">
                <span>This payment is overdue by 174 day(s)</span>
              </div>
            </div> */}
          </div>
        </div>

        <div className="h-[21rem] w-full bg-[#e95d39] text-white text-xl rounded-lg flex flex-col font-semibold  items-center justify-center">
          <p>£{total}</p>
          <p>Yearly Cost to the Company</p>
        </div>
        {/* Right Section */}
        {/* <div className="col-span-3 w-full bg-white p-10">
          <div>
            <h1 className="text-md font-semibold">Payroll Summary</h1>
            <div className="flex justify-between">
              <div className="flex items-center gap-2 pb-3 text-xs font-semibold">
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
              <select className="ml-4 h-[2rem] w-[7rem] rounded-md border border-gray-300 bg-white px-4 py-1 text-sm text-gray-600 focus:outline-none">
                <option onClick={() => setMonthValue("1")}>Weekly</option>
                <option onClick={() => setMonthValue("2")}>Monthly</option>
              </select>
            </div>
          </div>
          <SemiDonutChart />
        </div> */}
      </div>
      </div>
    </>
  );
}
