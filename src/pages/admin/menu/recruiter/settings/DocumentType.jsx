import { CANDIDATE_TYPE } from "@/api/master";
import { RecruiterMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForDocumentType } from "@/lib/columns/recruiter";

export const RecruiterSettingDocumentType = () => {
  return (
    <RecruiterMasters
      api={CANDIDATE_TYPE}
      qryKey={"recCandidateTypeList"}
      colKeys={recColumnKeysForDocumentType}
      type={"Document Type"}
    />
  );
};
