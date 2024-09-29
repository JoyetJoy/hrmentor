import { EMPLOYEE_DOCUMENT_TYPE } from "@/api/master";
import { EmployeeMasters } from "@/components/popups/employees/settings/common/Listing";
import { employeeColumnKeysForDocumentType } from "@/lib/columns/employee";

export const EmployeeDocumentType = () => {
  return (
    <>
      <EmployeeMasters
        api={EMPLOYEE_DOCUMENT_TYPE}
        qryKey={"employeeDocumentTypeList"}
        colKeys={employeeColumnKeysForDocumentType}
        type={"Document Type"}
      />
    </>
  );
};
