import { customSelectStyles } from "@/utils/customStyles";
import { Button, Popover, Transition } from "@headlessui/react";
import { Upload, X } from "lucide-react";
import React, { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

function AddCompensation({ popupOpen, setPopupOpen }) {
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
        <div className="fixed inset-0 z-[100] flex h-full w-full items-center justify-center bg-black/20">
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
                <Popover.Panel className="h-full w-[44rem] transform rounded-sm bg-white px-9 py-9">
                  <div className="mb-5 flex items-center justify-between">
                    <h1 className="text-sm font-bold leading-7 text-black">
                      Add Compensation
                    </h1>
                    <button
                      onClick={closeModal}
                      className="text-lg font-extrabold text-[#00000080]"
                    >
                      <X />
                    </button>
                  </div>

                  <form className="mt-4 grid grid-cols-2 gap-6">
                    <div className="group flex w-full flex-col space-y-1">
                      <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                        Effective form{" "}
                      </label>
                      <input
                        // {...register("name", { required: true })}
                        type="date"
                        className="input-box h-10 w-full rounded-md border border-[#C2C1C1] placeholder:disabled focus:border-[#C2C1C1]"
                      />
                      {/* {errors.name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.name?.message}
                    </span>
                  )} */}
                    </div>
                    <div className="group flex w-full flex-col space-y-1">
                      <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                        Currency{" "}
                      </label>
                      <input
                        type="text"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    </div>

                    <div className="group flex flex-col space-y-1">
                      <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                        Pay Rate{" "}
                      </label>
                      <input
                        type="text"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    </div>

                    <div className="group flex w-full flex-col space-y-1 ">
                      <label className="label-text">per</label>
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
                            placeholder="Select Nationality"
                            className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                          />
                        )}
                      />
                      {errors.nationality && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.nationality?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex w-full flex-col space-y-1 ">
                      <label className="label-text">Pay Schdule</label>
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
                            placeholder="Select Nationality"
                            className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                          />
                        )}
                      />
                      {errors.nationality && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.nationality?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex w-full flex-col space-y-1 ">
                      <label className="label-text">Pay Type</label>
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
                            placeholder="Select Nationality"
                            className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                          />
                        )}
                      />
                      {errors.nationality && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.nationality?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex w-full flex-col space-y-1">
                      <label className="label-text">Over time</label>
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
                            placeholder="Select Nationality"
                            className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                          />
                        )}
                      />
                      {errors.nationality && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.nationality?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex w-full flex-col space-y-1">
                      <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                        Currency{" "}
                      </label>
                      <input
                        type="text"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    </div>
                    <div className="group  flex flex-col space-y-1">
                      <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                        Comment{" "}
                      </label>
                      <input
                        type="text"
                        className="input-box h-10 w-full  rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-6">

                    <div className="group flex w-full flex-col space-y-1">
                      <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                        Annual Salary
                      </label>
                      <input
                        type="text"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    </div>
                    <div className="group flex w-full flex-col space-y-1">
                      <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                        Monthly Rate{" "}
                      </label>
                      <input
                        type="text"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    </div>
                    </div>
                    <div className="mt-2 flex flex-row items-center gap-5">
                      <button className="flex h-10 w-32 cursor-pointer items-center justify-center gap-2 rounded bg-[#030E5C] text-sm font-normal text-white focus:outline-none">
                        Save
                      </button>
                      <button className="flex h-10 w-32 cursor-pointer items-center justify-center gap-2 rounded border border-black text-sm font-semibold text-black focus:outline-none">
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
  );
}

export default AddCompensation;
