import * as Yup from "yup";

export const WorkInfoSchema = Yup.object({
  reporting_manager_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Reporting manager is required", function (value) {
    return value?.value && value?.label;
  }),
  hiring_manager_id: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Hr Manager is required", function (value) {
    return value?.value && value?.label;
  }),
  eeo_job_category_id: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "EEO Job category is required", function (value) {
    return value?.value && value?.label;
  }),
  ethinicity_id: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Ethinicity is required", function (value) {
    return value?.value && value?.label;
  }),

  probation_period: Yup.string().required("Probation Period is required"),
  notice_period: Yup.string().required("Notice Period is required"),
});
