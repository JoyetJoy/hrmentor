import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Plus, Minus, Info, X } from "lucide-react";
import { subcriptionModalData } from "../../../constants/dummyData";

export default function PurchasePlan({ isOpen, closeModal }) {
  const [count, setCount] = useState(1);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);

  const data = subcriptionModalData[0];
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex h-full w-full items-center justify-center bg-black/20">
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
                <Popover.Panel className="min-h-[45rem] w-[55rem] transform bg-white px-14 py-5">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => closeModal(false)}
                      className="text-g mt-2 font-extrabold text-gray"
                    >
                      <X  className=""/>
                    </button>
                  </div>
                  <div className="flex flex-col items-start px-5 py-5">
                    <p className="text-[15px] font-extrabold text-[#E95D39]">
                      Pricing
                    </p>
                    <h1 className="my-3 text-2xl font-extrabold text-black">
                      Business
                    </h1>
                    <h2 className="text-5xl font-bold text-black">
                      $20
                      <span className="text-2xl font-bold">
                        / User/ Month/ Build annually
                      </span>
                    </h2>
                    {/* Display text */}
                    <p className="my-3 text-justify text-sm tracking-wide text-gray">
                      {data.text}
                    </p>
                    <div className="mt-4 flex w-full flex-row items-baseline justify-between">
                      <div className="flex w-full flex-col">
                        <h1 className="mb-2 text-lg font-extrabold text-[#202020]">
                          Features
                        </h1>
                        {data?.list?.map((item, index) => (
                          <div key={index} className="flex flex-col">
                            <h3 className="my-3 text-sm font-extrabold text-[#101828]">
                              {item.title}
                            </h3>
                            <div className="flex flex-col gap-2">
                              {item?.value?.map((feature, featureIndex) => (
                                <p
                                  key={featureIndex}
                                  className="flex items-center gap-2 py-1 text-sm font-medium tracking-wide text-[#667085]"
                                >
                                  <div
                                    className="flex size-5 items-center justify-center rounded-full p-1"
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
                      <div className="mt-3 flex w-full flex-col items-start justify-between gap-1">
                        <h1 className="text-lg font-extrabold text-[#202020]">
                          Payment
                        </h1>
                        <p className="text-sm font-normal tracking-wide text-[#667085]">
                          Your current plan amount will be deducted from the new
                          package cost.{" "}
                        </p>
                        <div className="my-3 flex w-full flex-col items-start gap-2">
                          <p className="text-sm font-bold text-bgColor-100">
                            Choose number of license
                          </p>
                          <div className="my-3 flex flex-row items-center gap-5">
                            <button
                              onClick={decrement}
                              className="flex size-7 items-center justify-center rounded-md border border-[#EAECF0] bg-[#F1F1F1] p-1"
                            >
                              <Minus className="size-3 text-bgColor-100" />
                            </button>
                            <span className="text-sm font-semibold text-bgColor-100">
                              {count}
                            </span>
                            <button
                              onClick={increment}
                              className="flex size-7 items-center justify-center rounded-md border border-[#EAECF0] p-1"
                            >
                              <Plus className="size-3 text-bgColor-100" />
                            </button>
                          </div>
                          <div className="flex w-full flex-col gap-3 border-y border-gray-300 py-3">
                            <h1 className="flex flex-row justify-between text-sm font-semibold text-gray-700">
                              Current Plan Amount<span>$ 120</span>
                            </h1>
                            <h1 className="flex flex-row justify-between text-sm font-semibold text-gray-700">
                              Previous Plan Balance<span>$ 80</span>
                            </h1>
                            <h1 className="flex flex-row justify-between text-sm font-semibold text-gray-700">
                              Amount to be paid<span>$ 20</span>
                            </h1>
                          </div>
                        </div>
                        <p className="my-1 flex flex-row items-center gap-1 text-[11px] text-gray-800">
                          {" "}
                          <Info className="size-3" />
                          Fee applies if you can cancel after 10 days{" "}
                        </p>
                        <button className="btn mb-5 mt-2 flex h-11 min-h-11 w-11/12 flex-row items-center bg-bgColor-100 px-4 text-xs font-normal text-white hover:bg-bgColor-100">
                          Pay $ 40
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
