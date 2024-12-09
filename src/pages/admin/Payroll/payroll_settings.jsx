import React from "react";
import PayrollHeader from "@/components/employee_access/common/PayrollHeader";

export default function PayrollSettings() {
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
            >
              + Add New
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
                    name="payDuration"
                    className="form-radio"
                  />
                  Weekly
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payDuration"
                    className="form-radio"
                  />
                  Monthly
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payDuration"
                    className="form-radio"
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
              <select className="w-full rounded-md border px-4 py-2">
                <option>November 2024</option>
                <option>December 2024</option>
                <option>January 2025</option>
              </select>
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
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Start day
                  </label>
                  <select className="w-full rounded-md border px-4 py-2">
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    End day
                  </label>
                  <select className="w-full rounded-md border px-4 py-2">
                    <option>Saturday</option>
                    <option>Sunday</option>
                    <option>Monday</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
