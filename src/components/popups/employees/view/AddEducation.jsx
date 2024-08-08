import { customSelectStyles } from "@/utils/customStyles";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

import React from "react";

export default function AddEducation({ popupOpen, setPopupOpen }) {
  function closeModal() {
    setPopupOpen(false);
  }

  return (
    <>
      {popupOpen && (
        <div className="fixed inset-0 bg-black/20 z-[100] w-full h-full flex items-center justify-center">
          <Popover className="relative">
            <>
              <Transition
                as={Fragment}
                show={popupOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="w-[20rem] transform px-9 py-4 bg-white rounded-lg">
                  <div className="flex justify-between items-center">
                    <h1 className="text-neutral-700 text-base font-semibold leading-7">
                      Add Education Details
                    </h1>
                    <button
                      onClick={closeModal}
                      className="text-black font-extrabold text-xl"
                    >
                      ✕
                    </button>
                  </div>

                  <form className="grid mt-4 gap-1 grid-cols-1">
                    <div className="flex group flex-col space-y-1">
                      <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                        Type
                      </label>
                      <input
                        // {...register("name", { required: true })}
                        placeholder="Enter name"
                        type="text"
                        className="w-full h-8 input-box"
                      />
                      {/* {errors.name && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.name?.message}
                        </span>
                      )} */}
                    </div>
                    <div className="flex group flex-col space-y-1">
                      <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                        Institution
                      </label>
                      <input
                        placeholder="Enter code"
                        type="text"
                        className="w-full h-8 input-box"
                      />
                    </div>
                    <div className="flex group flex-col space-y-1">
                      <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                        Title
                      </label>
                      <input
                        placeholder="Enter code"
                        type="text"
                        className="w-full h-8 input-box"
                      />
                    </div>
                    <div className="flex group flex-col space-y-1">
                      <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                        Start Date
                      </label>
                      <input
                        placeholder="Enter code"
                        type="text"
                        className="w-full h-8 input-box"
                      />
                    </div>
                    <div className="flex group flex-col space-y-1">
                      <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                        End Date
                      </label>
                      <input
                        placeholder="Enter code"
                        type="text"
                        className="w-full h-8 input-box"
                      />
                    </div>
                    <div className="flex group flex-col space-y-1">
                      <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                        Status
                      </label>
                      <input
                        placeholder="Enter code"
                        type="text"
                        className="w-full h-8 input-box"
                      />
                    </div>
                    <div className="flex group flex-col space-y-1">
                      <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                        Status
                      </label>
                      <input
                        placeholder="Enter code"
                        type="text"
                        className="w-full h-8 input-box"
                      />
                    </div>

                    <button className="flex mt-10 cursor-pointer bg-[#030E5C] text-white focus:outline-none text-sm gap-2 w-32 font-normal h-10 justify-center items-center rounded">
                      Update
                    </button>
                  </form>
                </Popover.Panel>
              </Transition>
            </>
          </Popover>
        </div>
      )}
    </>
  );
}
