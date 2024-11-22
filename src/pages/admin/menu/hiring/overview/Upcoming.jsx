import { OverviewTopBar } from "@/components/hiring/overviewTopBar/OverviewTopBar";
import { UpcomingTable } from "./tables/UpcomingTable";
import MenuHeaderHiring from "@/components/hiring/MenuHeader";

export const Upcoming = () => {
  return (
    <>
      <MenuHeaderHiring page={1} />
      <div className="flex flex-col gap-3">
        <OverviewTopBar title="Conditional Offered" />
        <UpcomingTable />
      </div>
    </>
  );
};
