import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon, ChevronRight, Plus, Search } from "lucide-react";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import MenuSubHeader from "@/components/common/MenuSubHeader";
import MenuHeader from "@/components/common/MenuHeader";
import { Link } from "react-router-dom";
import AddPassportVisa from "@/components/popups/employees/view/AddPassportVisa";

export const Documents = () => {
 
  const [popupEditOpen, setEditOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const list = React.useMemo(() => TableData, [TableData]);
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      { header: "ID Number", accessorKey: "addNo" },
      {
        header: "Designation",
        accessorKey: "dignation",
      },
      {
        header: "Type",
        accessorKey: "type",
      },

      {
        header: "Document",
        accessorKey: "designation",
        cell: ({ row }) => (
          <p className="font-medium underline  text-[#1A75FF]">
            {row?.original?.designation}
          </p>
        ),
      },
    ],

    []
  );
  return (
    <div className=" flex flex-col">
      <MenuHeader
      menu={"Menu"}
      subMenu={"Employee"}
      currentpath={"Employee Detail"}
      icon={<ChevronRight className="size-3" />}
      activeMenu={'Employees'}
      />
      {/* ----sidebar---- */}
      <div className="flex gap-x-3">
        <EmployeesSidebar />
        <div className="  w-full mt-2 ">
          <>
            <MenuSubHeader
                heading={"Documents"}
            />
            <div className="w-full h-screen rounded-md  bg-white mt-6">
              <Disclosure as="div" className="p-5" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center gap-x-2 font-bold">
                  <div className="bg-[#F7F7F7] size-6 flex justify-center items-center rounded-full">
                    <ChevronRight className="size-4 group-data-[open]:rotate-90 group-data-[hover]:text-black/50" />
                  </div>
                  <p className="text-sm">Passport, Visa & Identity</p>
                </DisclosureButton>
                <DisclosurePanel className="ml-10 my-4 text-sm/5 text-black/50">
                  <div>
                    <div className="flex items-center justify-between my-4">
                      <div className="flex gap-2 placeholder:text-black items-center input-box h-10 w-72">
                        <Search />
                        <input
                          type="text"
                          className=" w-full h-full "
                          placeholder="Search"
                        />
                      </div>
                      <div onClick={()=>setPopupOpen(true)} className="btn bg-[#030E5C] text-white text-xs rounded-[0.3rem] hover:bg-[#030E5C] min-w-28 min-h-11 h-11 whitespace-nowrap"
 >
                        + Add Documents
                      </div>
                      <AddPassportVisa popupOpen={popupOpen} setPopupOpen={setPopupOpen} />

                    </div>
                    <div className="py-2">
                    <QueryTable columns={columns} list={list} />
                    </div>
                  </div>

                </DisclosurePanel>
              </Disclosure>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};
