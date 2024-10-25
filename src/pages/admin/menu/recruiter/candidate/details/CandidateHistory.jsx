import { newRequest } from "@/api";
import { CANIDATE_HISTORY } from "@/api/recruiter";
import MenuHeader from "@/components/common/MenuHeader";
import MenuHeaderCandidate from "@/components/recruiter/candidate/MenuHeader";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
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
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-full w-full rounded-md bg-white py-5">
          <h1 className="px-7 pb-7 text-base font-bold">Candidate History</h1>
          <ul className="overflow-y-min flex max-h-[570px] w-full flex-col gap-3 overflow-y-auto px-7">
            {candidateHistoryTimeline?.map((i) => (
              <li key={i?.id} className="timeline flex items-center">
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
                <div className="timeline-end timeline-box bg-black/5 text-sm font-semibold text-black/70">
                  {i?.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default CandidateHistoryTimeline;
