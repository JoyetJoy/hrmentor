import React from 'react'
import {ArrowLeft,ChevronRight } from "lucide-react"
import { Link, useLocation } from 'react-router-dom';

export default function RecruiterHeader(props) {
  const location = useLocation();
  const isActive = (paths) => paths.includes(location.pathname);

  


    const {
        menu,
        subMenu,
        currentpath,
        pageHeading,
        firstLink,
        secondLink,
        thirdLink,
        fourthLink,
        fifthLink,
        sixthLink,
    } = props;
  return (
    <div className="bg-white py-2 px-6 flex flex-row items-center justify-between  rounded-md my-2">
      <div className="text-sm font-semibold text text-black flex items-center justify-between gap-1">
        <ArrowLeft className="size-4" />
        {menu}
        {/* <ChevronRight className="size-4" />
        {subMenu} */}
        <ChevronRight className="size-4" />
        <span className="text-red-600 text-sm"> {currentpath}</span>
      </div>
      <div className="text-sm flex items-center gap-10 font-semibold ">
      <Link
        to={"/admin/recruiter/index"}
        className={`text-sm ${
          isActive(["", "/admin/recruiter/index"])
            ? "font-extrabold text-bgColor-100"
            : "font-normal text-[#808080]"
        }`}
      >
        {firstLink}
      </Link>
      <Link
        to={"/admin/recruiter/jobs"}
        className={`text-sm ${
          isActive(["/admin/recruiter/jobs", ""])
            ? "font-extrabold text-text-bgColor-100"
            : "font-normal text-[#808080]"
        }`}
      >
        {secondLink}
      </Link>
      <Link
        to={""}
        className={`text-sm ${
          isActive([""])
            ? "font-extrabold text-text-bgColor-100"
            : "font-normal text-[#808080]"
        }`}
      >
        {thirdLink}
      </Link>
      <Link
        to={" "}
        className={`text-sm ${
          isActive([" "])
            ? "font-extrabold text-text-bgColor-100"
            : "font-normal text-[#808080]"
        }`}
      >
        {fourthLink}
      </Link>
      <Link
        to={""}
        className={`text-sm ${
          isActive([""])
            ? "font-extrabold text-text-bgColor-100"
            : "font-normal text-[#808080]"
        }`}
      >
        {fifthLink}
      </Link>
      <Link
        to={""}
        className={`text-sm ${
          isActive([""])
            ? "font-extrabold text-text-bgColor-100"
            : "font-normal text-[#808080]"
        }`}
      >
        {sixthLink}
      </Link>
    </div>
    </div>
  )
}

