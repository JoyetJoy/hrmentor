import { JOB_DESCRIPTION } from "@/api/master";
import { LeaveMasters } from "@/components/popups/master/leave/Listing";
// import { LeaveMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForHolidayreqList } from "@/lib/columns/recruiter";

export const LeaveHolidayrequestList = () => {
  return (
    <LeaveMasters
      api={JOB_DESCRIPTION}
      qryKey={"recJobDescriptionList"}
      colKeys={recColumnKeysForHolidayreqList}
      type={"Leave request list"}
    />
  );
};
