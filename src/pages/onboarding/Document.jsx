
import React, { useEffect, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronRight } from "lucide-react";
import { EMPLOYEE_DOCUMENT_CATEGORY } from "@/api/master";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "@/api";
import Pagination from "@/components/table/Pagination"
import DocumentUnderListing from "./DocumentUnderListing";

export default function Document() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [keyword, setKeyword] = useState("");
 
  const pageLimit = 10;

  // Fetch List
   const { data: employeeDocumentsCategory, isLoading } = useQuery({
     queryKey: ["employeeDocumentsCategory", keyword, currentPage],
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
    <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
      <DisclosureButton className="group flex w-full items-center gap-x-2">
        <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
          <ChevronRight className="size-4 group-data-[open]:rotate-90" />
        </div>
        <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
          Document
        </p>
        <div className="border w-full"></div>
      </DisclosureButton>
      <DisclosurePanel className=" grid grid-cols-1 text-sm/5 text-black/50 ml-7">
        <div className="overflow-y-min mt-5 w-full overflow-y-auto rounded-md bg-white">
          {employeeDocumentsCategory?.listing?.map((item) => (
            <Disclosure
              key={item?.id}
              as="div"
              className="p-3"
              defaultOpen={false}
            >
              <DisclosureButton className="group flex w-full items-center gap-x-2 font-bold">
                <div className="flex size-6 items-center justify-center rounded-full bg-gray-darklight">
                  <ChevronRight className="size-4 group-data-[open]:rotate-90 group-data-[hover]:text-black/50" />
                </div>
                <p className="text-sm font-semibold text-black">{item?.document_category_name}</p>
              </DisclosureButton>
              <DocumentUnderListing
                // cid={item?.id}
                // uid={uid}
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
      </DisclosurePanel>
    </Disclosure>
  );
}
