import { newRequest } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import LeaveHeader from "@/components/common/LeaveMenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { MoveDiagonal } from "lucide-react";
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight,Filter, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import LeaveRequest from "./LeaveRequest";
import { LeaveList } from "@/constants/menus/leave";
import { SettingsSidebar } from "@/components/sidebars/recruiter/SettingsSidebar";
import Loader from "@/components/ui/Loader";

export const LeaveMasters = ({ api, qrkey, colKeys, type }) => {
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
  const { data, isLoading } = useQuery({
    queryKey: [qrkey, currentPage, type, qrkey, keyword],
    queryFn: () =>
      newRequest
        .get(api, {
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
    if (data) {
      setTotalPages(data?.last_page);
    }
  }, [data]);

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
          header: colKeys?.field1?.label,
          accessorKey: colKeys?.field1?.key,
          cell: ({ row, getValue }) => {
            const fieldValue = getValue();
            return (
              <div className="flex max-w-xl items-center gap-3">
                {fieldValue}
                {row?.original?.is_default === "1" && (
                  <div className="rounded-full border border-[#7F7F7F] px-2 py-0.5 font-semibold text-[#7F7F7F]">
                    Default
                  </div>
                )}
              </div>
            );
          },
        },
        colKeys.field2 && {
          header: colKeys?.field2?.label,
          accessorKey: colKeys?.field2?.key,
          cell: ({ getValue }) => {
            const fieldValue = getValue();
            return (
              <div
                className="!line-clamp-3 flex max-w-sm flex-col gap-1"
                dangerouslySetInnerHTML={{ __html: fieldValue }}
              />
            );
          },
        },
        colKeys.field3 && {
          header: colKeys?.field3?.label,
          accessorKey: colKeys?.field3?.key,
          cell: ({ getValue }) => {
            const fieldValue = getValue();
            return (
              <div
                className="!line-clamp-3 flex max-w-sm flex-col gap-1"
                dangerouslySetInnerHTML={{ __html: fieldValue }}
              />
            );
          },
        },
        colKeys.field4 && {
          header: colKeys?.field4?.label,
          accessorKey: colKeys?.field4?.key,
          cell: ({ getValue }) => {
            const fieldValue = getValue();
            return (
              <div
                className="!line-clamp-3 flex max-w-sm flex-col gap-1"
                dangerouslySetInnerHTML={{ __html: fieldValue }}
              />
            );
          },
        },
        colKeys.field5 && {
          header: colKeys?.field5?.label,
          accessorKey: colKeys?.field5?.key,
          cell: ({ getValue }) => {
            const fieldValue = getValue();
            return (
              <div
                className="!line-clamp-3 flex max-w-sm flex-col gap-1"
                dangerouslySetInnerHTML={{ __html: fieldValue }}
              />
            );
          },
        },
        colKeys.field6 && {
          header: colKeys?.field6?.label,
          accessorKey: colKeys?.field6?.key,
          cell: ({ getValue }) => {
            const fieldValue = getValue();
            return (
              <div
                className="!line-clamp-3 flex max-w-sm flex-col gap-1"
                dangerouslySetInnerHTML={{ __html: fieldValue }}
              />
            );
          },
        },
        {
          header: colKeys?.field7?.label,
          accessorKey: colKeys?.field7?.key,
          cell: ({ row }) => {
            const fieldValue = row.original?.[colKeys?.field7?.key];
            return (
              <div
                className={`flex h-8 w-28 items-center justify-center rounded-md px-3 font-semibold ${
                  fieldValue === "pending"
                    ? "bg-[#fbf0d3] text-[#ebb425]"
                    : fieldValue === "approved"
                    ? "bg-[#e6f8ed] text-[#00b448]"
                    : "bg-[#f7eaea] text-[#db0000]"
                }`}
              >
                {fieldValue ==='pending' ? "Pending"  
                  : fieldValue ==='approved' ? "Approved"
                  : "Not approved" }
              </div>
            );
          },
        },
        {
          header: "Action",
          accessorKey: "action",
          cell: ({ row }) => (
            <div className="flex items-center gap-2 text-xs">
                <button
                type="button"
                onClick={() => setSelectedField(row?.original?.id)}
                className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
              >
              <MoveDiagonal className="size-3" />
           
              </button>
              <button
                type="button"
                onClick={() => {
                    setPopupOpen(true)
                    setSelectedField(row?.original?.id)}}
                className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
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
                  setSelectedId(row?.original?.id);
                }}
                className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
              >
                <Trash2 className="size-3" />
              </button>
            </div>
          ),
        },
      ].filter(Boolean),
    [currentPage, pageLimit, colKeys]
  );
  
  return (
    <>
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        selectedId={selectedId}
        qrkey={qrkey}
        api={api}
      />
      <LeaveRequest
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        
      />
      <div className="flex flex-col">
        <LeaveHeader page={1} currentPage ={'Leave request'} />
        <div className="flex gap-x-3">
          <SettingsSidebar sidebarList={LeaveList} active={type} />
          <div className="min-h-[570px] w-full rounded-md bg-white px-5 py-4">
            <div className="my-4 flex items-center justify-end gap-2">
              <div className="input bg-[#f3f4f6] flex min-h-10 h-10 w-80 items-center gap-2 placeholder:text-black border border-gray-platinum outline-none hover:border-gray-platinum text-sm">
                <Search className="size-4 text-[#7F7F7F]" />
                <input
                  type="text"
                  onChange={(e) => setKeyword(e.target.value)}
                  className="h-full w-full placeholder:text-[#7F7F7F]"
                  placeholder="Search"
                />
              </div>
              <div className="h-10 min-h-10 rounded-md border border-gray-400 bg-white p-3">
                <Filter className="size-4" />
              </div>
            </div>
            <div>
              {isLoading ? (
                <Loader />
              ) : (
                <QueryTable
                  columns={columns}
                  list={data?.listing ?? []}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
