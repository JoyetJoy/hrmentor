import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

import {
  HeaderLogo,
  DashbordIcon,
  recruiterIcon,
  hiringIcon,
  employeeIcon,
  attendanceIcon,
  notificationIcon,
  dashbordgroupIcon,
  profilemangIcon,
  companyIcon,
  accountIcon,
  logoutIcon,
  projectIcon,
  taskIcon,
  rosterIcon,
  payrollIcon,
  setupIcon,
} from "../../../utils";


const menuitems = [
  { id: 1, image: DashbordIcon, name: "Dashboard" },
  { id: 2, image: recruiterIcon, name: "Recruiter" },
  { id: 3, image: hiringIcon, name: "Hiring" },
  { id: 4, image: employeeIcon, name: "Employee" },
  { id: 5, image: attendanceIcon, name: "Attendance" },
];
const activityItems = [
  { icon: projectIcon, label: "Project" },
  { icon: taskIcon, label: "Task" },
  { icon: rosterIcon, label: "Roster" },
  { icon: payrollIcon, label: "Payroll" },
  { icon: setupIcon, label: "Setup" },
];
const adminItems = [
  {
    icon: profilemangIcon,
    label: "Profile Management",
    path: "/profile-management",
  },
  { icon: companyIcon, label: "Company Settings", path: "/company-settings" },
  {
    icon: accountIcon,
    label: "Account Management",
    path: "/admin/roles",
  },
  { icon: logoutIcon, label: "Log Out", path: "/logout" },
];
export const AdminHeader = () => {
  const [visibleSection, setVisibleSection] = useState(null);

  const handleClick = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between bg-white py-3 px-5 rounded-md">
        <div className="flex flex-row gap-3">
          <div className="w-12">
            <img
              src={HeaderLogo}
              alt="logo image"
              className="object-contain w-full"
            />
          </div>
          <span className="font-monorope text-base font-normal ">
            Welcome,
            <h1 className="font-semibold text-lg">Tech Butomy Pvt Ltd</h1>
          </span>
        </div>
        <div className="flex items-center justify-center gap-7">
          {menuitems.map((item) => (
            <Link key={item.id} className="flex flex-col items-center gap-1">
              <div>
                <img
                  src={item.image}
                  alt={`${item.name} icon`}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-semibold">{item.name}</p>
            </Link>
          ))}
        </div>
        <div className="flex gap-3 items-center justify-center">
          <div className="w-10 h-10 p-2 rounded-full bg-gray-100 flex justify-center items-center">
            <img
              src={notificationIcon}
              alt="notification icon"
              className="object-contain"
            />
          </div>
          <Menu as="div" className="relative inline-block text-left">
            <div className="w-10 h-10 p-3 rounded-full bg-gray-100 flex justify-center items-center cursor-pointer">
              <Menu.Button>
                <img
                  src={dashbordgroupIcon}
                  alt="dashboard icons"
                  className="object-contain"
                />
              </Menu.Button>
            </div>
            <Menu.Items className="absolute top-12 w-36 bg-white shadow-lg rounded-lg p-4">
              <ul className="flex flex-col gap-5">
                {activityItems.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <li
                        className={`text-xs font-semibold flex gap-3 whitespace-nowrap items-center  cursor-pointer ${
                          active ? "" : ""
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
                <div className="w-11 h-11 overflow-hidden rounded-full bg-gray-100">
                  {/* <img src={ProfileImage} alt="logo image" className='object-contain w-full' /> */}
                </div>
                <h1 className="text-textcolor-100  text-base flex font-semibold flex-col text-start">
                  Super Admin
                  <span className="text-textcolor-200 font-semibold text-xs">
                    Administrator
                  </span>
                </h1>
              </Menu.Button>
              <Menu.Items className="absolute top-12 w-48 bg-white shadow-lg rounded-lg p-4">
                <ul className="flex flex-col gap-5">
                  {adminItems.map((item, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <li
                          onClick={() => handleNavigation(item.path)}
                          className={`text-xs font-semibold flex gap-2 whitespace-nowrap items-center cursor-pointer ${
                            active ? "" : ""
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
