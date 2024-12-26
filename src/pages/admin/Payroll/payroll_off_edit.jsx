import QueryTable from "@/components/table/QueryTable";
import React, { useState } from "react";
import PayrollHeader from "@/components/employee_access/common/PayrollHeader";
import { ArrowLeft } from "@mui/icons-material";
import { Check, ChevronUp } from "lucide-react";

const summaryData = [
  { label: "Total Working hours", value: "240 hr 00 min" },
  { label: "Overtime", value: "02 hr 30 min" },
  { label: "Overtime per week", value: "£300" },
  { label: "Paid Holidays", value: "5" },
  { label: "Paid holiday credit", value: "120" },
  { label: "Unpaid Holiday", value: "5" },
  { label: "Unpaid Leave deduction", value: "5" },
  { label: "Salary per Month", value: "£25250" },
  { label: "Payment status", value: "Not paid" },
];

const historyData = [
  {
    title: "Paylist approved by Team lead",
    description: "Team lead Approved",
    date: "12/11/2024",
    time: "10:30AM",
    step: 1,
  },
  {
    title: "Team lead Add a note Against Disputed",
    description: "Test note",
    date: "12/11/2024",
    time: "10:30AM",
    step: 2,
  },
  {
    title: "Disputed from Amal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    date: "12/11/2024",
    time: "10:30AM",
    step: 3,
  },
];

const tableData = [
  {
    date: "01/11/2023",
    shift: "Morning Shift",
    clockedIn: "08:00 AM",
    clockedOut: "11:00 AM",
    totalBT: "30 Min",
    otHours: "02 hr 0 min",
    totalWorked: "09 hr 0 min",
  },
  {
    date: "01/11/2023",
    shift: "Morning Shift",
    clockedIn: "08:00 AM",
    clockedOut: "11:00 AM",
    totalBT: "30 Min",
    otHours: "02 hr 0 min",
    totalWorked: "09 hr 0 min",
  },
];

const mainSteps = [
  { label: "Company profile", step: 1 },
  { label: "Organisation bank and tax details", step: 2 },
  { label: "Company signatory", step: 3 },
  { label: "Calender settings", step: 4 },
];

// Sub-steps under
const companySubSteps = [
  { label: "General Details", step: 1.1 },
  { label: "Address Details", step: 1.2 },
];
const bankSubSteps = [
  { label: "Bank account details ", step: 2.1 },
  { label: "Tax details", step: 2.2 },
];
const signatorySubSteps = [{ label: "company Signatory", step: 3.1 }];
const calenderSubSteps = [{ label: "Add calender Settings", step: 1.1 }];

const stepCounter = 4;

