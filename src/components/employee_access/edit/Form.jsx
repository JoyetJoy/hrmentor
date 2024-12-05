import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";

export default function ProfileManagmentForm() {
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "on",
    reValidateMode: "onChange",
    resolver: yupResolver(),
  });

  return (
    <>
      <form className="w-full">
        <div className="my-1 flex w-full flex-row items-center justify-between">
          <h1 className="text-lg font-bold">Primary Information</h1>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="btn flex h-10 min-h-10 min-w-24 items-center bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
            >
              Edit
            </button>
          </div>
        </div>
        <div className="grid w-full gap-x-3 py-2 lg:grid-cols-2">
          <div
            className={`flex w-full flex-col rounded-md border border-gray-soft bg-white px-6 py-6`}
          >
            <div className="flex flex-col items-start justify-between gap-7">
              <h1 className="px-3 text-[1.1rem] font-bold">Basic Details</h1>
              <div className="items-left col-span-4 flex items-center gap-2 space-y-3">
                <div className="h-36 w-36 overflow-hidden rounded-full border-2">
                  <img
                    className="h-full w-full bg-gray-neutral object-cover"
                    src={""}
                    alt={""}
                  />
                </div>
                <p className="flex flex-col text-lg font-bold text-black">
                  Harshal <span className="text-xs font-normal">Developer</span>
                </p>
              </div>
            </div>
            <div className="mt-4 grid w-full lg:grid-cols-2">
              <div className="group col-span-2 flex w-1/2 flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Gender</label>
                <Controller
                  name="gender"
                  className=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      placeholder="Select Gender"
                      className="input-box"
                    />
                  )}
                />
                {errors.gender && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.gender.message}
                  </span>
                )}
              </div>

              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Date of birth</label>
                <input
                  {...register("dob", { required: true })}
                  autoComplete="off"
                  type="date"
                  className="input-box pr-2"
                />
                {errors.dob && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.dob?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Blood Group</label>
                <Controller
                  name="blood_group"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      placeholder="Select Blood Group"
                      className="input-box"
                    />
                  )}
                />
                {errors.blood_group && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.blood_group?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Nationality</label>
                <Controller
                  name="nationality_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      //   options={nationalityList}
                      placeholder="Select Nationality"
                      className="input-box"
                    />
                  )}
                />
                {errors.nationality_id && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.nationality_id?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Country</label>
                <Controller
                  name="country_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      //   options={countryList}
                      placeholder="Select Country"
                      className="input-box"
                    />
                  )}
                />
                {errors.country_id && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.country_id?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">County</label>
                <Controller
                  name="state_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <AsyncSelect
                      {...field}
                      placeholder="Search ..."
                      //   loadOptions={loadStatesOptions}
                      isSearchable={true}
                      noOptionsMessage={() => "type and search"}
                      className="input-box"
                    />
                  )}
                />
                {errors.state_id && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.state_id?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Citytown</label>
                <Controller
                  name="city_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <AsyncSelect
                      {...field}
                      placeholder="Search ..."
                      //   loadOptions={loadCitiesOptions}
                      isSearchable={true}
                      noOptionsMessage={() => "type and search"}
                      className="input-box"
                    />
                  )}
                />
                {errors.city_id && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.city_id?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Post Code</label>
                <input
                  {...register("post_code", { required: true })}
                  autoComplete="off"
                  type="text"
                  placeholder="Enter Post Code"
                  className="input-box"
                  onKeyPress={(event) => {
                    if (
                      !/^[a-zA-Z0-9\s]$/.test(event.key) ||
                      event.target.value.replace(/\s/g, "").length >= 6
                    ) {
                      event.preventDefault();
                    }
                  }}
                />
                {errors.post_code && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.post_code?.message}
                  </span>
                )}
              </div>

              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">National Insurance Number</label>
                <input
                  {...register("national_insurance_number", {
                    required: true,
                  })}
                  autoComplete="off"
                  type="text"
                  placeholder="Enter National Insurance Number"
                  className="input-box"
                />
                {errors.national_insurance_number && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.national_insurance_number?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className={`label-text`}>Home Address</label>
                <textarea
                  autoComplete="off"
                  type="text"
                  {...register("home_address", { required: true })}
                  className="input-box min-h-28 py-1"
                />
                {errors.home_address && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.home_address?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label
                  className={`label-text flex flex-row items-center justify-between`}
                >
                  <p className="whitespace-nowrap">Communication Address</p>
                  <div className="flex gap-1.5">
                    <input
                      type="checkbox"
                      //   onChange={() => {
                      //     setSameAsHome(!sameAsHome);
                      //   }}
                    />
                    <span className="mt-0.5 whitespace-nowrap text-[0.5rem] font-medium text-gray-dim md:text-xs">
                      Same as home
                    </span>
                  </div>
                </label>
                <textarea
                  autoComplete="off"
                  {...register("communication_address", { required: true })}
                  className="input-box min-h-28 py-1"
                />
                {errors.communication_address && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.communication_address?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div
            className={`flex w-full flex-col rounded-md border border-gray-soft bg-white px-6 py-6`}
          >
            <h1 className="px-3 text-[1.1rem] font-bold">Work Details</h1>
            <div className="mt-4 grid w-full lg:grid-cols-2">
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text flex flex-row items-center gap-1">
                  <span className="">Department</span>
                </label>
                <Controller
                  name="department_id"
                  className=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      placeholder="Select Department"
                      className="input-box"
                    />
                  )}
                />
                {errors.department_id && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.department_id?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Role</label>
                <Controller
                  name="role_id"
                  className=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      isMulti
                      placeholder="Select Role"
                      className="input-box h-fit"
                    />
                  )}
                />
                {errors.role_id && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.role_id.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text flex flex-row items-center gap-1">
                  <span className="">Designation</span>
                </label>
                <Controller
                  name="designation_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      placeholder="Select Designation"
                      className="input-box"
                    />
                  )}
                />
                {errors.designation_id && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.designation_id?.message}
                  </span>
                )}
              </div>

              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Date of Joining</label>
                <input
                  {...register("date_of_joining", { required: true })}
                  autoComplete="off"
                  type="date"
                  className="input-box pr-2"
                />
                {errors.date_of_joining && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.date_of_joining?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text flex flex-row items-center gap-1">
                  <span className="">Work Location</span>
                </label>
                <Controller
                  name="worklocation_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      placeholder="Select Work location"
                      className="input-box"
                    />
                  )}
                />
                {errors.worklocation_id && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.worklocation_id?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text flex flex-row items-center gap-1">
                  <span className="">Employment Type</span>
                </label>
                <Controller
                  name="employment_type"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      placeholder="Select Employement Type"
                      className="input-box"
                    />
                  )}
                />
                {errors.employment_type && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.employment_type?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Mobile Number </label>
                <input
                  {...register("mobile_number", { required: true })}
                  autoComplete="off"
                  type="text"
                  placeholder="Enter Moblie Number"
                  onKeyPress={(event) => {
                    if (
                      !/^[0-9]$/.test(event.key) ||
                      event.target.value.length >= 11
                    ) {
                      event.preventDefault();
                    }
                  }}
                  className="input-box"
                />
                {errors.mobile_number && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.mobile_number?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Marital Status</label>
                <Controller
                  name="marital_status"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      placeholder="Select Marital status"
                      className="input-box"
                    />
                  )}
                />
                {errors.marital_status && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.marital_status?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Personal Email Address </label>
                <input
                  {...register("personal_email", { required: true })}
                  autoComplete="off"
                  type="text"
                  placeholder="Enter Personal Email Address  "
                  className="input-box"
                />
                {errors.personal_email && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.personal_email?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Work Email Address</label>
                <input
                  {...register("work_email", { required: true })}
                  autoComplete="off"
                  type="text"
                  placeholder="Enter Work Email Address"
                  className="input-box"
                />
                {errors.work_email && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.work_email?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Pension subscription</label>
                <Controller
                  name="pention_status"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={true}
                      styles={customSelectStyles}
                      placeholder="Select status"
                      className="input-box"
                    />
                  )}
                />
                {errors.pention_status && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.pention?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
