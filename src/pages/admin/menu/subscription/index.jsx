import React, { useState } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { availablePlanData } from "../../../../constants/dummyData";
import PurchasePlan from "../../../../components/popups/subscription/PurchasePlan";
import AvailablePlans from "../../../../components/subscription/AvailablePlans";
import MenuHeader from "@/components/common/MenuHeader";

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
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={"Account Management"}
        currentpath={"Subscription"}
        activeMenu={"Subscription"}
        icon={  <ChevronRight className="size-3" />}
      />
       
        <div className="w-full bg-white px-6 mt-1 rounded-md">
          <ArrowLeft className="relative top-10 left-5 size-7" />
         <div className="flex flex-col  px-56  ">
        <div className="flex flex-col  mt-4  mb-6">
          <p className="text-[#E95D39] text-[15px] font-bold mb-3">Pricing</p>
          <h1 className="text-4xl text-black font-bold ">
            Select Your Plan to Enhance
            <br /> HR Management
          </h1>
          <div className="px-20 py-8 bg-subcription h-full w-full rounded-xl bg-cover bg-no-repeat my-6">
            <div className="flex flex-row items-center gap-1 mb-7 bg-white bg-opacity-25 rounded-full py-1 px-3 whitespace-nowrap w-fit h-full">
              <div className="size-6">
                <img src={"/assets/images/cube.svg"} alt="cube" className="object-contain w-full" />
              </div>
              <h1 className="text-white font-normal  text-sm">
                Current Plan Details
              </h1>
            </div>
            <h3 className="text-lg text-white font-semibold">Basic Plan</h3>
            <h1 className="text-white text-4xl font-semibold my-1">
              $10<span className="text-xl font-normal tracking-wider">/User/Month/Build annually</span>
            </h1>
            <hr className="my-3 text-white opacity-35" />
            <div className="flex flex-row  items-center justify-between mt-6">
              <h1 className=" flex flex-col text-[18px] font-thin text-white   ">
                Number Of License:10
                <span className=" text-[#E95D39] font-semibold ">
                  Valid till 22th July 2024
                </span>
              </h1>
              <button className="btn  bg-white  hover:bg-white text-lg font-bold  text-[#030E5C] px-12 min-h-14 rounded-md ">
                Add More License
              </button>
            </div>
          </div>


        </div>
        {/* ----plans----- */}
        <div className="h-[1px] w-full bg-black/10" />
        <h1 className="font-extrabold text-textcolor-blue  my-7 text-[21px]">
          Available Plans
        </h1>
        <div className="grid grid-cols-3 mb-12">
          {availablePlanData.map((plan, planIndex) => (
            <AvailablePlans data={plan} key={planIndex} />
          ))}
        </div>
      </div>
          </div>
       
     
    </>
  );
};
