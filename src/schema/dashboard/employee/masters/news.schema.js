import * as Yup from "yup";
export const newsSchema = Yup.object({
  news_title: Yup.string().required("News title  is required"),
  short_summary: Yup.string(),
  featured_image: Yup.string(),
  expiry_date: Yup.string(),
  status: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Status is required", function (value) {
    return value?.value && value?.label;
  }),
});
