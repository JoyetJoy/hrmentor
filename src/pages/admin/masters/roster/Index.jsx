import { EMPLOYEE, newRequest } from "@/api";
import { ROSTER_LIST, DELETE_ROSTER } from "@/api/setup";
import NewRoster from "@/components/popups/master/roster/NewRoster";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  MoveDiagonal,
  Plus,
  Search,
  Trash2,
  Files,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import RosterHeader from "@/components/common/RosterHeader";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import EditRoster from "@/components/popups/master/roster/EditRoster";

export default function RosterList({ rosterDetails, setRosterDetails }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editpopupOpen, setEditPopupOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [rosterList, setRosterList] = useState("");
  const [selectedRoster, setSelectedRoster] = useState(null);
  const [copy, setCopy] = useState(false);
  const pageLimit = 10;

  const { data: rosterDetailss } = useQuery({
    queryKey: ["rosterDetailss", currentPage, keyword],
    queryFn: () =>
      newRequest
        .get(ROSTER_LIST, {
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
    setRosterList(rosterDetailss);
  }, [rosterDetailss]);

  useEffect(() => {
    if (rosterDetailss) {
      setTotalPages(rosterDetailss?.last_page);
      if (!selectedRoster && rosterDetailss.listing?.length > 0) {
        setSelectedRoster(rosterDetailss.listing[0]?.roster_details);
      }
    }
  }, [rosterDetailss, selectedRoster]);

  const handleCreate = (toOpen) => {
    setPopupOpen(true);
  };

  console.log(selectedRoster);

  const handleView = (roster) => {
    setSelectedRoster(roster);
  };

  const handleEdit = (roster) => {
    console.log("Selected roster for editing:", roster);
    setEditPopupOpen(true);
  };
  const handleCopy = (roster) => {
    console.log("Selected roster for editing:", roster);
    setCopy(true);
    setEditPopupOpen(true);
  };

  console.log(rosterDetailss?.listing);

  const columns = React.useMemo(
    () => [
      {
        header: "Roster ID",
        accessorKey: "roster_id",
        cell: ({ row }) => row.original?.roster_details?.roster_id || "N/A",
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
        header: "End Date",
        accessorKey: "end_date",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.roster_details?.end_date
              ? moment(row.original.roster_details.end_date).format(
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
            {row.original?.roster_details?.shift_details?.name ?? "N/A"}
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
              onClick={() => {
                handleCopy(row.original?.roster_details);
              }}
              className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
            >
              <Files className="size-3" />
            </button>
            <Link
              type="button"
              to="#"
              onClick={() => handleView(row.original?.roster_details)}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <MoveDiagonal className="size-3" />
            </Link>
            <button
              type="button"
              onClick={() => {
                setDeletePopup(true);
                setSelectedField(row.original?.roster_details?.roster_id);
              }}
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
  console.log(selectedRoster);
  return (
    <>
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        id={selectedField}
        qrkey={"rosterDetailss"}
        type={"rosterdelete"}
        api={DELETE_ROSTER}
      />
      <NewRoster popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      <EditRoster
        editpopupOpen={editpopupOpen}
        setEditPopupOpen={setEditPopupOpen}
        selectedRoster={selectedRoster}
        copy={copy}
        setCopy={setCopy}
      />

      <RosterHeader page={1} />
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

        <div className="flex items-center gap-3">
          <Link
            to={"/admin/roster/calendar"}
            className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-black"
          >
            <Calendar className="size-4 text-black" />
            <span>Calendar View</span>
          </Link>
          <button
            type="button"
            onClick={() => handleCreate()}
            className="flex items-center gap-2 rounded-md bg-hrmprimaryorange px-3 py-2 text-sm text-white"
          >
            <Plus strokeWidth={2} className="size-4" />
            <span>Create Roster</span>
          </button>
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
        {selectedRoster && (
          <div className="flex h-screen w-1/2 flex-col gap-2 rounded-md border border-gray-300 bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gray-darklight p-2">
                  <img
                    src="/assets/icons/setup/re-box.svg"
                    alt="icons"
                    className="h-4 w-4"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-normal">
                    {selectedRoster?.shift_details?.name || ""}
                  </h3>
                  <p className="text-sm">
                    {moment(
                      selectedRoster.shift_details.start_time,
                      "HH:mm:ss",
                    ).format("hh:mm A")}{" "}
                    -{" "}
                    {moment(
                      selectedRoster.shift_details.end_time,
                      "HH:mm:ss",
                    ).format("hh:mm A")}
                  </p>
                </div>
              </div>
              <div
                className="cursor-pointer rounded-full bg-gray-darklight p-2"
                onClick={() => {
                  handleEdit(selectedRoster);
                }}
              >
                <img
                  src="/assets/icons/setup/re-Edit.svg"
                  alt="icons"
                  className="h-5 w-5"
                />
              </div>
            </div>
            <div className="border-b border-gray-dark"></div>
            <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <p className="text-black">Start Date</p>
                <p className="font-semibold">
                  {moment(selectedRoster?.start_date).format("YYYY-MM-DD") ||
                    ""}
                </p>
              </div>
              <div>
                <p className="text-black">End Date</p>
                <p className="font-semibold">
                  {moment(selectedRoster?.end_date).format("YYYY-MM-DD") || ""}
                </p>
              </div>
              <div>
                <p className="text-black">Start Time</p>
                <p className="font-semibold">
                  {moment(
                    selectedRoster.shift_details.start_time,
                    "HH:mm:ss",
                  ).format("hh:mm A") || ""}
                </p>
              </div>
              <div>
                <p className="text-black">End Time</p>
                <p className="font-semibold">
                  {moment(
                    selectedRoster.shift_details.end_time,
                    "HH:mm:ss",
                  ).format("hh:mm A") || ""}
                </p>
              </div>
              <div>
                <p className="text-black">Break time start</p>
                <p className="font-semibold">
                  {selectedRoster?.shift_details?.break_times?.[0]
                    ?.break_start_time || "00:00"}
                </p>
              </div>
              <div>
                <p className="text-black">Break time end</p>
                <p className="font-semibold">
                  {selectedRoster?.shift_details?.break_times?.[0]
                    ?.break_end_time || "00:00"}
                </p>
              </div>
              <div>
                <p className="text-black">Department</p>
                <p className="font-semibold">
                  {selectedRoster?.shift_details?.department_name || ""}
                </p>
              </div>
              <div>
                <p className="text-black">Work location</p>
                <p className="font-semibold">
                  {selectedRoster?.shift_details?.worklocation_name || ""}
                </p>
              </div>
              <div>
                <p className="text-black">Work area</p>
                <p className="font-semibold">
                  {selectedRoster?.shift_details?.workArea_name || ""}
                </p>
              </div>
              <div>
                <p className="text-black">Pay type</p>
                <p className="font-semibold">
                  {selectedRoster?.shift_details?.pay_type || ""}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-black">Created by</p>
                <p className="font-semibold">
                  {selectedRoster?.user_name || ""}
                </p>
              </div>
            </div>

            {selectedRoster?.employees &&
              selectedRoster?.employees?.map((item) => {
                return (
                  <div
                    key={item?.id}
                    className="flex items-center gap-3 rounded-lg bg-gray-100 p-3"
                  >
                    <div className="h-11 w-11 rounded-full bg-gray-dark  overflow-hidden">
                      <img
                        className="w-full h-full object-cover "
                        src={item?.profile_image}
                        alt="employee image"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {item?.first_name || ""}
                      </p>
                      <p className="text-xs font-medium text-darkblack">
                        {item?.designation || ""}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
}
