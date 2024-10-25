import { newRequest } from "@/api";
import { DASHBOARD_INTERVIEWS_LIST } from "@/api/recruiter";
import { useQuery } from "@tanstack/react-query";
import { MoveDiagonal } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecDashboardInterviews({ selectedDate }) {
  const pageLimit = 10;
  const formattedDate = selectedDate?.format("YYYY-MM-DD");

  // Fetch List
  const { data: recDashboardInterviews, isLoading } = useQuery({
    queryKey: ["recDashboardInterviews", selectedDate],
    queryFn: () =>
      newRequest
        .get(DASHBOARD_INTERVIEWS_LIST, {
          params: {
            per_limit: pageLimit,
            date: formattedDate,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  return (
    <>
      {recDashboardInterviews?.length ? (
        <>
          {recDashboardInterviews?.map((i) => {
            const candidatesToShow = i?.candidates_list?.slice(0, 2);
            const remainingCandidates = i?.candidates_list?.length - 2;
            return (
              <div key={i?.id} className="flex flex-col gap-3 p-5">
                <div className="flex h-20 w-full items-center justify-between rounded-md bg-[#F5F5F7] px-5 py-2">
                  <div className="flex items-center gap-x-2">
                    <p className="text-[ #2C2C2C] text-sm font-medium capitalize">
                      {i?.job_title}
                    </p>
                    <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                      {candidatesToShow?.map((candidate) => (
                        <div key={candidate?.id}>
                          <div className="flex h-12 w-12 min-w-[2.75rem] items-center justify-center rounded-full bg-hrmprimaryorange/10 font-bold uppercase">
                            {`${candidate?.first_name?.charAt(0)} ${candidate?.first_name?.charAt(0)}`}
                          </div>
                        </div>
                      ))}
                    </div>
                    {remainingCandidates > 0 && (
                      <h1 className="text-sm text-hrmprimaryorange">
                        {`+${remainingCandidates} more`}
                      </h1>
                    )}
                  </div>
                  <Link className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2">
                    <MoveDiagonal className="size-3" strokeWidth={1} />
                  </Link>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <img
          className="mx-auto my-10 h-40 object-contain"
          src="/not-found.svg"
        />
      )}
    </>
  );
}
