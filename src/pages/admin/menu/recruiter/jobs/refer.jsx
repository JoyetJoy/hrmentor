import MenuHeader from '@/components/common/MenuHeader'
import RecruiterHeader from '@/components/common/RecruiterHeader'
import RecruiterSideBar from '@/components/sidebars/recruiter/RecruiterSideBar'
import { customSelectStyles } from '@/utils/customStyles'
import { Button, Select } from '@headlessui/react'
import { ArrowLeft, Send } from 'lucide-react'
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
        
        <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className='flex flex-row justify-between items-center my-5'>
        <h1 className='font-semibold text-base flex items-center gap-1 '>
          <ArrowLeft className="size-4" />
          Project manger</h1>
        <div className='flex gap-5 '>
          <Link to="/admin/recruiter/candidate" className='text-sm font-medium text-gray-200'>Candidate</Link>
          <Link to="/admin/recruiter/promote" className='text-sm  font-medium text-gray-200'>Promote</Link>
          <Link to="/admin/recruiter/refer" className='text-sm font-extrabold text-btncolor'>Refer</Link>
        </div>
      </div>
      <div className='flex flex-row gap-2 my-3'>
        <RecruiterSideBar />
        <div className='bg-white w-full rounded-md p-6 '>
          <h1 className='text-base font-semibold mb-4'>Refer</h1>
          <div className=' flex flex-col  gap-5 items-baseline'>
            <div className='w-full h-full flex flex-col gap-1'>
            <label className="label-text ">Subject</label>
            <input
              type="text"
              className="input-box h-10 w-3/5 border-2 border-[#C2C1C1] focus:border-[#C2C1C1]"
            />
            </div>
          <div className='w-full h-full flex flex-col gap-1'>
          <label className="label-text">Choose Template</label>
          <Select placeholder="Select the item" className=" input-box h-9 border-2 border-[#C2C1C1] focus:border-[#C2C1C1]  w-1/3"></Select>
          </div>
          <div className='w-full h-full flex flex-col gap-1'>
            <label className="label-text ">Recipient</label>
            <input
              type="text"
               placeholder='Enter the email '
              className="input-box h-12 w-3/5 border-2 border-[#C2C1C1] focus:border-[#C2C1C1] placeholder:text-[#C2C1C1]"
            >
            </input>
            </div>
         <div className='w-full h-full flex flex-col gap-1'>
          <label className='label-text'>Message</label>
         <textarea className=' input-box border-2 border-[#C2C1C1] focus:border-[#C2C1C1]  w-3/5 h-40'></textarea>
         </div>
          </div>
          <Link to={"/admin/recruiter/job-details"} className=" btn bg-bgColor-100 hover:bg-bgColor-100 flex flex-row w-32 text-sm font-normal mt-14 text-white gap-2"> <Send className="text-white size-4" strokeWidth={1}/> Send</Link>
        </div>


      </div>

    </div>
  )
}

export default Refer
