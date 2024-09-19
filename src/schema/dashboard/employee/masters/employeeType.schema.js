import * as Yup from "yup";

// EMPLOYEE TYPE SCHEMA
export const EmployeeTypeSchema = Yup.object({
  employment_type_name: Yup.string().required("Employment type is required"),
  employment_type_status: Yup.string().required(
    "Employment status is required",
  ),
});
