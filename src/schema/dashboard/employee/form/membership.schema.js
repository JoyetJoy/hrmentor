import * as Yup from "yup";

export const empMembershipSchema = Yup.object({
  reg_memb_body: Yup.string().required("Membership body is required"),
  professional_reg_number: Yup.string().required(
    "Profession registration number is required",
  ),
  first_registered_date: Yup.string().required(
    "First registered date is required",
  ),
  expiry_date: Yup.string()
    .required("Expiry date is required")
    .test(
      "expiry-after-registered",
      "Expiry date should be after the first registered date",
      function (expiry_date) {
        const { first_registered_date } = this.parent;
        return new Date(expiry_date) > new Date(first_registered_date);
      },
    ),
  renewal_date: Yup.string()
    .required("Renewal date is required")
    .test(
      "renewal-before-expiry",
      "Renewal date should be before the expiry date",
      function (renewal_date) {
        const { expiry_date } = this.parent;
        return new Date(renewal_date) < new Date(expiry_date);
      },
    ),
});
