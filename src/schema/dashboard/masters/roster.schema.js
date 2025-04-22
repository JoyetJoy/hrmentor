import * as Yup from "yup";
export const RosterSchema = Yup.object().shape({
  shift: Yup
    .object()
    // .required("Shift is required")
    .nullable(), // because `Select` returns `null` initially

  start_date: Yup
    .date()
    .required("Start date is required")
    .typeError("Start date is required"),

  end_date: Yup
    .date()
    .required("End date is required")
    .typeError("End date is required")
    .min(
      Yup.ref("start_date"),
      "End date cannot be before start date"
    ),
});

export const RosterEditSchema = Yup.object().shape({
  shift: Yup
    .object()
    // .required("Shift is required")
    .nullable(), // because `Select` returns `null` initially
});
