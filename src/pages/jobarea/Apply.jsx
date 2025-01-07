import { newRequest } from "@/api";
import { COUNTRY, COUNTRY_CITY, STATE_COUNTRY } from "@/api/master";
import { CAREER_JOB_APPLY, CAREER_JOB_QUESTIONS } from "@/api/recruiter";
import ResumeDragzoneApplyJob from "@/components/jobarea/ResumeDrag";
import { customSelectStyles } from "@/utils/customStyles";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { CareerApplySchema } from "@/schema/career/careerApply.schema";
import toast from "react-hot-toast";
import UploadConfirmation from "@/components/common/UploadConfirmation";

export default function Apply() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [resume, setResume] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [resumeFileName, setResumeFileName] = useState("");
  const [state, setState] = useState();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
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

  const { country_id, state_or_province } = watch();

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

  // Function to display state of the selected city
  const handleCitySelect = (selectedCity) => {
    if (selectedCity?.state_name) {
      setState(selectedCity.state_name);
      setValue("state_id", {
        id: selectedCity.state_id,
        label: selectedCity.state_name,
        value: selectedCity.state_id,
      });
    }
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
        country_id: parseInt(country_id?.id),
      },
    });
    return response?.data?.data;
  };

  const onSubmit = (data) => {
    setLoader(true);
    if (!resumeFileName) {
      toast.error("Please add a resume to continue");
      setLoader(false);
      return;
    }
    handleSave(data);
  };

  const handleSave = async (data) => {
    
    const formData = {
      first_name: data.first_name,
      middle_name: data.middle_name,
      sur_name: data.sur_name,
      email: data.email,
      phone_number: data.phone_number,
      country_id: parseInt(data.country_id?.id),
      state_or_province: parseInt(data.state_id?.id),
      city_id: parseInt(data.city_id?.id),
      about_your_self: data?.about_your_self,
      job_list_id: parseInt(id),
      profile_questions: data?.profile_questions?.map((q, i) => ({
        question:
          careerJobQuestion?.profileQuestions[i]?.profile_question
            ?.profile_question_name,
        answer: q.answer,
      })),
      screening_questions: data?.screening_questions?.map((q, i) => ({
        question: careerJobQuestion?.screeningQuestions[i]?.question,
        answer: q.answer,
      })),
      resume_file_name: resumeFileName,
    };

    try {
      const res = await newRequest.post(CAREER_JOB_APPLY, formData);
      if (res.data?.status === 201) {
        toast.success(res?.data?.message);
        setResume("");
        reset();
        setLoader(false);
        navigate("/careers");
      } else {
        toast.error("Failed to apply some error");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to apply some error");
      setLoader(false);
    }
  };

  // Helper function to render different input types
  const renderQuestionField = (question, fieldName) => {
    switch (question?.answer_type) {
      case 1: // Text Input
        return (
          <input
            autoComplete="off"
            type="text"
            {...register(`${fieldName}.answer`)}
            className="input-box h-10 w-full rounded-md focus:border-gray-300"
          />
        );
      case 2: // Dropdown (Select)
        return (
          <select
            {...register(`${fieldName}.answer`)}
            className="input-box h-10 w-full rounded-md focus:border-gray-300"
          >
            <option value="">Select</option>
            {question?.question_options?.map((option) => (
              <option key={option.id} value={option.option}>
                {option?.option}
              </option>
            ))}
          </select>
        );
      case 3: // Checkbox
        return (
          <div className="flex gap-4 text-sm font-medium">
            {question?.question_options?.map((option) => (
              <div key={option.id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  {...register(`${fieldName}.answer`)}
                  value={option.option}
                />
                {option?.option}
              </div>
            ))}
          </div>
        );
      case 4: // Radio buttons
        return (
          <div className="flex gap-4 text-sm font-medium">
            {question?.question_options?.map((option) => (
              <div key={option.id} className="flex items-center gap-1">
                <input
                  type="radio"
                  {...register(`${fieldName}.answer`)}
                  value={option.option}
                />
                {option?.option}
              </div>
            ))}
          </div>
        );
      default:
        return (
          <input
            autoComplete="off"
            type="text"
            {...register(`${fieldName}.answer`)}
            className="input-box h-10 w-full rounded-md focus:border-gray-300"
          />
        );
    }
  };

  useEffect(() => {
    if (resume) {
      setPopupOpen(true);
    }
  }, [resume]);

  return (
    <>
      <UploadConfirmation
        open={popupOpen}
        setPopupOpen={setPopupOpen}
        resume={resume}
        setResume={setResume}
        setResumeFileName={setResumeFileName}
        api={"resume-upload"}
      />
      <div className="h-full">
        <div className="flex flex-col">
          <div
            style={{ backgroundImage: 'url("/assets/icons/career-bg.svg")' }}
            className="relative flex h-72 flex-col items-center gap-5 rounded-md bg-cover py-12"
          >
            <Link to="/careers" className="absolute left-7 top-4">
              <img
                className="h-12"
                src="/assets/icons/career-logo.svg"
                alt=""
              />
            </Link>
            <div className="text-2xl text-white">Apply with us now</div>
            <div className="max-w-2/4 min-w-2/4 text-softcool w-2/4 text-center text-[0.8rem]">
              Build up your career with us form by either selecting from one of
              our application form. Using the Neodesk form builder to format and
              customize the application form template to match your needs.
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="z-50 mx-auto -mt-28 mb-20 w-full max-w-5xl rounded-md border border-[#ECE9F1] bg-white p-8"
          >
            <div className="overflow-y-min max-h-72 overflow-y-auto">
              <ResumeDragzoneApplyJob file={resume} setFile={setResume} />
            </div>

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
                {errors.email && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="required label-text">Phone</label>
                <div className="flex gap-2">
                  <div className="input-box flex h-10 w-24 items-center justify-center rounded-md bg-[#A7A7A7]/20 focus:border-gray-300">
                    +44 (UK)
                  </div>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Mobile Number"
                    {...register("phone_number")}
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
                </div>
                {errors.phone_number && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.phone_number?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5">
                <label className="required label-text">Country of residence</label>
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
                <label className="required label-text">City</label>
                <Controller
                name="city_id"
                control={control}
                rules={{
                  required: country_id
                    ? "City is required"
                    : "Please select a country first",
                }}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    placeholder="Search ..."
                    loadOptions={country_id ? loadCitiesOptions : () => []}
                    isSearchable={true}
                    noOptionsMessage={() =>
                      country_id
                        ? "No cities found"
                        : "Select a country first"
                    }
                    isDisabled={!country_id}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption); // Update form state
                      handleCitySelect(selectedOption);
                    }}
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
              <div className="group flex flex-col gap-1.5">
                <label className="label-text">County</label>
                {/* Show the selected state's name if a city is selected */}
                <span className="h-10 rounded-md border border-[#cacaca] p-2 text-sm font-thin">
                  {state || ""}
                </span>
                {errors.state_id && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.state_id?.message}
                  </span>
                )}
              </div>
            </div>
            <hr className="my-6 border-[#ECE9F1]" />
            <div className="mt-4 grid w-full gap-5">
              <div className="group flex flex-col space-y-2">
                <label className="required label-text">About Yourself</label>
                <textarea
                  autoComplete="off"
                  {...register("about_your_self")}
                  placeholder="A small description about yourself"
                  className="input-box mt-0 h-24 w-full rounded-md focus:border-gray-300"
                />
                {errors.about_your_self && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.about_your_self?.message}
                  </span>
                )}
              </div>
              {/* Render profile questions */}
              {careerJobQuestion?.profileQuestions?.map((question, index) => (
                <div
                  key={question.id}
                  className="group flex flex-col space-y-1"
                >
                  <label
                    className={`label-text ${question?.is_required == 1 ? "required" : ""}`}
                  >
                    {question?.profile_question?.profile_question_name}
                  </label>
                  {renderQuestionField(question, `profile_questions.${index}`)}
                </div>
              ))}
              {/* Render screening questions */}
              {careerJobQuestion?.screeningQuestions?.map((question, index) => (
                <div
                  key={question.id}
                  className="group flex flex-col space-y-1"
                >
                  <label
                    className={`label-text ${question?.is_required == 1 ? "required" : ""}`}
                  >
                    {question?.question}
                  </label>
                  {renderQuestionField(
                    question,
                    `screening_questions.${index}`,
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
