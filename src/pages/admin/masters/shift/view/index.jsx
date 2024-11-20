import { newRequest } from "@/api";
import { SHIFT_LIST } from "@/api/setup";
import MenuHeader from "@/components/common/MenuHeader";
// import Setup from "@/components/sidebars/setup";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function ShiftList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
  const pageLimit = 10;
  const { data: shiftDetails = { data: [], last_page: 1 }, isLoading } =
    useQuery({
      queryKey: ["shiftDetails", currentPage, keyword],
      queryFn: () =>
        newRequest
          .get(SHIFT_LIST, {
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
    if (shiftDetails) {
      setTotalPages(shiftDetails?.last_page);
    }
  }, [shiftDetails]);

  const columns = React.useMemo(
    () => [
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
        header: "Shift Name",
        accessorKey: "name",
        cell: ({ row }) => row?.original?.name || "N/A",
      },
      {
        header: "Department",
        accessorKey: "department_id",
        cell: ({ row }) => row?.original?.department?.label || "N/A",
      },
      {
        header: "Location",
        accessorKey: "location_id",
        cell: ({ row }) => row?.original?.location?.label || "N/A",
      },
      {
        header: "Start Time",
        accessorKey: "start_time",
        cell: ({ row }) => row?.original?.start_time || "NA",
      },
      {
        header: "End Time",
        accessorKey: "end_time",
        cell: ({ row }) => row?.original?.end_time || "N/A",
      },
      {
        header: "Duration",
        accessorKey: "shift_duration",
        cell: ({ row }) => row?.original?.shift_duration || "N/A",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div className="flex h-8 w-fit items-center justify-center rounded-md bg-mediumgreen px-3 font-semibold text-textcolor-green">
            {row.original.details || "Active"}
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
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
                alt="Edit"
              />
            </button>
            <button
              type="button"
              className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-darkCharcoal"
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        ),
      },
    ],
    [currentPage, pageLimit],
  );

  return (
    <>
      <MenuHeader menu="Menu" currentpath="Shift" />
      <div className="flex flex-col gap-x-3">
        {/* <Setup /> */}
        <div className="mb-4 mt-1 flex items-center justify-between">
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
          <Link
            to="/admin/shift/save-shift"
            className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmdarkblue/70"
          >
            <Plus className="size-4" />
            Add Shift
          </Link>
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="flex min-h-[570px] w-full flex-col gap-4 rounded-md bg-white px-5 py-4">
            {isLoading ? (
              <div className="flex min-h-96 w-full items-center justify-center bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <QueryTable
                columns={columns}
                list={shiftDetails?.data?.original?.data || []}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShiftList;
