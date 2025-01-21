import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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

const monthOptions = [
  { value: "jan", label: "January" },
  { value: "feb", label: "February" },
  { value: "mar", label: "March" },
  { value: "apr", label: "April" },
  { value: "may", label: "May" },
  { value: "jun", label: "June" },
  { value: "jul", label: "July" },
  { value: "aug", label: "August" },
  { value: "sep", label: "September" },
  { value: "oct", label: "October" },
  { value: "nov", label: "November" },
  { value: "dec", label: "December" },
];

// Validation Schema
const leaveSchema = Yup.object().shape({
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
  status: Yup.string(),
});

const BasicSettings = ({ formtype = "save" }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(leaveSchema),
    defaultValues: {
      pay_type: "paid", // Default value
    },
  });

  const close = () => {
    setPopupOpen(false);
    reset();
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
  const [accrualType, setAccrualType] = useState('bycycle');
  const [applicable, setApplicable] = useState('all_employee');
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

  const getStoredData = () => {
    const storedData = localStorage.getItem("myData");
    return storedData ? JSON.parse(storedData) : null; // Parse only if storedData exists
  };

  const storedData = getStoredData();

  const [searchParams] = useSearchParams();

  // Prefer `searchParams` over `storedData`, with proper fallback
  const id = searchParams.get("id") || storedData?.id || null;

  const [boxes, setBoxes] = useState([
    { id: 1, years: "", months: "", daysleave: "" },
  ]);

  const addBox = () => {
    setBoxes([
      ...boxes,
      { id: boxes.length + 1, years: "", months: "", daysleave: "" },
    ]);
  };

  const removeBox = (id) => {
    setBoxes(boxes.filter((box) => box.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setBoxes(
      boxes.map((box) => (box.id === id ? { ...box, [field]: value } : box)),
    );
  };

  const onSubmit = async (data) => {
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
    enabled: !!user?.id && !!id,
  });

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
      });
      setIsOn(basicholidayDetails?.carry_forword);
      setIsOn2(basicholidayDetails?.carry_expire);
      setIsOn3(basicholidayDetails?.encashments);
      setUnits(basicholidayDetails?.units);
      setAccuralPeriod(basicholidayDetails?.accural_period);
      setAccuralDays(basicholidayDetails?.accural_day);
      setAccuralMonth(basicholidayDetails?.accural_monthly);
      setAccrualType(basicholidayDetails?.accural_type);
      setApplicable(basicholidayDetails?.application_to);
      setAccuralAt(basicholidayDetails?.accural_at);
      setEncashmentsPay(basicholidayDetails?.max_encashments);
    }
  }, [basicholidayDetails, reset]);

  const handledSubmit = async (data) => {
    try {
      setLoader(true);
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
        accural_period: accuralPeriod,
        accural_day: accuralDays,
        accural_monthly: accuralMonth,
        accural_at: accuralAt,
        accrual_leave: data.accrual_leave,
        specific_days: data.specific_days,
        application_to: applicable,
        emp_no_days: data.emp_no_days,
        based_experience_details: boxes,
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

      if (!applicable || !formData.emp_no_days) {
        return toast.error("Please Fill Applicate to");
      }

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
      console.error("Error Details:", error);
      console.error("Error Response Data:", error?.response?.data);

      // Display a specific error message from the server if available
      const errorMessage =
        error?.response?.data?.error || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setLoader(false);
    }
  };

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
                <label className="required label-text">Pay type</label>
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
                  className="input-box"
                />
                {errors.valid_from && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.valid_from.message}
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="group flex flex-col gap-1.5 py-2">
                <label className="label-text">Status</label>
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
              Leave accrual
            </div>
            <div className="group mt-2 flex flex-col gap-3 text-[0.89rem] font-medium">
              <label className="required label-text">Accrual type</label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="accrualStatus"
                    value="bycycle"
                    onClick={() => setAccrualType("bycycle")}
                    className="radio-black"
                    defaultChecked
                    checked={accrualType === "bycycle"}
                  />
                  <label className="label-text">By cycle</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="accrualStatus"
                    value="byworking"
                    onClick={() => setAccrualType("byworking")}
                    className="radio-black"
                    checked={accrualType === "byworking"}
                  />
                  <label className="label-text">By Working days</label>
                </div>
              </div>
            </div>
            {accrualType == "bycycle" && (
              <div className="grid grid-cols-2 gap-3">
                {/* Accrual Period */}
                <div className="group flex flex-col gap-1.5 py-2">
                  <label className="label-text">Accrual period</label>
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
                        placeholder="Select a period"
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setAccuralPeriod(selectedOption.value);
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
                  <label className="label-text">Accrual day(s)</label>
                  <Controller
                    name="accural_day"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          ...Array.from({ length: 28 }, (_, i) => ({
                            value: i + 1 + "st",
                            label: (i + 1).toString() + "st",
                          })),
                          { value: "lastDay", label: "Last day" }, // Adding the "last day" option
                        ]}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setAccuralDays(selectedOption.value);
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

                {/* Accrual Month */}
                <div className="group flex flex-col gap-1.5 py-2">
                  <label className="label-text">Accrual month(s)</label>
                  <Controller
                    name="accural_monthly"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={monthOptions.find(
                          (option) => option.value === field.value,
                        )}
                        options={monthOptions}
                        isSearchable
                        placeholder="Select a month"
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption.value); // Update the form value
                          setAccuralMonth(selectedOption.value); // Update local state with selected month
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
              </div>
            )}
            {accrualType === "byworking" && (
              <div className="grid grid-cols-2 gap-3">
                {/* Accrual Period */}
                <div className="group flex flex-col gap-1.5 py-2">
                  <label className="label-text">
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
                  <label className="label-text">Accrual period</label>
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
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setAccuralPeriod(selectedOption.value);
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
                  <label className="label-text">Accrual at</label>
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
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setAccuralAt(selectedOption.value);
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
                  <label className="required label-text">Specific days </label>
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
              <label className="required label-text">Applicable to </label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="application_to"
                    value="all_employee"
                    onClick={() => setApplicable("all_employee")}
                    className="radio-black"
                    checked={applicable === "all_employee"}
                  />
                  <label className="label-text">All employees</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="application_to"
                    value="based_on_exp"
                    onClick={() => setApplicable("based_on_exp")}
                    className="radio-black"
                    checked={applicable === "based_on_exp"}
                  />
                  <label className="label-text">Based on experience</label>
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
                    min={0}
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
                  {boxes.map((box, index) => (
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
                          id={`years-${box.id}`}
                          value={box.years}
                          onChange={(e) =>
                            handleInputChange(box.id, "years", e.target.value)
                          }
                          className="input-box h-10 rounded-md border"
                        />
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
                          id={`months-${box.id}`}
                          value={box.months}
                          onChange={(e) =>
                            handleInputChange(box.id, "months", e.target.value)
                          }
                          className="input-box h-10 rounded-md border"
                        />
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
                          min={0}
                          id={`days-${box.id}`}
                          value={box.daysleave}
                          onChange={(e) =>
                            handleInputChange(
                              box.id,
                              "daysleave",
                              e.target.value,
                            )
                          }
                          className="input-box h-10 rounded-md border"
                        />
                      </div>
                      <div
                        className={`flex w-1/12 items-center justify-center space-x-2 ${index > 0 ? "w-[5rem]" : "w-1/12"}`}
                      >
                        {index > 0 && (
                          <div
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black text-white"
                            onClick={() => removeBox(box.id)}
                          >
                            <Minus className="size-5" strokeWidth={2} />
                          </div>
                        )}
                        <div
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-hrmprimaryorange text-white"
                          onClick={addBox}
                        >
                          <Plus className="size-5" strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="group col-span-2 flex flex-col gap-1.5 py-2">
              <div className="flex justify-between">
                <p className="text-[0.9rem] font-bold">Carry Forward</p>
                <div
                  onClick={() => {
                    if (isOn) {
                      setIsOn(false);
                    } else {
                      setIsOn(true);
                    }
                  }}
                  className={`h-5 w-10 rounded-full p-[1px] ${isOn ? "bg-[#8be691] pt-[2.1px]" : "border border-[#888888] bg-white pt-[1.5px]"}`}
                >
                  <div
                    className={`h-4 w-4 ${isOn ? "bg-[#00b448]" : "bg-black"} transform rounded-full transition-transform ${
                      isOn ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
              <p className="label-text">
                Number of unused leaves of an employee can be carry forwarded
              </p>
            </div>
            {isOn && (
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
                      name="max_no_days"
                      {...register("max_no_days")}
                    />
                    {errors.max_no_days && (
                      <span className="text-xs text-red-500">
                        {errors.max_no_days.message}
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
                        if (isOn2) {
                          setIsOn2(false);
                        } else {
                          setIsOn2(true);
                        }
                      }}
                      className={`h-[1.30rem] w-10 rounded-full p-[1px] ${isOn2 ? "bg-[#8be691] pt-[2px]" : "border border-[#888888] bg-white pt-[0.5px]"}`}
                    >
                      <div
                        className={`h-4 w-4 ${isOn2 ? "bg-[#00b448]" : "bg-black"} transform rounded-full transition-transform ${
                          isOn2 ? "translate-x-5" : "translate-x-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
                {isOn2 && (
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
                            {errors.exp_days.message}
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
                    if (isOn3) {
                      setIsOn3(false);
                    } else {
                      setIsOn3(true);
                    }
                  }}
                  className={`h-[1.30rem] w-10 rounded-full p-[1px] ${isOn3 ? "bg-[#8be691] pt-[2.5px]" : "border border-[#888888] bg-white pt-[1px]"}`}
                >
                  <div
                    className={`h-4 w-4 ${isOn3 ? "bg-[#00b448]" : "bg-black"} transform rounded-full transition-transform ${
                      isOn3 ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
              <p className="label-text">
                Number of unused leaves of an employee can be encashed
              </p>
            </div>
            {isOn3 && (
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
                      name="max_encashments" // Assuming "status" is the field you're using here
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={
                            encashmentsPay === `0`
                              ? {
                                  value: `0`,
                                  label: `All the remaining ${units}`,
                                }
                              : {
                                  value: `1`,
                                  label: `Specific number of ${units}`,
                                }
                          }
                          isSearchable
                          options={[
                            {
                              value: `0`,
                              label: `All the remaining ${units}`, // Correct plural/singular form
                            },
                            {
                              value: `1`,
                              label: `Specific number of ${units}`, // Correct plural/singular form
                            },
                          ]}
                          placeholder={`Select a ${units}`} // Using the plural form correctly
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption.value); // Update react-hook-form field value
                            setEncashmentsPay(selectedOption.value); // Update local state
                          }}
                          className="input-box w-full"
                        />
                      )}
                    />
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
                        {errors.no_of_days.message}
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
