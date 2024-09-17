import React from "react";
import  Select  from "react-select";
import { Controller, useForm } from "react-hook-form";
import { customSelectStyles } from "@/utils/customStyles";
import { Link } from "react-router-dom";
import MenuHeader from "@/components/common/MenuHeader";
import { ArrowUpFromLine } from "lucide-react";

function AddCandidates() {
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
    <>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Candidates"}
      />
      <div className="bg-white py-4 mt-2 pb-12 rounded-md grid gap-5 grid-cols-2 px-6">
        <div className="">
          <h1 className="font-bold text-base pt-3">Add Candidate</h1>
          <div className="grid w-full grid-cols-2 gap-5 mt-4 ">
            <div className="flex group flex-col gap-1">
              <label className="required label-text">First name</label>
              <input
                autoComplete="off"
                type="text"
                {...register("employeeId", { required: true })}
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.employeeId && (
                <span className="text-xs font-medium text-red-500">
                  {errors.employeeId?.message}
                </span>
              )}
            </div>
            <div className="flex group flex-col  gap-1 ">
              <label className="label-text">Last name</label>
              <input
                autoComplete="off"
                type="text"
                {...register("firstName", { required: true })}
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.firstName && (
                <span className="text-xs font-medium text-red-500">
                  {errors.firstName?.message}
                </span>
              )}
            </div>

            <div className="flex group flex-col gap-1">
              <label className="label-text required">Phone</label>
              <input
                {...register("surname")}
                autoComplete="off"
                type="text"
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.surname && (
                <span className="text-xs font-medium text-red-500">
                  {errors.surname?.message}
                </span>
              )}
            </div>

            <div className="flex group flex-col gap-1">
              <label className="label-text required">Email</label>
              <input
                {...register("surname")}
                autoComplete="off"
                type="text"
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.surname && (
                <span className="text-xs font-medium text-red-500">
                  {errors.surname?.message}
                </span>
              )}
            </div>
            <div className="flex group flex-col gap-1 ">
              <label onClick={() => setPopupOpen(true)} className="label-text">
                Gender
                <span className="text-red-500">*</span>
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
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.gender && (
                <span className="text-xs font-medium text-red-500">
                  {errors.gender?.message}
                </span>
              )}
            </div>

            <div className="flex group flex-col gap-1">
              <label className="label-text">
                Date of birth <span className="text-red-500">*</span>
              </label>
              <input
                {...register("dateOBbirth", { required: true })}
                autoComplete="off"
                type="date"
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.dateOfBirth && (
                <span className="text-xs font-medium text-red-500">
                  {errors.dateOBbirth?.message}
                </span>
              )}
            </div>

            <div className="flex group flex-col gap-1">
              <label className="label-text">
                Home Address <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("homeAddress", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box h-full mt-0 w-full focus:border-gray-300"
              />
              {errors.homeAddress && (
                <span className="text-xs font-medium text-red-500">
                  {errors.homeAddress?.message}
                </span>
              )}
            </div>

            <div className="flex group flex-col gap-1 justify-between">
              <div className="flex flex-col gap-1">
                <label className="label-text">Country</label>
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
                      className="input-box h-10 w-full focus:border-gray-300"
                    />
                  )}
                />
                {errors.nationality && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.nationality?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="label-text">State</label>
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
                      className="input-box h-10 w-full focus:border-gray-300"
                    />
                  )}
                />
                {errors.nationality && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.nationality?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex group flex-col gap-1">
              <label className="label-text">District</label>
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
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.country && (
                <span className="text-xs font-medium text-red-500">
                  {errors.country?.message}
                </span>
              )}
            </div>
            <div className="flex group flex-col gap-1">
              <label className="label-text required">Languages spoken</label>
              <input
                {...register("nationalInsurance", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.nationalInsurance && (
                <span className="text-xs font-medium text-red-500">
                  {errors.nationalInsurance?.message}
                </span>
              )}
            </div>
            <div className="flex group flex-col gap-1">
              <label className="label-text required">
                Highest education level
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
                    placeholder="Select Gender"
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
            <div className="flex group flex-col gap-1">
              <label className="label-text required">
                Collage or University
              </label>
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
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.bloodGroup && (
                <span className="text-xs font-medium text-red-500">
                  {errors.bloodGroup?.message}
                </span>
              )}
            </div>
            <div className="flex group flex-col gap-1">
              <label className="label-text">Source</label>
              <input
                {...register("nationalInsurance", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.nationalInsurance && (
                <span className="text-xs font-medium text-red-500">
                  {errors.nationalInsurance?.message}
                </span>
              )}
            </div>
            <div className="flex group flex-col gap-1">
              <label className="label-text">
                Date Applied<span className="text-red-500">*</span>
              </label>
              <input
                {...register("dateOBbirth", { required: true })}
                autoComplete="off"
                type="date"
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.dateOfBirth && (
                <span className="text-xs font-medium text-red-500">
                  {errors.dateOBbirth?.message}
                </span>
              )}
            </div>

            <div className="flex group flex-col gap-1">
              <label className="label-text required">Recruiting job</label>
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
                    className="input-box h-10 w-full focus:border-gray-300"
                  />
                )}
              />
              {errors.bloodGroup && (
                <span className="text-xs font-medium text-red-500">
                  {errors.bloodGroup?.message}
                </span>
              )}
            </div>
            <div className="flex group flex-col gap-1">
              <label className="label-text">LinkedIn ID</label>
              <input
                {...register("nationalInsurance", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box h-10 w-full focus:border-gray-300"
              />
              {errors.nationalInsurance && (
                <span className="text-xs font-medium text-red-500">
                  {errors.nationalInsurance?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-center">
          <h1 className="font-bold text-xs pt-14 pb-1">Resume Upload</h1>
          <div className="h-full gap-2 border rounded-lg py-2 justify-center items-center flex flex-col border-[#E6E3EB]">
            <p className="text-sm">Upload or drag and drop</p>
            <p className="text-sm text-[#7F7F7F]">
              (Preferred), DOCX, DOC, PDF up to 1 MB
            </p>

            <button class="bg-white flex flex-row items-center justify-center min-h-10 h-10 rounded-md py-1 px-7 border border-gray-400 gap-2">
            <ArrowUpFromLine className="size-4"  strokeWidth={2}/>

              <h1 className="text-xs font-bold">Upload</h1>
            </button>
          </div>
        </div>
        <div className="text-white font-semibold flex  items-center">
          <Link
            to={"/admin/recruiter/profile"}
            className="btn bg-bgColor-100 px-12 text-white text-xs font-medium hover:bg-bgColor-100 min-h-10 h-10"
          >
            Submit
          </Link>
        </div>
      </div>
    </>
  );
}

export default AddCandidates;
