import { EMPLOYEE_DEPARTMENT } from "@/api/master";
import { RecruiterMasters } from "@/components/popups/recruiter/settings/common/Listing";
import { recColumnKeysForDepartment } from "@/lib/columns/recruiter";

export const RecruiterSettingDepartment = () => {
  return (
    <>
      <RecruiterMasters
        api={EMPLOYEE_DEPARTMENT}
        qryKey={"recSettingsDepartment"}
        colKeys={recColumnKeysForDepartment}
        type={"Department"}
      />
    </>
  );
};
