import * as Yup from "yup";

export const ShiftSchema = Yup.object({
    name: Yup.string().required("First name is required"),
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
      }).test("both-required", "Work location is required", function (value) {
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
      fullday:Yup.string().required("Full day  is reqiued"),
      fulltolerence:Yup.string().required("Full day tolerence  is reqiued"),
      halfday:Yup.string().required("Half day is reqiued"),
      halfdaytolerence:Yup.string().required("Half day tolerence  is reqiued"),
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