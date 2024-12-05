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

export default function Payroll() {
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
  console.log(selectedRoster);
  return (
    <>
      <PayrollHeader page={1} />
      <div className="grid grid-cols-10 gap-4">
        {/* Left Section */}
        <div className="col-span-7 w-full gap-4 rounded-md bg-white px-6 py-4">
          <img src={"/assets/images/employee_access/FlowChart.png"} />
        </div>

        {/* Right Section */}
        <div className="col-span-3 w-full bg-white p-6">
          <img src={"/assets/images/employee_access/PAYMENT.png"} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-10 gap-4">
        {/* Left Section */}
        <div className="col-span-7 w-full rounded-md bg-white px-6 py-4">
          {/* Header */}
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Transaction History</h3>

            <div className="flex items-center gap-2 ">
              <select className="ml-4 rounded-md border border-gray-300 bg-white px-4 py-1 text-sm text-gray-600 focus:outline-none w-50%">
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
          {/* Table */}
          <div className="mt-2">
            <QueryTable
              columns={columns}
              list={rosterDetailss?.listing}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-3 w-full bg-white p-6">
          <div className="mb-6">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Process pay run</h3>
              <button
                className="rounded-md px-4 py-2 text-white"
                style={{ backgroundColor: "#e95d39" }}
              >
                Create pay run
              </button>
            </div>

            {/* Content */}
            <div className="text-sm">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
