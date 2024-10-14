import * as Yup from "yup";

export const recruiterJobPostSchema = Yup.object({
  job_code: Yup.string().required("Job code is required"),
  job_title: Yup.string().required("Job title is required"),
  min_exp_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Minimum experience is required", function (value) {
    return value?.value && value?.label;
  }),
  job_description: Yup.string().required("Job description is required"),
  salary_package: Yup.string().required("Salary package is required"),
  salary_type: Yup.string().required("Salary type is required"),
  minimum_range: Yup.string().required("Minimum range is required"),
  maximum_range: Yup.string().required("Maximum range is required"),
  sensitive_data_salary_minimum_range: Yup.string().required(
    "Minimum range is required",
  ),
  sensitive_data_salary_maximum_range: Yup.string().required(
    "Maximum range is required",
  ),
  currency_type: Yup.string().required("Currency type is required"),
  search_engine_description: Yup.string().required("SearchEngine"),
  meta_title: Yup.string().required("Meta title is required"),
  sensitive_data_internal_note: Yup.string().required(
    "Internal note is required",
  ),
  sensitive_data_internal_note: Yup.string().required(
    "Internal note is required",
  ),
  job_description_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Job description is required", function (value) {
    return value?.value && value?.label;
  }),
  postal_code: Yup.string().required("Postal code is required"),
  employment_type: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Employment type is required", function (value) {
    return value?.value && value?.label;
  }),
  work_type: Yup.string().required("Work type is required"),
  department_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Department is required", function (value) {
    return value?.value && value?.label;
  }),

  designation_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Designation is required", function (value) {
    return value?.value && value?.label;
  }),

  country_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Country is required", function (value) {
    return value?.value && value?.label;
  }),

  state_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Province is required", function (value) {
    return value?.value && value?.label;
  }),
  city_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "City is required", function (value) {
    return value?.value && value?.label;
  }),
});
