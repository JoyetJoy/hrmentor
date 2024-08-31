import MenuHeader from "@/components/common/MenuHeader";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import React from "react";

function History() {
  return (
    <div className="h-screen overflow-hidden">
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeSubMenu={"Candidates"}
        activeMenu={"Candidates"}
      />

      <div className="h-full w-full rounded-md bg-white py-5">
        <div className="mx-auto w-full max-w-2xl flex flex-col gap-2  relative">
          <Disclosure as="div"defaultOpen={true} className="rounded-md bg-[#F5F5F5] p-3">  
            <DisclosureButton className="group flex w-full items-center justify-between">
              <div className="size-4 bg-[#00B448] rounded-full"/>

              <ChevronDownIcon className="size-5 fill-white/60 group-data-[open]:rotate-180 group-data-[hover]:fill-white/50" />
            </DisclosureButton>
            <DisclosurePanel className="ml-5 mt-2 text-sm/5">
              <div className="table mx-auto my-4 w-full max-w-2xl">
                <table className="mx-auto w-full table-auto">
                  <thead className="overflow-hidden rounded-lg bg-[#D9D9D9]">
                    <tr className="px-5 py-5 text-sm font-semibold text-black">
                      <th className="">Scheduled</th>
                      <th className="">Date</th>
                      <th className="">Job Title</th>
                      <th className="">Interview Type</th>
                    </tr>
                  </thead>
                  <tbody className="border-none bg-transparent px-4">
                    <tr className="text-xs font-medium text-black">
                      <td className="">Shahnaz.Shaji(interviewer)</td>
                      <td className="">10/5/23</td>
                      <td className="">Developer</td>
                      <td className="">Telephonic</td>
                    </tr>
                    <tr className="py-3 text-xs font-medium text-black">
                      <td className="">Shahnaz.Shaji(interviewer)</td>
                      <td className="">10/5/23</td>
                      <td className="">Developer</td>
                      <td className="">Telephonic</td>
                    </tr>
                    <tr className="py-3 text-xs font-medium text-black">
                      <td className="">Shahnaz.Shaji(interviewer)</td>
                      <td className="">10/5/23</td>
                      <td className="">Developer</td>
                      <td className="">Telephonic</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure as="div"  className="rounded-md bg-[#F5F5F5] p-3" defaultOpen={true}>
          <DisclosureButton className="group flex w-full items-center justify-between">
          <div className="size-4 bg-[#00B448] rounded-full"/>
              <ChevronDownIcon className="size-5 fill-white/60 group-data-[open]:rotate-180 group-data-[hover]:fill-whiteml-5" />
            </DisclosureButton>
            <DisclosurePanel className="ml-5 mt-2 text-sm/5">
              <div className="table mx-auto my-4 w-full max-w-2xl">
                <table className="mx-auto w-full table-auto">
                  <thead className="overflow-hidden rounded-lg bg-[#D9D9D9]">
                    <tr className="px-5 py-5 text-sm font-semibold text-black">
                      <th className="">Scheduled</th>
                      <th className="">Date</th>
                      <th className="">Job Title</th>
                      <th className="">Interview Type</th>
                    </tr>
                  </thead>
                  <tbody className="border-none bg-transparent px-4">
                    <tr className="text-xs font-medium text-black">
                      <td className="">Shahnaz.Shaji(interviewer)</td>
                      <td className="">10/5/23</td>
                      <td className="">Developer</td>
                      <td className="">Telephonic</td>
                    </tr>
                    <tr className="py-3 text-xs font-medium text-black">
                      <td className="">Shahnaz.Shaji(interviewer)</td>
                      <td className="">10/5/23</td>
                      <td className="">Developer</td>
                      <td className="">Telephonic</td>
                    </tr>
                    <tr className="py-3 text-xs font-medium text-black">
                      <td className="">Shahnaz.Shaji(interviewer)</td>
                      <td className="">10/5/23</td>
                      <td className="">Developer</td>
                      <td className="">Telephonic</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </DisclosurePanel>
            
          </Disclosure>
          <div className=" inset-5 w-0 border-l border-[#00B448] absolute left-5  ">

          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
