import { newRequest } from "@/api";
import { GET_CANDIDATES, JOBS_CANDIDATE_QUESTION_AND_ANSWER } from "@/api/recruiter";
import MenuHeader from "@/components/common/MenuHeader";
import MenuHeaderCandidate from "@/components/recruiter/candidate/MenuHeader";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
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

  // Retrieve data as a JSON string and parse it into an object
const storedData = JSON.parse(localStorage.getItem("candidateDetails") || "null");
 
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
      <MenuHeaderCandidate page={2} candidate={storedData}/>
      <div className="flex min-h-screen flex-col gap-4 bg-white px-20 py-14">
      <h1 className="pt-3 text-base font-bold">Questions & Answers</h1>

      {recCandidateQAByid?.length ? (
        <>
          {recCandidateQAByid?.map((item) => (
            <Disclosure key={item?.id} as="div" className="rounded-sm bg-gray-mutedlight">
              {({ open }) => (
                <>
                  <DisclosureButton className="flex w-full items-center justify-between py-7 px-4 text-[0.94rem] font-bold focus:outline-none">
                    <span>{item?.question}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transform transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pb-4 text-sm text-black/50">
                    {item?.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </>
      ) : (
        <img className="my-10 h-52 object-contain mx-auto" src="/not-found.svg" alt="Not Found" />
      )}
    </div>
    </>
  );
}

export default CandidateQuestionAnswer;
