import { COMPLETED_LEAVE_REQUEST_LIST} from "@/api/master";
import { LeaveMasters } from "@/components/popups/master/leave/Listing";
// import { LeaveMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForHolidayreqList } from "@/lib/columns/recruiter";

export const CompletedList = () => {
  return (
    <LeaveMasters
      api={COMPLETED_LEAVE_REQUEST_LIST}
      qryKey={"leaveRequestList"}
      colKeys={recColumnKeysForHolidayreqList}
      type={"Completed"}
    />
  );
};
