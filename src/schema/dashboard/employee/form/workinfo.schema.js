import * as Yup from "yup";

export const WorkInfoSchema = (reportNotRequired) => {
  return Yup.object({
    reporting_manager_id: Yup.object({
      id: Yup.string().nullable(),
      value: Yup.string().nullable(),
      label: Yup.string().nullable(),
    })
      .nullable()
      .test("both-required", "Reporting manager is required", function (value) {
        if (!reportNotRequired) {
          return value?.value && value?.label;
        }
        return true;
      }),
    hiring_manager_id: Yup.object({
      id: Yup.string().nullable(),
      value: Yup.string().nullable(),
      label: Yup.string().nullable(),
    })
      .nullable()
      .test("both-required", "Hr Manager is required", function (value) {
        if (!reportNotRequired) {
          return value?.value && value?.label;
        }
        return true;
      }),

    eeo_job_category_id: Yup.object({
      id: Yup.string().nullable(),
      value: Yup.string().nullable(),
      label: Yup.string().nullable(),
    })
      .nullable()
      .test("both-required", "EEO Job category is required", function (value) {
        return value?.value && value?.label;
      }),

    ethinicity_id: Yup.object({
      id: Yup.string().nullable(),
      value: Yup.string().nullable(),
      label: Yup.string().nullable(),
    })
      .nullable()
      .test("both-required", "Ethinicity is required", function (value) {
        return value?.value && value?.label;
      }),

    probation_period: Yup.string().required("Probation Period is required"),
    notice_period: Yup.string().required("Notice Period is required"),
  });
};
