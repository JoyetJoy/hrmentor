import React from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Controller, useForm } from "react-hook-form";
import { customSelectStyles } from "@/utils/customStyles";
import MenuHeader from "@/components/common/MenuHeader";
import ResumeDragzone from "@/components/recruiter/candidate/ResumeDragzone";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import {
  COUNTRY,
  COUNTRY_CITY,
  SALARY_DEFAULT_MASTERS,
  STATE_COUNTRY,
} from "@/api/master";
import { genders } from "@/constants/data";

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

  const { country_id, state_id } = watch();

  // RECRUITER MASTERS LISTING
  const { data: recruiterMasters } = useEmployeeMaster(
    SALARY_DEFAULT_MASTERS,
    "recruiterMasters",
  );

  console.log(recruiterMasters);

  // COUNTRY LISTING
  const { data: countryList } = useEmployeeMaster(COUNTRY, "countryList");
  // GET STATTE BY COUNTRY ID AND SEARCH KEY
  const loadStatesOptions = async (inputValue) => {
    if (inputValue?.length < 3) {
      return [];
    }
    const response = await newRequest.get(STATE_COUNTRY, {
      params: { country_id: parseInt(country_id?.id), search: inputValue },
    });
    return response?.data;
  };

  // GET CITY BY STATE ID AND SEARCH KEY
  const loadCitiesOptions = async (inputValue) => {
    if (inputValue?.length < 3) {
      return [];
    }
    const response = await newRequest.get(COUNTRY_CITY, {
      params: { state_id: parseInt(state_id?.id), search: inputValue },
    });
    return response?.data;
  };

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
          <div className="mt-5 grid w-full grid-cols-2 gap-x-5">
            <div className="group flex flex-col space-y-1 py-2">
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
            <div className="group flex flex-col space-y-1 py-2">
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

            <div className="group flex flex-col space-y-1 py-2">
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

            <div className="group flex flex-col space-y-1 py-2">
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
            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text">Gender</label>
              <Controller
                name="gender"
                className=""
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    styles={customSelectStyles}
                    options={genders}
                    placeholder="Select Gender"
                    className="input-box"
                  />
                )}
              />
              {errors.gender && (
                <span className="text-xs font-medium text-red-500">
                  {errors.gender.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col space-y-1 py-2">
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

            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text">Country</label>
              <Controller
                name="country_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    styles={customSelectStyles}
                    options={countryList}
                    placeholder="Select Country"
                    className="input-box"
                  />
                )}
              />
              {errors.country_id && (
                <span className="text-xs font-medium text-red-500">
                  {errors.country_id?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text flex flex-row items-center gap-1">
                State,Province or territory
              </label>
              <Controller
                name="state_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    placeholder="Search ..."
                    loadOptions={loadStatesOptions}
                    isSearchable={true}
                    noOptionsMessage={() => "type state name"}
                    className="input-box"
                  />
                )}
              />
              {errors.state_id && (
                <span className="text-xs font-medium text-red-500">
                  {errors.state_id?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text flex flex-row items-center gap-1">
                City or Town
              </label>
              <Controller
                name="city_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    placeholder="Search ..."
                    loadOptions={loadCitiesOptions}
                    isSearchable={true}
                    noOptionsMessage={() => "type city name"}
                    className="input-box"
                  />
                )}
              />
              {errors.city_id && (
                <span className="text-xs font-medium text-red-500">
                  {errors.city_id?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
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
            <div className="group col-span-2 flex flex-col gap-1">
              <label className="label-text">
                Home Address <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("homeAddress", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box h-full min-h-20 w-full focus:border-gray-300"
              />
              {errors.homeAddress && (
                <span className="text-xs font-medium text-red-500">
                  {errors.homeAddress?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
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
            <div className="group flex flex-col space-y-1 py-2">
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
            <div className="group flex flex-col space-y-1 py-2">
              <label className="label-text">Source</label>
              <Controller
                name="country_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    styles={customSelectStyles}
                    options={countryList}
                    placeholder="Select Country"
                    className="input-box"
                  />
                )}
              />
              {errors.nationalInsurance && (
                <span className="text-xs font-medium text-red-500">
                  {errors.nationalInsurance?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
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

            <div className="group flex flex-col space-y-1 py-2">
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
            <div className="group flex flex-col space-y-1 py-2">
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
        <ResumeDragzone />
        <div className="flex items-center font-semibold text-white">
          <button
            type="submit"
            className="btn flex h-10 min-h-10 items-center rounded-md bg-hrmblack px-14 text-xs font-semibold text-white hover:bg-[#030E5C]"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default SaveCandidates;
