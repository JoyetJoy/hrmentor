import RecruiterHeader from '@/components/common/RecruiterHeader'
import CreateJobSideBar from '@/components/sidebars/recruiter/CreateJobSideBar'
import { customSelectStyles } from '@/utils/customStyles'
import { Disclosure, DisclosureButton, DisclosurePanel, Select } from '@headlessui/react'
import { ArrowLeft, ArrowUpFromLine, ChevronRight } from 'lucide-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

function Post() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  const onSubmit = (data) => {
    setLoader(true);
    handleEmployee(data);
  };
  return (
    <div>
      <RecruiterHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        pageHeading={"Dashbord"}
        currentpath={"Recruiter"}
        firstLink={"Dashbord"}
        secondLink={"Jobs"}
        thirdLink={"Candidate"}
        fourthLink={"Interview"}
        fifthLink={"Report"}
        six={"Setttings"}
      />
      <div className='flex flex-row items-start justify-between gap-3'>
        <div className='w-full'>
          <div className='flex flex-row items-center justify-between mt-1 mb-3 '>
            <h1 className='text-base font-bold text-black flex flex-row gap-1 items-center justify-center'> <ArrowLeft className='size-4' />
              Create New Job  <span className='text-xs  '> Post</span></h1>
            <Link to="" className=' btn text-white bg-bgColor-100 hover:bg-bgColor-100 min-h-10 h-10'>Next</Link>
          </div>
          <div className='w-full bg-white rounded-md'>
            <div
              onSubmit={handleSubmit(onSubmit)}
              className=" grid grid-cols-1 gap-x-3 py-2"
            >
              <div className="flex flex-col items-baseline justify-center st px-5 py-4 rounded-md ">
                    <div className='grid w-full grid-cols-3 items-center justify-center gap-y-2 mt-4'>
                    <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">
                      Job title <span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      {...register("jobtitle", { required: true })}
                      className="input-box h-10 w-full border-2 focus:border-gray-300"
                    />
                    {errors.jobtitle && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.jobtitle?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1 ">
                    <label className="label-text">
                      Image
                    </label>
                    <Link to="" className='bg-[#D9D9D933] h-10 min-h-10 text-center rounded-md text-sm flex flex-row gap-2 items-center justify-center '>     <ArrowUpFromLine className="size-4" strokeWidth={1} />
                      Upload Image</Link>
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text flex flex-row items-center gap-1">
                      Employement type <span className="text-red-500">*</span>
                      <h6 className='text-blue-700 font-bold'>(Create)</h6>
                    </label>
                    <Controller
                      name="employementye"
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
                    {errors.employementye && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.employementye?.message}
                      </span>
                    )}
                  </div>

                    </div>
                    <div className='grid w-full grid-cols-3 items-center justify-center gap-y-2 mt-4'>
                    <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text flex flex-row items-center gap-1">
                      Minimum Experience <span className="text-red-500">*</span>
                      <h6 className='text-blue-700 font-bold'>(Create)</h6>
                    </label>
                    <Controller
                      name="miniexperience"
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
                          placeholder="Select minimum experience+"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.miniexperience && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.miniexperience?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text flex flex-row items-center gap-1">
                      Employee Designation <span className="text-red-500">*</span>
                      <h6 className='text-blue-700 font-bold'>(Create)</h6>
                    </label>
                    <Controller
                      name="employeedesignation"
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
                          placeholder="Select minimum experience+"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.employeedesignation && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.employeedesignation?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text flex flex-row items-center gap-1">
                      Department or Business Unit
                      <h6 className='text-blue-700 font-bold'>(Create)</h6>
                    </label>
                    <Controller
                      name="departmentbusiness"
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
                          placeholder="Select minimum experience+"
                          className="input-box h-10 w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.departmentbusiness && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.departmentbusiness?.message}
                      </span>
                    )}
                  </div>
                    </div>
                  <div  className='flex flex-row items-center gap-y-2 mt-4  w-full'>
                  <div className="flex px-3 group flex-col py-2 space-y-1 w-8/12 ">
                    <label className="label-text flex flex-row items-center gap-1">
                      Job description <h6 className='text-blue-700 font-bold'>(Create)</h6>
                    </label>
                    <Controller
                      name="jobdiscription"
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
                          placeholder="Select minimum experience+"
                          className="input-box h-10  border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.jobdiscription && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.jobdiscription?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1 w-4/12 ">
                    <label className="label-text">
                      Upload
                    </label>
                    <Link to="" className='bg-[#D9D9D933] h-10 min-h-10 text-center rounded-md text-sm flex flex-row gap-2 items-center justify-center '>     <ArrowUpFromLine className="size-4" strokeWidth={1} />
                      update Job Description</Link>
                  </div>
                  </div>
                  <div className='grid w-full grid-cols-3 items-center justify-center gap-y-2 mt-4'>
                  <div className="flex px-3 group flex-col py-2 space-y-1  ">
                    <label className="label-text flex flex-row items-center gap-1">
                      State,Province or territory
                    </label>
                    <Controller
                      name="territory"
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
                          placeholder="Select minimum experience+"
                          className="input-box h-10  w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.territory && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.territory?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1 ">
                    <label className="label-text flex flex-row items-center gap-1">
                     City or Town
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
                          placeholder="Select minimum experience+"
                          className="input-box h-10  w-full border-2 focus:border-gray-300"
                        />
                      )}
                    />
                    {errors.city && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.city?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1">
                    <label className="label-text">
                      Postal Code
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="input-box h-10 w-full border-2 focus:border-gray-300
                      "
                    />
                    {errors.postalcode && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.postalcode?.message}
                      </span>
                    )}
                  </div>
                  </div>
                  <div className="flex px-3 group flex-col py-2 space-y-1 w-full">
                    <label className="label-text">
                      Work type 
                    </label>
                   <div className='flex flex-row items-start gap-4 '>
                        <label className="label cursor-pointer flex flex-row items-center justify-start border-2 border-[#C7C7C7]  focus:border-[#C7C7C7] rounded-md gap-3  w-2/12">
                          <input type="checkbox" defaultChecked className="checkbox h-4 w-4 rounded-sm accent-bgColor-100 checked:accent-bgColor-100" />
                          <span className="label-text  whitespace-nowrap text-gray-200 text-xs">Remote(work from office)</span>
                        </label>
                        <label className="label cursor-pointer flex flex-row items-center  border-2 justify-start border-[#C7C7C7]  focus:border-[#C7C7C7] rounded-md gap-3  w-2/12 ">
                          <input type="checkbox"  className="checkbox h-4 w-4 rounded-sm accent-bgColor-100 checked:accent-bgColor-100" />
                          <span className="label-text  whitespace-nowrap text-gray-200 text-xs">Work from office</span>
                        </label>
                        <label className="label cursor-pointer flex flex-row items-center  border-2 justify-start border-[#C7C7C7]  focus:border-[#C7C7C7] rounded-md gap-3  w-2/12">
                          <input type="checkbox"  className="checkbox h-4 w-4 rounded-sm accent-bgColor-100 checked:accent-bgColor-100" />
                          <span className="label-text  whitespace-nowrap text-gray-200 text-xs">Hybrid</span>
                        </label>
                   </div>
                    {errors.jobtitle && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.jobtitle?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <Disclosure>
            <DisclosureButton className="py-2 flex">
            <div className="bg-[#F7F7F7] size-5 flex justify-center items-center rounded-full">
                    <ChevronRight className="size-6 group-data-[open]:rotate-90 group-data-[hover]:text-black/50" />
                  </div> 
              Is team pricing available?</DisclosureButton>
            <DisclosurePanel className="text-gray-500">
              Yes! You can purchase a license that you can share with your entire team.
            </DisclosurePanel>
          </Disclosure> */}
          </div>
          <CreateJobSideBar/>

        </div>
      </div>

  )
}

export default Post
