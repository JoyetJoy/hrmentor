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
import RegistrationEdit from "@/components/popups/employee_access/profile_management/RegistrationEdit";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import ProfileSidebar from "@/components/sidebars/employee_access/profile_management/ProfileSideBar";
import { useUserStore } from "@/lib/slices/auth.slice";

export default function Registration() {
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
  const { setUser, user } = useUserStore((state) => ({
    setUser: state.setUser,
   user: state.user,
  }));
  const u_id = user?.user?.id;
  useEffect(() => {
    if (selectedField) {
      setPopupOpen(true);
    }
  }, [selectedField]);

  // Fetch List
  const { data: employeeMemberships, isLoading } = useQuery({
    queryKey: ["employeeMemberships", currentPage, u_id, keyword],
    queryFn: () =>
      newRequest
        .get(`${EMPLOYEE_MEMBERSHIP}/${u_id}`, {
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
          header: "Membership Body",
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
    <div className="flex flex-col">
      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        id={selectedId}
        qrKey={"employeeMemberships"}
        api={EMPLOYEE_MEMBERSHIP}
      />
      <RegistrationEdit
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        qrKey={"employeeMemberships"}
        api={EMPLOYEE_MEMBERSHIP}
        uid={u_id}
      />
      <MenuHeaderEmployeeAccess
        pathlink={""}
        currentpage={"Registration/Training"}
        subMenu={"ProfileManagement"}
        icon={<ChevronRight className="size-3" />}
      />
      <div className="flex gap-x-3 h-screen">
        <ProfileSidebar />
        <div className="flex w-full flex-col">
          <div className="w-full h-full rounded-md bg-white px-5 py-4">
            <div className="my-4 flex items-center justify-between">
              <div className="flex items-center gap-7">
                <h5 className="text-lg font-bold">Registration/Training</h5>
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
  );
}
