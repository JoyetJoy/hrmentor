import QueryTable from "@/components/table/QueryTable";
import { Eye, Search } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PayrollHeader from "@/components/employee_access/common/PayrollHeader";
import { useQuery } from "@tanstack/react-query";
import { PAYROLL_APPROVE, PAYROLL_GET_VIEW, PAYROLL_VIEW } from "@/api/payroll";
import { newRequest } from "@/api";
import { getCurrentDateISO } from "@/utils/helpers";
import toast from "react-hot-toast";

export default function PayListDetails() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const navigate = useNavigate();
  const { id, monthid } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");
  const department = searchParams.get("department");
  const start = getCurrentDateISO(startDate);
  const end = getCurrentDateISO(endDate);
  const pageLimit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["payrolldetails", id, start, end],
    queryFn: () =>
      newRequest
        .get(`${PAYROLL_VIEW}`, {
          params: {
            schedule: monthid,
            department_id:id,
            start_date: start,
            end_date: end,
          },
        })
        .then((res) => res.data),
    enabled: !!id,
  });
  
  const Approve = async () => {
    const body = {
      department_id: id,
      schedule: monthid,
      start_date: start,
      end_date: end,
    };
  
    try {
      const response = await newRequest.post(PAYROLL_APPROVE, body);
      toast.success(response.data.original.message)
    } catch (error) {
      console.error("Error approving payroll:", error);
      toast.error('Failed to approve payroll. Please try again.')
    }
  };
  
  const columns = React.useMemo(
    () => [
      {
        id: "select", // Unique ID for this column
        header: ({ table }) => (
          <input
            type="checkbox"
            onChange={(e) => {
              const checked = e.target.checked;
              table.getToggleAllRowsSelectedHandler()(checked);
            }}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
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
        header: "Emp ID",
        accessorKey: "employee_id",
      },
      {
        header: "Emp Name",
        accessorKey: "employee_name",
      },
      {
        header: "Total Worked hrs",
        accessorKey: "total_working_hours",
      },
      {
        header: "Worked hours pay",
        accessorKey: "departmentTotalSalary",
        cell: ({ row }) => (
          <div className="flex px-2">
            {Number(row.original.departmentTotalSalary || 0).toFixed(2)}
          </div>
        ),
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
        accessorKey: "net_pay",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div
            className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 ${row.original.status === "Approved" ? "bg-[#ccf0da] text-[#13ba56]" : "bg-[#f8f2f8] text-[#7e0880]"}`}
          >
            {row.original.status === "not_approved"
              ? "Not Approved"
              : "Approved"}
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
                navigate(`/admin/payroll/paylistedit/${row.original.payrun_id}`+`?start_date=${start}&end_date=${end}&empid=${row.original.employee_id}`);
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
      <div className="min-h-screen bg-gray-100 px-0 pb-6 pt-0">
        {/* Header Navigation */}
        <div className="mb-4 flex items-center justify-between">
          {/* Left Section */}
          <div>
            <h4 className="text-lg font-bold">{department}</h4>
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
              className="bg-orange-500 rounded-md px-4 py-2 text-sm text-white"
              onClick={() => Approve()}
              style={{ backgroundColor: "#e95d39" }}
            >
              Approve
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
