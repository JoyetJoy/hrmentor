import CompanyMenuHeader from "@/components/company/MenuHeader";
import CompanyCreateSideBar from "@/components/sidebars/company/CompanyCreateSideBar";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ChevronRight, Upload } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function CompanySignatory() {
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
            <Link
            to="/admin/company/calender"
              
              className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmblue/70"
            >
             Next
            </Link>
          </div>
          <div className="h-screen w-full rounded-md bg-white px-5 py-7">
            <div className="group flex w-full items-center gap-x-2">
              <div className="flex size-5 min-w-5 items-center justify-center rounded-full bg-gray-darklight">
                <ChevronRight className="size-4 group-data-[open]:rotate-90" />
              </div>
              <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                Company Signatory
              </p>
              <div className="h-px w-full bg-gray-light"></div>
            </div>
            <div className="grid grid-cols-1 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
              <div className="group flex flex-col w-1/3 space-y-1 px-3 py-1">
                <label className="label-text">Authorised Person Name</label>
                <input
                  autoComplete="off"
                  type="text"
                  {...register("authorised_name", { required: true })}
                  className="input-box"
                />
                {errors.authorised_name && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.authorised_name?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col w-1/3 space-y-1 px-3 py-1">
                <label className="label-text">
                  Authorised Person Signature(90px*150px)
                </label>
                <label
                  htmlFor=""
                  className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed bg-gray-darklight"
                >
                  <div className="flex items-center gap-2">
                    <Upload className="size-5 text-black" />
                    <span className="font-semibold text-black">
                      Upload Signature
                    </span>
                  </div>
                  <input type="file" className="hidden" />
                </label>
                {errors.upload_signature && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.upload_signature?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col w-1/3 space-y-1 px-3 py-1">
                <label className="label-text">
                  Authorised Person Signature
                </label>

                <input
                  type="text"
                  className="h-28 rounded-md bg-gray-darklight"
                />

                {errors.upload_signature && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.upload_signature?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
        <CompanyCreateSideBar stepCounter={3} />
      </div>
    </>
  );
}
