import * as Yup from "yup";
export const RosterSchema = Yup.object({
    start_date: Yup.string()
    .required("Start date is required")
    .test("is-before-end_date", "Start date must be before end date", function(value) {
      const { end_date } = this.parent;
      return !end_date || value < end_date; // Only return false if end_time exists and start_time is not before it
    }),
    end_date: Yup.string()
    .required("End time is required")
    .test("is-after-start_date", "End time must be after start date", function(value) {
      const { start_date } = this.parent;
      return !start_date || value > start_date; // Only return false if start_time exists and end_time is not after it
    }),
    // employees: Yup.object({
    //   unique_id: Yup.string(),
    //   first_name: Yup.string(),
    // })
    // .required("Employee is required")
    // .test("both-required", "Employment type is required", function (value) {
    //   return value?.unique_id && value?.first_name;
    // }),

})
