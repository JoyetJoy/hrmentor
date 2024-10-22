import { Check } from "lucide-react";
import { Link } from "react-router-dom";

function CreateJobSideBar({ stepCounter }) {
  // Main steps
  const mainSteps = [
    { label: "Post", step: 1 },
    { label: "Application", step: 2 },
    { label: "Team", step: 3 },
    { label: "Interview Guides", step: 4 },
    { label: "Refer", step: 5 },
    { label: "Promote", step: 6 },
  ];

  // Sub-steps under Post
  const postSubSteps = [
    { label: "Job Details", step: 1.1 },
    { label: "Advance Job Details", step: 1.2 },
    { label: "Sensitive Data", step: 1.3 },
    { label: "Exposure", step: 1.4 },
  ];

  return (
    <div className="flex w-1/3 flex-col gap-3">
      <div className="relative rounded-md bg-white p-5">
        <div className="absolute bottom-10 left-10 top-10 z-0 border-l-2 border-[#CACACA]" />
        <div className="flex flex-col gap-y-4">
          {/* Render Main Steps */}
          {mainSteps.map((mainStep, index) => (
            <div key={index}>
              {/* Main Step */}
              <div className="flex h-12 items-center gap-2 rounded bg-[#F5F5F7] px-3 text-[0.94rem]">
                <div
                  className={`z-10 size-4 rounded-full border ${
                    stepCounter >= mainStep.step
                      ? "border-[#46A724] bg-[#65D43E]"
                      : "border-[#ABABAB] bg-[#ABABAB]"
                  }`}
                />
                <p
                  className={
                    stepCounter >= mainStep.step
                      ? "text-black"
                      : "text-[#7F7F7F]"
                  }
                >
                  {mainStep.label}
                </p>
              </div>

              {/* Sub-steps for 'Post' */}
              {mainStep.step === 1 && stepCounter >= 1 && (
                <div className="ml-5 flex flex-col gap-3 rounded px-3 text-sm">
                  {postSubSteps.map((subStep, subIndex) => (
                    <div key={subIndex} className="flex items-center gap-x-2">
                      <div
                        className={`flex size-5 items-center justify-center rounded-full border ${
                          stepCounter >= subStep.step
                            ? "border-[#65D43E17] bg-[#F0FFF1]"
                            : "border-[#ABABAB] bg-[#F5F5F7]"
                        }`}
                      >
                        {stepCounter >= subStep.step && (
                          <Check className="size-3 text-[#3FB117]" />
                        )}
                      </div>
                      <p
                        className={
                          stepCounter >= subStep.step
                            ? "text-black"
                            : "text-[#7F7F7F]"
                        }
                      >
                        {subStep.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {stepCounter === 6 && (
        <Link
          to="/admin/recruiter/jobs"
          className="flex h-11 items-center justify-center rounded bg-black/80 text-[0.9rem] font-medium text-white"
        >
          SUBMIT & PUBLISH
        </Link>
      )}
    </div>
  );
}

export default CreateJobSideBar;
