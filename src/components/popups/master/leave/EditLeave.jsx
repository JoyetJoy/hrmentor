import { newRequest } from "@/api";
import {
  EMPLOYEE_LEAVE_SHIFTS,
  EMPLOYEE_TEAM_LEAVE_TYPE,
  EMPLOYEE_TEAM_LIST,
  LEAVE_REQUEST_LIST,
  LEAVE_REQUEST_UPDATE,
} from "@/api/master";
import { LeaveSchema } from "@/schema/dashboard/leave/LeaveSchema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

export default function EditLeave({ popupOpen, setPopupOpen, id, userId }) {
  const queryClient = useQueryClient();

  const { control, handleSubmit, setValue, reset, watch, register, getValues } =
    useForm({
      resolver: yupResolver(LeaveSchema),
      defaultValues: {
        employee_name: null,
        leaveType: null,
        reason: "",
        from_date: "",
        to_date: "",
        leave_period: [],
      },
    });

  const {
    fields: leavePeriodFields,
    replace,
  } = useFieldArray({
    control,
    name: "leave_period",
  });

  const watchLeavePeriod = watch("leave_period");
  const watchFromDate = watch("from_date");
  const watchToDate = watch("to_date");
  const selectedEmployee = watch("employee_name")?.value;
  const selectedLeaveType = watch("leaveType")?.value;

  // ------------------ Leave Schedules ------------------
  const leaveScheduleOptions = [
    { label: "Half Day", value: "half_day" },
    { label: "Full Day", value: "full_day" },
  ];

  const leaveScheduleSectionOptions = [
    { label: "First Half", value: "first_half" },
    { label: "Second Half", value: "second_half" },
  ];

  // ------------------ Fetch Leave Details ------------------
  const { data: leaveDetails } = useQuery({
    queryKey: ["leaveDetails", userId, id],
    queryFn: async () => {
      const res = await newRequest.get(`${LEAVE_REQUEST_LIST}/${id}`, {
        params: { user_id: userId },
      });
      return res?.data ?? null;
    },
    enabled: !!userId && !!id,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!leaveDetails) return;

    setValue("employee_name", {
      label: leaveDetails.employee.first_name,
      value: leaveDetails.employee.id,
    });

    setValue("leaveType", {
      label: leaveDetails.leave_type,
      value: leaveDetails.leave_type_id,
    });

    setValue("reason", leaveDetails.reason);
    setValue("from_date", leaveDetails.from_date);
    setValue("to_date", leaveDetails.to_date);

    replace(
      leaveDetails.leave_period.map((item) => ({
        date: item.date,
        is_day_off: item.shift_name?.toLowerCase() === "day off",
        shift_id: item.shift_id ?? null,
        leave_schedule: item.leave_schedule ?? null,
        leave_schedule_section: item.leave_schedule_section ?? null,
      })),
    );
  }, [leaveDetails]);

  // ------------------ Employee Team List ------------------
  const { data: employeeTeamList = [] } = useQuery({
    queryKey: ["employeeTeamList"],
    queryFn: () => newRequest.get(EMPLOYEE_TEAM_LIST).then((res) => res.data),
  });

  const employeeOptions = employeeTeamList.map((team) => ({
    label: team.name,
    value: team.id,
  }));

  // ------------------ Employee Leave Type ------------------
  const { data: employeeLeaveType = [] } = useQuery({
    queryKey: ["employeeLeaveType", selectedEmployee],
    queryFn: async () => {
      if (!selectedEmployee) return [];
      const response = await newRequest.get(
        `${EMPLOYEE_TEAM_LEAVE_TYPE}/${selectedEmployee}`,
      );
      return response.data || [];
    },
    enabled: !!selectedEmployee,
  });

  const leaveTypeOptions = employeeLeaveType
    .filter(
      (type) =>
        type.already_taked_leaves < Number(type.leave_types?.emp_no_days),
    )
    .map((type) => ({
      label: type.leave_types.display_name,
      value: type.leave_types.id,
    }));

  // ------------------ Fetch Shifts Based on Date Range ------------------
  const { data: employeeLeaveShifts = [] } = useQuery({
    queryKey: [
      "employeeLeaveShifts",
      selectedEmployee,
      watchFromDate,
      watchToDate,
      selectedLeaveType,
    ],
    queryFn: async () => {
      if (
        !selectedEmployee ||
        !watchFromDate ||
        !watchToDate ||
        !selectedLeaveType
      )
        return [];
      const response = await newRequest.get(EMPLOYEE_LEAVE_SHIFTS, {
        params: {
          employee_id: selectedEmployee,
          from_date: watchFromDate,
          to_date: watchToDate,
        },
      });
      return response.data || [];
    },
    enabled:
      !!selectedEmployee &&
      !!watchFromDate &&
      !!watchToDate &&
      !!selectedLeaveType,
  });

  // ------------------ Map Shifts to Each Date ------------------
  const shiftOptionsMap = {};
  employeeLeaveShifts.forEach((item) => {
    shiftOptionsMap[item.date] = item.data.map((d) => ({
      label: d.name,
      value: d.shift_id,
      id: d.roster_id,
    }));
  });

  // ------------------ Generate Leave Period Array ------------------
  useEffect(() => {
    if (!watchFromDate || !watchToDate) return;

    const start = new Date(watchFromDate);
    const end = new Date(watchToDate);
    const existing = getValues("leave_period") || [];

    const dates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const formatted = d.toISOString().split("T")[0];
      const found = existing.find((i) => i.date === formatted);

      dates.push({
        date: formatted,
        is_day_off: found?.is_day_off || false,
        shift_id: found?.shift_id ?? null,
        leave_schedule: found?.leave_schedule ?? null,
        leave_schedule_section: found?.leave_schedule_section ?? null,
      });
    }

    replace(dates);
  }, [watchFromDate, watchToDate]);

  useEffect(() => {
    leavePeriodFields.forEach((_, index) => {
      const isDayOff = watch(`leave_period.${index}.is_day_off`);

      if (isDayOff) {
        setValue(`leave_period.${index}.shift_id`, null);
        setValue(`leave_period.${index}.leave_schedule`, null);
        setValue(`leave_period.${index}.leave_schedule_section`, null);
      }
    });
  }, [watch("leave_period"), leavePeriodFields.length]);

  // ------------------ Submit ------------------
  const onSubmit = async (values) => {
    try {
      const leave_periods = values.leave_period.map((item) => {
        if (item.dayOff) return { date: item.date };
        return {
          date: item.date,
          shift_id: item.shift_id,
          leave_schedule: item.leave_schedule,
          leave_schedule_section: item.leave_schedule_section || null,
        };
      });

      const payload = {
        leave_status_id: 2,
        descriptions: values.reason,
        leave_periods,
      };

      const res = await newRequest.post(
        `${LEAVE_REQUEST_UPDATE}/${id}`,
        payload,
        {
          params: { user_id: userId },
        },
      );

      toast.success(res?.data?.message);
      queryClient.invalidateQueries(["leaveDetails", userId, id]);
      setPopupOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  };

  const close = () => setPopupOpen(false);

  return (
    <>
      <Dialog
        open={popupOpen}
        as="div"
        className="relative z-10"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-3xl overflow-x-auto rounded bg-white px-10 py-10">
              <div className="mb-5 flex justify-between">
                <h1 className="text-md font-bold">Edit Leave</h1>
                <button onClick={close}>
                  <X />
                </button>
              </div>
              <form
                className="grid grid-cols-1 gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex gap-2">
                  <div className="flex w-full flex-col gap-2">
                    <label className="text-sm font-medium">Employee</label>
                    <Controller
                      name="employee_name"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={true}
                          isDisabled={true}
                          styles={customSelectStyles}
                          options={employeeOptions}
                          placeholder="Select Leave Type"
                          className="input-box w-full text-black caret-white"
                        />
                      )}
                    />
                  </div>

                  <div className="flex w-full flex-col gap-2">
                    <label className="text-sm font-medium">Leave Type</label>
                    <Controller
                      name="leaveType"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={true}
                          isDisabled={true}
                          styles={customSelectStyles}
                          options={leaveTypeOptions}
                          placeholder="Select Leave Type"
                          className="input-box w-full text-black caret-white"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex w-full flex-col gap-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <input
                      type="date"
                      {...register("from_date")}
                      placeholder="From Date"
                      disabled
                      className="input-box w-full pr-2"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label className="text-sm font-medium">End Date</label>
                    <input
                      type="date"
                      min={watchFromDate}
                      {...register("to_date")}
                      placeholder="To Date"
                      disabled
                      className="input-box w-full pr-2"
                    />
                  </div>
                </div>

                <>
                  {leavePeriodFields.map((item, index) => {
                    const shiftsForThisDate = shiftOptionsMap[item.date] || [];
                    const isDayOff = watch(`leave_period.${index}.is_day_off`);

                    return (
                      <div
                        key={item.id}
                        className="mt-4 flex items-center justify-center gap-3 border-t"
                      >
                        {/* DATE + DAY OFF */}
                        <div className="w-ful mt-4 flex min-w-36 flex-col justify-center gap-2">
                          <h1 className="w-full whitespace-nowrap text-sm font-semibold text-textcolor-darkCharcoal">
                            {item.date}
                          </h1>

                          <p className="flex w-full gap-2">
                            <Controller
                              name={`leave_period.${index}.is_day_off`}
                              control={control}
                              render={({ field }) => (
                                <input
                                  type="checkbox"
                                  {...field}
                                  checked={field.value || false}
                                />
                              )}
                            />
                            <label className="text-xs">Mark as dayoff</label>
                          </p>
                        </div>

                        {/* 🔽 WHOLE SECTION HIDES WHEN DAY OFF */}
                        <div className="flex w-full items-center gap-3">
                          {/* SHIFT */}
                          <div className="mt-4 w-full">
                            <Controller
                              name={`leave_period.${index}.shift_id`}
                              control={control}
                              render={({ field }) => (
                                <Select
                                  isSearchable
                                  options={shiftsForThisDate}
                                  placeholder="Select Shift"
                                  isDisabled={isDayOff}
                                  className="input-box w-full text-black"
                                  value={
                                    isDayOff
                                      ? null
                                      : shiftsForThisDate.find(
                                          (opt) => opt.value === field.value,
                                        ) || null
                                  }
                                  onChange={(opt) => field.onChange(opt?.value)}
                                />
                              )}
                            />
                          </div>

                          {/* LEAVE SCHEDULE */}
                          <div className="mt-4 w-full">
                            <Controller
                              name={`leave_period.${index}.leave_schedule`}
                              control={control}
                              render={({ field }) => (
                                <Select
                                  isSearchable
                                  styles={customSelectStyles}
                                  options={leaveScheduleOptions}
                                  placeholder="Select Leave Type"
                                  isDisabled={isDayOff}
                                  className="input-box w-full text-black"
                                  value={
                                    isDayOff
                                      ? null
                                      : leaveScheduleOptions.find(
                                          (o) => o.value === field.value,
                                        ) || null
                                  }
                                  onChange={(opt) => field.onChange(opt?.value)}
                                />
                              )}
                            />
                          </div>

                          {/* HALF DAY SECTION */}
                          {watch(`leave_period.${index}.leave_schedule`) ===
                            "half_day" &&
                            !isDayOff && (
                              <div className="mt-4 w-full">
                                <Controller
                                  name={`leave_period.${index}.leave_schedule_section`}
                                  control={control}
                                  render={({ field }) => (
                                    <Select
                                      isSearchable
                                      styles={customSelectStyles}
                                      options={leaveScheduleSectionOptions}
                                      placeholder="Select Section"
                                      className="input-box w-full text-black"
                                      value={
                                        leaveScheduleSectionOptions.find(
                                          (o) => o.value === field.value,
                                        ) || null
                                      }
                                      onChange={(opt) =>
                                        field.onChange(opt?.value)
                                      }
                                    />
                                  )}
                                />
                              </div>
                            )}
                        </div>
                      </div>
                    );
                  })}

                  {/* TOTAL */}
                  <div className="group flex items-center justify-between gap-x-2 rounded-md bg-gray-darklight px-6 py-4 font-bold">
                    <h1 className="w-3/5">Total</h1>
                    <h1>
                      {leavePeriodFields.length} day
                      {leavePeriodFields.length > 1 ? "s" : ""}
                    </h1>
                  </div>
                </>

                <div className="flex w-1/2 flex-col gap-2">
                  <label className="required text-sm font-medium">
                    Reason for Leave
                  </label>
                  <textarea
                    className="input-box overflow-y-min h-20 w-full overflow-y-auto pt-2"
                    rows="4"
                    {...register("reason")}
                    placeholder="Reason"
                  />
                </div>
                <div className="mt-4 flex w-1/2 gap-3">
                  <button
                    type="button"
                    onClick={close}
                    className="w-full rounded border border-black px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full rounded bg-black px-7 py-2 text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
