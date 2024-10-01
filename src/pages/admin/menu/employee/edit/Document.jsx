import React, { useEffect, useState } from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { ChevronRight, Search } from "lucide-react";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import MenuHeader from "@/components/common/MenuHeader";
import { EMPLOYEE_DOCUMENT_CATEGORY } from "@/api/master";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "@/api";
import UnderListing from "@/components/employee/edit-documents/UnderListing";
import Pagination from "@/components/table/Pagination";

export const EmployeeDocuments = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [totalPages, setTotalPages] = useState();
  const pageLimit = 10;

  // Fetch List
  const { data: employeeDocumentsCategory, isLoading } = useQuery({
    queryKey: ["employeeDocumentsCategory", keyword, currentPage, uid],
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
      <MenuHeader
        menu={"Menu"}
        subMenu={"Employee"}
        currentpath={"Employee Detail"}
        icon={<ChevronRight className="size-3" />}
        activeMenu={"Employees"}
      />
      <div className="flex gap-x-3">
        <EmployeesSidebar />
        <div className="mt-2 w-full">
          <>
            <div className="flex items-center gap-7">
              <h5 className="text-lg font-bold">Documents</h5>
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
            <div className="overflow-y-min mt-5 w-full overflow-y-auto rounded-md bg-white">
              {employeeDocumentsCategory?.listing?.map((item) => (
                <Disclosure
                  key={item?.id}
                  as="div"
                  className="p-5"
                  defaultOpen={false}
                >
                  <DisclosureButton className="group flex w-full items-center gap-x-2 font-bold">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#F7F7F7]">
                      <ChevronRight className="size-4 group-data-[open]:rotate-90 group-data-[hover]:text-black/50" />
                    </div>
                    <p className="text-sm">{item?.document_category_name}</p>
                  </DisclosureButton>
                  <UnderListing
                    cid={item?.id}
                    uid={uid}
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
          </>
        </div>
      </div>
    </div>
  );
};
