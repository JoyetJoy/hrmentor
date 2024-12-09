import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import LeaveSideBar from "@/components/sidebars/employee_access/leave/LeaveSideBar";
import QueryTable from "@/components/table/QueryTable";
import { customSelectStyles } from "@/utils/customStyles";
import {Search } from "lucide-react";
import React, { useState } from "react";
import Select from "react-select";

function BankHoliday() {
  const handleYearChange = (selectedOption) => {
    const updatedDate = dayjs(date).year(selectedOption.value).toDate();
    setDate(updatedDate);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const columns = React.useMemo(
    () => [
      {
        header: "Sl.no",
        accessorKey: "sno",
        cell: ({ row }) => {
          return (
            <div className="">
              NA
              {/* {row.index + 1 + (currentPage - 1) * pageLimit} */}
            </div>
          );
        },
      },
      {
        header: "Holiday Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="">
            <p>
              {row?.original?.first_name} {row?.original?.sur_name || "NA"}
            </p>
          </div>
        ),
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => (
          <p className="">{row?.original?.employee?.unique_id || "NA"}</p>
        ),
      },
      {
        header: "Location",
        accessorKey: "loaction",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.employee?.designation?.designation_name || "NA"}
          </p>
        ),
      },
      {
        header: "Type",
        accessorKey: "type",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.employee?.employment_type?.employment_type_name ||
              "NA"}
          </p>
        ),
      },
    ],
    [],
  );
  return (
    <div className="flex flex-col">
      <MenuHeaderEmployeeAccess pathlink={""} currentpage={"Leave"} />
      <div className="flex w-full items-center justify-between px-4 py-2">
        <h5 className="text-md font-bold">Bank Holiday</h5>
      </div>
      <div className="flex gap-3">
        <LeaveSideBar />
        <div className="max-w-8xl mb-10 w-full rounded-md bg-white p-5">
          <div className="mb-2 flex w-full items-center justify-between py-2">
            <Select
              isSearchable={true}
              onChange={handleYearChange}
              styles={customSelectStyles}
              className="input-box h-10 w-52 rounded-md border-gray-muted focus:border-gray-muted"
            />
            <label className="input flex h-10 min-h-10 min-w-96 items-center gap-2 rounded-md border border-gray-soft outline-none">
              <Search className="size-4 object-contain text-gray-dark" />
              <input
                type="text"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
                placeholder="Search"
              />
            </label>
          </div>
          <QueryTable
            columns={columns}
            list={"NA"}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}

export default BankHoliday;
