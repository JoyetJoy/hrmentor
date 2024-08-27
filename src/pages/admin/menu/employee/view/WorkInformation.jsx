import React from "react";
import { ArrowLeft, ChevronRight, Plus } from "lucide-react";
import { Select } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { customSelectStyles } from "@/utils/customStyles";
import EmployeeHeader from "@/components/common/EmployeeHeader";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import MenuSubHeader from "@/components/common/MenuSubHeader";
import MenuHeader from "@/components/common/MenuHeader";

export const WorkInformation = () => {
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
      <MenuHeader
      menu={"Menu"}
      subMenu={"Employee"}
      currentpath={"Employee Detail"}
      icon={<ChevronRight className="size-3" />}
      activeMenu={'Employees'}
      />
      {/* ----sidebar---- */}
      <div className="flex gap-x-3">
        <EmployeesSidebar />
        <div className=" w-full bg">
          <>
            {/* <div className="flex flex-row justify-between items-center">
              <h1 className="font-bold text-lg  mb-3">Work  Information</h1>
              <div className="text-white font-semibold flex  items-center gap-2 ">
                <Link
                  to={""}
                  className="btn bg-btncolor text-white hover:bg-btncolor w-full text-sm  flex items-center gap-1"
                >
                 
                  Add Work</Link>
              </div>
            </div> */}
            <MenuSubHeader
                heading={"Work  Information"}
                SecondLink={{ label:"Add Work"}}
                />
            <div
              onSubmit={handleSubmit(onSubmit)}
              className=" grid grid-cols-2 gap-x-3 py-2"
            >
              <div className="flex flex-col items-baseline  st px-5 py-4 rounded-md h- bg-white border border-gray-300">
                <h1 className="font-bold text-base px-3">Reporting to</h1>
                <div className="grid w-full items-start grid-cols-2 gap-y-2 mt-4 ">
                  <div className="flex px-3 group flex-col space-y-2">
                    <label className="label-text">
                      Reporting Manager <span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("employeeId", { required: true })}
                      className="input-box h-10 w-full"
                    />
                    {errors.employeeId && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.employeeId?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col space-y-2">
                    <label className="label-text">
                      HR Manager<span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("firstName", { required: true })}
                      className="input-box h-10 w-full"
                    />
                    {errors.firstName && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.firstName?.message}
                      </span>
                    )}
                  </div>
{/* 
                  <div className="flex px-3 group flex-col space-y-2">
                    <label className="label-text">surname</label>
                    <input
                      {...register("surname")}
                      autoComplete="off"
                      type="text"
                      className="input-box h-10 w-full"
                    />
                    {errors.surname && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.surname?.message}
                      </span>
                    )}
                  </div>

                  <div className="flex px-3 group flex-col space-y-2">
                    <label className="label-text">Date of birth</label>
                    <input
                      {...register("dateOBbirth", { required: true })}
                      autoComplete="off"
                      type="date"
                      className="input-box h-10 w-full"
                    />
                    {errors.dateOfBirth && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.dateOBbirth?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col space-y-2">
                    <label
                      onClick={() => setPopupOpen(true)}
                      className="label-text"
                    >
                      Gender
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
                          className="input-box h-10 w-full"
                        />
                      )}
                    />
                    {errors.gender && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.gender?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col space-y-2">
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
                          className="input-box h-10 w-full"
                        />
                      )}
                    />
                    {errors.nationality && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.nationality?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col space-y-2">
                    <label className="label-text">Country</label>
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
                          className="input-box h-10 w-full"
                        />
                      )}
                    />
                    {errors.country && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.country?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col space-y-2">
                    <label className="label-text">City</label>
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
                          className="input-box h-10 w-full"
                        />
                      )}
                    />
                    {errors.city && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.city?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col space-y-2">
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
                          className="input-box h-10 w-full"
                        />
                      )}
                    />
                    {errors.bloodGroup && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.bloodGroup?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col space-y-2">
                    <label className="label-text">
                      National Insurance Number
                    </label>
                    <input
                      {...register("nationalInsurance", { required: true })}
                      autoComplete="off"
                      type="text"
                      className="input-box h-10 w-full"
                    />
                    {errors.nationalInsurance && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.nationalInsurance?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col space-y-2">
                    <label className="label-text">Home Address</label>
                    <textarea
                      {...register("homeAddress", { required: true })}
                      autoComplete="off"
                      type="text"
                      className="input-box h-28 w-full"
                    />

                    {errors.homeAddress && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.homeAddress?.message}
                      </span>
                    )}
                  </div>

                  <div className="flex px-3 group flex-col space-y-2">
                    <label className="label-text">Communication Address</label>
                    <textarea
                      {...register("communicationAddress", { required: true })}
                      autoComplete="off"
                      type="text"
                      className="input-box h-28 w-full"
                    />
                    {errors.communicationAddress && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.communicationAddress?.message}
                      </span>
                    )}
                  </div> */}
                </div>
              </div>
              <div className="flex flex-col  px-5 py-4 rounded-md bg-white border border-[#EBEBF0]">
                <h1 className="font-bold text-base px-3">EEO Details</h1>

                <div
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid w-full grid-cols-2 gap-x-2 mt-4 "
                >
                  <div className="flex px-3 group flex-col py-2">
                    <label className="label-text  flex items-center gap-1"> Ethnicity

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
                  <div className="flex px-3 group flex-col py-2">
                    <label className="label-text  flex items-center gap-1">EEO Job Category

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
                  <div className="flex px-3 group flex-col py-2">
                    <label className="label-text flex items-center gap-1">
                    Probation Period(In Days)
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
                  <div className="flex px-3 group flex-col py-2">
                    <label className="label-text flex items-center gap-1">
                    Notice Period(In Days)
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

                  

                  {/* <div className="flex px-3 group flex-col py-2">
                    <label className="label-text">Notice Period (In Days)</label>
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
                  </div> */}
                  {/* <div className="flex px-3 group flex-col py-2">
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
                  </div> */}
                  {/* <div className="flex px-3 group flex-col py-2">
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
                  </div> */}
                  {/* <div className="flex px-3 group flex-col py-2">
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
                  </div> */}
                  {/* <div className="flex px-3 group flex-col py-2">
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
                  </div> */}
                  {/* <div className="flex px-3 group flex-col py-2">
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
                  </div> */}
                  {/* <div className="flex px-3 group flex-col py-2">
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
                  </div> */}
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};
