import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import RegistrationEdit from "@/components/popups/employee_access/profile_management/RegistrationEdit";
import ProfileSidebar from "@/components/sidebars/employee_access/profile_management/ProfileSideBar";
import QueryTable from "@/components/table/QueryTable";
import { ChevronRight, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";

export default function Registration() {
  const [popupOpen, setPopupOpen] = useState(false)

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
                // onClick={() => {
                //   setDeletePopup(true);
                //   setSelectedId(row.original.id);
                // }}
                className="flex cursor-pointer items-center justify-center rounded-full bg-gray-soft p-2 text-textcolor-darkCharcoal"
              >
                <Trash2 className="size-3" />
              </button>
            </div>
          ),
        },
      ].filter(Boolean),
    [],
  );
  return (
    <div className="flex flex-col">
      <RegistrationEdit popupOpen={popupOpen} setPopupOpen={setPopupOpen}/>
      <MenuHeaderEmployeeAccess
        pathlink={""}
        currentpage={"Registration/Training"}
        subMenu={"ProfileManagement"}
        icon={<ChevronRight className="size-3" />}
      />
      <div className="flex gap-x-3">
        <ProfileSidebar />
        <div className="flex w-full flex-col">
          <div className="w-full h-screen rounded-md bg-white px-5 py-4">
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
              <QueryTable columns={columns} list={""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
