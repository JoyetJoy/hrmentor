import CompanyMenuHeader from "@/components/company/MenuHeader";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { customSelectStyles } from "@/utils/customStyles";
import CompanyCreateSideBar from "@/components/sidebars/company/CompanyCreateSideBar";
import { Link } from "react-router-dom";

export default function CompanyBankDetails() {
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(),
  });

  return (
    <>
      <CompanyMenuHeader />
      <div className="flex flex-row items-start justify-between gap-3">
        <form className="w-full">
          <div className="mb-3 mt-1 flex items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2 text-base font-bold text-black">
              <ArrowLeft onClick={() => history.back()} className="size-4 cursor-pointer" />
              Company Profile{" "}
            </div>
            <Link
              to="/admin/company/signatory"
              className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
            >
              Next
            </Link>
          </div>
          <div className="h-screen w-full rounded-md bg-white px-5 py-7">
            <Disclosure as="div" className="py-1" defaultOpen={true}>
              <DisclosureButton className="group flex w-full items-center gap-x-2">
                <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
                  <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                </div>
                <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                  Bank account details
                </p>
                <div className="h-px w-full bg-gray-light"></div>
              </DisclosureButton>
              <DisclosurePanel>
                <div className="grid w-1/2 grid-cols-2 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">Bank Name</label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("bank_name", { required: true })}
                      className="input-box"
                    />
                    {errors.bank_name && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.bank_name?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">Branch</label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("branch", { required: true })}
                      className="input-box"
                    />
                    {errors.branch && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.branch?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="required label-text">
                      Account Number
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("ac_number", { required: true })}
                      className="input-box"
                    />
                    {errors.ac_number && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.ac_number?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="required label-text">
                      Account Holder Nmae
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("ac_holder_name", { required: true })}
                      className="input-box"
                    />
                    {errors.ac_holder_name && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.ac_holder_name?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="required label-text">Sort Code</label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("sort_code", { required: true })}
                      className="input-box"
                    />
                    {errors.sort_code && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.sort_code?.message}
                      </span>
                    )}
                  </div>

                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">Swift Code</label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("swift_code", { required: true })}
                      className="input-box"
                    />
                    {errors.swift_code && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.swift_code?.message}
                      </span>
                    )}
                  </div>
                  <div className="group col-span-2 flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">IBAN Number</label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("iban_num", { required: true })}
                      className="input-box"
                    />
                    {errors.iban_num && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.iban_num?.message}
                      </span>
                    )}
                  </div>
                </div>
              </DisclosurePanel>
            </Disclosure>
            <div className="flex flex-col gap-2.5 pb-7">
              <Disclosure as="div" className="py-1" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center gap-x-2">
                  <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
                    <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                  </div>
                  <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                    Tax Details{" "}
                  </p>
                  <div className="h-px w-full bg-gray-light"></div>
                </DisclosureButton>
                <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                  <div className="grid w-1/2 grid-cols-2 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text"> PAN</label>
                      <input
                        autoComplete="off"
                        type="text"
                        {...register("pan_number", { required: true })}
                        className="input-box"
                      />
                      {errors.pan_number && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.pan_number?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">TAN </label>
                      <input
                        autoComplete="off"
                        type="text"
                        {...register("tan_num", { required: true })}
                        className="input-box"
                      />
                      {errors.tan_num && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.tan_num?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text"> TDS Circle/AO </label>
                      <input
                        autoComplete="off"
                        type="text"
                        {...register("tds_circle", { required: true })}
                        className="input-box"
                      />
                      {errors.tds_circle && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.tds_circle?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">
                        TAX Payment frequency
                      </label>
                      <Controller
                        name="tax_payment"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable={false}
                            styles={customSelectStyles}
                            placeholder="Select "
                            className="input-box"
                          />
                        )}
                      />
                      {errors.tax_payment && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.tax_payment?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text"> Deductor name</label>
                      <Controller
                        name="deductor_name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable={false}
                            styles={customSelectStyles}
                            placeholder="Select"
                            className="input-box"
                          />
                        )}
                      />
                      {errors.deductor_name && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.deductor_name?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">Deductor father name</label>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Enter"
                        {...register("city", { required: true })}
                        className="input-box"
                      />
                      {errors.deductor_father_name && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.deductor_father_name?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </div>
        </form>
        <CompanyCreateSideBar stepCounter={2} />
      </div>
    </>
  );
}
