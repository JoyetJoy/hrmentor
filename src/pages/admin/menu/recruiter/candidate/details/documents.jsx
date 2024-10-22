import MenuHeader from "@/components/common/MenuHeader";
import Adddocument from "@/components/popups/recruiter/createjob/Adddocument";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import { ChevronRight, MoveDiagonal, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Documents() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);

  const list = React.useMemo(() => TableData, []);
  const columns = React.useMemo(
    () => [
      {
        header: "Created Date",
        accessorKey: "date",
      },
      { header: "Document name", accessorKey: "name" },
      {
        header: "Document type",
        accessorKey: "type",
      },
      {
        header: "File",
        accessorKey: "file",
      },
      {
        header: "Uploaded on",
        accessorKey: "upload",
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <Link
              to={`/sales/invoices/detail-view/${row?.original?.id}`}
              className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <MoveDiagonal className="size-3" />
            </Link>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeSubMenu={"Candidates"}
        activeMenu={"Candidates"}
      />
      <div className="flex h-screen flex-col justify-between bg-white px-6 py-6">
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h1 className="pt-3 text-base font-bold">Documents</h1>
            <div className="my-4 flex items-center gap-3">
              <Link
                onClick={() => setPopupOpen(true)}
                className="btn flex h-10 min-h-10 min-w-28 flex-row items-center gap-1 whitespace-nowrap rounded-[0.3rem] bg-bgColor-100 text-xs text-white hover:bg-bgColor-100"
              >
                <Plus className="size-4" />
                Add documents
              </Link>
              <Adddocument popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
              <div className="input-box flex h-10 min-h-10 w-full items-center gap-2 rounded-md border border-[#EBEBF0] pr-20 placeholder:text-black">
                <Search className="size-4 text-[#7F7F7F]" />
                <input
                  type="text"
                  className="w-full placeholder:text-[#7F7F7F]"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div className="pt-2">
            <QueryTable
              columns={columns}
              list={list}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documents;
