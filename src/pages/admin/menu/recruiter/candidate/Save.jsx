import React from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { customSelectStyles } from "@/utils/customStyles";
import { Link } from "react-router-dom";
import MenuHeader from "@/components/common/MenuHeader";
import { ArrowUpFromLine } from "lucide-react";

function SaveCandidates() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
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
      <div className="mt-2 grid grid-cols-2 gap-5 rounded-md bg-white px-6 py-4 pb-12">
        <div className="flex flex-col">
          <h1 className="pt-3 text-base font-bold">Add Candidate</h1>
          <div className="mt-5 grid w-full grid-cols-2 gap-5">
            <div className="group flex flex-col gap-1">
              <label className="required label-text">First name</label>
              <input
                autoComplete="off"
                type="text"
                {...register("employeeId", { required: true })}
                className="input-box"
              />
              {errors.employeeId && (
                <span className="text-xs font-medium text-red-500">
                  {errors.employeeId?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1">
              <label className="label-text">Last name</label>
              <input
                autoComplete="off"
                type="text"
                {...register("firstName", { required: true })}
                className="input-box"
              />
              {errors.firstName && (
                <span className="text-xs font-medium text-red-500">
                  {errors.firstName?.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col gap-1">
              <label className="required label-text">Phone</label>
              <input
                {...register("surname")}
                autoComplete="off"
                type="text"
                className="input-box"
              />
              {errors.surname && (
                <span className="text-xs font-medium text-red-500">
                  {errors.surname?.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col gap-1">
              <label className="required label-text">Email</label>
              <input
                {...register("surname")}
                autoComplete="off"
                type="text"
                className="input-box"
              />
              {errors.surname && (
                <span className="text-xs font-medium text-red-500">
                  {errors.surname?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1">
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

            <div className="group flex flex-col gap-1">
              <label className="label-text">
                Date of birth <span className="text-red-500">*</span>
              </label>
              <input
                {...register("dateOBbirth", { required: true })}
                autoComplete="off"
                type="date"
                className="input-box"
              />
              {errors.dateOfBirth && (
                <span className="text-xs font-medium text-red-500">
                  {errors.dateOBbirth?.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col gap-1">
              <label className="label-text">
                Home Address <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("homeAddress", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box mt-0 h-full w-full focus:border-gray-300"
              />
              {errors.homeAddress && (
                <span className="text-xs font-medium text-red-500">
                  {errors.homeAddress?.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col justify-between gap-1">
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
                      className="input-box"
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
                      className="input-box"
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
            <div className="group flex flex-col gap-1">
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
                    className="input-box"
                  />
                )}
              />
              {errors.country && (
                <span className="text-xs font-medium text-red-500">
                  {errors.country?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1">
              <label className="required label-text">Languages spoken</label>
              <input
                {...register("nationalInsurance", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box"
              />
              {errors.nationalInsurance && (
                <span className="text-xs font-medium text-red-500">
                  {errors.nationalInsurance?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1">
              <label className="required label-text">
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
            <div className="group flex flex-col gap-1">
              <label className="required label-text">
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
                    className="input-box"
                  />
                )}
              />
              {errors.bloodGroup && (
                <span className="text-xs font-medium text-red-500">
                  {errors.bloodGroup?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1">
              <label className="label-text">Source</label>
              <input
                {...register("nationalInsurance", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box"
              />
              {errors.nationalInsurance && (
                <span className="text-xs font-medium text-red-500">
                  {errors.nationalInsurance?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1">
              <label className="label-text">
                Date Applied<span className="text-red-500">*</span>
              </label>
              <input
                {...register("dateOBbirth", { required: true })}
                autoComplete="off"
                type="date"
                className="input-box"
              />
              {errors.dateOfBirth && (
                <span className="text-xs font-medium text-red-500">
                  {errors.dateOBbirth?.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col gap-1">
              <label className="required label-text">Recruiting job</label>
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
                    className="input-box"
                  />
                )}
              />
              {errors.bloodGroup && (
                <span className="text-xs font-medium text-red-500">
                  {errors.bloodGroup?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1">
              <label className="label-text">LinkedIn ID</label>
              <input
                {...register("nationalInsurance", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box"
              />
              {errors.nationalInsurance && (
                <span className="text-xs font-medium text-red-500">
                  {errors.nationalInsurance?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="pb-1 pt-14 text-[0.84rem] font-bold">Resume Upload</h1>
          <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-[#E6E3EB] py-2">
            <p className="text-sm font-semibold">Upload or drag and drop</p>
            <p className="text-sm text-[#7F7F7F]">
              (Preferred), DOCX, DOC, PDF up to 1 MB
            </p>
            <button class="flex h-10 min-h-10 flex-row items-center justify-center gap-2 rounded-md border border-gray-400 bg-white px-7 py-1">
              <ArrowUpFromLine className="size-4" strokeWidth={2} />
              <h5 className="text-[0.8rem] font-bold">Upload</h5>
            </button>
          </div>
        </div>
        <div className="flex items-center font-semibold text-white">
          <button
            type="submit"
            className="btn flex h-10 min-h-10 items-center bg-hrmprimaryorange px-7 text-xs font-semibold text-white hover:bg-[#030E5C]"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default SaveCandidates;
