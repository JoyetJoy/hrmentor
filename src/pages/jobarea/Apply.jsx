import { newRequest } from "@/api";
import { CAREER_JOB_QUESTIONS } from "@/api/recruiter";
import ResumeDragzoneApplyJob from "@/components/jobarea/ResumeDrag";
import { EmployeeSchema } from "@/schema/dashboard/employee/form/employee.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function Apply() {
  const { id } = useParams();
  const [resume, setResume] = useState("");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "on",
    reValidateMode: "onChange",
    resolver: yupResolver(EmployeeSchema),
  });
  // Fetch details
  const { data: careerJobQuestion, isLoading } = useQuery({
    queryKey: ["careerJobQuestion", id],
    queryFn: () =>
      newRequest.get(`${CAREER_JOB_QUESTIONS}/${id}`).then((res) => {
        return res.data;
      }),
  });

  console.log(careerJobQuestion);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    homeAddress: "",
    country: "",
    state: "",
    district: "",
    languagesSpoken: "",
    highestEducationLevel: "",
    collegeOrUniversity: "",
    source: "",
    dateApplied: "",
    recruitingJob: "",
    linkedinId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
          <div className="z-50 mx-auto -mt-28 mb-36 w-full max-w-5xl rounded-md border border-[#ECE9F1] bg-white p-8">
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
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-box h-10 w-full rounded-md focus:border-gray-300"
                />
              </div>

              <div className="group flex flex-col space-y-1">
                <label className="required label-text">Phone</label>
                <div className="flex gap-2">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="input-box h-10 w-24 rounded-md bg-[#A7A7A7]/20 focus:border-gray-300"
                  >
                    <option value="">+44 (UK)</option>
                  </select>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Mobile Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-box h-10 w-full rounded-md focus:border-gray-300"
                  />
                </div>
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="required label-text">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input-box h-10 w-full rounded-md focus:border-gray-300"
                >
                  <option value="">Select Country</option>
                  {/* Add other options as needed */}
                </select>
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="required label-text">State</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input-box h-10 w-full rounded-md focus:border-gray-300"
                >
                  <option value="">Select Country</option>
                  {/* Add other options as needed */}
                </select>
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="required label-text">City</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input-box h-10 w-full rounded-md focus:border-gray-300"
                >
                  <option value="">Select Country</option>
                </select>
              </div>
            </div>
            <hr className="my-6 border-[#ECE9F1]" />
            <div className="mt-4 grid w-full gap-5">
              <div className="group flex flex-col space-y-2">
                <label className="label-text">About Yourself</label>
                <textarea
                  autoComplete="off"
                  placeholder="A small description about yourself"
                  name="homeAddress"
                  value={formData.homeAddress}
                  onChange={handleChange}
                  className="input-box mt-0 h-24 w-full rounded-md focus:border-gray-300"
                />
              </div>
              {careerJobQuestion?.profileQuestions?.map((i) => (
                <div key={i.id} className="group flex flex-col space-y-1">
                  <label className="label-text">
                    {i?.profile_question?.profile_question_name}
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="languagesSpoken"
                    value={formData.languagesSpoken}
                    onChange={handleChange}
                    className="input-box h-10 w-full rounded-md focus:border-gray-300"
                  />
                </div>
              ))}

              {careerJobQuestion?.screeningQuestions?.map((i) => (
                <div key={i.id} className="group flex flex-col space-y-1">
                  <label className="label-text">{i?.question}</label>
                  {i?.answer_type === 1 ? (
                    <input
                      autoComplete="off"
                      type="text"
                      name="languagesSpoken"
                      value={formData.languagesSpoken}
                      onChange={handleChange}
                      className="input-box h-10 w-full rounded-md focus:border-gray-300"
                    />
                  ) : i?.answer_type === 2 ? (
                    <select
                      autoComplete="off"
                      type="text"
                      name="languagesSpoken"
                      value={formData.languagesSpoken}
                      onChange={handleChange}
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
                    <div className="flex gap-2 text-sm font-medium">
                      {i?.question_options?.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center gap-1"
                        >
                          <input
                            type="checkbox"
                            name="languagesSpoken"
                            value={formData.languagesSpoken}
                            onChange={handleChange}
                          />
                          {option?.option}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-2 text-sm font-medium">
                      {i?.question_options?.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center gap-1"
                        >
                          <input
                            type="radio"
                            name="languagesSpoken"
                            value={formData.languagesSpoken}
                            onChange={handleChange}
                          />
                          {option?.option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
