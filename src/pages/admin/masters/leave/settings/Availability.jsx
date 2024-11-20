import LeaveHeader from "@/components/common/LeaveMenuHeader";
import AvailabilitySettings from "@/components/popups/master/leave/settings/AvailabilitySettings";
import { SettingsSidebar } from "@/components/sidebars/recruiter/SettingsSidebar";
import { LeaveSidebarList } from "@/constants/menus/leave";

export const Availability = () => {
  return (
    <div className="flex flex-col">
        <LeaveHeader page={3} currentPage={"Settings"} />
        <div className="flex gap-x-3">
          <SettingsSidebar sidebarList={LeaveSidebarList} active={'Availability settings'} />
          <AvailabilitySettings />
        </div>
    </div>
  );
};
