import React, { useEffect, useState } from "react";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Plus, Search, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { EMPLOYEE_EXPERIENCE, newRequest } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import ExperienceEdit from "@/components/popups/employee_access/profile_management/ExperienceEdit";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import ProfileSidebar from "@/components/sidebars/employee_access/profile_management/ProfileSideBar";
import { useUserStore } from "@/lib/slices/auth.slice";

export default function Experience() {
  const location = useLocation();
  const { setUser, user } = useUserStore((state) => ({
    setUser: state.setUser,
    user: state.user,
  }));
  const u_id = user?.user?.id;

  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const pageLimit = 10;

  useEffect(() => {
    if (selectedField) {
      setPopupOpen(true);
    }
  }, [selectedField]);

  // Fetch List
  const { data: employeeExperience, isLoading } = useQuery({
    queryKey: ["employeeExperience", currentPage, u_id, keyword],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_EXPERIENCE}/${u_id}`, {
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
    if (employeeExperience) {
      setTotalPages(employeeExperience?.last_page);
    }
  }, [employeeExperience]);

  const columns = React.useMemo(
    () =>
      [
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
          header: "Job role",
          accessorKey: "job_role",
        },
        {
          header: "Employer",
          accessorKey: "employer",
        },
        {
          header: "Employer details",
          accessorKey: "employer_details",
        },
        {
          header: "Start Date",
          accessorKey: "start_date",
        },
        {
          header: "End Date",
          accessorKey: "end_date",
          Cell: ({ row }) => {
            return <div className="flex px-2">{row.original?.end_date}</div>;
          },
        },
        {
          header: "Document",
          accessorKey: "document",
          cell: ({ row }) => (
            <div className="flex">
              <a
                href={row.original?.document}
                target="_blank"
                className={`${row.original?.document? 'text-[#1A75FF] underline underline-offset-2':''}`}
                rel="noopener noreferrer"
              >
                {row.original?.document?'document':'No document'}
                
              </a>
            </div>
          ),
        },
        {
          header: "Action",
          accessorKey: "action",
          cell: ({ row }) => (
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedField(row.original.id)}
                className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
              >
                <img
                  src="/assets/icons/admin/marker.svg"
                  className="w-full object-contain"
                />
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeletePopup(true);
                  setSelectedId(row.original.id);
                }}
                className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-darkCharcoal"
              >
                <Trash2 className="size-3" />
              </button>
            </div>
          ),
        },
      ].filter(Boolean),
    [employeeExperience],
  );
  return (
    <div className="flex flex-col ">
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        id={selectedId}
        qrKey={"employeeExperience"}
        api={EMPLOYEE_EXPERIENCE}
      />
      <ExperienceEdit
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"employeeSkills"}
        api={EMPLOYEE_EXPERIENCE}
        uid={u_id}
      />
      <MenuHeaderEmployeeAccess
        pathlink={""}
        currentpage={"Experience"}
        subMenu={"ProfileManagement"}
        icon={<ChevronRight className="size-3" />}
      />
      <div className="flex gap-x-3 h-screen">
        <ProfileSidebar />
        <div className="flex w-full flex-col">
          <div className="w-full h-full rounded-md bg-white px-5 py-4">
            <div className="my-4 flex items-center justify-between">
              <div className="flex items-center gap-7">
                <h5 className="text-lg font-bold">Experience</h5>
                <div className="input flex h-10 min-h-10 w-80 items-center gap-2 border border-gray-platinum text-sm outline-none placeholder:text-black hover:border-gray-platinum">
                  <Search className="size-4 text-gray-dark" />
                  <input
                    type="text"
                    onChange={(e) => setKeyword(e.target.value)}
                    className="h-full w-full placeholder:text-gray-dark"
                    placeholder="Search"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  setPopupOpen(true);
                }}
                className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                <Plus className="size-4" />
                Add Experience
              </button>
            </div>
            <div>
              {isLoading ? (
                <div className="flex min-h-96 w-full items-center justify-center bg-white">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
                </div>
              ) : (
                <QueryTable
                  columns={columns}
                  list={employeeExperience?.listing ?? []}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
