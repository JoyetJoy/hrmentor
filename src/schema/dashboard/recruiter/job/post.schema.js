import * as Yup from "yup";

export const recruiterJobPostSchema = (isNotMentioned) => {
  return Yup.object({
    job_code: Yup.string().required("Job code is required"),
    job_title: Yup.string().required("Job title is required"),
    min_exp_id: Yup.object({
      id: Yup.string(),
      value: Yup.string(),
      label: Yup.string(),
    }).test(
      "both-required",
      "Minimum experience is required",
      function (value) {
        return value?.value && value?.label;
      },
    ),
    salary_package: Yup.object({
      value: Yup.string(),
      label: Yup.string(),
    }).test("both-required", "Salary package is required", function (value) {
      return value?.value && value?.label;
    }),
    salary_type: Yup.object({
      value: Yup.string().nullable(),
      label: Yup.string().nullable(),
    }),
    minimum_range: Yup.string()
      .nullable()
      .test("minimum-required", "Minimum range is required", function (value) {
        if (!isNotMentioned) {
          return !!value;
        }
        return true;
      }),

    maximum_range: Yup.string()
      .nullable()
      .test("maximum-required", "Maximum range is required", function (value) {
        if (!isNotMentioned) {
          return !!value;
        }
        return true;
      }),
    sensitive_salary_minimum_range: Yup.string(),
    sensitive_salary_maximum_range: Yup.string(),
    salary_package_type: Yup.object({
      id: Yup.string().nullable(),
      value: Yup.string().nullable(),
      label: Yup.string().nullable(),
    })
      .nullable()
      .test(
        "both-required",
        "Salary package type is required",
        function (value) {
          if (!isNotMentioned) {
            return value?.value && value?.label;
          }
          return true;
        },
      ),
    currency_type: Yup.object({
      value: Yup.string().nullable(),
      label: Yup.string().nullable(),
    })
      .nullable()
      .test("both-required", "Currency type is required", function (value) {
        if (!isNotMentioned) {
          return value?.value && value?.label;
        }
        return true;
      }),
    search_engine_description: Yup.string(),
    meta_title: Yup.string(),
    sensitive_data_internal_note: Yup.string().required(
      "Internal note is required",
    ),
    sensitive_data_internal_note: Yup.string(),
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
};
