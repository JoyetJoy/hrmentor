import React from "react";
import { RoleSidebar } from "../../../../components/sidebars/roles/RoleSidebar";
import { rolesDummydata } from "../../../../constants/rolesDummy";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDown, Minus, Plus } from "lucide-react";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
export const MenuRoles = () => {
  return (
    <div className="flex flex-row mt-3 gap-7">
      <RoleSidebar />
      <div className="w-full bg-white px-10 pt-9 rounded-md">
        <h1 className="text-xl text-black font-semibold">Add New Role</h1>
        <div className="border-b-2 border-gray-500 my-1"></div>
        <div className="flex flex-row gap-4 border-b border-gray-500 py-4">
          <h1 className="flex flex-row whitespace-nowrap items-center text-sm gap-1">
            Role Name <span>*</span>:
          </h1>
          <input
            type="text"
            placeholder="Type here"
            className="input w-full border border-gray-600 max-w-xs focus:border-gray-600 focus:outline-none"
          />
          <button className="text-white btn px-20 bg-btncolor hover:bg-btncolor">
            Create
          </button>
        </div>
        <form
          className="flex flex-col mt-3 gap-3 px-5"
          //   onSubmit={handleSubmit(onSubmit)}
        >
          {/* Permissions Checkboxes */}

          {/* Mapping over categories and items */}
          {rolesDummydata?.map((items) => (
            <Disclosure
              key={items?.id}
              as="div"
              className=""
              defaultOpen={true}
            >
              <DisclosureButton className="group flex w-full items-center gap-x-2">
                <span className="text-sm/6 font-medium text-black group-data-[hover]:text-black/80">
                  {items?.roleTypes}
                </span>
                <ChevronDown className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
              </DisclosureButton>

              {console.log(items)}
              <DisclosurePanel className="grid grid-cols-3  gap-3 ">
                <div className="flex gap-x-1.5 col-span-3">
                  <input type="checkbox" name="" id="" />
                  <p className="text-sm">Select All</p>
                </div>
                {items?.data?.map((category) => (
                  <div
                    key={category.name}
                    className={`collapse bg-white border w-full `}
                  >
                    <input
                      // onClick={() => toggleCollapse(category.category)}
                      type="checkbox"
                      className="peer"
                    />
                    <div className="flex   w-full justify-between text-[0.78rem] collapse-title">
                      <div className="font-medium">{category.guard_name}</div>
                      {/* {collapseState[category.category] ? (
                          <Minus className="w-4 -mr-9" />
                        ) : (
                          <Plus className="w-4 -mr-9" />
                        )} */}
                      <Minus className="w-4 -mr-9" />
                    </div>
                    <div className="collapse-content border-t border-t-[#EAEAEA] flex flex-col gap-1 !text-[#3A3A3A] text-[0.78rem]">
                      {/* Mapping over items within a category */}
                      {category?.data?.map((item) => (
                        <div
                          key={item?.name}
                          className="flex items-center font-medium mt-3 justify-between pr-1 gap-3"
                        >
                          <p>{item?.name}</p>
                          <input type="checkbox" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {/* <div className="h-10 w-full bg-black"></div>
                <div className="h-10 w-full bg-black"></div> */}
              </DisclosurePanel>
            </Disclosure>
          ))}
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};
