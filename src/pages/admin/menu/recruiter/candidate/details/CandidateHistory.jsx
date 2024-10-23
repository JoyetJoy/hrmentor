import { newRequest } from "@/api";
import { CANIDATE_HISTORY } from "@/api/recruiter";
import MenuHeader from "@/components/common/MenuHeader";
import MenuHeaderCandidate from "@/components/recruiter/candidate/MenuHeader";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";

function CandidateHistoryTimeline() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cid = searchParams.get("cid");
  // Fetch List
  const { data: candidateHistoryTimeline, isLoading } = useQuery({
    queryKey: ["candidateHistoryTimeline"],
    queryFn: () =>
      newRequest.get(`${CANIDATE_HISTORY}/${cid}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="min-h-screen">
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeSubMenu={"Candidates"}
        activeMenu={"Candidates"}
      />
      <MenuHeaderCandidate page={7} />
      <div className="h-full w-full rounded-md bg-white py-5">
        <div className="relative flex w-full max-w-4xl flex-col gap-2">
          {candidateHistoryTimeline?.map((i) => (
            <Fragment key={i?.id}>
              <ul className="timeline timeline-vertical">
                <li>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="green"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box">
                    {i?.description}
                  </div>
                  <hr />
                </li>
              </ul>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
export default CandidateHistoryTimeline;
