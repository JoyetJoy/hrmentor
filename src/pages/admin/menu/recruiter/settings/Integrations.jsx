import MenuHeader from "@/components/common/MenuHeader";
import { SettingsSidebar } from "@/components/sidebars/recruiter/SettingsSidebar";
import { recruiterSetting } from "@/constants/sidebars/recruiter";
import { CircleHelp, Earth } from "lucide-react";
import { Link } from "react-router-dom";

export const Integrations = () => {
  return (
    <div className="flex h-full w-full flex-col gap-x-3">
      <MenuHeader menu="Menu" currentpath="Recruiter" activeMenu={"Settings"} />
      <div className="mt-2 flex flex-row items-center justify-between px-1">
        <h1 className="flex items-center gap-1 text-base font-bold">
          Settings
        </h1>
        <div className="flex gap-5">
          <Link className="active-menu px-2 text-sm font-extrabold text-bgColor-100 before:bg-hrmdarkblue">
            General settings
          </Link>
          <Link className="text-sm font-medium text-gray-200">
            Notification
          </Link>
        </div>
      </div>
      <div className="my-4 flex h-screen gap-x-3 overflow-y-hidden">
        <SettingsSidebar sidebarList={recruiterSetting} active="Integrations" />
        <div className="h-full w-full rounded bg-white px-9 py-9">
          <div className="mb-4 flex w-full items-center justify-between">
            <h3 className="text-base font-bold text-textcolor-darkCharcoal">Integration</h3>{" "}
          </div>
          <div className="b h-full w-full">
            <div className="h-fit w-full rounded border border-gray-soft px-5 py-4">
              <p>
                LinkedIn Recruiter is a sourcing tool for finding candidates on
                the LinkedIn network. Connect your company's LinkedIn recruiter
                account to sync LinkedIn profiles, In mail conversations, and
                notes with HRmentor
              </p>
              <div className="flex items-center justify-between">
                <div className="mt-5 flex items-center gap-5 text-sm font-normal text-gray-dark">
                  <div className="flex items-center gap-x-2">
                    <Earth />
                    <p>Website</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <CircleHelp />
                    <p>Support Article</p>
                  </div>
                </div>
                <div className="flex h-9 w-fit items-center rounded border border-gray-coollight px-3 text-sm font-medium text-gray-dark">
                  More Details
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
