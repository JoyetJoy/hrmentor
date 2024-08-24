import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { menuitems, adminItems, activityItems } from "@/constants/dummyData";
import { LayoutGrid, MessageSquareText } from "lucide-react";

export const AdminHeader = () => {
  const [visibleSection, setVisibleSection] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };
  const handleNavigation = (path) => {
    navigate(path);
  };
  const isActiveLink = (path) => location.pathname.includes(path);
 

  return (
    <>
      <div className="flex flex-row items-center relative justify-between  py-2 bg-white  px-5 rounded-md">
        <div className="flex flex-row gap-3 ">
          <div className="w-11">
            <img
              src={"/assets/images/logo-header.svg"}
              alt="logo image"
              className="object-contain w-full h-full"
            />
          </div>
          <span className="font-monorope text-base font-normal">
            Welcome,
            <h1 className="font-semibold mt-0">Tech Butomy Pvt Ltd</h1>
          </span>
        </div>
        <div className="flex items-center relative justify-center gap-7">
          {menuitems.map((item) => (
            <NavLink
              to={item.path}
              key={item.id}
              className={`flex flex-col items-center  text-textcolor-darkblue gap-1  ${isActiveLink(item.active) ? "activeLink" :""}`}
            >
              {item.iconType === 'image' ? (
                <img src={item.iconSrc} alt={item.alt} className="w-5 h-5" />
              ) : (
                React.createElement(item.icon, {
                  size: 20,
                  className: isActiveLink(item.active) ? 'text-[#E95D39]' : 'text-textColor-darkblue',
                })
              )}
              <p className={`text-xs mb-4 font-semibold ${isActiveLink(item.active) ? " text-[#E95D39]" :"text-textcolor-darkblue"}`}>{item.name}</p>
            </NavLink>
          ))}
        </div>
        <div className="flex gap-3 items-center justify-center">
          <div className="w-10 h-10 p-2 rounded-full bg-gray-100 flex justify-center items-center">
            <MessageSquareText className="size-5 text-textcolor-blue" />
          </div>
          <Menu as="div" className="relative inline-block text-left">
            <div className="w-10 h-10 p-3 rounded-full bg-gray-100 flex justify-center items-center cursor-pointer">
              <Menu.Button>
                <LayoutGrid className="size-5 text-textcolor-blue" />
              </Menu.Button>
            </div>
            <Menu.Items className="absolute top-12 w-36 bg-white shadow-lg z-20 rounded-lg p-4">
              <ul className="flex flex-col gap-5">
                {activityItems.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <li
                        className={`text-xs font-semibold flex gap-3 whitespace-nowrap items-center cursor-pointer ${active ? "" : ""
                          }`}
                      >
                        <div className="w-4 h-4">
                          <img
                            src={item.icon}
                            alt={`${item.label} icon`}
                            className="w-full object-contain"
                          />
                        </div>
                        {item.label}
                      </li>
                    )}
                  </Menu.Item>
                ))}
              </ul>
            </Menu.Items>
          </Menu>
          <div className="flex flex-col gap-3 items-center relative">
            <Menu>
              <Menu.Button className="flex flex-row gap-3 items-center cursor-pointer">
                <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-100">
                
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" className="w-full object-contain" />
                  </div>                 
                <h1 className="text-textcolor-100 text-sm flex font-medium flex-col text-start text-textcolor-darkblue">
                  Super Admin
                  <span className="text-textcolor-200 font-semibold text-xs">
                    Administrator
                  </span>
                </h1>
              </Menu.Button>
              <Menu.Items className="absolute top-12 w-48 bg-white shadow-lg rounded-lg p-4 z-20">
                <ul className="flex flex-col gap-5">
                  {adminItems.map((item, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <li
                          onClick={() => handleNavigation(item.path)}
                          className={`text-xs font-semibold flex gap-2 whitespace-nowrap items-center cursor-pointer ${active ? "" : ""
                            }`}
                        >
                          <div className="w-4 h-4">
                            <img
                              src={item.icon}
                              alt={`${item.label} icon`}
                              className="w-full object-contain"
                            />
                          </div>
                          {item.label}
                        </li>
                      )}
                    </Menu.Item>
                  ))}
                </ul>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};
