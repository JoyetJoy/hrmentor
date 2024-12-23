import React, { useEffect, useState } from "react";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight,Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { EMPLOYEE_BANK_DETAILS, newRequest } from "@/api";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

export default function Bank() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
 
  const [selectedField, setSelectedField] = useState(0);
  const pageLimit = 10;

  useEffect(() => {
    if (selectedField) {
      setPopupOpen(true);
    }
  }, [selectedField]);

  // Fetch List
  const { data: employeeBankDetails, isLoading } = useQuery({
    queryKey: ["employeeBankDetails", currentPage, uid, keyword],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_BANK_DETAILS}/${uid}`, {
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
    if (employeeBankDetails) {
      setTotalPages(employeeBankDetails?.data?.last_page);
    }
  }, [employeeBankDetails]);

  console.log(employeeBankDetails?.data?.listing);

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
          header: "Bank Name",
          accessorKey: "bank_name",
          cell: ({ row }) => {
            return (
              <div className="relative flex items-center gap-4">
                {row.original?.account_details?.default === 1 ? (
                  <div className="absolute -left-16 flex h-5 w-14 items-center justify-center rounded bg-hrmprimaryorange text-xs text-white">
                    Default
                  </div>
                ) : null}
                <div className="flex">
                  {row.original?.account_details?.bank_name}
                </div>
              </div>
            );
          },
        },
        {
          header: "Branch Name",
          accessorKey: "branch",
          cell: ({ row }) => <>{row.original?.account_details?.branch}</>,
        },
        {
          header: "Acc. Number",
          accessorKey: "account_number",
          cell: ({ row }) => (
            <>{row.original?.account_details?.account_number}</>
          ),
        },
        {
          header: "Acc. Holders Name",
          accessorKey: "account_holder_name",
          cell: ({ row }) => (
            <>{row.original?.account_details?.account_holder_name}</>
          ),
        },
        {
          header: "Sort Code",
          accessorKey: "sort_code",
          cell: ({ row }) => <>{row.original?.account_details?.sort_code}</>,
        },
        // {
        //   header: "Action",
        //   accessorKey: "action",
        //   cell: ({ row }) => (
        //     <div className="flex items-center gap-2 text-xs">
        //       <button
        //         type="button"
        //         onClick={() =>
        //           setSelectedField(row.original?.account_details?.id)
        //         }
        //         className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
        //       >
        //         <img
        //           src="/assets/icons/admin/marker.svg"
        //           className="w-full object-contain"
        //         />
        //       </button>
        //       <button
        //         type="button"
        //         onClick={() => {
        //           setDeletePopup(true);
        //           setSelectedId(row.original?.account_details?.id);
        //         }}
        //         className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-darkCharcoal"
        //       >
        //         <Trash2 className="size-3" />
        //       </button>
        //     </div>
        //   ),
        // },
      ].filter(Boolean),
    [employeeBankDetails],
  );
  return (
    <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
      <DisclosureButton className="group flex w-full items-center gap-x-2">
        <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
          <ChevronRight className="size-4 group-data-[open]:rotate-90" />
        </div>
        <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
          Bank Details
        </p>
        <div className="border w-full"></div>
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
              list={employeeBankDetails?.data?.listing ?? []}
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
