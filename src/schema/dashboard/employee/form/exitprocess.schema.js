import * as Yup from "yup";

export const ExitProcessSchema = Yup.object({
  registration_date: Yup.string().required("Registration date is required"),
  // last_working_date: Yup.string().required("Last working date is required"),
  reason: Yup.string().required("Reason is required"),

  exit_type: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Gender is required", function (value) {
    return value?.value && value?.label;
  }),
  note: Yup.string().required("Note is required"),
  portalAccess: Yup.boolean()
  .oneOf([true], "You must agree or check this field")
  .required("You must check this field"),
});
