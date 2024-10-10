import { PROFILE_QUESTION } from "@/api/master";
import { RecruiterMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForProfileQuestion } from "@/lib/columns/recruiter";

export const RecruiterSettingProfileQuestion = () => {
  return (
    <>
      <RecruiterMasters
        api={PROFILE_QUESTION}
        qryKey={"recJobDescriptionList"}
        colKeys={recColumnKeysForProfileQuestion}
        type={"Profile Questions"}
      />
    </>
  );
};
