import { LEAVE_REQUEST_LIST } from "@/api/master";
import { LeaveMasters } from "@/components/popups/master/leave/Listing";
// import { LeaveMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForHolidayreqList } from "@/lib/columns/recruiter";

export const LeaveHolidayrequestList = () => {
  return (
    <LeaveMasters
      api={LEAVE_REQUEST_LIST}
      qryKey={"leaveRequestList"}
      colKeys={recColumnKeysForHolidayreqList}
      type={"Leave request list"}
    />
  );
};
