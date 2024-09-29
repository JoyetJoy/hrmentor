import { EMPLOYEE_ETHNICITY } from "@/api/master";
import { EmployeeMasters } from "@/components/popups/employees/settings/common/Listing";
import { employeeColumnKeysForEthnicity } from "@/lib/columns/employee";

export const EmployeeEthncity = () => {
  return (
    <>
      <EmployeeMasters
        api={EMPLOYEE_ETHNICITY}
        qryKey={"employeeEthncityList"}
        colKeys={employeeColumnKeysForEthnicity}
        type={"Ethnicity"}
      />
    </>
  );
};
