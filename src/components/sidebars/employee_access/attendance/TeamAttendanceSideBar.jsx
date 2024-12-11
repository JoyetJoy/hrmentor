import { customSelectStyles } from "@/utils/customStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Search } from "lucide-react";

export default function TeamAttendanceSideBar() {
  const {
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
    <div className="min-h-full min-w-64 rounded-md bg-white">
      <div className="w-full rounded-md bg-white px-5 py-7">
        <h1 className="text-base font-semibold text-textcolor-darkCharcoal">
          Filter
        </h1>
        <div>
          <div className="group flex flex-col gap-1.5  py-2">
            <label className="label-text">Shift</label>
            <Controller
              name="shift"
              className=""
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isSearchable={true}
                  styles={customSelectStyles}
                  placeholder="Select"
                  className="input-box"
                />
              )}
            />
            {errors.designation && (
              <span className="text-xs font-medium text-red-500">
                {errors.designation.message}
              </span>
            )}
          </div>
          <div className="group flex flex-col gap-1.5 py-2">
            <label className="label-text">Search employee</label>
            <label className="flex h-10 min-h-10 items-center gap-2 rounded-md border border-[#A7A7A7] pr-28 outline-none">
              <Search className="size-4 object-contain text-[#A7A7A7]" />
              <input
                type="text"
                className="grow placeholder:text-sm placeholder:text-gray-dark focus:outline-none"
                placeholder="Search"
              />
            </label>
          </div>
          <div className="overflow-y-min flex flex-col gap-3 mt-5">
            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-md">
              <div className="rounded-full bg-gray-dark p-4"></div>
              <div>
                <p className="text-sm font-medium">kp</p>
                <p className="text-xs font-medium text-darkblack">
                  UI/UX Design Intern
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-100 rounded-md p-3">
              <div className="rounded-full bg-gray-dark p-4"></div>
              <div>
                <p className="text-sm font-medium">kp</p>
                <p className="text-xs font-medium text-darkblack">
                  UI/UX Design Intern
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
