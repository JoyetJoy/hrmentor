import { ArrowLeft } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom'

function ProjectManagerHeader(props) {
    const {
        backLink,
        currentLink,
        nextLink,
        currentpath,
        backpath,
        nextpath,

    } = props;
  return (
    <div className='flex flex-row justify-between items-center mt-3'>
      <h1 className='font-semibold text-base flex items-center gap-1 '>         <ArrowLeft className="size-4" />
      Project manger</h1>
      <div className='flex gap-5 '>
        <Link to={currentpath} className='text-base font-semibold text-btncolor'>{ currentLink}</Link>
        <Link to={backpath} className='text-base font-medium text-gray-200'>{backLink}</Link>
        <Link to={nextpath} className='text-base font-medium text-gray-200'>{nextLink}</Link>
      </div>
    </div>
  )
}

export default ProjectManagerHeader
