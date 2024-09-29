import { EMPLOYEE_WORK_LOCATION } from "@/api/master";
import { EmployeeMasters } from "@/components/popups/employees/settings/common/Listing";
import { employeeColumnKeysForWorkLocation } from "@/lib/columns/employee";

export const EmployeeWorkLocation = () => {
  return (
    <>
      <EmployeeMasters
        api={EMPLOYEE_WORK_LOCATION}
        qryKey={"employeeWorkLocationList"}
        colKeys={employeeColumnKeysForWorkLocation}
        type={"Work Location"}
      />
    </>
  );
};
