import { newRequest } from "@/api";
import { REC_INTERVIEWS_LIST } from "@/api/recruiter";
import MenuHeader from "@/components/common/MenuHeader";
import RecInterviewDetailView from "@/components/popups/recruiter/interview/Detail";
import QueryTable from "@/components/table/QueryTable";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { MoveDiagonal, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

function RecInterviews() {
  const [totalPages, setTotalPages] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const [byStatus, setByStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageLimit = 10;

  // Fetch List
  const { data: interviewListing, isLoading } = useQuery({
    queryKey: ["interviewListing", currentPage, byStatus, keyword],
    queryFn: () =>
      newRequest
        .get(REC_INTERVIEWS_LIST, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
            status_id: byStatus,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    if (interviewListing) {
      setTotalPages(interviewListing?.last_page);
    }
  }, [interviewListing]);

  const columns = React.useMemo(
    () => [
      {
        header: "Candidate name",
        accessorKey: "name",
        cell: ({ row }) => (
          <div>
            {row?.original?.interview?.candidate_detail?.first_name}
            <span className="mx-1">
              {row?.original?.interview?.candidate_detail?.middle_name}
            </span>
            {row?.original?.interview?.candidate_detail?.sur_name}
          </div>
        ),
      },
      {
        header: "interview Date ",
        accessorKey: "date",
        cell: ({ row }) => (
          <div>{row?.original?.interview?.scheduled_date}</div>
        ),
      },

      {
        header: "Interviewer",
        accessorKey: "interviewers",
        cell: ({ row }) => {
          return (
            <>
              {row.original?.interviewers?.slice(0, 1).map((i) => (
                <span key={i?.id}>
                  {i?.first_name} {i?.middle_name ?? ""} {i?.sur_name}
                </span>
              ))}
              {row.original?.interviewers?.length > 2 && (
                <div
                  className="tooltip ml-1 cursor-pointer"
                  data-tip={row.original?.interviewers
                    ?.map(
                      (i) =>
                        `${i?.first_name} ${i?.middle_name ?? ""} ${i?.sur_name}`,
                    )
                    .join(", ")}
                >
                  <span className="text-[0.7rem] font-bold text-hrmprimaryorange">
                    +{row.original?.interviewers?.length - 1} more
                  </span>
                </div>
              )}
            </>
          );
        },
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div
            onClick={() => {
              setPopupOpen(true);
              setSelectedField(row.original?.interview?.id);
            }}
            className="flex size-7 cursor-pointer items-center rounded-full bg-[#F5F5F5] p-2 text-black"
          >
            <MoveDiagonal className="h-3 w-3" />
          </div>
        ),
      },
    ],

    [],
  );
  return (
    <>
      <RecInterviewDetailView
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        api={REC_INTERVIEWS_LIST}
      />
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Interviews"}
      />
      <div className="mb-4 mt-2 flex items-center justify-between">
        <label className="input flex h-11 min-h-11 min-w-96 items-center gap-2 border border-black/10 text-white outline-none">
          <Search className="size-4 object-contain text-gray-200" />
          <input
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            className="grow text-sm placeholder:text-sm placeholder:font-normal placeholder:text-gray-200 focus:outline-none"
            placeholder="Search"
          />
        </label>
        <div className="flex items-center gap-7">
          <div
            onClick={() => {
              setByStatus(null);
            }}
            className={`cursor-pointer text-sm font-bold ${byStatus === null ? "text-hrmprimaryorange" : "text-black/40"}`}
          >
            All interviews
          </div>
          <div
            onClick={() => {
              setByStatus(1);
            }}
            className={`cursor-pointer text-sm font-bold ${byStatus === 1 ? "text-hrmprimaryorange" : "text-black/40"}`}
          >
            Scheduled
          </div>
          <div
            onClick={() => {
              setByStatus(2);
            }}
            className={`cursor-pointer text-sm font-bold ${byStatus === 2 ? "text-hrmprimaryorange" : "text-black/40"}`}
          >
            Ongoing
          </div>
          <div
            onClick={() => {
              setByStatus(3);
            }}
            className={`cursor-pointer text-sm font-bold ${byStatus === 3 ? "text-hrmprimaryorange" : "text-black/40"}`}
          >
            Completed
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <QueryTable
          columns={columns}
          list={interviewListing?.listing ?? []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}

export default RecInterviews;
