import MenuHeader from "@/components/common/MenuHeader";
import CreateJobSideBar from "@/components/sidebars/recruiter/CreateJobSideBar";
import { customSelectStyles } from "@/utils/customStyles";
import Select from "react-select";
import { ArrowLeft, ArrowUpFromLine } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import PostList from "@/pages/admin/menu/recruiter/jobs/createJob/list";
import useImageUpload from "@/hooks/useImageUpload";

function RecruiterJobPost() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  const { image, imageFile, handleImageChange, clearImage, setImage } =
    useImageUpload();
  const onSubmit = (data) => {
    setLoader(true);
    handleEmployee(data);
  };
  return (
    <div>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className="flex flex-row items-start justify-between gap-3">
        <div className="w-full">
          <div className="mb-3 mt-1 flex items-center justify-between">
            <h1 className="flex flex-row items-center justify-center gap-2 text-base font-bold text-black">
              <ArrowLeft className="size-4" />
              Create New Job <div className="h-4 w-[.07rem] bg-[#B0B0B0]"></div>
              <span className="text-sm font-medium text-[#2C2C2C]">Post</span>
            </h1>
            <Link
              to="/admin/recruiter/application"
              className="btn flex h-10 min-h-10 items-center rounded bg-hrmprimaryorange px-7 text-xs font-semibold text-white hover:bg-[#030E5C]"
            >
              Next
            </Link>
          </div>
          <div className="w-full rounded-md bg-white">
            <div
              onSubmit={handleSubmit(onSubmit)}
              className="mb-9 grid grid-cols-1 gap-x-3 py-2"
            >
              <div className="st flex flex-col items-baseline justify-center rounded-md px-5 py-4">
                <div className="mt-4 grid w-full grid-cols-3 items-center justify-center gap-y-2">
                  <div className="group flex flex-col space-y-1 px-3 py-2">
                    <label className="label-text">
                      Job title <span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("jobtitle", { required: true })}
                      className="input-box h-10 w-full focus:border-gray-300"
                    />
                    {errors.jobtitle && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.jobtitle?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-2">
                    <label className="label-text flex flex-row items-center gap-1">
                      Employement type <span className="text-red-500">*</span>
                      <h6 className="font-bold text-blue-700">(Create)</h6>
                    </label>
                    <Controller
                      name="employementye"
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
                    {errors.employementye && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.employementye?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-2">
                    <label className="label-text flex flex-row items-center gap-1">
                      Employee Designation{" "}
                      <span className="text-red-500">*</span>
                      <h6 className="font-bold text-blue-700">(Create)</h6>
                    </label>
                    <Controller
                      name="employeedesignation"
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
                          placeholder="Select minimum experience+"
                          className="input-box h-10 w-full focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.employeedesignation && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.employeedesignation?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 grid w-full grid-cols-3 items-center justify-center gap-y-2">
                  <div className="group flex flex-col space-y-1 px-3 py-2">
                    <label className="label-text flex flex-row items-center gap-1">
                      Minimum Experience <span className="text-red-500">*</span>
                      <h6 className="font-bold text-blue-700">(Create)</h6>
                    </label>
                    <Controller
                      name="miniexperience"
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
                          placeholder="Select minimum experience+"
                          className="input-box h-10 w-full focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.miniexperience && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.miniexperience?.message}
                      </span>
                    )}
                  </div>

                  <div className="group flex flex-col space-y-1 px-3 py-2">
                    <label className="label-text flex flex-row items-center gap-1">
                      Department or Business Unit
                      <h6 className="font-bold text-blue-700">(Create)</h6>
                    </label>
                    <Controller
                      name="departmentbusiness"
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
                          placeholder="Select minimum experience+"
                          className="input-box h-10 w-full focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.departmentbusiness && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.departmentbusiness?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-row items-center gap-y-2">
                  <div className="group flex w-8/12 flex-col space-y-1 px-3 py-2">
                    <label className="label-text flex flex-row items-center gap-1">
                      Job description{" "}
                      <h6 className="font-bold text-blue-700">(Create)</h6>
                    </label>
                    <Controller
                      name="jobdiscription"
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
                          placeholder="Select minimum experience+"
                          className="input-box h-10 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.jobdiscription && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.jobdiscription?.message}
                      </span>
                    )}
                  </div>
                  <div className="group mt-5 flex w-4/12 flex-col space-y-1 px-3 py-2">
                    <Link
                      to=""
                      className="flex h-10 min-h-10 flex-row items-center justify-center gap-2 rounded-md bg-[#D9D9D933] text-center text-sm"
                    >
                      {" "}
                      <ArrowUpFromLine className="size-4" strokeWidth={1} />
                      update Job Description
                    </Link>
                  </div>
                </div>
                <div className="mt-4 grid w-full grid-cols-3 items-center justify-center gap-y-2">
                  <div className="group flex flex-col space-y-1 px-3 py-2">
                    <label className="label-text flex flex-row items-center gap-1">
                      State,Province or territory
                    </label>
                    <Controller
                      name="territory"
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
                          placeholder="Select minimum experience+"
                          className="input-box h-10 w-full focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.territory && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.territory?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1 px-3 py-2">
                    <label className="label-text flex flex-row items-center gap-1">
                      City or Town
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
                          placeholder="Select minimum experience"
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
                  <div className="group flex flex-col space-y-1 px-3 py-2">
                    <label className="label-text">Postal Code</label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="input-box h-10 w-full focus:border-gray-300"
                    />
                    {errors.postalcode && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.postalcode?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="group flex w-full flex-col space-y-1 px-3 py-2">
                  <label className="label-text">Work type</label>
                  <div className="flex flex-row items-start gap-4">
                    <label className="label flex w-[20%] cursor-pointer flex-row items-center justify-start gap-3 rounded-md border border-gray-300 focus:border-[#C7C7C7]">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox h-4 w-4 rounded-sm accent-bgColor-100 checked:accent-bgColor-100"
                      />
                      <span className="label-text whitespace-nowrap text-xs text-gray-200">
                        Remote(work from office)
                      </span>
                    </label>
                    <label className="label flex w-[20%] cursor-pointer flex-row items-center justify-start gap-3 rounded-md border border-gray-300 focus:border-[#C7C7C7]">
                      <input
                        type="checkbox"
                        className="checkbox h-4 w-4 rounded-sm accent-bgColor-100 checked:accent-bgColor-100"
                      />
                      <span className="label-text whitespace-nowrap text-xs text-gray-200">
                        Work from office
                      </span>
                    </label>
                    <label className="label flex w-[20%] cursor-pointer flex-row items-center justify-start gap-3 rounded-md border border-gray-300 focus:border-[#C7C7C7]">
                      <input
                        type="checkbox"
                        className="checkbox h-4 w-4 rounded-sm accent-bgColor-100 checked:accent-bgColor-100"
                      />
                      <span className="label-text whitespace-nowrap text-xs text-gray-200">
                        Hybrid
                      </span>
                    </label>
                  </div>
                  {errors.jobtitle && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.jobtitle?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <PostList />
          </div>
        </div>
        <CreateJobSideBar />
      </div>
    </div>
  );
}

export default RecruiterJobPost;
