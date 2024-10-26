import MenuHeader from "@/components/common/MenuHeader";
import { OverviewTopBar } from "@/components/hiring/overviewTopBar/OverviewTopBar";
import { UpcomingTable } from "./tables/UpcomingTable";

export const Upcoming = () => {
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
        <OverviewTopBar title="Upcoming start dates" />
        <UpcomingTable />
      </div>
    </>
  );
};
