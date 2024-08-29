import MenuHeader from '@/components/common/MenuHeader'
import QueryTable from '@/components/table/QueryTable'
import RecruiterTable from '@/components/table/RecruiterTable'
import { TableData } from '@/constants/tableDummy'
import { ArrowLeft, Bookmark, Filter, MoveDiagonal, Plus, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function List() {
    const [totalPages, setTotalPages] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const list = React.useMemo(() => TableData, [TableData]);

    const location = useLocation();
    const isActive = (path) => path.includes(location.pathname);
    const columns = React.useMemo(
        () => [
          {
            header: "Job Title",
            accessorKey: "name",
          },
          {
            header: "Date created",
            accessorKey: "dignation",
            cell: ({ row }) => <p className="">{row?.original?.designation}</p>,
          },
          {
            header: "Job Status",
            accessorKey: "status",
          },
          {
            header: "Total candidates",
            accessorKey: "totalcandidates",
          },
          {
            header: "New candidates",
            accessorKey: "newcandidates",
          },
          {
            header: "Active candidates",
            accessorKey: "activecandidates",
          },
          {
            header: "Hired candidates",
            accessorKey: "hiredcandidates",
          },
         
    
          
        ],
    
        []
      );
  return (
    <div className="">
    <MenuHeader
      backlink={""}
      menu={"Menu"}
      subMenu={""}
      currentpath={"Recruiter"}
      activeMenu={"Reports"}
    />
    <div className='bg-white py-6 px-10 rounded-md'>
    <div className="flex justify-between items-center mb-4 mt-2">
        <div className='flex flex-row gap-2 items-center text-[#2C2C2C]'>
        <ArrowLeft  className='size-5'/>
            <h1 className='text-base font-bold'>Job Report</h1>
        </div>
        <div className="text-white font-semibold flex  items-center gap-2">
        <div className="bg-white rounded-md p-3 border border-gray-400 min-h-10 h-10">
            <Filter
              className="size-4 text-black font-medium stroke"
              strokeWidth={2}
            />
          </div>
          <Link
            to={""}
            className="btn hover:bg-bgColor-100 bg-bgColor-100 text-white text-sm   px-6  min-h-11 h-11"
          >
            <Plus className="size-5" />
            Export
          </Link>
          <Link
            to={""}
            className="btn hover:bg-bgColor-100 bg-bgColor-100 text-white text-sm px-6   min-h-11 h-11"
          >
                <Bookmark className='size-5' />
                Save
          </Link>
        
         
        </div>
     
    </div>
    <RecruiterTable
      columns={columns}
      list={list}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
    />
  </div>
    </div>
   
  )
}

export default List
