import MenuHeader from "@/components/common/MenuHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { customSelectStyles } from "@/utils/customStyles";
import dayjs from "dayjs";
import { ArrowDownToLine, ChevronRight, Eye, Search } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

export default function AdminPaySlip() {
  const [date, setDate] = useState(new Date());
  const [keyword, setKeyword] = useState("");

  const handleYearChange = (selectedOption) => {
    const updatedDate = dayjs(date).year(selectedOption.value).toDate();
    setDate(updatedDate);
  };

  // Generate a list of years dynamically
  const years = Array.from({ length: 11 }, (_, i) => ({
    value: 2020 + i,
    label: (2020 + i).toString(),
  }));

  // Define table columns
  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "sno",
        cell: ({ row }) => <div className="flex px-2">{row.index + 1}</div>,
      },
      {
        header: "Month",
        accessorKey: "month",
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <Link
              to="/admin/employee/payslip/payslip-view"
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <Eye className="size-3" />
            </Link>
            <Link
              t0="/admin/employee/payslip/payslip-view"
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <ArrowDownToLine className="size-3" />
            </Link>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col">
      <MenuHeader
        pathlink=""
        currentpath="Payslip"
        menu="Menu"
        subMenu="Employee"
        icon={<ChevronRight className="size-3" />}
        page={2}
      />
      <div className="flex gap-x-3">
        <EmployeesSidebar />
        <div className="mt-2 w-full">
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-bold">PaySlip</h5>
            <div className="flex items-center gap-3">
              {/* Search input */}
              <div className="input flex h-10 min-h-10 w-80 items-center gap-2 border border-gray-platinum text-sm outline-none placeholder:text-black hover:border-gray-platinum">
                <Search className="size-4 text-gray-dark" />
                <input
                  type="text"
                  onChange={(e) => setKeyword(e.target.value)}
                  className="h-full w-full placeholder:text-gray-dark"
                  placeholder="Search"
                />
              </div>

              {/* Year Select */}
              <Select
                options={years}
                isSearchable
                onChange={handleYearChange}
                styles={customSelectStyles}
                placeholder={dayjs(date).format("YYYY")}
                className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-y-min mt-5 h-screen w-full overflow-y-auto rounded-md bg-white p-7">
            <QueryTable columns={columns} list={"NA"} />
          </div>
        </div>
      </div>
    </div>
  );
}
