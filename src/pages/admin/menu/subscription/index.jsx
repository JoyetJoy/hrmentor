import { ChevronRight, Link } from "lucide-react";
import React, { useState } from "react";
import { availablePlanData } from "../../../../constants/dummyData";

export const MenuSubscription = () => {
    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1);
    };
    const decrement = () => {
        setCount(count - 1);
    };
  return (
    <>
      <div className="bg-white py-1 px-6 flex flex-row items-center justify-between mt-3 rounded-md">
        <h1 className="text-sm font-semibold text-black flex items-center justify-between gap-1">
          Menu
          <ChevronRight className="size-3" />
          Account Management
          <ChevronRight className="size-3" />
          <span className="text-red-600">subscription</span>
        </h1>
        <div className="text-base flex items-center gap-5 font-semibold ">
          <Link to="/admin-management/role">Role</Link>
          <Link
            to="/admin-management/subscription"
            className="flex items-center gap-6 text-[#808080]"
          >
            Subscription
          </Link>
        </div>
      </div>

      <div className="flex flex-col mt-5 px-64">
        <div className="flex flex-col gap-1 mb-16">
          <p className="text-red-600 text-sm font-bold">Pricing</p>
          <h1 className="text-3xl text-black font-extrabold">
            Select Your Plan to Enhance
            <br /> HR Management
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {availablePlanData.map((plan, planIndex) => (
            <div
              key={planIndex}
              className="flex flex-col border border-gray-300 shadow rounded-2xl pt-16 pb-6"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <h1 className="text-black text-4xl font-semibold">
                  $10<span className="text-lg">/Month</span>
                </h1>
                <h3 className="text-sm text-black font-semibold">Basic Plan</h3>
              </div>
              {plan.list.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="flex flex-col gap-1 items-baseline px-6 my-1 "
                >
                  <h1
                    className="text-sm font-semibold my-1"
                    style={{ color: section.textColor }}
                  >
                    {section.title}
                  </h1>
                  {section.value.map((item, itemIndex) => (
                    <p
                      key={itemIndex}
                      className="flex gap-2 items-center text-xs text-[#667085] py-1"
                    >
                      <div
                        style={{ backgroundColor: section.bgColor }}
                        className="rounded-full p-1 flex items-center  size-5 justify-center"
                      >
                        <img
                          src={section.imgSrc}
                          alt="tick"
                          className=" w-full object-contain"
                        />
                      </div>
                      {item}
                    </p>
                  ))}
                </div>
              ))}
              <div className="border-b-2 border-gray-300 mx-6"></div>
              <div className="flex flex-col items-center justify-between  text-center  ">
                <span className="my-5 flex flex-col gap-1">
                  <h1 className="text-xs font-medium text-gray-200 ">
                    Number Of License:10
                  </h1>
                  <h2 className="text-xs  font-medium text-red-500">
                    Valid till 22th july 2024
                  </h2>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
