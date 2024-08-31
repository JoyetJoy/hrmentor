import MenuHeader from '@/components/common/MenuHeader'
import CreateJobSideBar from '@/components/sidebars/recruiter/CreateJobSideBar'
import { customSelectStyles } from '@/utils/customStyles'
import { Disclosure, DisclosureButton, DisclosurePanel, Select } from '@headlessui/react'
import { ArrowLeft, ChevronRight, Eye, Search, X } from 'lucide-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Link } from 'react-router-dom'

function Application() {
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
    <div>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className='flex flex-row items-start justify-between gap-3'>
        <div className='w-full '>
          <div className='flex  items-center justify-between mt-1 mb-3 '>
            <h1 className='text-lg font-bold text-black flex flex-row gap-2 items-center justify-center'>
              <ArrowLeft className='size-5' />
              Create New Job  <div className=' w-[.07rem] h-4 bg-[#B0B0B0]'></div><span className='text-sm font-medium text-[#2C2C2C]'>Post</span>
            </h1>
            <Link to={"/admin/recruiter/team"} className=' btn text-white rounded-md bg-bgColor-100 px-8 hover:bg-bgColor-100 min-h-11 h-11'>Next</Link>
          </div>
          <div className='w-full bg-white rounded-md py-4 px-7  '>
            <div className='flex flex-row items-center justify-between'>
              <div className='flex flex-col gap-1'>
                <p className='text-base text-[#2C2C2C] font-medium'>Customize the application that candidate will complete when they apply.</p>
                <p className=' text-[#7F7F7F] text-sm text-medium ml-4'>All the preset questions and the custom questions for the application to make it easier to screen candidate later.</p>
              </div>
              <Link className="btn text-[#181C3A] flex  bg-white flex-row gap-2 items-center border border-[#181C3A]">
                <Eye className="size-4 " />
                Application Preview
              </Link>
            </div>
            <div className=' '>
              <p className="text-sm font-bold  flex flex-row items-center  gap-4  whitespace-nowrap  my-7">Job application
                <div className='h-px bg-[#ECE9F1] w-full'></div>
              </p>
              <div className='flex flex-col gap-1 mb-7'>
                <p className='font-medium text-[#2C2C2C] text-base'>Select the standard profile questions you want all candidate to answer.</p>
                <p className=' text-[#7F7F7F] text-sm text-medium ml-4'>Some field are required and cannot be removed from the application, while other field are optional, including the resume.</p>
              </div>
              <div className='flex flex-row gap-4 items-center '>
                <div className='border border-[#ECE9F1] rounded-md  w-full'>
                  <h1 className='text-sm text-[#181C3A] font-semibold bg-[#EBEBF0] px-5 py-5 rounded-t-sm'>Candidate profile questions</h1>
                  <div className=' flex flex-col gap-2 px-4 pt-4 pb-28'>
                    <label className="cursor-pointer label justify-between text-xs text-[#2C2C2C] font-medium bg-[#F5F5F7] px-4 py-3 rounded-sm">
                      <div className='flex flex-row gap-2 items-center '>
                        <input type="checkbox" defaultChecked className="checkbox checked:accent-slate-600 rounded-sm size-4" />
                        <span className="label-text">Do you have a valid driver's license?</span>
                      </div>
                      <X className='text-[#2C2C2C] size-4 border border-[#D0D0D0] rounded-sm ' strokeWidth={1} />
                    </label>
                    <label className="cursor-pointer label justify-between text-xs text-[#2C2C2C] font-medium bg-[#F5F5F7] px-4 py-3 rounded-sm">
                      <div className='flex flex-row gap-2 items-center '>
                        <input type="checkbox" className="checkbox checked:accent-slate-600 rounded-sm size-4" />
                        <span className="label-text">Do you have a valid driver's license?</span>
                      </div>
                      <X className='text-[#2C2C2C] size-4 border border-[#D0D0D0] rounded-sm ' strokeWidth={1} />
                    </label>
                    <label className="cursor-pointer label justify-between text-xs text-[#2C2C2C] font-medium bg-[#F5F5F7] px-4 py-3 rounded-sm">
                      <div className='flex flex-row gap-2 items-center '>
                        <input type="checkbox" className="checkbox checked:accent-slate-600 rounded-sm size-4" />
                        <span className="label-text">Do you have a valid driver's license?</span>
                      </div>
                      <X className='text-[#2C2C2C] size-4 border border-[#D0D0D0] rounded-sm ' strokeWidth={1} />
                    </label>
                    <label className="cursor-pointer label justify-between text-xs text-[#2C2C2C] font-medium bg-[#F5F5F7] px-4 py-3 rounded-sm">
                      <div className='flex flex-row gap-2 items-center '>
                        <input type="checkbox" className="checkbox checked:accent-slate-600 rounded-sm size-4" />
                        <span className="label-text">Do you have a valid driver's license?</span>
                      </div>
                      <X className='text-[#2C2C2C] size-4 border border-[#D0D0D0] rounded-sm ' strokeWidth={1} />
                    </label>
                  </div>
                </div>
                <div className='border border-[#ECE9F1] rounded-md  w-full'>
                  <h1 className='text-sm text-[#181C3A] font-semibold bg-[#EBEBF0] px-5 py-5 rounded-t-sm'>Select profile questions</h1>
                  <div className=' flex flex-col gap-2 px-4 pt-4 pb-6'>
                    <label className="cursor-pointer label justify-between text-xs text-[#2C2C2C] font-medium bg-[#F5F5F7] px-4 py-3 rounded-sm">
                      <div className='flex flex-row gap-2 items-center '>
                        <input type="checkbox" defaultChecked className="checkbox checked:accent-slate-600 rounded-sm size-4" />
                        <span className="label-text">Add ID card</span>
                      </div>
                    </label>
                    <label className="cursor-pointer label justify-between text-xs text-[#2C2C2C] font-medium bg-[#F5F5F7] px-4 py-3 rounded-sm">
                      <div className='flex flex-row gap-2 items-center '>
                        <input type="checkbox" className="checkbox checked:accent-slate-600 rounded-sm size-4" />
                        <span className="label-text">What is your nationality?</span>
                      </div>
                    </label>
                    <label className="cursor-pointer label justify-between text-xs text-[#2C2C2C] font-medium bg-[#F5F5F7] px-4 py-3 rounded-sm">
                      <div className='flex flex-row gap-2 items-center '>
                        <input type="checkbox" className="checkbox checked:accent-slate-600 rounded-sm size-4" />
                        <span className="label-text">Lorem ipsum?</span>
                      </div>
                    </label>
                    <label className="cursor-pointer label justify-between text-xs text-[#2C2C2C] font-medium bg-[#F5F5F7] px-4 py-3 rounded-sm">
                      <div className='flex flex-row gap-2 items-center '>
                        <input type="checkbox" className="checkbox checked:accent-slate-600 rounded-sm size-4" />
                        <span className="label-text">Lorem ipsum sit amet?</span>
                      </div>
                    </label>
                    <Link className='btn bg m-auto bg-[#181C3A] hover:bg-[#181C3A] text-white px-12 mt-8'>Update</Link>
                  </div>
                </div>
              </div>
              <div>
                <Disclosure as="div" className="" defaultOpen={false}>
                  <DisclosureButton className="group flex w-full items-center my-14 gap-x-2 font-bold">
                    <div className="bg-[#F7F7F7] size-5 flex justify-center items-center rounded-full">
                      <ChevronRight className="size-6 group-data-[open]:rotate-90 group-data-[hover]:text-black/50" />
                    </div>
                    <p className="text-sm flex flex-row items-center w-full whitespace-nowrap gap-1">Screening questionnaire(Opational)<div className='h-px bg-[#ECE9F1] w-full'></div>
                    </p>
                  </DisclosureButton>
                  <DisclosurePanel className="  text-sm/5 text-black/50">
                    <div>
                      <div className='flex flex-col gap-1 mb-10'>
                        <p className='text-base text-[#2C2C2C] font-medium'>Get answer to job-specific questions by attaching a questionnaire.</p>
                        <p className=' text-[#7F7F7F] text-sm text-medium '>Questionnaire are reusable template that can be attached to the job application or Sent to candidates after they apply</p>
                      </div>
                      <div className='flex flex-row items-start justify-between  mt-3 gap-8'>
                        <div className='w-full'>
                          <h1 className='text-[#2C2C2C] text-sm font-bold mb-5'>Create questionnaire </h1>
                          <div className="flex  group flex-col gap-1  py-2  ">
                            <label className="label-text text-s font-medium">
                              Name the questionnaire
                            </label>
                            <input
                              autoComplete="off"
                              type="text"
                              placeholder="Type Here"
                              {...register("employeeId", { required: true })}
                              className="input-box h-10 w-full focus:border-gray-300 placeholder:text-[#7F7F7F] placeholder:text-xs"
                            />
                            {errors.employeeId && (
                              <span className="text-xs font-medium text-red-500">
                                {errors.employeeId?.message}
                              </span>
                            )}
                            <label className="cursor-pointer label justify-normal text-xs gap-1">
                              <input type="checkbox" className="checkbox checked:accent-slate-600 rounded-sm size-4" />
                              <span className="label-text text-xs">Required an answer to this question</span>
                            </label>
                          </div>
                          <div className="flex  group flex-col py-2 gap-1">
                            <label

                              className="label-text"
                            >
                              Answer type
                            </label>
                            <Controller
                              name="answer"
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
                                  placeholder="Select"
                                  className="input-box h-10 w-full focus:border-gray-300 placeholder:text-[#7F7F7F] placeholder:text-xs "
                                />
                              )}
                            />
                            {errors.answer && (
                              <span className="text-xs font-medium text-red-500">
                                {errors.answer?.message}
                              </span>
                            )}
                          </div>
                          <div className='flex flex-row items-center justify-between mt-6'>
                            <Link to={""} className='btn border border-[#ECE9F1] text-[#7F7F7F] px-12 min-h-11 h-11 bg-white hover:bg-white hover:border-[#ECE9F1] '>Clear</Link>
                            <Link to={""} className='btn bg-bgColor-100 hover:bg-bgColor-100 text-white px-12 min-h-11 h-11'>Create</Link>
                          </div>
                        </div>
                        <div className='border border-[#ECE9F1] rounded-md w-full '>
                          <h1 className='text-sm text-[#181C3A] font-semibold bg-[#EBEBF0] px-5 py-5 rounded-t-sm'>Candidate profile questions</h1>
                          <div className='  px-4 py-20 min-h-60 h-60'>
                            <p className='text-center my'>
                              The questions you have created <br />
                              will appear here
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
        <CreateJobSideBar />
      </div>
    </div>
  )
}

export default Application
