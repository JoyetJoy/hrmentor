import MenuHeader from "@/components/common/MenuHeader";
import { ArrowLeft, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import QueryTable from "@/components/table/QueryTable";
import CreateJobSideBar from "@/components/sidebars/recruiter/CreateJobSideBar";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "@/api";
import { REC_HIRING_TEAM } from "@/api/recruiter";
import SaveHiringTeam from "@/components/popups/recruiter/createjob/SaveHiringTeam";
import Loader from "@/components/ui/Loader";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";

function RecJobHiringTeam() {
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
  const { data: hiringTeamsByid, isLoading } = useQuery({
    queryKey: ["hiringTeamsByid", currentPage, jid, keyword],
    queryFn: () =>
      newRequest
        .get(`${REC_HIRING_TEAM}/${jid}`, {
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
    if (hiringTeamsByid) {
      setTotalPages(hiringTeamsByid?.last_page);
    }
  }, [hiringTeamsByid]);

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
        header: "Employee name",
        accessorKey: "name",
        cell: ({ row }) => <>{row.original?.employee?.first_name}</>,
      },

      {
        header: "Recruiting role",
        accessorKey: "recruiting_role",
        cell: ({ row }) => (
          <>
            {row.original?.employee?.recruiting_role == 1
              ? "Hiring Manager"
              : "Interview Analyst"}
          </>
        ),
      },
      // {
      //   header: "Designation",
      //   accessorKey: "designation",
      //   cell: ({ row }) => (
      //     <>{row.original?.employee?.designation?.designation_name}</>
      //   ),
      // },
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
            <button
              onClick={() => {
                setDeletePopup(true);
                setSelectedField(row?.original?.id);
              }}
              className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2"
            >
              <Trash2 className="size-3" />
            </button>
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
        qrkey={"hiringTeamsByid"}
        api={REC_HIRING_TEAM}
      />
      <SaveHiringTeam
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"hiringTeamsByid"}
        api={REC_HIRING_TEAM}
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
              {/* <ArrowLeft
                onClick={() => history.back()}
                className="h-4 w-4 cursor-pointer"
              /> */}
              Create New Job
              <div className="h-4 w-[.07rem] bg-gray-dimlight"></div>
              <span className="text-sm font-medium text-textcolor-darkCharcoal">
                Team
              </span>
            </h1>
            <button
              onClick={() => {
                navigate(
                  `/admin/recruiter/jobs/interview-guideline?jid=${jid}`,
                );
              }}
              className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
            >
              Next
            </button>
          </div>
          <div className="w-full rounded-md bg-white px-7 py-4">
            <div className="mb-7 flex flex-col gap-1">
              <p className="text-base font-medium text-textcolor-darkCharcoal">
                Choose the right team for the job.
              </p>
              <p className="text-medium text-sm text-gray-dark">
                This job's hiring team can include group or individual people
                who are helping you fill this position.
              </p>
            </div>
            <div className="my-4 flex items-center justify-between gap-7">
              <label className="input flex h-10 min-h-10 min-w-80 flex-row items-center gap-2 rounded-md border border-gray-platinum outline-none hover:border-gray-platinum">
                <Search
                  className="size-4 object-contain text-gray-dark"
                  strokeWidth={2}
                />
                <input
                  type="text"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  value={keyword}
                  className="grow text-sm text-black placeholder:text-sm placeholder:font-medium placeholder:text-black/50 focus:outline-none"
                  placeholder="Search"
                />
              </label>
              <Link
                onClick={() => {
                  setPopupOpen(true);
                }}
                className="hover:bg-bgColor-100 btn flex h-11 min-h-11 min-w-44 flex-row items-center gap-1 whitespace-nowrap rounded-[0.3rem] bg-black/80 text-xs text-white"
              >
                <Plus className="h-4 w-4" />
                Add hiring team
              </Link>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <QueryTable
                columns={columns}
                list={hiringTeamsByid?.data?.listing}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
        <CreateJobSideBar stepCounter={3} />
      </div>
    </>
  );
}

export default RecJobHiringTeam;
