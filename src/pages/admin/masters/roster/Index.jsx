import { EMPLOYEE, newRequest } from "@/api";
import { ROSTER_LIST } from "@/api/setup";
import MenuHeader from "@/components/common/MenuHeader";
// import EditRoster from "@/components/popups/master/roster/EditRoster";
import NewRoster from "@/components/popups/master/roster/NewRoster";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Filter,
  MoveDiagonal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import RosterHeader from "@/components/common/RosterHeader";

export default function RosterList({ rosterDetails, setRosterDetails }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);

  const [keyword, setKeyword] = useState("");

  const pageLimit = 10;
  const { data: rosterDetailss } = useQuery({
    queryKey: ["rosterDetailss"],
    queryFn: () =>
      newRequest.get(ROSTER_LIST).then((res) => {
        return res?.data || { data: [], last_page: 1 };
      }),
  });

  useEffect(() => {
    if (rosterDetailss) {
      setTotalPages(rosterDetailss?.last_page);
    }
  }, [rosterDetailss]);

  const columns = React.useMemo(
    () => [
      {
        header: "Roster ID",
        accessorKey: "id",
      },
      {
        header: "Created Date & Time",
        accessorKey: "created_at",
        cell: ({ row }) => (
          <p>
            {row?.original?.roster_details?.created_at
              ? moment(row.original.roster_details.created_at).format(
                  "YYYY-MM-DD, HH:mm:ss",
                )
              : "N/A"}
          </p>
        ),
      },
      {
        header: "Start Date",
        accessorKey: "start_date",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.roster_details?.start_date
              ? moment(row.original.roster_details.start_date).format(
                  "YYYY-MM-DD",
                )
              : "N/A"}
          </p>
        ),
      },
      {
        header: "Shift",
        accessorKey: "name",
        cell: ({ row }) => (
          <p className="whitespace-nowrap">
            {row?.original?.shift_details?.name ?? "N/A"}
          </p>
        ),
      },
      {
        header: "Created By",
        accessorKey: "start_time",
        cell: ({ row }) => row.original?.roster_details?.user_name || "N/A",
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              // onClick={handleClick}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <MoveDiagonal className="size-3" />
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

  // const handleClick = (toOpen) => {
  //   setPopupEditOpen(true);
  // };
  const handleCreate = (toOpen) => {
    setPopupOpen(true);
  };
  return (
    <>
      {/* <EditRoster popupOpen={popupEditOpen} setPopupOpen={setPopupEditOpen}/> */}
      <NewRoster
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        rosterDetails={rosterDetails}
        setRosterDetails={setRosterDetails}
      />
      <RosterHeader page={1} />
      <div className="mb-4 mt-1 flex items-center justify-between">
        <div className="flex gap-3">
          <label className="input flex h-10 min-h-10 min-w-96 items-center gap-2 rounded-md border border-gray-soft outline-none">
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
            className="btn flex h-10 min-h-10 items-center bg-hrmprimaryorange px-3 text-xs font-semibold text-white hover:bg-hrmblue"
          >
            <Plus className="size-4" />
            Create Roster
          </Link>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex w-full gap-3 rounded-md border border-gray-300 bg-white px-4 py-4">
          <QueryTable
            columns={columns}
            list={rosterDetailss?.listing}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
        <div className="flex h-screen w-1/2 flex-col gap-2 rounded-md border border-gray-300 bg-white p-6">
          <>
            <div class="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gray-darklight p-2">
                  <img
                    src="/assets/icons/setup/re-box.svg"
                    alt="icons"
                    className="h-4 w-4"
                  />
                </div>
                <div>
                  <h3 class="text-sm font-normal">Afternoon shift</h3>
                  <p class="text-sm">01:00PM - 08:00PM</p>
                </div>
              </div>

              <div className="rounded-full bg-[#F7F7F7] p-2">
                <img
                  src="/assets/icons/setup/re-Edit.svg"
                  alt="icons"
                  className="h-5 w-5"
                />
              </div>
            </div>
            <div className="border-b border-gray-dark"></div>
            <div class="mb-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <p class="text-black">Start Date</p>
                <p class="font-semibold">12-11-2024</p>
              </div>
              <div>
                <p class="text-black">End Date</p>
                <p class="font-semibold">12-11-2024</p>
              </div>
              <div>
                <p class="text-black">Clock in time</p>
                <p cla ss="font-semibold">01:00 PM</p>
              </div>
              <div>
                <p class="text-black">Clock out time</p>
                <p class="font-semibold">08:00 PM</p>
              </div>
              <div>
                <p class="text-black">Break time start</p>
                <p class="font-semibold">03:00 PM</p>
              </div>
              <div>
                <p class="text-black">Break time end</p>
                <p class="font-semibold">04:00 PM</p>
              </div>
              <div>
                <p class="text-black">Department</p>
                <p class="font-semibold">General Medicine</p>
              </div>
              <div>
                <p class="text-black">Work location</p>
                <p class="font-semibold">Trivandrum</p>
              </div>
              <div>
                <p class="text-black">Work area</p>
                <p class="font-semibold">HRD</p>
              </div>
              <div>
                <p class="text-black">Pay type</p>
                <p class="font-semibold">Per day</p>
              </div>
              <div class="col-span-2">
                <p class="text-black">Created by</p>
                <p class="font-semibold">Sneha</p>
              </div>
            </div>

            <div class="flex items-center gap-3 rounded-lg bg-gray-100 p-3">
              <div className="rounded-full bg-[#845d5d] p-4"></div>
              <div>
                <p class="text-sm font-medium">Akhil Soman</p>
                <p class="text-xs font-medium text-darkblack">
                  UI/UX Design Intern
                </p>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
