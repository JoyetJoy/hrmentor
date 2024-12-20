import React from "react";
import BasicDetails from "./BasicDetails";
import WorkInfo from "./WorkInfo";
import Skills from "./Skills";
import Registration from "./Registration";
import Experience from "./Experience";
import DBScheck from "./DBScheck";
import RightToWork from "./RightToWork";
import Emergency from "./Emergency";
import Bank from "./Bank";
import Document from "./Document";

export default function OnboardingForm() {
  return (
    <div className="flex bg-gray-100 w-full h-full flex-col gap-4 p-10">
      <div
        className="flex min-h-48 max-w-full items-center justify-between rounded-ee-lg rounded-tr-lg rounded-bl-lg bg-cover bg-no-repeat px-20 py-16"
        style={{
          backgroundImage: `url(/onbording.png)`,
        }}
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <div className="mr-2 h-10">
              <img
                src={"/logo-white.svg"}
                alt="hr mentor"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-monorope text-sm font-normal text-white">
              Welcome,
              <h1 className="-mt-0.5 text-sm font-semibold">
                Tech Butomy pvt Ltd
              </h1>
            </span>
          </div>
          <h1 className="text-lg font-semibold text-white">
            Employee Onboarding Form
          </h1>
        </div>
        <button className="rounded-md bg-white px-8 py-2 text-black text-sm font-semibold">
          Approve
        </button>
      </div>
      <div className="bg-white rounded-md px-10 py-8">
        <form>
        <BasicDetails formtype="update"/>
        <WorkInfo/>
        <Skills/>
        <Experience/>
        <Registration/>
        <DBScheck/>
        <RightToWork/>
        <Emergency/>
        <Bank/>
        <Document/>
        </form>
        
      </div>
    </div>
  );
}
