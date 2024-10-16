import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Filter, MoveDiagonal, Plus, Search, Trash2 } from "lucide-react";
import QueryTable from "@/components/table/QueryTable";
import MenuHeader from "@/components/common/MenuHeader";
import { GET_JOBS } from "@/api/recruiter";
import { newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/ui/Loader";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";

function RecruiterJobs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [byStatus, setByStatus] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const pageLimit = 10;

  // Fetch List
  const { data: jobListing, isLoading } = useQuery({
    queryKey: ["jobListing", currentPage, byStatus, keyword],
    queryFn: () =>
      newRequest
        .get(GET_JOBS, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
            by_status: byStatus,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    if (jobListing) {
      setTotalPages(jobListing?.last_page);
    }
  }, [jobListing]);

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
        header: "Job Title",
        accessorKey: "job_title",
      },
      {
        header: "Job ID",
        accessorKey: "unique_job_id",
      },
      {
        header: "Type",
        accessorKey: "type",
        cell: ({ row }) => (
          <p className="">
            {row?.original?.employment_type?.employment_type_name}
          </p>
        ),
      },
      {
        header: "Designation",
        accessorKey: "designation",
        cell: ({ row }) => (
          <p className="">{row?.original?.designation?.designation_name}</p>
        ),
      },
      {
        header: "Department",
        accessorKey: "department",
        cell: ({ row }) => (
          <p className="">{row?.original?.department?.department_name}</p>
        ),
      },
      {
        header: "Location",
        accessorKey: "location",
        cell: ({ row }) => (
          <p className="">{row?.original?.country?.country_name}</p>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div
            style={{
              backgroundColor: row?.original?.job_status?.background_color,
              color: row?.original?.job_status?.text_color,
            }}
            className="flex h-8 w-fit items-center justify-center rounded-md px-3 font-semibold"
          >
            {row?.original?.job_status?.status_name}
          </div>
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <Link className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2">
              <MoveDiagonal className="size-3" />
            </Link>
            <Link className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2">
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </Link>
            {row?.original?.job_status?.status_name === "Draft" ? (
              <button
                onClick={() => {
                  setDeletePopup(true);
                  setSelectedField(row?.original?.id);
                }}
                className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2"
              >
                <Trash2 className="size-3" />
              </button>
            ) : null}
          </div>
        ),
      },
    ],
    [jobListing, byStatus],
  );
  return (
    <>
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        selectedId={selectedField}
        qrkey={"jobListing"}
        api={GET_JOBS}
      />
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className="items-centerm flex justify-between pb-3 pt-2">
        <div className="flex items-center gap-2 text-white">
          <Link
            to="/admin/recruiter/jobs/post"
            className="btn flex h-10 min-h-10 items-center rounded bg-hrmprimaryorange px-5 text-xs font-semibold text-white hover:bg-[#030E5C]"
          >
            <Plus className="size-5" strokeWidth={2} />
            Create Job
          </Link>
          <Link className="btn h-10 min-h-10 rounded-md border border-[#E6E7EF] bg-white px-5 text-xs font-bold text-[#323232] hover:border-[#E6E7EF] hover:bg-white">
            View Career Page
          </Link>
          <label className="input flex h-10 min-h-10 min-w-80 flex-row items-center gap-2 rounded-md border border-[#E6E7EF] outline-none hover:border-[#E6E7EF]">
            <Search
              className="size-4 object-contain text-gray-200"
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
          <div className="h-10 min-h-10 rounded-md border border-gray-400 bg-white p-3">
            <Filter
              className="stroke size-4 font-medium text-black"
              strokeWidth={2}
            />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div
            onClick={() => {
              setByStatus(null);
            }}
            className={`cursor-pointer text-sm font-bold ${byStatus === null ? "text-black/70" : "text-black/40"}`}
          >
            All Jobs
          </div>
          <div
            onClick={() => {
              setByStatus(2);
            }}
            className={`cursor-pointer text-sm font-bold ${byStatus === 2 ? "text-black/70" : "text-black/40"}`}
          >
            Open Jobs
          </div>
          <div
            onClick={() => {
              setByStatus(1);
            }}
            className={`cursor-pointer text-sm font-bold ${byStatus === 1 ? "text-black/70" : "text-black/40"}`}
          >
            Draft
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <QueryTable
          columns={columns}
          list={jobListing?.listing ?? []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}

export default RecruiterJobs;
