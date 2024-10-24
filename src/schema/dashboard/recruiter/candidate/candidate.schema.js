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

export const recCandidateCreateInterviewSchema = Yup.object({
  interview_guide_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Interview guide is required", function (value) {
    return value?.value && value?.label;
  }),
  scheduled_date: Yup.string().required("Date is required"),
  interview_time: Yup.string().required("Time is required"),
});

export const recCandidateInterviewPerformanceSchema = Yup.object({
  have_finished: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Finished Status is required", function (value) {
    return value?.value && value?.label;
  }),
  interview_performance_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test(
    "both-required",
    "Interview Performace is required",
    function (value) {
      return value?.value && value?.label;
    },
  ),
  interview_performance_status_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test(
    "both-required",
    "Interview Performace Status is required",
    function (value) {
      return value?.value && value?.label;
    },
  ),
  interview_note: Yup.string().required("Note is required"),
});
