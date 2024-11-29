import MenuHeader from "@/components/common/MenuHeader";
import RecruiterSideBar from "@/components/sidebars/recruiter/RecruiterSideBar";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function RecViewJobPromote() {
  return (
    <>
      <MenuHeader
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />
      <div className="my-4 flex flex-row items-center justify-between">
        <h1 className="flex items-center gap-1 text-base font-bold capitalize text-textcolor-darkCharcoal">
          {/* <ArrowLeft
            onClick={() => {
              history.back();
            }}
            className="size-4 cursor-pointer"
          /> */}
          Project Manager
        </h1>
        <div className="flex items-center gap-7 text-sm">
          <Link
            to="/admin/recruiter/jobs/view"
            className="flex gap-5 text-sm font-medium text-gray-neutral"
          >
            Candidates
          </Link>
          <Link
            to="/admin/recruiter/jobs/promote"
            className="flex gap-5 text-sm font-semibold text-hrmprimaryorange"
          >
            Promote
          </Link>
          <Link
            to="/admin/recruiter/jobs/refer"
            className="flex gap-5 text-sm  font-medium text-gray-neutral"
          >
            Refer
          </Link>
        </div>
      </div>
      <div className="my-3 flex flex-row gap-2">
        <RecruiterSideBar />
        <div className="w-full rounded-md bg-white p-7">
          <h1 className="font-bold mb-7 text-base">Promote</h1>
          <div className="flex items-center gap-10">
            <label className="flex items-center gap-1 text-sm font-medium">
              <input type="radio" className="size-3" />
              Indeed
            </label>
            <label className="flex gap-1  items-center text-sm font-medium">
              <input type="radio" className="size-3" />
              Linked In
            </label>
            <label className="flex gap-1  items-center text-sm font-medium">
              <input type="radio" className="size-3" />
              Naukari
            </label>
            <label className="flex gap-1  items-center text-sm font-medium">
              <input type="radio" className="size-3" />
              Find a job
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
