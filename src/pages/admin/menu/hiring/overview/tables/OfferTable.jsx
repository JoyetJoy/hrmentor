import { newRequest } from "@/api";
import QueryTable from "@/components/table/QueryTable";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { Eye, Maximize2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const OfferTable = ({ api, keyword, setKeyword }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const pageLimit = 10;

  // Fetch List
  const { data: offerToBeFinalized, isLoading } = useQuery({
    queryKey: ["offerToBeFinalized", api, currentPage, keyword],
    queryFn: () =>
      newRequest
        .get(api, {
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
    if (offerToBeFinalized) {
      setTotalPages(offerToBeFinalized?.last_page);
    }
  }, [offerToBeFinalized]);

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-hrmprimaryorange/20 text-sm font-bold uppercase">
            {row.original?.candidate_name?.charAt(0)}
          </div>
          <span>{row.original.candidate_name}</span>
        </div>
      ),
    },
    {
      header: "Type",
      accessorKey: "employement_type",
    },
    {
      header: "Title",
      accessorKey: "job_title",
    },
    {
      header: "Departments",
      accessorKey: "designation",
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Sent Date",
      accessorKey: "date_applied",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div
          style={{
            backgroundColor: row?.original?.status?.background_color,
            color: row?.original?.status?.text_color,
          }}
          className="flex h-8 w-fit items-center justify-center rounded px-3 text-xs font-semibold"
        >
          {row?.original?.status?.status_name}
        </div>
      ),
    },
    {
      header: "action",
      accessorKey: "action",
      cell: ({ row }) => (
        <Link
          to={`/admin/hiring/view-candidate?cid=${row.original?.id}`}
          className="flex h-7 w-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
        >
          <Eye className="size-3" />
        </Link>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <QueryTable
          list={offerToBeFinalized?.listing || []}
          columns={columns}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};
