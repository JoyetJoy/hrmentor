import React, { useState } from "react";
import MenuHeader from "@/components/common/MenuHeader";
import QueryTable from "@/components/table/QueryTable";
import MenuHeaderCandidate from "@/components/recruiter/candidate/MenuHeader";
import RecCreateInterview from "@/components/popups/recruiter/candiadate/CreateInterview";
import { CANIDATE_INTERVIEWS } from "@/api/recruiter";
import { useLocation } from "react-router-dom";
import { newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import RecCandidateInterviewActions from "@/components/popups/recruiter/candiadate/CandidateInterviewAction";

function CandidateInterviews() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const [actionType, setActionType] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const tableData = [
    {
      id: 1,
      interviewType: "Face to face",
      interviewer: "Shajin",
      scheduleddate: "10/10/2023",
      scheduledtime: "10 AM",
      screeningstatus: "Completed",
      status: "Failed",
    },
    {
      id: 2,
      interviewType: "Face to face",
      interviewer: "Shajin",
      scheduleddate: "10/10/2023",
      scheduledtime: "10 AM",
      screeningstatus: "Completed",
      status: "Passed",
    },
  ];

  // CANIDATE_INTERVIEWS;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cid = searchParams.get("cid");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const pageLimit = 10;

  // Fetch List
  const { data: candidateInterviewsById, isLoading } = useQuery({
    queryKey: ["candidateInterviewsById", currentPage, keyword],
    queryFn: () =>
      newRequest
        .get(`${CANIDATE_INTERVIEWS}/${cid}`, {
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
  console.log(candidateInterviewsById);

  const columns = [
    {
      accessorKey: "id",
      header: "Sl. no",
    },
    {
      accessorKey: "interviewType",
      header: "Interview Type",
    },
    {
      accessorKey: "interviewer",
      header: "Interviewer",
    },
    {
      accessorKey: "scheduleddate",
      header: "Scheduled date",
    },
    {
      accessorKey: "scheduledtime",
      header: "Scheduled time",
    },
    {
      accessorKey: "screeningstatus",
      header: "Screening status",
      cell: ({ row }) => {
        const status = row.original.screeningstatus;
        return (
          <div
            className={`border-[#FFEE52]" flex h-8 w-28 items-center justify-center rounded border bg-[#FFEE52]/10 px-9`}
          >
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div
            className={`border-[#FFEE52]" flex h-8 w-20 items-center justify-center rounded border bg-[#FFEE52]/10 px-9`}
          >
            {status}
          </div>
        );
      },
    },
  ];

  return (
    <>
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
                onClick={() => setPopupOpen(true)}
                className="h-10 rounded bg-hrmprimaryorange px-7 text-sm text-white"
              >
                Add Interview
              </button>
              <button
                onClick={() => {
                  setModalOpen(true);
                  setActionType(3);
                }}
                className="h-10 rounded bg-hrmprimaryorange/5 px-10 text-sm font-medium capitalize text-black/50"
              >
                Shortlist
              </button>
              <button
                onClick={() => {
                  setModalOpen(true);
                  setActionType(4);
                }}
                className="h-10 rounded bg-hrmprimaryorange/5 px-7 text-sm font-medium capitalize text-black/50"
              >
                Move to hiring
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
                className="grow text-sm placeholder:text-sm placeholder:font-normal placeholder:text-black/40 focus:outline-none"
                placeholder="Search"
              />
            </label>
          </div>
        </div>
        <QueryTable
          list={tableData}
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
