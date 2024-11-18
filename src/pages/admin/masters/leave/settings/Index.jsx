import { JOB_DESCRIPTION } from "@/api/master";
import { HolidayListing } from "@/components/popups/master/leave/HolidayListing";
import { recColumnKeysForHolidayListing } from "@/lib/columns/recruiter";

export const HolidayList = () => {
  return (
    <HolidayListing
      api={JOB_DESCRIPTION}
      qryKey={"recJobDescriptionList"}
      colKeys={recColumnKeysForHolidayListing}
      type={"Holiday type"}
    />
  );
};
