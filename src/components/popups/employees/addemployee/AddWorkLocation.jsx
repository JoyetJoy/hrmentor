import { customSelectStyles } from "@/utils/customStyles";
import {  Popover, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import React, { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
function AddWorkLocation({popupOpen,setPopupOpen}) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm({
        mode: "onSubmit",
        // resolver: yupResolver(schema),
      });
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
              <Popover.Panel className="w-[22rem] transform px-9 pt-6 pb-10 bg-white rounded-sm">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-neutral-700 text-sm font-bold leading-7">
                    Add Work Location
                  </h1>
                  <button
                    onClick={closeModal}
                    className="text-[#00000080] font-extrabold  text-lg"
                  >
                  <X/>
                  </button>
                </div>

                <form className="grid mt-4 gap-3 grid-cols-1">
                  <div className="flex group flex-col space-y-1">
                    <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                    Work Location
                    </label>
                    <input
                      // {...register("name", { required: true })}
                      type="text"
                      className="w-full h-10 input-box"
                    />
                    {/* {errors.name && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.name?.message}
                      </span>
                    )} */}
                  </div>
                  <div className="flex group flex-col space-y-1">
                    <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                    Work Location Address
                    </label>
                    <input
                      // {...register("name", { required: true })}
                      type="text"
                      className="w-full h-20 input-box"
                    />
                    {/* {errors.name && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.name?.message}
                      </span>
                    )} */}
                  </div>
                  <div className="group flex w-full flex-col gap-1 ">
                        <label className="label-text">Status</label>
                        <Controller
                          name="nationality"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              // required
                              //   selected={''}
                              //   value={''}
                              //   onChange={(selectedOption) => {
                              //     handle(selectedOption);
                              //     field.onChange(selectedOption);
                              //   }}
                              //   options={}
                              isSearchable={false}
                              styles={customSelectStyles}
                              placeholder="Select Status"
                              className="input-box h-10 w-full border-[#C2C1C1] focus:border-[#C2C1C1] rounded-md"
                            />
                          )}
                        />
                        {errors.nationality && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.nationality?.message}
                          </span>
                        )}
                      </div>
                 
                 
                  <div className="flex flex-row items-center justify-center gap-2 mt-2 ">
                  <button className="flex  cursor-pointer bg-[#030E5C] text-white focus:outline-none text-sm gap-2 w-full font-normal h-10 justify-center items-center rounded">
                    Save
                  </button>
                  <button className="flex  cursor-pointer text-black border border-black focus:outline-none text-sm gap-2 w-full font-semibold h-10 justify-center items-center rounded">
                    Cancel
                  </button>
                  </div>
                </form>
              </Popover.Panel>
            </Transition>
          </>
        </Popover>
      </div>
    )}
  </>
  )
}

export default AddWorkLocation
