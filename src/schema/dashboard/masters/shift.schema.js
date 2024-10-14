import * as Yup from "yup";

export const ShiftSchema = Yup.object({
    name: Yup.string().required("First name is required"),
    start_time:Yup.string().required("Start time required"),
    end_time:Yup.string().required("End time is required"),
    shift_duration:Yup.string().required("Shift duration is requied"),
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