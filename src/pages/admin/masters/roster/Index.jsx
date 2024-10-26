import { EMPLOYEE } from "@/api";
import MenuHeader from "@/components/common/MenuHeader";
import NewRoster from "@/components/popups/master/roster/NewRoster";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Filter, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RosterList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);
  const [keyword, setKeyword] = useState("");


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

  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "sno",
        cell: ({ row }) => row.index + 1,
      },
      {
        header: "Shift Name",
        accessorKey: "name",
        cell: ({ row }) => <p>
        {data?.first_name}
      </p>
      },
      {
        header: "Department",
        accessorKey: "department",
        cell: ({ row }) =>   <p className="">
        {row?.original?.employee?.department?.department_name ?? "Nill"}
      </p>
      },
      {
        header: "Location",
        accessorKey: "location",
        cell: ({ row }) => <p className="">
        {row?.original?.employee?.work_location?.work_location_name ??
          "Nill"}
      </p>,
      },
      {
        header: "Start Time",
        accessorKey: "start_time",
        cell: ({ row }) => row.original.start_time || "N/A",
      },
      {
        header: "End Time",
        accessorKey: "end_time",
        cell: ({ row }) => row.original.end_time || "N/A",
      },
      {
        header: "Duration",
        accessorKey: "shift_duration",
        cell: ({ row }) => row.original.shift_duration || "N/A",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => row.original.details || "N/A",
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
                alt="Edit"
              />
            </button>
            <button
              type="button"
              className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );
  const data = [
    { sno: 1, details: "vmffghgfhfghj" },
    { sno: 2, details: "fdgdfghfh" },
  ];
  const handleCreate = (toOpen) => {
    setPopupOpen(true);
  };
  return (
    <>
      <NewRoster popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      <MenuHeader menu="Menu" currentpath="Roster" />
      <div className="mb-4 mt-1 flex items-center justify-between">
        <div className="flex gap-3">
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
          <div className="h-10 min-h-10 rounded-md border border-gray-400 bg-white p-3">
            <Filter className="size-4" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-10 min-h-10 flex-row items-center justify-center gap-1 rounded-md border border-gray-400 bg-white px-4 py-1">
            <Calendar className="size-4" />
            <h1 className="text-xs font-semibold">Calender View</h1>
          </div>
          <Link
            to={""}
            onClick={handleCreate}
            className="btn flex h-10 min-h-10 items-center bg-hrmprimaryorange px-3 text-xs font-semibold text-white hover:bg-[#030E5C]"
          >
            <Plus className="size-4" />
            Create Roster
          </Link>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex gap-3 rounded-md border border-gray-300 bg-white px-4 py-4">
          <QueryTable
            columns={columns}
            list={data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
        <div className="flex h-screen w-full gap-3 rounded-md border border-gray-300 bg-white px-4 py-4"></div>
      </div>
    </>
  );
}
