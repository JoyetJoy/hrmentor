import * as Yup from "yup";

export const LeaveSchema = Yup.object().shape({
  employee_name: Yup.object().required("Employee is required"),
  leaveType: Yup.object().required("Leave type is required"),
  reason: Yup.string().required("Reason is required"),
  from_date: Yup.string().required("Start date is required"),
  to_date: Yup.string().required("End date is required"),

  leave_period: Yup.array()
    .of(
      Yup.object().shape({
        date: Yup.string().required(),

        // ✅ must match form field name
        is_day_off: Yup.boolean().default(false),

        shift_id: Yup.mixed().when("is_day_off", {
          is: false,
          then: (schema) =>
            schema.required("Shift is required"),
          otherwise: (schema) => schema.nullable(),
        }),

        leave_schedule: Yup.string().when("is_day_off", {
          is: false,
          then: (schema) =>
            schema.required("Schedule is required"),
          otherwise: (schema) => schema.nullable(),
        }),

        leave_schedule_section: Yup.string().when(
          ["is_day_off", "leave_schedule"],
          {
            is: (is_day_off, leave_schedule) =>
              !is_day_off && leave_schedule === "half_day",
            then: (schema) =>
              schema.required("Schedule Section is required"),
            otherwise: (schema) => schema.nullable(),
          },
        ),
      }),
    )
    .min(1, "At least one leave date is required"),
});
