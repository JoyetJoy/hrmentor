import React, { useEffect, useState } from "react";
import MenuHeader from "@/components/common/MenuHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Plus, Search, Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { EMPLOYEE_BANK_DETAILS, newRequest } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import EmployeeBankDetailsEditForm from "@/components/popups/employees/edit/BankDetails";

export default function EmployeeBankDetails() {
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
  const { data: employeeBankDetails, isLoading } = useQuery({
    queryKey: ["employeeBankDetails", currentPage, uid, keyword],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_BANK_DETAILS}/${uid}`, {
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
    if (employeeBankDetails) {
      setTotalPages(employeeBankDetails?.data?.last_page);
    }
  }, [employeeBankDetails]);

  console.log(employeeBankDetails);

  const columns = React.useMemo(
    () =>
      [
        {
          header: "Bank Name",
          accessorKey: "bank_name",
          cell: ({ row }) => (
            <div className="flex items-center gap-2">
              {row.original?.account_details?.default === 1 ? (
                <div className="flex h-5 w-14 items-center justify-center rounded-md bg-hrmprimaryorange text-xs text-white">
                  Default
                </div>
              ) : (
                <div className="h-5 w-14" />
              )}
              <div className="flex">
                {row.original?.account_details?.bank_name}
              </div>
            </div>
          ),
        },
        {
          header: "Branch Name",
          accessorKey: "branch",
          cell: ({ row }) => <>{row.original?.account_details?.branch}</>,
        },
        {
          header: "IBAN Number",
          accessorKey: "iban",
          cell: ({ row }) => <>{row.original?.account_details?.iban}</>,
        },
        {
          header: "Acc. Holders Name",
          accessorKey: "account_holder_name",
          cell: ({ row }) => (
            <>{row.original?.account_details?.account_holder_name}</>
          ),
        },
        {
          header: "Swift Code",
          accessorKey: "swift_code",
          cell: ({ row }) => <>{row.original?.account_details?.swift_code}</>,
        },
        {
          header: "As of date",
          accessorKey: "created_at",
          cell: ({ row }) => <>{row.original?.account_details?.created_at}</>,
        },
        {
          header: "Action",
          accessorKey: "action",
          cell: ({ row }) => (
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() =>
                  setSelectedField(row.original?.account_details?.id)
                }
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
                  setSelectedId(row.original?.account_details?.id);
                }}
                className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
              >
                <Trash2 className="size-3" />
              </button>
            </div>
          ),
        },
      ].filter(Boolean),
    [employeeBankDetails],
  );
  return (
    <>
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        selectedId={selectedId}
        qrKey={"employeeBankDetails"}
        api={EMPLOYEE_BANK_DETAILS}
      />
      <EmployeeBankDetailsEditForm
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"employeeBankDetails"}
        api={EMPLOYEE_BANK_DETAILS}
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
                  <h5 className="text-lg font-bold">Bank Details </h5>
                  <div className="input-box flex min-h-10 w-80 items-center gap-2 placeholder:text-black">
                    <Search className="size-4 text-[#7F7F7F]" />
                    <input
                      type="text"
                      onChange={(e) => setKeyword(e.target.value)}
                      className="h-full w-full placeholder:text-[#7F7F7F]"
                      placeholder="Search"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setPopupOpen(true);
                  }}
                  className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-[#030E5C]/70 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  <Plus className="size-4" />
                  Add Bank Details
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
                    list={employeeBankDetails?.data?.listing ?? []}
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
