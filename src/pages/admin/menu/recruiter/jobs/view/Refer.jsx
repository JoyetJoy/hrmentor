import MenuHeader from "@/components/common/MenuHeader";
import RecruiterSideBar from "@/components/sidebars/recruiter/RecruiterSideBar";
import { customSelectStyles } from "@/utils/customStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft } from "lucide-react";
import React from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function RecViewJobRefer() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(),
  });
  return (
    <>
      <MenuHeader
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className="my-4 flex flex-row items-center justify-between">
        <h1 className="flex items-center gap-1 text-base font-bold capitalize text-textcolor-darkCharcoal">
          {/* <ArrowLeft
            onClick={() => {
              history.back();
            }}
            className="size-4 cursor-pointer"
          /> */}
          Project Manager
        </h1>
        <div className="flex items-center gap-7 text-sm">
          <Link
            to="/admin/recruiter/jobs/view"
            className="flex gap-5 text-sm font-medium text-gray-neutral"
          >
            Candidates
          </Link>
          <Link
            to="/admin/recruiter/jobs/promote"
            className="flex gap-5 text-sm font-medium text-gray-neutral"
          >
            Promote
          </Link>
          <Link
            to="/admin/recruiter/jobs/refer"
            className="flex gap-5 text-sm font-semibold text-hrmprimaryorange"
          >
            Refer
          </Link>
        </div>
      </div>
      <div className="my-3 flex flex-row gap-2">
        <RecruiterSideBar />
        <div className="w-full rounded-md bg-white p-7">
          <h1 className="mb-7 text-base font-bold">Refer</h1>
          <div className="flex flex-col">
            <div className="group flex w-3/4 flex-col gap-1.5 px-3 py-2">
              <label className="label-text">Subject</label>
              <input
                autoComplete="off"
                type="text"
                {...register("subject", { required: true })}
                className="input-box placeholder:text-[0.8rem]"
              />
              {errors.subject && (
                <span className="text-xs font-medium text-red-500">
                  {errors.subject?.message}
                </span>
              )}
            </div>
            <div className="group flex w-1/3 flex-col gap-1.5 px-3 py-2">
              <label className="label-text">Choose Template</label>
              <Controller
                name="template"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    styles={customSelectStyles}
                    placeholder="Select  Template"
                    className="input-box"
                  />
                )}
              />
              {errors.template && (
                <span className="text-xs font-medium text-red-500">
                  {errors.template?.message}
                </span>
              )}
            </div>
            <div className="group flex w-3/4 flex-col gap-1.5 px-3 py-2">
              <label className="label-text">Recipient</label>
              <input
                autoComplete="off"
                type="text"
                placeholder="example@gamil.com"
                {...register("recipient", { required: true })}
                className="input-box placeholder:text-[0.8rem]"
              />
              {errors.recipient && (
                <span className="text-xs font-medium text-red-500">
                  {errors.recipient?.message}
                </span>
              )}
            </div>
            <div className="group flex w-3/4 flex-col gap-1.5 px-3 py-2">
              <label className="label-text">Message</label>
              <input
                autoComplete="off"
                type="text"
                {...register("message", { required: true })}
                className="input-box h-48 placeholder:text-[0.8rem]"
              />
              {errors.message && (
                <span className="text-xs font-medium text-red-500">
                  {errors.message?.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
