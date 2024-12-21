import { PENDING_LEAVE_REQUEST_LIST } from "@/api/master";
import { LeaveMasters } from "@/components/popups/master/leave/Listing";
import { recColumnKeysForHolidayreqList } from "@/lib/columns/recruiter";

export const AwaitingapprovalList = () => {
  return (
    <LeaveMasters
      api={PENDING_LEAVE_REQUEST_LIST}
      qryKey={"leaveRequestList"}
      colKeys={recColumnKeysForHolidayreqList}
      type={"Awaiting Approval"}
    />
  );
};
