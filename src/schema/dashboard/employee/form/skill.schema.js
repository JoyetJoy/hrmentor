import * as Yup from "yup";

export const empSkillSchema = Yup.object({
  type: Yup.object({
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
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
  field_of_study: Yup.string().required("Field of study is required"),
  cgpa_percentage: Yup.string().required("CGPA/Percentage is required"),
  institution: Yup.string().required("Institution name is required"),
});
