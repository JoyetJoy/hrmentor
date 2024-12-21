import React, { useEffect, useState } from "react";
import MenuHeader from "@/components/common/MenuHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Plus, Search, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { EMPLOYEE_EXPERIENCE, newRequest } from "@/api";
import EmployeeExperienceEditForm from "@/components/popups/employees/edit/ExperienceEditForm";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

export default function Experience() {
  const location = useLocation();
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
    queryKey: ["employeeExperience", currentPage, uid, keyword],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_EXPERIENCE}/${uid}`, {
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
          accessorKey: "end_date",
          Cell: ({ row }) => {
            return <div className="flex px-2">{row.original?.start_date}</div>;
          },
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
              <Link
                href={row.original?.document}
                target="_blank"
                className="text-[#1A75FF] underline underline-offset-2"
                rel="noopener noreferrer"
              >
                document
              </Link>
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
    <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
      <DisclosureButton className="group flex w-full items-center gap-x-2">
        <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
          <ChevronRight className="size-4 group-data-[open]:rotate-90" />
        </div>
        <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
          Experience
        </p>
        <div className="border w-full "></div>
      </DisclosureButton>
      <DisclosurePanel className="grid grid-cols-1 text-sm/5 text-black/50">
        <div className="px-5 py-5">
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
      </DisclosurePanel>
    </Disclosure>
  );
}
