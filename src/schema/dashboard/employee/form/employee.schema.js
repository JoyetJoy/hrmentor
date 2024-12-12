// import { min } from "moment";
import * as Yup from "yup";

export const EmployeeSchema = Yup.object({
  unique_id: Yup.string().required("Employee unique ID is required"),
  first_name: Yup.string().required("First name is required"),
  middle_name: Yup.string(),
  sur_name: Yup.string().required("Surname is required"),

  blood_group: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }),
  post_code: Yup.string()
    .required("Postal code is required")
    .min(5, "Postal code must be at least 5 characters")
    .max(7, "Postal code must not exceed 7 characters"),
  dob: Yup.string().required("Date of birth is required"),
  nationality_id: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Nationality is required", function (value) {
    return value?.value && value?.label;
  }),
  gender: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Gender is required", function (value) {
    return value?.value && value?.label;
  }),

  employment_type: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Employment type is required", function (value) {
    return value?.value && value?.label;
  }),

  home_address: Yup.string().required("Home address is required"),
  communication_address: Yup.string().required(
    "Communication address is required",
  ),
  national_insurance_number: Yup.string().required(
    "National Insurance is required",
  )
  .max(9, "National Insurance must not exceed 9 characters"),

  department_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Department is required", function (value) {
    return value?.value && value?.label;
  }),

  role_id: Yup.array()
    .of(
      Yup.object({
        id: Yup.number().required("Role ID is required"),
        value: Yup.string(),
        label: Yup.string(),
      }),
    )
    .min(1, "At least one role is required")
    .required("Role is required"),

  designation_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }),

  worklocation_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Work location is required", function (value) {
    return value?.value && value?.label;
  }),
  date_of_joining: Yup.string().required("Date of joining is required"),

  mobile_number: Yup.string()
    .matches(/^[0-9]{11}$/, "Mobile number must be 11 digits")
    .required("Mobile number is required"),

  personal_email: Yup.string()
    .email("Invalid email format")
    .required("Personal email is required"),

  work_email: Yup.string()
    .email("Invalid email format"),
  country_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test(function (value) {
    return value?.value && value?.label;
  }),

  state_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }),

  city_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "City is required", function (value) {
    return value?.value && value?.label;
  }),

  marital_status: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Martial status is required", function (value) {
    return value?.value && value?.label;
  }),
  pention_status: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Pention status is required", function (value) {
    return value?.value && value?.label;
  }),
});
