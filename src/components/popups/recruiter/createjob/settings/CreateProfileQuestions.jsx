import { customSelectStyles } from "@/utils/customStyles";
import { Popover, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import React, { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

function CreateProfileQuestions({ popupOpen, setPopupOpen }) {
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
                <Popover.Panel className="w-[22rem] transform rounded-sm bg-white px-9 pb-10 pt-6">
                  <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-sm font-bold leading-7 text-neutral-700">
                      Create Questions
                    </h1>
                    <button
                      onClick={closeModal}
                      className="text-lg font-extrabold text-[#00000080]"
                    >
                      <X />
                    </button>
                  </div>

                  <form className="mt-4 grid grid-cols-1 gap-3">
                    <div className="group flex flex-col space-y-1">
                      <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                        Name
                      </label>
                      <input
                        // {...register("name", { required: true })}
                        type="text"
                        className="input-box h-10 w-full"
                      />
                      {/* {errors.name && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.name?.message}
                      </span>
                    )} */}
                    </div>
                    <div className="group flex w-full flex-col gap-1">
                      <label className="label-text">Default</label>
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

                    <div className="mt-2 flex flex-row items-center justify-center gap-2">
                      <button className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded border border-[#ECE9F1] text-sm font-semibold text-[#7F7F7F] focus:outline-none">
                        Cancel
                      </button>
                      <button className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded bg-bgColor-100 text-sm font-normal text-white focus:outline-none">
                        Submit
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

export default CreateProfileQuestions;
