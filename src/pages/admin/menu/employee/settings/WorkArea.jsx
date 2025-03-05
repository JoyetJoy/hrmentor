import { EMPLOYEE_WORK_LOCATION } from "@/api/master";
import { EmployeeMasters } from "@/components/popups/employees/settings/common/Listing";
import { employeeColumnKeysForWorkArea } from "@/lib/columns/employee";

export const EmployeeWorkArea = () => {
  return (
    <>
      <EmployeeMasters
        api={EMPLOYEE_WORK_LOCATION}
        qryKey={"employeeWorkLocationList"}
        colKeys={employeeColumnKeysForWorkArea}
        type={"Work Area"}
      />
    </>
  );
};
