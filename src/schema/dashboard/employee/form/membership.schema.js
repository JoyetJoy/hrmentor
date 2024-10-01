import * as Yup from "yup";

export const empMembershipSchema = Yup.object({
  reg_memb_body: Yup.string().required("Membership body is required"),
  professional_reg_number: Yup.string().required(
    "Profession registration number is required",
  ),
  expiry_date: Yup.string().required("Expiry date is required"),
  first_registered_date: Yup.string().required(
    "First registered date is required",
  ),
  renewal_date: Yup.string().required("Renewal date is required"),
});
