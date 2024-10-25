import { ArrowLeft, Dot, MapPin, Share2 } from "lucide-react";
import React from "react";

function JobDetails() {
  return (
    <div className="mt-3 h-full w-full rounded-md bg-white p-4">
      <div className="h-72 rounded-md bg-bgColor-100">
        <div className="flex flex-col gap-3 px-10 py-8">
          <h1 className="mb-6 flex flex-row items-center gap-1 text-sm text-white">
            <ArrowLeft className="size-4" strokeWidth={2} />
            Job Details
          </h1>
          <h1 className="flex flex-row items-end gap-1 text-xl font-semibold text-white">
            UI/UX DESIGNER{" "}
            <span className="flex flex-row items-center text-xs font-normal">
              <Dot className="size-5 text-[#6DE742]" strokeWidth={5} />
              3days ago
            </span>
          </h1>
          <div className="flex flex-row items-center justify-between">
            <div className="my-4 flex flex-row items-center gap-2">
              <button className="btn h-8 min-h-8 rounded-md border border-[#CFD2E3] bg-bgColor-100 text-xs text-white">
                {" "}
                Fresher
              </button>
              <button className="flex-roe btn flex h-8 min-h-8 items-center rounded-md border border-[#CFD2E3] bg-bgColor-100 text-xs text-white">
                ₹ 20,000 - ₹40,000
              </button>
              <button className="btn h-8 min-h-8 rounded-md border border-[#CFD2E3] bg-bgColor-100 text-xs text-white">
                Day Shift{" "}
              </button>
            </div>
            <div className="flex flex-row items-center gap-2">
              <button className="btn h-10 min-h-10 w-36 rounded-md border border-[#CFD2E3] bg-white text-sm text-bgColor-100">
                {" "}
                Apply Now
              </button>
              <button className="btn flex h-10 min-h-10 w-36 flex-row items-center rounded-md border border-[#2F324D] bg-[#2F324D] text-sm text-white">
                {" "}
                <Share2 strokeWidth={1} className="size-4" />
                Share
              </button>
            </div>
          </div>
          <h1 className="mb-4 flex flex-row items-center gap-1 text-sm font-normal text-white">
            <MapPin className="size-4" />
            Trivandrum, India
          </h1>
        </div>
      </div>
      <div className="my-10 flex flex-col gap-9 px-10">
        <div className="">
          <h1 className="mb-3 text-lg font-bold">Role Overview</h1>
          <p className="text-sm leading-7 text-[#787878]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat . Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className=" ">
          <h1 className="mb-3 text-lg font-bold">Job Description</h1>
          <ul className="list-inside list-disc text-sm leading-7 text-[#787878]">
            <li>
              Build innovative, state-of-the-art applications and collaborate
              with the User Experience (UX) team
            </li>
            <li>Proficiency in Bootstrap and JavaScript</li>
            <li>
              Utilise backend data services and contribute to increasing
              existing data services API
            </li>
            <li>
              Lead the entire web application development life cycle right from
              concept stage to delivery and post-launch support
            </li>
            <li>
              Convey effectively with all task progress, evaluations,
              suggestions, schedules along with technical and process issues.
            </li>
            <li>A solid understanding of application design using Laravel.</li>
            <li>
              Document the development process, architecture, and standard
              components
            </li>
            <li>
              Coordinate with co-developers and keep the project manager well
              informed of the status of the development effort and serve as a
              liaison between development staff and project manager
            </li>
          </ul>
        </div>
        <div className="">
          <h1 className="mb-3 text-lg font-bold">Responsibility</h1>
          <ul className="list-inside list-disc text-sm leading-7 text-[#787878]">
            <li>
              Build innovative, state-of-the-art applications and collaborate
              with the User Experience (UX) team
            </li>
            <li>Proficiency in Bootstrap and JavaScript</li>
            <li>
              Utilise backend data services and contribute to increasing
              existing data services API
            </li>
            <li>
              Lead the entire web application development life cycle right from
              concept stage to delivery and post-launch support
            </li>
            <li>
              Convey effectively with all task progress, evaluations,
              suggestions, schedules along with technical and process issues.
            </li>
            <li>A solid understanding of application design using Laravel.</li>
            <li>
              Document the development process, architecture, and standard
              components
            </li>
            <li>
              Coordinate with co-developers and keep the project manager well
              informed of the status of the development effort and serve as a
              liaison between development staff and project manager
            </li>
          </ul>
        </div>
        <div className="">
          <h1 className="mb-3 text-lg font-bold">Requirement</h1>
          <ul className="list-inside list-disc text-sm leading-7 text-[#787878]">
            <li>
              Build innovative, state-of-the-art applications and collaborate
              with the User Experience (UX) team
            </li>
            <li>Proficiency in Bootstrap and JavaScript</li>
            <li>
              Utilise backend data services and contribute to increasing
              existing data services API
            </li>
            <li>
              Coordinate with co-developers and keep the project manager well
              informed of the status of the development effort and serve as a
              liaison between development staff and project manager
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
