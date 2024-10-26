import { OverviewTopBar } from "@/components/hiring/overviewTopBar/OverviewTopBar";
import React from "react";
import { OverviewTable } from "../tables/OverviewTable";
import MenuHeaderHiring from "@/components/hiring/MenuHeader";

export const ReadyToHiring = () => {
  return (
    <>
      <MenuHeaderHiring page={1} />
      <div className="flex flex-col gap-3">
        <OverviewTopBar title="Ready to Hiring" />
        <OverviewTable />
      </div>
    </>
  );
};
