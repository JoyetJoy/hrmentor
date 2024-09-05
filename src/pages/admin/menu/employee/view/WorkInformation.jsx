import React from "react";
import { ArrowLeft, ChevronRight, Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Select from 'react-select'
import { customSelectStyles } from "@/utils/customStyles";
import EmployeesSidebar from "@/components/sidebars/employee/EmployeesSidebar";
import MenuSubHeader from "@/components/common/MenuSubHeader";
import MenuHeader from "@/components/common/MenuHeader";

export const WorkInformation = () => {
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
    <div className=" flex flex-col">
      <MenuHeader
      menu={"Menu"}
      subMenu={"Employee"}
      currentpath={"Employee Detail"}
      icon={<ChevronRight className="size-3" />}
      activeMenu={'Employees'}
      />
      {/* ----sidebar---- */}
      <div className="flex gap-x-3">
        <EmployeesSidebar />
        <div className=" w-full bg">
          <>
            {/* <div className="flex flex-row justify-between items-center">
              <h1 className="font-bold text-lg  mb-3">Work  Information</h1>
              <div className="text-white font-semibold flex  items-center gap-2 ">
                <Link
                  to={""}
                  className="btn bg-btncolor text-white hover:bg-btncolor w-full text-sm  flex items-center gap-1"
                >
                 
                  Add Work</Link>
              </div>
            </div> */}
            <MenuSubHeader
                heading={"Work  Information"}
                FirstLink={{ label:"Update"}}
                />
            <div
              onSubmit={handleSubmit(onSubmit)}
              className=" grid grid-cols-2 gap-x-3 pt-2"
            >
              <div className="flex flex-col items-baseline  h-screen px-3 py-4 rounded-md h- bg-white border border-gray-300">
                <h1 className="font-bold  flex flex-row items-center  w-full justify-between text-lg px-3 text-[#2C2C2C]">Reporting to   
                   <div className="flex gap-1.5 items-center">
                  <input
                    type="checkbox"
                    // onChange={handleAdressCheckbox}
                    name=""
                    id=""
                    className="text-[#848484]  size-4"
                  />
                  <p className="whitespace-nowrap text-[13px] font-normal text-[#848484] ">
                  Doesn't report to anyone
                  </p>
                </div></h1>
                <div className="grid w-full items-start grid-cols-2 gap-y-2 mt-4 ">
                <div className="group flex flex-col gap-1 px-2 py-2">
              <label
                onClick={() => setPopupOpen(true)}
                className="required label-text"
              >
Reporting Manager              </label>
              <Controller
                name="reportingManager"
                className=""
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    // required
                    //   selected={''}
                    // value={''}
                    //   onChange={(selectedOption) => {
                    //     handle(selectedOption);
                    //     field.onChange(selectedOption);
                    //   }}
                    //   options={}
                    isSearchable={false}
                    styles={customSelectStyles}
                    placeholder="Select Reporting Manger"
                    className="input-box h-10 w-full   rounded-md placeholder:text-sm placeholder:text-[#7F7F7F] border-[#A7A7A7] focus:border-[#A7A7A7]"
                  />
                )}
              />
              {errors.reportingManager && (
                <span className="text-xs font-medium text-red-500">
                  {errors.reportingManager?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1 px-2 py-2">
              <label
                onClick={() => setPopupOpen(true)}
                className="required label-text"
              >
                HR Manager
              </label>
              <Controller
                name="hrManager"
                className=""
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    // required
                    //   selected={''}
                    // value={''}
                    //   onChange={(selectedOption) => {
                    //     handle(selectedOption);
                    //     field.onChange(selectedOption);
                    //   }}
                    //   options={}
                    isSearchable={false}
                    styles={customSelectStyles}
                    placeholder="Select HR Manager"
                    className="input-box h-10 w-full   rounded-md placeholder:text-sm placeholder:text-[#7F7F7F] border-[#A7A7A7] focus:border-[#A7A7A7]"
                  />
                )}
              />
              {errors.hrManager && (
                <span className="text-xs font-medium text-red-500">
                  {errors.hrManager?.message}
                </span>
              )}
            </div>
                </div>
              </div>
              <div className="flex flex-col  px-5 py-4 rounded-md bg-white border border-[#EBEBF0]">
                <h1 className="font-bold text-lg px-3 #2C2C2C">EEO Details</h1>

                <div
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid w-full grid-cols-2 gap-x-2 mt-4 "
                >
                  <div className="group flex flex-col gap-1 px-2 py-2">
              <label
                onClick={() => setPopupOpen(true)}
                className=" label-text"
              >
Ethnicity              </label>
              <Controller
                name="ethnicity"
                className=""
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    // required
                    //   selected={''}
                    // value={''}
                    //   onChange={(selectedOption) => {
                    //     handle(selectedOption);
                    //     field.onChange(selectedOption);
                    //   }}
                    //   options={}
                    isSearchable={false}
                    styles={customSelectStyles}
                    placeholder="Select Name"
                    className="input-box h-10 w-full   rounded-md placeholder:text-sm placeholder:text-[#7F7F7F] border-[#A7A7A7] focus:border-[#A7A7A7]"
                  />
                )}
              />
              {errors.ethnicity && (
                <span className="text-xs font-medium text-red-500">
                  {errors.ethnicity?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1 px-2 py-2">
              <label
                onClick={() => setPopupOpen(true)}
                className="required label-text"
              >
                EEO Job Category
              </label>
              <Controller
                name="jobCategory"
                className=""
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    // required
                    //   selected={''}
                    // value={''}
                    //   onChange={(selectedOption) => {
                    //     handle(selectedOption);
                    //     field.onChange(selectedOption);
                    //   }}
                    //   options={}
                    isSearchable={false}
                    styles={customSelectStyles}
                    placeholder="Select Job Catrgory"
                    className="input-box h-10 w-full   rounded-md placeholder:text-sm placeholder:text-[#7F7F7F] border-[#A7A7A7] focus:border-[#A7A7A7]"
                  />
                )}
              />
              {errors.jobCategory && (
                <span className="text-xs font-medium text-red-500">
                  {errors.jobCategory?.message}
                </span>
              )}
            </div>
            <div className="group flex flex-col gap-1 px-2 py-2">
              <label className=" label-text"> Probation Period (In Days)
              </label>
              <input
                autoComplete="off"
                type="text"
                placeholder="Enter details"
                {...register("firstName", { required: true })}
                className="input-box h-10 w-full   rounded-md placeholder:text-sm placeholder:text-[#7F7F7F] border-[#A7A7A7] focus:border-[#A7A7A7]"
              />
              {errors.firstName && (
                <span className="text-xs font-medium text-red-500">
                  {errors.firstName?.message}
                </span>
              )}
            </div>
                  <div className="group flex flex-col gap-1 px-2 py-2">
              <label className=" label-text"> Notice Period(In Days)
              </label>
              <input
                autoComplete="off"
                type="text"
                placeholder="Enter details"
                {...register("firstName", { required: true })}
                className="input-box h-10 w-full   rounded-md placeholder:text-sm placeholder:text-[#7F7F7F] border-[#A7A7A7] focus:border-[#A7A7A7]"
              />
              {errors.firstName && (
                <span className="text-xs font-medium text-red-500">
                  {errors.firstName?.message}
                </span>
              )}
            </div>

              
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};
