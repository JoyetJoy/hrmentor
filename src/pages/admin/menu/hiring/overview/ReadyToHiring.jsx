import MenuHeader from "@/components/common/MenuHeader";
import { OverviewTopBar } from "@/components/hiring/overviewTopBar/OverviewTopBar";
import React from "react";
import { OverviewTable } from "./tables/OverviewTable";

export const ReadyToHiring = () => {
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
        <OverviewTopBar title="Ready to Hiring" />
        <OverviewTable />
      </div>
    </>
  );
};
