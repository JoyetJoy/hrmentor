import CompanyMenuHeader from "@/components/company/MenuHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ChevronRight, Plus, Upload } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";
import CompanyWeekendCalendar from "./WeedendCalender";
import CompanyCreateSideBar from "@/components/sidebars/company/CompanyCreateSideBar";

export default function CompanyCalender() {
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
            <button
              type="submit"
              className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
            >
              {loader ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  Saving
                </div>
              ) : (
                "Next"
              )}
            </button>
          </div>
          <div className="w-full rounded-md bg-white px-5 py-7">
            <div className="group flex w-full items-center gap-x-2">
              <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
                <ChevronRight className="size-4 group-data-[open]:rotate-90" />
              </div>
              <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                Calender Settings
              </p>
              <div className="h-px w-full bg-gray-light"></div>
            </div>
            <div className="grid w-1/2 grid-cols-1 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
              <div className="group col-span-2 flex flex-col space-y-1 px-3 py-1">
                <label className="label-text">Location</label>
                <div className="flex items-center gap-2">
                  <input
                    autoComplete="off"
                    type="text"
                    {...register("location", { required: true })}
                    className="input-box"
                  />
                  <div className="rounded-full bg-hrmprimaryorange">
                    <Plus className="size-6 text-white" />
                  </div>
                </div>
                {errors.location && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.location?.message}
                  </span>
                )}
              </div>
              <div className="group col-span-2 flex items-center gap-4 space-y-1 px-3 py-1">
                <h1 className="text-sm">Fiscal calender</h1>
                <input
                  type="checkbox"
                  className="border-coollightgreen bg-coolgreen hover:bg-coolgreen toggle [--tglbg:theme(colors.coollightgreen)]"
                  defaultChecked
                />
                <p className="text-xs text-gray-dark">
                  Same as the calendar year
                </p>
              </div>
              <div className="grid grid-cols-2">
                <div className="group flex flex-col space-y-1 px-3 py-1">
                  <label className="label-text">From</label>
                  <Controller
                    name="from"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select salary type"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.from && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.from?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-1">
                  <label className="label-text">To</label>
                  <Controller
                    name="to"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select salary type"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.to && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.to?.message}
                    </span>
                  )}
                </div>
              </div>
              <p className="border-orange bg-coolorange col-span-2 mt-3 border-l-4 py-3 pl-3 text-xs font-normal text-gray-darkpale">
                The financial-based calculation will consider the selected
                period as one year
              </p>
              <div className="group col-span-2 flex items-center gap-4 space-y-1 px-3 py-1">
                <h1 className="text-sm">Leave year</h1>
                <input
                  type="checkbox"
                  className="border-coollightgreen bg-coolgreen hover:bg-coolgreen toggle [--tglbg:theme(colors.coollightgreen)]"
                  defaultChecked
                />
                <p className="text-xs text-gray-dark">
                  Same as the calendar year
                </p>
              </div>
              <div className="grid grid-cols-2">
                <div className="group flex flex-col space-y-1 px-3 py-1">
                  <label className="label-text">From</label>
                  <Controller
                    name="from"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select salary type"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.from && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.from?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-1">
                  <label className="label-text">To</label>
                  <Controller
                    name="to"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select salary type"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.to && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.to?.message}
                    </span>
                  )}
                </div>
              </div>
              <p className="border-orange bg-coolorange col-span-2 mt-3 border-l-4 py-3 pl-3 text-xs font-normal text-gray-darkpale">
                The leave based calculation will consider the selected period as
                one year
              </p>
              <div className="grid grid-cols-2">
                <div className="group flex flex-col space-y-1 px-3 py-1">
                  <label className="label-text">
                    Maximun working hours per day
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    {...register("location", { required: true })}
                    className="input-box"
                  />
                  {errors.max_hr && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.max_hr?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-1">
                  <label className="label-text">Week start on</label>
                  <input
                    autoComplete="off"
                    type="text"
                    {...register("location", { required: true })}
                    className="input-box"
                  />
                  {errors.to && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.to?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-1">
                  <label className="label-text">Shift Start time</label>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="HH:MM"
                    {...register("shift_start_time", { required: true })}
                    className="input-box"
                  />
                  {errors.shift_start_time && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.shift_start_time?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-1">
                  <label className="label-text">Shift end time</label>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="HH:MM"
                    {...register("shift_end_time", { required: true })}
                    className="input-box"
                  />
                  {errors.shift_end_time && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.shift_end_time?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-1">
                  <label className="label-text">Shift duration</label>
                  <input
                    autoComplete="off"
                    type="text"
                    {...register("shift_duration", { required: true })}
                    className="input-box"
                  />
                  {errors.shift_duration && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.shift_duration?.message}
                    </span>
                  )}
                </div>
              </div>
              <h1 className="col-span-2 my-3 text-base font-semibold text-black">
                Minimum hours required for
              </h1>
              <div className="grid grid-cols-2">
                <div className="group flex flex-col space-y-1 px-3 py-1">
                  <label className="label-text">Full day</label>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="HH:MM"
                    {...register("full_day", { required: true })}
                    className="input-box"
                  />

                  {errors.full_day && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.full_day?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-1">
                  <label className="label-text">Full day tolarance</label>
                  <input
                    autoComplete="off"
                    placeholder="HH:MM"
                    type="text"
                    {...register("full_day_tolarance", { required: true })}
                    className="input-box"
                  />
                  {errors.full_day_tolarance && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.full_day_tolarance?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-1">
                  <label className="label-text">Half day </label>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="HH:MM"
                    {...register("half_day", { required: true })}
                    className="input-box"
                  />
                  {errors.half_day && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.half_day?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-1">
                  <label className="label-text">Half day tolarance</label>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="HH:MM"
                    {...register("half_day_tolarance", { required: true })}
                    className="input-box"
                  />
                  {errors.half_day_tolarance && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.half_day_tolarance?.message}
                    </span>
                  )}
                </div>
              </div>
              <p className="border-orange bg-coolorange col-span-2 mt-3 border-l-4 py-3 pl-3 text-xs font-normal text-gray-darkpale">
                Employee must reach the minimum hours required to qualify
                themselves as full day or half day present
              </p>
              <div>
                <h1 className="col-span-2 my-6 text-base font-semibold text-black">
                  Weekend definition
                </h1>
                <p className="border-orange bg-coolorange col-span-2 mb-7 mt-3 border-l-4 py-3 pl-3 text-xs font-normal text-gray-darkpale">
                  The selected day(s) will be considered as weekend{" "}
                </p>
                <CompanyWeekendCalendar />
              </div>
            </div>
          </div>
        </form>
        <CompanyCreateSideBar stepCounter={4} />
      </div>
    </>
  );
}
