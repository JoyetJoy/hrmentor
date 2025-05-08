import { newRequest } from "@/api";
import { GET_CANDIDATES } from "@/api/recruiter";
import MenuHeader from "@/components/common/MenuHeader";
import { ConditionalOfferLetter } from "@/components/hiring/offer-letter/Conditional";
import { UnConditionalOfferLetter } from "@/components/hiring/offer-letter/Unconditional";
import { useQuery } from "@tanstack/react-query";

export const FinalizeOfferLetter = () => {
  // get data from url search params
  const offerType = new URLSearchParams(window.location.search).get(
    "lettertype",
  );
  // get data from url search params
  const cid = new URLSearchParams(window.location.search).get("selected");
  
  // GET DETAILS IN CASE OF UPDATE
  const { data: candidateDetails, isLoading } = useQuery({
    queryKey: ["candidateDetails", cid],
    queryFn: () =>
      newRequest.get(`${GET_CANDIDATES}/${cid}`).then((res) => {
        return res.data;
      }),
      enabled:!!cid
  });

  return (
    <>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Hiring"}
        activeMenu={"Dashboard"}
      />

      {offerType === "conditional" ? (
        <ConditionalOfferLetter candidate={candidateDetails?.data} />
      ) : (
        <UnConditionalOfferLetter candidate={candidateDetails?.data} />
      )}
    </>
  );
};
