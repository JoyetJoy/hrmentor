import CompanyMenuHeader from "@/components/company/MenuHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ChevronRight, Upload } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import CompanyCreateSideBar from "@/components/sidebars/company/CompanyCreateSideBar";
import AddLogo from "@/components/popups/company/AddLogo";
import { Link } from "react-router-dom";

export default function CompanyGeneral() {
  const [loader, setLoader] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

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
      <AddLogo popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
      <CompanyMenuHeader />
      <div className="flex flex-row items-start justify-between gap-3">
        <form className="w-full">
          <div className="mb-3 mt-1 flex items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2 text-base font-bold text-black">
              <ArrowLeft onClick={() => history.back()} className="size-4 cursor-pointer" />
              Company Profile{" "}
            </div>
            <Link
            to="/admin/company/bank_details"
              className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
            >
              Next
            </Link>
          </div>
          <div className="w-full rounded-md bg-white px-5 py-7">
            <Disclosure as="div" className="py-1" defaultOpen={true}>
              <DisclosureButton className="group flex w-full items-center gap-x-2">
                <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
                  <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                </div>
                <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                  General details{" "}
                </p>
                <div className="h-px w-full bg-gray-light"></div>
              </DisclosureButton>
              <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                <div className="grid w-1/2 grid-cols-2 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                  <div className="group col-span-2 flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">Company Name</label>
                    <input
                      autoComplete="off"
                      type="text"
                      placeholder="Enter Name"
                      {...register("company_name", { required: true })}
                      className="input-box"
                    />
                    {errors.company_name && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.company_name?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">
                      Account owner first name
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("ac_owner_firstname", { required: true })}
                      className="input-box"
                    />
                    {errors.ac_owner_firstname && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.ac_owner_firstname?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">
                      Account owner last name
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("ac_owner_lastname", { required: true })}
                      className="input-box"
                    />
                    {errors.ac_owner_lastname && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.ac_owner_lastname?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">Email address</label>
                    <input
                      autoComplete="off"
                      placeholder="Enter email"
                      type="email"
                      {...register("email_adds", { required: true })}
                      className="input-box"
                    />
                    {errors.email_adds && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.email_adds?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">Phone number</label>
                    <input
                      autoComplete="off"
                      type="text"
                      placeholder="Enter number"
                      {...register("ph_nu", { required: true })}
                      className="input-box"
                    />
                    {errors.ph_nu && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.ph_nu?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">Business type</label>
                    <Controller
                      name="bussiness_type"
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
                    {errors.bussiness_type && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.bussiness_type?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">Account created date</label>
                    <input
                      autoComplete="off"
                      type="date"
                      placeholder="Select date"
                      {...register("ph_nu", { required: true })}
                      className="input-box"
                    />
                    {errors.ac_date && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.ac_date?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">Account status</label>
                    <Controller
                      name="ac_status"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={false}
                          styles={customSelectStyles}
                          placeholder="Select status"
                          className="input-box"
                        />
                      )}
                    />
                    {errors.ac_status && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.ac_status?.message}
                      </span>
                    )}
                  </div>
                  <div className="group col-span-2 flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">User Name</label>
                    <input
                      autoComplete="off"
                      type="text"
                      placeholder="Enter Name"
                      {...register("company_name", { required: true })}
                      className="input-box"
                    />
                    {errors.user_name && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.user_name?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">Company Logo(Size)</label>
                    <label
                      htmlFor=""
                      onClick={() => {
                        setPopupOpen(true);
                      }}
                      className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed bg-gray-darklight"
                    >
                      <div className="flex items-center gap-2">
                        <Upload className="size-5 text-black" />
                        <span className="font-semibold text-black">
                          Upload Logo
                        </span>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                    {errors.upload_logo && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.upload_logo?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-1">
                    <label className="label-text">Letter header</label>
                    <label
                      htmlFor=""
                      className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed bg-gray-darklight"
                    >
                      <div className="flex items-center gap-2">
                        <Upload className="size-5 text-black" />
                        <span className="font-semibold text-black">
                          Upload Letter header
                        </span>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                    {errors.upload_letter_header && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.upload_letter_header?.message}
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
                    Address details{" "}
                  </p>
                  <div className="h-px w-full bg-gray-light"></div>
                </DisclosureButton>
                <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                  <div className="grid w-1/2 grid-cols-2 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">
                        {" "}
                        Address line 1 details
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Enter address"
                        {...register("address_one", { required: true })}
                        className="input-box"
                      />
                      {errors.address_one && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.address_one?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">
                        {" "}
                        Address line 2 details
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Enter address"
                        {...register("address_two", { required: true })}
                        className="input-box"
                      />
                      {errors.address_two && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.address_two?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text"> Country</label>
                      <Controller
                        name="contry"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable={false}
                            styles={customSelectStyles}
                            placeholder="Select status"
                            className="input-box"
                          />
                        )}
                      />
                      {errors.contry && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.contry?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text">County</label>
                      <Controller
                        name="state"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable={false}
                            styles={customSelectStyles}
                            placeholder="Select status"
                            className="input-box"
                          />
                        )}
                      />
                      {errors.state && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.state?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text"> City</label>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Enter"
                        {...register("city", { required: true })}
                        className="input-box"
                      />
                      {errors.city && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.city?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-1">
                      <label className="label-text"> Postal Code </label>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Enter"
                        {...register("postal_code", { required: true })}
                        className="input-box"
                      />
                      {errors.postal_code && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.postal_code?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </div>
        </form>
        <CompanyCreateSideBar stepCounter={1} />
      </div>
    </>
  );
}
