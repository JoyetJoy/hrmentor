import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TableData } from "@/constants/tableDummy";
import {
  ArrowLeft,
  Filter,
  MoveDiagonal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import QueryTable from "@/components/table/QueryTable";
import MenuHeader from "@/components/common/MenuHeader";
import FilterCandidate from "@/components/popups/recruiter/FilterCandidate";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "@/api";
import { GET_CANDIDATES } from "@/api/recruiter";

function CandidatesList() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
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

  console.log(candidateListing);

  useEffect(() => {
    if (candidateListing) {
      setTotalPages(candidateListing?.last_page);
    }
  }, [candidateListing]);

  const columns = React.useMemo(
    () => [
      {
        header: "Date applied",
        accessorKey: "name",
      },
      { header: "Job ID", accessorKey: "addNo" },
      {
        header: "Candidate name",
        accessorKey: "dignation",
        cell: ({ row }) => <p className="">{row?.original?.designation}</p>,
      },
      {
        header: "Contact",
        accessorKey: "type",
      },
      {
        header: "Job title",
        accessorKey: "designation",
        cell: ({ row }) => <p className="">{row?.original?.designation}</p>,
      },
      {
        header: "Email",
        accessorKey: "location",
      },
      {
        header: "Designation",
        accessorKey: "location",
      },
      {
        header: "Workflow status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div className="flex h-8 w-fit items-center justify-center rounded-md border border-[#92BEE4] bg-[#F0F8FF] px-3 text-xs font-medium text-black">
            {row?.original?.status}
          </div>
        ),
      },
      {
        header: "Source",
        accessorKey: "location",
      },

      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center justify-start gap-2 text-xs">
            <Link
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
              to="/admin/recruiter/candidate/profile"
            >
              <MoveDiagonal className="h-3 w-3" />
            </Link>
          </div>
        ),
      },
    ],

    [],
  );
  return (
    <div className="">
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Candidates"}
      />
      <div className="mx-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-white">
          <div className="text flex items-center justify-between gap-1 pr-2 text-sm font-semibold text-black">
            <ArrowLeft className="size-4" />
            All candidates
          </div>
          <label className="input flex h-9 min-h-9 items-center gap-2 border-none pr-28 outline-none">
            <Search className="size-4 object-contain text-gray-200" />
            <input
              type="text"
              className="grow text-sm placeholder:text-sm placeholder:font-normal placeholder:text-gray-200 focus:outline-none"
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
          <div className="h-9 min-h-9 rounded-md border border-gray-400 bg-white p-[0.58rem]">
            <Trash2
              className="stroke size-4 font-medium text-black"
              strokeWidth={2}
            />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <Link
            to={"/admin/recruiter/candidate/save"}
            className="btn flex h-10 min-h-10 items-center bg-hrmprimaryorange px-5 text-xs font-semibold text-white hover:bg-[#030E5C]"
          >
            <Plus className="size-5" strokeWidth={2} />
            Add Candidate
          </Link>
        </div>
      </div>
      {/* <QueryTable
        columns={columns}
        list={candidateListing?.listing ?? []}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      /> */}
    </div>
  );
}

export default CandidatesList;
