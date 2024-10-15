import React, { useEffect, useState } from "react";
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
  SOURCES_LIST,
  STATE_COUNTRY,
} from "@/api/master";
import { newFormRequest, newRequest } from "@/api";
import { recCandidateSchema } from "@/schema/dashboard/recruiter/candidate/form/save.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "@/components/ui/Loader";
import toast from "react-hot-toast";
import { GET_CANDIDATES } from "@/api/recruiter";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function SaveCandidates() {
  const [resumefile, setResumeFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(recCandidateSchema),
  });

  const [sameAsHome, setSameAsHome] = useState(false);
  const { country_id, state_or_province, home_address } = watch();

  // RECRUITER MASTERS LISTING
  const { data: recruiterMasters } = useEmployeeMaster(
    SALARY_DEFAULT_MASTERS,
    "recruiterMasters",
  );

  // SOURCES LISTING
  const { data: sourcesList } = useEmployeeMaster(SOURCES_LIST, "sourcesList");

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
      params: {
        state_id: parseInt(state_or_province?.id),
        search: inputValue,
      },
    });

    return response?.data;
  };

  // useEffect(() => {
  //   if (employeeDetails) {
  //     setSameAsHome(employeeDetails?.same_as_home === 1 ? true : false);
  //   }
  // }, [employeeDetails, setSameAsHome]);

  // SAME AS HOME
  useEffect(() => {
    if (sameAsHome === true) {
      setValue("communication_address", home_address);
    } else if (sameAsHome === false) {
      setValue("communication_address", "");
    }
  }, [sameAsHome]);

  const onSubmit = (data) => {
    setLoader(true);
    handleEmployee(data);
  };
  const handleEmployee = async (data) => {
    if (!resumefile) {
      toast.error("Please upload resume");
      setLoader(false);
      return;
    }
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("sur_name", data.sur_name);
    formData.append("gender", data.gender?.value);
    formData.append("date_of_birth", data.date_of_birth);
    formData.append("source", data.source.id);
    formData.append("job_id", data.job_id.id);
    formData.append("linked_in", data.linked_in);
    formData.append("phone_number", data.phone_number);
    formData.append("email", data.email);
    formData.append("personal_email", data.personal_email);
    formData.append("resume_file", resumefile);
    formData.append("home_address", data.home_address);
    formData.append("communication_address", data.communication_address);
    formData.append(
      "highest_education_level",
      data.highest_education_level?.id,
    );
    formData.append("college_or_university", data.college_or_university?.id);
    formData.append("date_applied", data.date_applied);
    data.language_spoken.forEach((language) => {
      formData.append("language_spoken[]", language.id);
    });
    formData.append("country_id", data.country_id?.id);
    formData.append("city_id", data.city_id?.id);
    formData.append("state_or_province", data.state_or_province?.id);
    formData.append("same_as_home_address", sameAsHome ? 1 : 0);

    try {
      let res;
      res = await newFormRequest.post(GET_CANDIDATES, formData);
      // else {
      //   res = await newFormRequest.post(`${UPDATE_EMPLOYEE}/${uid}`, formData);
      // }
      if (res.data?.status === 201) {
        toast.success(res?.data?.message);
        queryClient.invalidateQueries(["candidateListing"]);
        clearImage();
        reset();
        setLoader(false);
        navigate("/admin/recruiter/candidate");
      } else {
        toast.error("Failed to save candidate.");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save candidate.");
      setLoader(false);
    }
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-2 grid grid-cols-2 gap-5 rounded-md bg-white px-6 py-4 pb-12"
      >
        <div className="flex flex-col">
          <h1 className="pt-3 text-base font-bold">Add Candidate</h1>
          <div className="mt-5 grid w-full grid-cols-2 gap-x-5">
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text">First Name</label>
              <input
                autoComplete="off"
                type="text"
                placeholder="Enter First Name"
                {...register("first_name", { required: true })}
                className="input-box"
              />
              {errors.first_name && (
                <span className="text-xs font-medium text-red-500">
                  {errors.first_name?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text">Last name</label>
              <input
                {...register("sur_name")}
                autoComplete="off"
                placeholder="Enter Surname"
                type="text"
                className="input-box"
              />
              {errors.sur_name && (
                <span className="text-xs font-medium text-red-500">
                  {errors.sur_name?.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text">Phone</label>
              <input
                {...register("phone_number", { required: true })}
                autoComplete="off"
                type="text"
                placeholder="Enter Moblie Number"
                onKeyPress={(event) => {
                  if (
                    !/^[0-9]$/.test(event.key) ||
                    event.target.value.length >= 10
                  ) {
                    event.preventDefault();
                  }
                }}
                className="input-box"
              />
              {errors.phone_number && (
                <span className="text-xs font-medium text-red-500">
                  {errors.phone_number?.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text">Email </label>
              <input
                {...register("email", { required: true })}
                autoComplete="off"
                type="text"
                placeholder="Enter Email Address"
                className="input-box"
              />
              {errors.email && (
                <span className="text-xs font-medium text-red-500">
                  {errors.email?.message}
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
                    options={recruiterMasters?.genders}
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

            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text">Date of birth</label>
              <input
                {...register("date_of_birth", { required: true })}
                autoComplete="off"
                type="date"
                className="input-box"
              />
              {errors.date_of_birth && (
                <span className="text-xs font-medium text-red-500">
                  {errors.date_of_birth?.message}
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
                name="state_or_province"
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
              {errors.state_or_province && (
                <span className="text-xs font-medium text-red-500">
                  {errors.state_or_province?.message}
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
              <Controller
                name="language_spoken"
                className=""
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    styles={customSelectStyles}
                    options={recruiterMasters?.languages}
                    isMulti
                    placeholder="Select languages"
                    className="input-box h-fit"
                  />
                )}
              />
              {errors.language_spoken && (
                <span className="text-xs font-medium text-red-500">
                  {errors.language_spoken?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="required label-text h-5">Home Address</label>
              <textarea
                autoComplete="off"
                type="text"
                {...register("home_address", { required: true })}
                className="input-box min-h-28 py-1"
              />
              {errors.home_address && (
                <span className="text-xs font-medium text-red-500">
                  {errors.home_address?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1.5 py-2">
              <label className="label-text flex items-center justify-between">
                <p className="required">Communication Address</p>
                <div className="flex gap-1.5">
                  <input
                    type="checkbox"
                    checked={sameAsHome}
                    onChange={() => {
                      setSameAsHome(!sameAsHome);
                    }}
                  />
                  <span className="mt-0.5 whitespace-nowrap text-[0.5rem] font-medium text-[#696969] md:text-xs">
                    Same as home
                  </span>
                </div>
              </label>
              <textarea
                disabled={sameAsHome}
                autoComplete="off"
                {...register("communication_address", { required: true })}
                className="input-box min-h-28 py-1"
              />
              {errors.communication_address && (
                <span className="text-xs font-medium text-red-500">
                  {errors.communication_address?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text">
                Highest education level
              </label>
              <Controller
                name="highest_education_level"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    styles={customSelectStyles}
                    options={recruiterMasters?.educationlevels}
                    placeholder="Select collage or University"
                    className="input-box"
                  />
                )}
              />
              {errors?.highest_education_level && (
                <span className="text-xs font-medium text-red-500">
                  {errors.highest_education_level?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text">
                Collage or University
              </label>
              <Controller
                name="college_or_university"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    styles={customSelectStyles}
                    options={recruiterMasters?.collegesUniversities}
                    placeholder="Select collage or University"
                    className="input-box"
                  />
                )}
              />
              {errors.college_or_university && (
                <span className="text-xs font-medium text-red-500">
                  {errors.college_or_university?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="label-text">Source</label>
              <Controller
                name="source"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    styles={customSelectStyles}
                    options={sourcesList}
                    placeholder="Select source"
                    className="input-box"
                  />
                )}
              />
              {errors.source && (
                <span className="text-xs font-medium text-red-500">
                  {errors.source?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="label-text">
                Date Applied<span className="text-red-500">*</span>
              </label>
              <input
                {...register("date_applied", { required: true })}
                autoComplete="off"
                type="date"
                className="input-box"
              />
              {errors.date_applied && (
                <span className="text-xs font-medium text-red-500">
                  {errors.date_applied?.message}
                </span>
              )}
            </div>

            <div className="group flex flex-col space-y-1 py-2">
              <label className="required label-text">Recruiting job</label>
              <Controller
                name="job_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    styles={customSelectStyles}
                    options={recruiterMasters?.activeJobs}
                    placeholder="Select recruiting job"
                    className="input-box"
                  />
                )}
              />
              {errors.job_id && (
                <span className="text-xs font-medium text-red-500">
                  {errors.job_id?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col space-y-1 py-2">
              <label className="label-text">LinkedIn ID</label>
              <input
                {...register("linked_in", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box"
              />
              {errors.linked_in && (
                <span className="text-xs font-medium text-red-500">
                  {errors.linked_in?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <ResumeDragzone file={resumefile} setFile={setResumeFile} />
        <div className="flex items-center font-semibold">
          <button
            type="submit"
            disabled={loader}
            className="btn flex h-10 min-h-10 items-center gap-2 rounded-md bg-hrmblack px-14 text-xs font-semibold text-white hover:bg-[#030E5C]"
          >
            {loader ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>{" "}
                Saving
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default SaveCandidates;
