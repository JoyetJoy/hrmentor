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
import PayrollHeader from "@/components/employee_access/common/PayrollHeader";

export default function Payroll() {
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
    ],
    [],
  );
  console.log(selectedRoster);
  return (
    <>
      <PayrollHeader page={1} />
      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-7 w-full gap-3 rounded-md bg-white px-4 py-4">
          <QueryTable
            columns={columns}
            list={rosterDetailss?.listing}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
          <div className="flex h-screen w-full flex-col gap-2 rounded-md  bg-white p-6">
            
            
          </div>
      </div>
    </>
  );
}
