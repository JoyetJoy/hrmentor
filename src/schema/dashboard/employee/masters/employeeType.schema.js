import * as Yup from "yup";

// EMPLOYEE TYPE SCHEMA
export const EmployeeMasterCommanFormSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  status: Yup.object().shape({
    id: Yup.string().required("Status is required"),
    value: Yup.string().required("Status is required"),
    label: Yup.string().required("Status is required"),
  }),
});
