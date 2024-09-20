import * as Yup from "yup";

export const EmployeeSchema = Yup.object({
  sur_name: Yup.string().required("Surname is required"),
  blood_group: Yup.string()
    .oneOf(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"])
    .required("Blood group is required"),
  dob: Yup.date().required("Date of birth is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"])
    .required("Gender is required"),
  home_address: Yup.string().required("Home address is required"),
  communication_address: Yup.string().required(
    "Communication address is required",
  ),
  department_id: Yup.number().required("Department ID is required"),
  role_id: Yup.array()
    .of(Yup.number())
    .min(1, "At least one role ID is required"),
  designation_id: Yup.number().required("Designation ID is required"),
  worklocation_id: Yup.number().required("Work location ID is required"),
  date_of_joining: Yup.date().required("Date of joining is required"),
  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  home_number: Yup.string().matches(
    /^[0-9]{10}$/,
    "Home number must be 10 digits",
  ),
  personal_email: Yup.string()
    .email("Invalid email format")
    .required("Personal email is required"),
  work_email: Yup.string()
    .email("Invalid email format")
    .required("Work email is required"),
  country_id: Yup.number().required("Country ID is required"),
  city_id: Yup.number().nullable().required("City ID is required"),
  marital_status: Yup.string()
    .oneOf(["single", "married", "divorced", "widowed"])
    .required("Marital status is required"),
  status: Yup.object().shape({
    id: Yup.string().required("Status ID is required"),
    value: Yup.string().required("Status value is required"),
    label: Yup.string().required("Status label is required"),
  }),
});
