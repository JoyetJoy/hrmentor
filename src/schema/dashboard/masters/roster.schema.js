import * as Yup from "yup";
export const RosterSchema = Yup.object({
  shift: Yup.object()
    .required("Select one option")
})
