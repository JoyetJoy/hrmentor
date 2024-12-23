import React, { useEffect, useState } from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { ChevronRight, Search } from "lucide-react";
import { EMPLOYEE_DOCUMENT_CATEGORY } from "@/api/master";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "@/api";
import UnderListing from "@/components/employee/edit-documents/UnderListing";
import Pagination from "@/components/table/Pagination";
import { useUserStore } from "@/lib/slices/auth.slice";
import ProfileSidebar from "@/components/sidebars/employee_access/profile_management/ProfileSideBar";
import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import UnderDocumentListing from "@/components/employee_access/edit-documents/UnderDocumentListing";

export default function Documents() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [totalPages, setTotalPages] = useState();
  const pageLimit = 10;
  const { setUser, user } = useUserStore((state) => ({
    setUser: state.setUser,
    user: state.user,
  }));
  const u_id = user.id;
  // Fetch List
  const { data: employeeDocumentsCategory, isLoading } = useQuery({
    queryKey: ["employeeDocumentsCategory", keyword, currentPage, u_id],
    queryFn: () =>
      newRequest
        .get(EMPLOYEE_DOCUMENT_CATEGORY, {
          params: {
            page: currentPage,
            per_limit: pageLimit,
            search: keyword,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    if (employeeDocumentsCategory) {
      setTotalPages(employeeDocumentsCategory?.last_page);
    }
  }, [employeeDocumentsCategory]);

  return (
    <div className="flex flex-col">
      <MenuHeaderEmployeeAccess
        pathlink={""}
        currentpage={"Document"}
        subMenu={"ProfileManagement"}
        icon={<ChevronRight className="size-3" />}
      />
      <div className="flex gap-x-3 ">
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
            {isLoading ? (
              <div className="flex min-h-96 w-full items-center justify-center bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <div className="overflow-y-min mt-5 w-full overflow-y-auto rounded-md bg-white pb-7">
                {employeeDocumentsCategory?.listing?.map((item) => (
                  <Disclosure
                    key={item?.id}
                    as="div"
                    className="p-5"
                    defaultOpen={false}
                  >
                    <DisclosureButton className="group flex w-full items-center gap-x-2 font-bold">
                      <div className="flex size-6 items-center justify-center rounded-full bg-gray-darklight">
                        <ChevronRight className="size-4 group-data-[open]:rotate-90 group-data-[hover]:text-black/50" />
                      </div>
                      <p className="text-sm">{item?.document_category_name}</p>
                    </DisclosureButton>
                    <UnderDocumentListing
                      cid={item?.id}
                      uid={u_id}
                      documentName={item?.document_category_name}
                    />
                  </Disclosure>
                ))}
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