export default function PayrollOffEdit() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const columns = React.useMemo(
    () => [
      {
        header: "Date",
        accessorKey: "date",
      },
      {
        header: "Shift",
        accessorKey: "shift",
      },
      {
        header: "Clocked In",
        accessorKey: "clockedIn",
      },
      {
        header: "Clocked Out",
        accessorKey: "clockedOut",
      },
      {
        header: "Total BT",
        accessorKey: "totalBT",
      },
      {
        header: "OT Hours",
        accessorKey: "otHours",
      },
      {
        header: "Total Worked hrs",
        accessorKey: "totalWorked",
      },
    ],
    [],
  );
  return (
    <>
      <PayrollHeader page={3} />

      <div className="mb-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="header row">
          <ArrowLeft
            onClick={() => navigate(-1)} // Navigate back
            className="mr-2 size-4 cursor-pointer"
          />
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="37"
              height="37"
              rx="18.5"
              stroke="#7F7F7F"
            />
            <path
              d="M22.8698 27.3327H15.1364C14.2941 27.3021 13.5094 26.8969 12.9967 26.2278C12.484 25.5587 12.2969 24.6957 12.4864 23.8744L12.6864 22.9244C12.9165 21.6383 14.0219 20.6933 15.3281 20.666H22.6781C23.9842 20.6933 25.0897 21.6383 25.3198 22.9244L25.5198 23.8744C25.7093 24.6957 25.5222 25.5587 25.0095 26.2278C24.4968 26.8969 23.7121 27.3021 22.8698 27.3327Z"
              fill="#2C2C2C"
            />
            <path
              d="M19.4198 18.9994H18.5864C16.7455 18.9994 15.2531 17.507 15.2531 15.666V13.466C15.2509 12.7227 15.5452 12.0093 16.0707 11.4837C16.5963 10.9581 17.3098 10.6638 18.0531 10.666H19.9531C20.6964 10.6638 21.4099 10.9581 21.9354 11.4837C22.461 12.0093 22.7553 12.7227 22.7531 13.466V15.666C22.7531 16.5501 22.4019 17.3979 21.7768 18.0231C21.1517 18.6482 20.3038 18.9994 19.4198 18.9994Z"
              fill="#2C2C2C"
            />
          </svg>
          <h4 className="pl-4 text-lg font-bold">Amal</h4>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="pay-now">
            <button>Pay Now</button>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-4 rounded-md bg-white px-6 py-4">
        {/* Summary Panel - col-span-4 */}
        <div className="col-span-3 rounded-md p-4 shadow">
          <div>
            <div className="summary-header mb-4">
              <h4 className="text-sm font-bold ">
                Monday, 11 Nov 2024 to Saturday, 15 Nov 2024{" "}
                <button className="toggle-button text-sm text-gray-600">
                  ⌃
                </button>
              </h4>
            </div>
            <div className="summary-body">
              {summaryData.map((item, index) => (
                <div
                  key={index}
                  className="summary-row flex justify-between border-b py-2"
                >
                  <span className="label text-gray-700 text-sm">{item.label}</span>
                  <span className="value text-gray-900 text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <div className="summary-header mb-4">
              <h4 className="text-sm font-bold">
                Monday, 11 Nov 2024 to Saturday, 15 Nov 2024{" "}
                <button className="toggle-button text-sm text-gray-600">
                <ChevronUp size={16} strokeWidth={1.5} />
                </button>
              </h4>
            </div>
            <div className="summary-body">
              {summaryData.map((item, index) => (
                <div
                  key={index}
                  className="summary-row flex justify-between border-b py-2"
                >
                  <span className="label text-gray-700">{item.label}</span>
                  <span className="value text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Section - col-span-8 */}
        <div className="col-span-9">
          <h2 className="mb-4 text-lg font-bold">Overview</h2>
          <QueryTable columns={columns} list={tableData} />

          {/* History Section */}
          <div className="history-section mt-4 rounded-md bg-white p-6 shadow">
            <h2 className="mb-3 text-lg font-bold">History</h2>
            <h6 className="mb-3 font-bold">12 October, 2023</h6>
            <div className="flex w-full flex-col gap-3">
              <div className="relative rounded-md bg-white p-5">
                <div className="absolute bottom-10 left-10 top-10 z-0 border-l-2 border-hrmprimaryorange" />
                <div className="flex flex-col gap-y-4">
                  {/* Render Main Steps */}
                  {historyData.map((item, index) => (
                    <div key={index}>
                      {/* Main Step */}
                      <div className="flex  items-start gap-2 rounded bg-gray-lightcool px-3 text-[0.94rem]" style={{height:"80px"}}>
                        <div
                          className={`z-10 size-4 rounded-full border ${
                            stepCounter >= item.step
                              ? "border-hrmprimaryorange bg-hrmprimaryorange"
                              : "border-textcolor-gray bg-textcolor-gray"
                          }`}
                        />
                        <div className="flex flex-1 flex-col">
                          {/* Title */}
                          <h3
                            className="cursor-pointer font-semibold text-gray-800"
                            onClick={() => toggleDetails(index)}
                          >
                            {item.title}
                          </h3>
                          {/* Date */}
                          <div className="text-xs text-gray-600">
                            {item.date} | {item.time}
                          </div>
                          {/* Description */}
                          {expandedIndex === index && (
                            <div className="details mt-2 text-sm text-gray-800">
                              <p>{item.description}</p>
                            </div>
                          )}
                        </div>
                        {/* Toggle Button */}
                        <button
                          className="ml-2 text-gray-500"
                          onClick={() => toggleDetails(index)}
                        >
                          {expandedIndex === index ? "⌃" : "⌄"}
                        </button>
                      </div>
                      {/* Conditionally render the description and other details */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
