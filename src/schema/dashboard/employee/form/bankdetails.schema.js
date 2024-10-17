import * as Yup from "yup";

export const empBankDetailsSchema = Yup.object({
  account_type: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Account type is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Type is required"),
  bank_name: Yup.string().required("Bank name is required"),
  branch: Yup.string().required("Branch is required"),
  iban: Yup.string(),
  account_number: Yup.string().required("Account number is required"),
  account_holder_name: Yup.string().required("Account holder name is required"),
  swift_code: Yup.string(),
  sort_code: Yup.string().required("Sort code is required"),
});
