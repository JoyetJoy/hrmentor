import React from "react";
import { Controller, useForm } from "react-hook-form";
import { customSelectStyles } from "../../../../../utils/customStyles";
import { Select } from "@headlessui/react";
import { Plus } from "lucide-react";

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
    <div
      onSubmit={handleSubmit(onSubmit)}
      className=" grid grid-cols-2 gap-x-3 py-2"
    >
      <div className="flex flex-col gap-3 px-5 py-4 rounded-md bg-white border border-[#EBEBF0]">
        <div className="grid w-full grid-cols-2 gap-y-2 mt-4 ">
          <div className="flex px-3 group flex-col space-y-2">
            <label className="label-text">
              Employee ID <span className="text-red-500">*</span>
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
              First Name <span className="text-red-500">*</span>
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
            <label onClick={() => setPopupOpen(true)} className="label-text">
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
            <label className="label-text">National Insurance Number</label>
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
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-5 py-4 rounded-md bg-white border border-[#EBEBF0]">
        <div
          onSubmit={handleSubmit(onSubmit)}
          className="grid w-full grid-cols-2 gap-y-2 mt-7 "
        >
          <div className="flex px-3 group flex-col space-y-2">
            <label className="label-text">
              Employee ID{" "}
              <Plus className="inline-block cursor-pointer text-white bg-[#2C2C2C]  rounded-full w-5 h-5 p-[0.2rem]" />
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
              First Name <span className="text-red-500">*</span>
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
            <label onClick={() => setPopupOpen(true)} className="label-text">
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
            <label className="label-text">National Insurance Number</label>
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
        </div>
      </div>
    </div>
  );
}
