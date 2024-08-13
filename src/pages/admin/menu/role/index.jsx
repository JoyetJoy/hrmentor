import React, { useState } from "react";
import { RoleSidebar } from "../../../../components/sidebars/roles/RoleSidebar";
import { rolesDummydata } from "../../../../constants/rolesDummy";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import {
  ChevronDown,
  Minus,
  Plus,
  ArrowLeft,
  ChevronRight,
  Asterisk,
} from "lucide-react";

import { Link } from "react-router-dom";
import EmployeeHeader from "@/components/common/EmployeeHeader";
export const MenuRoles = () => {
  const [collapseState, setCollapseState] = useState(false);

  const handleToggle = () => {
    setCollapseState(!collapseState);
  };
  return (
    <div className="flex flex-col ">
      <EmployeeHeader
      menu={"Menu"}
      subMenu={"Account Management"}
      pageHeading={"Role"}
      nextHeading={"Subscription"}
      nextLink={"/admin/subscription"}
      />
      <div className="flex flex-row mt-3 gap-7">
        <RoleSidebar />
        <div className="w-full bg-white px-10 pt-9 rounded-md">
          <h1 className="text-base text-black font-bold">Add New Role</h1>
          <hr className="border-b-1 border-gray-300 my-1" />
          <div className="flex flex-row  items-center gap-4 pt-6">
            <h1 className="flex flex-row whitespace-nowrap  text-sm">
              Role Name <Asterisk className="size-3 text-red-700" />:
            </h1>
            <input
              type="text"
              placeholder="Enter role name"
              className="input w-full border border-gray-300 max-w-xs h-10 focus:border-gray-300 focus:outline-none placeholder:text-[#7F7F7F] placeholder:text-xs "
            />
            <button className="text-white btn px-20 bg-textcolor-blue hover:bg-textcolor-blue h-10 min-h-10">
              Create
            </button>
          </div>
          <hr className="border-b-1 border-gray-500 my-1 mt-3 " />
          <form
            className="flex flex-col mt-3 gap-3"
            //   onSubmit={handleSubmit(onSubmit)}
          >
            {rolesDummydata?.map((items) => (
              <Disclosure
                key={items?.id}
                as="div"
                className=""
                defaultOpen={true}
              >
                <DisclosureButton className="group flex w-full items-center  gap-1 mb-2 ">
                  <span className="text-sm font-semibold text-black group-data-[hover]:text-black">
                    {items?.roleTypes}
                  </span>
                  <ChevronDown className="size-4 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                </DisclosureButton>

                {console.log(items)}
                <DisclosurePanel className="grid grid-cols-3  gap-3 mb-5  ">
                  <div className="flex gap-x-1.5 col-span-3">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="accent-black border border-gray-300"
                    />
                    <p className="text-sm">Select All</p>
                  </div>
                  {items?.data?.map((category) => (
                    <div
                      key={category.name}
                      className={`collapse bg-white border border-gray-300 w-full  rounded-md `}
                    >
                      <input
                        onClick={handleToggle}
                        type="checkbox"
                        className="peer    min-h-1 ps-3 pe-3 overflow-hidden "
                      />
                      <div className="flex   w-full justify-between items-center text-[0.78rem] collapse-title  min-h-0 p-3 ps-4 pe-12">
                        <div className="font-bold text-sm text-textcolor-300">
                          {category.guard_name}{" "}
                        </div>

                        {collapseState ? (
                          <Minus className="size-5 -mr-9 text-gray-600  stroke-[3px]" />
                        ) : (
                          <Plus className="size-5  -mr-9 text-gray-600  stroke-[3px]" />
                        )}
                      </div>
                      <div className="collapse-content border-t border-t-[#EAEAEA] flex flex-col gap-1 !text-[#3A3A3A] text-[0.78rem]">
                        {category?.data?.map((item) => (
                          <div
                            key={item?.name}
                            className="flex items-center font-medium mt-3 justify-between pr-1 gap-3"
                          >
                            <p>{item?.name}</p>
                            <input
                              type="checkbox"
                              className="accent-black size-3"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {/* <div className="h-10 w-full bg-black"></div>
                <div className="h-10 w-full bg-black"></div> */}
                </DisclosurePanel>
                <hr className="my-1 border border-gray-300" />
              </Disclosure>
            ))}
            {/* </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};
