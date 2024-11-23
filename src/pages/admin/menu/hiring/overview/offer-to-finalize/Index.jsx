import MenuHeader from "@/components/common/MenuHeader";
import { OverviewTopBar } from "@/components/hiring/overviewTopBar/OverviewTopBar";
import { OfferTable } from "../tables/OfferTable";

export const OfferToBeFinalizedListing = () => {
  return (
    <>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Hiring"}
        activeMenu={"Dashboard"}
      />
      <div className="flex min-h-screen flex-col gap-3">
        <OverviewTopBar title="Offer to be finalized" />
        <OfferTable />
      </div>
    </>
  );
};
