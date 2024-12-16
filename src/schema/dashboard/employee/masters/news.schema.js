import * as Yup from "yup";
export const newsSchema = Yup.object({
  news_title: Yup.string(),
  short_summary: Yup.string(),
  featured_image: Yup.string(),
  expiry_date: Yup.string(),
  status: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }),
});

export const eventsSchema = Yup.object({
  title: Yup.string(),
});
