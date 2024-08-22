import { ArrowLeft, ChevronRight } from 'lucide-react';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function MenuHeader(props) {
  const location = useLocation();
  const isActive = (paths) => paths.includes(location.pathname);


    const {
        menu,
        subMenu,
        currentpath,
        pageHeading,
        centertextmain,
        centertext,
        firstLink,
        secondLink,
        thirdLink,
        fourthLink,
        fifthLink,
        sixthLink,
        firstpath,
        secondpath,
        thirdpath,
        fourthpath,
        fifththpath,
        sixthpath,


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
      <h1 className="text-[0.8rem] font-medium text-black flex items-center justify-between gap-1">
          {centertextmain}
          <span className="text-textcolor-lightred font-semibold underline underline-offset-4">{centertext}</span>{" "}
        </h1>
      <div className="text-sm flex items-center gap-10 font-semibold ">
      <Link
        to={firstpath}
        className={`text-sm ${
          isActive(["", "/admin/recruiter/index"])
            ? "font-extrabold text-bgColor-100"
            : "font-normal text-[#808080]"
        }`}
      >
        {firstLink}
      </Link>
      <Link
        to={secondpath}
        className={`text-sm ${
          isActive(["/admin/recruiter/jobs", ""])
            ? "font-extrabold text-text-bgColor-100"
            : "font-normal text-[#808080]"
        }`}
      >
        {secondLink}
      </Link>
      <Link
        to={thirdpath}
        className={`text-sm ${
          isActive([""])
            ? "font-extrabold text-text-bgColor-100"
            : "font-normal text-[#808080]"
        }`}
      >
        {thirdLink}
      </Link>
      <Link
        to={fourthpath}
        className={`text-sm ${
          isActive([" "])
            ? "font-extrabold text-text-bgColor-100"
            : "font-normal text-[#808080]"
        }`}
      >
        {fourthLink}
      </Link>
      <Link
        to={fifththpath}
        className={`text-sm ${
          isActive([""])
            ? "font-extrabold text-text-bgColor-100"
            : "font-normal text-[#808080]"
        }`}
      >
        {fifthLink}
      </Link>
      <Link
        to={sixthpath}
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

export default MenuHeader
