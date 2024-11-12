import MenuHeader from "@/components/common/MenuHeader";
import { ArrowLeft, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import QueryTable from "@/components/table/QueryTable";
import CreateJobSideBar from "@/components/sidebars/recruiter/CreateJobSideBar";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "@/api";
import { INTERVIEW_GUIDELINE } from "@/api/recruiter";
import Loader from "@/components/ui/Loader";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import InterviewGuideline from "@/components/popups/recruiter/createjob/SaveInterviewGuideline";

function RecJobInterviewGuide() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jid = searchParams.get("jid");
  const [popupOpen, setPopupOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 10;

  // Fetch List
  const { data: recInterviewGuidelinesbyId, isLoading } = useQuery({
    queryKey: ["recInterviewGuidelinesbyId", currentPage, jid, keyword],
    queryFn: () =>
      newRequest
        .get(`${INTERVIEW_GUIDELINE}/${jid}`, {
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
    if (recInterviewGuidelinesbyId) {
      setTotalPages(recInterviewGuidelinesbyId?.data?.last_page);
    }
  }, [recInterviewGuidelinesbyId]);

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
        header: "Interviewer",
        accessorKey: "name",
        cell: ({ row }) => (
          <>
            {row.original?.interviewer_value?.first_name}{" "}
            {row.original?.interviewer_value?.sur_name}
          </>
        ),
      },
      {
        header: "Interview Type",
        accessorKey: "name",
        cell: ({ row }) => (
          <>{row.original?.interview_type?.interview_type_name}</>
        ),
      },

      {
        header: "Interview Mode",
        accessorKey: "recruiting_role",
        cell: ({ row }) => <>{row.original?.interview_mode_value?.mode_name}</>,
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <div
              onClick={() => {
                setPopupOpen(true);
                setSelectedField(row?.original?.id);
              }}
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </div>
            <div
              onClick={() => {
                setDeletePopup(true);
                setSelectedField(row?.original?.id);
              }}
              className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2"
            >
              <Trash2 className="size-3" />
            </div>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        selectedId={selectedField}
        qrkey={"recInterviewGuidelinesbyId"}
        api={INTERVIEW_GUIDELINE}
      />
      <InterviewGuideline
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"recInterviewGuidelinesbyId"}
        api={INTERVIEW_GUIDELINE}
        jid={jid}
      />
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className="flex flex-row items-start justify-between gap-3">
        <div className="w-full">
          <div className="mb-3 mt-1 flex items-center justify-between">
            <h1 className="flex flex-row items-center justify-center gap-2 text-base font-bold text-black">
              <ArrowLeft
                onClick={() => history.back()}
                className="h-4 w-4 cursor-pointer"
              />
              Create New Job
              <div className="h-4 w-[.07rem] bg-gray-dimlight"></div>
              <span className="text-sm font-medium text-textcolor-darkCharcoal">Team</span>
            </h1>
            <button
              onClick={() => {
                navigate(`/admin/recruiter/jobs/create-refferal?jid=${jid}`);
              }}
              className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
            >
              Next
            </button>
          </div>
          <div className="w-full rounded-md bg-white px-7 py-4">
            <div className="mb-7 flex flex-col gap-1">
              <p className="text-base font-medium text-textcolor-darkCharcoal">
                Choose the right interview guide.
              </p>
            </div>
            <div className="my-4 flex items-center justify-between gap-7">
              <div className="input-box flex min-h-11 w-fit min-w-96 items-center gap-2 rounded-md border border-gray-soft placeholder:text-black">
                <Search className="h-4 w-4 text-gray-dark" />
                <input
                  type="text"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  className="h-full w-full placeholder:text-gray-dark"
                  placeholder="Search"
                />
              </div>
              <Link
                onClick={() => {
                  setPopupOpen(true);
                }}
                className="btn flex h-11 min-h-11 min-w-44 flex-row items-center gap-1 whitespace-nowrap rounded-[0.3rem] bg-black/80 text-xs text-white hover:bg-bgColor-100"
              >
                <Plus className="h-4 w-4" />
                Add Interview Guides
              </Link>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <QueryTable
                columns={columns}
                list={recInterviewGuidelinesbyId?.data?.listing ?? []}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
        <CreateJobSideBar stepCounter={4} />
      </div>
    </>
  );
}

export default RecJobInterviewGuide;
