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

export default function PayrollOff() {
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
      <PayrollHeader page={3} />
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header Navigation */}
        <div className="mb-4 flex items-center justify-between">
          {/* Left Section */}
          <div>
            <h4 className="text-lg font-bold">IT Department</h4>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <label className="input flex h-10 min-h-10 items-center gap-2 rounded-md border-none pr-28 outline-none">
              <Search className="size-4 object-contain text-gray-dark" />
              <input
                type="text"
                className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
                placeholder="Search"
              />
            </label>
            <button
              className="rounded-md border bg-orange px-4 py-2 text-sm text-white"
              style={{ backgroundColor: "#e95d39" }}
            >
              Export
            </button>
            <button
              className="bg-orange-500 rounded-md px-4 py-2 text-sm text-white"
              style={{ backgroundColor: "#e95d39" }}
            >
              Pay now
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-2">
          <QueryTable
            columns={columns}
            list={data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
}
