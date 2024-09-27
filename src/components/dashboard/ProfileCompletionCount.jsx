import { MoveRight } from "lucide-react";
import React from "react";

export default function ProfileCompletionCount() {
  return (
    <div className="relative mb-4 flex h-28 flex-col justify-between rounded-xl bg-white px-5 py-4 shadow">
      <div className="flex gap-3 font-medium">
        Complete profile details
        <MoveRight />
      </div>
      <div className="bg-hrmprimaryorange flex h-7 w-fit items-center justify-center rounded-lg px-5 text-sm font-semibold text-white">
        43%
      </div>
      <img
        className="absolute right-0 top-0"
        src="/assets/images/dashboard/group.svg"
        alt="svg"
      />
    </div>
  );
}
