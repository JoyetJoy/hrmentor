import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { ChevronRight, Plus } from "lucide-react";
import { customSelectStyles } from "@/utils/customStyles";
import MenuHeader from "@/components/common/MenuHeader";
import { EmployeeSchema } from "@/schema/dashboard/employee/form/employee.schema";
import { yupResolver } from "@hookform/resolvers/yup";

export default function CreateEmployee() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(EmployeeSchema),
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-1 flex flex-row items-center justify-between">
          <h1 className="text-lg font-bold">Add New Employees</h1>
          <button
            type="submit"
            className="btn flex h-10 min-h-10 min-w-24 items-center bg-[#030E5C] text-sm font-medium text-white transition-all duration-500 hover:bg-[#030E5C]/70"
          >
            <div className="w-3.5">
              <img
                src={"/assets/icons/employees/save.svg"}
                alt="save icon"
                className="w-full object-contain"
              />
            </div>
            Save
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-3 py-2">
          <div className="flex flex-col rounded-md border border-gray-300 bg-white px-5 py-4">
            <h1 className="px-3 text-[1.1rem] font-bold">Basic Details</h1>
            <div className="mt-4 grid w-full grid-cols-2">
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="required label-text">Employee ID</label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="Enter the Employee id"
                  {...register("employeeId", { required: true })}
                  className="input-box"
                />
                {errors.employeeId && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.employeeId?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="required label-text">First Name</label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="Enter First Name"
                  {...register("firstName", { required: true })}
                  className="input-box"
                />
                {errors.firstName && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.firstName?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Surname</label>
                <input
                  {...register("surname")}
                  autoComplete="off"
                  placeholder="Enter Surname"
                  type="text"
                  className="input-box"
                />
                {errors.surname && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.surname?.message}
                  </span>
                )}
              </div>

              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="required label-text">Date of birth</label>
                <input
                  {...register("dateOBbirth", { required: true })}
                  autoComplete="off"
                  type="date"
                  className="input-box"
                />
                {errors.dateOfBirth && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.dateOBbirth?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="required label-text">Gender</label>
                <Controller
                  name="gender"
                  className=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Enter Gender"
                      className="input-box"
                    />
                  )}
                />
                {errors.gender && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.gender?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Nationality</label>
                <Controller
                  name="nationality"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Select Nationality"
                      className="input-box"
                    />
                  )}
                />
                {errors.nationality && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.nationality?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Country</label>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Select Country"
                      className="input-box"
                    />
                  )}
                />
                {errors.country && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.country?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="required label-text">City</label>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Select City"
                      className="input-box"
                    />
                  )}
                />
                {errors.city && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.city?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Blood Group</label>
                <Controller
                  name="bloodGroup"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Select Blood Group"
                      className="input-box"
                    />
                  )}
                />
                {errors.bloodGroup && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.bloodGroup?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">National Insurance Number</label>
                <input
                  {...register("nationalInsurance", { required: true })}
                  autoComplete="off"
                  type="text"
                  placeholder="Enter National Insurance Number"
                  className="input-box"
                />
                {errors.nationalInsurance && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.nationalInsurance?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Home Address</label>
                <input
                  autoComplete="off"
                  type="text"
                  {...register("homeAddress", { required: true })}
                  className="input-box min-h-28"
                />
                {errors.homeAddress && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.homeAddress?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text flex flex-row items-center justify-between">
                  <p className="required">Communication Address</p>
                  <div className="flex gap-1.5">
                    <input type="checkbox" />
                    <p className="whitespace-nowrap text-[0.5rem] font-medium text-[#696969] md:text-xs">
                      Same as home
                    </p>
                  </div>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  {...register("communicationAddress", { required: true })}
                  className="input-box min-h-28"
                />
                {errors.firstName && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.firstName?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-md border border-gray-300 bg-white px-5 py-4">
            <h1 className="px-3 text-base font-bold">Work Details</h1>
            <div className="mt-4 grid w-full grid-cols-2">
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text flex flex-row items-center gap-1">
                  Department
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <Plus className="h-3" />
                  </div>
                </label>
                <Controller
                  name="department"
                  className=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Select Department"
                      className="input-box"
                    />
                  )}
                />
                {errors.department && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.department?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="required label-text">Role</label>
                <Controller
                  name="role"
                  className=""
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Select Role"
                      className="input-box"
                    />
                  )}
                />
                {errors.role && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.role?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text flex flex-row items-center gap-1">
                  Designation
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <Plus className="h-3" />
                  </div>
                </label>
                <Controller
                  name="designation"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Select Designation"
                      className="input-box"
                    />
                  )}
                />
                {errors.designation && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.designation?.message}
                  </span>
                )}
              </div>

              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Date of Joinging</label>
                <input
                  {...register("dateOfJoinging", { required: true })}
                  autoComplete="off"
                  type="date"
                  className="input-box"
                />
                {errors.dateOfJoinging && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.dateOfJoinging?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text flex flex-row items-center gap-1">
                  Work Location
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                    <Plus className="h-3" />
                  </div>
                </label>
                <Controller
                  name="worklocation"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Select Work location"
                      className="input-box"
                    />
                  )}
                />
                {errors.worklocation && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.worklocation?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Employenment Type</label>
                <Controller
                  name="employementype"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Select Employement Type"
                      className="input-box"
                    />
                  )}
                />
                {errors.employementype && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.employementype?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Mobile Number </label>
                <input
                  {...register("mobileNumber", { required: true })}
                  autoComplete="off"
                  type="text"
                  placeholder="Enter Moblie Number"
                  className="input-box"
                />
                {errors.mobileNumber && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.mobileNumber?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Marital status</label>
                <Controller
                  name="maritalstatus"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Select Marital status"
                      className="input-box"
                    />
                  )}
                />
                {errors.maritalstatus && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.maritalstatus?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Personal Email Address </label>
                <input
                  {...register("personalEmailAddress", { required: true })}
                  autoComplete="off"
                  type="text"
                  placeholder="Enter Personal Email Address  "
                  className="input-box"
                />
                {errors.personalEmailAddress && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.personalEmailAddress?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5 px-3 py-2">
                <label className="label-text">Work Email Address</label>
                <input
                  {...register("workEmailAddress", { required: true })}
                  autoComplete="off"
                  type="text"
                  placeholder="Enter Work Email Address"
                  className="input-box"
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
      </form>
    </div>
  );
}
