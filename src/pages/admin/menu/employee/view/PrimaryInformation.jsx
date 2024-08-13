import React from "react";
import { ArrowLeft, ChevronRight, Share2, } from "lucide-react";
import { Select } from "@headlessui/react";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { customSelectStyles } from "@/utils/customStyles";
import EmployeeHeader from "@/components/common/EmployeeHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";

function PrimaryInformation() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    // resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setLoader(true);
    handleEmployee(data);
  };
  const handleEmployee = (data) => {
    console.log(data);
  };
  return (
    <div className=" flex flex-col">
      <EmployeeHeader
        backLink={""}
        menu={"Menu"}
        subMenu={"Employee"}
        currentPath={" Employee Detail"}
        pageHeading={"Employees"}
        nextLink={""}
        nextHeading={"Settings"}
      />
      {/* ----sidebar---- */}
      <div className="flex gap-x-3">
        <EmployeesSidebar />
        <div className=" w-full bg">
          <>
            <div className="flex flex-row justify-between items-center">
              <h1 className="font-bold text-base  mb-3">Primary Information</h1>
              <div className="text-white font-semibold flex  items-center gap-2 ">
                <Link
                  to={""}
                  className="btn bg-bgColor-300 text-xs text-black hover:bg-bgColor-300 w-48 flex  items-center justify-center gap-1 min-h-10 h-10 "
                >
                  <Share2 className="size-4" />

                  Onboarding Form</Link>
                <Link
                  to={""}
                  className="btn bg-btncolor text-white text-xs hover:bg-btncolor w-28 min-h-10 h-10 "
                >
                  Update </Link>
              </div>
            </div>
            <div
              onSubmit={handleSubmit(onSubmit)}
              className=" grid grid-cols-2 gap-x-3 py-2"
            >
              <div className="flex flex-col items-baseline justify-center st px-5 py-4 rounded-md bg-white border border-gray-300">
                <h1 className="font-bold text-base px-3">Basic Details</h1>
                <div className="grid w-full grid-cols-2 gap-y-2 mt-4 ">
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">
                      Employee ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("employeeId", { required: true })}
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                    {errors.employeeId && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.employeeId?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2space-y-1 ">
                    <label className="label-text">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("firstName", { required: true })}
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                    {errors.firstName && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.firstName?.message}
                      </span>
                    )}
                  </div>

                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">Surname</label>
                    <input
                      {...register("surname")}
                      autoComplete="off"
                      type="text"
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                    {errors.surname && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.surname?.message}
                      </span>
                    )}
                  </div>

                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">Date of birth <span className="text-red-500">*</span></label>
                    <input
                      {...register("dateOBbirth", { required: true })}
                      autoComplete="off"
                      type="date"
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                    {errors.dateOfBirth && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.dateOBbirth?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1 ">
                    <label
                      onClick={() => setPopupOpen(true)}
                      className="label-text"
                    >
                      Gender
                      <span className="text-red-500">*</span>
                    </label>

                    <Controller
                      name="gender"
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
                          placeholder="Select Gender"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.gender && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.gender?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">Nationality</label>
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
                          placeholder="Select Gender"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.nationality && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.nationality?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">Country
                    <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="country"
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
                          placeholder="Select Gender"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.country && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.country?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">City <span className="text-red-500">*</span></label>
                    <Controller
                      name="city"
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
                          placeholder="Select Gender"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.city && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.city?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">Blood Group</label>
                    <Controller
                      name="bloodGroup"
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
                          placeholder="Select Gender"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.bloodGroup && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.bloodGroup?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">
                      National Insurance Number
                    </label>
                    <input
                      {...register("nationalInsurance", { required: true })}
                      autoComplete="off"
                      type="text"
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                    {errors.nationalInsurance && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.nationalInsurance?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">Home Address <span className="text-red-500">*</span></label>
                    <textarea
                      {...register("homeAddress", { required: true })}
                      autoComplete="off"
                      type="text"
                      className="input-box h-28 w-full border-2 focus:border-gray-300"
                    />
                    {errors.homeAddress && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.homeAddress?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">Communication Address</label>
                    <textarea
                      {...register("communicationAddress", { required: true })}
                      autoComplete="off"
                      type="text"
                      className="input-box h-28 w-full border-2 focus:border-gray-300"
                    />
                    {errors.communicationAddress && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.communicationAddress?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col  px-5 py-4 rounded-md bg-white border border-[#EBEBF0]">
                <h1 className="font-bold text-base px-3">Work Details</h1>

                <div
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid w-full grid-cols-2 gap-x-2 mt-4 "
                >
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text flex items-center gap-1">
                      Department{" "}
                      <Plus className="inline-block cursor-pointer text-white bg-[#2C2C2C]  rounded-full w-4 h-4 p-[0.2rem]" />
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("department", { required: true })}
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                    {errors.department && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.department?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">
                      Role<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("role", { required: true })}
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                    {errors.role && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.role?.message}
                      </span>
                    )}
                  </div>

                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text  flex items-center gap-1">Designation
                  
                      <Plus className="inline-block cursor-pointer text-white bg-[#2C2C2C]  rounded-full w-4 h-4 p-[0.2rem]" />

                    </label>
                    <Controller
                      name="designation"
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
                          placeholder="Select Designation"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.designation && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.designation?.message}
                      </span>
                    )}
                  </div>

                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">Date of Joinging</label>
                    <input

                      {...register("dateOfJoinging", { required: true })}
                      autoComplete="off"
                      type="date"
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                    {errors.dateOfJoinging && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.dateOfJoinging?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label
                      onClick={() => setPopupOpen(true)}
                      className="label-text flex  items-center gap-1"
                    >
                      Work Location
                      <Plus className="inline-block cursor-pointer text-white bg-[#2C2C2C]  rounded-full w-4 h-4 p-[0.2rem]" />

                    </label>
                    <Controller
                      name="worklocation"
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
                          placeholder="Select Work location"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.worklocation && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.worklocation?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">Employenment Type</label>
                    <Controller
                      name="employementype"
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
                          placeholder="Select Employement Type"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.employementype && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.employementype?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">
                      Mobile Number  </label>
                    <input
                      {...register("mobileNumber", { required: true })}
                      autoComplete="off"
                      type="text"
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                    {errors.mobileNumber && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.mobileNumber?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">Marital status</label>
                    <Controller
                      name="maritalstatus"
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
                          placeholder="Select Marital status"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.maritalstatus && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.maritalstatus?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">
                      Personal Email Address  </label>
                    <input
                      {...register("personalEmailAddress", { required: true })}
                      autoComplete="off"
                      type="text"
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                    {errors.personalEmailAddress && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.personalEmailAddress?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1 ">
                    <label className="label-text">
                      Work Email Address
                    </label>
                    <input
                      {...register("workEmailAddress", { required: true })}
                      autoComplete="off"
                      type="text"
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                    {errors.workEmailAddress && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.workEmailAddress?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default PrimaryInformation;
