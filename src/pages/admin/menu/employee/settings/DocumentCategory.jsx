import { EMPLOYEE_DOCUMENT_CATEGORY } from "@/api/master";
import { EmployeeMasters } from "@/components/popups/employees/settings/common/Listing";
import { employeeColumnKeysForDocumentCategory } from "@/lib/columns/employee";

export const EmployeeDocumentCategory = () => {
  return (
    <>
      <EmployeeMasters
        api={EMPLOYEE_DOCUMENT_CATEGORY}
        qryKey={"employeeDesignationList"}
        colKeys={employeeColumnKeysForDocumentCategory}
        type={"Document Category"}
      />
    </>
  );
};
