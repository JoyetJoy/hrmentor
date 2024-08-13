import RecruiterSideBar from '@/components/sidebars/recruiter/RecruiterSideBar'
import React from 'react'

function Refer() {
  return (
    <div>
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
            <div className='flex flex-row gap-2 my-3'>
            <RecruiterSideBar />


            </div>
      
    </div>
  )
}

export default Refer
