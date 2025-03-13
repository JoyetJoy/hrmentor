import { newRequest } from "@/api";
import { DASHBOARD_CANDIDATES_LIST } from "@/api/recruiter";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecJobCandidates() {
  const pageLimit = 10;
  // Fetch List
  const { data: newCandidates, isLoading } = useQuery({
    queryKey: ["newCandidates"],
    queryFn: () =>
      newRequest
        .get(DASHBOARD_CANDIDATES_LIST, {
          params: {
            per_limit: pageLimit,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {newCandidates?.length ? (
            <>
              {newCandidates?.map((candidate) => (
                <div
                  key={candidate?.id}
                  className="flex min-h-[4.4rem] py-1 w-full items-center justify-between rounded-md bg-[#F5F5F7] pl-5 pr-9"
                > 
                  <div className="flex items-center gap-x-2">
                    <div className="flex h-10 w-10 min-w-[2rem] items-center justify-center rounded-full bg-hrmprimaryorange/10 text-sm font-bold uppercase">
                      {`${candidate?.first_name?.charAt(0)} ${candidate?.sur_name?.charAt(0)}`}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">
                        <span className="mr-1">{candidate?.first_name}</span>
                        <span className="mr-1">
                          {" "}
                          {candidate?.middle_name ?? ""}
                        </span>
                        {candidate?.sur_name}
                      </h3>
                      <p className="text-xs font-medium text-darkblack">
                        {candidate?.job_name?.job_title}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/admin/recruiter/candidate/profile?cid=${candidate?.id}`}
                    className="flex cursor-pointer items-center rounded-full bg-gray-soft p-2"
                  >
                    <Eye className="size-3" />
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <img
              className="mx-auto my-10 h-40 object-contain"
              src="/not-found.svg"
            />
          )}{" "}
        </>
      )}
    </>
  );
}
