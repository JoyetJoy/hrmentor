import { newRequest } from "@/api";
import { Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function CreateJobSideBar({ stepCounter }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jid = searchParams.get("jid");
  // Main steps
  const mainSteps = [
    { label: "Post", step: 1 },
    { label: "Application", step: 2 },
    { label: "Team", step: 3 },
    { label: "Interview Guides", step: 4 },
    // { label: "Refer", step: 5 },
    // { label: "Promote", step: 6 },
  ];

  // Sub-steps under Post
  const postSubSteps = [
    { label: "Job Details", step: 1.1 },
    { label: "Advance Job Details", step: 1.2 },
    { label: "Sensitive Data", step: 1.3 },
    { label: "Exposure", step: 1.4 },
  ];

  const handlePublishJob = async () => {
    setLoader(true);
    try {
      const res = await newRequest.post(`job-status-update/${jid}`, {
        status: "2",
      });
      if (res?.data?.status === 201) {
        setLoader(false);
        toast.success("Job published successfully.");
        navigate("/admin/recruiter/jobs");
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex w-1/3 flex-col gap-3">
      <div className="relative rounded-md bg-white p-5">
        <div className="absolute bottom-10 left-10 top-10 z-0 border-l-2 border-gray-darkcool" />
        <div className="flex flex-col gap-y-4">
          {/* Render Main Steps */}
          {mainSteps.map((mainStep, index) => (
            <div key={index}>
              {/* Main Step */}
              <div className="flex h-12 items-center gap-2 rounded bg-gray-lightcool px-3 text-[0.94rem]">
                <div
                  className={`z-10 size-4 rounded-full border ${
                    stepCounter >= mainStep.step
                      ? "border-textcolor-lightgreen bg-textcolor-lightgreen"
                      : "border-textcolor-gray bg-textcolor-gray"
                  }`}
                />
                <p
                  className={
                    stepCounter >= mainStep.step
                      ? "text-black"
                      : "text-gray-dark"
                  }
                >
                  {mainStep.label}
                </p>
              </div>

              {/* Sub-steps for 'Post' */}
              {mainStep.step === 1 && stepCounter >= 1 && stepCounter == 1 && (
                <div className="ml-5 flex flex-col gap-3 rounded px-3 text-sm">
                  {postSubSteps.map((subStep, subIndex) => (
                    <div key={subIndex} className="flex items-center gap-x-2">
                      {/* <div
                        className={`flex size-1 items-center justify-center rounded-full border ${
                          stepCounter >= subStep.step
                            ? "border-textcolor-darkgreen bg-[#F0FFF1]"
                            : "border-textcolor-gray bg-gray-lightcool"
                        }`}
                      >
                        {stepCounter >= subStep.step && (
                          <Check className="size-3 bg-textcolor-lightgreen" />
                        )}
                      </div> */}
                      <li className="text-gray-dark"></li>
                      <p
                        className={
                          stepCounter >= subStep.step
                            ? "text-black"
                            : "text-gray-dark"
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
      {stepCounter === 4 && (
        <button
          onClick={handlePublishJob}
          className="flex h-11 items-center justify-center rounded bg-black/80 text-[0.9rem] font-medium text-white"
        >
          {loader ? (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              Publishing
            </div>
          ) : (
            "SUBMIT & PUBLISH"
          )}
        </button>
      )}
    </div>
  );
}

export default CreateJobSideBar;
