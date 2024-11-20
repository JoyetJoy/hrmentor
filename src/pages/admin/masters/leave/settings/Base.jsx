import LeaveHeader from "@/components/common/LeaveMenuHeader";
import { SettingsSidebar } from "@/components/sidebars/recruiter/SettingsSidebar";
import { LeaveSidebarList } from "@/constants/menus/leave";
import BasicSettings from "@/components/popups/master/leave/settings/BasicSettings";

export const BaseSettings = () => {
  return (
    <div className="flex flex-col">
        <LeaveHeader page={3} currentPage={"Settings"} />
        <div className="flex gap-x-3">
          <SettingsSidebar sidebarList={LeaveSidebarList} active={'Basic settings'} />
          <BasicSettings />
        </div>
    </div>
  );
};
