import React, { useEffect, useState } from "react";
import MenuHeader from "@/components/common/MenuHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Plus, Search, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { EMPLOYEE_MEMBERSHIP, newRequest } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import EmployeeMembershipEditForm from "@/components/popups/employees/edit/MembershipEditForm";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

export default function Registration() {
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
  const { data: employeeMemberships, isLoading } = useQuery({
    queryKey: ["employeeMemberships", currentPage, uid, keyword],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_MEMBERSHIP}/${uid}`, {
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
    if (employeeMemberships) {
      setTotalPages(employeeMemberships?.last_page);
    }
  }, [employeeMemberships]);

  const columns = React.useMemo(
    () =>
      [
        {
          header: "Membership Body",
          accessorKey: "reg_memb_body",
        },
        {
          header: "Professional Reg. Number",
          accessorKey: "professional_reg_number",
        },
        {
          header: "Expiry Date",
          accessorKey: "expiry_date",
        },
        {
          header: "First Reg. Date",
          accessorKey: "first_registered_date",
        },
        {
          header: "Renewal Date",
          accessorKey: "renewal_date",
        },
        {
          header: "Action",
          accessorKey: "action",
          cell: ({ row }) => (
            <div className="flex items-center gap-2 text-xs">
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
    [employeeMemberships],
  );
  return (
    <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
      <DisclosureButton className="group flex w-full items-center gap-x-2">
        <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
          <ChevronRight className="size-4 group-data-[open]:rotate-90" />
        </div>
        <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
          Registration/Membership
        </p>
        <div className="border w-full "></div>
      </DisclosureButton>
      <DisclosurePanel className=" grid grid-cols-1 text-sm/5 text-black/50">
        <div className="px-5 py-5">
          {isLoading ? (
            <div className="flex min-h-96 w-full items-center justify-center bg-white">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
            </div>
          ) : (
            <QueryTable
              columns={columns}
              list={employeeMemberships?.listing ?? []}
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
