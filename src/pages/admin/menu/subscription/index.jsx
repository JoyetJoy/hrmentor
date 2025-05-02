import React, { useState } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { availablePlanData } from "../../../../constants/dummyData";
import PurchasePlan from "../../../../components/popups/subscription/PurchasePlan";
import AvailablePlans from "../../../../components/subscription/AvailablePlans";
import MenuHeader from "@/components/common/MenuHeader";
import { useQuery } from "@tanstack/react-query";
import { newRequest, SUBSCRIPTION } from "@/api";

export const MenuSubscription = () => {
  const [count, setCount] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["subsciption"],
    queryFn: () =>
      newRequest.get(SUBSCRIPTION).then((res) => {
        return res.data;
      }),
  });

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
        icon={<ChevronRight className="size-3" />}
      />

      <div className="mt-1 w-full rounded-md bg-white px-6">
        <ArrowLeft className="relative left-5 top-10 size-5" />
        <div className="flex flex-col px-32">
          <div className="mb-6 mt-4 flex flex-col">
            <p className="mb-3 text-[15px] font-bold text-hrmprimaryorange">
              Pricing
            </p>
            <h1 className="text-3xl font-bold text-black">
              Select Your Plan to Enhance
              <br /> HR Management
            </h1>
            <div className="my-6 h-full w-full rounded-xl bg-subcription bg-cover bg-no-repeat px-20 py-8">
              <div className="mb-7 flex h-full w-fit flex-row items-center gap-1 whitespace-nowrap rounded-full bg-white bg-opacity-25 px-3 py-1">
                <div className="size-6">
                  <img
                    src={"/assets/images/cube.svg"}
                    alt="cube"
                    className="w-full object-contain"
                  />
                </div>
                <h1 className="text-sm font-normal text-white">
                  Current Plan Details
                </h1>
              </div>
              <h3 className="text-lg font-semibold text-white">{data?.purchased_package?.package_name}</h3>
              <h1 className="my-1 text-4xl font-semibold text-white">
                £{data?.purchased_package?.purchased_amount}
                <span className="text-xl font-normal tracking-wider">
                  /Month
                </span>
              </h1>
              <hr className="my-3 text-white opacity-35" />
              <div className="mt-6 flex flex-row items-center justify-between">
                <h1 className="flex flex-col text-[18px] font-thin text-white">
                  Number Of License:{data?.purchased_package?.licence_count}
                  <span className="font-semibold text-hrmprimaryorange">
                    Valid till {data?.purchased_package?.expiry_date}
                  </span>
                </h1>
                {/* <button className="btn min-h-14 rounded-md bg-white px-12 text-lg font-bold text-hrmblue hover:bg-white">
                  Add More License
                </button> */}
              </div>
            </div>
          </div>
          {/* ----plans----- */}
          <div className="h-[1px] w-full bg-black/10" />
          <h1 className="text-textcolor-blue my-7 text-xl font-bold">
            Available Plans
          </h1>
          <div className="mb-12">
              <AvailablePlans/>
          </div>
        </div>
      </div>
    </>
  );
};
