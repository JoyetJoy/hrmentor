import React, { useEffect, useState } from "react";
import MenuHeader from "@/components/common/MenuHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Plus, Search, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { EMPLOYEE_RIGHT_TO_WORK, newRequest } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import EmployeeRightToWorkEditForm from "@/components/popups/employees/edit/RightToWork";

export default function EmployeeRightToWorkEdit() {
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
  const { data: employeeRightToWorks, isLoading } = useQuery({
    queryKey: ["employeeRightToWorks", currentPage, uid, keyword],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_RIGHT_TO_WORK}/${uid}`, {
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
    if (employeeRightToWorks) {
      setTotalPages(employeeRightToWorks?.last_page);
    }
  }, [employeeRightToWorks]);

  const columns = React.useMemo(
    () =>
      [
        // {
        //   header: "Sl No",
        //   accessorKey: "sno",
        //   cell: ({ row }) => {
        //     return (
        //       <div className="flex px-2">
        //         {row.index + 1 + (currentPage - 1) * pageLimit}
        //       </div>
        //     );
        //   },
        // },
        {
          header: "Reference No",
          accessorKey: "reference_no",
        },
        // {
        //   header: "Condition",
        //   accessorKey: "condtion",
        // },
        {
          header: "Expiry Date",
          accessorKey: "expiry_date",
        },
        {
          header: "Reviewed by",
          accessorKey: "reviewedBy",
        },
        {
          header: "Document",
          accessorKey: "document",
          cell: ({ row }) => (
            <div className="flex">
               <a
                href={row.original?.document}
                target="_blank"
                className={`${row.original?.document? 'text-[#1A75FF] underline underline-offset-2':''}`}
                rel="noopener noreferrer"
              >
                {row.original?.document?'document':'No document'}
                
              </a>
            </div>
          ),
        },
        {
          header: "Status",
          accessorKey: "status",
          cell: ({ row }) => (
            <div className={`flex h-8 w-fit cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 font-semibold  ${row.original?.status === "expired" ?'text-red-700  bg-red-300' :'bg-green-200 text-green-700'}`}>
              {row.original?.status === "expired" ? "Expired" : "Active"}
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
    [employeeRightToWorks],
  );
  return (
    <>
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        selectedId={selectedId}
        qrKey={"employeeRightToWorks"}
        api={EMPLOYEE_RIGHT_TO_WORK}
      />
      <EmployeeRightToWorkEditForm
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"employeeRightToWorks"}
        api={EMPLOYEE_RIGHT_TO_WORK}
        uid={uid}
      />
      <div className="flex flex-col">
        <MenuHeader
          menu={"Menu"}
          subMenu={"Employee"}
          icon={<ChevronRight className="size-3" />}
          currentpath={"Employee Edit"}
          activeMenu={"Employee"}
        />
        <div className="flex gap-x-3">
          <EmployeesSidebar />
          <div className="flex w-full flex-col">
            <div className="w-full rounded-md bg-white px-5 py-4">
              <div className="my-4 flex items-center justify-between">
                <div className="flex items-center gap-7">
                  <h5 className="text-lg font-bold">Right to work</h5>
                  <div className="input flex min-h-10 h-10 w-80 items-center gap-2 placeholder:text-black border border-gray-platinum outline-none hover:border-gray-platinum text-sm">
                    <Search className="size-4 text-gray-dark" />
                    <input
                      type="text"
                      onChange={(e) => setKeyword(e.target.value)}
                      className="h-full w-full placeholder:text-gray-dark"
                      placeholder="Search"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setPopupOpen(true);
                  }}
                  className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  <Plus className="size-4" />
                  Add Right to work
                </button>
              </div>
              <div>
                {isLoading ? (
                  <div className="flex min-h-96 w-full items-center justify-center bg-white">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
                  </div>
                ) : (
                  <QueryTable
                    columns={columns}
                    list={employeeRightToWorks?.listing ?? []}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
