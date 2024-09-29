import { EMPLOYEE_DEPARTMENT } from "@/api/master";
import { EmployeeMasters } from "@/components/popups/employees/settings/common/Listing";
import { employeeColumnKeysForDepartment } from "@/lib/columns/employee";

export const EmployeeDepartment = () => {
  return (
    <>
      <EmployeeMasters
        api={EMPLOYEE_DEPARTMENT}
        qryKey={"employeeDepartmentList"}
        colKeys={employeeColumnKeysForDepartment}
        type={"Department"}
      />
    </>
  );
};
