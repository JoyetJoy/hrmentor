import { newRequest } from "@/api";
import { DASHBOARD_INTERVIEWS_LIST } from "@/api/recruiter";
import { useQuery } from "@tanstack/react-query";
import { MoveDiagonal } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecDashboardInterviews({ selectedDate }) {
  const pageLimit = 10;
  const dateObject = selectedDate.toDate();

  // Fetch List
  const { data: recDashboardInterviews, isLoading } = useQuery({
    queryKey: ["recDashboardInterviews", selectedDate],
    queryFn: () =>
      newRequest
        .get(DASHBOARD_INTERVIEWS_LIST, {
          params: {
            per_limit: pageLimit,
            date: dateObject,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  console.log(recDashboardInterviews);

  return (
    <>
      {recDashboardInterviews?.map((i) => (
        <div className="flex flex-col gap-3 p-5">
          <div className="flex h-20 w-full items-center justify-between rounded-md bg-[#F5F5F7] px-5 py-2">
            <div className="flex items-center gap-x-2">
              <p className="text-[ #2C2C2C] text-sm font-medium capitalize">
                {i?.candidate_detail?.job_name?.job_title}
              </p>
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-8">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-8">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-8">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
              </div>
              <h1 className="text-[ #2C2C2C] text-sm">Sara +2 more</h1>
            </div>
            <Link className="flex cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2">
              <MoveDiagonal className="size-3" strokeWidth={1} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
