import ProjectManagerHeader from '@/components/common/ProjectManagerHeader'
import RecruiterSideBar from '@/components/sidebars/recruiter/RecruiterSideBar'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Promote() {
    return (
        <div >
            {/* ---projectmanager header--- */}
            <div className='flex flex-row justify-between items-center mt-3 mb-5'>
                <h1 className='font-semibold text-base flex items-center gap-1 '>
                    <ArrowLeft className="size-4" />
                    Project manger</h1>
                <div className='flex gap-5 '>
                    <Link to="/admin/recruiter/candidate" className='text-sm font-semibold text-gray-200'>Candidate</Link>
                    <Link to="/admin/recruiter/promote" className='text-sm  font-extrabold text-btncolor'>Promote</Link>
                    <Link to="/admin/recruiter/refer" className='text-sm font-medium text-gray-200'>Refer</Link>
                </div>
            </div>
            {/* --------- */}
            <div className='flex flex-row gap-2 my-3 '>
                <RecruiterSideBar />
                <div className='bg-white w-full rounded-md p-6 '>
                    <h1 className='text-lg font-extrabold mb-4'>Promote</h1>
                    <div className=' flex flex-row items-center'>
                        <label className="label cursor-pointer flex gap-3 ">
                            <span className="label-text text-base ">Indeed</span>
                            <input type="radio" name="radio-10" className="radio checked:bg-btncolor size-5" defaultChecked />
                        </label>
                        <label className="label cursor-pointer  flex gap-3">
                            <span className="label-text">LinkedIn</span>
                            <input type="radio" name="radio-10" className="radio checked:bg-btncolor size-5" defaultChecked />
                        </label>

                        <label className="label cursor-pointer  flex gap-3">
                            <span className="label-text">Naukari</span>
                            <input type="radio" name="radio-10" className="radio checked:bg-btncolor size-5" defaultChecked />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Promote
