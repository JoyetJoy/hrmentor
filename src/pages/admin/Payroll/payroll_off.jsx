import QueryTable from "@/components/table/QueryTable";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayrollHeader from "@/components/employee_access/common/PayrollHeader";

const data = [
  {
    slNo: 1,
    department: "IT department",
    totalEmployees: 0,
    otHours: "00hr 0min",
    otPay: "£0",
    netPay: "£0",
    paymentDate: "30/11/2024",
    status: "Pay off generated",
  },
  {
    slNo: 2,
    department: "Accountant",
    totalEmployees: 0,
    otHours: "00hr 0min",
    otPay: "£0",
    netPay: "£0",
    paymentDate: "30/11/2024",
    status: "Pay off generated",
  },
  {
    slNo: 3,
    department: "HR department",
    totalEmployees: 0,
    otHours: "00hr 0min",
    otPay: "£0",
    netPay: "£0",
    paymentDate: "30/11/2024",
    status: "Pay off generated",
  },
];

export default function PayrollOff() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const navigate = useNavigate();

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
        cell: ({ row }) => (
          <div className={`flex items-center gap-2 justify-center py-2 rounded-md ${row.original.status==='Pay off generated'? 'bg-[#ccf0da] text-[#13ba56]' : 'bg-[#f8f2f8] text-[#7e0880]'}`}>
            {row.original.status}
          </div>
        ),
      },

      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                navigate("/admin/payroll/payoffdetail");
              }}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
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
