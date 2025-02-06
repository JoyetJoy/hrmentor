import { EMPLOYEE_TYPE } from "@/api/master";
import { RecruiterMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForEmploymentType } from "@/lib/columns/recruiter";

export const RecruiterSettingEmployment = () => {
  return (
    <RecruiterMasters
      api={EMPLOYEE_TYPE}
      qryKey={"recSettingsEmploymentType"}
      colKeys={recColumnKeysForEmploymentType}
      type={"Employment Type"}
    />
  );
};

