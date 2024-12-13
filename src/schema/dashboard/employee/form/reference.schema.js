import * as Yup from "yup";

export const referenceSchema = Yup.object({
  type: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Type is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Type is required"),
    reference_name: Yup.string(),
    personal_email: Yup.string(),
    contact_number: Yup.string(),
    company_name: Yup.string().required("company name is required"),
    designation: Yup.string(),
    company_email: Yup.string().required("company email is required")
});
