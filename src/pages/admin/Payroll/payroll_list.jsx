import QueryTable from "@/components/table/QueryTable";
import { Search } from "lucide-react";
import React, { useState } from "react";
import PayrollHeader from "@/components/employee_access/common/PayrollHeader";
import { useNavigate } from "react-router-dom";
import { EMPLOYEE_DEPARTMENT_LIST } from "@/api/master";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";

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

export default function PayrollList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const navigate = useNavigate();
  const { control } = useForm();
  const [monthValue, setMonthValue] = useState('weekly')

  const { data: departmentListing } = useEmployeeMaster(
    EMPLOYEE_DEPARTMENT_LIST,
    "employeeDepartmentList",
  );

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
      <PayrollHeader page={2} />
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header Navigation */}
        <div className="mb-4 flex items-center justify-between">
          {/* Left Section */}
          <div>
            <h4 className="text-lg font-bold">Pay List</h4>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button 
            onClick={()=> setMonthValue('weekly')}
            className={`rounded-md border px-4 py-2 text-sm ${monthValue === "weekly"? 'text-white bg-[#e95d39]' : 'bg-white text-gray-600'} `}>
              Weekly
            </button>
            <button
              onClick={()=> setMonthValue('monthly')}
              className={`rounded-md border px-4 py-2 text-sm ${monthValue === "monthly"? 'text-white bg-[#e95d39]' : 'bg-white text-gray-600'} `}
            >
              Monthly
            </button>
            <button 
            onClick={()=> setMonthValue('monthlytwice')}
            className={`rounded-md border px-4 py-2 w-full text-sm ${monthValue === "monthlytwice"? 'text-white bg-[#e95d39]' : 'bg-white text-gray-600'} `}
            >
              Monthly twice
            </button>
            <label className="input flex h-10 min-h-10 items-center gap-2 rounded-md border-none pr-28 outline-none">
              <Search className="size-4 object-contain text-gray-dark" />
              <input
                type="text"
                className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
                placeholder="Search"
              />
            </label>
            <Controller
              name="department_id"
              className=""
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isSearchable={true}
                  styles={customSelectStyles}
                  options={departmentListing}
                  placeholder="Select Department"
                  className="input-box min-w-[13rem]"
                />
              )}
            />
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
