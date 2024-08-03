import React from 'react'
import { editIcon, trashiIcon } from '../../../../utils'
function SideBar() {


    return (
        <div className='flex flex-col w-1/2'>
            <h1 className='font-semibold text-xl text-bold text-start mb-2'>Role</h1>
            <label className="input outline-none border-none pr-28 flex items-center gap-2 mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-5 w-5 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
                <input type="text" className="grow placeholder:text-sm" placeholder="Search" />
            </label>
            <div>
                <div className='flex justify-between items-center bg-gray-500 border border-gray-300 px-10 py-4 rounded-t-md'>
                    <h1 className='font-semibold text-snm text-black'>Role Name</h1>
                    <h1 className='font-semibold text-sm text-black'>Action</h1>
                </div>
                <div className='bg-white rounded-b-md '>
                    <h1 className='text-sm font-semibold text-gray-200 py-5  px-10'>Super Admin[1]</h1>
                    <ul>
                        {roleItems.map((role, index) => (
                            <li key={index} className='flex justify-between items-center text-base text-black border-t border-gray-500 px-10 py-4'>
                                <span>{role.name}[{role.no}]</span>
                                <div className='flex gap-3'>
                                    <div className='w-9 h-9 p-2 bg-gray-500 rounded-full flex items-center justify-center'>
                                        <img src={role.edit} alt="editIcon" className=' object-contain ' />
                                    </div>
                                    <div className='w-9 h-9 p-2 bg-gray-500 rounded-full flex items-center justify-center'>
                                        <img src={role.trash} alt="trashIcon" className='object-contain' />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar
