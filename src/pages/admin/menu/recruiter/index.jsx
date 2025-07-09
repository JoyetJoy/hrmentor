import MenuHeader from "@/components/common/MenuHeader";
import React, { useState } from "react";
import loader from "/assets/icons/recruter/fi_loader.svg";
import user from "/assets/icons/recruter/fi_user.svg";
import openjobs from "/assets/icons/recruter/fi_briefcase.svg";
import message from "/assets/icons/recruter/fi_message-square.svg";
import award from "/assets/icons/recruter/fi_award.svg";
import like from "/assets/icons/recruter/interface-favorite-like-1--reward-social-up-rating-media-like-thumb-hand.svg";
import { newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { REC_DASHBOARD_COUNT } from "@/api/recruiter";
import OpenJobs from "@/components/recruiter/dashboard/OpenJobs";
import WeeklyCalendarPicker from "@/components/common/WeeklyCanlendarPicker";
import dayjs from "dayjs";
import RecDashboardInterviews from "@/components/recruiter/dashboard/Interviews";
import RecJobCandidates from "@/components/recruiter/dashboard/Candidates";
import { useNavigate } from "react-router-dom";

export default function RecruiterDashbaord() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const Navigate = useNavigate();
  // REC DASHBOARD COUNT
  const { data: recDashboardCount } = useQuery({
    queryKey: ["recDashboardCount"],
    queryFn: () =>
      newRequest.get(REC_DASHBOARD_COUNT).then((res) => {
        return res.data;
      }),
  });

  const handleClick = (api,type)=>{
    Navigate(api, { state: { type } })

  }

  return (
    <>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Dashboard"}
      />
      <div className="grid grid-cols-6 gap-5">
        <div 
          onClick={()=>handleClick('/admin/recruiter/jobs',2)}
          className="flex items-center gap-2 rounded-md bg-white p-4 cursor-pointer">
          <div
            className="size-12 rounded-full p-3"
            style={{ backgroundColor: "mutedruby" }}
          >
            <img
              src={openjobs}
              alt="Open Jobs icon"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h2
              className="whitespace-nowrap text-sm font-medium"
              style={{ color: "pinkishred" }}
            >
              Open Jobs
            </h2>
            <h1 className="text-xl font-bold text-textcolor-darkCharcoal">
              {recDashboardCount?.openJobs}
            </h1>
          </div>
        </div>

        <div 
          onClick={()=>handleClick('/admin/recruiter/candidate')}
          className="flex items-center gap-2 rounded-md bg-white p-4 cursor-pointer">
          <div
            className="size-12 rounded-full p-3"
            style={{ backgroundColor: "sunlit" }}
          >
            <img
              src={user}
              alt="New Candidates icon"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h2
              className="whitespace-nowrap text-sm font-medium"
              style={{ color: "#EEB81E" }}
            >
              New candidates
            </h2>
            <h1 className="text-xl font-bold text-textcolor-darkCharcoal">
              {recDashboardCount?.newCandidates}
            </h1>
          </div>
        </div>
        <div
          onClick={()=>handleClick('/admin/recruiter/jobs')}
          className="flex items-center gap-2 rounded-md bg-white p-4 cursor-pointer">
          <div
            className="size-12 rounded-full p-3"
            style={{ backgroundColor: " #B380FE1A" }}
          >
            <img
              src={loader}
              alt="New Candidates icon"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h2
              className="whitespace-nowrap text-sm font-medium"
              style={{ color: " #8C5ED0" }}
            >
              Shortlisted
            </h2>
            <h1 className="text-xl font-bold text-textcolor-darkCharcoal">
              {recDashboardCount?.shortListedCandidates}
            </h1>
          </div>
        </div>
        <div
          onClick={()=>handleClick('/admin/recruiter/interviews')}
          className="flex items-center gap-2 rounded-md bg-white p-4 cursor-pointer">
          <div
            className="size-12 rounded-full p-3"
            style={{ backgroundColor: "#35AEBE1A" }}
          >
            <img
              src={message}
              alt="Draft Jobs icon"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h2
              className="whitespace-nowrap text-sm font-medium"
              style={{ color: "#35AEBE" }}
            >
              Interviews
            </h2>
            <h1 className="text-xl font-bold text-textcolor-darkCharcoal">
              {recDashboardCount?.interviewScheduledCandidates}
            </h1>
          </div>
        </div>
        <div
          onClick={()=>handleClick('/admin/recruiter/candidate')}
          className="flex items-center gap-2 rounded-md bg-white p-4 cursor-pointer">
          <div
            className="size-12 rounded-full p-3"
            style={{ backgroundColor: "#2FBC451A" }}
          >
            <img
              src={award}
              alt="Draft Jobs icon"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h2
              className="whitespace-nowrap text-sm font-medium"
              style={{ color: " #2FBC45" }}
            >
              Offer sent
            </h2>
            <h1 className="text-xl font-bold text-textcolor-darkCharcoal">
              {recDashboardCount?.offerSentCandidates}
            </h1>
          </div>
        </div>
        <div
          onClick={()=>handleClick('/admin/recruiter/jobs',1)}
          className="flex items-center gap-2 rounded-md bg-white p-4 cursor-pointer">
          <div
            className="size-12 rounded-full p-3"
            style={{ backgroundColor: " #7626781A" }}
          >
            <img
              src={like}
              alt="Inactive Jobs icon"
              className="w-full object-contain"
            />
          </div>
          <div>
            <h2
              className="whitespace-nowrap text-sm font-medium"
              style={{ color: " #762678" }}
            >
              Jobs drafted
            </h2>
            <h1 className="text-xl font-bold text-textcolor-darkCharcoal">
              {recDashboardCount?.draftJobs}
            </h1>
          </div>
        </div>
      </div>
      <div className="my-3 grid grid-cols-3 gap-3">
        <OpenJobs />
        <div>
          <h1 className="mb-4 text-sm font-bold text-textcolor-darkCharcoal">Interviews</h1>
          <div className="h-screen rounded-md bg-white">
            <WeeklyCalendarPicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <div className="w-full border-b border-gray-light pt-3"></div>
            <RecDashboardInterviews selectedDate={selectedDate} />
          </div>
        </div>
        <div>
          <h1 className="text-[ #2C2C2C] mb-4 text-sm font-bold">Candidates</h1>
          <div className="flex overflow-y-scroll overflow-y-min max-h-[30rem] flex-col gap-y-3 rounded-md bg-white p-5">
            <RecJobCandidates />
          </div>
        </div>
      </div>
    </>
  );
}
