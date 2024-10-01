import * as Yup from "yup";

export const empRightToWorkSchema = Yup.object({
  reference_no: Yup.string().required("Reference number is required"),
  condtion: Yup.string().required("Condtion is required"),
  reviewedBy: Yup.string().required("Reviewed by date is required"),
  expiry_date: Yup.string().required("Expiry date is required"),
});
