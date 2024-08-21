import { ArrowLeft, Dot, MapPin, Share2 } from 'lucide-react';
import React from 'react'

function JobDetails() {
    return (
        <div className='w-full bg-white h-full mt-3 rounded-md p-4'>
            <div className='bg-bgColor-100 rounded-md h-72 '>
                <div className='py-8 px-10 flex flex-col gap-3'>
                    <h1 className='flex flex-row gap-1 items-center text-white text-sm mb-6'>     <ArrowLeft className="size-4" strokeWidth={2} />
                        Job Details</h1>
                    <h1 className='flex flex-row gap-1 items-end text-white text-xl font-semibold '>UI/UX DESIGNER <span className='text-xs font-normal flex flex-row items-center'><Dot className="size-5 text-[#6DE742]" strokeWidth={5} />
                        3days ago</span></h1>
                    <div className='flex flex-row  justify-between items-center'>
                        <div className='flex flex-row items-center gap-2 my-4'>
                            <button className='btn border rounded-md border-[#CFD2E3] bg-bgColor-100  text-white text-xs min-h-8 h-8'> Fresher</button>
                            <button className='btn border rounded-md border-[#CFD2E3] bg-bgColor-100  text-white text-xs flex flex-roe items-center min-h-8 h-8'>₹ 20,000 - ₹40,000</button>
                            <button className='btn border rounded-md border-[#CFD2E3] bg-bgColor-100  text-white text-xs min-h-8 h-8'>Day Shift </button>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <button className='btn border rounded-md border-[#CFD2E3] bg-white  text-bgColor-100  text-sm min-h-10 h-10 w-36'> Apply Now</button>
                            <button className='btn border rounded-md border-[#2F324D] bg-[#2F324D]  text-white text-sm flex flex-row items-center min-h-10 h-10 w-36 '> <Share2 strokeWidth={1} className='size-4' />Share</button>
                        </div>
                    </div>
                    <h1 className='flex flex-row gap-1 items-center text-white  font-normal text-sm  mb-4'>
                        <MapPin className="size-4" />
                        Trivandrum, India
                    </h1>
                </div>
            </div>
            <div className='flex flex-col gap-9 px-10 my-10'>
                <div className=''>
                    <h1 className='text-lg font-bold mb-3  '>Role Overview</h1>
                    <p className='text-sm text-[#787878] leading-7 '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                        . Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className=' '>
                    <h1 className='text-lg font-bold mb-3   '>Job Description</h1>
                    <ul className="text-sm text-[#787878] leading-7 list-disc list-inside">
                        <li>Build innovative, state-of-the-art applications and collaborate with the User Experience (UX) team</li>
                        <li>Proficiency in Bootstrap and JavaScript</li>
                        <li>Utilise backend data services and contribute to increasing existing data services API</li>
                        <li>Lead the entire web application development life cycle right from concept stage to delivery and post-launch support</li>
                        <li>Convey effectively with all task progress, evaluations, suggestions, schedules along with technical and process issues.</li>
                        <li>A solid understanding of application design using Laravel.</li>
                        <li>Document the development process, architecture, and standard components</li>
                        <li>Coordinate with co-developers and keep the project manager well informed of the status of the development effort and serve as a liaison between development staff and project manager</li>
                    </ul>


                </div>
                <div className=''>
                    <h1 className='text-lg font-bold mb-3  '>Responsibility</h1>
                    <ul className="text-sm text-[#787878] leading-7 list-disc list-inside">
                        <li>Build innovative, state-of-the-art applications and collaborate with the User Experience (UX) team</li>
                        <li>Proficiency in Bootstrap and JavaScript</li>
                        <li>Utilise backend data services and contribute to increasing existing data services API</li>
                        <li>Lead the entire web application development life cycle right from concept stage to delivery and post-launch support</li>
                        <li>Convey effectively with all task progress, evaluations, suggestions, schedules along with technical and process issues.</li>
                        <li>A solid understanding of application design using Laravel.</li>
                        <li>Document the development process, architecture, and standard components</li>
                        <li>Coordinate with co-developers and keep the project manager well informed of the status of the development effort and serve as a liaison between development staff and project manager</li>
                    </ul>
                </div>
                <div className=''>
                    <h1 className='text-lg font-bold mb-3  '>Requirement</h1>
                    <ul className="text-sm text-[#787878] leading-7 list-disc list-inside">
                        <li>Build innovative, state-of-the-art applications and collaborate with the User Experience (UX) team</li>
                        <li>Proficiency in Bootstrap and JavaScript</li>
                        <li>Utilise backend data services and contribute to increasing existing data services API</li>
                        <li>Coordinate with co-developers and keep the project manager well informed of the status of the development effort and serve as a liaison between development staff and project manager</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default JobDetails;
