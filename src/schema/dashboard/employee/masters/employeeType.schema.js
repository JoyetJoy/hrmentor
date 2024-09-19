import * as Yup from "yup";

// EMPLOYEE TYPE SCHEMA
export const EmployeeTypeSchema = Yup.object({
  employment_type_name: Yup.string().required("Employment type is required"),
  employment_type_status: Yup.object().shape({
    id: Yup.string().required("Employee Status is required"),
    value: Yup.string().required("Employee Status is required"),
    label: Yup.string().required("Employee Status is required"),
  }),
});
