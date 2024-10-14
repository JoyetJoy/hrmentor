import React, { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import {
  customSelectResumeStyles,
  customSelectStyles,
  customSelectTransferStyles,
} from "@/utils/customStyles";
import { Link } from "react-router-dom";
import MenuHeader from "@/components/common/MenuHeader";
import { Mail, MapPin, Phone, SquarePen, X } from "lucide-react";
import Addtransfer from "@/components/popups/recruiter/candiadate/AddTransfer.jsx";

function CandidateProfile() {
  const options = [
    { value: "active", label: "Transfer to job" },
    { value: "paused", label: "Paused" },
    { value: "delayed", label: "Delayed" },
    { value: "canceled", label: "Canceled" },
  ];
  const [popupOpen, setPopupOpen] = useState(false);
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
        activeSubMenu={"Candidates"}
        activeMenu={"Candidates"}
      />

      <div className="mt-2 grid grid-cols-2 gap-7 rounded-md bg-white p-2 px-5 pb-12">
        <div className="">
          <h1 className="pt-3 text-base font-bold">Basic Details</h1>
          <div className="mt-4 grid w-full grid-cols-2 gap-5">
            <div className="col-span-2 flex justify-between">
              <h1 className="pt-3 text-base font-bold">Personal information</h1>
              <div className="flex gap-5">
                <div className="mb-3 flex h-10 min-h-10 items-center justify-between text-end text-sm font-medium text-black">
                  <Select
                    name="status"
                    aria-label="Project status "
                    styles={customSelectResumeStyles}
                    placeholder="Select Status"
                    className="flex flex-row justify-between rounded-md border border-[#ECBEBE] bg-[#FFF2F2] pl-10 text-end text-xs"
                  >
                    <option value="active">Consider</option>
                    <option value="paused">Paused</option>
                    <option value="delayed">Delayed</option>
                    <option value="canceled">Canceled</option>
                  </Select>
                </div>
                <div className="mb-3 flex items-center justify-between text-center text-sm font-medium text-black">
                  <Select
                    name="status"
                    aria-label="Project status"
                    options={options}
                    styles={customSelectTransferStyles}
                    className="flex flex-row justify-between rounded-md border bg-bgColor-100 pl-10 text-xs placeholder:text-white"
                    onChange={(selectedOption) => {
                      if (selectedOption.value === "active") {
                        setPopupOpen(true);
                      }
                    }}
                  />
                  <Addtransfer
                    popupOpen={popupOpen}
                    setPopupOpen={setPopupOpen}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 flex justify-between border-b border-t border-[#ECE9F1] py-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-[#F7F7F7] p-[0.4rem]">
                    <Phone className="size-4" />
                  </div>
                  <p className="text-sm">+91 7575757575 </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-[#F7F7F7] p-[0.4rem]">
                    <Mail className="size-4" />
                  </div>
                  <p className="text-sm">ganeshkumar2001@ gmail.com </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-[#F7F7F7] p-[0.4rem]">
                    <MapPin className="size-4" />
                  </div>
                  <p className="text-sm">Kerala, India </p>
                </div>
              </div>
              <div className="h-fit rounded-full bg-[#F7F7F7] p-[0.4rem]">
                <SquarePen className="size-4" />
              </div>
            </div>
            <div className="group flex flex-col gap-1">
              <label className="required label-text">Gender</label>
              <div className="mb-3 flex items-center justify-between text-sm font-medium text-black">
                <Select
                  name="status"
                  aria-label="Project status "
                  className="w-full rounded-md border-2 px-12 py-2 pl-3 text-xs text-[#7F7F7F] focus:border-gray-300"
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
            <div className="group flex flex-col gap-1">
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
            <div className="group flex flex-col gap-1">
              <label className="required label-text">Languages spoken</label>
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
            <div className="group flex flex-col gap-1">
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
            <div className="group flex flex-col gap-1">
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
            <div className="group flex flex-col gap-1">
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
          <div className="flex items-center pt-6 font-semibold text-white">
            <Link
              to={"/admin/recruiter/question-answers"}
              className="btn h-10 min-h-10 bg-[#181C3A] px-12 text-xs text-white hover:bg-bgColor-100"
            >
              Submit
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-between py-2">
            <h1 className="pb-1 pt-14 text-sm font-bold">Resume</h1>
            <h1 className="pb-1 pt-14 text-sm font-bold">
              <X />
            </h1>
          </div>
          <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-[#E6E3EB] py-2">
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

export default CandidateProfile;
