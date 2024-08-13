import RecruiterSideBar from '@/components/sidebars/recruiter/RecruiterSideBar'
import { customSelectStyles } from '@/utils/customStyles'
import { Select } from '@headlessui/react'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

function Refer() {
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    // resolver: yupResolver(schema),
  });
  return (
    <div>
          <div className='flex flex-row justify-between items-center mt-3 mb-5'>
                <h1 className='font-semibold text-base flex items-center gap-1 '>
                    <ArrowLeft className="size-4" />
                    Project manger</h1>
                <div className='flex gap-5 '>
                    <Link to="/admin/recruiter/candidate" className='text-sm font-semibold text-gray-200'>Candidate</Link>
                    <Link to="/admin/recruiter/promote" className='text-sm  font-semibold text-gray-200'>Promote</Link>
                    <Link to="/admin/recruiter/refer" className='text-sm font-extrabold text-btncolor'>Refer</Link>
                </div>
            </div>
            <div className='flex flex-row gap-2 my-3'>
            <RecruiterSideBar />
            <div className='bg-white w-full rounded-md p-6 '>
                    <h1 className='text-lg font-extrabold mb-4'>Refer</h1>
                    <div className=' flex flex-col  items-baseline'>

                    <label className="label-text mb-1">Subject</label>
                    <input
                      type="text"
                      className="input-box h-10 w-3/5 border-2 border-[#C2C1C1] focus:border-[#C2C1C1]"
                    />
                    <div className="flex group flex-col py-2 space-y-1 w-1/3">
                    <label className="label-text">Marital status</label>
                    <Select className=" input-box h-9 border-2 border-[#C2C1C1] focus:border-[#C2C1C1]"></Select>
                    {/* <Controller
                      name="maritalstatus"
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
                          placeholder="Select Marital status"
                          className="input-box h-10 w-11/12 border-2 border-[#C2C1C1] focus:border-[#C2C1C1]"
                        />
                      )}
                    />
                    {errors.maritalstatus && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.maritalstatus?.message}
                      </span>
                    )} */}
                  </div>
                  <div className='flex flex-col '>
                    <label>Message</label>
                    <textarea className=' border-2 border-[#C2C1C1] '></textarea>
                  </div>
                    </div>
                </div>


            </div>
      
    </div>
  )
}

export default Refer
