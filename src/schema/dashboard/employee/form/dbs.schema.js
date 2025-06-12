import * as Yup from "yup";

export const dbsSchema = Yup.object({
  dbs_type: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Type is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Type is required"),
  subscription: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Subscription is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Subscription is required"),
  renewal_date: Yup.string(),
  dbs_number: Yup.string().required("DBS Number is required"),
  issue_date: Yup.string().required("DBS Issue date required"),
  // document: Yup.string(),
  status: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Status is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Status is required"),
});
