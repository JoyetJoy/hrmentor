import * as Yup from "yup";

export const empDocumentTypeSchema = Yup.object({
  document_name: Yup.string(),
  document_type_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
    // 
    ,
  status: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  })
    .test("both-required", "Status is required", function (value) {
      return value?.value && value?.label;
    })
    .required("Status is required"),
  issued_date: Yup.string()
  .required("Issued date is required")
  ,
  expiry_date: Yup.string()
    .nullable()
    // .required("Expiry Date is required")
    .test(
      "expiry-after-issued",
      "Expiry date should be after issued date",
      function (expiry_date) {
        const { issued_date } = this.parent;
        if (!expiry_date) return true; // Skip validation if expiry_date is not provided
        return new Date(expiry_date) > new Date(issued_date); // Validate only if expiry_date is provided
      },
    ),
  issued_authority: Yup.string()
  // .required("Issued authority is required"),
});
