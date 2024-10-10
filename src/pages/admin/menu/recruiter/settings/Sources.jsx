import { SOURCES } from "@/api/master";
import { RecruiterMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForSource } from "@/lib/columns/recruiter";

export const RecruiterSettingSources = () => {
  return (
    <RecruiterMasters
      api={SOURCES}
      qryKey={"recSourceList"}
      colKeys={recColumnKeysForSource}
      type={"Sources"}
    />
  );
};
