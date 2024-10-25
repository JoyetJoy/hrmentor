import { newRequest } from "@/api";
import { DASHBOARD_OPEN_JOBS } from "@/api/recruiter";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { MoveDiagonal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OpenJobs() {
  // dashboard-openJobs
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const pageLimit = 10;

  // Fetch List
  const { data: openJobs, isLoading } = useQuery({
    queryKey: ["openJobs", currentPage],
    queryFn: () =>
      newRequest
        .get(DASHBOARD_OPEN_JOBS, {
          params: {
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
        header: "Title",
        accessorKey: "job_title",
      },
      {
        header: "Date Created",
        accessorKey: "location",
        cell: ({ row }) => (
          <p className="">
            {dayjs(row?.original?.created_at).format("YYYY-MM-DD")}
          </p>
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <Link
              to={`/admin/recruiter/jobs/view?jid=${row.original.id}`}
              className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <MoveDiagonal className="size-3" />
            </Link>
          </div>
        ),
      },
    ],
    [openJobs],
  );

  return (
    <>
      <div className="h-screen">
        <h1 className="mb-4 text-sm font-bold text-[#2C2C2C]">Open Jobs</h1>
        <QueryTable columns={columns} list={openJobs} />
      </div>
    </>
  );
}
