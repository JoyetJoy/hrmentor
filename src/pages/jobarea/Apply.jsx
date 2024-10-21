import { newRequest } from "@/api";
import { COUNTRY, COUNTRY_CITY, STATE_COUNTRY } from "@/api/master";
import { CAREER_JOB_APPLY, CAREER_JOB_QUESTIONS } from "@/api/recruiter";
import ResumeDragzoneApplyJob from "@/components/jobarea/ResumeDrag";
import { customSelectStyles } from "@/utils/customStyles";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { CareerApplySchema } from "@/schema/career/careerApply.schema";
import toast from "react-hot-toast";

export default function Apply() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [resume, setResume] = useState("");
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "on",
    reValidateMode: "onChange",
    resolver: yupResolver(CareerApplySchema),
  });
  // Fetch details
  const { data: careerJobQuestion } = useQuery({
    queryKey: ["careerJobQuestion", id],
    queryFn: () =>
      newRequest.get(`${CAREER_JOB_QUESTIONS}/${id}`).then((res) => {
        return res.data;
      }),
  });

  // COUNTRY LISTING
  const { data: countryList } = useEmployeeMaster(COUNTRY, "countryList");

  const { country_id, state_id } = watch();

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
    handleSave(data);
  };

  const handleSave = async (data) => {
    const formData = {
      first_name: data.first_name,
      middle_name: data.middle_name,
      sur_name: data.sur_name,
      email: data.email,
      phone_number: data.phone_number,
      country_id: data.country_id?.id,
      state_or_province: data.state_or_province?.id,
      city_id: city_id?.id,
      about_your_self: data?.about_your_self,
      job_list_id: id,
      profile_questions: [
        {
          question: 5,
          answer: "yes",
        },
      ],
      screening_questions: [
        {
          question: 5,
          answer: "yes",
        },
      ],
    };

    try {
      const res = await newRequest.post(CAREER_JOB_APPLY, formData);
      if (res.data?.status === 201) {
        toast.success(res?.data?.message);
        clearImage();
        reset();
        setLoader(false);
        navigate("/careers");
      } else {
        toast.error("Failed to save employee.");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save employee.");
      setLoader(false);
    }
  };

  return (
    <>
      <div className="h-full">
        <div className="flex flex-col">
          <div
            style={{ backgroundImage: 'url("/assets/icons/career-bg.svg")' }}
            className="relative flex h-72 flex-col items-center gap-5 rounded-md bg-cover py-12"
          >
            <div className="absolute left-7 top-4">
              <img
                className="h-12"
                src="/assets/icons/career-logo.svg"
                alt=""
              />
            </div>
            <div className="text-2xl text-white">Apply with us now</div>
            <div className="max-w-2/4 min-w-2/4 w-2/4 text-center text-[0.8rem] text-[#DEDEDE]">
              Build up your career with us form by either selecting from one of
              our application form. Using the Neodesk form builder to format and
              customize the application form template to match your needs.
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="z-50 mx-auto -mt-28 mb-20 w-full max-w-5xl rounded-md border border-[#ECE9F1] bg-white p-8"
          >
            <ResumeDragzoneApplyJob file={resume} setFile={setResume} />
            <div className="mt-4 grid w-full grid-cols-2 gap-5">
              <div className="group flex flex-col gap-1.5">
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
              <div className="group flex flex-col gap-1.5">
                <label className="label-text">Middle Name</label>
                <input
                  {...register("middle_name")}
                  autoComplete="off"
                  placeholder="Enter Middle Name"
                  type="text"
                  className="input-box"
                />
                {errors.middle_name && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.middle_name?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5">
                <label className="required label-text">Surname</label>
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
              <div className="group flex flex-col space-y-1">
                <label className="required label-text">Email</label>
                <input
                  autoComplete="off"
                  placeholder="Enter Email"
                  type="email"
                  {...register("email")}
                  className="input-box h-10 w-full rounded-md focus:border-gray-300"
                />
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="required label-text">Phone</label>
                <div className="flex gap-2">
                  <div className="input-box flex h-10 w-24 items-center rounded-md bg-[#A7A7A7]/20 focus:border-gray-300">
                    +44 (UK)
                  </div>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Mobile Number"
                    {...register("phone_number")}
                    className="input-box"
                  />
                </div>
              </div>
              <div className="group flex flex-col gap-1.5">
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
              <div className="group flex flex-col gap-1.5">
                <label className="required label-text">County</label>
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
              <div className="group flex flex-col gap-1.5">
                <label className="required label-text">City</label>
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
            </div>
            <hr className="my-6 border-[#ECE9F1]" />
            <div className="mt-4 grid w-full gap-5">
              <div className="group flex flex-col space-y-2">
                <label className="label-text">About Yourself</label>
                <textarea
                  autoComplete="off"
                  {...register("about_your_self")}
                  placeholder="A small description about yourself"
                  className="input-box mt-0 h-24 w-full rounded-md focus:border-gray-300"
                />
              </div>
              {/* prorfile question and answer */}
              {careerJobQuestion?.profileQuestions?.map((i) => (
                <div key={i.id} className="group flex flex-col space-y-1">
                  <label className="label-text">
                    {i?.profile_question?.profile_question_name}
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    className="input-box h-10 w-full rounded-md focus:border-gray-300"
                  />
                </div>
              ))}
              {/* screen question and answer */}
              {careerJobQuestion?.screeningQuestions?.map((i) => (
                <div key={i.id} className="group flex flex-col space-y-1">
                  <label className="label-text">{i?.question}</label>
                  {i?.answer_type === 1 ? (
                    <input
                      autoComplete="off"
                      type="text"
                      className="input-box h-10 w-full rounded-md focus:border-gray-300"
                    />
                  ) : i?.answer_type === 2 ? (
                    <select
                      autoComplete="off"
                      type="text"
                      className="input-box h-10 w-full rounded-md focus:border-gray-300"
                    >
                      <option value="">Select</option>
                      {i?.question_options?.map((option) => (
                        <option key={option.id} value={option.option_name}>
                          {option?.option}
                        </option>
                      ))}
                    </select>
                  ) : i?.answer_type === 3 ? (
                    <div className="flex gap-4 text-sm font-medium">
                      {i?.question_options?.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center gap-1"
                        >
                          <input type="checkbox" />
                          {option?.option}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-4 text-sm font-medium">
                      {i?.question_options?.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center gap-1"
                        >
                          <input type="radio" />
                          {option?.option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="btn mx-auto my-7 flex h-11 min-h-11 min-w-48 items-center rounded bg-black/70 text-sm font-medium text-white transition-all duration-500 hover:bg-hrmprimaryorange/70"
            >
              {loader ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  Saving
                </div>
              ) : (
                "Send Application"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
