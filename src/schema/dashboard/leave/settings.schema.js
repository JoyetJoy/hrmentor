import * as Yup from "yup";

export const SettingsLeaveSchema = Yup.object().shape({
  accrualType: Yup.string().required("Accrual Type is required"),

  applicable: Yup.string()
    .required("All Employee Type is required")
    .oneOf(["all_employee", "based_on_exp"], "Invalid selection"),

  emp_no_days: Yup.string()
    .nullable()
    .when("applicable", (applicable, schema) => {
      return applicable === "all_employee"
        ? schema.required("Number of days is required for 'By Cycle'")
        : schema.notRequired();
    }),

  CarryForward_isOn: Yup.boolean(),
  mx_no_days: Yup.number().when("CarryForward_isOn", {
    is: true,
    then: (schema) =>
      schema
        .required("Max number of days is required")
        .min(1, "Max number of days must be at least 1"),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
  CarryForwardExpire_isOn: Yup.boolean(),
  exp_days: Yup.number().when("CarryForwardExpire_isOn", {
    is: true,
    then: (schema) =>
      schema
        .required("Expiry days for unused carry forwarded is required")
        .min(1, "Max number of days must be at least 1"), // Optional: Ensure value is >= 1
    otherwise: (schema) => schema.notRequired().nullable(), // No validation required if `isOn` is false
  }),
  Encashments_isOn: Yup.boolean(),
  specific_no_days: Yup.string()
    .nullable()
    .when("Encashments_isOn", {
      is: true,
      then: (schema) => schema.oneOf(["0", "1"], "Invalid selection"),
      otherwise: (schema) => schema.notRequired(),
    }),
  no_of_days: Yup.number().when("Encashments_isOn", {
    is: true,
    then: (schema) =>
      schema
        .required("Number of days is required")
        .min(1, "Max number of days must be at least 1"), // Optional: Ensure value is >= 1
    otherwise: (schema) => schema.notRequired(), // No validation required if `isOn` is false
  }),

  based_on_exp: Yup.string()
    .nullable()
    .when("applicable", (applicable, schema) => {
      return applicable === "based_on_exp"
        ? schema.required("Experience is required for 'By Working'")
        : schema.notRequired();
    }),
  leave_name: Yup.string().required("Name of the leave is required"),
  display_name: Yup.string().required("Display name is required"),
  code: Yup.string()
    .required("Code is required")
    .matches(
      /^[A-Za-z0-9_-]+$/,
      "Code must be alphanumeric and can include dashes or underscores",
    ),
  pay_type: Yup.string().required("Type is required"),
  description: Yup.string()
    .max(200, "Description cannot exceed 200 characters")
    .required("Description is required"),
  valid_from: Yup.date()
    .required("Valid from date is required")
    .typeError("Invalid date format"),
  status: Yup.string().required("Status is required"),

  accural_period: Yup.object()
    .shape({
      value: Yup.string().required("Accrual period is required"),
      label: Yup.string().required(),
    })
    .test(
      "accrual-period-test",
      "Accrual period is required",
      function (value) {
        const { accrualType } = this.parent;
        console.log(accrualType, value);

        if (
          (accrualType === "bycycle" || accrualType === "byworking") &&
          !value?.value // Checking value inside the object
        ) {
          return false;
        }
        return true;
      },
    ),
  // accural_day: Yup.object()
  // .shape({
  //   value: Yup.string().required("Accrual day is required"),
  //   label: Yup.string().required(),
  // })
  // .test(
  //   "accrual-day-test",
  //   "Accrual day is required",
  //   function (value) {
  //     const { accrualType } = this.parent;
  //     console.log("Accrual Type:", accrualType, "Selected Day:", value);

  //     if (accrualType === "bycycle" && !value?.value) {
  //       return false;
  //     }
  //     return true;
  //   }
  // ),

  accural_day: Yup.object().test(
    "accrual-day-test",
    "Accrual day is required",
    function (value) {
      const { accrualType } = this.parent;
      console.log("Accrual Type:", accrualType, "Selected Day:", value);

      if (accrualType === "bycycle" && !value?.value) {
        return false;
      }
      return true;
    },
  ),
  accural_monthly: Yup.object().test(
    "accrual-monthly-test",
    "Accrual monthly is required",
    function (value) {
      const { accrualType } = this.parent;
      console.log("Accrual Type:", accrualType, "Selected Month:", value);

      if (accrualType === "bycycle" && !value?.value) {
        return false;
      }
      return true;
    },
  ),
  accrual_leave: Yup.string().test(
    "accrual-leave-test",
    "Accrual leave is required",
    function (value) {
      const { accrualType } = this.parent;
      if (accrualType === "byworking" && !value) {
        return false;
      }
      return true;
    },
  ),

  // accural_monthly: Yup.object()
  //   .shape({
  //     value: Yup.string().required("Accrual monthly is required"),
  //     label: Yup.string().required(),
  //   })
  //   .test(
  //     "accrual-monthly-test",
  //     "Accrual monthly is required",
  //     function (value) {
  //       const { accrualType } = this.parent;
  //       console.log("Accrual Type:", accrualType, "Selected Month:", value);

  //       if (accrualType === "bycycle" && !value?.value) {
  //         return false;
  //       }
  //       return true;
  //     }
  //   ),
  accural_monthly: Yup.object().test(
    "accrual-monthly-test",
    "Accrual monthly is required",
    function (value) {
      const { accrualType } = this.parent;
      if (accrualType === "bycycle" && !value) {
        return false;
      }
      return true;
    },
  ),
  accrual_leave: Yup.string().test(
    "accrual-leave-test",
    "Accrual leave is required",
    function (value) {
      const { accrualType } = this.parent;
      if (accrualType === "byworking" && !value) {
        return false;
      }
      return true;
    },
  ),
  // accural_at: Yup.string().test(
  //   "accrual-at-test",
  //   "Accrual at is required",
  //   function (value) {
  //     const { accrualType } = this.parent;
  //     if (accrualType === "byworking" && !value) {
  //       return false;
  //     }
  //     return true;
  //   },
  // ),
  accural_at: Yup.mixed().test(
    "accrual-at-test",
    "Accrual at is required",
    function (value) {
      const { accrualType } = this.parent;

      // If accrualType is "byworking", check for a valid value
      if (accrualType === "byworking") {
        if (!value || (typeof value === "object" && !value.value)) {
          return false;
        }
      }
      return true;
    },
  ),

  specific_days: Yup.string().test(
    "specific-days-test",
    "Specific days are required",
    function (value) {
      const { accrualType } = this.parent;
      if (accrualType === "byworking" && !value) {
        return false;
      }
      return true;
    },
  ),

  emp_no_days: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? NaN : Number(originalValue),
    )
    .typeError("Number of days must be a valid number")
    .when("applicable", {
      is: "bycycle",
      then: (schema) =>
        schema
          .required("Number of days is required for 'By Cycle'")
          .min(1, "Number of days must be greater than 0"), // Changed from `.positive()`
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  experience: Yup.array()
    .of(
      Yup.object().shape({
        year: Yup.number()
          .transform((value) => (value === "" ? NaN : Number(value)))
          .required("Year is required")
          .min(0, "Year cannot be negative"),

        month: Yup.number()
          .transform((value) => (value === "" ? NaN : Number(value)))
          .required("Month is required")
          .min(0, "Month cannot be negative")
          .max(11, "Month should be between 0-11"),

        daysLeave: Yup.number()
          .transform((value) => (value === "" ? NaN : Number(value)))
          .required("Days are required")
          .min(0, "Days cannot be negative")
          .max(31, "Days should be between 0-31")
          .when(["year", "month"], {
            is: (year, month) => year === 0 && month === 0,
            then: (schema) =>
              schema.max(0, "Days leave cannot be given if experience is 0"),
          }),
      }),
    )
    .when("applicable", {
      is: "based_on_exp",
      then: (schema) =>
        schema
          .min(1, "At least one experience section is required")
          .test("at-least-one-valid", "Experience is required", (value) => {
            return value?.some(
              (exp) => exp.year > 0 || exp.month > 0 || exp.daysLeave > 0,
            );
          }),
      otherwise: (schema) => schema.notRequired(),
    }),
});
