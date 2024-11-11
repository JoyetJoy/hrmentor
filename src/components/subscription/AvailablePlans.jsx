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
      <div className="flex flex-col shadow-lg rounded-2xl pt-16 pb-6 w-11/12">
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-black text-[38px] font-semibold">
            {price}
            <span className="text-xl font-semibold">/Month</span>
          </h1>
          <h3 className="text-lg text-[#101828] font-semibold">{name}</h3>
        </div>
        {list.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="flex flex-col gap-1 items-baseline px-6 my-1 "
          >
            <h1
              className="text-base font-semibold my-1"
              style={{ color: section.textColor }}
            >
              {section.title}
            </h1>
            {section.value.map((item, itemIndex) => (
              <p
                key={itemIndex}
                className="flex gap-3 items-center text-sm tracking-wide text-gray-bright py-1"
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
        <div className="border-b-2 border-gray-300 mx-6 mt-4"></div>
        <div className="flex flex-col items-center justify-between  text-center  ">
          <span className="my-5 flex flex-col gap-1">
            <h1 className="text-[15px] font-normal text-gray-bright ">
              Number Of License:10
            </h1>
            <h2 className="text-sm  font-semibold text-hrmprimaryorange">
              Valid till 22th July 2024
            </h2>
          </span>
          <button
            className="btn  bg-hrmdarkblue  hover:bg-hrmdarkblue text-xs font-normal max-h-1 h-1 text-white px-24 py-0 "
            onClick={openModal}
          >
            Purchase
          </button>
        </div>
      </div>
    </>
  );
}
