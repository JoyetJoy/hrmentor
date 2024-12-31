import * as Yup from "yup";

export const BankHolidaySchema = Yup.object().shape({
  holiday_name: Yup.string().trim().required("Holiday name is required"),
  date: Yup.date()
    .required("Date is required")
    .typeError("Invalid date format"),
  location_id: Yup.object(),
  type: Yup.string(),
  description: Yup.string()
    .trim()
    .max(250, "Description cannot exceed 250 characters"),
});
