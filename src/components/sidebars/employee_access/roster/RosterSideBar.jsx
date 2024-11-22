import { rosterItems } from "@/constants/dummyData";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const RosterItemList = () => {
  const [activeItem, setActiveItem] = useState(null);

  const optionsMap = {
    Department: [
      "Emergency Department",
      "Cardiology",
      "Radiology",
      "Pediatrics",
      "Oncology",
    ],
    Location: ["London", "Manchester", "Glasgow"],
    WorkArea: ["Lobby", "Reception", "ICU", "Cardiac"],
  };

  const handleItemClick = (itemName) => {
    setActiveItem(activeItem === itemName ? null : itemName);
  };

  return (
    <div className="min-h-full min-w-64 rounded-md bg-white">
      <div className="w-full rounded-md bg-white px-5 py-7">
        <Disclosure as="div" className="py-1" defaultOpen={true}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <p className="flex flex-row whitespace-nowrap text-sm font-bold text-black">
              Department
            </p>
            <div className="flex size-5 min-w-5 items-center justify-center rounded-full">
              <ChevronRight className="size-4 group-data-[open]:rotate-90" />
            </div>
          </DisclosureButton>
          <DisclosurePanel className="my-4 mr-4 flex flex-col whitespace-nowrap text-sm/5 text-black/50">
            <p className="cursor-pointer px-3 py-1 text-sm font-semibold text-hrmprimaryorange">
              Emergency Department
            </p>
            <p className="cursor-pointer px-3 py-1 text-sm text-gray-dark">
              Cardiology
            </p>
            <p className="cursor-pointer px-3 py-1 text-sm text-gray-dark">
              Radiology
            </p>
            <p className="cursor-pointer px-3 py-1 text-sm text-gray-dark">
              Pediatrics
            </p>
            <p className="cursor-pointer px-3 py-1 text-sm text-gray-dark">
              Oncology
            </p>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure as="div" className="py-1" defaultOpen={false}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <p className="flex flex-row whitespace-nowrap text-sm font-bold text-black">
              Location
            </p>
            <div className="flex size-5 min-w-5 items-center justify-center rounded-full">
              <ChevronRight className="size-4 group-data-[open]:rotate-90" />
            </div>
          </DisclosureButton>
          <DisclosurePanel className="my-4 mr-4 flex flex-col text-sm/5 text-black/50">
            <p>locatio</p>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure as="div" className="py-1" defaultOpen={false}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <p className="flex flex-row whitespace-nowrap text-sm font-bold text-black">
              Work Area
            </p>
            <div className="flex size-5 min-w-5 items-center justify-center">
              <ChevronRight className="size-4 group-data-[open]:rotate-90" />
            </div>
          </DisclosureButton>
          <DisclosurePanel className="my-4 mr-4 flex flex-col text-sm/5 text-black/50">
            <p>Work Area</p>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  );
};

export default RosterItemList;
