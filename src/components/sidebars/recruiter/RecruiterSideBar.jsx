import { Eye } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Select } from '@headlessui/react'


function RecruiterSideBar() {
    return (
        <div className='flex flex-col gap-2 bg-white p-7 rounded-md w-1/3 '>
            <div className='flex flex-row justify-between '>
                <h1 className='font-bold text-base '>Job information</h1>
                <div className='flex flex-row gap-2'>
                    <Link
                        to={""}
                        className="cursor-pointer flex items-center bg-gray-500 text-black p-2  size-8 rounded-full"
                    >
                        <Eye />
                    </Link>
                    <Link
                        to={""}
                        className="cursor-pointer flex items-center bg-gray-500 text-black p-2  size-8 rounded-full"
                    >
                        <img src="/assets/icons/admin/marker.svg" />
                    </Link>
                </div>
            </div>
            <hr className='border-gray-500 border-1 my-2' />
            <div className='grid grid-cols-3 gap-3'>
                <div className='bg-[#FBF0FF]  rounded-md '>
                    <h1 className='font-semibold text-xl flex flex-col items-center  px-4 py-7'>
                        2 <span  className='font-normal text-sm'>New</span>
                    </h1>
                </div>
                <div className='bg-[#FBF0FF]  rounded-md '>
                    <h1 className='font-semibold text-xl flex flex-col items-center  px-4 py-7'>
                        2 <span  className='font-normal text-sm'>New</span>
                    </h1>
                </div>
                <div className='bg-[#FBF0FF]  rounded-md '>
                    <h1 className='font-semibold text-xl flex flex-col items-center  px-4 py-7'>
                        2 <span className='font-normal text-sm'>New</span>
                    </h1>
                </div>
                <div className='bg-[#FBF0FF]  rounded-md '>
                    <h1 className='font-semibold text-xl flex flex-col items-center px-4 py-7'>
                        28 <span  className='font-normal text-sm'>New</span>
                    </h1>
                </div>
                <div className='bg-[#FBF0FF]  rounded-md '>
                    <h1 className='font-semibold text-xl flex flex-col items-center  px-4 py-7'>
                        2 <span  className='font-normal text-sm'>New</span>
                    </h1>
                </div>
                <div className='bg-[#FBF0FF]  rounded-md '>
                    <h1 className='font-semibold text-xl flex flex-col items-center  px-4 py-7'>
                        2 <span  className='font-normal text-sm'>New</span>
                    </h1>
                </div>
            </div>
            <hr className='border-gray-500 border-1 my-4' />
            <h1 className='flex justify-between items-center text-sm text-black font-medium'>
                Display on career page
                <input
                    type="checkbox"
                    className="toggle border-[#5264EA] bg-white [--tglbg:#5264EA] hover:bg-white"
                    defaultChecked
                />
            </h1>
            <hr className='border-gray-500 border-1 my-4' />
            <div className='flex justify-between items-center font-medium text-black text-sm  mb-3 '> Job status  
                  <Select name="status" aria-label="Project status " className="bg-[#EBEBF0] w-3/6 py-2 px-3  pl-3 rounded-md text-xs">
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                        <option value="delayed">Delayed</option>
                        <option value="canceled">Canceled</option>
                 </Select>
          </div>
          <div className='flex justify-between  font-medium text-black text-sm  mb-3 '> Hiring manager 
                  <Select name="status" aria-label="Project status" className="bg-[#EBEBF0] w-3/6 py-2 px-3  pl-3 rounded-md text-xs">
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                        <option value="delayed">Delayed</option>
                        <option value="canceled">Canceled</option>
                 </Select>
          </div>
          <div className='flex justify-between font-medium text-black text-sm'> Interviewer
                  <Select name="status" aria-label="Project status" className="bg-[#EBEBF0] w-3/6 py-2 px-3  pl-3 rounded-md text-xs">
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                        <option value="delayed">Delayed</option>
                        <option value="canceled">Canceled</option>
                 </Select>
          </div>
        </div>
    )
}

export default RecruiterSideBar
