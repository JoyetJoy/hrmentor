import MenuHeader from '@/components/common/MenuHeader';
import Adddocument from '@/components/popups/recruiter/createjob/Adddocument';
import QueryTable from "@/components/table/QueryTable"; 
import { TableData } from "@/constants/tableDummy";
import { ChevronRight, MoveDiagonal, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from 'react-router-dom';

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
              className="cursor-pointer flex items-center bg-[#EBEBF0] p-2 rounded-full"
            >
              <MoveDiagonal className="size-3" />
            </Link>
          </div>
        ),
      },
    ],
    []
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
      <div className="bg-white flex flex-col justify-between px-6 h-screen py-6">
        <div className="flex flex-col justify-between">
          <div className='flex items-center justify-between'>
            <h1 className="font-bold text-base pt-3">Documents</h1>
            <div className="flex items-center gap-3 my-4">
              <Link
                onClick={() => setPopupOpen(true)}
                className="btn bg-bgColor-100 text-white text-xs items-center flex flex-row gap-1 rounded-[0.3rem] hover:bg-bgColor-100 min-w-28 min-h-10 h-10 whitespace-nowrap"
              >
                <Plus className="size-4" />Add documents
              </Link>
              <Adddocument popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
              <div className="flex gap-2 placeholder:text-black items-center rounded-md input-box min-h-10 h-10 w-full border pr-20 border-[#EBEBF0]">
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
