import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select"

export default function ReferenceEdit({
  popupOpen,
  setPopupOpen,
  selectedField,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(),
  });

  function close() {
    setPopupOpen(false);
  }

  const [isLoading, setIsLoading] = useState();
  const [loader, setLoder] = useState();
 
  return (
    <Dialog
      open={popupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-sm rounded bg-white/90 p-7 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                {selectedField ? "Update" : "Add"} Reference
              </h1>
              <button
                type="button"
                onClick={close}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>
            {isLoading ? (
              <div className="flex min-h-72 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <form
                className="grid grid-cols-1 gap-3"
                //   onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-1 gap-3 ">
                  <div className="group flex w-full flex-col gap-1">
                    <label className="label-text ">Type</label>
                    <Controller
                    name="document_type_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        placeholder="Select Type"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    )}
                  />
                    {errors.type && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.type?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Name of the reference
                    </label>
                    <input
                      {...register("reference_name", { required: true })}
                      className="input-box h-10 w-full"
                    />
                    {errors.reference_name && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.reference_name?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Personal Email Address
                    </label>
                    <input
                      {...register("email", { required: true })}
                      className="input-box h-10 w-full"
                    />
                    {errors.email && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.email?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Contact Number
                    </label>
                    <input
                      {...register("contact_number", { required: true })}
                      className="input-box h-10 w-full"
                    />
                    {errors.contact_number && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.contact_number?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1">
                  <div className="mt-7 flex flex-row items-center justify-center gap-3">
                    <button
                      type="submit"
                      className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                      disabled={loader}
                    >
                      {loader ? (
                        <div className="flex items-center gap-3">
                          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                          {selectedField ? "Updating" : "Saving"}
                        </div>
                      ) : (
                        <span>{selectedField ? "Update" : "Save"}</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={close}
                      className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
