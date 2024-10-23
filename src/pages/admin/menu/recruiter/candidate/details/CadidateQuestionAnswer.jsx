import { newRequest } from "@/api";
import { JOBS_CANDIDATE_QUESTION_AND_ANSWER } from "@/api/recruiter";
import MenuHeader from "@/components/common/MenuHeader";
import MenuHeaderCandidate from "@/components/recruiter/candidate/MenuHeader";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocation } from "react-router-dom";

function CandidateQuestionAnswer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cid = searchParams.get("cid");

  const { data: recCandidateQAByid, isLoading } = useQuery({
    queryKey: ["recCandidateQAByid", cid],
    queryFn: () =>
      newRequest
        .get(`${JOBS_CANDIDATE_QUESTION_AND_ANSWER}/${cid}`)
        .then((res) => {
          return res.data;
        }),
  });

  return (
    <>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeSubMenu={"Candidates"}
        activeMenu={"Candidates"}
      />
      <MenuHeaderCandidate page={2} />
      <div className="flex min-h-screen flex-col gap-4 bg-white px-20 py-14">
        <h1 className="pt-3 text-base font-bold">Questions & Answers</h1>
        {recCandidateQAByid.length ? (
          <>
            {recCandidateQAByid?.map((i) => (
              <div
                key={i?.id}
                className="collapse collapse-arrow rounded-sm bg-[#F0F8FF]"
              >
                <input type="radio" name="my-accordion-2" defaultChecked />
                <h1 className="collapse-title text-[0.94rem] font-bold after:bg-white">
                  {i?.question}
                </h1>
                <div className="collapse-content">
                  <p className="text-sm">{i?.answer}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <img className="my-10 h-52 object-contain" src="/not-found.svg" />
        )}
      </div>
    </>
  );
}

export default CandidateQuestionAnswer;
