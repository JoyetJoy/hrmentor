import { hiringMenu } from "@/constants/menus/hiring";
import { ArrowLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function MenuHeaderHiring({ page }) {
  return (
    <>
      <div className="my-2 flex flex-row items-center justify-between rounded-md bg-white px-4 py-2">
        <div
          className={`flex items-center justify-between text-sm font-semibold text-[#030E5C]`}
        >
          <ArrowLeft
            onClick={() => {
              history.back();
            }}
            className="mr-2 size-4 cursor-pointer"
          />
          Menu
          <ChevronRight className="size-3" />
          <Link
            className="capitalize text-hrmprimaryorange"
            to={"/admin/hiring"}
          >
            Hiring
          </Link>
        </div>
        <div className="flex items-center gap-5 text-sm font-semibold">
          {hiringMenu.map((item) => (
            <Link
              key={item?.id}
              to={item?.link}
              className={`px-2 py-1 text-sm ${
                page === item?.id
                  ? "active-menu font-extrabold text-hrmprimaryorange before:bg-hrmprimaryorange"
                  : "font-normal text-[#808080]"
              }`}
            >
              {item?.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default MenuHeaderHiring;
