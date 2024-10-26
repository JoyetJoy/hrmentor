import { recCandidateMenus } from "@/constants/menus/recruiter";
import { MoveLeft, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function MenuHeaderHiring({ page, candidate }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cid = searchParams.get("cid");
  return (
    <>
      <div className="my-3 flex flex-row items-center justify-between rounded-md">
        <div className="flex items-center justify-center gap-2">
          <Link to="/admin/recruiter/candidate">
            <MoveLeft />
          </Link>
        </div>
        <div className="flex items-center gap-10 text-sm font-semibold">
          {recCandidateMenus.map((item) => (
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
        <div className="flex items-center gap-10 text-sm font-semibold">
          {recCandidateMenus.map((item) => (
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
