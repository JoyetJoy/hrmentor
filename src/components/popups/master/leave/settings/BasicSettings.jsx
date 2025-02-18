import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as Yup from "yup";
import { Plus, Minus } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import moment from "moment";
import { newRequest, HOLIDAY_STATUS } from "@/api";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserStore } from "@/lib/slices/auth.slice";

const statusOptions = [
  { value: 3, label: "Active" },
  { value: 4, label: "Inactive" },
];

const accrualPeriodOptions = [
  { value: "annual", label: "Annual" },
  { value: "monthly", label: "Monthly" },
];

const monthDaysMap = {
  January: 31,
  February: 28, // Leap year logic can be added if required
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

// Validation Schema

const leaveSchema = Yup.object().shape({
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
      then: (schema) =>
        schema
          .required("Specific number of days is required")
          .oneOf(["0", "1"], "Invalid selection"),
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
const BasicSettings = ({ formtype = "save" }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
    watch,
    setError,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(leaveSchema),
    defaultValues: {
      pay_type: "paid", // Default value
      experience: [{ year: 0, month: 0, daysLeave: 0 }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });
  const close = () => {
    setPopupOpen(false);
    reset();
  };
  const {
    applicable,
    CarryForward_isOn,
    CarryForwardExpire_isOn,
    Encashments_isOn,
  } = watch();

  console.log(CarryForward_isOn);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
  const [accrualType, setAccrualType] = useState("bycycle");
  const [applicableTo, setApplicableTo] = useState("all_employee");
  const [isOn, setIsOn] = useState(false);
  const [isOn2, setIsOn2] = useState(false);
  const [isOn3, setIsOn3] = useState(false);
  const [units, setUnits] = useState("days");
  const [status, setStatus] = useState("");
  const [accuralPeriod, setAccuralPeriod] = useState("");
  const [accuralDays, setAccuralDays] = useState("");
  const [accuralMonth, setAccuralMonth] = useState("");
  const [accuralAt, setAccuralAt] = useState("");
  const [encashmentsPay, setEncashmentsPay] = useState("");
  const { user } = useUserStore((state) => ({ user: state.user }));
  const selectedMonthValue = watch("accural_monthly")?.value;
  console.log(selectedMonthValue);
  const [dayOptions, setDayOptions] = useState([]);

  const daysInMonth = selectedMonthValue
    ? monthDaysMap[selectedMonthValue]
    : 31;

  const getStoredData = () => {
    const storedData = localStorage.getItem("myData");
    return storedData ? JSON.parse(storedData) : null; // Parse only if storedData exists
  };

  const storedData = getStoredData();

  const [searchParams] = useSearchParams();

  // Prefer `searchParams` over `storedData`, with proper fallback
  const id = searchParams.get("id") || storedData?.id || null;

  const [boxes, setBoxes] = useState([
    { id: 1, years: "", months: "", daysleave: "" }, // First row by default
  ]);

  const addBox = () => {
    append({ year: "", month: "", daysLeave: "" });
  };

  console.log(boxes);
  const removeBox = (id) => {
    setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === id ? { ...box, [field]: value } : box,
      ),
    );
  };

  const onSubmit = async (data) => {
    if (applicable === "based_on_exp") {
      const allZero = data.experience.every(
        (exp) => exp.year === 0 && exp.month === 0 && exp.daysLeave === 0,
      );

      if (allZero) {
        setError("experience", {
          type: "manual",
          message: "At least one field must have a non-zero value.",
        });
        return;
      }
    }

    handledSubmit(data);
  };

  const { data: basicholidayDetails } = useQuery({
    queryKey: ["basicholidayDetails", user?.id, id],
    queryFn: () =>
      newRequest
        .get(`${HOLIDAY_STATUS}/${id}`, {
          params: { user_id: user?.id },
        })
        .then((res) => res.data),
    enabled: !!id,
  });
  console.log(accrualType, applicable);

  useEffect(() => {
    if (basicholidayDetails) {
      reset({
        leave_name: basicholidayDetails?.leave_name,
        display_name: basicholidayDetails?.display_name,
        code: basicholidayDetails?.code,
        pay_type: basicholidayDetails?.pay_type,
        description: basicholidayDetails?.description,
        status: basicholidayDetails?.status?.status_name == "Active" ? 3 : 4,
        valid_from: moment(basicholidayDetails?.valid_from).format(
          "YYYY-MM-DD",
        ),
        accrual_leave: basicholidayDetails?.accrual_leave,
        specific_days: basicholidayDetails?.specific_days,
        emp_no_days: basicholidayDetails?.emp_no_days,
        max_no_days: basicholidayDetails?.max_no_days,
        exp_days: basicholidayDetails?.exp_days,
        encashments_pay: "basicpay",
        no_of_days: basicholidayDetails?.no_of_days,
        accural_period: {
          value: basicholidayDetails?.accural_period,
          label:
            basicholidayDetails?.accural_period?.charAt(0).toUpperCase() +
            basicholidayDetails?.accural_period?.slice(1),
        },
        // accural_day: basicholidayDetails?.accural_day,
        accural_day: {
          value: basicholidayDetails?.accural_day,
          label: basicholidayDetails?.accural_day,
        },
        accural_monthly: {
          value: basicholidayDetails?.accural_monthly,
          label: basicholidayDetails?.accural_monthly,
        },
        accural_at: {
          value: basicholidayDetails?.accural_at,
          label: basicholidayDetails?.accural_at,
        },
      });
      setIsOn(basicholidayDetails?.carry_forword);
      setIsOn2(basicholidayDetails?.carry_expire);
      setIsOn3(basicholidayDetails?.encashments);
      setUnits(basicholidayDetails?.units);
      if (basicholidayDetails?.accural_period) {
        setAccuralPeriod([
          {
            value: basicholidayDetails.accural_period,
            label:
              basicholidayDetails.accural_period.charAt(0).toUpperCase() +
              basicholidayDetails.accural_period.slice(1),
          },
        ]);
      }
      if (basicholidayDetails?.accural_day) {
        setAccuralDays([
          {
            value: basicholidayDetails.accural_day,
            label: basicholidayDetails.accural_day,
          },
        ]);
      }
      if (basicholidayDetails?.accural_monthly) {
        setAccuralMonth([
          {
            value: basicholidayDetails.accural_monthly,
            label: basicholidayDetails.accural_monthly,
          },
        ]);
      }
      setAccrualType(basicholidayDetails?.accural_type);
      // setApplicable(basicholidayDetails?.application_to);
      setAccuralAt(basicholidayDetails?.accural_at);
      setEncashmentsPay(basicholidayDetails?.max_encashments);
    }
  }, [basicholidayDetails, reset]);

  const handledSubmit = async (data) => {
    try {
      setLoader(true);
      console.log(data);

      const formData = {
        leave_name: data.leave_name,
        display_name: data.display_name,
        code: data.code,
        pay_type: data.pay_type,
        description: data.description,
        units: units,
        status: data.status,
        valid_from: moment(data.valid_from).format("YYYY-MM-DD"),
        accural_type: accrualType,
        accural_period: data?.accural_period?.value,
        accural_day: data?.accural_day?.value,
        accural_monthly: data?.accural_monthly?.value,
        accural_at: data?.accural_at?.value,
        accrual_leave: data.accrual_leave,
        specific_days: data.specific_days,
        application_to: applicable,
        emp_no_days: data.emp_no_days,
        based_experience_details: data.experience,
        carry_forword: isOn ?? 0,
        max_no_days: data.max_no_days ?? 0,
        carry_expire: isOn2 ?? 0,
        exp_days: data.exp_days ?? 0,
        encashments: isOn3 ?? 0,
        encashments_pay: "basicpay",
        max_encashments: Number(encashmentsPay) ?? 0,
        no_of_days: data.no_of_days ?? 0,
      };

      let res;

      if (id) {
        res = await newRequest.post(`${HOLIDAY_STATUS}/${id}`, formData);
      } else {
        res = await newRequest.post(HOLIDAY_STATUS, formData);
      }

      if (res.data.message == "Holiday basic settings updated successfully!") {
        navigate(`/admin/leave/settings/availabilitysettings/${id}`);
      }

      if (res.data.success === true) {
        navigate(
          `/admin/leave/settings/availabilitysettings/${res.data.data.id}`,
        );
      }
    } catch (error) {
      console.log(error);

      console.error("Error Details:", error);
      console.error("Error Response Data:", error?.response?.data);

      // Display a specific error message from the server if available
      const errorMessage =
        error?.response?.data?.error || "An unexpected error occurred";
      // toast.error(errorMessage);
    } finally {
      setLoader(false);
    }
  };

  const getOrdinalSuffix = (num) => {
    console.log(num);

    if (num >= 11 && num <= 13) return num + "th"; // Handle 11th, 12th, 13th
    const lastDigit = num % 10;
    switch (lastDigit) {
      case 1:
        return num + "st";
      case 2:
        return num + "nd";
      case 3:
        return num + "rd";
      default:
        return num + "th";
    }
  };
  console.log(daysInMonth);

  useEffect(() => {
    console.log("Days in selected month:", daysInMonth);

    const newDayOptions = [
      ...Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        return {
          value: getOrdinalSuffix(day),
          label: getOrdinalSuffix(day),
        };
      }),
      { value: "lastDay", label: "Last day" }, // Ensure "Last day" option remains
    ];

    console.log("Updated Day Options:", newDayOptions);
    setDayOptions(newDayOptions);
  }, [selectedMonthValue]);

  // List of month options for dropdown
  const monthOptions = Object.keys(monthDaysMap).map((month) => ({
    value: month,
    label: month,
  }));
  return (
    <div className="min-h-[570px] w-full rounded-md bg-white px-5 py-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5">
        <div className="flex w-full flex-row items-center justify-between">
          <h1 className="text-lg font-bold">Basic Settings</h1>
        </div>
        <div className="mt-4 grid gap-x-3 lg:grid-cols-4">
          <div className="mt-4 flex w-full flex-col gap-1 lg:col-span-3">
            <div className="flex w-full gap-3">
              {/* Name of the Leave */}
              <div className="flex w-[50%] flex-col gap-1.5 py-2">
                <label className="required label-text">Name of the Leave</label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="Enter Name of the Leave"
                  {...register("leave_name")}
                  className="input-box"
                />
                {errors.leave_name && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.leave_name.message}
                  </span>
                )}
              </div>
              {/* Display Name */}
              <div className="group col-span-2 flex w-[50%] flex-col gap-1.5 py-2">
                <label className="required label-text">Display Name</label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="Enter Display Name"
                  {...register("display_name")}
                  className="input-box"
                />
                {errors.display_name && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.display_name.message}
                  </span>
                )}
              </div>
            </div>
            {/* Code */}
            <div className="group col-span-2 flex w-full flex-col gap-1.5 py-2 lg:w-[49%]">
              <label className="required label-text">Code</label>
              <input
                autoComplete="off"
                type="text"
                placeholder="Enter Code"
                {...register("code")}
                className="input-box"
              />
              {errors.code && (
                <span className="text-xs font-medium text-red-500">
                  {errors.code.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2">
              <div className="group mt-2 flex flex-col gap-1.5 text-[0.85rem] font-medium">
                <label className="required label-text">Pay Type</label>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pay_type"
                      value="paid"
                      defaultChecked
                      {...register("pay_type")}
                      className="radio-black"
                    />
                    <label className="text-sm font-normal">Paid</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pay_type"
                      value="unpaid"
                      {...register("pay_type")}
                      className="radio-black"
                    />
                    <label className="text-sm font-normal">Unpaid</label>
                  </div>
                </div>
                {errors.pay_type && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.pay_type.message}
                  </span>
                )}
              </div>
              <div className="group mt-2 flex flex-col gap-1.5 text-[0.85rem] font-medium">
                <label className="required label-text">Units</label>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="units"
                      value={"days"}
                      onClick={() => setUnits("days")}
                      className="radio-black"
                      checked={units == "days"}
                    />
                    <label className="text-sm font-normal">Days</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="units"
                      value="hours"
                      onClick={() => setUnits("hours")}
                      className="radio-black"
                      checked={units === "hours"}
                    />
                    <label className="text-sm font-normal">Hours</label>
                  </div>
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="group col-span-2 flex flex-col gap-1.5 py-2">
              <label className="required label-text">Description</label>
              <textarea
                autoComplete="off"
                placeholder="Enter Description"
                {...register("description")}
                className="input-box h-20 p-2"
              ></textarea>
              {errors.description && (
                <span className="text-xs font-medium text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* Valid From */}
              <div className="group flex flex-col gap-1.5 py-2">
                <label className="required label-text">Valid From</label>
                <input
                  autoComplete="off"
                  type="date"
                  {...register("valid_from")}
                  className="input-box pr-2  sm:placeholder:text-gray-500"
                  placeholder="DD-MM-YY"
                />
                {errors.valid_from && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.valid_from.message}
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="group flex flex-col gap-1.5 py-2">
                <label className="required label-text">Status</label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={statusOptions.find(
                        (option) => option.value === field.value,
                      )}
                      options={statusOptions}
                      isSearchable
                      placeholder="Select a status"
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption.value); // Update field value
                      }}
                      className="input-box w-full"
                    />
                  )}
                />
                {errors.status && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.status.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-3 text-[0.9rem] font-semibold">
              Leave Accrual
            </div>
            <div className="group mt-2 flex flex-col gap-3 text-[0.89rem] font-medium">
              <label className="required label-text">Accrual Type</label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="accrualStatus"
                    {...register("accrualType")}
                    value="bycycle"
                    onClick={() => setAccrualType("bycycle")}
                    className="radio-black"
                    defaultChecked
                    checked={accrualType === "bycycle"}
                  />
                  <label className="label-text">By Cycle</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="accrualStatus"
                    value="byworking"
                    {...register("accrualType")}
                    onClick={() => setAccrualType("byworking")}
                    className="radio-black"
                    checked={accrualType === "byworking"}
                  />
                  <label className="label-text">By Working Days</label>
                </div>
              </div>
            </div>
            {accrualType == "bycycle" && (
              <div className="grid grid-cols-2 gap-3">
                {/* Accrual Period */}
                <div className="group flex flex-col gap-1.5 py-2">
                  <label className="required label-text">Accrual Period</label>
                  <Controller
                    name="accural_period"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable
                        options={[
                          { value: "annually", label: "Annually" },
                          { value: "monthly", label: "Monthly" },
                        ]}
                        value={accuralPeriod}
                        placeholder="Select a period"
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setAccuralPeriod([selectedOption]);
                        }}
                        className="input-box w-full"
                      />
                    )}
                  />
                  {errors.accural_period && (
                    <span className="text-xs text-red-500">
                      {errors.accural_period.message}
                    </span>
                  )}
                </div>
                {/* Accrual Month */}
                <div className="group flex flex-col gap-1.5 py-2">
                  <label className="label-text">Accrual Month(s)</label>
                  <Controller
                    name="accural_monthly"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        // value={monthOptions?.find((option)=>option.value == field.value)}
                        options={monthOptions}
                        isSearchable
                        placeholder="Select a month"
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption); // Update form value
                          setAccuralMonth(selectedOption); // Store in state
                        }}
                        className="input-box w-full"
                      />
                    )}
                  />
                  {errors.accural_monthly && (
                    <span className="text-xs text-red-500">
                      {errors.accural_monthly.message}
                    </span>
                  )}
                </div>
                {/* Accrual Days */}
                <div className="group flex flex-col gap-1.5 py-2">
                  <label className="label-text">Accrual Day(s)</label>
                  <Controller
                    name="accural_day"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={dayOptions} // Updated dynamically based on month
                        placeholder="Select a day"
                        value={accuralDays}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setAccuralDays(selectedOption);
                        }}
                        className="input-box w-full"
                      />
                    )}
                  />
                  {errors.accural_day && (
                    <span className="text-xs text-red-500">
                      {errors.accural_day.message}
                    </span>
                  )}
                </div>
              </div>
            )}
            {accrualType === "byworking" && (
              <div className="grid grid-cols-2 gap-3">
                {/* Accrual Period */}
                <div className="group flex flex-col gap-1.5 py-2">
                  <label className="required label-text">
                    Number of working days to accrual leave
                  </label>
                  <input
                    autoComplete="off"
                    type="number"
                    placeholder="Enter number of working days"
                    {...register("accrual_leave")}
                    className="input-box"
                  />
                  {errors.accrual_leave && (
                    <span className="text-xs text-red-500">
                      {errors.accrual_leave.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 py-2">
                  <label className="required label-text">Accrual Period</label>
                  <Controller
                    name="accural_period"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable
                        options={[
                          { value: "annually", label: "Annually" },
                          { value: "monthly", label: "Monthly" },
                        ]}
                        placeholder="Select accrual period"
                        value={accuralPeriod}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setAccuralPeriod(selectedOption);
                        }}
                        className="input-box w-full"
                      />
                    )}
                  />
                  {errors.accural_period && (
                    <span className="text-xs text-red-500">
                      {errors.accural_period.message}
                    </span>
                  )}
                </div>
                {/* Accrual Days */}
                <div className="group flex flex-col gap-1.5 py-2">
                  <label className="required label-text">Accrual At</label>
                  <Controller
                    name="accural_at"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable
                        options={[
                          { value: "0", label: "As soon as condition met" },
                          { value: "1", label: "End of this accrual period" },
                          {
                            value: "2",
                            label: "After specific number of days",
                          },
                        ]}
                        placeholder="Select accrual at"
                        value={accuralAt}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setAccuralAt(selectedOption);
                        }}
                        className="input-box w-full"
                      />
                    )}
                  />
                  {errors.accural_at && (
                    <span className="text-xs text-red-500">
                      {errors.accural_at.message}
                    </span>
                  )}
                </div>
                {/* Accrual Month */}
                <div className="group flex flex-col gap-1.5 py-2">
                  <label className="required label-text">Specific Days </label>
                  <input
                    autoComplete="off"
                    type="number"
                    min={0}
                    placeholder="Enter specific days"
                    {...register("specific_days")}
                    className="input-box"
                  />{" "}
                  {errors.specific_days && (
                    <span className="text-xs text-red-500">
                      {errors.specific_days.message}
                    </span>
                  )}
                </div>
              </div>
            )}
            <div className="group mt-2 flex flex-col gap-3 text-[0.85rem] font-medium">
              <label className="required label-text">Applicable To </label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="application_to"
                    value="all_employee"
                    {...register("applicable")}
                    // onClick={() => setApplicableTo("all_employee")}
                    className="radio-black"
                    defaultChecked
                    // checked={applicableTo === "all_employee"}
                  />
                  <label className="label-text">All Employees</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="application_to"
                    {...register("applicable")}
                    value="based_on_exp"
                    // onClick={() => setApplicableTo("based_on_exp")}
                    className="radio-black"
                    // checked={applicableTo === "based_on_exp"}
                  />
                  <label className="label-text">Based on Experience</label>
                </div>
              </div>
            </div>
            {applicable === "all_employee" && (
              <div className="grid grid-cols-2">
                <div className="group flex flex-col gap-1.5 py-2">
                  <input
                    autoComplete="off"
                    placeholder={`Number of ${units}`}
                    type="number"
                    min={1}
                    defaultValue={0}
                    className="input-box"
                    name="emp_no_days"
                    {...register("emp_no_days")}
                  />
                  {errors.emp_no_days && (
                    <span className="text-xs text-red-500">
                      {errors.emp_no_days.message}
                    </span>
                  )}
                </div>
              </div>
            )}
            {applicable === "based_on_exp" && (
              <div className="mt-2 flex flex-col gap-4">
                <p className="mt-3 border-l-4 border-hrmprimaryorange bg-[#FFECE7] py-3 pl-3 text-xs font-normal text-gray-darkpale">
                  Please make sure that you have covered values from beginning
                  to end
                </p>
                <div className="w-full">
                  {fields.map((box, index) => (
                    <div
                      key={box.id}
                      className={`mb-4 ${index > 0 ? "px-2 py-5" : "p-5"} flex w-full flex-row justify-around rounded-lg border border-dashed border-black`}
                    >
                      <div className="flex w-1/5 flex-col">
                        <label
                          htmlFor={`years-${box.id}`}
                          className="text-sm font-normal"
                        >
                          Years
                        </label>
                        <input
                          type="number"
                          // id={`years-${box.id}`}
                          defaultValue={0}
                          {...register(`experience.${index}.year`)}
                          // value={box.years}
                          // onChange={(e) =>
                          //   handleInputChange(box.id, "years", e.target.value)
                          // }
                          className="input-box h-10 rounded-md border"
                        />
                        {errors?.experience?.year && (
                          <span className="text-xs font-medium text-red-500">
                            {errors?.experience?.year.message}
                          </span>
                        )}
                      </div>

                      <div className="flex w-1/5 flex-col">
                        <label
                          htmlFor={`months-${box.id}`}
                          className="text-sm font-normal"
                        >
                          Months
                        </label>
                        <input
                          type="number"
                          defaultValue={0}
                          {...register(`experience.${index}.month`)}
                          className="input-box h-10 rounded-md border"
                        />
                        {errors?.experience?.month && (
                          <span className="text-xs font-medium text-red-500">
                            {errors?.experience?.month.message}
                          </span>
                        )}
                      </div>

                      <div className="flex w-1/6 items-center justify-center text-sm font-normal">
                        Will get
                      </div>

                      <div className="flex w-1/5 flex-col">
                        <label
                          htmlFor={`days-${box.id}`}
                          className="text-sm font-normal"
                        >
                          Days of leave
                        </label>
                        <input
                          type="number"
                          defaultValue={0}
                          {...register(`experience.${index}.daysLeave`)}
                          min={0}
                          className="input-box h-10 rounded-md border"
                        />
                        {errors?.experience?.daysLeave && (
                          <span className="text-xs font-medium text-red-500">
                            {errors?.experience?.daysLeave.message}
                          </span>
                        )}
                      </div>
                      <div
                        className={`flex w-1/12 items-center justify-center space-x-2 ${index > 0 ? "w-[5rem]" : "w-1/12"}`}
                      >
                        {index > 0 && (
                          <div
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black text-white"
                            onClick={() => remove(index)}
                          >
                            <Minus className="size-5" strokeWidth={2} />
                          </div>
                        )}
                        <div
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-hrmprimaryorange text-white"
                          onClick={addBox}
                          type="button"
                        >
                          <Plus className="size-5" strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                  ))}
                  {fields.length > 1 && (
                    <p className="label-text mt-2 text-xs text-red-500">
                      Two or more service period should not be same years and
                      month
                    </p>
                  )}
                  {errors.experience && (
                    <span className="text-xs text-red-500">
                      {errors?.experience?.root?.message}
                    </span>
                  )}
                </div>
              </div>
            )}
            <div className="group col-span-2 flex flex-col gap-1.5 py-2">
              <div className="flex justify-between">
                <p className="text-[0.9rem] font-bold">Carry Forward</p>
                <div
                  onClick={() => {
                    setValue("CarryForward_isOn", !CarryForward_isOn); // Updating form field correctly
                  }}
                  className={`h-5 w-10 rounded-full p-[1px] ${
                    CarryForward_isOn
                      ? "bg-[#8be691] pt-[2.1px]"
                      : "border border-[#888888] bg-white pt-[1.5px]"
                  }`}
                >
                  <div
                    className={`h-4 w-4 ${
                      CarryForward_isOn ? "bg-[#00b448]" : "bg-black"
                    } transform rounded-full transition-transform ${
                      CarryForward_isOn ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
              <p className="label-text">
                Number of unused leaves of an employee can be carry forwarded
              </p>
            </div>
            {CarryForward_isOn && (
              <>
                <div className="group mt-2 flex flex-col gap-3 text-[0.85rem] font-medium">
                  <p className="text-[0.85rem] font-normal">
                    The specified leave count will be automatically carried
                    forward to the next year's leave balance at the end of each
                    year
                  </p>
                  <label className="required label-text">
                    Max no of {units} can be carry forwarded{" "}
                  </label>
                </div>
                <div className="grid grid-cols-2">
                  <div className="group flex flex-col gap-1.5 py-2">
                    <input
                      autoComplete="off"
                      type="number"
                      min={0}
                      className="input-box"
                      name="mx_no_days"
                      defaultValue={0}
                      {...register("mx_no_days")}
                    />
                    {errors.mx_no_days && (
                      <span className="text-xs font-medium text-red-500">
                        {errors ? "Max no of days is required" : null}
                      </span>
                    )}
                  </div>
                </div>
                <div className="group col-span-2 flex flex-col gap-1.5 py-2">
                  <div className="flex justify-between">
                    <p className="text-[0.85rem] font-semibold">
                      Carry forward expires
                    </p>
                    <div
                      onClick={() => {
                        setValue(
                          "CarryForwardExpire_isOn",
                          !CarryForwardExpire_isOn,
                        ); // Updating form field correctly
                      }}
                      className={`h-5 w-10 rounded-full p-[1px] ${
                        CarryForwardExpire_isOn
                          ? "bg-[#8be691] pt-[2.1px]"
                          : "border border-[#888888] bg-white pt-[1.5px]"
                      }`}
                    >
                      <div
                        className={`h-4 w-4 ${
                          CarryForwardExpire_isOn ? "bg-[#00b448]" : "bg-black"
                        } transform rounded-full transition-transform ${
                          CarryForwardExpire_isOn
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
                {CarryForwardExpire_isOn && (
                  <>
                    <div className="group mt-2 flex flex-col gap-3 text-[0.85rem] font-medium">
                      <p className="text-[0.85rem] font-normal">
                        The expiry days for unused carry forwarded leave(s) will
                        be calculated from the beginning of the leave year.
                      </p>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="group flex flex-col gap-1.5 py-2">
                        <input
                          autoComplete="off"
                          type="number"
                          min={0}
                          placeholder="Expires in days"
                          className="input-box"
                          name="exp_days"
                          {...register("exp_days")}
                        />
                        {errors.exp_days && (
                          <span className="text-xs text-red-500">
                            {errors
                              ? "expiry days for unused carry forwarded is required"
                              : null}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            <div className="group col-span-2 flex flex-col gap-1.5 py-2">
              <div className="flex justify-between">
                <p className="text-[0.9rem] font-bold">Encashments</p>

                <div
                  onClick={() => {
                    setValue("Encashments_isOn", !Encashments_isOn); // Updating form field correctly
                  }}
                  className={`h-5 w-10 rounded-full p-[1px] ${
                    Encashments_isOn
                      ? "bg-[#8be691] pt-[2.1px]"
                      : "border border-[#888888] bg-white pt-[1.5px]"
                  }`}
                >
                  <div
                    className={`h-4 w-4 ${
                      Encashments_isOn ? "bg-[#00b448]" : "bg-black"
                    } transform rounded-full transition-transform ${
                      Encashments_isOn ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
              <p className="label-text">
                Number of unused leaves of an employee can be encashed
              </p>
            </div>
            {Encashments_isOn && (
              <div className={`group col-span-2 flex flex-col gap-1.5 py-2`}>
                <div className="flex justify-between">
                  <p className="text-[0.85rem] font-bold">
                    Encashment Basic pay{" "}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className={`group flex flex-col gap-1.5 py-2 ${units === "day" ? "mt-5" : ""}`}
                  >
                    <label className="label-text">
                      Max number of {units} can be encashed
                    </label>
                    <Controller
                      name="specific_no_days" // This should match the schema field
                      control={control}
                      render={({ field }) => {
                        // Define options inside the render function
                        const options = [
                          { value: "0", label: `All the remaining ${units}` },
                          { value: "1", label: `Specific number of ${units}` },
                        ];
                        return (
                          <Select
                            {...field}
                            value={
                              options.find(
                                (option) => option.value === field.value,
                              ) || null
                            } // Ensure correct option is selected
                            options={options} // Pass the options here
                            isSearchable
                            placeholder={`Select a ${units}`}
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption.value); // Updates form value
                              setEncashmentsPay(selectedOption.value); // Updates local state
                            }}
                            className="input-box w-full"
                          />
                        );
                      }}
                    />
                    {errors.specific_no_days && (
                      <span className="text-xs text-red-500">
                        {errors?.specific_no_days?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col gap-1.5 py-2">
                    <label className="label-text">Number of {units}</label>
                    <input
                      autoComplete="off"
                      placeholder="Number of day(s)"
                      type="number"
                      min={0}
                      className="input-box"
                      name="no_of_days"
                      {...register("no_of_days")}
                    />
                    {errors.no_of_days && (
                      <span className="text-xs text-red-500">
                        {errors.no_of_days
                          ? "Number of days is required"
                          : null}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* Buttons Section */}
            <div className="mt-6 flex items-center justify-end gap-4">
              <button
                type="button"
                className="btn flex h-10 min-h-10 min-w-[8rem] items-center border border-gray-400 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn flex h-10 min-h-10 min-w-[8rem] items-center bg-hrmblack text-sm font-medium text-white transition-all duration-500 hover:bg-hrmdarkblue/70"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicSettings;
