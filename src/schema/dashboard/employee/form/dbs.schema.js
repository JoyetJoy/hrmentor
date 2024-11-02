import * as Yup from "yup";

export const dbsSchema = Yup.object({
  name: Yup.string().required("Candidate name is required"),
  start_date: Yup.string().required("Start date is required"),
  reference: Yup.string().required("Reference is required"),
  comments: Yup.string(),
  status: Yup.string().required("Status is required"),
});
