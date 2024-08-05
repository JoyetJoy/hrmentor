import { ChevronRight, ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { availablePlanData } from "../../../../constants/dummyData";
import { Link } from "react-router-dom";
import cube from '/public/assets/images/cube.svg'
import PurchasePlan from "../../../../components/popups/subscription/PurchasePlan";

export const MenuSubscription = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className='bg-white py-1 px-6 flex flex-row items-center justify-between mt-3 rounded-md'>
        <h1 className='text-sm font-semibold text-black flex items-center justify-between gap-1'>
          Menu
          <ChevronRight className="size-3" />
          Account Management
          <ChevronRight className="size-3" />
          <span className='text-red-600'>Subscription</span>
        </h1>
      </div>
      <ArrowLeft className="relative top-16 left-7 size-5" />
      <div className="flex flex-col mt-2 px-64 bg-white ">
        <div className="flex flex-col gap-1 my-8 ">
          <p className="text-red-600 text-sm font-bold">Pricing</p>
          <h1 className="text-3xl text-black font-extrabold">
            Select Your Plan to Enhance
            <br /> HR Management
          </h1>
          <div className="px-16 py-6 bg-subcription  bg-cover bg-no-repeat w-full h-full my-6 ">
            <div className="flex flex-row items-center gap-1 mb-7 bg-bgColor bg-opacity-25 rounded-full py-1 px-2  w-1/4">
              <div className="size-5">
                <img src={cube} alt="cube" className="object-contain w-full" />
              </div>
              <h1 className="text-bgColor font-medium text-xs">Current Plan Details</h1>
            </div>
            <h3 className="text-sm text-white font-semibold">Basic Plan</h3>
            <h1 className="text-white text-3xl font-semibold my-1">
              $10<span className="text-lg">/User/Month/Build annually</span>
            </h1 >
            <hr className="my-3 text-white opacity-20" />
            <div className="flex flex-row  items-center justify-between">
              <h1 className=' flex flex-col text-sm font-medium text-white text-opacity-25 '>Number Of License:10
                <span className=' text-red-500 '>Valid till 22th July 2024</span>
              </h1>
              <button className='btn  bg-white  hover:bg-white text-sm font-semibold min-h-11 h-11 text-[#181C3A] px-8 py-0 '>
                Add More License
              </button>
            </div>
          </div>
        </div>
        {/* ----plans----- */}
        <hr className="w-max-" />
        <h1 className="font-extrabold text-textcolor-blue my-4 text-lg">Available Plans</h1>
        <div className="grid grid-cols-3 gap-4 mb-12">
          {availablePlanData.map((plan, planIndex) => (
            <div
              key={planIndex}
              className="flex flex-col border border-gray-300 shadow rounded-2xl pt-16 pb-6"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <h1 className="text-black text-4xl font-semibold">
                  {plan.price}<span className="text-lg">/Month</span>
                </h1>
                <h3 className="text-sm text-black font-semibold">{plan.name}</h3>
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
                    Valid till 22th July 2024
                  </h2>
                </span>
                <button
                  className='btn  bg-[#181C3A]  hover:bg-[#181C3A] text-xs font-normal max-h-1 h-1 text-white px-24 py-0 '
                  onClick={openModal}
                >
                  Purchase
                </button>
                <PurchasePlan isOpen={isOpen} closeModal={closeModal} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
