import * as Yup from "yup";

export const empDocumentTypeSchema = Yup.object({
  document_name: Yup.string().required("Document name is required"),
  document_type_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Type is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Type is required"),
  status: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Status is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Status is required"),
  issued_date: Yup.string().required("Issued date is required"),
  expiry_date: Yup.string().required("Expiry date is required"),
  issued_authority: Yup.string().required("Issued authority is required"),
});
