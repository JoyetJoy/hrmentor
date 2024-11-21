import { newRequest } from "@/api";
import { CANIDATE_HISTORY } from "@/api/recruiter";
import MenuHeader from "@/components/common/MenuHeader";
import MenuHeaderCandidate from "@/components/recruiter/candidate/MenuHeader";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Search } from "lucide-react";
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
  const historyData = [
    {
      date: "12 October, 2023",
      entries: [
        {
          title: "Move to hire",
          description: "VM applied job for US Recruiter",
          date: "10/11/2023 ",
          time: "10:30 AM",
        },
        {
          title: "Move to hire",
          description: "VM applied job for US Recruiter",
          date: "10/11/2023 ",
          time: "10:30 AM",
        },
        {
          title: "Interview",
          description: "Sandeep applied job for Customer Relationship Officer",
          date: "10/11/2023 ",
          time: "10:30 AM",
        },
      ],
    },
    {
      date: "11 October, 2023",
      entries: [
        {
          title: "Resume viewed by abc",
          description: "VM applied job for US Recruiter",
          date: "10/11/2023 ",
          time: "10:30 AM",
        },
        {
          title: "Applied job for US Recruiter",
          description: "VM applied job for US Recruiter",
          date: "10/11/2023 ",
          time: "10:30 AM",
        },
      ],
    },
  ];

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
      <MenuHeaderCandidate page={7} candidate={storedData}/>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-full w-full rounded-md bg-white py-5 px-20">
          <div className="flex justify-between">
            <h1 className="mb-5 px-7 text-base font-bold text-neutralmedium">
              Candidate History
            </h1>
            <div className="input flex min-h-10 h-10 w-80 items-center gap-2 placeholder:text-black border border-gray-platinum outline-none hover:border-gray-platinum text-sm">
                  <Search className="size-4 text-gray-dark" />
                  <input
                    type="text"
                    className="w-full placeholder:text-gray-dark"
                    placeholder="Search"
                  />
            </div>
          </div>
          <div className="overflow-y-min h-[500px] w-full overflow-y-scroll p-5">
            {historyData.map((day, index) => (
              <div
                key={index}
                className="relative rounded-md bg-white p-5 pt-0"
              >
                <p className="mb-5 text-sm font-bold text-neutralmedium">
                  {day.date}
                </p>
                <div className="absolute bottom-20 left-10 top-16 z-0 border-l-2 border-hrmprimaryorange" />
                <div className="flex flex-col gap-y-4">
                  {day.entries.map((entry, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded bg-gray-lightcool px-3 text-[0.94rem]"
                    >
                      <div className="absolute z-10 mb-9 size-4 rounded-full border border-hrmprimaryorange bg-hrmprimaryorange" />
                      <div className="flex flex-col gap-1 px-9 py-4">
                        <p className="text-sm font-bold text-neutralmedium">
                          {entry.title}
                        </p>
                        <p className="text-xs text-black">
                          {entry.description}
                        </p>
                        <p className="flex items-center gap-2 text-xs text-black">
                          <CalendarDays className="size-3" />
                          {entry.date}
                          <p className="h-3 border border-l border-gray-dark"></p>
                          {entry.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default CandidateHistoryTimeline;
