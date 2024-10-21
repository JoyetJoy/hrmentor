import * as Yup from "yup";

export const CareerApplySchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  middle_name: Yup.string(),
  sur_name: Yup.string().required("Surname is required"),
  phone_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
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
  }).test("both-required", "County is required", function (value) {
    return value?.value && value?.label;
  }),
  city_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "City is required", function (value) {
    return value?.value && value?.label;
  }),
  about_your_self: Yup.string().required("About is required"),
});
