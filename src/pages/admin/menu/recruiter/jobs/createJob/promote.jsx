import MenuHeader from "@/components/common/MenuHeader";
import ProjectManagerHeader from "@/components/common/ProjectManagerHeader";
import RecruiterSideBar from "@/components/sidebars/recruiter/RecruiterSideBar";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function RecPromoteJob() {
  return (
    <div>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      {/* ---projectmanager header--- */}
      <div className="my-4 flex flex-row items-center justify-between">
        <h1 className="flex items-center gap-1 text-base font-bold text-[#2C2C2C]">
          <ArrowLeft className="size-4" />
          Project manger
        </h1>
      </div>
      {/* --------- */}
      <div className="my-3 flex flex-row gap-2">
        <RecruiterSideBar />
        <div className="w-full rounded-md bg-white p-7">
          <h1 className="mb-4 text-base font-semibold">Promote</h1>
          <div className="flex flex-row items-center">
            <label className="label flex cursor-pointer gap-3">
              <span className="label-text text-base">Indeed</span>
              <input
                type="radio"
                name="radio-10"
                className="radio size-4 checked:bg-btncolor"
                defaultChecked
              />
            </label>
            <label className="label flex cursor-pointer gap-3">
              <span className="label-text">LinkedIn</span>
              <input
                type="radio"
                name="radio-10"
                className="radio size-4 checked:bg-btncolor"
                defaultChecked
              />
            </label>

            <label className="label flex cursor-pointer gap-3">
              <span className="label-text">Naukari</span>
              <input
                type="radio"
                name="radio-10"
                className="radio size-4 checked:bg-btncolor"
                defaultChecked
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecPromoteJob;
