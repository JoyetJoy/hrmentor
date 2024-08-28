import { ArrowLeft, Share2 } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function MenuSubHeader(props) {
  const location = useLocation();

  const { 
    heading,
    FirstLink,
    SecondLink,
    Firstpath,
    Secondpath,
    Firsticon,
    currentpage,
    menuicon,
    Secondicon 
  } = props;

  const isPrimaryPath = location.pathname === '/admin/employees/primary';
  const isWorkInformationPath = location.pathname === '/admin/employees/work-information';

  return (
    <div>
      <div className="flex flex-row justify-between items-center my-2">
        <h1 className='text-lg font-bold text-[#2C2C2C] flex flex-row gap-1 items-center justify-center'>
          {menuicon}
          {heading} <span className='text-xs'>{currentpage}</span>
        </h1>
        {heading !== "Documents" && heading !== "Payslip" && (
  <div className="text-white font-semibold flex items-center gap-2">
    {isPrimaryPath && (
      <Link
        to=""
        className="btn bg-bgColor-300 text-xs text-black hover:bg-bgColor-300 min-w-40 shadow-none flex items-center justify-center gap-1 min-h-11 h-11"
      >
        <Share2 className="size-4" />
        Onboarding Form
      </Link>
    )}
    {(isPrimaryPath || isWorkInformationPath) ? (
      <Link
        to={Firstpath}
        onClick={FirstLink.onClick}
        className="btn bg-[#030E5C] text-white text-xs flex flex-row hover:bg-[#030E5C] min-w-24 min-h-11 h-11"
      >
        {FirstLink.label}
      </Link>
    ) : (
      <Link
        to={Secondpath}
        onClick={SecondLink.onClick}
        className="btn bg-[#030E5C] text-white text-xs rounded-[0.3rem] hover:bg-[#030E5C] min-w-24 min-h-11 h-11 whitespace-nowrap"
      >
        {Secondicon}
        {SecondLink.label}
      </Link>
    )}
  </div>
)}

      </div>
    </div>
  );
}

export default MenuSubHeader;
