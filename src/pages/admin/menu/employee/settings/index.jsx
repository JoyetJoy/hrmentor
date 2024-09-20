import { EMPLOYEE_TYPE } from "@/api/master";
import { EmployeeMasters } from "@/components/popups/employees/settings/common/Listing";
import { employeeColumnKeysForEmployeeType } from "@/constants/data";

export const EmployeeSettings = () => {
  return (
    <>
      <EmployeeMasters
        api={EMPLOYEE_TYPE}
        qryKey={"employeeTypeList"}
        colKeys={employeeColumnKeysForEmployeeType}
        type={"Employee Type"}
      />
    </>
  );
};
