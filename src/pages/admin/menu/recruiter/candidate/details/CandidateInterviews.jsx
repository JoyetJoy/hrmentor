import React, { useEffect, useState } from "react";
import MenuHeader from "@/components/common/MenuHeader";
import QueryTable from "@/components/table/QueryTable";
import MenuHeaderCandidate from "@/components/recruiter/candidate/MenuHeader";
import RecCreateInterview from "@/components/popups/recruiter/candiadate/CreateInterview";
import { CANIDATE_INTERVIEWS, JOB_DETAIL_BY_CANDIDATE } from "@/api/recruiter";
import { Link, useLocation } from "react-router-dom";
import { newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import RecCandidateInterviewActions from "@/components/popups/recruiter/candiadate/CandidateInterviewAction";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { MoveDiagonal } from "lucide-react";
import RecStartScreening from "@/components/popups/recruiter/candiadate/StartScreening";

function CandidateInterviews() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cid = searchParams.get("cid");
  const [popupOpen, setPopupOpen] = useState(false);
  const [screeningOpen, setScreeningOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const [actionType, setActionType] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // JOB DETAIL BY CANDIDATE;
  const { data: candidateAppliedJobDetail } = useEmployeeMaster(
    `${JOB_DETAIL_BY_CANDIDATE}/${cid}`,
    "candidateAppliedJobDetail",
  );

  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const pageLimit = 10;

  // Fetch List
  const { data: candidateInterviewsById, isLoading } = useQuery({
    queryKey: ["candidateInterviewsById", cid, currentPage, keyword],
    queryFn: () =>
      newRequest
        .get(CANIDATE_INTERVIEWS, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
            candidate_id: cid,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  const allStatusAreCompleted = candidateInterviewsById?.listing?.every(
    (item) => item?.interview.interview_status === 3,
  );

  useEffect(() => {
    if (candidateInterviewsById) {
      setTotalPages(candidateInterviewsById?.last_page);
    }
  }, [candidateInterviewsById]);

  const columns = [
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
      accessorKey: "interview_type_name",
      header: "Interview Type",
      cell: ({ row }) => {
        return (
          <span>
            {row.original.interview?.interview_guide_name_value?.interview_type
              ?.interview_type_name ?? "Nil"}
          </span>
        );
      },
    },
    {
      accessorKey: "interviewer",
      header: "Interviewer",
      cell: ({ row }) => {
        return (
          <span>
            {row.original.interviewers?.map((i) => (
              <span key={i?.id}>
                {i?.first_name} {i?.middle_name} {i?.sur_name}
              </span>
            ))}
          </span>
        );
      },
    },
    {
      accessorKey: "scheduled_date",
      header: "Scheduled date",
      cell: ({ row }) => {
        return <span>{row.original.interview?.scheduled_date ?? "Nil"}</span>;
      },
    },
    {
      accessorKey: "interview_time",
      header: "Scheduled time",
      cell: ({ row }) => {
        return <span>{row.original.interview?.interview_time ?? "Nil"}</span>;
      },
    },
    {
      header: "Screening Status",
      accessorKey: "interview_status_name",
      cell: ({ row }) => (
        <div
          style={{
            backgroundColor:
              row?.original?.interview?.interview_status_name?.background_color,
            color: row?.original?.interview?.interview_status_name?.text_color,
          }}
          className="flex h-8 w-fit items-center justify-center rounded-md px-3 font-semibold"
        >
          {row?.original?.interview?.interview_status_name?.status_name}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div
          style={{
            backgroundColor:
              row?.original?.interview?.interview_performance_status_name
                ?.background_color,
            color:
              row?.original?.interview?.interview_performance_status_name
                ?.text_color,
          }}
          className="flex h-8 w-fit items-center justify-center rounded-md px-3 font-semibold"
        >
          {
            row?.original?.interview?.interview_performance_status_name
              ?.status_name
          }
        </div>
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => (
        <div className="flex items-center justify-start gap-3 text-xs">
          <button
            onClick={() => {
              setScreeningOpen(true);
              setSelectedField(row.original?.interview?.id);
            }}
            className={`h-9 cursor-pointer rounded px-5 text-xs font-medium capitalize text-black/50 ${candidateAppliedJobDetail?.status > 3 ? "bg-black/50 text-white" : "bg-hrmprimaryorange/5"} ${
              row?.original?.interview?.interview_status_name?.status_name ==
              "Completed"
                ? "!bg-blue-500 !text-white"
                : ""
            }`}
          >
            {row?.original?.interview?.interview_status_name?.status_name ==
            "Completed"
              ? "Interview Finished"
              : " Start Interview"}
          </button>
          <Link className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2">
            <img
              src="/assets/icons/admin/marker.svg"
              className="w-full object-contain"
            />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <RecStartScreening
        popupOpen={screeningOpen}
        setPopupOpen={setScreeningOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"candidateInterviewsById"}
      />
      <RecCreateInterview
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"candidateInterviewsById"}
        api={CANIDATE_INTERVIEWS}
        cid={cid}
      />
      <RecCandidateInterviewActions
        popupOpen={modalOpen}
        setPopupOpen={setModalOpen}
        selectedField={actionType}
        setSelectedField={setActionType}
        qrKey={"candidateInterviewsById"}
        cid={cid}
      />
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeSubMenu={"Candidates"}
        activeMenu={"Candidates"}
      />
      <MenuHeaderCandidate page={3} />
      <div className="flex min-h-screen flex-col gap-7 bg-white px-6 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-bold">Interviews</h1>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-4">
              <button
                disabled={candidateAppliedJobDetail?.status >= 3 ? true : false}
                onClick={() => setPopupOpen(true)}
                className={`h-10 rounded px-7 text-sm text-white ${candidateAppliedJobDetail?.status >= 3 ? "bg-black/80" : "bg-hrmprimaryorange"}`}
              >
                Add Interview
              </button>
              <button
                disabled={
                  candidateAppliedJobDetail?.status > 2 && allStatusAreCompleted
                }
                onClick={() => {
                  setModalOpen(true);
                  setActionType(3);
                }}
                className={`h-10 rounded px-10 text-sm font-medium capitalize text-black/50 ${candidateAppliedJobDetail?.status > 2 ? "bg-black/80 text-white" : "bg-hrmprimaryorange/5"}`}
              >
                {candidateAppliedJobDetail?.status === 3 &&
                allStatusAreCompleted
                  ? "Shortlisted"
                  : "Shortlist"}
              </button>
              <button
                disabled={
                  candidateAppliedJobDetail?.status === 3 ? false : true
                }
                onClick={() => {
                  setModalOpen(true);
                  setActionType(4);
                }}
                className={`h-10 rounded px-7 text-sm font-medium capitalize text-black/50 ${candidateAppliedJobDetail?.status > 3 ? "bg-black/80 text-white" : "bg-hrmprimaryorange/5"}`}
              >
                {candidateAppliedJobDetail?.status === 4
                  ? "Moved to hiring"
                  : "Move to hiring"}
              </button>
            </div>
            <label className="input flex h-10 min-h-10 items-center gap-2 border border-[#EBEBF0] pr-28 outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search size-4 object-contain text-gray-200"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <input
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                className="grow text-sm placeholder:text-sm placeholder:font-normal placeholder:text-black/40 focus:outline-none"
                placeholder="Search"
              />
            </label>
          </div>
        </div>
        <QueryTable
          list={candidateInterviewsById?.listing ?? []}
          columns={columns}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default CandidateInterviews;
