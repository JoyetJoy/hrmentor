import RecruiterHeader from '@/components/common/RecruiterHeader'
import QueryTable from '@/components/table/QueryTable'
import { TableData } from '@/constants/tableDummy';
import { MoveDiagonal, Trash2 } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

export default  function RecruiterDashbaord () {
    const list = React.useMemo(() => TableData, [TableData]);
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      { header: "Date Created", accessorKey: "dateCreate" },
      
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex relative gap-1 text-xs ">
            <Link
              to={`/sales/invoices/detail-view/${row?.original?.id}`}
              className="cursor-pointer flex items-center  bg-gray-500 text-black p-2  size-8 rounded-full"
            >
              <MoveDiagonal />
            </Link>
          </div>
        ),
      },
    ],

    []
  );
  return (
    <div>
        <RecruiterHeader
        backlink={""} 
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        firsttLink={"Dashboard"}
        secondLink={"Jobs"}
        thirdLink={"Candidate"}
        fourthLink={"Interview"}
        fifthLink={"Report"}
        six={"Setttings"}
        />
      <div  className='grid grid-cols-6 gap-5'>
        {/* ---images---- */}
        <div className="">
            <img src={"/assets/images/admin/recruiter/Group 1000003983.png"} alt="" />
        </div>
        <div className="">
            <img src={"/assets/images/admin/recruiter/Group 1000003983.png"} alt="" />
        </div>
         <div className="">
            <img src={"/assets/images/admin/recruiter/Group 1000003983.png"} alt="" />
        </div>
        <div className="">
            <img src={"/assets/images/admin/recruiter/Group 1000003983.png"} alt="" />
        </div>
        <div className="">
            <img src={"/assets/images/admin/recruiter/Group 1000003983.png"} alt="" />
        </div>
        <div className="">
            <img src={"/assets/images/admin/recruiter/Group 1000003983.png"} alt="" />
        </div>
      </div>
      <div className='grid grid-cols-3 my-3 gap-3' >
        <div>
            <h1 className='font-extrabold text-sm mb-4'>Open Jobs</h1>
            <QueryTable 
            className=""
              columns={columns}
              list={list}
            //   currentPage={currentPage}
            //   setCurrentPage={setCurrentPage}
            //   totalPages={totalPages}
            />
        </div>
        <div>
            <h1 className='font-extrabold text-sm mb-4'>Interview</h1>
            <div>
                <img src={"/assets/images/admin/recruiter/calender.png"} alt="" />
            </div>
        </div>
        <div>
            <h1 className='font-extrabold text-sm mb-4'>Candidate</h1>
        </div>
      </div>
    </div>
  )
}


