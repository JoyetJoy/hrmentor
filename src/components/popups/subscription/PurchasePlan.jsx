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
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
            </form>
            <div className="flex flex-col items-start">
              <p className="text-red-600 text-sm font-bold">Pricing</p>
              <h1 className="text-2xl font-extrabold text-black my-3">
                Business
              </h1>
              <h2 className="text-4xl font-extrabold text-black">$20/Month</h2>

              {/* Display text */}
              <p className="text-justify my-4 text-sm">{data.text}</p>

              
              {data.list.map((item, index) => (
                <div key={index} className="mb-8">
                  <h3
                    className="text-xl font-semibold"
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
              <div className="flex flex-row justify-between w-full mt-3 items-center">
                <div className="flex flex-row items-center gap-2">
                  <p className="text-xs font-bold text-[#000000]">
                    Number Of License
                  </p>
                  <button
                    onClick={decrement}
                    className="rounded-full p-1 flex items-center size-5 justify-center border border-[#EAECF0]"
                  >
                    <Minus className="w-full object-contain" />
                  </button>
                  <span>{count}</span>
                  <button
                    onClick={increment}
                    className="rounded-full p-1 flex items-center size-5 justify-center border border-[#EAECF0]"
                  >
                    <Plus className="w-full object-contain" />
                  </button>
                </div>
                <button className="btn bg-[#181C3A] text-xs font-normal text-white px-4 py-0">
                  Purchase
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}

export default PurchasePlan

