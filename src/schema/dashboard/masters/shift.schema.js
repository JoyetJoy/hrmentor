import * as Yup from "yup";

export const ShiftSchema = Yup.object({
  name: Yup.string().required("Shift name is required"),
  start_time: Yup.string()
    .required("Start time is required")
    .test(
      "is-before-end-time",
      "Start time must be before end time",
      function (value) {
        const { end_time } = this.parent;
        return !end_time || value < end_time; // Only return false if end_time exists and start_time is not before it
      },
    ),
  end_time: Yup.string()
    .required("End time is required")
    .test(
      "is-after-start-time",
      "End time must be after start time",
      function (value) {
        const { start_time } = this.parent;
        return !start_time || value > start_time; // Only return false if start_time exists and end_time is not after it
      },
    ),
  people_required: Yup.string().required("People Required  is reqiued"),

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
  time: Yup.string()
    .nullable() // Allow null values but validate if provided
    .test(
      "either-time-or-start-time",
      "Either break time or start time must be provided",
      function (value) {
        const { start_time } = this.parent;
        return value || start_time; // Valid if either time or start_time is filled
      },
    ),
  start_time: Yup.string()
    .nullable()
    .test(
      "is-valid-start-time",
      "Start time must be before end time",
      function (value) {
        const { end_time, time } = this.parent;
        if (!value && !time) {
          return false; // If neither time nor start_time is provided, it's invalid
        }
        if (end_time && value >= end_time) {
          return false; // Ensure start_time is before end_time
        }
        return true; // Otherwise, it's valid
      },
    ),
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
