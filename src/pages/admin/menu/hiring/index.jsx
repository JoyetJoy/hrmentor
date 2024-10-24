import MenuHeader from "@/components/common/MenuHeader";
import { OverViewCards } from "@/components/hiring/overview/OverViewCards";
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
        <OverViewCards/>
      <UpcomingInterviewsList/>
      </div>

    </>
  );

  
};
