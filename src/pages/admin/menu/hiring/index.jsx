import MenuHeader from "@/components/common/MenuHeader";
import { OverviewCards } from "@/components/hiring/overview/OverviewCard";
import { UpcomingInterviewsList } from "@/components/hiring/overview/UpcomingInterviewsList";
import React from "react";

export const HiringDashboard = () => {
  return (
    <>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Hiring"}
        activeMenu={"Dashboard"}
      />
      <div className="flex flex-col gap-3">
        <OverviewCards />
        <UpcomingInterviewsList />
      </div>
    </>
  );
};
