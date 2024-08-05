import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { subcriptionModalData } from "/src/constants/dummyData.js";

function PurchasePlan({ isOpen, closeModal }) {
  const [count, setCount] = useState(1);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);

  const data = subcriptionModalData[0];
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className=" z-10 fixed inset-0 bg-black bg-opacity-25   overflow-y-auto"
        onClose={closeModal}
      >
        <div className="flex items-center justify-center min-h-full p-10 text-center">
          <Dialog.Panel className="w-4/5 max-w-4xl p-7 relative overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-none">
            <form method="dialog">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-4 top-6 text-gray font-semibold"
                onClick={closeModal}
              >
                ✕
              </button>
            </form>
            <div className="flex flex-col items-start p-14">
              <p className="text-red-600 text-sm font-bold">Pricing</p>
              <h1 className="text-2xl font-extrabold text-black my-3">
                Business
              </h1>
              <h2 className="text-5xl font-extrabold text-black">$20<span className="text-xl font-semibold">/ User/ Month/ Build annually</span></h2>

              {/* Display text */}
              <p className="text-justify my-3 text-sm text-gray">{data.text}</p>
              
              <div className="flex flex-row justify-between items-baseline w-full">

                <div className="flex flex-col w-full">
                <h1 className="font-bold text-lg mb-2">Features</h1>

                {data.list.map((item, index) => (
                <div key={index} className="mb-5 flex flex-col">
                   
                  <h3
                    className="text-sm font-bold my-2"
                    style={{ color: item.textColor }}
                  >
                    {item.title}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {item.value.map((feature, featureIndex) => (
                      <p
                        key={featureIndex}
                        className="flex gap-2 items-center text-xs text-[#667085] py-1"
                      >
                        <div
                          className="rounded-full p-1 flex items-center size-5 justify-center"
                          style={{ backgroundColor: item.bgColor }}
                        >
                          <img
                            src={item.imgSrc}
                            alt="tick"
                            className="w-full object-contain"
                          />
                        </div>
                        {feature}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
                </div>
              
               <div className="flex flex-col justify-between gap-1 w-full mt-3 items-start">
               <h1 className="font-bold text-lg">Payment</h1>
               <p className="text-sm text-[#667085]  ">Your current plan amount will be deducted from the new package cost. </p>
               <div className="flex flex-col items-start gap-2 my-3">
                  <p className="text-xs font-bold text-[#000000]">
                  Choose number of license</p>
                  <div className="flex flex-row items-start gap-4">
                  <button
                    onClick={decrement}
                    className="rounded-md p-1 flex items-center size-6 bg-[#F1F1F1] justify-center border border-[#EAECF0]"
                  >
                    <Minus className="w-full object-contain" />
                  </button>
                  <span className="font-semibold text-sm">{count}</span>
                  <button
                    onClick={increment}
                    className="rounded-md p-1 flex items-center size-6 justify-center border border-[#EAECF0]"
                  >
                    <Plus className="w-full object-contain" />
                  </button>
                  </div>g
                  <div className="w-full">
                    <h1 className="flex  justify-between flex-row ">Current Plan Amount<span>$ 120</span></h1>
                    <h1>Previous Plan Balance<span>$ 80</span></h1>
                     <h1>Amount to be paid<span>$ 20</span></h1>
                  </div>
                  
                 
                </div>
                <button className="btn bg-[#181C3A] text-xs font-normal text-white px-4 py-0">
                  Purchase
                </button>
              </div>
                </div>
             
              
              
             
             
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}

export default PurchasePlan

