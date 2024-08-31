import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Plus } from "lucide-react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { customSelectStyles } from "@/utils/customStyles";
import MenuSubHeader from "@/components/common/MenuSubHeader";
import MenuHeader from "@/components/common/MenuHeader";

export default function CreateEmployee() {
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
    <div>
      <MenuHeader
        menu={"Menu"}
        subMenu={"Employee"}
        currentpath={"Add Employee"}
        icon={<ChevronRight className="size-3" />}
        activeMenu={"Employees"}
      />
      <div className="my-2 flex flex-row items-center justify-between">
        <h1 className="text-lg font-bold">Add New Employees</h1>
        <Link
          to={"/admin/employees/list"}
          className="btn flex h-10 min-h-10 min-w-24 items-center bg-[#030E5C] text-sm font-normal text-white hover:bg-[#030E5C]"
        >
          <div className="w-3">
            <img
              src={"/assets/icons/employees/save.svg"}
              alt="save icon"
              className="w-full object-contain"
            />
          </div>
          Save
        </Link>
      </div>
      <div
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-3 py-2"
      >
        <div className="st flex flex-col items-baseline justify-center rounded-md border border-gray-300 bg-white px-5 py-4">
          <h1 className="text-smpx-3 font-bold">Basic Details</h1>
          <div className="mt-4 grid w-full grid-cols-2">
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">
                Employee ID <span className="text-red-500">*</span>
              </label>
              <input
                autoComplete="off"
                type="text"
                placeholder="Enter the Employee id"
                {...register("employeeId", { required: true })}
                className="input-box h-10 w-full placeholder:text-xs placeholder:text-[#7F7F7F] focus:border-gray-300"
              />
              {errors.employeeId && (
                <span className="text-xs font-medium text-red-500">
                  {errors.employeeId?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                autoComplete="off"
                type="text"
                placeholder="Enter First Name"
                {...register("firstName", { required: true })}
                className="input-box h-10 w-full placeholder:text-xs placeholder:text-[#7F7F7F] focus:border-gray-300"
              />
              {errors.firstName && (
                <span className="text-xs font-medium text-red-500">
                  {errors.firstName?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">Surname</label>
              <input
                {...register("surname")}
                autoComplete="off"
                placeholder="Enter Surname"
                type="text"
                className="input-box h-10 w-full placeholder:text-xs placeholder:text-[#7F7F7F] focus:border-gray-300"
              />
              {errors.surname && (
                <span className="text-xs font-medium text-red-500">
                  {errors.surname?.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">
                Date of birth
                <span className="text-red-500">*</span>
              </label>
              <input
                {...register("dateOBbirth", { required: true })}
                autoComplete="off"
                type="date"
                className="input-box h-10 w-full placeholder:text-xs placeholder:text-[#7F7F7F] focus:border-gray-300"
              />
              {errors.dateOfBirth && (
                <span className="text-xs font-medium text-red-500">
                  {errors.dateOBbirth?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label onClick={() => setPopupOpen(true)} className="label-text">
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
                    // value={''}
                    //   onChange={(selectedOption) => {
                    //     handle(selectedOption);
                    //     field.onChange(selectedOption);
                    //   }}
                    //   options={}
                    isSearchable={false}
                    styles={customSelectStyles}
                    placeholder="Enter Gender"
                    className="input-box h-10 w-full placeholder:text-xs placeholder:text-[#7F7F7F] focus:border-gray-300"
                  />
                )}
              />
              {errors.gender && (
                <span className="text-xs font-medium text-red-500">
                  {errors.gender?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
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
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.nationality && (
                <span className="text-xs font-medium text-red-500">
                  {errors.nationality?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
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
                    className="input-box h-10 w-full placeholder:text-black focus:border-gray-300"
                  />
                )}
              />
              {errors.country && (
                <span className="text-xs font-medium text-red-500">
                  {errors.country?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">
                City
                <span className="text-red-500">*</span>
              </label>
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
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.city && (
                <span className="text-xs font-medium text-red-500">
                  {errors.city?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
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
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.bloodGroup && (
                <span className="text-xs font-medium text-red-500">
                  {errors.bloodGroup?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">National Insurance Number</label>
              <input
                {...register("nationalInsurance", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.nationalInsurance && (
                <span className="text-xs font-medium text-red-500">
                  {errors.nationalInsurance?.message}
                </span>
              )}
            </div>

            {/* <div className="flex px-3 group flex-col py-2 ">
              <label className="label-text">Home Address</label>
              <textarea
                {...register("homeAddress", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box min-h-28 w-full focus:border-gray-300"
              />
              {errors.homeAddress && (
                <span className="text-xs font-medium text-red-500">
                  {errors.homeAddress?.message}
                </span>
              )}
            </div>
            <div className="flex px-3 group flex-col py-2 ">
              <label className="label-text flex flex-row  justify-between items-center whitespace-nowrap">Communication Address
                <span className="text-red-500">*</span>
                <label className="label cursor-pointer flex flex-row gap-1">
                  <input type="checkbox"  className="checkbox  size-3 rounded-sm" />
                  <span className="label-text text-xs text-[#8B8B8B]  ">Same as home address</span>
                </label>
              </label>
              <textarea
                {...register("communicationAddress", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box min-h-28 w-full focus:border-gray-300"
              />
              {errors.communicationAddress && (
                <span className="text-xs font-medium text-red-500">
                  {errors.communicationAddress?.message}
                </span>
              )}
            </div> */}
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">Home Address</label>
              <input
                autoComplete="off"
                type="text"
                {...register("homeAddress", { required: true })}
                className="input-box min-h-28 w-full placeholder:text-xs placeholder:text-[#7F7F7F] focus:border-gray-300"
              />
              {errors.homeAddress && (
                <span className="text-xs font-medium text-red-500">
                  {errors.homeAddress?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className=" label-text flex justify-between items-center whitespace-nowrap text-xs">
               <p className="required">Communication Address</p> 
                <div className="flex gap-1.5">
                  <input
                    type="checkbox"
                    // onChange={handleAdressCheckbox}
                    name=""
                    id=""
                  />
                  <p className="text-[0.5rem] md:text-xs whitespace-pre-wrap font-medium text-[#696969]">
                    Same as home address
                  </p>
                </div>
              </label>
              <input
                autoComplete="off"
                type="text"
                {...register("communicationAddress", { required: true })}
                className="input-box min-h-28 w-full placeholder:text-xs placeholder:text-[#7F7F7F] focus:border-gray-300"
              />
              {errors.firstName && (
                <span className="text-xs font-medium text-red-500">
                  {errors.firstName?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* -------work details--------- */}
        <div className="flex flex-col rounded-md border border-[#EBEBF0] bg-white px-5 py-4">
          <h1 className="px-3 text-base font-bold">Work Details</h1>

          <div
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 grid w-full grid-cols-2"
          >
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text flex items-center gap-1">
                Department{" "}
                <Plus className="inline-block h-4 w-4 cursor-pointer rounded-full bg-[#2C2C2C] p-[0.2rem] text-white" />
              </label>
              <input
                autoComplete="off"
                type="text"
                {...register("department", { required: true })}
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.department && (
                <span className="text-xs font-medium text-red-500">
                  {errors.department?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">
                Role<span className="text-red-500">*</span>
              </label>
              <input
                autoComplete="off"
                type="text"
                {...register("role", { required: true })}
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.role && (
                <span className="text-xs font-medium text-red-500">
                  {errors.role?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text flex items-center gap-1">
                Designation
                <Plus className="inline-block h-4 w-4 cursor-pointer rounded-full bg-[#2C2C2C] p-[0.2rem] text-white" />
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
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.designation && (
                <span className="text-xs font-medium text-red-500">
                  {errors.designation?.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">Date of Joinging</label>
              <input
                {...register("dateOfJoinging", { required: true })}
                autoComplete="off"
                type="date"
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.dateOfJoinging && (
                <span className="text-xs font-medium text-red-500">
                  {errors.dateOfJoinging?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label
                onClick={() => setPopupOpen(true)}
                className="label-text flex items-center gap-1"
              >
                Work Location
                <Plus className="inline-block h-4 w-4 cursor-pointer rounded-full bg-[#2C2C2C] p-[0.2rem] text-white" />
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
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.worklocation && (
                <span className="text-xs font-medium text-red-500">
                  {errors.worklocation?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
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
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.employementype && (
                <span className="text-xs font-medium text-red-500">
                  {errors.employementype?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">Mobile Number </label>
              <input
                {...register("mobileNumber", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.mobileNumber && (
                <span className="text-xs font-medium text-red-500">
                  {errors.mobileNumber?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
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
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.maritalstatus && (
                <span className="text-xs font-medium text-red-500">
                  {errors.maritalstatus?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">Personal Email Address </label>
              <input
                {...register("personalEmailAddress", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.personalEmailAddress && (
                <span className="text-xs font-medium text-red-500">
                  {errors.personalEmailAddress?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col px-3 py-2">
              <label className="label-text">Work Email Address</label>
              <input
                {...register("workEmailAddress", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box h-10 w-full focus:border-gray-300"
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
    </div>
  );
}
