import { newRequest } from "@/api";
import {
  EMPLOYEE_LEAVE_REQUEST,
  EMPLOYEE_LEAVE_SHIFTS,
  EMPLOYEE_LEAVE_TYPE,
  EMPLOYEE_TEAM_LEAVE_APPLY,
  EMPLOYEE_TEAM_LEAVE_TYPE,
  EMPLOYEE_TEAM_LIST,
  LEAVE_REQUEST_LIST,
  LEAVE_REQUEST_UPDATE,
} from "@/api/master";
import { useUserStore } from "@/lib/slices/auth.slice";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, Trash2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import * as Yup from "yup";

const LeaveSchema = Yup.object({
  leave_type: Yup.string(),
});

export default function EditLeave({
  popupOpen,
  ViewEdit,
  setPopupOpen,
  id,
  userId,
}) {
  const { user } = useUserStore((state) => ({ user: state.user }));
  const [loader, setLoader] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [leaveType, setLeaveType] = useState([]);
  const [leaveReason, setLeaveReason] = useState("");
  const [teamList, setTeamList] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [dayOffDates, setDayOffDates] = useState([]);
  const hasPrefilledRef = useRef(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(LeaveSchema),
  });
  console.log(user);
  console.log(userId, id);

  const { data: leaveDetails } = useQuery({
    queryKey: ["leaveDetails", userId, id],
    queryFn: () =>
      newRequest
        .get(`${LEAVE_REQUEST_LIST}/${id}`, {
          params: { user_id: userId },
        })
        .then((res) => res.data),
    enabled: !!userId && !!id,
  });

  function close() {
    hasPrefilledRef.current = false;
    setPopupOpen(false);
  }

  const leaveSchedule = [
    { label: "Half Day", value: "half_day" },
    { label: "Full Day", value: "full_day" },
  ];

  const leaveScheduleSection = [
    { label: "First Half", value: "first_half" },
    { label: "Second Half", value: "second_half" },
  ];

  useEffect(() => {
    if (!leaveDetails) return;

    setFromDate(leaveDetails?.from_date);
    setToDate(leaveDetails?.to_date);

    // Prefill basic info
    setValue("employee_name", {
      label: leaveDetails?.employee.first_name,
      value: leaveDetails?.employee.id,
    });
    setValue("leaveType", {
      label: leaveDetails?.leave_type,
      value: leaveDetails?.leave_type_id,
    });
    setLeaveReason(leaveDetails?.reason);
    setSelectedLeaveType(leaveDetails?.leave_type_id);
  }, [leaveDetails]);

  useEffect(() => {
    if (
      hasPrefilledRef.current ||
      !leaveDetails ||
      dateRange.length === 0 ||
      Object.keys(shiftOptions).length === 0
    ) {
      return;
    }

    const updatedDateRange = [...dateRange];
    const prefilledDayOff = [];

    leaveDetails.leave_period.forEach((leaveItem) => {
      const index = updatedDateRange.findIndex(
        (d) => d.date === leaveItem.date,
      );
      if (index === -1) return;

      // DAY OFF
      if (leaveItem.shift_name?.toLowerCase() === "day off") {
        prefilledDayOff.push(leaveItem.date);
        updatedDateRange[index] = { date: leaveItem.date };
        return;
      }

      // SHIFT
      const shiftsForThisDate = shiftOptions[leaveItem.date] || [];
      const matchedShift = shiftsForThisDate.find((s) =>
        s.label.includes(leaveItem.shift_name),
      );

      updatedDateRange[index] = {
        ...updatedDateRange[index],
        shift_id: matchedShift?.value,
        roster_id: matchedShift?.id,
        leave_schedule: leaveItem.leave_schedule,
        leave_schedule_section: leaveItem.leave_schedule_section || null,
      };

      // RHF PREFILL (UI)
      setValue(
        `leave_schedule-${index}`,
        leaveSchedule.find((o) => o.value === leaveItem.leave_schedule),
      );

      if (leaveItem.leave_schedule === "half_day") {
        setValue(
          `leave_schedule_section-${index}`,
          leaveScheduleSection.find(
            (o) => o.value === leaveItem.leave_schedule_section,
          ),
        );
      }

      if (matchedShift) {
        setValue(`additionalShift-${index}`, matchedShift.value);
      }
    });

    setDateRange(updatedDateRange);
    setDayOffDates(prefilledDayOff);

    hasPrefilledRef.current = true;
  }, [leaveDetails, dateRange, shiftOptions]);

  console.log(dateRange);

  const handleLeaveTypeChange = (selectedOption) => {
    setSelectedLeaveType(selectedOption.value);
  };

  const { data: employeeTeamList = [] } = useQuery({
    queryKey: ["employeeTeamList"],
    queryFn: () => newRequest.get(EMPLOYEE_TEAM_LIST).then((res) => res.data),
  });

  useEffect(() => {
    if (employeeTeamList?.length) {
      const options = employeeTeamList?.map((team) => ({
        label: team?.name,
        value: team?.id,
      }));
      setTeamList(options);
    }
  }, [employeeTeamList]);

  const { data: employeeLeaveShift = [] } = useQuery({
    queryKey: [
      "employeeLeaveShift",
      fromDate,
      toDate,
      user?.employee_data,
      selectedLeaveType,
    ],
    queryFn: () =>
      newRequest
        .get(EMPLOYEE_LEAVE_SHIFTS, {
          params: {
            from_date: fromDate,
            to_date: toDate,
            employee_id: leaveDetails?.employee_id,
          },
        })
        .then((res) => res.data),
    enabled:
      !!fromDate &&
      !!toDate &&
      !!leaveDetails?.employee_id &&
      !!selectedLeaveType,
  });
  console.log(shiftOptions);

  useEffect(() => {
    if (!employeeLeaveShift?.length) return;
    const formatted = {};

    employeeLeaveShift.forEach((item) => {
      formatted[item.date] = item.data.map((d) => ({
        label: d.name,
        value: d.shift_id,
        id: d.roster_id,
      }));
    });

    setShiftOptions(formatted);
  }, [employeeLeaveShift]);

  useEffect(() => {
    if (employeeId) {
      const fetchEmployeeTeamLeaveType = async () => {
        try {
          const response = await newRequest.get(
            `${EMPLOYEE_TEAM_LEAVE_TYPE}/${employeeId}`,
          );
          const employeeTeamLeaveType = response.data || [];

          if (employeeTeamLeaveType?.length) {
            const options = employeeTeamLeaveType
              ?.filter(
                (type) =>
                  type.already_taked_leaves <=
                  Number(type.leave_types?.emp_no_days),
              )
              .map((type) => ({
                label: type.leave_types.display_name,
                value: type.leave_types.id,
              }));

            setLeaveType(options); // Set filtered options to the state
          }
        } catch (error) {
          console.error("Error fetching employee team leave type:", error);
        }
      };

      fetchEmployeeTeamLeaveType();
    } else {
      const fetchEmployeeLeaveType = async () => {
        try {
          const response = await newRequest.get(EMPLOYEE_LEAVE_TYPE);
          const employeeLeaveType = Array.isArray(response?.data?.data)
            ? response?.data?.data
            : [];
          if (employeeLeaveType?.length) {
            const options = employeeLeaveType
              .filter(
                (type) => type.already_taked_leaves < Number(type?.emp_no_days),
              )
              ?.map((type) => ({
                label: type.display_name,
                value: type.id,
              }));

            setLeaveType(options); // Set filtered options to the state
          }
        } catch (error) {
          console.error("Error fetching employee leave type:", error);
        }
      };

      fetchEmployeeLeaveType();
    }
  }, [employeeId]);

  useEffect(() => {
    const getDateRange = (fromDate, toDate) => {
      const startDate = new Date(fromDate); // fromDate is already yyyy-mm-dd
      const endDate = new Date(toDate);
      const dates = [];

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        // Format date as yyyy-mm-dd
        const formattedDate = d.toISOString().split("T")[0]; // Extracts only the yyyy-mm-dd part
        dates.push({ date: formattedDate });
      }

      return dates;
    };

    // Validate input and generate the dates
    if (fromDate && toDate) {
      const generatedDates = getDateRange(fromDate, toDate);
      setDateRange(generatedDates); // Update state with the generated dates
    }
  }, [fromDate, toDate]);

  const updateDateRange = (field, selectedOption, index) => {
    // Clone the existing data array to avoid direct mutation
    const updatedData = [...dateRange];

    // Dynamically update the field value and roaster_id based on selectedOption
    updatedData[index] = {
      ...updatedData[index],
      [field]: selectedOption ? selectedOption.value : null, // Set the dynamically passed field
    };

    // Update the state with the new data
    setDateRange(updatedData);
  };

  const updateDateRanges = (field, selectedOption, index) => {
    // Clone the existing data array to avoid direct mutation
    const updatedData = [...dateRange];
    // Dynamically update the field value and roaster_id based on selectedOption
    updatedData[index] = {
      ...updatedData[index],
      [field]: selectedOption ? selectedOption.value : null, // Set the dynamically passed field
      roster_id: selectedOption ? selectedOption.id : null, // Set roaster_id from selectedOption
    };

    // Update the state with the new data
    setDateRange(updatedData);
  };

  const handleShiftChange = (selectedOption, index) => {
    updateDateRanges("shift_id", selectedOption, index);
  };

  const handleShiftSchedule = (selectedOption, index, onChange) => {
    onChange(selectedOption); // 🔑 MUST update RHF
    updateDateRange("leave_schedule", selectedOption, index);
  };

  const handleShiftScheduleSection = (selectedOption, index) => {
    updateDateRange("leave_schedule_section", selectedOption, index);
  };

  const handleDateShift = (date) => {
    const updatedDateRange = [...dateRange, date];
    updatedDateRange.sort((a, b) => new Date(a.date) - new Date(b.date));
    setDateRange(updatedDateRange);
  };

  const handleDelete = (index) => {
    const updatedData = dateRange.filter((_, i) => i !== index); // Remove the item at the given index
    setDateRange(updatedData); // Update the state
  };

  const handleDayOffToggle = (date, checked) => {
    if (checked) {
      setDayOffDates((prev) => [...prev, date]);
    } else {
      setDayOffDates((prev) => prev.filter((d) => d !== date));
    }
  };
  console.log(dayOffDates);

  const onSubmit = async () => {
    setLoader(true);

    try {
      const leave_periods = dateRange.map((item) => {
        // 🟡 DAY OFF → only date
        if (dayOffDates.includes(item.date)) {
          return { date: item.date };
        }

        const payload = {
          date: item.date,
        };

        // shift
        if (item.shift_id) payload.shift_id = item.shift_id;
        if (item.roster_id) payload.roster_id = item.roster_id;

        // leave schedule
        if (item.leave_schedule) {
          payload.leave_schedule = item.leave_schedule;

          if (
            item.leave_schedule === "half_day" &&
            item.leave_schedule_section
          ) {
            payload.leave_schedule_section = item.leave_schedule_section;
          }
        }

        return payload;
      });

      const formData = {
        leave_status_id: 2,
        descriptions: leaveReason,
        leave_periods,
        day_off_date: dayOffDates,
      };

      const res = await newRequest.post(
        `${LEAVE_REQUEST_UPDATE}/${id}`,
        formData,
        {
          params: { user_id: userId },
        },
      );

      toast.success(res?.data?.message);
      queryClient.invalidateQueries(["servicesList"]);
      setPopupOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "An error occurred.");
    } finally {
      setLoader(false);
    }
  };

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
            <DialogPanel className="w-full max-w-3xl rounded bg-white px-10 py-10">
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
                          options={teamList}
                          placeholder="Select Leave Type"
                          className="input-box w-full text-black caret-white"
                          onChange={(e) => {
                            setEmployeeId(e?.value);
                          }}
                        />
                      )}
                    />
                  </div>

                  <div className="flex w-full flex-col gap-2">
                    <label className="text-sm font-medium">
                      Leave Type
                      {/* {leaveType.length === 0 && (
                        <span style={{ color: "red" }}>
                          [No Leave Available For You]
                        </span>
                      )} */}
                    </label>
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
                          options={leaveType}
                          placeholder="Select Leave Type"
                          className="input-box w-full text-black caret-white"
                          onChange={(e) => {
                            field.onChange(e);
                            handleLeaveTypeChange(e);
                          }}
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
                      onChange={(e) => {
                        setFromDate(e.target.value);
                      }}
                      value={fromDate}
                      className="input-box w-full pr-2"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label className="text-sm font-medium">End Date</label>
                    <input
                      type="date"
                      min={fromDate}
                      onChange={(e) => {
                        setToDate(e.target.value);
                      }}
                      value={toDate}
                      className="input-box w-full pr-2"
                    />
                  </div>
                </div>

                {dateRange && (
                  <>
                    {dateRange?.map((date, index) => {
                      const shiftsForThisDate = shiftOptions[date.date] || []; // <<-- Filter by date

                      return (
                        <div
                          key={index}
                          className="mt-4 flex items-center justify-center gap-3 border-t"
                        >
                          {/* Display the date */}
                          <div className="w-ful mt-4 flex min-w-36 flex-col justify-center gap-2">
                            <h1 className="w-full whitespace-nowrap text-sm font-semibold text-textcolor-darkCharcoal">
                              {date.date}
                            </h1>
                            <p className="flex w-full gap-2">
                              <input
                                type="checkbox"
                                name="dayoff"
                                checked={dayOffDates.includes(date.date)}
                                onChange={(e) =>
                                  handleDayOffToggle(
                                    date.date,
                                    e.target.checked,
                                  )
                                }
                              />
                              <label htmlFor="dayoff" className="text-xs">
                                Mark as dayoff
                              </label>
                            </p>
                          </div>

                          {/* Shift Selection */}
                          <div className="mt-4 w-full">
                            <Controller
                              name={`additionalShift-${index}`}
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isSearchable
                                  options={shiftsForThisDate} // <<-- ONLY shifts for this date
                                  placeholder="Select Shift"
                                  className="input-box w-full text-black"
                                  onChange={(selectedOption) =>
                                    handleShiftChange(selectedOption, index)
                                  }
                                  value={shiftsForThisDate.find(
                                    (option) => option.value === field.value,
                                  )}
                                  isDisabled={dayOffDates.includes(date.date)}
                                />
                              )}
                            />
                          </div>

                          {/* Leave Schedule */}
                          <div className="mt-4 w-full">
                            <Controller
                              name={`leave_schedule-${index}`}
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isSearchable
                                  styles={customSelectStyles}
                                  options={leaveSchedule}
                                  placeholder="Select Leave Type"
                                  className="input-box w-full text-black caret-white"
                                  value={field.value || null}
                                  isDisabled={dayOffDates.includes(date.date)}
                                  onChange={(selectedOption) =>
                                    handleShiftSchedule(
                                      selectedOption,
                                      index,
                                      field.onChange,
                                    )
                                  }
                                />
                              )}
                            />
                          </div>

                          {watch(`leave_schedule-${index}`)?.value ===
                            "half_day" && (
                            <div className="mt-4 w-full">
                              <Controller
                                name={`leave_schedule_section-${index}`}
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    isSearchable
                                    styles={customSelectStyles}
                                    options={leaveScheduleSection}
                                    placeholder="Select Section"
                                    className="input-box w-full text-black caret-white"
                                    value={field.value || null} // ✅ FIX
                                    onChange={(selectedOption) => {
                                      field.onChange(selectedOption); // 🔑 update RHF
                                      handleShiftScheduleSection(
                                        selectedOption,
                                        index,
                                      );
                                    }}
                                  />
                                )}
                              />
                            </div>
                          )}

                          <div key={index}>
                            {shiftOptions.length >= 2 && (
                              <>
                                {dateCount === shiftOptions.length ? (
                                  <span
                                    className="mt-1 flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md bg-red-600 px-3 py-3 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:outline-1 focus:outline-white"
                                    onClick={() => handleDelete(index)}
                                  >
                                    <Trash2 className="size-5" />
                                  </span>
                                ) : (
                                  <span
                                    className="mt-1 flex w-fit items-center justify-center gap-2 whitespace-nowrap rounded-md bg-green-600 px-3 py-3 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:outline-1 focus:outline-white"
                                    onClick={() => handleDateShift(date)}
                                  >
                                    <PlusIcon className="size-5" />
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {/* Total Days */}
                    <div className="group flex items-center justify-between gap-x-2 rounded-md bg-gray-darklight px-6 py-4 font-bold">
                      <h1 className="w-3/5">Total</h1>
                      <h1>
                        {dateRange.length} day{dateRange.length > 1 ? "s" : ""}
                      </h1>
                    </div>
                  </>
                )}
                <div className="flex w-1/2 flex-col gap-2">
                  <label className="required text-sm font-medium">
                    Reason for Leave
                  </label>
                  <textarea
                    className="input-box overflow-y-min h-20 w-full overflow-y-auto pt-2"
                    rows="4"
                    value={leaveReason}
                    onChange={(e) => {
                      setLeaveReason(e.target.value);
                    }}
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
