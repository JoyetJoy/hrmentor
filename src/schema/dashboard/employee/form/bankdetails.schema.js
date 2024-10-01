import * as Yup from "yup";

export const empBankDetailsSchema = Yup.object({
  account_type: Yup.string().required("Account type is required"),
  bank_name: Yup.string().required("Bank name is required"),
  branch: Yup.string().required("Branch is required"),
  iban: Yup.string().required("IBAN number is required"),
  account_number: Yup.string().required("Account number is required"),
  account_holder_name: Yup.string().required("Account holder name is required"),
  swift_code: Yup.string().required("Swift code is required"),
  sort_code: Yup.string().required("Sort code is required"),
});
