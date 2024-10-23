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
import React from "react";
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
        <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-2">
          <Disclosure
            as="div"
            defaultOpen={true}
            className="w-full rounded-md bg-[#F5F5F5] p-3"
          >
            {candidateHistoryTimeline?.map((i) => (
              <>
                <DisclosureButton className="group flex w-full items-center justify-between">
                  <div className="flex items-center gap-x-5">
                    <div className="size-4 rounded-full bg-[#00B448]" />
                    <p className="text-base font-semibold">{i?.description}</p>
                  </div>
                  <ChevronDownIcon className="size-5 fill-white/60 group-data-[open]:rotate-180 group-data-[hover]:fill-white/50" />
                </DisclosureButton>
                <DisclosurePanel className="ml-5 mt-2 w-full text-sm/5">
                  <div className="table mx-auto my-4 w-full max-w-4xl">
                    <table className="mx-auto w-full table-auto">
                      <thead className="overflow-hidden rounded-lg bg-[#D9D9D9]">
                        <tr className="px-5 py-5 text-sm font-semibold text-black">
                          <th className="">Scheduled</th>
                          <th className="">Date</th>
                          <th className="">Job Title</th>
                          <th className="">Interview Type</th>
                        </tr>
                      </thead>
                      <tbody className="border-none bg-transparent px-4">
                        <tr className="text-xs font-medium text-black">
                          <td className="">Shahnaz.Shaji(interviewer)</td>
                          <td className="">10/5/23</td>
                          <td className="">Developer</td>
                          <td className="">Telephonic</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </DisclosurePanel>
              </>
            ))}
          </Disclosure>
        </div>
      </div>
    </div>
  );
}
export default CandidateHistoryTimeline;
