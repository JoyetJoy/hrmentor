import { Check } from "lucide-react";
import React, { useState } from "react";
const steps = [
  "Post",
  "Application",
  "Team",
  "Interview Guides",
  "Refer",
  "Promote",
];
function CreateJobSideBar() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([0]);

  return (
    <div className="w-1/3 bg-white rounded-md p-5 relative">
      <div className="border-l-2 border-[#CACACA] absolute    left-10 top-10 bottom-10 z-0" />
      <div className="flex flex-col gap-y-4">
        <div className="h-12 bg-[#F5F5F7]  rounded flex  gap-2 items-center px-3 ">
          <div className="size-4 bg-[#65D43E] border border-[#46A724]  rounded-full z-50" />
          <p>Post</p>
        </div>
        <div className=" ml-5  text-sm rounded flex flex-col  gap-3  px-3 ">
          {/* <div className="size-4 bg-[#ABABAB] rounded-full z-50"/> */}
          <p>
            You must complete all required field to save or publish the job.
          </p>
          <div className="flex  items-center gap-x-2">
            <div className="size-5 flex items-center text-sm border border-[#65D43E17] justify-center bg-[#F0FFF1] rounded-full">
              <Check className="text-[#3FB117] size-3" />
            </div>
            <p>Job Details</p>
          </div>
          <div className="flex  items-center gap-x-2">
            <div className="size-5 flex items-center text-sm border border-[#65D43E17] justify-center bg-[#F0FFF1] rounded-full">
              <Check className="text-[#3FB117] size-3" />
            </div>
            <p>Advance Job details</p>
          </div>
          <div className="flex  items-center gap-x-2">
            <div className="size-5 flex items-center text-sm border border-[#65D43E17] justify-center bg-[#F0FFF1] rounded-full">
              <Check className="text-[#3FB117] size-3" />
            </div>
            <p>Sensitive Data</p>
          </div>
          <div className="flex  items-center gap-x-2">
            <div className="size-5 flex items-center text-sm border border-[#65D43E17] justify-center bg-[#F0FFF1] rounded-full">
              <Check className="text-[#3FB117] size-3" />
            </div>
            <p>Exposure</p>
          </div>
        </div>

        <div className="h-12 bg-[#F5F5F7]  rounded flex gap-2 items-center px-3 ">
          <div className="size-4 bg-[#ABABAB] border border-[#ABABAB] rounded-full z-50" />
          <p className="text-[#7F7F7F]">Application</p>
        </div>
        <div className="h-12 bg-[#F5F5F7]  rounded flex gap-2  items-center px-3 ">
          <div className="size-4 bg-[#ABABAB] border border-[#ABABAB] rounded-full z-50" />
          <p className="text-[#7F7F7F]">Team</p>
        </div>
        <div className="h-12 bg-[#F5F5F7]  rounded flex gap-2 items-center px-3 ">
          <div className="size-4 bg-[#ABABAB] border border-[#ABABAB] rounded-full z-50" />
          <p className="text-[#7F7F7F]">Interview Guides</p>
        </div>
        <div className="h-12 bg-[#F5F5F7]  rounded flex gap-2 items-center px-3 ">
          <div className="size-4 bg-[#ABABAB] border border-[#ABABAB] rounded-full z-50" />
          <p className="text-[#7F7F7F]">Refer</p>
        </div>
        <div className="h-12 bg-[#F5F5F7]  rounded flex gap-2 items-center px-3 ">
          <div className="size-4 bg-[#ABABAB] border border-[#ABABAB] rounded-full z-50" />
          <p className="text-[#7F7F7F]">Promote</p>
        </div>
      </div>
    </div>
  );
}

export default CreateJobSideBar;
