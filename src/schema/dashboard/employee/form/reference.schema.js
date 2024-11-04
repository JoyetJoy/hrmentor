import * as Yup from "yup";

export const referenceSchema = Yup.object({
  type: Yup.string(),
  reference_name: Yup.string(),
  email: Yup.string()
});
