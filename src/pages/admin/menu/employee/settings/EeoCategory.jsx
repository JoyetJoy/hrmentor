import { EMPLOYEE_EEO_CATEGORY } from "@/api/master";
import { EmployeeMasters } from "@/components/popups/employees/settings/common/Listing";
import { employeeColumnKeysForEeoJobCategory } from "@/lib/columns/employee";

export const EmployeeEeoCategory = () => {
  return (
    <>
      <EmployeeMasters
        api={EMPLOYEE_EEO_CATEGORY}
        qryKey={"employeeEeoJonCategoryList"}
        colKeys={employeeColumnKeysForEeoJobCategory}
        type={"Eeo Job Category"}
      />
    </>
  );
};
