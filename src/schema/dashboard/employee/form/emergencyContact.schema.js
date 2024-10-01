import * as Yup from "yup";

export const empEmergencyContactSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  relationship: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Status is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Relationship is required"),
  contact_number: Yup.string().required("Contact number is required"),
  address: Yup.string().required("Address is required"),
});
