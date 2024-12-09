import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { newRequest, EMPLOYEE_DEPARTMENT_LIST, EMPLOYEE_WORK_AREA, EMPLOYEE_WORK_LOCATION_LIST } from "@/api/master";

const RosterItemList = ({activeDepartment,setActiveDepartment,activeLocation,setActiveLocation,activeWorkArea,setActiveWorkArea}) => {

  const useFetchData = (key, url) => {
    return useQuery({
      queryKey: [key],
      queryFn: () => newRequest.get(url).then((res) => res.data),
    });
  };
  
  const { data: department } = useFetchData("department", EMPLOYEE_DEPARTMENT_LIST);
  const { data: work_area } = useFetchData("work_area", EMPLOYEE_WORK_AREA);
  const { data: location } = useFetchData("location", EMPLOYEE_WORK_LOCATION_LIST);  

  const handleClick = (setter, item_id, currentActive) => {
    setter(currentActive === item_id ? null : item_id);
  };

  return (
    <div className="min-h-full min-w-64 rounded-md bg-white">
      <div className="w-full rounded-md bg-white px-5 py-7">
        <Disclosure as="div" className="py-1" defaultOpen={false}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <p className="flex flex-row whitespace-nowrap text-sm font-bold text-black">
              Department
            </p>
            <ChevronRight className="size-4 group-data-[open]:rotate-90" />
          </DisclosureButton>
          <DisclosurePanel className="my-4 mr-4 flex flex-col text-sm/5 text-black/50">
            {department?.map((item) => (
              <p
                key={item.id}
                onClick={() => handleClick(setActiveDepartment, item.id, activeDepartment)}
                className={`cursor-pointer px-3 py-1 text-sm font-semibold ${
                  item.id === activeDepartment ? "text-hrmprimaryorange" : "text-gray-dark"
                }`}
              >
                {item.label}
              </p>
            ))}
          </DisclosurePanel>
        </Disclosure>

        {/* <Disclosure as="div" className="py-1" defaultOpen={false}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <p className="flex flex-row whitespace-nowrap text-sm font-bold text-black">
              Location
            </p>
            <ChevronRight className="size-4 group-data-[open]:rotate-90" />
          </DisclosureButton>
          <DisclosurePanel className="my-4 mr-4 flex flex-col text-sm/5 text-black/50">
            {location?.map((item) => (
              <p
                key={item.id}
                onClick={() => handleClick(setActiveLocation, item.id, activeLocation)}
                className={`cursor-pointer px-3 py-1 text-sm font-semibold ${
                  item.id === activeLocation ? "text-hrmprimaryorange" : "text-gray-dark"
                }`}
              >
                {item.label}
              </p>
            ))}
          </DisclosurePanel>
        </Disclosure> */}

        <Disclosure as="div" className="py-1" defaultOpen={false}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <p className="flex flex-row whitespace-nowrap text-sm font-bold text-black">
              Work Area
            </p>
            <ChevronRight className="size-4 group-data-[open]:rotate-90" />
          </DisclosureButton>
          <DisclosurePanel className="my-4 mr-4 flex flex-col text-sm/5 text-black/50">
            {work_area?.data?.original?.data?.map((item) => (
              <p
                key={item.id}
                onClick={() => handleClick(setActiveWorkArea, item.id, activeWorkArea)}
                className={`cursor-pointer px-3 py-1 text-sm font-semibold ${
                  item.id === activeWorkArea ? "text-hrmprimaryorange" : "text-gray-dark"
                }`}
              >
                {item.name}
              </p>
            ))}
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  );
};

export default RosterItemList;
