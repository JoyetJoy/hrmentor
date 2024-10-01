import * as Yup from "yup";

export const empEmergencyContactSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  relationship: Yup.string().required("Relationship number is required"),
  contact_number: Yup.string().required("Contact number is required"),
  address: Yup.string().required("Address is required"),
});
