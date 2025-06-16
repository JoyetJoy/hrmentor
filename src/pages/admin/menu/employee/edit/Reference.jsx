import React, { useEffect, useState } from "react";
import MenuHeader from "@/components/common/MenuHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ChevronDown, ChevronRight, Eye, Plus, Search, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { EMPLOYEE_REFERENCE, newRequest } from "@/api";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import ReferenceForm from "@/components/popups/employees/edit/ReferenceForm";
import ReferenceSendEmail from "@/components/popups/employees/edit/ReferenceSendEmail";
import ReferenceAdd from "@/components/popups/employees/edit/ReferenceAdd";
import StatusEdit from "@/components/popups/employees/edit/StatusEdit";
import { usePermissionStore } from "@/lib/slices/auth.slice";

export default function EmployeeReferenceEdit() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [popupAddOpen, setPopupAddOpen] = useState(false);
  const [popupStatusOpen, setPopupStatusOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(0);
  const [type, setType] = useState('');
  const pageLimit = 10;

  const { permissions } = usePermissionStore((state) => ({
    permissions: state.permissions,
  }));
  // useEffect(() => {
  //   if (selectedField) {
  //     setPopupOpen(true);
  //   }
  // }, [selectedField]);

  // Fetch List
  const { data: employeeReference, isLoading } = useQuery({
    queryKey: ["employeeReference", currentPage, uid, keyword],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_REFERENCE}/${uid}`, {
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
    if (employeeReference) {
      setTotalPages(employeeReference?.last_page);
    }
  }, [employeeReference]);

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
            return (
              <div className="flex px-2">
                {row.original?.type}
              </div>
            );
          },
        },
        {
          header: "Name",
          accessorKey: "reference_name",
          cell: ({ row }) => {
            return (
              <div className="flex px-2">
                {row.original?.reference_name}
              </div>
            );
          },
        },
        {
          header: "Personal Email",
          accessorKey: "personal-email",
          cell: ({ row }) => (
            <div className="flex">{row.original?.type==='work'? row.original?.company_email : row.original?.personal_email}</div>
          ),
        },
        {
          header: "Contact Number",
          accessorKey: "document",
          cell: ({ row }) => {
            return (
              <div className="flex px-2">
                {row.original?.contact_number}
              </div>
            );
          },
        },
        
        {
          header: "Verification status",
          accessorKey: "status",
          cell: ({ row }) => (
            <div
            style={{
              backgroundColor:
                row?.original?.status?.background_color,
              color: row?.original?.status?.text_color,
            }}
            onClick={() => {
              setPopupStatusOpen(true);
              setSelectedField(row.original.id);
            }}
            className={`flex h-8 w-fit cursor-pointer items-center justify-center whitespace-nowrap rounded-md  pl-3 pr-1 font-semibold ${row?.original?.status?.status_name==='Verified' ? 'bg-green-500 text-white' :'bg-red-300 text-red-700' }`}
          >
            {row?.original?.status?.status_name}
            <ChevronDown className="ml-2" size={20} />
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
                onClick={() => {
                  setType('view');
                  setPopupAddOpen(true);
                  setSelectedField(row.original.id);
                }}
                className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-darkCharcoal"
              >
                <Eye className="size-3" />
              </button>
              {permissions.includes("employee-reference-edit") &&(
              <button
                type="button"
                onClick={() => {
                  setPopupAddOpen(true);
                  setSelectedField(row.original.id);
                }}
                
                className="flex size-7 cursor-pointer items-center rounded-full bg-gray-soft p-2"
              >
                <img
                  src="/assets/icons/admin/marker.svg"
                  className="w-full object-contain"
                />
              </button>
              )}
              {/* <button
                type="button"
                onClick={() => {
                  setPopupOpen(true);
                  setSelectedField(row.original.id);
                }}
                className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-darkCharcoal"
              >
                <ArrowRight className="size-3"/>
              </button> */}
              
              {/* <button
                type="button"
                onClick={() => {
                  setDeletePopup(true);
                  setSelectedId(row.original.id);
                }}
                className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-darkCharcoal"
              >
                <Trash2 className="size-3" />
              </button> */}
            </div>
          ),
        },
      ].filter(Boolean),
    [employeeReference],
  );
  return (
    <>
       <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        id={selectedId}
        qrKey={"employeeReference"}
        api={EMPLOYEE_REFERENCE}
      />
       <StatusEdit
        popupStatusOpen={popupStatusOpen}
        setPopupStatusOpen={setPopupStatusOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"employeeReference"}
        api={EMPLOYEE_REFERENCE}
        uid={uid}
      />
       <ReferenceAdd
        popupAddOpen={popupAddOpen}
        setPopupAddOpen={setPopupAddOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"employeeReference"}
        api={EMPLOYEE_REFERENCE}
        type={type}
        setType={setType}
        uid={uid}
      />
       <ReferenceSendEmail
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"employeeReference"}
        api={EMPLOYEE_REFERENCE}
        uid={uid}
      />
      {/* <ReferenceForm
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"employeeReference"}
        api={EMPLOYEE_REFERENCE}
        uid={uid}
      /> */}
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
                  <h5 className="text-lg font-bold">Reference</h5>
                  <div className="input flex h-10 min-h-10 w-80 items-center gap-2 border border-gray-platinum text-sm outline-none placeholder:text-black hover:border-gray-platinum">
                    <Search className="size-4 text-gray-dark" />
                    <input
                      type="text"
                      onChange={(e) => setKeyword(e.target.value)}
                      className="h-full w-full placeholder:text-gray-dark"
                      placeholder="Search"
                    />
                  </div>
                </div>
                {permissions.includes("employee-reference-create") &&(
                <button
                  onClick={() => {
                    setPopupAddOpen(true);
                  }}
                  className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-hrmblue/70 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  <Plus className="size-4" />
                  Add Reference
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
                    list={employeeReference?.listing ?? []}
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
