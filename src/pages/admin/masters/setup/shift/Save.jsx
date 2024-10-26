import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import toast from "react-hot-toast";
import { ShiftSchema } from "@/schema/dashboard/masters/shift.schema";
import { newFormRequest, newRequest, XFormRequest } from "@/api";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import QueryTable from "@/components/table/QueryTable";
import BreakTime from "@/components/popups/master/shift/BreakTime";
import MenuHeader from "@/components/common/MenuHeader";
import { ChevronRight, Plus, Trash2 } from "lucide-react";
import { customSelectStyles } from "@/utils/customStyles";
import {
  EMPLOYEE_DEPARTMENT_LIST,
  EMPLOYEE_WORK_AREA,
  EMPLOYEE_WORK_LOCATION_LIST,
} from "@/api/master";
import { SHIFT_BREAK_TIME, SHIFT_LIST } from "@/api/setup";

export default function SaveMasterShift({ formtype, sid }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [loader, setLoader] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [workArea, setWorkArea] = useState([]);
  const [break_time, setBreak_time] = useState([]);
  const [keyword, setKeyword] = useState("");

  const queryClient = useQueryClient();

  const handleCreate = () => {
    setPopupOpen(true);
  };

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
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "type_name",
        cell: ({ row }) => row.index + 1,
      },
      {
        header: "Pay Mode",
        accessorKey: "pay_node",
        cell: ({ row }) => row.original.details || "N/A",
      },
      {
        header: "Start Time",
        accessorKey: "start_time",
        cell: ({ row }) => row.original.details || "N/A",
      },
      {
        header: "End Time",
        accessorKey: "end_time",
        cell: ({ row }) => row.original.details || "N/A",
      },
      {
        header: "Duration",
        accessorKey: "duration",
        cell: ({ row }) => row.original.details || "N/A",
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  // Watch form fields
  const calculationType = watch("calculation_type", "perday");
  const recurrencePattern = watch("recur_pattern", "daily");
  const WeekEnd = watch("week_def", "basedoncalender");

  const { data: shiftDetails, isLoading } = useQuery({
    queryKey: ["shiftDetails", sid, formtype],
    queryFn: () =>
      newRequest.get(`${SHIFT_LIST}/${sid}`).then((res) => res.data),
    enabled: formtype == "update",
  });

  const { data: shiftbreaktime = { data: [], last_page: 1 } } = useQuery({
    queryKey: ["shiftbreaktime", currentPage, keyword],
    queryFn: () =>
      newRequest
        .get(SHIFT_BREAK_TIME, {
          params: {
            search: keyword,
            page: currentPage,
            per_limit: pageLimit,
          },
        })
        .then((res) => {
          return res?.data || { data: [], last_page: 1 };
        }),
  });

  useEffect(() => {
    if (shiftbreaktime) {
      setTotalPages(shiftbreaktime?.last_page);
    }
  }, [shiftbreaktime]);

  const data = [
    { sno: 1, details: "vmffsdsddg" },
    { sno: 2, details: "fdgdsdfh" },
  ];
  const onSubmit = async (data) => {
    setLoader(true);
    handleShift(data);
  };
  const handleShift = async (data) => {
    console.log(ShiftSchema);

    const formdata = {
      name: data.name,
      start_time: data.start_time,
      end_time: data.end_time,
      shift_duration: data.shift_duration,
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
      break_time: break_time,
    };
    console.log(formdata);

    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("start_time", data.start_time);
    // formData.append("end_time", data.end_time);
    // formData.append("shift_duration", data.shift_duration);
    // formData.append("people_required", data.people_required);
    // formData.append("department_id", data.department_id?.id);
    // formData.append("work_id", data.work_id?.id);
    // formData.append("location_id", data.location_id?.id);
    // formData.append("calculation_type", data.calculation_type);
    // formData.append("fullday", data.fullday);
    // formData.append("fulltolerence", data.fulltolerence);
    // formData.append("halfday", data.halfday);
    // formData.append("halfdaytolerence", data.halfdaytolerence);
    // formData.append("recur_pattern", data.recur_pattern);
    // formData.append("week_def", data.week_def);
    // console.log(formData);
    try {
      let res;

      // res = await newFormRequest.post(SHIFT_LIST, formData);

      console.log(res);

      if (res?.status === 201) {
        toast.success("Saved shift details successfully");
        queryClient.invalidateQueries(["shiftDetails"]);
        reset();
        setLoader(false);
        formtype === "save"
          ? navigate("/admin/setup/shift")
          : window.location.reload();
      } else {
        toast.error("Failed to save employee.");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save employee.");
      setLoader(false);
    }
  };

  useEffect(() => {
    if (shiftDetails) {
      setValue("name", shiftDetails?.data?.name);
      setValue("department_id", shiftDetails?.data?.department_id);
      setValue("work_id", shiftDetails?.data?.work_id);
      setValue("location_id", shiftDetails?.data?.location_id);
      setValue("start_time", shiftDetails?.data?.start_time);
      setValue("end_time", shiftDetails?.data?.end_time);
      setValue("shift_duration", shiftDetails?.data?.shift_duration);
      setValue("people_required", shiftDetails?.data?.people_required);
      setValue("calculation_type", shiftDetails?.data?.calculation_type);
      setValue("fullday", shiftDetails?.data?.fullday);
      setValue("fulltolerence", shiftDetails?.data?.fulltolerence);
      setValue("halfday", shiftDetails?.data?.halfday);
      setValue("halfdaytolerence", shiftDetails?.data?.halfdaytolerence);
      setValue("recur_pattern", shiftDetails?.data?.recur_pattern);
      setValue("status", shiftDetails?.data?.status);
      setValue("week_def", shiftDetails?.data?.week_def);
      setValue("weekly_shifts", shiftDetails?.data?.weekly_shifts);
      setValue("people_count", shiftDetails?.data?.people_count);
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
      console.log(formattedWorkArea);
    }
  }, [workAreaList]);

  console.log(workArea);

  return (
    <>
      <BreakTime
        popupOpen={popupOpen}
        setPopupOpen={setPopupOpen}
        break_time={break_time}
        setBreak_time={setBreak_time}
      />
      <MenuHeader
        menu="Menu"
        subMenu="Setup"
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
                className="btn flex h-10 min-h-10 min-w-24 items-center bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-[#030E5C]/70"
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
          <div className="grid gap-x-3 py-2 lg:grid-cols-2">
            <div
              className={`flex flex-col gap-3 rounded-md border border-gray-300 bg-white py-4 ${formtype === "update" ? "px-2" : "px-5"}`}
            >
              <div className="mt-4 grid w-full lg:grid-cols-2">
                <div className="group col-span-2 flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Name</label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="name"
                    placeholder="Enter Name"
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
                  <input
                    {...register("shift_duration", { required: true })}
                    autoComplete="off"
                    type="text"
                    name="shift_duration"
                    className="input-box"
                  />
                  {errors.shift_duration && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.shift_duration?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">People Required</label>
                  <input
                    {...register("people_required", { required: true })}
                    autoComplete="off"
                    type="text"
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
              <hr className="my-4 border-[#A7A7A7]" />
              <div className="my-1 flex w-full items-center justify-between">
                <h1 className="text-lg font-bold">Break Time</h1>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCreate}
                    className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-[#030E5C]/70"
                  >
                    <Plus className="size-4" />
                    Add Break Time
                  </button>
                </div>
              </div>
              <QueryTable
                columns={columns}
                list={shiftbreaktime?.data?.original?.data || []}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
            <div
              className={`flex flex-col rounded-md border border-gray-300 bg-white py-4 ${formtype === "update" ? "px-2" : "px-5"}`}
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
                    <p className="text-xs">Minimum hours required for</p>
                    <div className="flex items-center gap-2">
                      <div className="flex w-full flex-col">
                        <input
                          {...register("fullday", { required: true })}
                          autoComplete="off"
                          type="text"
                          name="fullday"
                          placeholder="Full day*"
                          className="input-box required placeholder:text-xs"
                        />
                        {errors.fullday && (
                          <span className="whitespace-nowrap text-xs font-medium text-red-500">
                            {errors.fullday?.message}
                          </span>
                        )}
                      </div>
                      <div className="flex w-full flex-col">
                        <input
                          {...register("fulltolerence", { required: true })}
                          autoComplete="off"
                          type="text"
                          name="fulltolerence"
                          placeholder="Full day Tolerance*"
                          className="input-box required placeholder:text-xs"
                        />
                        {errors.fulltolerence && (
                          <span className="whitespace-nowrap text-xs font-medium text-red-500">
                            {errors.fulltolerence?.message}
                          </span>
                        )}
                      </div>
                      <div className="flex w-full flex-col">
                        <input
                          {...register("halfday", { required: true })}
                          autoComplete="off"
                          type="text"
                          name="halfday"
                          placeholder="Half day*"
                          className="input-box required placeholder:text-xs"
                        />
                        {errors.halfday && (
                          <span className="whitespace-nowrap text-xs font-medium text-red-500">
                            {errors.halfday?.message}
                          </span>
                        )}
                      </div>
                      <div className="flex w-full flex-col">
                        <input
                          {...register("halfdaytolerence", { required: true })}
                          autoComplete="off"
                          type="text"
                          name="halfdaytolerence"
                          placeholder="Half day Tolerance*"
                          className="input-box required placeholder:text-xs"
                        />
                        {errors.halfdaytolerence && (
                          <span className="whitespace-nowrap text-xs font-medium text-red-500">
                            {errors.halfdaytolerence?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mt-3 border-l-4 border-hrmprimaryorange bg-[#FFECE7] py-3 pl-3 text-xs font-normal text-[#525252]">
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

                <p className="text-sm text-[#A1A1A1]">
                  This shift occurs every single day, and no weekend is defined.
                </p>
                {recurrencePattern === "weekly" && (
                  <div className="grid h-8 grid-cols-7 overflow-hidden rounded-md border">
                    <h1 className="border-r px-2 py-2 text-start text-xs text-black">
                      SUN
                    </h1>
                    <h1 className="border-r px-2 py-2 text-start text-xs text-black">
                      MON
                    </h1>{" "}
                    <h1 className="border-r px-2 py-2 text-start text-xs text-black">
                      TUE
                    </h1>{" "}
                    <h1 className="border-r px-2 py-2 text-start text-xs text-black">
                      WED
                    </h1>{" "}
                    <h1 className="border-r px-2 py-2 text-start text-xs text-black">
                      THE
                    </h1>{" "}
                    <h1 className="border-r px-2 py-2 text-start text-xs text-black">
                      FRI
                    </h1>{" "}
                    <h1 className="px-2 py-2 text-start text-xs text-black">
                      SAT
                    </h1>
                  </div>
                )}
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
                        value="shiftsettings"
                        {...register("week_def", { required: true })}
                        defaultChecked={WeekEnd === "weekly"}
                      />
                      <label className="text-sm font-normal">
                        Based on shift setting
                      </label>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#A1A1A1]">
                  Calendar-based weekend definition will be considered
                </p>
              </div>
              {recurrencePattern === "weekly" && (
                <div className="mt-4">
                  <h3 className="mb-2 text-sm font-semibold">
                    People Required
                  </h3>
                  <div className="grid h-8 grid-cols-7 overflow-hidden rounded-md border">
                    <h1 className="border-r bg-hrmprimaryorange px-2 py-2 text-start text-xs text-white">
                      SUN
                    </h1>
                    <h1 className="border-r bg-hrmprimaryorange px-2 py-2 text-start text-xs text-white">
                      MON
                    </h1>{" "}
                    <h1 className="border-r px-2 py-2 text-start text-xs text-black">
                      TUE
                    </h1>{" "}
                    <h1 className="border-r px-2 py-2 text-start text-xs text-black">
                      WED
                    </h1>{" "}
                    <h1 className="border-r px-2 py-2 text-start text-xs text-black">
                      THE
                    </h1>{" "}
                    <h1 className="border-r px-2 py-2 text-start text-xs text-black">
                      FRI
                    </h1>{" "}
                    <h1 className="px-2 py-2 text-start text-xs text-black">
                      SAT
                    </h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </>
    </>
  );
}
