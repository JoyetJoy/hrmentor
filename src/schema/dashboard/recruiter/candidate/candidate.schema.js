import * as Yup from "yup";

export const recCandidateDocumentSchema = Yup.object({
  document_name: Yup.string().required("Document name is required"),
  document_type_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Document type is required", function (value) {
    return value?.value && value?.label;
  }),
});
