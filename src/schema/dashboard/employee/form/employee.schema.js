import * as Yup from "yup";

export const EmployeeSchema = Yup.object({
  unique_id: Yup.string().required("Employee unique ID is required"),
  first_name: Yup.string().required("First name is required"),
  sur_name: Yup.string().required("Surname is required"),
  blood_group: Yup.object({
    value: Yup.string()
      .oneOf(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"])
      .required("Blood group value is required"),
    label: Yup.string().required("Blood group label is required"),
  }).required("Blood group is required"),

  dob: Yup.string().required("Date of birth is required"),
  gender: Yup.object({
    value: Yup.string().required("Gender value is required"),
    label: Yup.string().required("Gender label is required"),
  }).required("Gender is required"),
  employment_type: Yup.object({
    id: Yup.string().required("Employment Type ID is required"),
    value: Yup.string().required("Employment Type value is required"),
    label: Yup.string().required("Employment Type is required"),
  }).required("Employeement type is required"),

  home_address: Yup.string().required("Home address is required"),
  communication_address: Yup.string().required(
    "Communication address is required",
  ),
  national_insurance_number: Yup.string().required(
    "National Insurance is required",
  ),
  department_id: Yup.object({
    id: Yup.string().required("Department ID is required"),
    value: Yup.string().required("Department value is required"),
    label: Yup.string().required("Department label is required"),
  }).required("Department is required"),

  role_id: Yup.array()
    .of(
      Yup.object({
        id: Yup.number().required("Role ID is required"),
        value: Yup.string(),
        label: Yup.string(),
      }),
    )
    .min(1, "At least one role ID is required"),

  designation_id: Yup.object({
    id: Yup.string().required("Designation ID is required"),
    value: Yup.string().required("Designation value is required"),
    label: Yup.string().required("Designation label is required"),
  }).required("Designation is required"),

  worklocation_id: Yup.object({
    id: Yup.string().required("Work location ID is required"),
    value: Yup.string().required("Work location value is required"),
    label: Yup.string().required("Work location label is required"),
  }).required("Work location is required"),

  date_of_joining: Yup.string().required("Date of joining is required"),

  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  personal_email: Yup.string()
    .email("Invalid email format")
    .required("Personal email is required"),

  work_email: Yup.string()
    .email("Invalid email format")
    .required("Work email is required"),

  country_id: Yup.object({
    id: Yup.string().required("Country ID is required"),
    value: Yup.string(),
    label: Yup.string(),
  }).required("Country is required"),

  city_id: Yup.object({
    id: Yup.string().required("City ID is required"),
    value: Yup.string(),
    label: Yup.string(),
  }).required("City is required"),

  marital_status: Yup.object({
    value: Yup.string()
      .oneOf(["single", "married", "divorced", "widowed"])
      .required("Marital status value is required"),
    label: Yup.string().required("Marital status label is required"),
  }).required("Marital status is required"),
});
