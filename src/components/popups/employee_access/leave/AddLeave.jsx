import { newRequest } from "@/api";
import {
  EMPLOYEE_LEAVE_REQUEST,
  EMPLOYEE_LEAVE_SHIFTS,
  EMPLOYEE_LEAVE_TYPE,
  EMPLOYEE_TEAM_LEAVE_APPLY,
  EMPLOYEE_TEAM_LEAVE_TYPE,
  EMPLOYEE_TEAM_LIST,
} from "@/api/master";
import { useUserStore } from "@/lib/slices/auth.slice";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import * as Yup from "yup";

const LeaveSchema = Yup.object({
  leave_type: Yup.string(),
});

export default function AddLeave({
  popupOpen,
  setPopupOpen,
  employeeTeamHoliday,
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

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(LeaveSchema),
  });
console.log(user);

  function close() {
    setPopupOpen(false);
    reset();
    setFromDate("");
    setToDate("");
    setDateRange([]);
    setSelectedLeaveType("");
    setLeaveReason("");
    setEmployeeId("");
  }

  const leaveSchedule = [
    { label: "Half Day", value: "half_day" },
    { label: "Full Day", value: "full_day" },
  ];

  const leaveScheduleSection = [
    { label: "First Half", value: "first_half" },
    { label: "Second Half", value: "second_half" },
  ];

  const handleLeaveTypeChange = (selectedOption) => {
    setSelectedLeaveType(selectedOption.value);
  };

  const { data: employeeTeamList = [] } = useQuery({
    queryKey: ["employeeTeamList"],
    queryFn: () => newRequest.get(EMPLOYEE_TEAM_LIST).then((res) => res.data),
  });

  useEffect(() => {
    if (employeeTeamList?.length) {
      const options = employeeTeamList.map((team) => ({
        label: team?.name,
        value: team?.id,
      }));
      setTeamList(options);
    }
  }, [employeeTeamList]);

  const { data: employeeLeaveShift = [] } = useQuery({
    queryKey: ["employeeLeaveShift", fromDate, toDate],
    queryFn: () =>
      newRequest
        .get(EMPLOYEE_LEAVE_SHIFTS, {
          params: { from_date: fromDate, to_date: toDate, employee_id:user?.employee_data?.id },
        })
        .then((res) => res.data),
    enabled: !!fromDate && !!toDate,
  });
console.log(fromDate,toDate);

  useEffect(() => {
    if (employeeLeaveShift?.length) {
      const options = employeeLeaveShift.map((shift) => ({
        label: shift?.shift.name,
        value: shift?.shift.id,
        id: shift?.id,
      }));
      setShiftOptions(options);
    }
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
              .filter(
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
                (type) =>
                  type.already_taked_leaves <
                  Number(type?.emp_no_days),
              )
              .map((type) => ({
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

  const handleShiftSchedule = (selectedOption, index) => {
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
  

  const onSubmit = async () => {
    setLoader(true);

    try {
      // Common form data
      const formData = {
        leave_type_id: selectedLeaveType,
        total_leave_days: dateRange.length,
        leave_periods: dateRange,
        leave_start_date: fromDate,
        leave_end_date: toDate,
        leave_reason: leaveReason,
      };

      if (
        !formData?.leave_type_id ||
        !formData?.total_leave_days ||
        !formData?.leave_reason ||
        !formData?.leave_start_date ||
        !formData?.leave_end_date ||
        formData?.leave_periods.length == 0
      ) {
        return toast.error("mandatory field missing error");
      }

      let apiUrl = EMPLOYEE_LEAVE_REQUEST; // Default API URL
      if (employeeId) {
        apiUrl = EMPLOYEE_TEAM_LEAVE_APPLY;
        formData.employee_id = employeeId; // Add employee_id if available
      }

      // Send POST request
      const res = await newRequest.post(apiUrl, formData, {
        params: { user_id: user?.id },
      });

      // Success message and page reload
      if (res) {
        toast.success(res?.data?.message);
        window.location.reload();
      }
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
                <h1 className="text-md font-bold">Add Leave</h1>
                <button onClick={close}>
                  <X />
                </button>
              </div>
              <form
                className="grid grid-cols-1 gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex gap-2">
                  {employeeTeamHoliday ? (
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
                  ) : (
                    <></>
                  )}

                  <div className="flex w-full flex-col gap-2">
                    <label className="text-sm font-medium">
                      Leave Type
                      {leaveType.length === 0 && (
                        <span style={{ color: "red" }}>
                          [No Leave Available For You]
                        </span>
                      )}
                    </label>
                    <Controller
                      name="leaveType"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={true}
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
                    {dateRange.map((date, index) => {
                      const dateCount = dateRange.filter(
                        (d) => d.date === date.date,
                      ).length; // Count occurrences of the date
                      return (
                        <div
                          key={index}
                          className="mt-4 flex items-center justify-center gap-3 border-t"
                        >
                          {/* Display the date */}
                          <h1 className="mt-4 whitespace-nowrap text-xs font-semibold text-textcolor-darkCharcoal">
                            {date.date}
                          </h1>

                          {/* Shift Selection */}
                          <div className="mt-4 w-full">
                            <Controller
                              name={`additionalShift-${index}`}
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isSearchable={true}
                                  options={shiftOptions}
                                  placeholder="Select Shift"
                                  className="input-box w-full text-black"
                                  onChange={(selectedOption) =>
                                    handleShiftChange(selectedOption, index)
                                  } // Call the handler with index
                                  value={shiftOptions.find(
                                    (option) => option.value === field.value,
                                  )} // Set the current value
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
                                  isSearchable={true}
                                  styles={customSelectStyles}
                                  options={leaveSchedule}
                                  placeholder="Select Leave Type"
                                  className="input-box w-full text-black caret-white"
                                  onChange={(selectedOption) =>
                                    handleShiftSchedule(selectedOption, index)
                                  } // Call the handler with index
                                  value={leaveSchedule.find(
                                    (option) => option.value === field.value,
                                  )} // Set the current value
                                />
                              )}
                            />
                          </div>

                          {/* Conditional Fields for "Half Day" */}
                          {date?.leave_schedule === "half_day" && (
                            <div className="mt-4 w-full">
                              <Controller
                                name={`leave_schedule_section-${index}`}
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    isSearchable={true}
                                    styles={customSelectStyles}
                                    options={leaveScheduleSection}
                                    placeholder="Select Section"
                                    className="input-box w-full text-black caret-white"
                                    onChange={(selectedOption) =>
                                      handleShiftScheduleSection(
                                        selectedOption,
                                        index,
                                      )
                                    } // Call the handler with index
                                    value={leaveScheduleSection.find(
                                      (option) => option.value === field.value,
                                    )} // Set the current value
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
                  <label className="text-sm font-medium">
                    Reason for Leave
                  </label>
                  <textarea
                    className="input-box overflow-y-min h-20 w-full overflow-y-auto pt-2"
                    rows="4"
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
