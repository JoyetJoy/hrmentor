import * as Yup from "yup";

// EMPLOYEE TYPE SCHEMA
export const EmployeeMasterCommanFormSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  status: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Status is required", function (value) {
    return value?.value && value?.label;
  }),
});
