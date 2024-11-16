import * as Yup from "yup";

export const BankHolidaySchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Holiday name is required"),
  date: Yup.date()
    .required("Date is required")
    .typeError("Invalid date format"),
  location: Yup.object()
    .required("Location is required"),
  holiday_status: Yup.string()
    .oneOf(["paid", "unpaid"], "Invalid holiday status")
    .required("Holiday status is required"),
  description: Yup.string()
    .trim()
    .max(250, "Description cannot exceed 250 characters"),
});
