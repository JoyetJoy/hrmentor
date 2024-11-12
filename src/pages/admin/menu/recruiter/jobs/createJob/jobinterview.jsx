import MenuHeader from '@/components/common/MenuHeader'
import { ArrowLeft, MoveDiagonal, Plus, Search, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TableData } from "@/constants/tableDummy";
import QueryTable from '@/components/table/QueryTable';
import CreateJobSideBar from '@/components/sidebars/recruiter/CreateJobSideBar';

function JobInterview() {
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const list = React.useMemo(() => TableData, [TableData]);
  // const location = useLocation();
  const columns = React.useMemo(
    () => [
      {
        header: "Interview Guide",
        accessorKey: "name",
      },
      { header: " Interview Type ", accessorKey: "addNo" },
     
      {
        header: "Interview Mode",
        accessorKey: "type",
      },

      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs   ">
            <Link
              to={""}
              className="cursor-pointer flex items-center bg-gray-soft  p-2 size-7   rounded-full "
            >
              <img src="/assets/icons/admin/marker.svg" className="w-full   object-contain" />
            </Link>
            <Link className="cursor-pointer flex justify-center items-center  bg-gray-soft  p-2  rounded-full">
              <Trash2 className="size-3 text-[#AB2727]" />
            </Link>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <div>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className='flex flex-row items-start justify-between gap-3'>
        <div className='w-full'>
          <div className='flex  items-center justify-between mt-1 mb-3 '>
            <h1 className='text-base font-bold text-black flex flex-row gap-2 items-center justify-center'>
              <ArrowLeft className='size-4' />
              Create New Job  <div className=' w-[.07rem] h-4 bg-gray-dimlight'></div><span className='text-sm font-medium text-textcolor-darkCharcoal'>Interview Guides</span>
            </h1>
            <Link to={"/admin/recruiter/request-refferals"}   
              className="btn h-11 min-h-11 rounded-md bg-bgColor-100 px-6 text-sm text-white font-normal hover:bg-bgColor-100">
              Next
            </Link>
          </div>
          <div className='w-full bg-white rounded-md py-4 px-7 '>
            <div className='flex flex-col gap-1 mb-7'>
              <p className='font-medium text-textcolor-darkCharcoal text-base'>Chose the right team for the job.</p>
              <p className=' text-gray-dark text-sm text-medium '>This jobs hiring team can include group or individual people who are helping you fill this position.</p>
            </div>
            <div className="flex items-center justify-between my-4">
              <div className="flex gap-2 placeholder:text-black items-center rounded-md input-box min-h-11 min-w-96 border border-gray-soft">
                <Search className="size-4 text-gray-dark" />
                <input
                  type="text"
                  className=" w-full h-full placeholder:text-gray-dark"
                  placeholder="Search"
                />
              </div>
              <Link to={'/admin/recruiter/interview-guide'} className="btn bg-bgColor-100 text-white text-xs items-center flex flex-row gap-1 rounded-[0.3rem] hover:bg-bgColor-100 min-w-28 min-h-11 h-11 whitespace-nowrap">
                <Plus className="size-4" />Add Interview Guides
              </Link>
            </div>
            <QueryTable
              columns={columns}
              list={list}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
        <CreateJobSideBar />
      </div>
    </div>
  )
}

export default JobInterview
