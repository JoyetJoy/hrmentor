import MenuHeader from "@/components/common/MenuHeader";
import CreateJobSideBar from "@/components/sidebars/recruiter/CreateJobSideBar";
import { customSelectStyles } from "@/utils/customStyles";
import Select from "react-select";
import {
  ArrowLeft,
  ArrowUpFromLine,
  ChevronRight,
  PenLineIcon,
  UploadCloud,
} from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useImageUpload from "@/hooks/useImageUpload";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";

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
              <div className="grid grid-cols-3 items-baseline justify-center gap-y-2 rounded-md px-5 py-4">
                <div className="group flex flex-col space-y-1 px-3 py-2">
                  <label className="label-text">
                    Job title <span className="text-red-500">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    {...register("jobtitle", { required: true })}
                    className="input-box"
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
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select Gender"
                        className="input-box"
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
                    Employee Designation <span className="text-red-500">*</span>
                    <h6 className="font-bold text-blue-700">(Create)</h6>
                  </label>
                  <Controller
                    name="employeedesignation"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select minimum experience+"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.employeedesignation && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.employeedesignation?.message}
                    </span>
                  )}
                </div>
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
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select minimum experience+"
                        className="input-box"
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
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select minimum experience+"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.departmentbusiness && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.departmentbusiness?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="label-text">Upload Image </label>
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
                          Upload Image
                        </span>
                      </div>
                      <input
                        id="employee-profile-pic"
                        onChange={handleImageChange}
                        type="file"
                        className="hidden"
                      />
                    </label>
                  )}

                  {errors.employeeId && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.employeeId?.message}
                    </span>
                  )}
                </div>
                <div className="group col-span-2 flex w-full flex-col space-y-1 px-3 py-2">
                  <label className="label-text flex flex-row items-center gap-1">
                    Job description
                    <h6 className="font-bold text-blue-700">(Create)</h6>
                  </label>
                  <div className="flex items-center gap-5">
                    <Controller
                      name="jobdiscription"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          isSearchable={false}
                          styles={customSelectStyles}
                          placeholder="Select minimum experience+"
                          className="input-box h-10 focus:border-gray-300"
                        />
                      )}
                    />
                    <div className="flex h-10 min-h-10 w-fit min-w-64 cursor-pointer flex-row items-center justify-center gap-2 rounded-md bg-[#FCA7A733] px-7 text-center text-sm font-semibold text-black/55">
                      <PenLineIcon className="h-4" /> Update Job Description
                    </div>
                  </div>

                  {errors.jobdiscription && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.jobdiscription?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1 px-3 py-2">
                  <label className="label-text flex flex-row items-center gap-1">
                    Country
                  </label>
                  <Controller
                    name="territory"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select minimum experience+"
                        className="input-box"
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
                    State,Province or territory
                  </label>
                  <Controller
                    name="territory"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select minimum experience+"
                        className="input-box"
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
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select minimum experience"
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
                <div className="group flex flex-col space-y-1 px-3 py-2">
                  <label className="label-text">Postal Code</label>
                  <input autoComplete="off" type="text" className="input-box" />
                  {errors.postalcode && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.postalcode?.message}
                    </span>
                  )}
                </div>
                <div className="group col-span-3 flex w-full flex-col space-y-1 px-3 py-2">
                  <label className="label-text">Work type</label>
                  <div className="flex flex-row items-start gap-4">
                    <label className="label flex w-[20%] cursor-pointer flex-row items-center justify-start gap-3 rounded-md border border-gray-300 focus:border-[#C7C7C7]">
                      <input
                        type="radio"
                        className="checkbox h-4 w-4 rounded-sm accent-bgColor-100 checked:accent-bgColor-100"
                      />
                      <span className="label-text">
                        Remote(work from office)
                      </span>
                    </label>
                    <label className="label flex w-[20%] cursor-pointer flex-row items-center justify-start gap-3 rounded-md border border-gray-300 focus:border-[#C7C7C7]">
                      <input
                        type="radio"
                        className="checkbox h-4 w-4 rounded-sm accent-bgColor-100 checked:accent-bgColor-100"
                      />
                      <span className="label-text">Work from office</span>
                    </label>
                    <label className="label flex w-[20%] cursor-pointer flex-row items-center justify-start gap-3 rounded-md border border-gray-300 focus:border-[#C7C7C7]">
                      <input
                        type="radio"
                        className="checkbox h-4 w-4 rounded-sm accent-bgColor-100 checked:accent-bgColor-100"
                      />
                      <span className="label-text">Hybrid</span>
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
            <div className="flex flex-col gap-2.5 pb-7">
              <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center gap-x-2">
                  <div className="flex size-5 items-center justify-center rounded-full bg-[#F7F7F7]">
                    <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                  </div>
                  <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                    Advanced job details{" "}
                  </p>
                  <div className="h-px w-full bg-[#ECE9F1]"></div>
                </DisclosureButton>
                <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                  <div className="mt-4 grid w-8/12 grid-cols-2 items-center justify-center gap-y-2">
                    <div className="group flex flex-col space-y-1 px-3 py-2">
                      <label className="label-text">Job code</label>
                      <div className="input-box flex">
                        <input
                          autoComplete="off"
                          type="text"
                          placeholder=""
                          className="w-full"
                        />
                        <button
                          type="button"
                          className="text-[0.8rem] font-medium text-hrmprimaryorange"
                        >
                          Generate
                        </button>
                      </div>
                      {errors.jobcode && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.jobcode?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 px-3 py-2">
                      <label className="label-text">Salary Package</label>
                      <Controller
                        name="salarypackage"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            isSearchable={false}
                            styles={customSelectStyles}
                            placeholder="Not Mention Package"
                            className="input-box"
                          />
                        )}
                      />
                      {errors.salarypackage && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.salarypackage?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="group flex w-8/12 flex-col space-y-1 px-3 py-2">
                    <label className="label-text">Reason</label>
                    <input
                      autoComplete="off"
                      type="text"
                      placeholder="Enter the reason"
                      className="input-box h-20 w-full text-justify placeholder:text-start focus:border-gray-300"
                    />
                    {errors.reason && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.reason?.message}
                      </span>
                    )}
                  </div>
                </DisclosurePanel>
              </Disclosure>
              <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center gap-x-2">
                  <div className="flex size-5 items-center justify-center rounded-full bg-[#F7F7F7]">
                    <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                  </div>
                  <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                    Sensitive data
                  </p>
                  <div className="h-px w-full bg-[#ECE9F1]"></div>
                </DisclosureButton>
                <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                  <div>
                    <p className="my-8 px-3 text-sm">
                      This section is visible to Admins, Hiring Managers, And
                      User with sensitive data privilege.
                    </p>
                    <div className="mt-4 grid w-8/12 grid-cols-2 items-center justify-center gap-y-2">
                      <div className="group flex flex-col space-y-1 px-3 py-2">
                        <label className="label-text">Salary Type</label>
                        <Controller
                          name="salarypackage"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              isSearchable={false}
                              styles={customSelectStyles}
                              placeholder="Not Mention Package"
                              className="input-box"
                            />
                          )}
                        />
                        {errors.salarypackage && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.salarypackage?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-2">
                        <label className="label-text">
                          Salary Range(Internal Only )
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder="Minimum range"
                            className="input-box"
                          />
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder="Maximum range"
                            className="input-box"
                          />
                        </div>

                        {errors.jobcode && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.jobcode?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="group flex w-full flex-col space-y-1 px-3 py-2">
                      <label className="label-text">Internal Note</label>
                      <textarea
                        autoComplete="off"
                        className="input-box h-20 w-full"
                      />
                      {errors.note && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.note?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
              <Disclosure as="div" className="px-5 py-2" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center gap-x-2">
                  <div className="flex size-5 items-center justify-center rounded-full bg-[#F7F7F7]">
                    <ChevronRight className="size-4 group-data-[open]:rotate-90" />
                  </div>
                  <p className="flex flex-row whitespace-nowrap text-sm font-semibold">
                    Exposure
                  </p>
                  <div className="h-px w-full bg-[#ECE9F1]"></div>
                </DisclosureButton>
                <DisclosurePanel className="my-4 text-sm/5 text-black/50">
                  <div>
                    <div className="group flex w-full flex-col space-y-1 py-2">
                      <label className="label-text">Meta Title</label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="input-box"
                      />
                      {errors.note && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.note?.message}
                        </span>
                      )}
                    </div>
                    <div className="group mb-4 flex w-full flex-col space-y-1 py-2">
                      <label className="label-text">
                        Search Engine Description
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="input-box h-20"
                      />
                      {errors.note && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.note?.message}
                        </span>
                      )}
                    </div>
                    <div className="form-control">
                      <h1 className="label-text mb-2">Career page</h1>
                      <label className="label cursor-pointer justify-normal gap-4">
                        <input
                          type="checkbox"
                          className="checkbox size-4 rounded-sm"
                        />
                        <span className="text-gary-200 label-text text-sm">
                          Show these in career page?
                        </span>
                      </label>
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </div>
        </div>
        <CreateJobSideBar stepCounter={1} />
      </div>
    </div>
  );
}

export default RecruiterJobPost;
