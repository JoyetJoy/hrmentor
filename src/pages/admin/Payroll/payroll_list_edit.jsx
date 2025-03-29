import QueryTable from "@/components/table/QueryTable";
import React, { useState } from "react";
import PayrollHeader from "@/components/employee_access/common/PayrollHeader";
import { ArrowLeft, X } from "@mui/icons-material";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  APPROVE_PAYROLL_EMPLOYEE,
  EMPLOYEE_PAYROLL_DETAILS,
} from "@/api/payroll";
import { useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { formatDateRange } from "@/utils/helpers";
import Paynow from "@/components/payroll/Paynow";
import dayjs from "dayjs";

const summaryData = [
  { label: "Total Working hours", value: "240 hr 00 min" },
  { label: "Overtime", value: "02 hr 30 min" },
  { label: "Overtime per week", value: "£300" },
  { label: "Paid Holidays", value: "5" },
  { label: "Paid holiday credit", value: "120" },
  { label: "Unpaid Holiday", value: "5" },
  { label: "Unpaid Leave deduction", value: "5" },
  { label: "Salary", value: "£25250" },
  { label: "Payment status", value: "Not paid" },
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

export default function PayrollListEdit() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [payPopup, setPayPopup] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");
  const empId = searchParams.get("empid");
  console.log(startDate, endDate);

  const { data, isLoading } = useQuery({
    queryKey: ["employeepayrolldetails", empId, id, startDate, endDate],
    queryFn: () =>
      newRequest
        .get(EMPLOYEE_PAYROLL_DETAILS, {
          params: {
            payrun_id: id,
            emp_id: empId,
            start_date: startDate,
            end_date: endDate,
          },
        })
        .then((res) => res.data),
    enabled: !!empId,
  });

  console.log(data);

  function close() {
    setPopupOpen(false);
    reset();
  }

  const Approve = async () => {
    const body = {
      payrun_id: id,
    };

    try {
      const response = await newRequest.post(APPROVE_PAYROLL_EMPLOYEE, body);
      console.log("Approval successful:", response);
      toast.success(response.data.original.message);
    } catch (error) {
      console.error("Error approving payroll:", error);
      toast.error("Failed to approve payroll. Please try again.");
    }
  };
  const columns = React.useMemo(
    () => [
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => (
          <div className="flex px-2">
            {dayjs(row.original.date).format('MM/DD/YYYY')}
          </div>
        ),
      },
      {
        header: "Shift",
        accessorKey: "shift_name",
      },
      {
        header: "Clocked In",
        accessorKey: "clock_in",
      },
      {
        header: "Clocked Out",
        accessorKey: "clock_out",
      },
      {
        header: "Total BT",
        accessorKey: "total_break_time",
      },
      {
        header: "OT Hours",
        accessorKey: "total_overtime",
      },
      {
        header: "Total Worked hrs",
        accessorKey: "total_working_hour",
      },
      {
        header: "Disputes",
        accessorKey: "totalWorked",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              className="flex size-7 cursor-pointer items-center"
            >
              <img
                src="/assets/icons/user_image.jpg"
                className="w-full object-contain"
                onClick={() => {
                  setPopupOpen(true);
                }}
              />
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
      <Paynow popupOpen={payPopup} setPopupOpen={setPayPopup} />

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
          <h4 className="pl-4 text-lg font-bold">{data&&data[0]?.employee_name}</h4>
        </div>

        {/* Right Section */}
        <div className="flex gap-3">
          <div
            className="flex items-center gap-4"
            onClick={() => setPayPopup(true)}
          >
            <button className="pay-now">Pay Now</button>
          </div>
          <div className="flex items-center gap-4" onClick={() => Approve()}>
            <button className="pay-now">Approve</button>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-4 rounded-md bg-white px-6 py-4">
        {/* Summary Panel - col-span-4 */}
        <div className="col-span-3">
          <div>
            <div className="summary-header mb-4">
              <h4 className="flex w-full justify-end text-sm font-bold">
                {formatDateRange(startDate)} to {formatDateRange(endDate)}
                {/* <button className="toggle-button text-black-600 text-sm">
                  ⌃
                </button> */}
              </h4>
            </div>
            <div className="summary-body rounded-md p-4 shadow">
              <div
                className="summary-row flex items-center justify-between border-b py-2"
              >
                <span className="label text-gray-700">Total Working hours</span>
                <span className="value text-md font-semibold text-gray-900">
                {data &&data[0]?.total_working_hours}
                </span>
              </div>
              <div
                className="summary-row flex items-center justify-between border-b py-2"
              >
                <span className="label text-gray-700">Overtime</span>
                <span className="value text-md font-semibold text-gray-900">
                {data&&data[0]?.total_overtime}
                </span>
              </div>
              <div
                className="summary-row flex items-center justify-between border-b py-2"
              >
                <span className="label text-gray-700">Overtime per week</span>
                <span className="value text-md font-semibold text-gray-900">
                  0
                </span>
              </div>
              <div
                className="summary-row flex items-center justify-between border-b py-2"
              >
                <span className="label text-gray-700">Paid Holidays</span>
                <span className="value text-md font-semibold text-gray-900">
                  0
                </span>
              </div>
              <div
                className="summary-row flex items-center justify-between border-b py-2"
              >
                <span className="label text-gray-700">Paid holiday credit</span>
                <span className="value text-md font-semibold text-gray-900">
                  0
                </span>
              </div>
              <div
                className="summary-row flex items-center justify-between border-b py-2"
              >
                <span className="label text-gray-700">Unpaid Holiday</span>
                <span className="value text-md font-semibold text-gray-900">
                  0
                </span>
              </div>
              <div
                className="summary-row flex items-center justify-between border-b py-2"
              >
                <span className="label text-gray-700">Unpaid Leave deduction</span>
                <span className="value text-md font-semibold text-gray-900">
                  0
                </span>
              </div>
              <div
                className="summary-row flex items-center justify-between border-b py-2"
              >
                <span className="label text-gray-700">Salary</span>
                <span className="value text-md font-semibold text-gray-900">
                {data&&data[0]?.net_pay}
                </span>
              </div>
              <div
                className="summary-row flex items-center justify-between border-b py-2"
              >
                <span className="label text-gray-700">Payment status</span>
                <span className="value text-md font-semibold text-gray-900">
                  Not Paid
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section - col-span-8 */}
        <div className="col-span-9">
          <h2 className="mb-4 text-lg font-bold">Overview</h2>
          <QueryTable columns={columns} list={data&&data[0]?.attendance_records} />
        </div>
      </div>
      <Dialog
        open={popupOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="data-[closed]:transform-[scale(95%)] h-full w-full max-w-md rounded bg-white/90 p-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
            >
              <div className="mb-7 flex items-center justify-between">
                <h1 className="text-[0.99rem] font-bold leading-7 text-neutral-700">
                  Dispute
                </h1>
                <button
                  onClick={close}
                  className="text-lg font-extrabold text-[#00000080]"
                >
                  <X />
                </button>
              </div>
              <form className="grid-cols-1n grid gap-1">
                <div className="group mt-3 flex flex-col space-y-1 text-[0.85rem] font-medium">
                  <label>Dispute from employee</label>
                  <textarea
                    autoComplete="off"
                    type="text"
                    className="input-box min-h-28 py-1"
                  />{" "}
                </div>
                <div className="group mt-3 flex flex-col space-y-1 text-[0.85rem] font-medium">
                  <label>Add note</label>
                  <textarea
                    autoComplete="off"
                    type="text"
                    className="input-box min-h-28 py-1"
                  />{" "}
                </div>

                <div className="mt-3 flex flex-row gap-3">
                  <button
                    onClick={close}
                    className="flex h-11 w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#cecdcd] text-sm font-normal text-black focus:outline-none"
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    className="flex h-11 w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                  >
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
