import { EMPLOYEE_DESIGNATION } from "@/api/master";
import { RecruiterMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForDesignation } from "@/lib/columns/recruiter";

export const RecruiterSettingDesignation = () => {
  return (
    <>
      <RecruiterMasters
        api={EMPLOYEE_DESIGNATION}
        qryKey={"recSettingsDesignation"}
        colKeys={recColumnKeysForDesignation}
        type={"Designation"}
      />
    </>
  );
};
