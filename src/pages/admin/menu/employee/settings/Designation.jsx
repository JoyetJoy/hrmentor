import { EMPLOYEE_DESIGNATION } from "@/api/master";
import { EmployeeMasters } from "@/components/popups/employees/settings/common/Listing";
import { employeeColumnKeysForDesignation } from "@/lib/columns/employee";

export const EmployeeDesignation = () => {
  return (
    <>
      <EmployeeMasters
        api={EMPLOYEE_DESIGNATION}
        qryKey={"employeeDesignationList"}
        colKeys={employeeColumnKeysForDesignation}
        type={"Designation"}
      />
    </>
  );
};
