import MenuHeaderHiring from "@/components/hiring/MenuHeader";
import { OverviewCards } from "@/components/hiring/overview/OverviewCard";
import { UpcomingInterviewsList } from "@/components/hiring/overview/UpcomingInterviewsList";

export const HiringDashboard = () => {
  return (
    <>
      <MenuHeaderHiring page={1} />
      <div className="flex flex-col gap-3">
        <OverviewCards />
        <UpcomingInterviewsList />
      </div>
    </>
  );
};
