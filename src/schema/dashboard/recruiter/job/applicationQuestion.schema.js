import * as Yup from "yup";

export const recruiterApplicationQuestionSchema = Yup.object({
  question: Yup.string().required("Question is required"),
  is_required: Yup.boolean().required("Is required is required"),
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

export const interviewGuidelineSchema = Yup.object().shape({
  interview_type: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Interview type is required", function (value) {
    return value?.value && value?.label;
  }),
  interview_mode: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Interview mode is required", function (value) {
    return value?.value && value?.label;
  }),
  duration_hr: Yup.string().required("Duration in hours is required"),
  duration_minute: Yup.string().required("Duration in minutes is required"),
  candidate_type: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Candidate type is required", function (value) {
    return value?.value && value?.label;
  }),
  interviewer: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  })
});

export const recJobReferSchema = Yup.object().shape({
  Recipient: Yup.array()
    .of(
      Yup.object({
        id: Yup.number().required("Recipient is required"),
        value: Yup.string(),
        label: Yup.string(),
      }),
    )
    .min(1, "At least one role is required")
    .required("Role is required"),
  Subject: Yup.string().required("Subject is required"),
});
