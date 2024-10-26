import { JOB_DESCRIPTION } from "@/api/master";
import { RecruiterMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForJobDescription } from "@/lib/columns/recruiter";

export const HiringDocumentAndTemplate = () => {
  return (
    <RecruiterMasters
      api={JOB_DESCRIPTION}
      qryKey={"recJobDescriptionList"}
      colKeys={recColumnKeysForJobDescription}
      type={"Job Description"}
    />
  );
};
