import * as Yup from "yup";
export const newsSchema = Yup.object({
  news_title: Yup.string(),
  short_summary: Yup.string(),
  featured_image: Yup.string(),
  content: Yup.string(),
  status: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }),
});

export const eventsSchema = Yup.object({
  event_title: Yup.string(),
  short_summary: Yup.string(),
  start_date: Yup.string(),
  end_date: Yup.string(),
  start_time: Yup.string(),
  end_time: Yup.string(),
  content: Yup.string(),
  location_id: Yup.string(),
});
