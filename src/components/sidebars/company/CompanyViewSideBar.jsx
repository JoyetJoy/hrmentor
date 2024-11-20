import React from 'react'
import { Link } from 'react-router-dom'

export default function CompanyViewSideBar({ sidebarList, active }) {
    // companySettingSideList
  return (
    <div className="min-h-full min-w-64 rounded-md bg-white px-5 py-6">
    <ul className="flex flex-col justify-center gap-5 text-sm text-gray-dark">
      {sidebarList?.map((item) => (
        <li
          key={item?.id}
          className={`flex items-center gap-x-3 whitespace-nowrap text-sm ${active === item?.name ? "font-bold text-hrmprimaryorange" : "font-medium text-gray-dark"}`}
        >
          {/* {item?.icon}     */}
          <Link to={item?.link} className="whitespace-nowrap">
            {item?.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
  )
}
