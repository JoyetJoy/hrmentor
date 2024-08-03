import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { BsArrowLeftShort } from "react-icons/bs";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Link } from 'react-router-dom';
import tickgreen from '/public/assets/icons/admin-icons/tick-green.svg';
import tickgray from '/public/assets/icons/admin-icons/tick-gray.svg';
import { iconIcon } from '../../../../utils';
// import SubscriptionModel from '../../../../modal/admin/SubscriptionModel';


function Subscription() {
    const data = [
        
        {
            price: '$10/Month',
            name: 'Basic Plan',
            title: 'Recruiter',
            items: ['Audit log and data history', 'Unlimited individual users', 'Unlimited individual users'],
            bgColor: '#D1FADF',
            imgSrc: tickgreen,
            textColor: '#000000',
        },
        {
            price: '$10/Month',
            name: 'Basic Plan',
            title: 'Hiring',
            items: ['Audit log and data history', 'Unlimited individual users', 'Unlimited individual users'],
            bgColor: '#F1F1F1',
            imgSrc: tickgray,
            textColor: '#101828',
        },
        {
            price: '$10/Month',
            name: 'Basic Plan',
            title: 'Hiring',
            items: ['Audit log and data history', 'Unlimited individual users', 'Unlimited individual users'],
            bgColor: '#F1F1F1',
            imgSrc: tickgray,
            textColor: '#101828',

        },
    ];

    const plans = [
        {
            price: '$10/Month',
            name: 'Basic Plan',
            details: data,
        },

    ];


    return (
        <>
            <div className='bg-white py-1 px-6 flex flex-row items-center justify-between mt-3 rounded-md'>
                <h1 className='text-sm font-semibold text-black flex items-center justify-between gap-1'>
                    <BsArrowLeftShort className='size-5' />Menu
                    <MdOutlineNavigateNext className='size-3' />
                    Account Management
                    <MdOutlineNavigateNext className='size-3' />
                    <span className='text-red-600'>subscription</span>
                </h1>
                <div className='text-base flex items-center gap-5 font-semibold '>
                    <Link to="/admin-management/role">Role</Link>
                    <Link to="/admin-management/subscription" className='flex items-center gap-6 text-[#808080]'>Subscription</Link>
                </div>
            </div>

            <div className='flex flex-col mt-5 px-64'>
                <div className='flex flex-col gap-1 mb-16'>
                    <p className='text-red-600 text-sm font-bold'>Pricing</p>
                    <h1 className='text-3xl text-black font-extrabold'>Select Your Plan to Enhance<br /> HR Management</h1>
                </div>
                <div class>

                </div>
                <div className='grid grid-cols-3 gap-4'>
                    {plans.map((plan, planIndex) => (
                        <div key={planIndex} className='flex flex-col border border-gray-300 shadow rounded-2xl pt-16 pb-6'>
                            <div className='flex flex-col items-center text-center mb-6'>
                                <h1 className='text-black text-4xl font-semibold'>$10<span className='text-lg'>/Month</span></h1>
                                <h3 className='text-sm text-black font-semibold'>Basic Plan</h3>
                            </div>
                            {plan.details.map((section, sectionIndex) => (

                                <div key={sectionIndex} className='flex flex-col gap-1 items-baseline px-6 my-1 '>
                                    <h1 className='text-sm font-semibold my-1' style={{ color: section.textColor }}>{section.title}</h1>
                                    {section.items.map((item, itemIndex) => (
                                        <p key={itemIndex} className='flex gap-2 items-center text-xs text-[#667085] py-1'>
                                            <div style={{ backgroundColor: section.bgColor }} className='rounded-full p-1 flex items-center  size-5 justify-center'>
                                                <img src={section.imgSrc} alt="tick" className=' w-full object-contain' />
                                            </div>
                                            {item}

                                        </p>
                                    ))}
                                </div>
                            ))}
                            <div className='border-b-2 border-gray-300 mx-6'></div>
                            <div className='flex flex-col items-center justify-between  text-center  '>
                                <span className='my-5 flex flex-col gap-1'>
                                    <h1 className='text-xs font-medium text-gray-200 '>Number Of License:10</h1>
                                    <h2 className='text-xs  font-medium text-red-500'>Valid till 22th july 2024</h2>
                                </span>

                                <button className='btn  bg-[#181C3A]  hover:bg-[#181C3A] text-xs font-normal max-h-1 h-1 text-white px-24 py-0 '
                                    onClick={() => document.getElementById('my_modal_3').showModal()}>Purchase</button>
                                {/* -------modal-------- */}
                              
                                         <dialog id="my_modal_3" className="modal font-monorope">
                                    <div className="modal-box w-4/5 max-w-4xl p-16 rounded-none ">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <div className='flex flex-col items-start '>
                                            <p className='text-red-600 text-sm font-bold font-monorope'>Pricing</p>
                                            <h1 className='text-2xl font-extrabold text-black my-3'>Bussiness</h1>
                                            <h2 className='text-4xl font-extrabold text-black m'>$20/Month</h2>
                                            <p className='text-justify my-4 text-sm'>Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. </p>
                                            <div className='flex justify-between w-full '>
                                                <div className='flex flex-col gap-1 items-baseline my-1 '>
                                                    <h1 className='font-extrabold text-base'>Featuers</h1>
                                                    <div className='flex flex-col gap-1'>
                                                        <h1 className='text-sm font-semibold my-1 text-justify'>Recruiter</h1>

                                                        <p className='flex gap-2 items-center text-sm text-[#667085] py-1'>
                                                            <div className='rounded-full p-1 flex items-center bg-[#D1FADF]  size-5 justify-center'>
                                                                <img src={tickgreen} alt="tick" className=' w-full object-contain' />
                                                            </div>
                                                            Audit log and data history
                                                        </p>

                                                        <p className='flex gap-2 items-center text-sm text-[#667085] py-1'>
                                                            <div className='rounded-full p-1 flex items-center bg-[#D1FADF]  size-5 justify-center'>
                                                                <img src={tickgreen} alt="tick" className=' w-full object-contain' />
                                                            </div>
                                                            Unlimited individual users                                                        </p>

                                                        <p className='flex gap-2 items-center text-sm text-[#667085] py-1'>
                                                            <div className='rounded-full p-1 flex items-center bg-[#D1FADF]  size-5 justify-center'>
                                                                <img src={tickgreen} alt="tick" className=' w-full object-contain' />
                                                            </div>
                                                            Unlimited individual users                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h1 className='text-sm font-semibold my-1 text-justify '>Hiring</h1>

                                                        <p className='flex gap-2 items-center text-sm text-[#667085] py-1'>
                                                        <div className='rounded-full p-1 flex items-center bg-[#D1FADF]  size-5 justify-center'>
                                                                <img src={tickgreen} alt="tick" className=' w-full object-contain' />
                                                            </div>
                                                            Audit log and data history
                                                        </p>
                                                        <p className='flex gap-2 items-center text-sm text-[#667085] py-1'>
                                                        <div className='rounded-full p-1 flex items-center bg-[#D1FADF]  size-5 justify-center'>
                                                                <img src={tickgreen} alt="tick" className=' w-full object-contain' />
                                                            </div>
                                                            Unlimited individual users                                                        </p>
                                                        <p className='flex gap-2 items-center text-sm text-[#667085] py-1'>
                                                        <div className='rounded-full p-1 flex items-center bg-[#D1FADF]  size-5 justify-center'>
                                                                <img src={tickgreen} alt="tick" className=' w-full object-contain' />
                                                            </div>
                                                            Unlimited individual users                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='border border-gray-300'></div>
                                                <div className=' flex flex-col items-baseline'>
                                                    <h1  className='font-extrabold text-base'>Payment</h1>
                                                    <p className='my-2 text-xs text-gray-600 font-medium text-justify'>Your current plan amount will be deducted from <br />the new package cost. </p>
                                                    <div className='flex flex-col gap-2   '>
                                                        <div className=' my-2 flex flex-col'>
                                                            <h1 className='text-xs font-extrabold text-justify text-[#181C3A] '>Choose number of license</h1>

                                                            <div className="flex space-x-5  mt-2 ">
                                                                <button
                                                                    className="bg-gray-300 px-2 rounded-md"
                                                                    onClick={increment}
                                                                >
                                                                    <FaPlus className="size-2" />
                                                                </button>
                                                                <div className="text-sm">{count}</div>
                                                                <button
                                                                    className="p-2 border border-gray-300 rounded-md"
                                                                    onClick={decrement}
                                                                >
                                                                    <FaMinus className="size-2" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className='border-b-2 border-gray-300'></div>

                                                        <div className='flex flex-col gap-2'>
                                                            <h1 className=' text-xs flex items-center justify-between font-semibold text-gray-200'>Current Plan Amount <span>$120</span></h1>
                                                            <h1  className=' text-xs flex items-center justify-between font-semibold text-gray-200'>Previous Plan Balance <span>$20</span></h1>
                                                            <h1  className=' text-xs flex items-center justify-between font-semibold text-gray-200'>Amount to be paid <span>$120</span></h1>
                                                        </div>
                                                        <div className='border-b-2 border-gray-300'></div>

                                                        <div>
                                                        <p className='text-xs text-[#808080] mb-3 flex items-center gap-1'> <div><img src={iconIcon} alt="" /></div>Fee applies if you can cancel after 10 days </p>
                                                        <button className='btn  bg-[#181C3A] hover:bg-[#181C3A] text-xs font-normal max-h-1 h-1 text-white px-24 mt-'>Purchase</button>
                                                        </div>
                                                        
                                                     </div>
                                                </div>
                                            </div>
                                           
                                        </div>

                                    </div>
                                </dialog>


                            </div>
                        </div>
                    ))}
                    {plans.map((plan, planIndex) => (
                        <div key={planIndex} className='flex flex-col border border-gray-300 shadow rounded-2xl pt-16 pb-6'>
                            <div className='flex flex-col items-center text-center mb-6'>
                                <h1 className='text-black text-4xl font-semibold'>$10<span className='text-lg'>/Month</span></h1>
                                <h3 className='text-sm text-black font-semibold'>Basic Plan</h3>
                            </div>
                            {plan.details.map((section, sectionIndex) => (

                                <div key={sectionIndex} className='flex flex-col gap-1 items-baseline px-6 my-1 '>
                                    <h1 className='text-sm font-semibold my-1' style={{ color: section.textColor }}>{section.title}</h1>
                                    {section.items.map((item, itemIndex) => (
                                        <p key={itemIndex} className='flex gap-2 items-center text-xs text-[#667085] py-1'>
                                            <div style={{ backgroundColor: section.bgColor }} className='rounded-full p-1 flex items-center  size-5 justify-center'>
                                                <img src={section.imgSrc} alt="tick" className=' w-full object-contain' />
                                            </div>
                                            {item}

                                        </p>
                                    ))}
                                </div>
                            ))}
                            <div className='border-b-2 border-gray-300 mx-6'></div>
                            <div className='flex flex-col items-center justify-between  text-center  '>
                                <div className=' my-2 flex flex-col  items-center'>
                                    <h1 className='text-sm font-semibold text-[#181C3A] '>Choose number of license</h1>

                                    <div className="flex space-x-5  my-1">
                                        <button
                                            className="bg-gray-300 px-2 rounded-md"
                                            onClick={increment}
                                        >
                                            <FaPlus className="size-2" />
                                        </button>
                                        <div className="text-sm">{count}</div>
                                        <button
                                            className="p-2 border border-gray-300 rounded-md"
                                            onClick={decrement}
                                        >
                                            <FaMinus className="size-2" />
                                        </button>
                                    </div>
                                </div>

                                <button className='btn  bg-[#181C3A] hover:bg-[#181C3A] text-xs font-normal max-h-1 h-1 text-white px-24 py-0 '>Purchase</button>

                            </div>
                        </div>
                    ))}
                  
                </div>
            </div>
        </>
    );
}

export default Subscription;
