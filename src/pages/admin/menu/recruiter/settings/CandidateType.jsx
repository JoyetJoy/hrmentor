import { CANDIDATE_TYPE } from "@/api/master";
import { RecruiterMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForCandidateType } from "@/lib/columns/recruiter";

export const RecruiterSettingCandidateType = () => {
  return (
    <RecruiterMasters
      api={CANDIDATE_TYPE}
      qryKey={"recCandidateTypeList"}
      colKeys={recColumnKeysForCandidateType}
      type={"Candidate Type"}
    />
  );
};
