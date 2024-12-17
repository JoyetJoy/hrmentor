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

    gender: Yup.object({
      id: Yup.string().nullable(),
      value: Yup.string().nullable(),
      label: Yup.string().nullable(),
    })
      .nullable()
      .test("both-required", "Gender is required", function (value) {
        return value?.value && value?.label;
      }),

    maritalstatus: Yup.object({
      id: Yup.string().nullable(),
      value: Yup.string().nullable(),
      label: Yup.string().nullable(),
    })
      .nullable()
      .test("both-required", "Marital Status is required", function (value) {
        return value?.value && value?.label;
      }),

    physical: Yup.object({
      id: Yup.string().nullable(),
      value: Yup.string().nullable(),
      label: Yup.string().nullable(),
    })
      .nullable()
      .test(
        "both-required",
        "Physical / Mental disability is required",
        function (value) {
          return value?.value && value?.label;
        },
      ),
    relegion_belief_id: Yup.object({
      id: Yup.string().nullable(),
      value: Yup.string().nullable(),
      label: Yup.string().nullable(),
    })
      .nullable()
      .test("both-required", "Relegion Belief is required", function (value) {
        return value?.value && value?.label;
      }),
    sexual_orientation_id: Yup.object({
      id: Yup.string().nullable(),
      value: Yup.string().nullable(),
      label: Yup.string().nullable(),
    })
      .nullable()
      .test(
        "both-required",
        "Sexual orientation is required",
        function (value) {
          return value?.value && value?.label;
        },
      ),

    age: Yup.string().required("Age is required"),
    religious: Yup.string().required("Pregnancy & maternity is required"),
    pregnancy: Yup.object({
      id: Yup.string().nullable(),
      value: Yup.string().nullable(),
      label: Yup.string().nullable(),
    })
  });
};
