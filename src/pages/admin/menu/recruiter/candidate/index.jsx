import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TableData } from "@/constants/tableDummy";
import {
  ArrowLeft,
  ArrowUpFromLine,
  ChevronRight,
  Filter,
  MoveDiagonal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import QueryTable from "@/components/table/QueryTable";
import MenuHeader from "@/components/common/MenuHeader";
import FilterCandidate from "@/components/popups/recruiter/FilterCandidate";

function CandidatesList() {
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [popupOpen, setPopupOpen] = useState(false);

  const list = React.useMemo(() => TableData, [TableData]);
  const location = useLocation();
  const isActive = (path) => path.includes(location.pathname);

  const columns = React.useMemo(
    () => [
      {
        header: "Date applied",
        accessorKey: "name",
      },
      { header: "  Job ID ", accessorKey: "addNo" },
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
          <div className="bg-[#F0F8FF] border border-[#92BEE4]  w-fit text-xs	 text-black h-8 px-3 font-medium flex items-center justify-center rounded-md ">
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
          <div className="flex items-center justify-start gap-2  text-xs ">
            <Link
              //   to={`/sales/invoices/detail-view/${row?.original?.id}`}

              className="cursor-pointer flex items-center size-7  bg-[#EBEBF0] p-2   rounded-full"
              to={""}
            >
              <MoveDiagonal className="w-3 h-3" />
            </Link>
          </div>
        ),
      },
    ],

    []
  );
  return (
    <div className="">
          <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={'Candidates'}
      />
      {/* <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        firstLink={"Dashboard"}
        secondLink={"Jobs"}
        thirdLink={"Candidate"}
        fourthLink={"Interview"}
        fifthLink={"Report"}
        six={"Setttings"}
        firstpath={"/admin/recruiter/index"}
        secondpath={"/admin/recruiter/jobs"}
        thirdpath={"/admin/recruiter/candidate"}
      /> */}
      <div className="flex justify-between items-center my-3 mx-3">
        <div className="text-white font-semibold flex  items-center gap-2">
          <div className="text-sm pr-2 font-semibold text text-black flex items-center justify-between gap-1">
            <ArrowLeft className="size-4" />
            All candidates
          </div>
          <label className="input outline-none border-none pr-28 flex items-center  gap-2 min-h-9 h-9">
            <Search className="text-gray-200 object-contain size-4" />
            <input
              type="text"
              className="grow placeholder:text-sm focus:outline-none text-sm   placeholder:text-gray-200 placeholder:font-normal "
              placeholder="Search"
            />
          </label>
          <div className="relative">
            <div className="bg-white rounded-md p-[0.58rem] border border-gray-400 min-h-9 h-9">
              <Filter
                className="size-4 text-black font-medium stroke"
                strokeWidth={2}
                onClick={() => setPopupOpen(true)}
              />
            </div>

            <FilterCandidate
              popupOpen={popupOpen}
              setPopupOpen={setPopupOpen}
            />
          </div>
          <div className="bg-white rounded-md p-[0.58rem] border border-gray-400 min-h-9 h-9">
            <Trash2
              className="size-4 text-black font-medium stroke"
              strokeWidth={2}
            />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <Link
            to={"/admin/recruiter/add-candidate"}
            className="btn hover:bg-bgColor-100 bg-bgColor-100 text-white text-sm  min-h-10 h-10"
          >
            <Plus className="size-5" />
            Add candidate
          </Link>
        </div>
      </div>
      <QueryTable
        columns={columns}
        list={list}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default CandidatesList;
