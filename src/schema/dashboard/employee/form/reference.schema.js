import * as Yup from "yup";

export const referenceSchema = Yup.object({
  type: Yup.string().required("Type is required"),
  reference_name: Yup.string().required("Name of the reference is required"),
  email: Yup.string().required("Email is required"),
});
