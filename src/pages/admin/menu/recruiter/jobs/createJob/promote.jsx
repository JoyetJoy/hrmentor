import MenuHeader from "@/components/common/MenuHeader";
import CreateJobSideBar from "@/components/sidebars/recruiter/CreateJobSideBar";
import { ArrowLeft, Facebook, Link2, Linkedin, Twitter } from "lucide-react";
import React from "react";

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

      <div className="mb-3 mt-2 flex items-center justify-between">
        <h1 className="flex flex-row items-center justify-center gap-2 text-base font-bold text-black">
          {/* <ArrowLeft
            onClick={() => {
              history.back();
            }}
            className="size-4 cursor-pointer"
          /> */}
          Create New Job <div className="h-4 w-[.07rem] bg-gray-dimlight"></div>
          <span className="text-sm font-medium text-textcolor-darkCharcoal">Promote</span>
        </h1>
      </div>

      <div className="my-3 flex flex-row gap-2">
        <div className="w-full rounded-md bg-white p-7">
          <div className="flex flex-col">
            <h1 className="text-[0.94rem] font-semibold">
              You cannot purchase paid job board ads for the following reason(s)
            </h1>
            <p className="text-sm text-gray-soft">
              *The job is not an open status
            </p>
            <button className="mt-5 h-10 w-fit min-w-52 rounded bg-black text-sm font-semibold text-white">
              Copy Job Link
            </button>
          </div>

          <div className="my-10 flex flex-col gap-1">
            <h3 className="text-base font-semibold">Promote via</h3>
            <div className="mt-5 flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-full border border-gray-light bg-black/5">
                <Linkedin
                  strokeWidth={0.5}
                  className="size-5 fill-lightblue text-lightblue"
                />
              </div>
              <div className="flex size-14 items-center justify-center rounded-full border border-gray-light bg-black/5">
                <Facebook
                  strokeWidth={0.5}
                  className="size-5 fill-lightblue text-lightblue"
                />
              </div>
              <div className="flex size-14 items-center justify-center rounded-full border border-gray-light bg-black/5">
                <Twitter
                  strokeWidth={0.5}
                  className="size-5  fill-lightblue text-lightblue"
                />
              </div>
              <div className="flex size-14 items-center justify-center rounded-full border border-gray-light bg-black/5">
                <Link2 className="size-5 -rotate-45" />
              </div>
            </div>
          </div>
        </div>
        <CreateJobSideBar stepCounter={6} />
      </div>
    </div>
  );
}

export default RecPromoteJob;
