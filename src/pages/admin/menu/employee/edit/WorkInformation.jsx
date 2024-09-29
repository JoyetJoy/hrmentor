import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import MenuHeader from "@/components/common/MenuHeader";

export const WorkInformation = () => {
  const [loader, setLoader] = useState(false);
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
    <div className="flex flex-col">
      <MenuHeader
        menu={"Menu"}
        subMenu={"Employee"}
        currentpath={"Employee Detail"}
        icon={<ChevronRight className="size-3" />}
        activeMenu={"Employee"}
      />
      <div className="flex gap-x-3">
        <EmployeesSidebar />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="my-1 flex w-full flex-row items-center justify-between">
            <h1 className="text-lg font-bold">Work Information</h1>
            <button
              type="submit"
              className="btn flex h-10 min-h-10 min-w-24 items-center bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-[#030E5C]/70"
            >
              {loader ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  Saving
                </div>
              ) : (
                <span>Update</span>
              )}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-3 pt-2">
            <div className="h- flex h-screen flex-col items-baseline rounded-md border border-gray-300 bg-white px-3 py-4">
              <h1 className="flex w-full flex-row items-center justify-between px-3 text-lg font-bold text-[#2C2C2C]">
                Reporting to
                <div className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    // onChange={handleAdressCheckbox}
                    name=""
                    id=""
                    className="size-4 text-[#848484]"
                  />
                  <p className="whitespace-nowrap text-[13px] font-normal text-[#848484]">
                    Doesn't report to anyone
                  </p>
                </div>
              </h1>
              <div className="mt-4 grid w-full grid-cols-2 items-start gap-y-2">
                <div className="group flex flex-col gap-1 px-2 py-2">
                  <label
                    onClick={() => setPopupOpen(true)}
                    className="required label-text"
                  >
                    Reporting Manager{" "}
                  </label>
                  <Controller
                    name="reportingManager"
                    className=""
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
                        placeholder="Select Reporting Manger"
                        className="input-box h-10 w-full rounded-md border-[#A7A7A7] placeholder:text-sm placeholder:text-[#7F7F7F] focus:border-[#A7A7A7]"
                      />
                    )}
                  />
                  {errors.reportingManager && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.reportingManager?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1 px-2 py-2">
                  <label
                    onClick={() => setPopupOpen(true)}
                    className="required label-text"
                  >
                    HR Manager
                  </label>
                  <Controller
                    name="hrManager"
                    className=""
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
                        placeholder="Select HR Manager"
                        className="input-box h-10 w-full rounded-md border-[#A7A7A7] placeholder:text-sm placeholder:text-[#7F7F7F] focus:border-[#A7A7A7]"
                      />
                    )}
                  />
                  {errors.hrManager && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.hrManager?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-md border border-[#EBEBF0] bg-white px-5 py-4">
              <h1 className="#2C2C2C px-3 text-lg font-bold">EEO Details</h1>

              <div
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4 grid w-full grid-cols-2 gap-x-2"
              >
                <div className="group flex flex-col gap-1 px-2 py-2">
                  <label
                    onClick={() => setPopupOpen(true)}
                    className="label-text"
                  >
                    Ethnicity{" "}
                  </label>
                  <Controller
                    name="ethnicity"
                    className=""
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
                        placeholder="Select Name"
                        className="input-box h-10 w-full rounded-md border-[#A7A7A7] placeholder:text-sm placeholder:text-[#7F7F7F] focus:border-[#A7A7A7]"
                      />
                    )}
                  />
                  {errors.ethnicity && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.ethnicity?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1 px-2 py-2">
                  <label
                    onClick={() => setPopupOpen(true)}
                    className="required label-text"
                  >
                    EEO Job Category
                  </label>
                  <Controller
                    name="jobCategory"
                    className=""
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
                        placeholder="Select Job Catrgory"
                        className="input-box h-10 w-full rounded-md border-[#A7A7A7] placeholder:text-sm placeholder:text-[#7F7F7F] focus:border-[#A7A7A7]"
                      />
                    )}
                  />
                  {errors.jobCategory && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.jobCategory?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1 px-2 py-2">
                  <label className="label-text">
                    {" "}
                    Probation Period (In Days)
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="Enter details"
                    {...register("firstName", { required: true })}
                    className="input-box h-10 w-full rounded-md border-[#A7A7A7] placeholder:text-sm placeholder:text-[#7F7F7F] focus:border-[#A7A7A7]"
                  />
                  {errors.firstName && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.firstName?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1 px-2 py-2">
                  <label className="label-text"> Notice Period(In Days)</label>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="Enter details"
                    {...register("firstName", { required: true })}
                    className="input-box h-10 w-full rounded-md border-[#A7A7A7] placeholder:text-sm placeholder:text-[#7F7F7F] focus:border-[#A7A7A7]"
                  />
                  {errors.firstName && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.firstName?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
