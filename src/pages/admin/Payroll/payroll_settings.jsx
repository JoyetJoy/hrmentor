import React, { useState } from "react";
import PayrollHeader from "@/components/employee_access/common/PayrollHeader";
import { newRequest } from "@/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Calendar from "react-calendar";
import Select from "react-select";

import dayjs from "dayjs";
import { customSelectStyles } from "@/utils/customStyles";
import {
  PAYROLL_MONTHLY,
  PAYROLL_MONTHLY_TWISE,
  PAYROLL_WEEKLY,
} from "@/api/payroll";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function PayrollSettings() {
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState(new Date());
  const [payDuriation, setPayDuriation] = useState("weekly");
  const [startDay, setStartDay] = useState("Mon");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [payrollSettings, setPayrollSettings] = useState({});

  // Create month-year combinations
  const startYear = 2024; // Set your start year (can be current year or any year)
  const futureYear = 2030; // Set your end year (future year)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate year-month combinations
  const years = [];
  for (let year = startYear; year <= futureYear; year++) {
    months.forEach((month) => {
      years.push({
        label: `${month} ${year}`,
        value: `${month} ${year}`,
      });
    });
  } // Flatten to create a single array of month-year options

  const handleYearChange = (selectedOption) => {
    const selectedDate = dayjs(selectedOption.value, "MMMM YYYY").toDate();
    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    setDate(formattedDate);
  };

  const { data: payrollWeeklyDetails } = useQuery({
    queryKey: ["payrollWeeklyDetails"],
    queryFn: () => newRequest.get(`${PAYROLL_WEEKLY}`).then((res) => res.data),
    enabled: payDuriation === "weekly", // Only fetch when payDuriation is "weekly"
  });

  const { data: payrollMonthlyDetails } = useQuery({
    queryKey: ["payrollMonthlyDetails"],
    queryFn: () => newRequest.get(`${PAYROLL_MONTHLY}`).then((res) => res.data),
    enabled: payDuriation === "monthly", // Only fetch when payDuriation is "monthly"
  });

  const { data: payrollMonthlyTwiceDetails } = useQuery({
    queryKey: ["payrollMonthlyTwiseDetails"],
    queryFn: () =>
      newRequest.get(`${PAYROLL_MONTHLY_TWISE}`).then((res) => res.data),
    enabled: payDuriation === "monthlytwice", // Only fetch when payDuriation is "monthlytwice"
  });

  // Update payrollSettings when the data changes
  useEffect(() => {
    if (payDuriation === "weekly" && payrollWeeklyDetails) {
      setPayrollSettings(payrollWeeklyDetails);
    } else if (payDuriation === "monthly" && payrollMonthlyDetails) {
      setPayrollSettings(payrollMonthlyDetails);
    } else if (payDuriation === "monthlytwice" && payrollMonthlyTwiceDetails) {
      setPayrollSettings(payrollMonthlyTwiceDetails);
    }
  }, [
    payDuriation,
    payrollWeeklyDetails,
    payrollMonthlyDetails,
    payrollMonthlyTwiceDetails,
  ]);

  useEffect(() => {
    if (payrollSettings) {
      setEndDate(payrollSettings?.end_date);
      setStartDay(payrollSettings?.start_day);
      setStartDate(payrollSettings?.start_date);
      setDate(payrollSettings?.first_pay_period);
    }
  }, [payrollSettings]);

  console.log(payrollSettings, "payrollSettings");

  const handleSave = async () => {
    const payload = {
      pay_duration: payDuriation,
      first_pay_period: date,
      start_day: startDay,
      start_date: startDate,
      end_start: endDate,
    };

    // Basic validation
    if (!payload.pay_duration) {
      return toast.error("Pay duration is required");
    }
    if (!payload.first_pay_period) {
      return toast.error("First pay period is required");
    }

    setLoader(true);

    let response;
    try {
      if (payDuriation == "weekly") {
        if (!startDay) {
          return toast.error("Start Day is required");
        }
        response = await newRequest.post(`${PAYROLL_WEEKLY}`, payload);
      }
      if (payDuriation == "monthly") {
        if (!startDate || !endDate) {
          return toast.error("Date is required");
        }
        response = await newRequest.post(`${PAYROLL_MONTHLY}`, payload);
      }
      if (payDuriation == "monthlytwice") {
        if (!startDate) {
          return toast.error("Date is required");
        }
        response = await newRequest.post(`${PAYROLL_MONTHLY_TWISE}`, payload);
      }

      if (response?.data?.status === 201) {
        toast.success("Payroll Settings saved successfully!");
        queryClient.invalidateQueries(["paySchedule"]); // Refresh relevant queries
      } else {
        toast.error("Failed to save pay schedule.");
      }
    } catch (error) {
      // Handle error
      console.error(error);
      toast.error("An error occurred while saving the pay schedule.");
    } finally {
      setLoader(false); // Stop loading
    }
  };
  return (
    <>
      <PayrollHeader page={4} />
      <div className="flex h-screen bg-gray-100">
        {/* Left Sidebar */}
        <div className="bg-white p-6" style={{ width: "300px" }}>
          <h3 className="text-sm font-semibold" style={{ color: "#e95d39" }}>
            Pay schedule
          </h3>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-bold">Pay schedule</h2>
            <button
              className="rounded-md px-4 py-2 text-white"
              style={{ backgroundColor: "#e95d39" }}
              onClick={handleSave}
            >
              {payrollSettings ? "Edit" : "Save"}
            </button>
          </div>

          {/* Form Section */}
          <div className="rounded-md bg-white p-6 shadow">
            {/* Pay Duration */}
            <div className="mb-6">
              <h4 className="mb-2 text-sm font-semibold">Pay Duration</h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="weekly"
                    className="form-radio"
                    onClick={() => setPayDuriation("weekly")}
                    checked={payDuriation == "weekly"}
                  />
                  Weekly
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="monthly"
                    className="form-radio"
                    onClick={() => setPayDuriation("monthly")}
                    checked={payDuriation == "monthly"}
                  />
                  Monthly
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="monthlytwice"
                    className="form-radio"
                    onClick={() => setPayDuriation("monthlytwice")}
                    checked={payDuriation == "monthlytwice"}
                  />
                  Monthly twice
                </label>
              </div>
              <p className="mt-2 rounded-md border-l-4 border-[#ffb233] bg-yellow-100 p-2 text-sm text-yellow-600">
                Once you have processed the first pay run, you cannot update the
                pay schedule.{" "}
              </p>
            </div>

            {/* First Pay Period */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold">
                When is the first pay period
              </label>
              <div className="relative">
                <Select
                  options={years}
                  isSearchable={true}
                  onChange={handleYearChange}
                  styles={customSelectStyles}
                  value={years.find(
                    (option) =>
                      option.value === dayjs(date).format("MMMM YYYY"),
                  )}
                  placeholder={dayjs(date).format("MMMM YYYY")}
                  className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
                />
              </div>
              <p className="mt-2 rounded-md border-l-4 border-[#ffb233] bg-yellow-100 p-2 text-sm text-yellow-600">
                Please use the import option to import previous payroll data.
              </p>
            </div>

            {/* Pay Duration Type */}
            <div>
              <h4 className="mb-2 text-sm font-semibold">
                Select the pay duration type
              </h4>
              <p className="mb-4 text-sm text-gray-500">
                The system will automatically adjust the LOP of the last day of
                this pay period during the next pay period.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {payDuriation === "weekly" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Start day
                    </label>
                    <select
                      name="start_day"
                      className="w-full rounded-md border px-4 py-2"
                      onChange={(e) => setStartDay(e.target.value)} // Corrected event handler
                      value={startDay}
                    >
                      <option value="Mon">Monday</option>
                      <option value="Tue">Tuesday</option>
                      <option value="Wed">Wednesday</option>
                      <option value="Thu">Thursday</option>
                      <option value="Fri">Friday</option>
                    </select>
                  </div>
                )}

                {payDuriation === "monthly" && (
                  <>
                    <div className="group flex flex-col space-y-1">
                      <label className="mb-2 block text-sm font-semibold">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="input-box h-10 w-full"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)} // Correctly passing the value
                      />
                    </div>
                    {/* <div className="group flex flex-col space-y-1">
                      <label className="mb-2 block text-sm font-semibold">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="input-box h-10 w-full"
                        value={endDate}
                        min={startDate}
                        onChange={(e) => setEndDate(e.target.value)} // Correctly passing the value
                      />
                    </div> */}
                  </>
                )}

                {payDuriation === "monthlytwice" && (
                  <div className="group flex flex-col space-y-1">
                    <label className="mb-2 block text-sm font-semibold">
                      {" "}
                      First Term
                    </label>
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="input-box h-10 w-full"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)} // Correctly passing the value
                    />
                  </div>
                )}

                {/* <div>
                  <label className="mb-2 block text-sm font-semibold">
                    End day
                  </label>
                  <select className="w-full rounded-md border px-4 py-2">
                    <option>Saturday</option>
                    <option>Sunday</option>
                    <option>Monday</option>
                  </select>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
