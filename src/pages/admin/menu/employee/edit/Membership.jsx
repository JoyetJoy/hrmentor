import React, { useEffect, useState } from "react";
import MenuHeader from "@/components/common/MenuHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Plus, Search, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { EMPLOYEE_MEMBERSHIP, newRequest } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import EmployeeMembershipEditForm from "@/components/popups/employees/edit/MembershipEditForm";

export default function EmployeeMembershipEdit() {
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
  const { data: employeeMemberships, isLoading } = useQuery({
    queryKey: ["employeeMemberships", currentPage, uid, keyword],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_MEMBERSHIP}/${uid}`, {
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
    if (employeeMemberships) {
      setTotalPages(employeeMemberships?.last_page);
    }
  }, [employeeMemberships]);

  const columns = React.useMemo(
    () =>
      [
        {
          header: () => (
            <>
              Registration/<br />
              Membership Body
            </>
          ),
          accessorKey: "reg_memb_body",
        },
        {
          header: "Professional Reg. Number",
          accessorKey: "professional_reg_number",
        },
        {
          header: "Expiry Date",
          accessorKey: "expiry_date",
        },
        {
          header: "First Reg. Date",
          accessorKey: "first_registered_date",
        },
        {
          header: "Renewal Date",
          accessorKey: "renewal_date",
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
    [employeeMemberships],
  );
  return (
    <>
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        selectedId={selectedId}
        qrKey={"employeeMemberships"}
        api={EMPLOYEE_MEMBERSHIP}
      />
      <EmployeeMembershipEditForm
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"employeeMemberships"}
        api={EMPLOYEE_MEMBERSHIP}
        uid={uid}
      />
      <div className="flex min-h-screen flex-col">
        <MenuHeader
          menu={"Menu"}
          subMenu={"Employee"}
          currentpath={"Employee Edit"}
          icon={<ChevronRight className="size-3" />}
          activeMenu={"Employee"}
        />
        <div className="flex gap-x-3">
          <EmployeesSidebar />
          <div className="flex w-full flex-col">
            <div className="w-full rounded-md bg-white px-5 py-4">
              <div className="my-4 flex items-center justify-between">
                <div className="flex items-center gap-7">
                  <h5 className="text-lg font-bold">Registration/Training</h5>
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
                  Add Registration/Training
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
                    list={employeeMemberships?.listing ?? []}
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
