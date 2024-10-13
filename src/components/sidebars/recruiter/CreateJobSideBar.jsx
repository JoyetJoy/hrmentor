import { Check } from "lucide-react";

function CreateJobSideBar() {
  return (
    <div className="relative w-1/3 rounded-md bg-white p-5">
      <div className="absolute bottom-10 left-10 top-10 z-0 border-l-2 border-[#CACACA]" />
      <div className="flex flex-col gap-y-4">
        <div className="flex h-12 items-center gap-2 rounded bg-[#F5F5F7] px-3">
          <div className="z-50 size-4 rounded-full border border-[#46A724] bg-[#65D43E]" />
          <p>Post</p>
        </div>
        <div className="ml-5 flex flex-col gap-3 rounded px-3 text-sm">
          <p>
            You must complete all required field to save or publish the job.
          </p>
          <div className="flex items-center gap-x-2">
            <div className="flex size-5 items-center justify-center rounded-full border border-[#65D43E17] bg-[#F0FFF1] text-sm">
              <Check className="size-3 text-[#3FB117]" />
            </div>
            <p>Job Details</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex size-5 items-center justify-center rounded-full border border-[#65D43E17] bg-[#F0FFF1] text-sm">
              <Check className="size-3 text-[#3FB117]" />
            </div>
            <p>Advance Job details</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex size-5 items-center justify-center rounded-full border border-[#65D43E17] bg-[#F0FFF1] text-sm">
              <Check className="size-3 text-[#3FB117]" />
            </div>
            <p>Sensitive Data</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex size-5 items-center justify-center rounded-full border border-[#65D43E17] bg-[#F0FFF1] text-sm">
              <Check className="size-3 text-[#3FB117]" />
            </div>
            <p>Exposure</p>
          </div>
        </div>

        <div className="flex h-12 items-center gap-2 rounded bg-[#F5F5F7] px-3">
          <div className="z-50 size-4 rounded-full border border-[#ABABAB] bg-[#ABABAB]" />
          <p className="text-[#7F7F7F]">Application</p>
        </div>
        <div className="flex h-12 items-center gap-2 rounded bg-[#F5F5F7] px-3">
          <div className="z-50 size-4 rounded-full border border-[#ABABAB] bg-[#ABABAB]" />
          <p className="text-[#7F7F7F]">Team</p>
        </div>
        <div className="flex h-12 items-center gap-2 rounded bg-[#F5F5F7] px-3">
          <div className="z-50 size-4 rounded-full border border-[#ABABAB] bg-[#ABABAB]" />
          <p className="text-[#7F7F7F]">Interview Guides</p>
        </div>
        <div className="flex h-12 items-center gap-2 rounded bg-[#F5F5F7] px-3">
          <div className="z-50 size-4 rounded-full border border-[#ABABAB] bg-[#ABABAB]" />
          <p className="text-[#7F7F7F]">Refer</p>
        </div>
        <div className="flex h-12 items-center gap-2 rounded bg-[#F5F5F7] px-3">
          <div className="z-50 size-4 rounded-full border border-[#ABABAB] bg-[#ABABAB]" />
          <p className="text-[#7F7F7F]">Promote</p>
        </div>
      </div>
    </div>
  );
}

export default CreateJobSideBar;
