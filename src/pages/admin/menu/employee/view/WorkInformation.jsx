import React from "react";
import { ArrowLeft, ChevronRight, Plus } from "lucide-react";
import { Select } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { customSelectStyles } from "@/utils/customStyles";
import EmployeeHeader from "@/components/common/EmployeeHeader";
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
              className=" grid grid-cols-2 gap-x-3 py-2"
            >
              <div className="flex flex-col items-baseline  h-screen px-3 py-4 rounded-md h- bg-white border border-gray-300">
                <h1 className="font-bold text-lg px-3 text-[#2C2C2C]">Reporting to</h1>
                <div className="grid w-full items-start grid-cols-2 gap-y-2 mt-4 ">
                  <div className="flex px-3 group flex-col space-y-2 ">
                    <label className="label-text ">
                      Reporting Manager <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="designation"
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
                          placeholder="Select Designation"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                  </div>
                  <div className="flex px-3 group flex-col space-y-2">
                    <label className="label-text">
                      HR Manager<span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="designation"
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
                          placeholder="Select Designation"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col  px-5 py-4 rounded-md bg-white border border-[#EBEBF0]">
                <h1 className="font-bold text-lg px-3 #2C2C2C">EEO Details</h1>

                <div
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid w-full grid-cols-2 gap-x-2 mt-4 "
                >
                  <div className="flex px-3 group flex-col py-2">
                    <label className="label-text  flex items-center gap-1"> Ethnicity

                    </label>
                    <Controller
                      name="designation"
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
                          placeholder="Select Designation"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.designation && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.designation?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2">
                    <label className="label-text  flex items-center gap-1">EEO Job Category
                    <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="designation"
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
                          placeholder="Select Designation"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.designation && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.designation?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2">
                    <label className="label-text flex items-center gap-1">
                    Probation Period(In Days)
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("department", { required: true })}
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                    {errors.department && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.department?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2">
                    <label className="label-text flex items-center gap-1">
                    Notice Period(In Days)
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("department", { required: true })}
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                    {errors.department && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.department?.message}
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
