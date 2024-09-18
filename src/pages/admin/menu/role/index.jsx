import React, { useState } from "react";
import { RoleSidebar } from "../../../../components/sidebars/roles/RoleSidebar";
import { rolesDummydata } from "../../../../constants/rolesDummy";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import { ChevronDown, Minus, Plus, ChevronRight } from "lucide-react";
import MenuHeader from "@/components/common/MenuHeader";
export const MenuRoles = () => {
  const [collapseState, setCollapseState] = useState(false);

  const handleToggle = () => {
    setCollapseState(!collapseState);
  };
  return (
    <div className="flex flex-col">
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={"Account Management"}
        currentpath={"Role"}
        activeMenu={"Role"}
        icon={<ChevronRight className="size-3" />}
      />
      <div className="mt-1 flex flex-row gap-4">
        <RoleSidebar />
        <div className="w-full rounded-md bg-white px-10 pt-9">
          <h1 className="text-xl font-bold text-black">Add New Role</h1>
          <hr className="border-b-1 my-1 border-gray-300" />
          <div className="flex flex-row items-center gap-2 pt-6">
            <div className="flex items-center gap-0.5">
              <h1 className="required flex flex-row whitespace-nowrap text-sm">
                Role Name
              </h1>
              <span>:</span>
            </div>

            <input
              type="text"
              placeholder="Enter role name"
              className="input h-11 min-h-11 w-full max-w-xs border border-black placeholder:text-sm placeholder:text-[#2C2C2C] focus:border-black focus:outline-none"
            />
            <button className="btn h-11 min-h-11 bg-textcolor-blue px-20 text-white hover:bg-textcolor-blue">
              Create
            </button>
          </div>
          <hr className="border-b-1 my-1 mt-3 border-gray-500" />
          <form className="mt-3 flex flex-col gap-3">
            {rolesDummydata?.map((items) => (
              <Disclosure
                key={items?.id}
                as="div"
                className=""
                defaultOpen={true}
              >
                <DisclosureButton className="group mb-1 flex w-full items-center gap-1">
                  <span className="text-base font-bold text-black group-data-[hover]:text-black">
                    {items?.roleTypes}
                  </span>
                  <ChevronDown className="size-5 fill-white/60 group-data-[open]:rotate-180 group-data-[hover]:fill-white/50" />
                </DisclosureButton>

                {console.log(items)}
                <DisclosurePanel className="mb-5 grid grid-cols-3 gap-3">
                  <div className="col-span-3 my-3 flex items-center gap-x-1.5">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="size-4 border border-gray-300 accent-black"
                    />
                    <p className="text-sm">Select All</p>
                  </div>
                  {items?.data?.map((category) => (
                    <div
                      key={category.name}
                      className={`collapse w-full rounded-md border border-gray-300 bg-white`}
                    >
                      <input
                        onClick={handleToggle}
                        type="checkbox"
                        className="peer min-h-1 overflow-hidden pe-3 ps-3"
                      />
                      <div className="collapse-title flex min-h-0 w-full items-center justify-between p-3 pe-12 ps-4 text-[0.78rem]">
                        <div className="font-poppins text-sm font-semibold text-textcolor-300">
                          {category.guard_name}{" "}
                        </div>

                        {collapseState ? (
                          <Minus className="-mr-9 size-5 stroke-[3px] text-gray-600" />
                        ) : (
                          <Plus className="-mr-9 size-5 stroke-[3px] text-gray-600" />
                        )}
                      </div>
                      <div className="collapse-content flex flex-col gap-1 border-t border-t-[#EAEAEA] text-[0.78rem] !text-[#3A3A3A]">
                        {category?.data?.map((item) => (
                          <div
                            key={item?.name}
                            className="mt-3 flex items-center justify-between gap-3 pr-1 font-poppins font-medium"
                          >
                            <p className="font-poppins text-[13px] text-[#3A3A3A]">
                              {item?.name}
                            </p>
                            <input
                              type="checkbox"
                              className="size-4 border border-black accent-black"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </DisclosurePanel>
                <div className="my-1 border-b border-[#EAEAEA]"></div>
              </Disclosure>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
};
