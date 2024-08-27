import { ArrowLeft, Share2 } from 'lucide-react';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function MenuSubHeader(props) {
  const location = useLocation();

  const isActive = (paths) => paths.includes(location.pathname);

  const { heading,
    FirstLink,
    SecondLink,
    Firstpath,
    Secondpath,
    Firsticon,
    currentpage,
    menuicon,
    Secondicon }

    = props;
  return (
    <div>
      <div className="flex flex-row justify-between items-center my-2 ">
        <h1 className='text-lg  font-bold text-[#2C2C2C] flex flex-row gap-1 items-center justify-center'>
          {menuicon}
          {heading}  <span className='text-xs'>{currentpage}</span>
        </h1>
        <div className="text-white font-semibold flex items-center gap-2">
          {location.pathname === '/admin/employees/primary' ? (
            <>
              <Link
                to=""
                className="btn bg-bgColor-300 text-xs text-black hover:bg-bgColor-300 min-w-40 shadow-none flex items-center justify-center gap-1 min-h-10 h-10"
              >
                <Share2 className="size-4" />
                Onboarding Form
              </Link>
              <Link
                to={Firstpath}
                className={"btn bg-btncolor text-white text-xs hover:bg-btncolor w-28 min-h-10 h-10"}
              >
                {FirstLink}
              </Link>
            </>
          ) : (
            <Link
              to={Secondpath}
              onClick={SecondLink.onClick}
              className={"btn bg-btncolor text-white text-xs hover:bg-btncolor   w-full min-h-10 h-10  flex flex-row items-center gap-1 whitespace-nowrap"}
            >
            {Secondicon}

            {SecondLink.label}
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}

export default MenuSubHeader
