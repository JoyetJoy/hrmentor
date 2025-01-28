import { DisclosurePanel } from "@headlessui/react";
import QueryTable from "@/components/table/QueryTable";
import { Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { EMPLOYEE_DOCUMENTS, newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import { useUserStore } from "@/lib/slices/auth.slice";
import DocumentEdit from "@/components/popups/employee_access/profile_management/DocumentEdit";

export default function UnderDocumentListing({ cid, uid, documentName }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const pageLimit = 10;

  const { setUser, user } = useUserStore((state) => ({
    setUser: state.setUser,
    user: state.user,
  }));

  const u_id = user?.user?.id;
  // Fetch List
  const { data: employeeDocumentsListing, isLoading } = useQuery({
    queryKey: ["employeeDocumentsListing", currentPage, keyword, u_id, cid],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_DOCUMENTS}/${parseInt(u_id)}`, {
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
        header: "Document",
        accessorKey: "document",
        cell: ({ row }) => (
          <div className="flex">
             <a
              href={row.original?.upload_documents}
              target="_blank"
              className={`${row.original?.upload_documents? 'text-[#1A75FF] underline underline-offset-2':''}`}
              rel="noopener noreferrer"
            >
              {row.original?.upload_documents?'document':'No document'}
              
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
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        id={selectedId}
        qrKey={"employeeDocumentsListing"}
        api={EMPLOYEE_DOCUMENTS}
      />
      <DocumentEdit
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"employeeDocumentsListing"}
        api={EMPLOYEE_DOCUMENTS}
        uid={u_id}
        documentName={documentName}
        cid={cid}
      />
      <DisclosurePanel className="my-4 ml-10 text-sm/5 text-black/50">
        <div>
          <div className="my-4 flex items-center justify-between">
            <div className="input flex min-h-10 h-10 w-80 items-center gap-2 placeholder:text-black border border-gray-platinum outline-none hover:border-gray-platinum text-sm">
              <Search className="size-4 text-gray-dark" />
              <input
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                className="h-full w-full"
                placeholder="Search"
              />
            </div>
            <button
              onClick={() => {
                setPopupOpen(true);
              }}
              className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              <Plus className="size-4" />
              Add Documents
            </button>
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
