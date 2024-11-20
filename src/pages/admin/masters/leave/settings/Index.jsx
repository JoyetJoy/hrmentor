import { HOLIDAY_STATUS } from "@/api";
import { JOB_DESCRIPTION } from "@/api/master";
import { HolidayListing } from "@/components/popups/master/leave/HolidayListing";
import { LeaveMasters } from "@/components/popups/master/leave/Listing";
// import { LeaveMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForHolidayListing } from "@/lib/columns/recruiter";

export const HolidayList = () => {
  return (
    <HolidayListing
      api={HOLIDAY_STATUS}
      qryKey={"holidayStatus"}
      colKeys={recColumnKeysForHolidayListing}
      type={"Holiday type"}
    />
  );
};
