import React, { useEffect, useState } from "react";
import { Search, Filter, ArrowUpFromLine, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { MoveDiagonal } from "lucide-react";

import QueryTable from "@/components/table/QueryTable";
import MenuHeader from "@/components/common/MenuHeader";
import { getRandomPastelColor } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { EMPLOYEE, newRequest } from "@/api";

export default function EmployeeLists() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
  const pageLimit = 10;

  // Fetch List
  const { data: employeeListing, isLoading } = useQuery({
    queryKey: ["employeeListing", currentPage, keyword],
    queryFn: () =>
      newRequest
        .get(EMPLOYEE, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    if (employeeListing) {
      setTotalPages(employeeListing?.last_page);
    }
  }, [employeeListing]);

  // employee;
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="flex items-center gap-x-2">
            <p
              style={{ backgroundColor: getRandomPastelColor() }}
              className="flex size-8 items-center justify-center rounded-full bg-[#F3] font-medium text-[#202020]"
            >
              {row?.original?.first_name?.match(/\b\w/g).join("")}
            </p>
            <p>
              {row?.original?.first_name} {row?.original?.sur_name}
            </p>
          </div>
        ),
      },
      {
        header: "ID Number",
        accessorKey: "id",
        cell: ({ row }) => (
          <p className="">#EMP{row?.original?.employee?.unique_id}</p>
        ),
      },
      {
        header: "Designation",
        accessorKey: "designation",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.employee?.designation?.designation_name}
          </p>
        ),
      },
      {
        header: "Employment Type",
        accessorKey: "employment_type",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.employee?.employment_type?.employment_type_name}
          </p>
        ),
      },
      {
        header: "Department",
        accessorKey: "department",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.employee?.department?.department_name ?? "Nill"}
          </p>
        ),
      },
      {
        header: "Work Location",
        accessorKey: "location",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.employee?.work_location?.work_location_name ??
              "Nill"}
          </p>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div
            style={{
              backgroundColor:
                row?.original?.employee?.employment_status?.background_color,
              color: row?.original?.employee?.employment_status?.text_color,
            }}
            className="flex h-8 w-fit items-center justify-center rounded-md px-3 font-semibold"
          >
            {row?.original?.employee?.employment_status?.status_name}
          </div>
        ),
      },

      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center justify-start gap-3 text-xs">
            <Link
              to={`/admin/employee/details/?uid=${row.original.id}`}
              className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <MoveDiagonal className="size-3" />
            </Link>
            <Link
              to={`/admin/employee/primary/?uid=${row.original.id}`}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </Link>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="">
      <MenuHeader
        menu={"Menu"}
        currentpath={"Employee"}
        centertextmain={"Number of licence is limited to 8:"}
        centertext={"Add More Licence"}
        activeMenu={"Employee"}
      />
      <div className="mb-4 mt-1 flex items-center justify-between">
        <label className="input flex h-10 min-h-10 min-w-96 items-center gap-2 rounded-md border border-[#EBEBF0] outline-none">
          <Search className="size-4 object-contain text-gray-200" />
          <input
            type="text"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            className="grow placeholder:text-sm placeholder:text-gray-200 focus:outline-none"
            placeholder="Search"
          />
        </label>
        <div className="flex items-center gap-2">
          <div className="h-10 min-h-10 rounded-md border border-gray-400 bg-white p-3">
            <Filter className="size-4" />
          </div>
          <div className="flex h-10 min-h-10 flex-row items-center justify-center gap-1 rounded-md border border-gray-400 bg-white px-4 py-1">
            <ArrowUpFromLine className="size-4" />
            <h1 className="text-xs font-semibold">Export</h1>
          </div>
          <Link
            to={"/admin/employee/create"}
            className="btn flex h-10 min-h-10 items-center bg-hrmprimaryorange px-3 text-xs font-semibold text-white hover:bg-[#030E5C]"
          >
            <Plus className="size-4" />
            Add Employee{" "}
          </Link>
        </div>
      </div>
      {isLoading ? (
        <div className="flex min-h-96 w-full items-center justify-center bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
        </div>
      ) : (
        <QueryTable
          columns={columns}
          list={employeeListing?.listing}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
