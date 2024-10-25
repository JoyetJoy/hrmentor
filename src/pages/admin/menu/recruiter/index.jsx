import MenuHeader from "@/components/common/MenuHeader";
import { MoveDiagonal } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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

export default function RecruiterDashbaord() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  // REC DASHBOARD COUNT
  const { data: recDashboardCount } = useQuery({
    queryKey: ["recDashboardCount"],
    queryFn: () =>
      newRequest.get(REC_DASHBOARD_COUNT).then((res) => {
        return res.data;
      }),
  });

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
        <div className="flex items-center gap-2 rounded-md bg-white p-4">
          <div
            className="size-12 rounded-full p-3"
            style={{ backgroundColor: "#AE3C601A" }}
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
              style={{ color: "#AE3C60" }}
            >
              Open Jobs
            </h2>
            <h1 className="text-xl font-bold text-[#2C2C2C]">
              {recDashboardCount?.openJobs}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-white p-4">
          <div
            className="size-12 rounded-full p-3"
            style={{ backgroundColor: "#EEB81E1A" }}
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
            <h1 className="text-xl font-bold text-[#2C2C2C]">
              {recDashboardCount?.newCandidates}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-white p-4">
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
            <h1 className="text-xl font-bold text-[#2C2C2C]">
              {recDashboardCount?.shortListedCandidates}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-white p-4">
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
            <h1 className="text-xl font-bold text-[#2C2C2C]">
              {recDashboardCount?.interviewScheduledCandidates}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-white p-4">
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
            <h1 className="text-xl font-bold text-[#2C2C2C]">
              {recDashboardCount?.offerSentCandidates}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-white p-4">
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
            <h1 className="text-xl font-bold text-[#2C2C2C]">
              {recDashboardCount?.draftJobs}
            </h1>
          </div>
        </div>
      </div>

      <div className="my-3 grid grid-cols-3 gap-3">
        <OpenJobs />
        <div>
          <h1 className="mb-4 text-sm font-bold text-[#2C2C2C]">Interview</h1>
          <div className="h-screen rounded-md bg-white">
            <WeeklyCalendarPicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <div className="w-full border-b border-[#ECE9F1] pt-3"></div>
            <RecDashboardInterviews selectedDate={selectedDate} />
          </div>
        </div>
        <div>
          <h1 className="text-[ #2C2C2C] mb-4 text-sm font-bold">Candidate</h1>
          <div className="flex h-screen flex-col gap-y-3 rounded-md bg-white p-5">
            <div className="flex h-20 w-full items-center justify-between rounded-md bg-[#F5F5F7] py-2 pl-5 pr-9">
              <div className="flex items-center gap-x-2">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold">Harshal H</h3>
                  <p className="text-xs font-medium text-[#2C2C2C66]">
                    UI/UX Design Intern
                  </p>
                </div>
              </div>
              <Link className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2">
                <MoveDiagonal className="size-3" />
              </Link>
            </div>
            <div className="flex h-20 w-full items-center justify-between rounded-md bg-[#F5F5F7] py-2 pl-5 pr-9">
              <div className="flex items-center gap-x-2">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold">Harshal H</h3>
                  <p className="text-xs font-medium text-[#2C2C2C66]">
                    UI/UX Design Intern
                  </p>
                </div>
              </div>
              <Link
                to={""}
                className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
              >
                <MoveDiagonal className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
