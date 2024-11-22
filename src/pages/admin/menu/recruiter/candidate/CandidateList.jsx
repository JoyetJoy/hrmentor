import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Filter,
  Plus,
  Search,
  Eye
} from "lucide-react";
import QueryTable from "@/components/table/QueryTable";
import MenuHeader from "@/components/common/MenuHeader";
import FilterCandidate from "@/components/popups/recruiter/FilterCandidate";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "@/api";
import { GET_CANDIDATES } from "@/api/recruiter";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import Loader from "@/components/ui/Loader";

function CandidatesList() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const [keyword, setKeyword] = useState("");
  const pageLimit = 10;

  // Fetch List
  const { data: candidateListing, isLoading } = useQuery({
    queryKey: ["candidateListing", currentPage, keyword],
    queryFn: () =>
      newRequest
        .get(GET_CANDIDATES, {
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
    if (candidateListing) {
      setTotalPages(candidateListing?.data?.last_page);
    }
  }, [candidateListing]);

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
        header: "Date applied",
        accessorKey: "date_applied",
      },
      { header: "Job ID", accessorKey: "job_id" },
      {
        header: "Candidate name",
        accessorKey: "candidate_name",
      },
      {
        header: "Contact",
        accessorKey: "phone_number",
      },
      {
        header: "Job title",
        accessorKey: "job_title",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      // {
      //   header: "Designation",
      //   accessorKey: "designation",
      // },
      {
        header: "Workflow status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div
            style={{
              backgroundColor: row?.original?.status?.background_color,
              color: row?.original?.status?.text_color,
            }}
            className="flex h-8 w-fit items-center justify-center rounded-md px-3 font-semibold"
          >
            {row?.original?.status?.status_name}
          </div>
        ),
      },
      {
        header: "Source",
        accessorKey: "source",
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center justify-start gap-2 text-xs">
            <Link
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
              to={`/admin/recruiter/candidate/profile?cid=${row?.original?.id}`}
            >
              <Eye className="h-3 w-3" />
            </Link>
          </div>
        ),
      },
    ],
    [candidateListing, currentPage],
  );

  return (
    <>
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        selectedId={selectedField}
        qrkey={"candidateListing"}
        api={GET_CANDIDATES}
      />
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Candidates"}
      />
      <div className="mx-3 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-white">
          <div className="text flex items-center justify-between gap-1 pr-2 text-sm font-semibold text-black">
            <ArrowLeft className="size-4" />
            All candidates
          </div>
          <label className="input flex h-9 min-h-9 min-w-72 items-center gap-2 border-none outline-none">
            <Search className="size-4 object-contain text-gray-dark" />
            <input
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              type="text"
              className="w-full grow text-sm text-black/70 placeholder:text-sm placeholder:font-normal focus:outline-none"
              placeholder="Search"
            />
          </label>
          <div className="relative">
            <div className="h-9 min-h-9 rounded-md border border-gray-400 bg-white p-[0.58rem]">
              <Filter
                className="stroke size-4 font-medium text-black"
                strokeWidth={2}
              />
            </div>
            <FilterCandidate
              popupOpen={popupOpen}
              setPopupOpen={setPopupOpen}
            />
          </div>
         
        </div>
        <div className="flex items-center gap-7">
          <Link
            to={"/admin/recruiter/candidate/save"}
            className="btn flex h-10 min-h-10 items-center bg-hrmprimaryorange px-5 text-xs font-semibold text-white hover:bg-hrmblue"
          >
            <Plus className="size-5" strokeWidth={2} />
            Add Candidate
          </Link>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <QueryTable
          columns={columns}
          list={candidateListing?.data?.listing ?? []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}

export default CandidatesList;
