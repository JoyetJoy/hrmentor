import { newRequest } from "@/api";
import { CANIDATE_DOCUMENTS } from "@/api/recruiter";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import MenuHeader from "@/components/common/MenuHeader";
import SaveCandidateDocument from "@/components/popups/recruiter/candiadate/SaveDocument";
import MenuHeaderCandidate from "@/components/recruiter/candidate/MenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function CandidateDocuments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [selectedField, setSelectedField] = useState(0);
  const [deletePopup, setDeletePopup] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cid = searchParams.get("cid");
  const pageLimit = 10;

  // Fetch List
  const { data: recCandidateDocuments, isLoading } = useQuery({
    queryKey: ["recCandidateDocuments", currentPage, cid, keyword],
    queryFn: () =>
      newRequest
        .get(`${CANIDATE_DOCUMENTS}/${cid}`, {
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
    if (recCandidateDocuments) {
      setTotalPages(recCandidateDocuments?.last_page);
    }
  }, [recCandidateDocuments]);

  const columns = React.useMemo(
    () => [
      {
        header: "Created Date",
        accessorKey: "uploaded_on",
      },
      { header: "Document name", accessorKey: "document_name" },
      {
        header: "Document type",
        accessorKey: "document_type_name",
        cell: ({ row }) => (
          <span>
            {row?.original?.document_type_name?.docuemnt_type_name ?? "Nill"}
          </span>
        ),
      },
      {
        header: "File",
        accessorKey: "file",
        cell: ({ row }) => (
          <a
            href={row?.original?.file}
            className="font-medium text-hrmprimaryorange underline underline-offset-2"
            target="_blank"
          >
            Download
          </a>
        ),
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <div
              onClick={() => {
                setPopupOpen(true);
                setSelectedField(row?.original?.id);
              }}
              className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
              />
            </div>
            <button
              onClick={() => {
                setDeletePopup(true);
                setSelectedField(row?.original?.id);
              }}
              className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2"
            >
              <Trash2 className="size-3 text-red-500" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <SaveCandidateDocument
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"recCandidateDocuments"}
        api={CANIDATE_DOCUMENTS}
        cid={cid}
      />
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        selectedId={selectedField}
        qrkey={"recCandidateDocuments"}
        api={CANIDATE_DOCUMENTS}
      />
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeSubMenu={"Candidates"}
        activeMenu={"Candidates"}
      />
      <MenuHeaderCandidate page={6} />
      <div className="flex h-screen flex-col justify-between bg-white px-6 py-6">
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h1 className="pt-3 text-base font-bold">Documents</h1>
            <div className="my-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPopupOpen(true)}
                className="btn flex h-10 min-h-10 min-w-28 flex-row items-center gap-1 whitespace-nowrap rounded-[0.3rem] bg-hrmprimaryorange text-xs text-white hover:bg-bgColor-100"
              >
                <Plus className="size-4" />
                Add documents
              </button>
              <div className="input-box flex h-10 min-h-10 w-full items-center gap-2 rounded-md border border-gray-soft pr-20 placeholder:text-black">
                <Search className="size-4 text-gray-dark" />
                <input
                  type="text"
                  className="w-full placeholder:text-gray-dark"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div className="pt-2">
            <QueryTable
              columns={columns}
              list={recCandidateDocuments?.listing ?? []}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateDocuments;
