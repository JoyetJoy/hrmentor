import { newRequest, NEWS_LISt } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import NewsEventHeader from "@/components/common/NewsEventHeader";
import QueryTable from "@/components/table/QueryTable";
import { useUserStore } from "@/lib/slices/auth.slice";
import { useQuery } from "@tanstack/react-query";
import { Eye, Filter, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function News() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const pageLimit = 10;

  useEffect(() => {
    if (selectedField) {
      setPopupOpen(true);
    }
  }, [selectedField]);
  // const { setUser, user } = useUserStore((state) => ({
  //   setUser: state.setUser,
  //   user: state.user,
  // }));
  // const u_id = user.id;
  // Fetch List

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

  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "id",
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
        accessorKey: "created by",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.employee?.designation?.designation_name || "NA"}
          </p>
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
          <div className="flex h-8 w-fit items-center justify-center whitespace-nowrap rounded-md px-3 font-semibold">
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
            <Link className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-red">
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
          list={employeeNews ?? []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
