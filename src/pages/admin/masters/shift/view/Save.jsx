import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import { ShiftSchema } from "@/schema/dashboard/masters/shift.schema";
import { newFormRequest, newRequest, XFormRequest } from "@/api";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MenuHeader from "@/components/common/MenuHeader";
import { ChevronRight, Palette } from "lucide-react";
import { customSelectStyles } from "@/utils/customStyles";
import WeeklyRecurrence from "@/components/popups/master/shift/RecurrencePattern";
import GradientColorPicker from "react-best-gradient-color-picker";

import {
  EMPLOYEE_DEPARTMENT_LIST,
  EMPLOYEE_WORK_AREA,
  EMPLOYEE_WORK_LOCATION_LIST,
} from "@/api/master";
import { SHIFT_LIST, SHIFT_BREAK_TIME } from "@/api/setup";
import Break from "../Break";
import tinycolor from "tinycolor2";

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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [color, setColor] = useState("#030E5C");
  const [showPicker, setShowPicker] = useState(false);
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
  console.log(selectedDays);

  const calculationType = watch("calculation_type", "perday");
  const recurrencePattern = watch("recur_pattern", "daily");
  const WeekEnd = watch("week_def", "basedoncalender");

  const { data: shiftDetails, isLoading } = useQuery({
    queryKey: ["shiftDetails", id, formtype],
    queryFn: () =>
      newRequest.get(`${SHIFT_LIST}/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  // Log the shift details
  useEffect(() => {
    if (shiftDetails) {
      console.log(shiftDetails);
    }
  }, [shiftDetails]);

  const startTime = watch("start_time");
  const endTime = watch("end_time");

  useEffect(() => {
    if (startTime && endTime) {
      const isValidTime = (time) =>
        /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/.test(time);

      if (isValidTime(startTime) && isValidTime(endTime)) {
        // Ensure both `HH:mm` and `HH:mm:ss` formats are handled
        const formattedStartTime = startTime.split(":").slice(0, 2).join(":");
        const formattedEndTime = endTime.split(":").slice(0, 2).join(":");

        const [startHours, startMinutes] = formattedStartTime
          .split(":")
          .map(Number);
        const [endHours, endMinutes] = formattedEndTime.split(":").map(Number);

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
        setDuration("00:00"); // Invalid time format
      }
    } else {
      setDuration("00:00"); // Missing time input
    }
  }, [startTime, endTime, shiftDetails]);

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
    console.log(data);

    if (recurrencePattern === "weekly") {
      if (validateInputs()) {
        if (calculationType === "perhour") {
          await handleShift(data);
        } else {
          if (data.fullday === "" && data.halfday === "") {
            toast.error("Either full day or half day is required");
          } else {
            await handleShift(data);
          }
        }
      } else {
        toast.error("Please enter the count for the selected days");
      }
    } else {
      await handleShift(data);
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
    console.log(data.department_id);

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
      halfday: data?.halfday,
      halfdaytolerence: data.halfdaytolerence,
      recur_pattern: data.recur_pattern,
      week_def: data.week_def,
      break_times: new_break,
      color: color,
    };

    // Add weekly specific fields if recurrence pattern is weekly
    if (recurrencePattern === "weekly") {
      formdata = {
        ...formdata,
        weeks: selectedDays,
        people_count: requireDays,
      };
    }
    if (id) {
      formdata = {
        ...formdata,
        shift_id: id,
      };
    }
    console.log(formdata);

    try {
      const api = id ? `${SHIFT_LIST}/${id}` : SHIFT_LIST;
      const res = await newRequest.post(api, formdata);
      if (res?.status === 201 || 200) {
        toast.success(
          id
            ? "Updated shift details successfully"
            : "Saved shift details successfully",
        );
        queryClient.invalidateQueries(["shiftDetails"]);
        reset();
        navigate("/admin/shift");
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
      setValue("name", shiftDetails?.name);
      setValue("department_id", shiftDetails?.department);
      setValue("work_id", shiftDetails?.workArea);
      setValue("location_id", shiftDetails?.location);
      setValue("start_time", shiftDetails?.start_time);
      setValue("end_time", shiftDetails?.end_time);
      setValue("people_required", shiftDetails?.people_required);
      setValue("calculation_type", shiftDetails?.calculation_type);
      setValue("fullday", shiftDetails?.fullday);
      setValue("fulltolerence", shiftDetails?.fulltolerence);
      setValue("halfday", shiftDetails?.halfday);
      setValue("halfdaytolerence", shiftDetails?.halfdaytolerence);
      setValue("recur_pattern", shiftDetails?.recur_pattern);
      setValue("week_def", shiftDetails?.week_def);
      setValue("weekly_shifts", shiftDetails?.weekly_shifts);
      setValue("people_count", shiftDetails?.people_count);
      setNew_break(shiftDetails?.breakTime);
      setColor(shiftDetails?.color ||" #030E5C");
      setSelectedDays(shiftDetails?.weekly_shifts[0]?.weeks || []);
      setRequireDays(
        shiftDetails?.weekly_shifts[0]?.people_count || [0, 0, 0, 0, 0, 0, 0],
      );
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
  const handleColorChange = (newColor) => {
    const hexColor = tinycolor(newColor).toHexString(); // Convert to HEX
    setColor(hexColor);
  };

  return (
    <>
      <MenuHeader
        menu="Menu"
        subMenu="Shift"
        currentpath={id ? "Edit Shift" : "Add Shift"}
        icon={<ChevronRight className="size-3" />}
      />
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="my-1 flex w-full flex-row items-center justify-between">
            <h1 className="text-lg font-bold">
              {id ? "Edit New Shift" : "Create New Shift"}
            </h1>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="btn flex h-10 min-h-10 min-w-24 items-center bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-hrmdarkblue/70"
              >
                {loader ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    {id ? "Updating" : "Saving"}
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
                    {id ? "Update" : "Save"}
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
                <div className="group col-span-2 flex gap-1.5 px-3 py-2">
                  <div className="w-full">
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
                  <div className="relative">
                    {/* Color Picker Trigger */}
                    <div className="flex flex-col items-center">
                      <label className="label-text">Color</label>
                      <div
                        className="cursor-pointer rounded-full border border-gray-300 p-1"
                        style={{ background: color }}
                        onClick={() => setShowPicker(!showPicker)}
                      >
                        <Palette className="size-8 p-1 text-white" />
                      </div>
                    </div>
                    {showPicker && (
                      <div className="absolute z-10 mt-2 rounded-lg bg-gray-200 p-3 shadow-lg">
                        <GradientColorPicker
                          value={color}
                          onChange={handleColorChange}
                        />
                        <button
                          className="mt-2 rounded bg-blue-500 px-4 py-1 text-white"
                          onClick={() => setShowPicker(false)}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
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
                      placeholder="HH:MM"
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
                          placeholder="HH:MM"
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
                          placeholder="HH:MM"
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
                          placeholder="HH:MM"
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
                          placeholder="HH:MM"
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
                  {recurrencePattern === "daily"
                    ? " This shift occurs every single day, and no weekend isdefined."
                    : "This shift occurs on the selected days, and remaining days will be considered as off."}
                </p>
                <WeeklyRecurrence
                  days={days}
                  recurrencePattern={recurrencePattern}
                  selectedDays={selectedDays}
                  type={"recurrence"}
                  requireDays={requireDays}
                  setRequireDays={setRequireDays}
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
                  {WeekEnd === "basedoncalender"
                    ? "Calendar-based weekend definition will be considered"
                    : "Shift-based weekend definition will be considered"}
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
                            selectedDays?.includes(day)
                              ? errors[index]
                                ? "border-red-500 bg-white" // Red border for error
                                : "bg-white"
                              : "cursor-not-allowed bg-gray-100"
                          }`}
                          placeholder={day}
                          type="number"
                          defaultValue={
                            requireDays?.[index] === "0" ||
                            requireDays?.[index] === 0
                              ? ""
                              : requireDays?.[index]
                          }
                          onChange={handleInputChange(index)}
                          disabled={!selectedDays?.includes(day)} // Disable input if the day is not selected
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
