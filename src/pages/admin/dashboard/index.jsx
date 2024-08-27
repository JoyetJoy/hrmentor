import React from "react";
import { Clock4, Search,Calendar ,CircleAlert } from "lucide-react";
import { employeeDetails, meetings } from "@/constants/dummyData";

export const AdminDashboard = () => {
  return (
    <div className=" rounded-md my-3 flex items-baseline justify-between gap-4">
      {/* -----left------ */}
      <aside className="flex flex-col min-w-9/12 gap-3">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl  text-black">Dashbord</h1>
          <div className="flex items-center gap-3">
            <div className=" btn flex  justify-center  rounded-md font-normal text-xs items-center text-white px-6 h-10 min-h-10 bg-[#030E5C] hover:bg-[#030E5C] ">
              <Clock4 className=" size-4" />
              Clock in 
            </div>
            <label className="input outline-none border-none pr-28 flex items-center rounded-md  h-10 min-h-10 gap-2">
              <Search className="text-gray-200 object-contain size-4" />

              <input
                type="text"
                className="grow placeholder:text-sm focus:outline-none placeholder:text-gray-200 "
                placeholder="Search"
              />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 ">
          {employeeDetails.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-md">
              <h2 className="text-sm text-black font-semibold mb-6">
                {stat.title}
              </h2>
              <h1 className="flex items-end gap-3 text-black font-semibold text-3xl">
                {stat.value}
                <span className="text-textcolor-green flex items-center gap-1 justify-center text-sm">
                  <div className="w-3 h-3">
                    <img
                      src={stat.icon}
                      alt="increase"
                      className="object-contain w-full"
                    />
                  </div>
                  {stat.percentage}
                </span>
              </h1>
              <p className="text-gray-200 text-xs mt-1">{stat.description}</p>
            </div>
          ))}
        </div>
        {/* --------------- */}
        <div className="bg-white py-4 px-16">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-black font-bold text-xl flex items-center justify-center gap-3">
              Total Count{" "}
              <CircleAlert  className="size-5"/>

            </h1>
            <div className="flex items-center gap-3">
              <p className="text-xs text-gray-200">Provision Month </p>
              <h1 className="flex items-center text-black font-medium text-xs  gap-1">
              <Calendar className="size-4" />

                March 2020
              </h1>
              <div className="w-4 h-4">
                <img
                  src={'/assets/icons/admin/more-horizontal.svg'}
                  alt="moreIcon"
                  className="object-contain w-full"
                />
              </div>
            </div>
          </div>
          <div>
            <img src={'/assets/images/graph.png'} alt="" className="w-full object-contain" />
          </div>
        </div>
      </aside>
      {/* -------right------- */}
      <aside className="flex flex-col  w-3/12">
        <div className=" bg-white rounded-md px-6 py-3">
          <h1 className="text-base font-semibold mb-5">
            Employee Composition
            <br />
            <span className="text-gray-200 text-xs font-normal">
              Total Empployee:800
            </span>
          </h1>
          <div className="w-48 m-auto">
            <img
              src={"/assets/images/dataflow.png"}
              alt=""
              className="w-full"
            />
          </div>
        </div>
        <div className="bg-white rounded-md  p-6 mt-6">
          <h1 className="text-base font-semibold mb-5 text-black">
            News & Events
          </h1>
          <div className="flex flex-col gap-3">
            {meetings.map((meeting, index) => (
              <div
                key={index}
                className="flex flex-row border border-gray-300 rounded-md "
              >
                <h1 className="text-bgColor-100 font-medium text-sm text-center bg-gray-400 p-4">
                  {meeting.date} <br />
                  <span>{meeting.month}</span>
                </h1>
                <h2 className="text-black font-medium text-sm p-4">
                  {meeting.title} <br />
                  <span className="text-gray-200 font-normal text-xs">
                    {meeting.details}
                  </span>
                </h2>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};
