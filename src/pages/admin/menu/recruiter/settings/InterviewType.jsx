import { INTERVIEW_TYPE } from "@/api/master";
import { RecruiterMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForInterviewType } from "@/lib/columns/recruiter";

export const RecruiterSettingInterviewType = () => {
  return (
    <RecruiterMasters
      api={INTERVIEW_TYPE}
      qryKey={"recInterviewtypeList"}
      colKeys={recColumnKeysForInterviewType}
      type={"Interview Type"}
    />
  );
};
