import LeaveHeader from "@/components/common/LeaveMenuHeader";
import { SettingsSidebar } from "@/components/sidebars/recruiter/SettingsSidebar";
import { LeaveSidebarList } from "@/constants/menus/leave";
import AdvancedSettings from "@/components/popups/master/leave/settings/AdvancedSettings";

export const Advanced = () => {
  return (
    <div className="flex flex-col">
        <LeaveHeader page={3} currentPage={"Settings"} />
        <div className="flex gap-x-3">
          <SettingsSidebar sidebarList={LeaveSidebarList} active={'Advanced settings'} />
          <AdvancedSettings />
        </div>
    </div>
  );
};
