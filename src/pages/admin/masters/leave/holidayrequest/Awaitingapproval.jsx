import { JOB_DESCRIPTION } from "@/api/master";
import { LeaveMasters } from "@/components/popups/master/leave/Listing";
import { recColumnKeysForHolidayreqList } from "@/lib/columns/recruiter";

export const AwaitingapprovalList = () => {
  return (
    <LeaveMasters
      api={JOB_DESCRIPTION}
      qryKey={"recJobDescriptionList"}
      colKeys={recColumnKeysForHolidayreqList}
      type={"Awaiting Approval"}
    />
  );
};
