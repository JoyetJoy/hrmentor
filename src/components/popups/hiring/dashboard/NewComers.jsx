import { newRequest } from "@/api";
import { DASHBOARD_OPEN_JOBS } from "@/api/recruiter";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { Eye, Maximize2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewComers() {
  const pageLimit = 10;
  // Fetch List
  const { data: newComers, isLoading } = useQuery({
    queryKey: ["newComers"],
    queryFn: () =>
      newRequest
        .get(DASHBOARD_OPEN_JOBS, {
          params: {
            per_limit: pageLimit,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  console.log(newComers);

  return (
    <>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {newComers?.length ? (
              <>
                {newComers?.slice(0, 5).map((candidate) => (
                  <div
                    key={candidate?.id}
                    className="flex h-[4.3rem] w-full items-center justify-between rounded-md bg-[#F5F5F7] px-5 py-2"
                  >
                    <h3 className="w-24 text-[0.8rem] font-semibold">
                      <span className="mr-1">{candidate?.job_title}</span>
                    </h3>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex -space-x-3">
                        <img
                          src={"../../../../assets/images/hiring/avatar/a1.png"}
                          alt="neha"
                          className="h-8 w-8 rounded-full"
                        />
                        <img
                          src={"../../../../assets/images/hiring/avatar/a2.png"}
                          alt="neha"
                          className="h-8 w-8 rounded-full"
                        />
                        <img
                          src={"../../../../assets/images/hiring/avatar/a3.png"}
                          alt="neha"
                          className="h-8 w-8 rounded-full"
                        />
                      </div>
                      <span>Neha +2More</span>
                    </div>
                    <Link
                      to={`/admin/hiring/view-candidate?cid=${candidate?.id}`}
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
    </>
  );
}
