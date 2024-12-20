import { DisclosurePanel } from "@headlessui/react";
import QueryTable from "@/components/table/QueryTable";
import { Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { EMPLOYEE_DOCUMENTS, newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";


export default function DocumentUnderListing({ cid, uid, documentName }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const pageLimit = 10;

  // Fetch List
  const { data: employeeDocumentsListing, isLoading } = useQuery({
    queryKey: ["employeeDocumentsListing", currentPage, keyword, uid, cid],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_DOCUMENTS}/${parseInt(uid)}`, {
          params: {
            page: currentPage,
            per_limit: pageLimit,
            search: keyword,
            document_category_id: parseInt(cid),
          },
        })
        .then((res) => {
          return res.data;
        }),
    enabled: !!cid,
  });

  useEffect(() => {
    if (employeeDocumentsListing) {
      setTotalPages(employeeDocumentsListing?.last_page);
    }
  }, [employeeDocumentsListing]);

  const columns = React.useMemo(
    () => [
      {
        header: "Document Name",
        accessorKey: "document_name",
      },
      {
        header: "Document Type",
        accessorKey: "addNo",
        cell: ({ row }) => (
          <>{row?.original?.document_type?.employee_document_type_name}</>
        ),
      },
      {
        header: "Issued Authority",
        accessorKey: "issued_authority",
      },
      {
        header: "Issued Date",
        accessorKey: "issued_date",
      },
      {
        header: "Expiry Date",
        accessorKey: "expiry_date",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div
            className={`flex h-8 w-20 items-center justify-center rounded-md px-3 font-semibold ${row?.original?.status == 1 ? "bg-active/15 text-active" : "bg-inactive/15 text-inactive"}`}
          >
            {row?.original?.status == 1 ? "Active" : "Inactive"}
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
              onClick={() => {
                setSelectedField(row.original.id);
                setPopupOpen(true);
              }}
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
              className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-[#2C2C2C]"
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        ),
      },
    ],
    [employeeDocumentsListing, cid],
  );

  return (
    <>
    
     
      <DisclosurePanel className="my-4 ml-10 text-sm/5 text-black/50">
        <div>
        
          <div className="py-2">
            {isLoading ? (
              <div className="flex min-h-96 w-full items-center justify-center bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <QueryTable
                columns={columns}
                list={employeeDocumentsListing?.listing ?? []}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
      </DisclosurePanel>
    </>
  );
}
