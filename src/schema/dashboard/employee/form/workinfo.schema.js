import * as Yup from "yup";

export const WorkInfoEmployeeSchema = Yup.object({
  reporting_manager_id: Yup.object({
    id: Yup.string().nullable(),
    value: Yup.string().nullable(),
    label: Yup.string().nullable(),
  }),
  hiring_manager_id: Yup.object({
    id: Yup.string().nullable(),
    value: Yup.string().nullable(),
    label: Yup.string().nullable(),
  })
  ,
  eeo_job_category_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "eeo job category is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Report Manager is required"),
  gender: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "gender is required", function (value) {
      return value?.value && value?.label;
    })
    .required("gender is required"),
  ethinicity_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "ethinicity is required", function (value) {
      return value?.value && value?.label;
    })
    .required("ethinicity is required"),
  marital_status: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "marital status is required", function (value) {
      return value?.value && value?.label;
    })
    .required("marital status is required"),
  disability: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "disability is required", function (value) {
      return value?.value && value?.label;
    })
    .required("disability is required"),
  relegion_belief_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "relegion belief is required", function (value) {
      return value?.value && value?.label;
    })
    .required("relegion belief is required"),
    sexual_orientation_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "sexual orientation is required", function (value) {
      return value?.value && value?.label;
    })
    .required("sexual orientation is required"),
  // age: Yup.string().required("Age is required"),
  pregnancy_and_maternity: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "pregnancy and maternity is required", function (value) {
      return value?.value && value?.label;
    })
    .required("pregnancy and maternity is required"),

    dosent_reporting: Yup.string()
});
