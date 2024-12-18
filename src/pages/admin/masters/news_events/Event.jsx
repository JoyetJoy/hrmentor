import { EVENT_LIST, newRequest, WORK_LOCATIONS } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import NewsEventHeader from "@/components/common/NewsEventHeader";
import QueryTable from "@/components/table/QueryTable";
import { useUserStore } from "@/lib/slices/auth.slice";
import { useQuery } from "@tanstack/react-query";
import { Eye, Filter, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Event() {
  const [loading, setLoding] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const pageLimit = 10;

  const { data: eventList, isLoading } = useQuery({
    queryKey: ["eventList", currentPage, keyword],
    queryFn: () =>
      newRequest
        .get(EVENT_LIST, {
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
    if (eventList) {
      setTotalPages(eventList?.last_page);
      setCurrentPage(eventList?.current_page);
    }
  }, [eventList]);

  const handleClickView = () => {
    setDeletePopup(true);
  };

  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "sno",
        cell: ({ row }) => {
          return (
            <div className="">
              {row.index + 1 + (currentPage - 1) * pageLimit}
            </div>
          );
        },
      },
      {
        header: "Event Name",
        accessorKey: "event_title",
        cell: ({ row }) => (
          <div className="flex items-center gap-x-2">
            <p>{row?.original?.event_title || "-"}</p>
          </div>
        ),
      },
      {
        header: "Location",
        accessorKey: "location_id",
        cell: ({ row }) => (
          <p className="">{row?.original?.location_id || "NA"}</p>
        ),
      },
      {
        header: "Created by",
        accessorKey: "created_by",
        cell: ({ row }) => (
          <p className="">{row?.original?.created_by || "NA"}</p>
        ),
      },
      {
        header: "Created on",
        accessorKey: "created on",
        cell: ({ row }) => {
          const createdAt = row?.original?.created_at;
          const formattedDate = createdAt
            ? new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).format(new Date(createdAt))
            : "-";

          return <p className="">{formattedDate}</p>;
        },
      },
      {
        header: "Start date",
        accessorKey: "Start date",
        cell: ({ row }) => (
          <p className="">{row?.original?.start_date || "NA"}</p>
        ),
      },
      {
        header: "End date",
        accessorKey: "end date",
        cell: ({ row }) => (
          <p className="">{row?.original?.end_date || "NA"}</p>
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
            className="flex h-8 w-fit items-center justify-center whitespace-nowrap rounded-md px-3 font-semibold"
          >
            {row?.original?.status || "NA"}
          </div>
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center justify-start gap-3 text-xs">
            <Link
              to={""}
              className="flex cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <Eye className="size-3" />
            </Link>
            <Link
              to={""}
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </Link>
            <Link
              className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-red"
              onClick={() => {
                handleClickView();
                setSelectedId(row?.original?.id);
              }}
            >
              <Trash2 className="size-3" />
            </Link>
          </div>
        ),
      },
    ],
    [],
  );
  return (
    <div className="h-screen">
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        id={selectedId}
        qrKey={"eventList"}
        api={EVENT_LIST}
      />

      
      <NewsEventHeader page={2} />
      <div className="mb-4 mt-1 flex items-center justify-between">
        <h1 className="text-base font-semibold">Event</h1>
        <div className="flex items-center gap-2">
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
          <div className="h-10 min-h-10 rounded-md border border-gray-soft bg-white p-3">
            <Filter className="size-4" />
          </div>
          <Link
            to={"/admin/news-event/create-event"}
            className="btn flex h-10 min-h-10 items-center bg-hrmprimaryorange px-6 text-xs font-semibold text-white hover:bg-hrmblue"
          >
            <Plus className="size-4" />
            Add Events{" "}
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="flex min-h-96 w-full items-center justify-center bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
        </div>
      ) : (
        <QueryTable
          columns={columns}
          list={eventList?.data ?? []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
