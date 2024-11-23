import MenuHeaderEmployeeAccess from "@/components/employee_access/MenuHeader";
import ProfileSidebar from "@/components/sidebars/employee_access/profile_management/ProfileSideBar";
import { customSelectStyles } from "@/utils/customStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronRight } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

export default function WorkInformation() {
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
    <div className="flex flex-col">
      <MenuHeaderEmployeeAccess
        pathlink={""}
        currentpage={"Work Information"}
        subMenu={"ProfileManagement"}
        icon={<ChevronRight className="size-3" />}
      />
      <div className="flex gap-x-3">
        <ProfileSidebar />

        <form className="w-full">
          <div className="my-1 flex w-full flex-row items-center justify-between">
            <h1 className="text-lg font-bold">Work Information</h1>
          </div>
          <div className="grid grid-cols-2 gap-x-3 pt-2">
            <div className="flex h-screen flex-col items-baseline rounded-md border border-gray-300 bg-white px-3 py-4">
              <h1 className="flex w-full flex-row items-center justify-between px-3 text-lg font-bold text-textcolor-darkCharcoal">
                Reporting to
              </h1>

              <div className="mt-4 grid w-full grid-cols-2 items-start gap-y-2">
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Reporting Manager</label>
                  <Controller
                    name="reporting_manager_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        placeholder="Select reporting manager"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.reporting_manager_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.reporting_manager_id?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Hr Manager</label>
                  <Controller
                    name="hiring_manager_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        placeholder="Select hiring manager"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.hiring_manager_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.hiring_manager_id?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-md border border-gray-soft bg-white px-5 py-4">
              <h1 className="#2C2C2C px-3 text-lg font-bold">EEO Details</h1>
              <div className="mt-4 grid w-full grid-cols-2 gap-x-2">
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Age</label>
                  <input
                    autoComplete="off"
                    type="number"
                    placeholder="Enter Probation Period"
                    {...register("age", { required: true })}
                    onKeyPress={(event) => {
                      if (
                        !/^[0-9]$/.test(event.key) ||
                        event.target.value.length >= 3
                      ) {
                        event.preventDefault();
                      }
                    }}
                    className="input-box placeholder:text-[0.8rem]"
                  />
                  {errors.age && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.age?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">EEO Job Category</label>
                  <Controller
                    name="eeo_job_category_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        placeholder="Select EEO Job Category"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.eeo_job_category_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.eeo_job_category_id?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Ethinicity</label>
                  <Controller
                    name="ethinicity_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        placeholder="Select ethinicity"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.ethinicity_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.ethinicity_id?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Notice Period(in Days)</label>
                  <input
                    autoComplete="off"
                    type="text"
                    {...register("pregnancy", { required: true })}
                    className="input-box placeholder:text-[0.8rem]"
                  />
                  {errors.pregnancy && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.pregnancy?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">
                    Probation Period(in Days)
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    {...register("pregnancy", { required: true })}
                    className="input-box placeholder:text-[0.8rem]"
                  />
                  {errors.pregnancy && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.pregnancy?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Pregnancy & maternity</label>
                  <input
                    autoComplete="off"
                    type="text"
                    {...register("pregnancy", { required: true })}
                    className="input-box placeholder:text-[0.8rem]"
                  />
                  {errors.pregnancy && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.pregnancy?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Gender</label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        placeholder="Select a gender"
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
                  <label className="label-text">
                    Physical / Mental disability{" "}
                  </label>
                  <Controller
                    name="physical"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        placeholder="Yes/ No"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.physical && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.physical?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Sexual orientation</label>
                  <input
                    autoComplete="off"
                    type="text"
                    {...register("sexualorientation", { required: true })}
                    className="input-box placeholder:text-[0.8rem]"
                  />
                  {errors.sexualorientation && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.sexualorientation?.message}
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
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        placeholder="Select a status"
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
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
