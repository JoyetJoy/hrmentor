import React, { useEffect, useState } from "react";
import MenuHeader from "@/components/common/MenuHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Plus, Search, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { EMPLOYEE_SALARY_DETAILS, newRequest } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import EmployeeSalaryDetailsEditForm from "@/components/popups/employees/edit/SalaryDetails";
import { usePermissionStore } from "@/lib/slices/auth.slice";

export default function EmployeeSalaryEdit() {
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

  const { permissions } = usePermissionStore((state) => ({
    permissions: state.permissions,
  }));

  useEffect(() => {
    if (selectedField) {
      setPopupOpen(true);
    }
  }, [selectedField]);

  // Fetch List
  const { data: employeeSalaryDetails, isLoading } = useQuery({
    queryKey: ["employeeSalaryDetails", currentPage, uid, keyword],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_SALARY_DETAILS}/${uid}`, {
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
    if (employeeSalaryDetails) {
      setTotalPages(employeeSalaryDetails?.last_page);
    }
  }, [employeeSalaryDetails]);

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
          header: "Effective from",
          accessorKey: "effective_from",
        },
        {
          header: "Pay rate",
          accessorKey: "pay_rate",
        },
        {
          header: "Per",
          accessorKey: "per",
          cell: ({ row }) => <>{row.original?.per_value?.name}</>,
        },
        {
          header: "Pay schedule",
          accessorKey: "pay_schedule",
          cell: ({ row }) => <>{row.original?.pay_schedule?.name}</>,
        },
        { header: "Over time", accessorKey: "over_time" },
        {
          header: "Action",
          accessorKey: "action",
          cell: ({ row }) => (
            <div className="flex items-center gap-2 text-xs">
              {permissions.includes("employee-salary-details-edit") &&(
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
              )}
              {permissions.includes("employee-salary-details-delete") &&(
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
              )}
            </div>
          ),
        },
      ].filter(Boolean),
    [employeeSalaryDetails],
  );
  console.log(selectedId);
  
  return (
    <>
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        id={selectedId}
        qrKey={"employeeSalaryDetails"}
        api={EMPLOYEE_SALARY_DETAILS}
        
      />
      <EmployeeSalaryDetailsEditForm
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"employeeSalaryDetails"}
        api={EMPLOYEE_SALARY_DETAILS}
        uid={uid}
      />
      <div className="flex flex-col">
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
                  <h5 className="text-lg font-bold">Salary Details</h5>
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
                {permissions.includes("employee-salary-details-create") &&(
                <button
                  onClick={() => {
                    setPopupOpen(true);
                  }}
                  className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  <Plus className="size-4" />
                  Add Salary Details
                </button>
                )}
              </div>
              <div>
                {isLoading ? (
                  <div className="flex min-h-96 w-full items-center justify-center bg-white">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
                  </div>
                ) : (
                  <QueryTable
                    columns={columns}
                    list={employeeSalaryDetails?.listing ?? []}
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
