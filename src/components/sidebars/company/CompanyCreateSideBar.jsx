import { Check } from "lucide-react";
import React, { useState } from "react";

export default function CompanyCreateSideBar({ stepCounter }) {
    const [loader, setLoader] = useState(false);

  // Main steps
  const mainSteps = [
    { label: "Company profile", step: 1 },
    { label: "Organisation bank and tax details", step: 2 },
    { label: "Company signatory", step: 3 },
    { label: "Calender settings", step: 4 },
  ];

  // Sub-steps under 
  const companySubSteps = [
    { label: "General Details", step: 1.1 },
    { label: "Address Details", step: 1.2 },
  ];
  const bankSubSteps = [
    { label: "Bank account details ", step: 2.1 },
    { label: "Tax details", step: 2.2 },
  ];
  const signatorySubSteps = [
    { label: "company Signatory", step: 3.1 },
  ];
  const calenderSubSteps = [
    { label: "Add calender Settings", step: 1.1 },
   
  ];

  return (

    <>
    <div className="flex w-1/3 flex-col gap-3">
      <div className="relative rounded-md bg-white p-5">
        <div className="absolute bottom-10 left-10 top-10 z-0 border-l-2 border-hrmprimaryorange" />
        <div className="flex flex-col gap-y-4">
          {/* Render Main Steps */}
          {mainSteps.map((mainStep, index) => (
            <div key={index}>
              {/* Main Step */}
              <div className="flex h-12 items-center gap-2 rounded bg-gray-lightcool px-3 text-[0.94rem]">
                <div
                  className={`z-10 size-4 rounded-full border ${
                    stepCounter >= mainStep.step
                      ? "border-hrmprimaryorange bg-hrmprimaryorange"
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

              {/* Sub-steps for 'company profle' */}
              {mainStep.step === 1 && stepCounter >= 1 && stepCounter == 1 && (
                <div className="ml-5 flex flex-col gap-3 rounded px-3 text-sm">
                    <p className="text-xs text-black">
                        You must complete all required field to save Company
                        profile.
                      </p>
                  {companySubSteps.map((subStep, subIndex) => (
                    <div key={subIndex} className="flex items-center gap-x-2">
                      
                      <div
                        className={`flex size-5 items-center justify-center rounded-full border ${
                          stepCounter >= subStep.step
                            ? "border-textcolor-darkgreen bg-[#F0FFF1]"
                            : "border-textcolor-gray bg-gray-lightcool"
                        }`}
                      >
                        {stepCounter >= subStep.step && (
                          <Check className="size-3 bg-textcolor-lightgreen" />
                        )}
                      </div>
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
                {mainStep.step === 2 && stepCounter >= 2 && stepCounter == 2 && (
                <div className="ml-5 flex flex-col gap-3 rounded px-3 text-sm">
                    <p className="text-xs text-black">
                        You must complete all required field to save Company
                        profile.
                      </p>
                  {bankSubSteps.map((subStep, subIndex) => (
                    <div key={subIndex} className="flex items-center gap-x-2">
                      
                      <div
                        className={`flex size-5 items-center justify-center rounded-full border ${
                          stepCounter >= subStep.step
                            ? "border-textcolor-darkgreen bg-[#F0FFF1]"
                            : "border-textcolor-gray bg-gray-lightcool"
                        }`}
                      >
                        {stepCounter >= subStep.step && (
                          <Check className="size-3 bg-textcolor-lightgreen" />
                        )}
                      </div>
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
                 {mainStep.step === 3 && stepCounter >= 3 && stepCounter == 3 && (
                <div className="ml-5 flex flex-col gap-3 rounded px-3 text-sm">
                    <p className="text-xs text-black">
                        You must complete all required field to save Company
                        profile.
                      </p>
                  {signatorySubSteps.map((subStep, subIndex) => (
                    <div key={subIndex} className="flex items-center gap-x-2">
                      
                      <div
                        className={`flex size-5 items-center justify-center rounded-full border ${
                          stepCounter >= subStep.step
                            ? "border-textcolor-darkgreen bg-[#F0FFF1]"
                            : "border-textcolor-gray bg-gray-lightcool"
                        }`}
                      >
                        {stepCounter >= subStep.step && (
                          <Check className="size-3 bg-textcolor-lightgreen" />
                        )}
                      </div>
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
                 {mainStep.step === 4 && stepCounter >= 4 && stepCounter == 4 && (
                <div className="ml-5 flex flex-col gap-3 rounded px-3 text-sm">
                    <p className="text-xs text-black">
                        You must complete all required field to save Company
                        profile.
                      </p>
                  {calenderSubSteps.map((subStep, subIndex) => (
                    <div key={subIndex} className="flex items-center gap-x-2">
                      
                      <div
                        className={`flex size-5 items-center justify-center rounded-full border ${
                          stepCounter >= subStep.step
                            ? "border-textcolor-darkgreen bg-[#F0FFF1]"
                            : "border-textcolor-gray bg-gray-lightcool"
                        }`}
                      >
                        {stepCounter >= subStep.step && (
                          <Check className="size-3 bg-textcolor-lightgreen" />
                        )}
                      </div>
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
    </div>

    </>
  );
}
