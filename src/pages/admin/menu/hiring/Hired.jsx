import React, { useEffect, useState } from "react";
import MenuHeaderHiring from "@/components/hiring/MenuHeader";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "@/api";
import { HIRING_READY } from "@/api/hiring";
import Loader from "@/components/ui/Loader";
import QueryTable from "@/components/table/QueryTable";
import { CircleX, Filter, Search, X } from "lucide-react";
import ChooseOfferLetterType from "@/components/popups/hiring/ready-to-hiring/ChooseTypeOffer";

export const HiredCandidates = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selectedField, setSelectedField] = useState(0);
  const [keyword, setKeyword] = useState("");
  const pageLimit = 10;

  // Fetch List
  const { data: hiredCandidates, isLoading } = useQuery({
    queryKey: ["hiredCandidates", currentPage, keyword],
    queryFn: () =>
      newRequest
        .get("hired-candidates", {
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
    if (hiredCandidates) {
      setTotalPages(hiredCandidates?.last_page);
    }
  }, [hiredCandidates]);

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
        header: "Candidate name",
        accessorKey: "candidate_name",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-1 px-2">
              <div className="flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-hrmprimaryorange/20 text-sm font-bold uppercase">
                {row.original?.candidate_name?.charAt(0)}
              </div>
              {row.original?.candidate_name}
            </div>
          );
        },
      },
      {
        header: "Type",
        accessorKey: "phone_number",
      },
      {
        header: "Job title",
        accessorKey: "job_title",
      },
      {
        header: "Department",
        accessorKey: "designation",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div className="flex h-8 w-fit items-center justify-center rounded bg-hrmprimaryorange/10 px-3 text-xs font-semibold text-hrmprimaryorange">
            {row?.original?.status?.status_name}
          </div>
        ),
      },
    ],
    [hiredCandidates, currentPage],
  );

  return (
    <>
      <ChooseOfferLetterType
        open={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
      />
      <MenuHeaderHiring page={2} />
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2 font-semibold text-white">
          <div className="text flex items-center justify-between gap-1 pr-2 text-sm font-semibold text-black">
            Hired candidates
          </div>
          <div className="flex items-center gap-2">
            <label className="input flex h-9 min-h-9 min-w-72 items-center gap-2 border-none outline-none">
              <Search className="size-4 object-contain text-gray-dark" />
              <input
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                type="text"
                className="w-full grow text-sm text-gray-dark placeholder:text-sm placeholder:font-normal focus:outline-none"
                placeholder="Search"
              />
            </label>
            <div className="h-9 min-h-9 rounded-md border border-gray-platinum bg-white p-[0.58rem]">
              <Filter
                className="stroke size-4 font-medium text-black"
                strokeWidth={2}
              />
            </div>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <QueryTable
            columns={columns}
            list={hiredCandidates?.listing ?? []}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </>
  );
};
