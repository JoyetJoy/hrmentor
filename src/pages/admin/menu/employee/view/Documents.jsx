import EmployeeHeader from "@/components/common/EmployeeHeader";
import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon, ChevronRight, Search } from "lucide-react";
import QueryTable from "@/components/table/QueryTable";
import { TableData } from "@/constants/tableDummy";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
export const Documents = () => {
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
      <EmployeeHeader
        backLink={""}
        menu={"Menu"}
        subMenu={"Employee"}
        currentPath={" Employee Detail"}
        pageHeading={"Employees"}
        nextLink={""}
        nextHeading={"Settings"}
      />
      {/* ----sidebar---- */}
      <div className="flex gap-x-3">
        <EmployeesSidebar />
        <div className="  w-full bg">
          <>
            <h1 className="font-bold text-lg mb-5  ">Documents</h1>
            <div className="w-full h-full rounded-md bg-white">
              <Disclosure as="div" className="p-5" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center gap-x-2 font-bold">
                  <div className="bg-[#F7F7F7] size-8 flex justify-center items-center rounded-full">
                    <ChevronRight className="size-6 group-data-[open]:rotate-90 group-data-[hover]:text-black/50" />
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
                      <div className="flex gap-2 bg-[#030E5C] items-center input-box h-10 w-40 justify-center text-white">
                        + Add Documents
                      </div>
                    </div>
                    <QueryTable columns={columns} list={list} />
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
