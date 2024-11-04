import * as Yup from "yup";

export const dbsSchema = Yup.object({
  name: Yup.string(),
  start_date: Yup.string(),
  reference: Yup.string(),
  comments: Yup.string(),
  status: Yup.string()
});
