import React, { useState } from "react";
import PurchasePlan from "../popups/subscription/PurchasePlan";

export default function AvailablePlans({ data }) {
  const { name, price, list } = data;
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <PurchasePlan isOpen={isOpen} closeModal={closeModal} />
      <div className="flex flex-col border border-gray-300 shadow rounded-2xl pt-16 pb-6">
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-black text-4xl font-semibold">
            {price}
            <span className="text-lg">/Month</span>
          </h1>
          <h3 className="text-sm text-black font-semibold">{name}</h3>
        </div>
        {list.map((section, sectionIndex) => (
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
            className="btn  bg-[#181C3A]  hover:bg-[#181C3A] text-xs font-normal max-h-1 h-1 text-white px-24 py-0 "
            onClick={openModal}
          >
            Purchase
          </button>
        </div>
      </div>
    </>
  );
}
