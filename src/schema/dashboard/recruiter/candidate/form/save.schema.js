import * as Yup from "yup";

export const recCandidateSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  middle_name: Yup.string().required("Middle name is required"),
  sur_name: Yup.string().required("Surname is required"),
  date_of_birth: Yup.string().required("Date of birth is required"),
  gender: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Gender is required", function (value) {
    return value?.value && value?.label;
  }),
  home_address: Yup.string().required("Home address is required"),
  communication_address: Yup.string().required(
    "Communication address is required",
  ),
  post_code: Yup.string().required("Post code is required"),
  language_spoken: Yup.array()
    .of(
      Yup.object({
        id: Yup.number().required("Languages is required"),
        value: Yup.string(),
        label: Yup.string(),
      }),
    )
    .min(1, "At least one language is required")
    .required("Role is required"),
  highest_education_level: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test(
    "both-required",
    "Highest education level is required",
    function (value) {
      return value?.value && value?.label;
    },
  ),
  college_or_university: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "University is required", function (value) {
    return value?.value && value?.label;
  }),
  source: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Source is required", function (value) {
    return value?.value && value?.label;
  }),

  job_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Recruiting job is required", function (value) {
    return value?.value && value?.label;
  }),
  linked_in: Yup.string().required("LinkendIn Id is required"),
  date_applied: Yup.string().required("Date applied is required"),
  phone_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Personal email is required"),

  country_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Country is required", function (value) {
    return value?.value && value?.label;
  }),

  state_or_province: Yup.object({
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
