import * as Yup from "yup";

export const empSalaryDetailsSchema = Yup.object({
  effective_from: Yup.string(),
  effective_to: Yup.string(),
  currency: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Currency is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Type is required"),
  roles: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Roles is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Roles is required"),
  pay_rate: Yup.string().required("Type is required"),
  per: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Per is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Type is required"),
  pay_schedule: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Pay Schedule is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Pay type is required"),
  pay_type: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Pay type is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Pay type is required"),
  over_time: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Over time is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Type is required"),
  pay_calculation: Yup.string().required("Pay Calculation is required"),
  weekly_contract_hours: Yup.string().required(
    "Weekly contract hours are required",
  ),
  weekly_pay: Yup.string().required("Weekly pay is required"),
  annual_pay: Yup.string().required("Annual pay is required"),
  status: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Status is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Status is required"),
});
