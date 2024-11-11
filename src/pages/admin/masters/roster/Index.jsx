import { EMPLOYEE, newRequest } from "@/api";
import { ROSTER_LIST } from "@/api/setup";
import MenuHeader from "@/components/common/MenuHeader";
// import EditRoster from "@/components/popups/master/roster/EditRoster";
import NewRoster from "@/components/popups/master/roster/NewRoster";
import QueryTable from "@/components/table/QueryTable";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Filter, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RosterList({rosterDetails ,setRosterDetails}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);
  // const [popupEditOpen, setPopupEditOpen] = useState(false);

  const [keyword, setKeyword] = useState("");

  const pageLimit = 10;
  // const { data: rosterDetailss } = useEmployeeMaster(ROSTER_LIST, "rosterDetailss");
;
const { data: rosterDetailss } =
    useQuery({
      queryKey: ["rosterDetailss"],
      queryFn: () =>
        newRequest
          .get(ROSTER_LIST,)
          .then((res) => {
            return res?.data || { data: [], last_page: 1 };
          }),
    });

  useEffect(() => {
    if (rosterDetailss) {
      setTotalPages(rosterDetailss?.last_page);
    }
  }, [rosterDetailss]);
console.log(rosterDetailss)
  const columns = React.useMemo(
    () => [
      {
        header: "Roster ID",
        accessorKey: "id",
        
      },
      {
        header: "Created Date & Time",
        accessorKey: "name",
        cell: ({ row }) => (
          <p>
            {row?.original?.shift_details?.name || 'N/A'}
          </p>
        ),
      },
      {
        header: "Start Date",
        accessorKey: "start_date",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.start_date ?? 'N/A'}
          </p>
        ),
      },
      {
        header: "Shift",
        accessorKey: "location",
        cell: ({ row }) => (
          <p className="whitespace-nowrap">
            {row?.original?.shift_details?.name ?? 'N/A'}
          </p>
        ),
      },
      {
        header: "Created By",
        accessorKey: "start_time",
        cell: ({ row }) => row.original?.shift_details?.name|| 'N/A',
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={handleClick}
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
    []
  );
  const data = [
    { sno: 1, details: "vmffghgfhfghj" },
    { sno: 2, details: "fdgdfghfh" },
  ];
  const handleClick = (toOpen) => {
    setPopupEditOpen(true);
  };
  const handleCreate = (toOpen) => {
    setPopupOpen(true);
  };
  return (
    <>
    {/* <EditRoster popupOpen={popupEditOpen} setPopupOpen={setPopupEditOpen}/> */}
      <NewRoster popupOpen={popupOpen} setPopupOpen={setPopupOpen} rosterDetails={rosterDetails} setRosterDetails={setRosterDetails}  />
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
            list={rosterDetailss?.listing}
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
