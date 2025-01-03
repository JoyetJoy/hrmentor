import { MoveRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function ProfileCompletionCount({ data }) {
  return (
    <div className="relative mb-4 flex h-28 flex-col justify-between rounded-xl bg-white px-5 py-4 shadow">
      <div className="z-10 flex gap-3 font-medium">
        Complete profile details
        <Link to="/admin/company/general">
          <MoveRight />
        </Link>
      </div>
      <div className="flex h-7 w-fit items-center justify-center rounded-lg bg-hrmprimaryorange px-5 text-sm font-semibold text-white">
        {data?.overallPercentage.toFixed(2)}%
      </div>
    </div>
  );
}
