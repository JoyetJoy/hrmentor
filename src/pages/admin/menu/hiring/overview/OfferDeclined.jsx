import MenuHeader from "@/components/common/MenuHeader";
import { OverviewTopBar } from "@/components/hiring/overviewTopBar/OverviewTopBar";
import { OfferDeclinedTable } from "./tables/OfferDeclinedTable";

export const OfferDeclined = () => {
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
        <OverviewTopBar title="Offer declined" />
        <OfferDeclinedTable />
      </div>
    </>
  );
};
