import { OverviewTopBar } from "@/components/hiring/overviewTopBar/OverviewTopBar";
import { OfferDeclinedTable } from "./tables/OfferDeclinedTable";
import MenuHeaderHiring from "@/components/hiring/MenuHeader";

export const OfferDeclined = () => {
  return (
    <>
      <MenuHeaderHiring page={1} />
      <div className="flex min-h-screen flex-col gap-3">
        <OverviewTopBar title="Offer declined" />
        <OfferDeclinedTable />
      </div>
    </>
  );
};
