import { customSelectStyles } from '@/utils/customStyles';
import { Disclosure, DisclosureButton, DisclosurePanel, Select } from '@headlessui/react'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

function PostList() {
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
        <div className='pb-16'>
            <Disclosure as="div" className=" px-5 py-2" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center gap-x-2 ">
                    <div className="bg-[#F7F7F7] size-5 flex justify-center items-center rounded-full">
                        <ChevronRight className="size-4 group-data-[open]:rotate-90 " />
                    </div>
                    <p className="text-sm font-semibold  flex flex-row  whitespace-nowrap">Advanced job details </p>
                    <div className='h-px bg-[#ECE9F1] w-full'></div>

                </DisclosureButton>
                <DisclosurePanel className=" my-4 text-sm/5 text-black/50">

                    <div className='grid  grid-cols-2 items-center justify-center w-8/12 gap-y-2 mt-4'>
                        <div className="flex px-3 group flex-col py-2 space-y-1">
                            <label className="label-text ">
                                Job code
                            </label>
                            <input
                                autoComplete="off"
                                type="text"
                                placeholder='Generate'
                                className="input-box h-10 w-full focus:border-gray-300 placeholder:text-right placeholder:text-red-500
                      
                      "
                            />
                            {errors.jobcode && (
                                <span className="text-xs font-medium text-red-500">
                                    {errors.jobcode?.message}
                                </span>
                            )}
                        </div>
                        <div className="flex px-3 group flex-col py-2 space-y-1">
                            <label className="label-text ">
                                Salary Package
                            </label>
                            <Controller
                                name="salarypackage"
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
                                        placeholder="Not Mention Package"
                                        className="input-box h-10 w-full focus:border-gray-300"
                                    />
                                )}
                            />
                            {errors.salarypackage && (
                                <span className="text-xs font-medium text-red-500">
                                    {errors.salarypackage?.message}
                                </span>
                            )}
                        </div>


                    </div>
                    <div className="flex px-3 group flex-col py-2 space-y-1 w-8/12 ">
                        <label className="label-text ">
                            Reason
                        </label>
                        <input
                            autoComplete="off"
                            type="text"
                            // placeholder='Enter the reason'
                            className="input-box h-20 w-full text-justify border-2 focus:border-gray-300 placeholder:text-start 
                      
                      "
                        />
                        {errors.reason && (
                            <span className="text-xs font-medium text-red-500">
                                {errors.reason?.message}
                            </span>
                        )}
                    </div>
                    {/* <QueryTable columns={columns} list={list} /> */}

                </DisclosurePanel>
            </Disclosure>
            <Disclosure as="div" className="px-5  py-2" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center gap-x-2 ">
                    <div className="bg-[#F7F7F7] size-5 flex justify-center items-center rounded-full">
                        <ChevronRight className="size-4 group-data-[open]:rotate-90 " />
                    </div>
                    <p className="text-sm font-semibold  flex flex-row  whitespace-nowrap ">Sensitive data</p>
                    <div className='h-px bg-[#ECE9F1] w-full'></div>

                </DisclosureButton>
                <DisclosurePanel className=" my-4 text-sm/5 text-black/50">
                    <div>
                        <p className='px-3 text-sm my-8'>This section is visible to Admins, Hiring Managers, And User with sensitive data privilege.</p>
                        <div className='grid  grid-cols-2 items-center justify-center w-8/12 gap-y-2 mt-4'>
                            <div className="flex px-3 group flex-col py-2 space-y-1">
                                <label className="label-text ">
                                    Salary Type
                                </label>
                                <Controller
                                    name="salarypackage"
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
                                            placeholder="Not Mention Package"
                                            className="input-box h-10 w-full focus:border-gray-300"
                                        />
                                    )}
                                />
                                {errors.salarypackage && (
                                    <span className="text-xs font-medium text-red-500">
                                        {errors.salarypackage?.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex px-3 group flex-col py-2 space-y-1">
                                <label className="label-text ">
                                    Salary Range(Internal Only )
                                </label>
                                <div className='flex items-center gap-3'>
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        placeholder='Minimum range'
                                        className="input-box h-10 w-full focus:border-gray-300   placeholder:text-gray-200
                      
                      "
                                    />
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        placeholder='Maximum range'
                                        className="input-box h-10 w-full focus:border-gray-300  placeholder:text-gray-200
                      
                      "
                                    />
                                </div>

                                {errors.jobcode && (
                                    <span className="text-xs font-medium text-red-500">
                                        {errors.jobcode?.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex px-3 group flex-col py-2 space-y-1 w-full ">
                            <label className="label-text ">
                                Internal Note
                            </label>
                            <textarea
                                autoComplete="off"
                                type="text"
                                // placeholder='Enter the reason'
                                className="input-box h-20 w-full text-justify border-2 focus:border-gray-300 placeholder:text-start 
                      
                      "
                            />
                            {errors.note && (
                                <span className="text-xs font-medium text-red-500">
                                    {errors.note?.message}
                                </span>
                            )}
                        </div>
                        {/* <QueryTable columns={columns} list={list} /> */}
                    </div>
                </DisclosurePanel>
            </Disclosure>
            <Disclosure as="div" className="px-5  py-2" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center gap-x-2 ">
                    <div className="bg-[#F7F7F7] size-5 flex justify-center items-center rounded-full">
                        <ChevronRight className="size-4 group-data-[open]:rotate-90 " />
                    </div>
                    <p className="text-sm font-semibold  flex flex-row  whitespace-nowrap ">Exposure</p>
                    <div className='h-px bg-[#ECE9F1] w-full'></div>

                </DisclosureButton>
                <DisclosurePanel className=" my-4 text-sm/5 text-black/50">
                    <div>
                        <div className="flex group flex-col py-2 space-y-1 w-full ">
                            <label className="label-text text-sm font-normal text-textcolor-400  ">
                                Meta Title</label>
                            <input
                                autoComplete="off"
                                type="text"
                                // placeholder='Enter the reason'
                                className="input-box h-10 w-full text-justify border-2 focus:border-gray-300 placeholder:text-start 
                      
                      "
                            />
                            {errors.note && (
                                <span className="text-xs font-medium text-red-500">
                                    {errors.note?.message}
                                </span>
                            )}
                        </div>
                        <div className="flex group flex-col py-2 space-y-1 w-full mb-4 ">
                            <label className="label-text  text-sm  font-normal text-textcolor-400">
                                Search Engine Description
                            </label>
                            <input
                                autoComplete="off"
                                type="text"
                                //   placeholder='Write a short compelling description to help candidates find the job through search engine.'
                                className="input-box h-20 w-full  text-justify border-2 focus:border-gray-300  placeholder:text-start  "
                            />
                            {errors.note && (
                                <span className="text-xs font-medium text-red-500">
                                    {errors.note?.message}
                                </span>
                            )}


                        </div>
                        <div className="form-control">
                            <h1 className=' text-textcolor-400 text-sm  my-2 font-normal'>Career page</h1>
                            <label className="cursor-pointer label justify-normal gap-4 ">
                                <input type="checkbox" className="checkbox size-4 rounded-sm" />
                                <span className="label-text text-sm text-gary-200">Show these in career page?</span>

                            </label>
                        </div>
                        {/* <QueryTable columns={columns} list={list} /> */}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </div>
    )
}

export default PostList
