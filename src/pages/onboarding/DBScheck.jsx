import React, { useEffect, useState } from "react";
import MenuHeader from "@/components/common/MenuHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Eye, Plus, Search, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { EMPLOYEE_DBS_CHECK, newRequest } from "@/api";
import DbsEditForm from "@/components/popups/employees/edit/DbsEditForm";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";


export default function DBScheck() {
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
  const { data: employeeDbCheck, isLoading } = useQuery({
    queryKey: ["employeeDbCheck", currentPage, uid, keyword],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_DBS_CHECK}/${uid}`, {
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
    if (employeeDbCheck) {
      setTotalPages(employeeDbCheck?.last_page);
    }
  }, [employeeDbCheck]);
  console.log(employeeDbCheck);
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
          header: "Type",
          accessorKey: "type",
          cell: ({ row }) => {
            return <div className="flex px-2">{row.original?.dbs_type}</div>;
          },
        },
        {
          header: "Date of issue",
          accessorKey: "date",
          cell: ({ row }) => (
            <div className="flex">{row.original?.issue_date}</div>
          ),
        },
        {
          header: "Subscription",
          accessorKey: "subscription",
          cell: ({ row }) => (
            <div className="flex">{row.original?.subscription === 1? "Yes" : "No"}</div>
          ),
        },
        {
          header: "DBS Number",
          accessorKey: "dbs_number",
          Cell: ({ row }) => {
            return <div className="flex px-2">{row?.original?.dbs_number}</div>;
          },
        },
        {
          header: "Status",
          accessorKey: "status", 
          cell: ({ row }) => (
            <div className="flex h-8 w-fit cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-red-300 px-3 font-semibold text-red-700">
              {row.original?.status === 1 ? "Active" : "Inactive"}
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
                className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-darkCharcoal"
              >
                <Eye className="size-3" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedField(row.original.id)}
                className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
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
    [employeeDbCheck],
  );
  return (
    <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
      <DisclosureButton className="group flex w-full items-center gap-x-2">
        <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
          <ChevronRight className="size-4 group-data-[open]:rotate-90" />
        </div>
        <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
          DBS Check
        </p>
        <div className="h-px w-full bg-darkblack"></div>
      </DisclosureButton>
      <DisclosurePanel className="my-4 grid grid-cols-2 text-sm/5 text-black/50">
        <div>
          {isLoading ? (
            <div className="flex min-h-96 w-full items-center justify-center bg-white">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
            </div>
          ) : (
            <QueryTable
              columns={columns}
              list={employeeDbCheck?.listing ?? []}
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
