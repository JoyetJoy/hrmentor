import { MINIMUM_Experience } from "@/api/master";
import { RecruiterMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForMinimumExperience } from "@/lib/columns/recruiter";

export const RecruiterSettingMinimumExperience = () => {
  return (
    <RecruiterMasters
      api={MINIMUM_Experience}
      qryKey={"recMinimumExperienceList"}
      colKeys={recColumnKeysForMinimumExperience}
      type={"Experience"}
    />
  );
};
