import * as Yup from "yup";

export const recruiterApplicationQuestionSchema = Yup.object({
  question: Yup.string().required("Question is required"),
  is_required: Yup.string().required("Is required is required"),
  answer_type: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Answer type is required", function (value) {
    return value?.value && value?.label;
  }),
});

export const recruiterAppQuestionnaireSchema = Yup.object({
  question: Yup.string().required("Question is required"),
  is_required: Yup.string().required("Is required is required"),
});

export const recruiterJobHiringTeamSchema = Yup.object({
  user_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Employee is required", function (value) {
    return value?.value && value?.label;
  }),
  recruiting_role: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Recruiting role is required", function (value) {
    return value?.value && value?.label;
  }),
});
