import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {  X } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";


export default function BankDetailsEdit({
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
          className="data-[closed]:transform-[scale(95%)] w-full max-w-2xl rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
        >
          <div className="mb-7 flex items-center justify-between">
            <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
              {selectedField ? "Update" : "Add"} Bank Details
            </h1>
            <div className="flex items-center gap-7">
              <div className="group flex gap-2">
                <input
                  onChange={(e) => {
                    setIsDefault(e.target.checked);
                  }}
                  className="input-box h-5 w-5"
                  type="checkbox"
                />
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Set as default
                </label>
              </div>
              <button
                type="button"
                onClick={close}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="flex min-h-72 w-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
            </div>
          ) : (
            <form
              className="grid grid-cols-2 gap-3"
            >
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Account Type</label>
                <Controller
                  name="account_type"
                  control={control}
                  // rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Select Type"
                      className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                    />
                  )}
                />
                {errors.account_type && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.account_type?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Bank Name
                </label>
                <input
                  {...register("bank_name", { required: true })}
                  className="input-box h-10 w-full"
                />
                {errors.bank_name && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.bank_name?.message}
                  </span>
                )}
              </div>
              {/* <div className="group flex flex-col space-y-1">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Branch
                </label>
                <input
                  {...register("branch", { required: true })}
                  className="input-box h-10 w-full"
                />
                {errors.branch && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.branch?.message}
                  </span>
                )}
              </div> */}
              <div className="group flex flex-col space-y-1">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Account Number
                </label>
                <input
                  {...register("account_number", { required: true })}
                  className="input-box h-10 w-full"
                />
                {errors.account_number && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.account_number?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Sort Code
                </label>
                <input
                  {...register("sort_code", { required: true })}
                  className="input-box h-10 w-full"
                />
                {errors.sort_code && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.sort_code?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Acc. Holder Name
                </label>
                <input
                  {...register("account_holder_name", { required: true })}
                  className="input-box h-10 w-full"
                />
                {errors.account_holder_name && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.account_holder_name?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  IBAN Number
                </label>
                <input
                  {...register("iban")}
                  className="input-box h-10 w-full"
                />
                {errors.iban && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.iban?.message}
                  </span>
                )}
              </div>
              
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Swift Code
                </label>
                <input
                  {...register("swift_code")}
                  className="input-box h-10 w-full"
                />
                {errors.swift_code && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.swift_code?.message}
                  </span>
                )}
              </div>
              <br />
              <div className="mb-4 mt-7 flex flex-row items-center justify-center gap-3 w-full">
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
            </form>
          )}
        </DialogPanel>
      </div>
    </div>
  </Dialog>
  )
}
