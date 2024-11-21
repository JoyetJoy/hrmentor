import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import { ShiftSchema } from "@/schema/dashboard/masters/shift.schema";
import { newFormRequest, newRequest, XFormRequest } from "@/api";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MenuHeader from "@/components/common/MenuHeader";
import { ChevronRight } from "lucide-react";
import { customSelectStyles } from "@/utils/customStyles";
import WeeklyRecurrence from "@/components/popups/master/shift/RecurrencePattern";
import {
  EMPLOYEE_DEPARTMENT_LIST,
  EMPLOYEE_WORK_AREA,
  EMPLOYEE_WORK_LOCATION_LIST,
} from "@/api/master";
import { SHIFT_LIST } from "@/api/setup";
import Break from "../Break";

export default function SaveMasterShift({ formtype, sid }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [workArea, setWorkArea] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [new_break, setNew_break] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [error, setError] = useState("");
  const [requireDays, setRequireDays] = useState([0, 0, 0, 0, 0, 0, 0]);
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [dayerror, setDayerror] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [duration, setDuration] = useState(null);

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ShiftSchema),
  });

  const calculationType = watch("calculation_type", "perday");
  const recurrencePattern = watch("recur_pattern", "daily");
  const WeekEnd = watch("week_def", "basedoncalender");

  const { data: shiftDetails, isLoading } = useQuery({
    queryKey: ["shiftDetails", sid, formtype],
    queryFn: () =>
      newRequest.get(`${SHIFT_LIST}/${sid}`).then((res) => res.data),
    enabled: formtype == "update",
  });

  const startTime = watch("start_time");
  const endTime = watch("end_time");

  useEffect(() => {
    if (startTime && endTime) {
      const [startHours, startMinutes] = startTime.split(":").map(Number);
      const [endHours, endMinutes] = endTime.split(":").map(Number);

      let startTotalMinutes = startHours * 60 + startMinutes;
      let endTotalMinutes = endHours * 60 + endMinutes;

      if (endTotalMinutes < startTotalMinutes) {
        endTotalMinutes += 24 * 60;
      }

      const diffMinutes = endTotalMinutes - startTotalMinutes;

      const hours = String(Math.floor(diffMinutes / 60)).padStart(2, "0");
      const minutes = String(diffMinutes % 60).padStart(2, "0");

      setDuration(`${hours}:${minutes}`);
    } else {
      setDuration(null);
    }
  }, [startTime, endTime]);

  const handleInputChange = (index) => (event) => {
    const value = parseInt(event.target.value) || 0;
    const newRequireDays = [...requireDays];
    newRequireDays[index] = value;
    setRequireDays(newRequireDays);

    if (value > 0) {
      setDayerror((prev) => {
        const newErrors = [...prev];
        newErrors[index] = false;
        return newErrors;
      });
    }
  };

  const validateInputs = () => {
    const newErrors = selectedDays.map((day) => {
      const index = days.indexOf(day);
      return requireDays[index] === 0;
    });
    setDayerror(newErrors);
    return !newErrors.some((error) => error === true);
  };

  const onSubmit = async (data) => {
    if (validateInputs()) {
      if (data.fullday === "" && data.halfday === "") {
        toast.error("Either full day or half day is required");
      } else {
        await handleShift(data);
      }
    } else {
      toast.error("Please enter the count for the selected days");
    }
  };

  const handleShift = async (data) => {
    let formdata;

    // Check if break time is provided
    if (new_break.length === 0) {
      setError("Break time is required");
      toast.error("Break time is required");
      return;
    }

    // Start loader
    setLoader(true);

    // Common shift data for both weekly and non-weekly recurrence
    formdata = {
      name: data.name,
      start_time: data.start_time,
      end_time: data.end_time,
      shift_duration: duration,
      people_required: data.people_required,
      department_id: data.department_id?.id,
      work_id: data.work_id?.id,
      location_id: data.location_id?.id,
      calculation_type: data.calculation_type,
      fullday: data.fullday,
      fulltolerence: data.fulltolerence,
      halfday: data.halfday,
      halfdaytolerence: data.halfdaytolerence,
      recur_pattern: data.recur_pattern,
      week_def: data.week_def,
      break_times: new_break,
    };

    // Add weekly specific fields if recurrence pattern is weekly
    if (recurrencePattern === "weekly") {
      formdata = {
        ...formdata,
        weeks: selectedDays,
        people_count: requireDays,
      };
    }

    try {
      const res = await newFormRequest.post(SHIFT_LIST, formdata);
      if (res?.status === 201) {
        toast.success("Saved shift details successfully");
        queryClient.invalidateQueries(["shiftDetails"]);
        reset();
        navigate("/admin/setup/shift");
      } else {
        toast.error("Failed to save shift details");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save shift details");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (shiftDetails) {
      setValue("name", shiftDetails?.data?.shift?.name);
      setValue("department_id", shiftDetails?.data?.shift?.department_id);
      setValue("work_id", shiftDetails?.data?.shift?.work_id);
      setValue("location_id", shiftDetails?.data?.shift?.location_id);
      setValue("start_time", shiftDetails?.data?.shift?.start_time);
      setValue("end_time", shiftDetails?.data?.shift?.end_time);
      setValue("people_required", shiftDetails?.data?.shift?.people_required);
      setValue("calculation_type", shiftDetails?.data?.shift?.calculation_type);
      setValue("fullday", shiftDetails?.data?.shift?.fullday);
      setValue("fulltolerence", shiftDetails?.data?.shift?.fulltolerence);
      setValue("halfday", shiftDetails?.data?.shift?.halfday);
      setValue("halfdaytolerence", shiftDetails?.data?.shift?.halfdaytolerence);
      setValue("recur_pattern", shiftDetails?.data?.shift?.recur_pattern);
      setValue("status", shiftDetails?.data?.shift?.status);
      setValue("week_def", shiftDetails?.data?.shift?.week_def);
      setValue("weekly_shifts", shiftDetails?.data?.shift?.weekly_shifts);
      setValue("people_count", shiftDetails?.data?.shift?.people_count);
      setValue("name", shiftDetails?.type_name);
      setValue("start_time", shiftDetails?.data?.start_time);
      setValue("end_time", shiftDetails?.data?.end_time);
      setValue("pay_node", shiftDetails?.data?.pay_node);
    }
  }, [shiftDetails, setValue]);

  const { data: departmentList } = useEmployeeMaster(
    EMPLOYEE_DEPARTMENT_LIST,
    "departmentList",
  );
  const { data: worklocationList } = useEmployeeMaster(
    EMPLOYEE_WORK_LOCATION_LIST,
    "worklocationList",
  );
  const { data: workAreaList } = useEmployeeMaster(
    EMPLOYEE_WORK_AREA,
    "workAreaList",
  );
  useEffect(() => {
    if (workAreaList) {
      const formattedWorkArea = workAreaList?.data?.original?.data?.map(
        (item) => ({
          label: item.name,
          value: item.name,
          id: item.id,
        }),
      );
      setWorkArea(formattedWorkArea);
    }
  }, [workAreaList]);

  const formatTime = (input) => {
    let value = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    // Format input as HH:MM
    if (value.length >= 3) {
      value = value.slice(0, 2) + ":" + value.slice(2, 4); // Insert colon
    }

    return value;
  };
  
  return (
    <>
      <MenuHeader
        menu="Menu"
        subMenu="Shift"
        currentpath="Add Shift"
        icon={<ChevronRight className="size-3" />}
      />
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="my-1 flex w-full flex-row items-center justify-between">
            <h1 className="text-lg font-bold">Create New Shift</h1>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="btn flex h-10 min-h-10 min-w-24 items-center bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmdarkblue/70"
              >
                {loader ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    {formtype === "update" ? "Updating" : "Saving"}
                  </div>
                ) : (
                  <>
                    <div className="w-3.5">
                      <img
                        src={"/assets/icons/employees/save.svg"}
                        alt="save icon"
                        className="w-full object-contain"
                      />
                    </div>
                    {formtype === "update" ? "Update" : "Save"}
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="grid gap-x-3 lg:grid-cols-2">
            <div
              className={`mb-5 flex flex-col gap-3 rounded-md border border-gray-300 bg-white py-4 lg:mb-0 lg:rounded-b-none lg:border-b-0 ${formtype === "update" ? "px-2" : "px-5"}`}
            >
              <div className="mt-4 grid w-full lg:grid-cols-2">
                <div className="group col-span-2 flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Shift Name</label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="name"
                    placeholder="Enter Shift Name"
                    {...register("name", { required: true })}
                    className="input-box"
                  />
                  {errors.name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.name?.message}
                    </span>
                  )}
                </div>
                <div className="gap flex items-center justify-center gap-2">
                  <div className="group flex w-full flex-col gap-1.5 py-2 pl-3">
                    <label className="required label-text">Start Time</label>
                    <input
                      {...register("start_time", { required: true })}
                      autoComplete="off"
                      name="start_time"
                      type="time"
                      placeholder="HH:MM"
                      className="input-box"
                    />
                    {errors.start_time && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.start_time?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex w-full flex-col gap-1.5 py-2 pr-3">
                    <label className="required label-text">End Time</label>
                    <input
                      {...register("end_time", { required: true })}
                      autoComplete="off"
                      type="time"
                      name="end_time"
                      className="input-box"
                    />
                    {errors.end_time && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.end_time?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Shift Duration</label>
                  <div className="flex h-10 w-full items-center rounded-lg border border-[#cacaca] px-2 text-sm">
                    {duration !== null
                      ? `${duration}`
                      : "Please select start and end time"}
                  </div>
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">People Required</label>
                  <input
                    {...register("people_required", { required: true })}
                    autoComplete="off"
                    type="number"
                    name="people_required"
                    placeholder="Enter Required Count"
                    className="input-box"
                  />
                  {errors.people_required && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.people_required?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Department</label>
                  <Controller
                    name="department_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        options={departmentList}
                        placeholder="Select Work Area"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.department_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.department_id?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Work Area</label>
                  <Controller
                    name="work_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        options={workArea}
                        placeholder="Select Work Area"
                        className="input-box text-black"
                      />
                    )}
                  />
                  {errors.work_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.work_id?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Work Location</label>
                  <Controller
                    name="location_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        options={worklocationList}
                        placeholder="Select Location"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.location_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.location_id?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col rounded-md rounded-b-none border border-b-0 border-gray-300 bg-white py-4 ${formtype === "update" ? "px-2" : "px-5"}`}
            >
              <div className="flex flex-col gap-5 px-3 py-3">
                <div className="flex items-center gap-14">
                  <h1 className="text-sm font-semibold">
                    Pay calculation type
                  </h1>
                  <div className="flex items-center gap-7">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="perday"
                        name="calculation_type"
                        {...register("calculation_type", { required: true })}
                        defaultChecked={calculationType === "perday"}
                      />
                      <label className="text-sm font-normal">Per day</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="perhour"
                        name="calculation_type"
                        {...register("calculation_type", { required: true })}
                        defaultChecked={calculationType === "perhour"}
                      />
                      <label className="text-sm font-normal">Per Hour</label>
                    </div>
                  </div>
                </div>
                {calculationType === "perday" && (
                  <div className="flex flex-col gap-2">
                    <p className="required text-xs">
                      Minimum hours required for (Either full day or half day is
                      required)
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex w-full flex-col">
                        <label
                          className="required label-text"
                          htmlFor="fullday"
                        >
                          Full Day
                        </label>
                        <input
                          {...register("fullday", {
                            required: "Time is required",
                            pattern: {
                              value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                              message:
                                "Please enter a valid time format (HH:MM)",
                            },
                          })}
                          id="fullday"
                          autoComplete="off"
                          name="fullday"
                          type="text"
                          placeholder="--:--"
                          className="input-box"
                          onChange={(e) => {
                            e.target.value = formatTime(e.target.value); // Call the helper function
                          }}
                        />
                        {errors.fullday && (
                          <span className="whitespace-nowrap text-xs font-medium text-red-500">
                            {errors.fullday?.message}
                          </span>
                        )}
                      </div>
                      <div className="flex w-full flex-col">
                        <label
                          className="required label-text"
                          htmlFor="fulltolerence"
                        >
                          Full Day Tolerence
                        </label>
                        <input
                          {...register("fulltolerence", {
                            pattern: {
                              value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                              message:
                                "Please enter a valid time format (HH:MM)",
                            },
                          })}
                          id="fulltolerence"
                          autoComplete="off"
                          name="fulltolerence"
                          type="text"
                          placeholder="--:--"
                          className="input-box"
                          onChange={(e) => {
                            e.target.value = formatTime(e.target.value); // Call the helper function
                          }}
                        />
                        {errors.fulltolerence && (
                          <span className="whitespace-nowrap text-xs font-medium text-red-500">
                            {errors.fulltolerence?.message}
                          </span>
                        )}
                      </div>
                      <div className="flex w-full flex-col">
                        <label
                          className="required label-text"
                          htmlFor="halfday"
                        >
                          Half Day
                        </label>
                        <input
                          {...register("halfday", {
                            pattern: {
                              value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                              message:
                                "Please enter a valid time format (HH:MM)",
                            },
                          })}
                          id="halfday"
                          autoComplete="off"
                          name="halfday"
                          type="text"
                          placeholder="--:--"
                          className="input-box"
                          onChange={(e) => {
                            e.target.value = formatTime(e.target.value); // Call the helper function
                          }}
                        />
                        {errors.halfday && (
                          <span className="whitespace-nowrap text-xs font-medium text-red-500">
                            {errors.halfday?.message}
                          </span>
                        )}
                      </div>
                      <div className="flex w-full flex-col">
                        <label
                          className="required label-text"
                          htmlFor="halfdaytolerence"
                        >
                          Half Day Tolerence
                        </label>
                        <input
                          {...register("halfdaytolerence", {
                            pattern: {
                              value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                              message:
                                "Please enter a valid time format (HH:MM)",
                            },
                          })}
                          id="halfdaytolerence"
                          autoComplete="off"
                          name="halfdaytolerence"
                          type="text" // Change type to text for manual input (no time picker)
                          placeholder="--:--"
                          className="input-box"
                          onChange={(e) => {
                            e.target.value = formatTime(e.target.value); // Call the helper function for formatting
                          }}
                        />
                        {errors.halfdaytolerence && (
                          <span className="whitespace-nowrap text-xs font-medium text-red-500">
                            {errors.halfdaytolerence?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mt-3 border-l-4 border-hrmprimaryorange bg-[#FFECE7] py-3 pl-3 text-xs font-normal text-gray-darkpale">
                      Employee must reach the minimum hours required to qualify
                      themselves as full day or half day present
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-5 px-3 py-3">
                <div className="flex items-center gap-14">
                  <h1 className="text-sm font-semibold">Recurrence pattern</h1>
                  <div className="flex items-center gap-7">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="daily"
                        name="recur_pattern"
                        {...register("recur_pattern", { required: true })}
                        defaultChecked={recurrencePattern === "daily"}
                      />
                      <label className="text-sm font-normal">Daily</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="weekly"
                        name="recur_pattern"
                        {...register("recur_pattern", { required: true })}
                        defaultChecked={recurrencePattern === "weekly"}
                      />
                      <label className="text-sm font-normal">Weekly</label>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-dark">
                  This shift occurs every single day, and no weekend is defined.
                </p>
                <WeeklyRecurrence
                  days={days}
                  recurrencePattern={recurrencePattern}
                  selectedDays={selectedDays}
                  type={"recurrence"}
                  setDayerror={setDayerror}
                  dayerror={dayerror}
                  setSelectedDays={setSelectedDays}
                />
              </div>
              <div className="flex flex-col gap-5 px-3 py-3">
                <div className="flex items-center gap-14">
                  <h1 className="text-sm font-semibold">Weekend definition</h1>
                  <div className="flex items-center gap-7">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="basedoncalender"
                        name="week_def"
                        {...register("week_def", { required: true })}
                        defaultChecked={WeekEnd === "basedoncalender"}
                      />
                      <label className="text-sm font-normal">
                        Based on calender settings
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="week_def"
                        value="basedonshift"
                        {...register("week_def", { required: true })}
                        defaultChecked={WeekEnd === "weekly"}
                      />
                      <label className="text-sm font-normal">
                        Based on shift setting
                      </label>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-dark">
                  Calendar-based weekend definition will be considered
                </p>
              </div>
              {recurrencePattern === "weekly" && (
                <div className="mt-4">
                  <h3 className="mb-2 text-sm font-semibold">
                    People Required
                  </h3>
                  <div className="grid h-8 grid-cols-7 overflow-hidden rounded-md border">
                    {days.map((day, index) => (
                      <div key={index} className="relative">
                        <input
                          className={`border-r px-2 py-2 text-start text-xs placeholder:text-zinc-700 ${
                            selectedDays.includes(day)
                              ? errors[index]
                                ? "border-red-500 bg-white" // Red border for error
                                : "bg-white"
                              : "cursor-not-allowed bg-gray-100"
                          }`}
                          placeholder={day}
                          type="number"
                          onChange={handleInputChange(index)}
                          disabled={!selectedDays.includes(day)} // Disable input if the day is not selected
                        />
                        {/* Display error message */}
                        {dayerror[index] && (
                          <span className="absolute mt-1 text-xs text-red-500">
                            Required
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
        <div className="grid gap-x-3 lg:grid-cols-2">
          <div className="rounded-md rounded-t-none border border-t-0 border-gray-300 bg-white p-10 pt-0">
            <hr className="border-[#A7A7A7] pb-5" />
            <Break
              formtype="save"
              error={error}
              new_break={new_break}
              setNew_break={setNew_break}
            />
          </div>
          <div className="rounded-md rounded-t-none border border-t-0 border-gray-300 bg-white p-10 pt-0"></div>
        </div>
      </>
    </>
  );
}
