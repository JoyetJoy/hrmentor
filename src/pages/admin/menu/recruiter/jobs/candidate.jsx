import RecruiterSideBar from "@/components/sidebars/recruiter/RecruiterSideBar";
import QueryTable from "@/components/table/QueryTable";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TableData } from "@/constants/tableDummy";
import {
  ArrowLeft,
  ArrowUpFromLine,
  Filter,
  MoveDiagonal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import MenuHeader from "@/components/common/MenuHeader";

function Candidate() {
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const list = React.useMemo(() => TableData, [TableData]);
  const linkData = [
    { name: "Candidate", path: "/admin/recruiter/candidate" },
    { name: "Promote", path: "/admin/recruiter/promote" },
    { name: "Refer", path: "/admin/recruiter/refer" },
  ];

  const columns = React.useMemo(
    () => [
      {
        header: "Applied Date",
        accessorKey: "addNo",
        className: "text-[#181C3A] ",
      },
      {
        header: "Candidate name",
        accessorKey: "name",
      },

      {
        header: "Candidate Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div className="flex h-8 w-fit items-center justify-center rounded-md bg-[#473A990D] px-3 font-medium text-[#7D067F]">
            {row?.original?.status}
          </div>
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="relative flex gap-1 text-xs text-[#181C3A]">
            <Link
              //   to={`/sales/invoices/detail-view/${row?.original?.id}`}
              to={"/admin/recruiter/candidate"}
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#F5F5F5] p-2 text-black"
            >
              <MoveDiagonal className="h-3 w-3" />
            </Link>

            <span className="flex size-7 cursor-pointer items-center justify-center rounded-full bg-[#F5F5F5] text-red-700">
              <Trash2 className="h-3 w-3" />
            </span>
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
        <h1 className="flex items-center gap-1 text-base font-bold text-[#2C2C2C]">
          <ArrowLeft className="size-4" />
          Project manger
        </h1>
        <div className="flex gap-5">
          {linkData.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative text-sm ${
                location.pathname === item.path
                  ? "active-menu px-2 font-extrabold text-[#181C3A] before:bg-[#181C3A]"
                  : "text-[#808080]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="my-3 flex flex-row gap-2">
        <RecruiterSideBar />
        <div className="flex w-full flex-col justify-between rounded-md bg-white p-7">
          <div className="mb-5 flex flex-row items-center justify-between">
            <h1 className="text-base font-semibold text-black">Candidate</h1>
            <div className="flex items-center gap-2 font-semibold text-white">
              <label className="input flex h-10 min-h-10 items-center gap-2 border-gray-300 pr-28 outline-none">
                <Search className="size-4 object-contain text-gray-200" />
                <input
                  type="text"
                  className="grow placeholder:text-sm placeholder:text-gray-200 focus:outline-none"
                  placeholder="Search"
                />
              </label>
              <div className="h-10 min-h-10 rounded-md border border-gray-400 bg-white p-3">
                <Filter className="size-4 text-black" />
              </div>
              <Link
                to={""}
                className="btn h-10 min-h-10 bg-bgColor-100 text-sm text-white hover:bg-bgColor-100"
              >
                <Plus className="size-5" />
                Add Candidate
              </Link>
              <Link
                to={""}
                className="btn h-10 min-h-10 bg-bgColor-100 text-sm text-white hover:bg-bgColor-100"
              >
                <ArrowUpFromLine className="size-4 text-white" />
                Export
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
      </div>
    </>
  );
}

export default Candidate;
