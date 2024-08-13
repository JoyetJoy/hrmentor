import React from 'react'
import {ArrowLeft,ChevronRight } from "lucide-react"
import { Link } from 'react-router-dom';

export default function RecruiterHeader(props) {
    const {
        menu,
        subMenu,
        currentpath,
        pageHeading,
        firsttLink,
        secondLink,
        thirdLink,
        fourthLink,
        fifthLink,
        sixthLink,
    } = props;
  return (
    <div className="bg-white py-2 px-6 flex flex-row items-center justify-between  rounded-md my-3">
      <div className="text-base font-semibold text text-black flex items-center justify-between gap-1">
        <ArrowLeft className="size-4" />
        {menu}
        {/* <ChevronRight className="size-4" />
        {subMenu} */}
        <ChevronRight className="size-4" />
        <span className="text-red-600 text-sm"> {currentpath}</span>
      </div>
      <div className="text-sm flex items-center gap-5 font-semibold ">
        <div className="w-1">
          {/* <img
            src={"/assets/icons/employees/line.svg"}
            alt="line"
            className="object-contain w-full"
          /> */}
        </div>
        <div className="text-textcolor-blue font-extrabold text-sm">
          {pageHeading}
        </div>
        {/* <Link className=" text-base text-[#808080]  ">{nextHeading}</Link> */}
        <Link to={""}  className=" text-sm font-semibold ">{firsttLink}</Link>
        <Link to={"/admin/recruiter/jobs"} className=" text-sm text-[#808080] ">{secondLink}</Link>
        <Link  to={""} className=" text-sm text-[#808080] ">{thirdLink}</Link>
        <Link to={" "} className=" text-sm text-[#808080]">{fourthLink} </Link>
        <Link to={""} className=" text-sm text-[#808080] ">{fifthLink}</Link>
        <Link to={""} className=" text-sm text-[#808080] ">{sixthLink}</Link>
      </div>
    </div>
  )
}

