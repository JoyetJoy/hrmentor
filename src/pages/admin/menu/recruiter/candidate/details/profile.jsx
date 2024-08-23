import React from "react";
import { Select } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { customSelectStyles } from "@/utils/customStyles";
import { Link } from "react-router-dom";
import MenuHeader from "@/components/common/MenuHeader";
import { Mail, MapPin, Phone, SquarePen, X } from "lucide-react";

function Profile() {
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
        firstLink={"Dashboard"}
        secondLink={"Jobs"}
        thirdLink={"Candidate"}
        fourthLink={"Interview"}
        fifthLink={"Report"}
        six={"Setttings"}
        // Candidate Links Active
        // ProfileLink={"Profile"}
        // QuestionAnswersLink={"Question & Answers"}
        // InterviewsLink={"Interviews"}
        // DiscussionsLink={"Discussions"}
        // EmailsLink={"Emails"}
        // DocumentsLink={"Documents"}
        // CandidateHistoryLink={"Candidate History"}
        firstpath={"/admin/recruiter/index"}
        secondpath={"/admin/recruiter/jobs"}
      />
      <div className="bg-white p-2 mt-2 pb-12 rounded-md grid gap-7 grid-cols-2 px-5">
        <div className="">
          <h1 className="font-bold text-base pt-3">Basic Details</h1>
          <div className="grid w-full grid-cols-2 gap-5 mt-4 ">
            <div className="col-span-2 flex justify-between">
              <h1 className="font-bold text-base pt-3">Personal information</h1>
              <div className="flex gap-5">
                <div className="flex justify-between items-center font-medium text-black text-sm  mb-3 ">
                  <Select
                    name="status"
                    aria-label="Project status "
                    className=" w-full py-2 px-12 border border-[#ECBEBE] bg-[#FFF2F2] pl-3 rounded-md text-xs"
                  >
                    <option value="active">Consider</option>
                    <option value="paused">Paused</option>
                    <option value="delayed">Delayed</option>
                    <option value="canceled">Canceled</option>
                  </Select>
                </div>
                <div className="flex justify-between items-center font-medium text-black text-sm  mb-3 ">
                  <Select
                    name="status"
                    aria-label="Project status "
                    className="bg-[#000] w-full text-white py-2 px-6  pl-3 rounded-md text-xs"
                  >
                    <option value="active">Transfer to job</option>
                    <option value="paused">Paused</option>
                    <option value="delayed">Delayed</option>
                    <option value="canceled">Canceled</option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="col-span-2 justify-between py-4 flex border-t border-b border-[#ECE9F1]">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <div className="p-[0.4rem] bg-[#F7F7F7] rounded-full">
                    <Phone className="size-4" />
                  </div>
                  <p className="text-sm">+91 7575757575 </p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-[0.4rem] bg-[#F7F7F7] rounded-full">
                    <Mail className="size-4" />
                  </div>
                  <p className="text-sm">ganeshkumar2001@ gmail.com </p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-[0.4rem] bg-[#F7F7F7] rounded-full">
                    <MapPin className="size-4" />
                  </div>
                  <p className="text-sm">Kerala, India </p>
                </div>
              </div>
              <div className="p-[0.4rem] h-fit bg-[#F7F7F7] rounded-full">
                <SquarePen className="size-4" />
              </div>
            </div>
            <div className="flex group flex-col space-y-1">
              <label className="required label-text">Gender</label>
              <div className="flex justify-between items-center font-medium text-black text-sm  mb-3 ">
                <Select
                  name="status"
                  aria-label="Project status "
                  className=" w-full py-2 px-12 border-2 text-[#7F7F7F] focus:border-gray-300 pl-3 rounded-md text-xs"
                >
                  <option value="active" className="">
                    Consider
                  </option>
                  <option value="paused">Paused</option>
                  <option value="delayed">Delayed</option>
                  <option value="canceled">Canceled</option>
                </Select>
              </div>
            </div>
            <div className="flex group flex-col space-y-1">
              <label className="label-text">
                Date of birth <span className="text-red-500">*</span>
              </label>
              <input
                {...register("dateOBbirth", { required: true })}
                autoComplete="off"
                type="date"
                className="input-box h-10 w-full border-2 focus:border-gray-300"
              />
              {errors.dateOfBirth && (
                <span className="text-xs font-medium text-red-500">
                  {errors.dateOBbirth?.message}
                </span>
              )}
            </div>

            <div className="flex group flex-col space-y-2">
              <label className="label-text">
                Home Address <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("homeAddress", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box h-full mt-0 w-full border-2 focus:border-gray-300"
              />
              {errors.homeAddress && (
                <span className="text-xs font-medium text-red-500">
                  {errors.homeAddress?.message}
                </span>
              )}
            </div>

            <div className="flex group flex-col space-y-1 justify-between">
              <div className="flex flex-col">
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
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                  )}
                />
                {errors.nationality && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.nationality?.message}
                  </span>
                )}
              </div>
              <div>
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
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
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
            <div className="flex group flex-col space-y-1">
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
                    className="input-box h-10 w-full border-2 focus:border-gray-300"
                  />
                )}
              />
              {errors.country && (
                <span className="text-xs font-medium text-red-500">
                  {errors.country?.message}
                </span>
              )}
            </div>
            <div className="flex group flex-col space-y-1">
              <label className="label-text required">Languages spoken</label>
              <input
                {...register("nationalInsurance", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box h-10 w-full border-2 focus:border-gray-300"
              />
              {errors.nationalInsurance && (
                <span className="text-xs font-medium text-red-500">
                  {errors.nationalInsurance?.message}
                </span>
              )}
            </div>
            <div className="flex group flex-col space-y-1">
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
                    className="input-box h-10 w-full border-2 focus:border-gray-300"
                  />
                )}
              />
              {errors.city && (
                <span className="text-xs font-medium text-red-500">
                  {errors.city?.message}
                </span>
              )}
            </div>
            <div className="flex group flex-col space-y-1">
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
                    className="input-box h-10 w-full border-2 focus:border-gray-300"
                  />
                )}
              />
              {errors.bloodGroup && (
                <span className="text-xs font-medium text-red-500">
                  {errors.bloodGroup?.message}
                </span>
              )}
            </div>
            <div className="flex group flex-col space-y-1">
              <label className="label-text">Source</label>
              <input
                {...register("nationalInsurance", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box h-10 w-full border-2 focus:border-gray-300"
              />
              {errors.nationalInsurance && (
                <span className="text-xs font-medium text-red-500">
                  {errors.nationalInsurance?.message}
                </span>
              )}
            </div>
            <div className="flex group flex-col space-y-1">
              <label className="label-text">
                Date Applied<span className="text-red-500">*</span>
              </label>
              <input
                {...register("dateOBbirth", { required: true })}
                autoComplete="off"
                type="date"
                className="input-box h-10 w-full border-2 focus:border-gray-300"
              />
              {errors.dateOfBirth && (
                <span className="text-xs font-medium text-red-500">
                  {errors.dateOBbirth?.message}
                </span>
              )}
            </div>

            <div className="flex group flex-col space-y-1">
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
                    className="input-box h-10 w-full border-2 focus:border-gray-300"
                  />
                )}
              />
              {errors.bloodGroup && (
                <span className="text-xs font-medium text-red-500">
                  {errors.bloodGroup?.message}
                </span>
              )}
            </div>
            <div className="flex group flex-col space-y-1">
              <label className="label-text">LinkedIn ID</label>
              <input
                {...register("nationalInsurance", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box h-10 w-full border-2 focus:border-gray-300"
              />
              {errors.nationalInsurance && (
                <span className="text-xs font-medium text-red-500">
                  {errors.nationalInsurance?.message}
                </span>
              )}
            </div>
          </div>
          <div className="text-white pt-6 font-semibold flex  items-center">
            <Link
              to={"/admin/recruiter/question-answers"}
              className="btn bg-[#181C3A] px-12 text-white text-xs hover:bg-btncolor min-h-10 h-10"
            >
              Submit
            </Link>
          </div>
        </div>
        <div className=" flex flex-col justify-center">
          <div className="flex justify-between py-2">
            <h1 className="font-bold text-sm pt-14 pb-1">Resume</h1>
            <h1 className="font-bold text-sm pt-14 pb-1">
              <X />
            </h1>
          </div>
          <div className="h-full gap-2 border rounded-lg py-2 justify-center items-center flex flex-col border-[#E6E3EB]">
            <img
              src="/assets/images/candidate/pdfdemo.png"
              className="object-contain"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
