import { newRequest } from "@/api";
import { JOBS_CANDIDATE } from "@/api/recruiter";
import MenuHeader from "@/components/common/MenuHeader";
import RecruiterSideBar from "@/components/sidebars/recruiter/RecruiterSideBar";
import QueryTable from "@/components/table/QueryTable";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function RecViewJobDetail() {
  const [keyword, setKeyword] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jid = searchParams.get("jid");
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 10;

  // Fetch List
  const { data: recJobCandidatesByid, isLoading } = useQuery({
    queryKey: ["recJobCandidatesByid", currentPage, jid, keyword],
    queryFn: () =>
      newRequest
        .get(`${JOBS_CANDIDATE}/${jid}`, {
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
    if (recJobCandidatesByid) {
      setTotalPages(recJobCandidatesByid?.last_page);
    }
  }, [recJobCandidatesByid]);

  const { data: jobDetailView, isLoading: jobDetailViewLoading } = useQuery({
    queryKey: ["jobDetailView", jid],
    queryFn: () =>
      newRequest.get(`job-detail-view/${jid}`).then((res) => {
        return res.data;
      }),
    enabled: !!jid,
  });

  const columns = React.useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "sno",
        cell: ({ row }) => {
          return (
            <div className="flex px-2">
              {row.index + 1 + (currentPage - 1) * pageLimit}
            </div>
          );
        },
      },

      {
        header: "Applied date",
        accessorKey: "date_applied",
      },
      {
        header: "Candidate name",
        accessorKey: "name",
        cell: ({ row }) => (
          <>
            {row.original?.first_name} {row.original?.middle_name}{" "}
            {row.original?.sur_name}
          </>
        ),
      },

      {
        header: "Candidate status",
        accessorKey: "candidate_status",
        cell: ({ row }) => (
          <div
            style={{
              backgroundColor:
                row?.original?.candidate_status?.background_color,
              color: row?.original?.candidate_status?.text_color,
            }}
            className="flex h-8 w-fit items-center justify-center rounded-md px-3 font-semibold"
          >
            {row?.original?.candidate_status?.status_name}
          </div>
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <Link className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2">
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </Link>
          </div>
        ),
      },
    ],
    [],
  );
  return (
    <>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className="my-4 flex flex-row items-center justify-between">
        <h1 className="flex items-center gap-1 text-base font-bold capitalize text-[#2C2C2C]">
          <ArrowLeft
            onClick={() => {
              history.back();
            }}
            className="size-4 cursor-pointer"
          />
          {jobDetailView?.jobDetail?.job_title}
        </h1>
        <div className="flex gap-5 text-sm font-semibold text-hrmprimaryorange">
          Candidates
        </div>
      </div>
      <div className="my-3 flex flex-row gap-2">
        <RecruiterSideBar jid={jid} jobDetailView={jobDetailView} />
        <div className="w-full">
          {isLoading ? (
            <Loader />
          ) : (
            <QueryTable
              columns={columns}
              list={recJobCandidatesByid?.listing ?? []}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default RecViewJobDetail;
