import { QUALIFICATION } from "@/api/master";
import { RecruiterMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForQualification } from "@/lib/columns/recruiter";

export const RecruiterSettingQualification = () => {
  return (
    <>
      <RecruiterMasters
        api={QUALIFICATION}
        qryKey={"recSettingsQualificationList"}
        colKeys={recColumnKeysForQualification}
        type={"Education Qualification"}
      />
    </>
  );
};
