import { newRequest } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import LeaveHeader from "@/components/common/LeaveMenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { Eye, Filter, Search, Trash2 } from "lucide-react";
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
  const [ViewEdit, setViewEdit] = useState("");

  const pageLimit = 10;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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
          header: "Emp ID",
          accessorKey: colKeys?.field1?.key,
          cell: ({ row }) => <td>{`${row.original.employee_id} `}</td>,
        },
        {
          header: "Emp Name",
          accessorKey: colKeys?.field1?.key,
          cell: ({ row }) => (
            <td>
              {`${row.original.employee.first_name || ""} ${row.original.employee.middle_name || ""}`}
            </td>
          ),
        },
        colKeys.field2 && {
          header: colKeys?.field2?.label,
          accessorKey: "from_date",
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
          accessorKey: "to_date",
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
        // colKeys.field4 && {
        //   header: colKeys?.field4?.label,
        //   accessorKey: colKeys?.field4?.key,
        //   cell: ({ row }) => (
        //     <td>{`${row.original.leave_type.leave_name || ""}`}</td>
        //   ),
        // },
        colKeys.field5 && {
          header: colKeys?.field5?.label,
          accessorKey: "total_leave_days",
          cell: ({ row }) => (
            <td>{`${row.original.total_leave_days || "-"} `}</td>
          ),
        },
        colKeys.field6 && {
          header: colKeys?.field6?.label,
          accessorKey: colKeys?.field6?.key,
          cell: ({ row }) => {
            return formatDate(row.original.created_at); // Ensure the formatDate function is properly defined
          },
        },

        {
          header: colKeys?.field7?.label,
          cell: ({ row }) => {
            const leaveStatus = row.original?.leave_status;
            const fieldValue = leaveStatus?.leave_status_name;

            const leaveStatusStyles = {
              backgroundColor: leaveStatus?.background_color,
              color: leaveStatus?.text_color,
            };

            return (
              <div
                className="flex h-8 w-28 items-center justify-center rounded-md px-3 font-semibold"
                style={leaveStatusStyles}
              >
                {fieldValue || "Not specified"}
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
                onClick={() => {
                  setSelectedId(row?.original?.id);
                  setPopupOpen(true);
                  setViewEdit("view");
                }}
                className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
              >
                <Eye className="size-3" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setPopupOpen(true);
                  setViewEdit("edit");
                  setSelectedId(row?.original?.id);
                }}
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
    [currentPage, pageLimit, colKeys],
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
        id={selectedId}
        ViewEdit={ViewEdit}
      />
      <div className="flex flex-col">
        <LeaveHeader page={1} currentPage={"Leave request"} />
        <div className="flex gap-x-3">
          <SettingsSidebar sidebarList={LeaveList} active={type} />
          <div className="min-h-[570px] w-full rounded-md bg-white px-5 py-4">
            <div className="my-4 flex items-center justify-end gap-2">
              <div className="input flex h-10 min-h-10 w-80 items-center gap-2 border border-gray-platinum bg-[#f3f4f6] text-sm outline-none placeholder:text-black hover:border-gray-platinum">
                <Search className="size-4 text-[#7F7F7F]" />
                <input
                  type="text"
                  onChange={(e) => setKeyword(e.target.value)}
                  className="h-full w-full placeholder:text-[#7F7F7F]"
                  placeholder="Search"
                />
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
