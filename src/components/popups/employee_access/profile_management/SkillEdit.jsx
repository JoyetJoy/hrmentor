import useImageUpload from "@/hooks/useImageUpload";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadCloud, X } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

function SkillEdit({ popupOpen, setPopupOpen, selectedField }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(),
  });

  function close() {
    setPopupOpen(false);
  }
  const { image, clearImage } =
    useImageUpload();
  const [loader, setLoader] = useState();
  return (
    <Dialog
      open={popupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-sm rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                {selectedField ? "Update" : "Add"} Skills/Qualifications
              </h1>
              <button
                type="button"
                onClick={close}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>

            <form
              className="grid grid-cols-1 gap-3"
              //   onSubmit={handleSubmit(onSubmit)}
            >
              <div className="group flex w-full flex-col gap-1">
                <label className=" label-text">Type</label>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Select Type"
                      className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                    />
                  )}
                />
                {errors.type && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.type?.message}
                  </span>
                )}
              </div>

              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Field of study
                </label>
                <input
                  {...register("field_of_study", { required: true })}
                  type="text"
                  className="input-box h-10 w-full"
                />
                {errors.field_of_study && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.field_of_study?.message}
                  </span>
                )}
              </div>

              <div className="group flex flex-col space-y-1">
                <label className=" text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Name of the institution
                </label>
                <input
                  {...register("institution", { required: true })}
                  type="text"
                  placeholder="Enter name of the institution"
                  className="input-box h-10 w-full placeholder:text-[0.8rem]"
                />
                {errors.institution && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.institution?.message}
                  </span>
                )}
              </div>

              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  CGPA/Percentage
                </label>
                <input
                  {...register("cgpa_percentage")}
                  type="text"
                  placeholder="Enter CGPA/Percentage"
                  className="input-box h-10 w-full placeholder:text-[0.8rem]"
                />
                {errors.cgpa_percentage && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.cgpa_percentage?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col space-y-1">
                <label className=" text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Start Date
                </label>
                <input
                  {...register("start_date", { required: true })}
                  type="date"
                  className="input-box h-10 w-full"
                />
                {errors.start_date && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.start_date?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col space-y-1">
                <label className=" text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  End Date
                </label>
                <input
                  {...register("end_date", { required: true })}
                  type="date"
                  className="input-box h-10 w-full"
                />
                {errors.end_date && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.end_date?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col space-y-1">
                <label className=" text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Status
                </label>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={false}
                      styles={customSelectStyles}
                      placeholder="Select Status"
                      className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                    />
                  )}
                />
                {errors.status && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.status?.message}
                  </span>
                )}
              </div>

              <div className="group flex flex-col gap-1.5">
                {image ? (
                  <div className="relative">
                    <img
                      src={image}
                      alt="Uploaded"
                      className="max-h-24 w-full rounded-md border border-black/20 object-contain"
                    />
                    <X
                      onClick={clearImage}
                      className="absolute -right-2 -top-2 h-5 w-5 cursor-pointer rounded-full bg-hrmdarkblue p-1 text-white"
                    />
                  </div>
                ) : (
                  <label
                    htmlFor="employee-profile-pic"
                    className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed"
                  >
                    <div className="flex items-center gap-2">
                      <UploadCloud />
                      <span className="font-semibold text-[#2C2C2C]">
                        Upload Certificate
                      </span>
                    </div>
                    <input
                      id="employee-profile-pic"
                      //   onChange={handleImageChange}
                      type="file"
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="mt-2 flex flex-row items-center justify-center gap-3">
                <button
                  type="submit"
                  className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                  disabled={loader}
                >
                  {/* {loader ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                      {selectedField ? "Updating" : "Saving"}
                    </div>
                  ) : (
                    <span>{selectedField ? "Update" : "Save"}</span>
                  )} */}
                  Save
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default SkillEdit;
