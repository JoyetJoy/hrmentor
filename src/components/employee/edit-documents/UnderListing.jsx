import { DisclosurePanel } from "@headlessui/react";
import QueryTable from "@/components/table/QueryTable";
import { Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { EMPLOYEE_DOCUMENTS, newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import EmployeeDocumentEditForm from "@/components/popups/employees/edit/DocumentsEdit";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import { usePermissionStore } from "@/lib/slices/auth.slice";

export default function UnderListing({ cid, uid, expiry, documentName }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const pageLimit = 10;

  const { permissions } = usePermissionStore((state) => ({
    permissions: state.permissions,
  }));

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
        cell: ({ row }) => row?.original?.document_name || "N/A",
      },
      {
        header: "Document Type",
        accessorKey: "addNo",
        cell: ({ row }) => row?.original?.document_type?.employee_document_type_name || "N/A",
      },
      {
        header: "Issued Authority",
        accessorKey: "issued_authority",
        cell: ({ row }) => row?.original?.issued_authority || "N/A",
      },
      {
        header: "Issued Date",
        accessorKey: "issued_date",
      },
      ...(expiry === 1
        ? [
            {
              header: "Expiry Date",
              accessorKey: "expiry_date",
            },
          ]
        : []),
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
        header: "Document",
        accessorKey: "document",
        cell: ({ row }) => (
          <div className="flex">
            <a
              href={row.original?.upload_documents}
              target="_blank"
              className={`${row.original?.upload_documents ? "text-[#1A75FF] underline underline-offset-2" : ""}`}
              rel="noopener noreferrer"
            >
              {row.original?.upload_documents ? "document" : "No document"}
            </a>
          </div>
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            {permissions.includes("employee-documents-edit") && (
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
            )}
            {permissions.includes("employee-documents-delete") && (
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
            )}
          </div>
        ),
      },
    ],
    [employeeDocumentsListing, cid],
  );

  return (
    <>
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        id={selectedId}
        qrKey={"employeeDocumentsListing"}
        api={EMPLOYEE_DOCUMENTS}
      />
      <EmployeeDocumentEditForm
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"employeeDocumentsListing"}
        api={EMPLOYEE_DOCUMENTS}
        uid={uid}
        documentName={documentName}
        cid={cid}
        expiry={expiry}
      />
      <DisclosurePanel className="my-4 ml-10 text-sm/5 text-black/50">
        <div>
          <div className="my-4 flex items-center justify-between">
            <div className="input flex h-10 min-h-10 w-80 items-center gap-2 border border-gray-platinum text-sm outline-none placeholder:text-black hover:border-gray-platinum">
              <Search className="size-4 text-gray-dark" />
              <input
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                className="h-full w-full"
                placeholder="Search"
              />
            </div>
            {permissions.includes("employee-documents-create") && (
              <button
                onClick={() => {
                  setPopupOpen(true);
                }}
                className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                <Plus className="size-4" />
                Add Documents
              </button>
            )}
          </div>

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
