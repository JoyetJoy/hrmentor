import UnderListing from "@/components/employee/edit-documents/UnderListing";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import ProfileSidebar from "@/components/sidebars/employee_access/profile_management/ProfileSideBar";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronRight, Search } from "lucide-react";
import React from "react";

export default function Documents() {
  return (
    <div className="flex flex-col">
      <MenuHeaderEmployeeAccess
        pathlink={""}
        currentpage={"Document"}
        subMenu={"ProfileManagement"}
        icon={<ChevronRight className="size-3" />}
      />
      <div className="flex gap-x-3">
        <ProfileSidebar />
        <div className="mt-2 w-full">
          <>
            <div className="flex items-center gap-7">
              <h5 className="text-lg font-bold">Documents</h5>
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

            <div className="overflow-y-min mt-5 w-full  h-screen overflow-y-auto rounded-md bg-white pb-7">
              <Disclosure
                as="div"
                className="p-5"
                defaultOpen={false}
              >
                <DisclosureButton className="group flex w-full items-center gap-x-2 font-bold">
                  <div className="flex size-6 items-center justify-center rounded-full bg-gray-darklight">
                    <ChevronRight className="size-4 group-data-[open]:rotate-90 group-data-[hover]:text-black/50" />
                  </div>
                  <p className="text-sm">Passport</p>
                </DisclosureButton>
                {/* <UnderListing
                    cid={item?.id}
                    uid={uid}
                    documentName={item?.document_category_name}
                  /> */}
                <DisclosurePanel>pcndsdksdn</DisclosurePanel>
              </Disclosure>

              {/* <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              /> */}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
