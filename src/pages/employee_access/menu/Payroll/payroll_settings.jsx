import { EMPLOYEE, newRequest } from "@/api";
import { ROSTER_LIST, DELETE_ROSTER } from "@/api/setup";
import NewRoster from "@/components/popups/master/roster/NewRoster";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  MoveDiagonal,
  Plus,
  Search,
  Trash2,
  Files,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import RosterHeader from "@/components/common/RosterHeader";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import EditRoster from "@/components/popups/master/roster/EditRoster";
import PayrollHeader from "@/components/employee_access/common/PayrollHeader";

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

const totalPages = 9;

export default function PayrollSettings() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editpopupOpen, setEditPopupOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [rosterList, setRosterList] = useState("");
  const [selectedRoster, setSelectedRoster] = useState(null);
  const [copy, setCopy] = useState(false);
  const pageLimit = 10;

  const { data: rosterDetailss } = useQuery({
    queryKey: ["rosterDetailss", currentPage, keyword],
    queryFn: () =>
      newRequest
        .get(ROSTER_LIST, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
          },
        })
        .then((res) => {
          return res?.data || { data: [], last_page: 1 };
        }),
  });

  useEffect(() => {
    setRosterList(rosterDetailss);
  }, [rosterDetailss]);

  useEffect(() => {
    if (rosterDetailss) {
      setTotalPages(rosterDetailss?.last_page);
      if (!selectedRoster && rosterDetailss.listing?.length > 0) {
        setSelectedRoster(rosterDetailss.listing[0]?.roster_details);
      }
    }
  }, [rosterDetailss, selectedRoster]);

  const handleCreate = (toOpen) => {
    setPopupOpen(true);
  };

  console.log(selectedRoster);

  const handleView = (roster) => {
    setSelectedRoster(roster);
  };

  const handleEdit = (roster) => {
    console.log("Selected roster for editing:", roster);
    setEditPopupOpen(true);
  };
  const handleCopy = (roster) => {
    console.log("Selected roster for editing:", roster);
    setCopy(true);
    setEditPopupOpen(true);
  };

  console.log(rosterDetailss?.listing);

  const columns = React.useMemo(
    () => [
      {
        header: "Sl.No",
        accessorKey: "slNo",
      },
      {
        header: "Department",
        accessorKey: "department",
      },
      {
        header: "Total Employee",
        accessorKey: "totalEmployees",
      },
      {
        header: "OT Hours",
        accessorKey: "otHours",
      },
      {
        header: "OT Pay",
        accessorKey: "otPay",
      },
      {
        header: "Net Pay",
        accessorKey: "netPay",
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
        accessorKey: "",
      },
    ],
    [],
  );
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
