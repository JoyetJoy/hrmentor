import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Plus, Minus,Info } from "lucide-react";
import { subcriptionModalData } from "../../../constants/dummyData";

export default function PurchasePlan({ isOpen, closeModal }) {
  const [count, setCount] = useState(1);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);

  const data = subcriptionModalData[0];
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-[100] w-full h-full flex items-center justify-center">
          <Popover className="relative">
            <>
              <Transition
                as={Fragment}
                show={isOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="w-[50rem] h-fit  transform px-14 py-5 bg-white ">
                  <div className="flex justify-end items-center">
                    <button
                      onClick={() => closeModal(false)}
                      className="text-gray font-extrabold text-g  mt-2"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex flex-col items-start px-5 py-5 ">
                    <p className="text-red-600 text-xs font-bold">Pricing</p>
                    <h1 className="text-2xl font-extrabold text-black my-3">
                      Business
                    </h1>
                    <h2 className="text-4xl font-extrabold text-black">
                      $20
                      <span className="text-lg font-semibold">
                        / User/ Month/ Build annually
                      </span>
                    </h2>
                    {/* Display text */}
                    <p className="text-justify my-3 text-sm text-gray">
                      {data.text}
                    </p>
                    <div className="flex flex-row justify-between items-baseline w-full">
                      <div className="flex flex-col w-full">
                        <h1 className="font-bold text-base mb-2">Features</h1>
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
                        <h1 className="font-bold text-base">Payment</h1>
                        <p className="text-sm text-[#667085]  ">
                          Your current plan amount will be deducted from the new
                          package cost.{" "}
                        </p>
                        <div className="flex flex-col items-start  w-full gap-2 my-3">
                          <p className="text-xs font-bold text-[#000000]">
                            Choose number of license
                          </p>
                          <div className="flex flex-row items-start my-3 gap-4">
                            <button
                              onClick={decrement}
                              className="rounded-md p-1 flex items-center size-6 bg-[#F1F1F1] justify-center border border-[#EAECF0]"
                            >
                              <Minus className="w-full object-contain" />
                            </button>
                            <span className="font-semibold text-sm">
                              {count}
                            </span>
                            <button
                              onClick={increment}
                              className="rounded-md p-1 flex items-center size-6 justify-center border border-[#EAECF0]"
                            >
                              <Plus className="w-full object-contain" />
                            </button>
                          </div>
                          <div className="w-full border-y border-gray-300 py-3 flex flex-col gap-2">
                            <h1 className="flex justify-between flex-row text-xs text-gray-700 font-semibold ">
                              Current Plan Amount<span>$ 120</span>
                            </h1>
                            <h1  className="flex justify-between flex-row text-xs text-gray-700 font-semibold ">
                              Previous Plan Balance<span>$ 80</span>
                            </h1>
                            <h1  className="flex justify-between flex-row text-xs text-gray-700 font-semibold ">
                              Amount to be paid<span>$ 20</span>
                            </h1>
                          </div>
                        </div>
                        <p className="flex flex-row gap-1 items-center text-xs text-gray-800"> <Info className="size-3" />Fee applies if you can cancel after 10 days </p>
                        <button className="btn bg-bgColor-100  flex flex-row items-center text-xs font-normal w-11/12 mb-5	mt-2 min-h-10 h-10 text-white px-4">
                        Pay $40                        
                        </button>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          </Popover>
        </div>
      )}
    </>
  );
}
