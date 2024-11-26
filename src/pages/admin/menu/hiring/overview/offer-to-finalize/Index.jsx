import MenuHeader from "@/components/common/MenuHeader";
import { OverviewTopBar } from "@/components/hiring/overviewTopBar/OverviewTopBar";
import { OfferTable } from "../tables/OfferTable";
import { useState } from "react";

export const OfferToBeFinalizedListing = () => {
  const searchType = new URLSearchParams(window.location.search).get("type");
  const [keyword, setKeyword] = useState("");
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
        <OverviewTopBar
          title={`${searchType == "accepted" ? "Offer accepted" : searchType == "hired" ? "Hired candidates" : searchType == "declined" ? "Offer declined" : "Offer to be finalized"}`}
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <OfferTable
          api={`${searchType == "accepted" ? "offer-accepted-candidates" : searchType == "hired" ? "hired-candidates" : searchType == "declined" ? "offer-declined-candidates" : "offer-to-be-finalized-candidates"}`}
          keyword={keyword}
          setKeyword={setKeyword}
        />
      </div>
    </>
  );
};
