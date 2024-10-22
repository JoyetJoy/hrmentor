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

  console.log(recCandidateQAByid);

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
      <div className="flex h-screen flex-col gap-4 bg-white px-24 py-20">
        <h1 className="pt-3 text-base font-bold">Questions & Answers</h1>
        {recCandidateQAByid?.map((i) => (
          <div className="collapse collapse-arrow rounded-sm bg-[#F0F8FF]">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <h1 className="collapse-title text-base font-bold after:bg-white">
              {i?.question}
            </h1>
            <div className="collapse-content">
              <p className="">{i?.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CandidateQuestionAnswer;
