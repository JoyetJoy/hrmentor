import { EMPLOYEE_DESIGNATION } from "@/api/master";
import { EmployeeMasters } from "@/components/popups/employees/settings/common/Listing";
import { employeeColumnKeysForDocumentType } from "@/constants/data";

export const EmployeeDocumentCategory = () => {
  return (
    <>
      <EmployeeMasters
        api={EMPLOYEE_DESIGNATION}
        qryKey={"employeeDesignationList"}
        colKeys={employeeColumnKeysForDocumentType}
        type={"Designation"}
      />
    </>
  );
};
