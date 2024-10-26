import { hiringMenu } from "@/constants/menus/hiring";
import { ArrowLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function MenuHeaderHiring({ page }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cid = searchParams.get("cid");
  return (
    <>
      <div className="my-3 flex flex-row items-center justify-between rounded-md">
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
              to={`${item?.link}?cid=${cid}`}
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
