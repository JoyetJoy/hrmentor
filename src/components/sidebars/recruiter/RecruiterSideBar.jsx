import { Eye } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function RecruiterSideBar() {
  return (
    <div className='flex flex-col gap-2 bg-white p-7 rounded-md my-3 '>
        <div className='flex flex-row justify-between '>
            <h1 className='font-bold text-xl '>Job information</h1>
            <div className='flex flex-row gap-2'>
                <Link
                to={""}
                className="cursor-pointer flex items-center bg-gray-500 text-black p-2  size-8 rounded-full"
                >
                <Eye/>
                </Link>
                <Link
                to={""}
                className="cursor-pointer flex items-center bg-gray-500 text-black p-2  size-8 rounded-full"
                >
                <img src="/assets/icons/admin/marker.svg" />
                </Link>
            </div>
        </div>
        <hr className='border-gray-500 border-1 my-2'/>
        <div className='grid grid-cols-3 gap-2'>
            <div className='bg-red-200  rounded-md '>
                <h1 className='font-sm text-xl flex flex-col items-center p-6'>
                  2 <span>New</span>
                </h1>
            </div>
            <div className='bg-red-200  rounded-md '>
            <h1 className='font-sm text-xl flex flex-col items-center p-6'>
                  2 <span>New</span>
                </h1>
            </div>
            <div className='bg-red-200  rounded-md '>
            <h1 className='font-sm text-xl flex flex-col items-center p-6'>
                  2 <span>New</span>
                </h1>
            </div>
            <div className='bg-red-200  rounded-md '>
            <h1 className='font-sm text-xl flex flex-col items-center p-6'>
                  2 <span>New</span>
                </h1>
            </div>
            <div className='bg-red-200  rounded-md '>
            <h1 className='font-sm text-xl flex flex-col items-center p-7'>
                  2 <span>New</span>
                </h1>
            </div>
            <div className='bg-red-200  rounded-md '>
            <h1 className='font-sm text-xl flex flex-col items-center p-7'>
                  2 <span>New</span>
                </h1>
            </div>
        </div>
        <hr className='border-gray-500 border-1 my-4'/>
        <h1 className='flex justify-between items-center text-base text-black font-medium '>
        Display on career page
        <input
  type="checkbox"
  className="toggle border-[#5264EA] bg-white [--tglbg:5264EA] hover:bg-blue-700"
  defaultChecked />        </h1>

      
    </div>
  )
}

export default RecruiterSideBar
