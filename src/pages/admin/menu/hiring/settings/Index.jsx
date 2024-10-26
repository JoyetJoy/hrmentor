import { JOB_DESCRIPTION } from "@/api/master";
import { HiringMasters } from "@/components/hiring/settings/Listing";
import { recColumnKeysForJobDescription } from "@/lib/columns/recruiter";

export const HiringDocumentAndTemplate = () => {
  return (
    <HiringMasters
      api={JOB_DESCRIPTION}
      qryKey={"recJobDescriptionList"}
      colKeys={recColumnKeysForJobDescription}
      type={"Job Description"}
    />
  );
};
