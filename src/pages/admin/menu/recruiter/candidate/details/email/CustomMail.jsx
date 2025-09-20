import MenuHeader from '@/components/common/MenuHeader'
import AddEmail from '@/components/popups/recruiter/candiadate/AddEmail'
import EmailSideBar from '@/components/sidebars/recruiter/EmailSideBar'
import Pagination from '@/components/table/Pagination'
import { EmailData } from '@/constants/dummyData'
import { Plus, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CustomMail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
    <div>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeSubMenu={"Candidates"}
        activeMenu={"Candidates"}
      />
    </div>
    <div className="flex flex-row gap-2 items-start">
      <EmailSideBar  active={"Custom Mail"}/>
      <div className='bg-white flex flex-col px-8 h-screen  w-full rounded-md pb-6'>
      <div className='flex items-center justify-between'>
          <h1 className="font-bold text-base pt-3">Custom Mail</h1>
          <div className="flex items-center gap-3 my-4">
          <Link  onClick={() => setPopupOpen(true)}
          className="btn bg-bgColor-100 text-white text-xs items-center flex flex-row gap-2 font-semibold rounded-[0.3rem] hover:bg-bgColor-100 min-w-36 min-h-10 h-10 whitespace-nowrap">
                <Plus className="size-5" />New Mail
              </Link>
              <AddEmail popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
              <div className="flex gap-2 placeholder:text-black items-center rounded-md input-box min-h-10 h-10 w-full border pr-20 border-[#EBEBF0]">
                <Search className="size-4 text-[#7F7F7F]" />
                <input
                  type="text"
                  className=" w-full  placeholder:text-[#7F7F7F]"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div className='border-t border-gray-300 '>
      {EmailData?.map((item, index) => (
        <div key={index} className='border-b border-gray-300 flex items-center justify-between py-5'>
          <h1 className='text-sm font-semibold text-[#2C2C2C]'>{item.heading}</h1>
          <p className='text-sm font-normal text-[#7F7F7F]'>{item.content}</p>
          <h1 className='text-sm font-medium text-[#2C2C2C]'>{item.time}</h1>
        </div>
      ))}
      
      {totalPages && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
     
    </div>

      </div>

      
    </div>
  </>
  )
}

export default CustomMail