import * as Yup from "yup";

export const empBankDetailsSchema = Yup.object({
  account_type: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }),
  bank_name: Yup.string().required("Bank name is required"),
  // branch: Yup.string().required("Branch is required"),
  iban: Yup.string(),
  account_number: Yup.string().required("Account number is required"),
  account_holder_name: Yup.string().required("Account holder name is required"),
  swift_code: Yup.string()
    .max(11, "Swift code must not be greater than 11 characters"),
  sort_code: Yup.string()
    .required("Sort code is required")
    .max(8, "Sort code must not be greater than 8 characters")
});
