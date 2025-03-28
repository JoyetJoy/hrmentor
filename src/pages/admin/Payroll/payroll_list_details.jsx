import QueryTable from "@/components/table/QueryTable";
import { Eye, Search } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PayrollHeader from "@/components/employee_access/common/PayrollHeader";
import { useQuery } from "@tanstack/react-query";
import { PAYROLL_GET_VIEW } from "@/api/payroll";
import { newRequest } from "@/api";

const data = [
  {
    slNo: 1,
    department: "Kiran",
    totalEmployees: 'Emp05',
    otHours: "8hr 0min",
    tHours: "20hr 0min",
    otPay: "£3500",
    netPay: "£25000",
    paymentDate: "02/01/2024",
    status: "Approved",
  },
  {
    slNo: 2,
    department: "Amit",
    totalEmployees: 'Emp04',
    otHours: "9hr 0min",
    tHours: "20hr 0min",
    otPay: "£2500",
    netPay: "£25000",
    paymentDate: "02/14/2024",
    status: "Not approved",
  },
  {
    slNo: 3,
    department: "Raghul",
    totalEmployees: 'Emp03',
    otHours: "5hr 0min",
    tHours: "20hr 0min",
    otPay: "£2950",
    netPay: "£29500",
    paymentDate: "02/08/2024",
    status: "Not approved",
  },
];

export default function PayListDetails() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const navigate = useNavigate();
  const {id} = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");
  console.log(id);
  console.log(startDate,endDate);
  
  
  const { data, isLoading } = useQuery({
    queryKey: ["payrolldetails",id,startDate,endDate],
    queryFn: () =>
      newRequest.get(`${PAYROLL_GET_VIEW}/${id}`,{
        params:{
          start_date:startDate,
          end_date:endDate
        }
      }).then((res) => res.data),
    enabled: !!id
  });
  
  console.log(data);
  

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
        header: "Sl.No",
        accessorKey: "slNo",
      },
      {
        header: "Emp ID",
        accessorKey: "totalEmployees",
      },
      {
        header: "Emp Name",
        accessorKey: "department",
      },
      {
        header: "Total Worked hrs",
        accessorKey: "tHours",
      },
      {
        header: "Worked hours pay",
        accessorKey: "otPay",
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
          <div className={`flex items-center gap-2 justify-center py-2 rounded-md px-3 ${row.original.status==='Approved'? 'bg-[#ccf0da] text-[#13ba56]' : 'bg-[#f8f2f8] text-[#7e0880]'}`}>
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
                navigate("/admin/payroll/paylistedit");
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
              className="bg-orange-500 rounded-md px-4 py-2 text-sm text-white"
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
