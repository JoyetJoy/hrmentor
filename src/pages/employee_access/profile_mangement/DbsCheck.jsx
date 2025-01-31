import React, { useEffect, useState } from "react";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Eye, Plus, Search, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { EMPLOYEE_DBS_CHECK, newRequest } from "@/api";
import DbsEditForm from "@/components/popups/employees/edit/DbsEditForm";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import DbsEdit from "@/components/popups/employee_access/profile_management/DbsEdit";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import ProfileSidebar from "@/components/sidebars/employee_access/profile_management/ProfileSideBar";
import { useUserStore } from "@/lib/slices/auth.slice";

export default function DbsCheck() {
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
  const { setUser, user } = useUserStore((state) => ({
    setUser: state.setUser,
    user: state.user,
  }));
  const u_id = user?.user?.id;

  // Fetch List
  const { data: employeeDbCheck, isLoading } = useQuery({
    queryKey: ["employeeDbCheck", currentPage, u_id, keyword],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_DBS_CHECK}/${u_id}`, {
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
    if (employeeDbCheck) {
      setTotalPages(employeeDbCheck?.last_page);
    }
  }, [employeeDbCheck]);
  console.log(employeeDbCheck);
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
          header: "Type",
          accessorKey: "type",
          cell: ({ row }) => {
            return <div className="flex px-2">{row.original?.dbs_type}</div>;
          },
        },
        {
          header: "Date of issue",
          accessorKey: "date",
          cell: ({ row }) => (
            <div className="flex">{row.original?.issue_date}</div>
          ),
        },
        {
          header: "Subscription",
          accessorKey: "subscription",
          cell: ({ row }) => (
            <div className="flex">
              {row.original?.subscription === 1 ? "Yes" : "No"}
            </div>
          ),
        },
        {
          header: "DBS Number",
          accessorKey: "dbs_number",
          Cell: ({ row }) => {
            return <div className="flex px-2">{row?.original?.dbs_number}</div>;
          },
        },
        {
          header: "Status",
          accessorKey: "status",
          cell: ({ row }) => (
            <div className="flex h-8 w-fit cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-red-300 px-3 font-semibold text-red-700">
              {row.original?.status === 1 ? "Active" : "Inactive"}
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
                className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-darkCharcoal"
              >
                <Eye className="size-3" />
              </button>
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
    [employeeDbCheck],
  );
  return (
    <div className="flex flex-col">
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        id={selectedId}
        qrKey={"employeeDbCheck"}
        api={EMPLOYEE_DBS_CHECK}
      />
      <DbsEdit
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"employeeDbCheck"}
        api={EMPLOYEE_DBS_CHECK}
        uid={u_id}
      />
      <MenuHeaderEmployeeAccess
        pathlink={""}
        currentpage={"DBS Check"}
        subMenu={"ProfileManagement"}
        icon={<ChevronRight className="size-3" />}
      />
      <div className="flex gap-x-3 h-screen">
        <ProfileSidebar />
        <div className="flex w-full  flex-col">
          <div className="w-full h-full rounded-md bg-white px-5 py-4">
            <div className="my-4 flex items-center justify-between">
              <div className="flex items-center gap-7">
                <h5 className="text-lg font-bold">DBS Check</h5>
                <div className="input flex h-10 min-h-10 w-80 items-center gap-2 border border-gray-platinum text-sm outline-none placeholder:text-black hover:border-gray-platinum">
                  <Search className="text-dark size-4" />
                  <input
                    type="text"
                    onChange={(e) => setKeyword(e.target.value)}
                    className="placeholder:text-dark h-full w-full"
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
                Add DBS Check
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
                  list={employeeDbCheck?.listing ?? []}
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
  );
}
