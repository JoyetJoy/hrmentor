import { newRequest, NEWS_LISt } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import NewsEventHeader from "@/components/common/NewsEventHeader";
import QueryTable from "@/components/table/QueryTable";
import { useUserStore } from "@/lib/slices/auth.slice";
import { useQuery } from "@tanstack/react-query";
import { Eye, Filter, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function News() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const pageLimit = 10;
  const navigate = useNavigate();

  // const { setUser, user } = useUserStore((state) => ({
  //   setUser: state.setUser,
  //   user: state.user,
  // }));
  // const u_id = user.id;
  const handleClick = () => {
    setPopupOpen(true);
  };

  const handleClickView = () => {
    setDeletePopup(true);
  };

  const { data: employeeNews, isLoading } = useQuery({
    queryKey: ["employeeNews", currentPage, keyword],
    queryFn: () =>
      newRequest
        .get(NEWS_LISt, {
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
    if (employeeNews) {
      setTotalPages(employeeNews?.last_page);
    }
  }, [employeeNews]);

  const renderStatusBadge = (status) => {
    const statusColors = {
      draft: "bg-yellow-100 text-yellow-600",
      save_as_draft: "bg-blue-100 text-blue-600",
      Canceled: "bg-purple-100 text-purple-600",
      "On hold": "bg-red-100 text-red-600",
      published: "bg-green-100 text-green-600",
    };
    return (
      <span
        className={`rounded-md px-3 py-1 text-sm font-medium ${statusColors[status]}`}
      >
        {status}
      </span>
    );
  };
  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "id",
        cell: ({ row }) => {
          return (
            <div className="">
              {row.index + 1 + (currentPage - 1) * pageLimit}
            </div>
          );
        },
      },
      {
        header: "News title",
        accessorKey: "news_title",
        cell: ({ row }) => (
          <div className="flex items-center gap-x-2">
            <p>{row?.original?.news_title || "NA"}</p>
          </div>
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
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <td>{renderStatusBadge(row.original.status)}</td> // Render badge based on status
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center justify-start gap-3 text-xs">
            <span
              className="flex cursor-pointer items-center rounded-full bg-gray-soft p-2"
              onClick={() => {
                const id = row.original.id;
                navigate(`/admin/news-event/create-news?id=${id}&&popup=view`);
              }}
            >
              <Eye className="size-3" />
            </span>
            <Link
              onClick={() => {
                const id = row.original.id;
                navigate(`/admin/news-event/create-news?id=${id}&&popup=edit`);
              }}
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
    [employeeNews],
  );
  return (
    <div className="h-screen">
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        id={selectedId}
        qrKey={"employeeNews"}
        api={NEWS_LISt}
      />

      <NewsEventHeader page={1} />
      <div className="mb-4 mt-1 flex items-center justify-between">
        <h1 className="text-base font-semibold">News</h1>
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
            to={"/admin/news-event/create-news"}
            className="btn flex h-10 min-h-10 items-center bg-hrmprimaryorange px-6 text-xs font-semibold text-white hover:bg-hrmblue"
          >
            <Plus className="size-4" />
            Add News{" "}
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
          list={employeeNews?.data ?? []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
