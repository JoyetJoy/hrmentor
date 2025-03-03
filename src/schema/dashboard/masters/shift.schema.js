import * as Yup from "yup";

export const ShiftSchema = Yup.object({
  name: Yup.string().required("Shift name is required"),
  start_time: Yup.string().required("Start time is required"),
  end_time: Yup.string().required("End time is required"),
  people_required: Yup.number()
  .typeError("People Required must be a number")
  .required("People Required is required")
  .min(1, "People Required must be at least 1"),

  department_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Department is required", function (value) {
    return value?.value && value?.label;
  }),

  work_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Work area is required", function (value) {
    return value?.value && value?.label;
  }),

  location_id: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }).test("both-required", "Work location is required", function (value) {
    return value?.value && value?.label;
  }),

  calculation_type: Yup.string().required("Calculation type  is reqiued"),
  fullday: Yup.string()
    .nullable()
    .test("check-fullday", "Full day tolerance is required", function (value) {
      const { fulltolerence } = this.parent;
      // Only show error for full day if it is filled and its tolerance is not
      if (value && !fulltolerence) {
        return this.createError({ message: "Full day tolerance is required" });
      }
      return true; // Pass validation if full day is not filled
    }),

  fulltolerence: Yup.string()
    .nullable()
    .when("fullday", {
      is: (fullday) => !!fullday,
      then: (schema) => schema.required("Full day tolerance is required"),
    }),

  halfday: Yup.string()
    .nullable()
    .test("check-halfday", "Half day tolerance is required", function (value) {
      const { halfdaytolerence } = this.parent;
      // Only show error for half day if it is filled and its tolerance is not
      if (value && !halfdaytolerence) {
        return this.createError({ message: "Half day tolerance is required" });
      }
      return true; // Pass validation if half day is not filled
    }),

  halfdaytolerence: Yup.string()
    .nullable()
    .when("halfday", {
      is: (halfday) => !!halfday,
      then: (schema) => schema.required("Half day tolerance is required"),
    }),
  recur_pattern: Yup.string().required("Recurrence pattern  is reqiued"),
  week_def: Yup.string().required("Weekend definition   is reqiued"),
});

export const BreakTimeSchema = Yup.object().shape({
  type_name: Yup.string().required("Name is required"),
  pay_node: Yup.string().required("Pay mode is required"),
  time: Yup.string().nullable(),
  start_time: Yup.string().nullable(),
  end_time: Yup.string()
    .nullable()
    .test(
      "is-valid-end-time",
      "End time must be after start time",
      function (value) {
        const { start_time } = this.parent;
        if (!value && !start_time) {
          return true; // If neither start_time nor end_time is provided, don't validate
        }
        if (start_time && value <= start_time) {
          return false; // Ensure end_time is after start_time
        }
        return true; // Otherwise, it's valid
      },
    ),
});

export const ProfileManagementSchema = Yup.object({
  first_name: Yup.string(),
  email: Yup.string(),
  password: Yup.string(),
  profile_image: Yup.string(),
});

export const LeaveRequestSchema = Yup.object({
  status: Yup.string(),
  reason: Yup.string(),
});
