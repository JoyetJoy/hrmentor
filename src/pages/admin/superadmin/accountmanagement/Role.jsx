import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import { FaChevronUp, FaChevronDown, FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';

function Role() {
    const [showJobOptions, setShowJobOptions] = useState(false);
 

    return (
        <>
        {/* <div className='bg-white py-1 px-6 flex flex-row items-center justify-between mt-3 rounded-md'>
            <h1 className='text-sm font-semibold text-black flex items-center justify-between gap-1'> <BsArrowLeftShort  className='size-5'/>Menu <MdOutlineNavigateNext className='size-3'/> Account Management<MdOutlineNavigateNext className='size-3'/> <span className='text-red-600'>Role</span></h1>
            <div className='text-base flex items-center gap-5 font-semibold '><Link>Role</Link> <Link  to="/admin-management/subscription" className=' flex items-center gap-6  text-[#808080]  '>Subscription</Link></div> 
        </div> */}
        <div className='flex flex-row mt-3 gap-7'>
            <SideBar />
            <div className='w-full bg-white px-10 pt-9 rounded-md'>
                <h1 className='text-xl text-black font-semibold'>Add New Role</h1>
                <div className='border-b-2 border-gray-500 my-1'></div>
                <div className='flex flex-row gap-4 border-b border-gray-500 py-4'>
                    <h1 className='flex flex-row whitespace-nowrap items-center text-sm gap-1'>
                        Role Name <span>*</span>:
                    </h1>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input w-full border border-gray-600 max-w-xs focus:border-gray-600 focus:outline-none"
                    />
                    <button className='text-white btn px-20 bg-btncolor hover:bg-btncolor'>Create</button>
                </div>
                <div className="relative my-6">
                    <Menu>
                        <MenuButton className="text-base font-extrabold text-black flex items-center gap-2" onClick={() => setShowJobOptions(!showJobOptions)}>
                            {/* Recruiter {showJobOptions ? <FaChevronUp /> : <FaChevronDown />} */}
                        </MenuButton>
                        <MenuItems anchor="bottom ">
                            <MenuItem class>
                               <button className='flex'>job </button>
                            </MenuItem>
                            <MenuItem>
                                <a className="block data-[focus]:bg-blue-100" href="/support">
                                    Support
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a className="block data-[focus]:bg-blue-100" href="/license">
                                    License
                                </a>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </div>
        </>
    );
}

export default Role;
