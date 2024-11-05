import * as Yup from "yup";

export const ShiftSchema = Yup.object({
    name: Yup.string().required("Shift name is required"),
    start_time: Yup.string()
    .required("Start time is required")
    .test("is-before-end-time", "Start time must be before end time", function(value) {
      const { end_time } = this.parent;
      return !end_time || value < end_time; // Only return false if end_time exists and start_time is not before it
    }),
    end_time: Yup.string()
      .required("End time is required")
      .test("is-after-start-time", "End time must be after start time", function(value) {
        const { start_time } = this.parent;
        return !start_time || value > start_time; // Only return false if start_time exists and end_time is not after it
      }),
    people_required:Yup.string().required("People Required  is reqiued"),

    department_id:Yup.object({
        id:Yup.string(),
        value:Yup.string(),
        label:Yup.string()
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
      
      calculation_type:Yup.string().required("Calculation type  is reqiued"),
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
      recur_pattern:Yup.string().required("Recurrence pattern  is reqiued"),
      week_def:Yup.string().required("Weekend definition   is reqiued"),
    
})
export const BreakTimeSchema = Yup.object().shape({
  type_name: Yup.string().required("Name is required"),
  pay_node: Yup.string().required("Pay mode is required"),
  start_time: Yup.string()
    .required("Start time is required")
    .test("is-before-end-time", "Start time must be before end time", function(value) {
      const { end_time } = this.parent;
      return !end_time || value < end_time; // Only return false if end_time exists and start_time is not before it
    }),
  end_time: Yup.string()
    .required("End time is required")
    .test("is-after-start-time", "End time must be after start time", function(value) {
      const { start_time } = this.parent;
      return !start_time || value > start_time; // Only return false if start_time exists and end_time is not after it
    }),
});