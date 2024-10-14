import MenuHeader from "@/components/common/MenuHeader";
import QueryTable from "@/components/table/QueryTable";
import { ShiftSchema } from "@/schema/dashboard/masters/shift.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Select } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function SaveMasterShift({ formtype }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "on",
    reValidateMode: "onChange",
    resolver: yupResolver(ShiftSchema),
  });

  const onSubmit = (data) => {
    setLoader(true);
    handleShift(data);
  };
  const handleShift = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("start_time", data.start_time);
    formData.append("end_time", data.end_time);
    formData.append("shift_duration", data.shift_duration);
    formData.append("people_required", data.people_required);
    formData.append("department_id", data.department_id?.id);
    formData.append("work_id", data.work_id?.id);
    formData.append("location_id", data.location_id?.id);
    formData.append("calculation_type", data.calculation_type);
    formData.append("fullday", data.fullday);
    formData.append("fulltolerence", data.fulltolerence);
    formData.append("halfday", data.halfday);
    formData.append("halfdaytolerence", data.halfdaytolerence);
    formData.append("recur_pattern", data.recur_pattern);
    formData.append("week_def", data.week_def);
  };
  // GET DETAILS IN SHIFT
  const { data: shiftDetails, isLoading } = useQuery({
    queryKey: ["shiftDetails", formtype],
    queryFn: () =>
      newRequest.get(`${SHIFT}`).then((res) => {
        return res.data;
      }),
    enabled: formtype == "update",
  });

  const columns = React.useMemo(
    () => [
      {
        header: "Employee Type Name",
        accessorKey: "employee_type_name",
        cell: ({ row }) => row.index + 1,
      },
      {
        header: "Pay Mode",
        accessorKey: "pay_mode",
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
              className="flex size-7 cursor-pointer items-center rounded-full bg-[#EBEBF0] p-2"
            >
              <img
                src="/assets/icons/admin/marker.svg"
                className="w-full object-contain"
                alt="Edit"
              />
            </button>
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

  const data = [
    { sno: 1, details: "vmffsdsddg" },
    { sno: 2, details: "fdgdsdfh" },
  ];
  return (
    <>
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
                    {...register("duration", { required: true })}
                    autoComplete="off"
                    type="text"
                    className="input-box"
                  />
                  {errors.duration && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.duration?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">People Required</label>
                  <input
                    {...register("people_required", { required: true })}
                    autoComplete="off"
                    type="text"
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
                    name="department"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        placeholder="Select Department"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.department && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.department?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Work Area</label>
                  <Controller
                    name="work_area"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        placeholder="Select Work Area"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.work_area && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.work_area?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5 px-3 py-2">
                  <label className="required label-text">Work Location</label>
                  <Controller
                    name="location"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        placeholder="Select Location"
                        className="input-box"
                      />
                    )}
                  />
                  {errors.location && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.location?.message}
                    </span>
                  )}
                </div>
              </div>
              <hr className="my-4" />
              <div className="my-1 flex w-full items-center justify-between ">
                <h1 className="text-lg font-bold">Break Time</h1>
                <div className="flex items-center gap-3">
                  <Link
                    to="/admin/setup/add-shift"
                    className="flex w-fit items-center justify-center gap-2 rounded-md bg-hrmprimaryorange px-5 py-2.5 text-sm font-medium text-white focus:outline-none data-[hover]:bg-[#030E5C]/70"
                  >
                    <Plus className="size-4" />
                    Add Shift
                  </Link>
                </div>
              </div>
              <QueryTable
                columns={columns}
                list={data}
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
                      <input type="radio" defaultChecked />
                      <label className="text-sm font-normal">Per day</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" />
                      <label className="text-sm font-normal">Per Hour</label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs">Minimum hours required for</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Full day*"
                      className="input-box required placeholder:text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Full day Tolerance*"
                      className="input-box required placeholder:text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Half day*"
                      className="input-box required placeholder:text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Half day Tolerance*"
                      className="input-box required placeholder:text-xs"
                    />
                  </div>
                  <p className="mt-3 border-l-4 border-hrmprimaryorange bg-[#FFECE7] py-3 pl-3 text-xs font-normal text-[#525252]">
                    Employee must reach the minimum hours required to qualify
                    themselves as full day or half day present
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 px-3 py-3">
                <div className="flex items-center gap-14">
                  <h1 className="text-sm font-semibold">Recurrence pattern</h1>
                  <div className="flex items-center gap-7">
                    <div className="flex items-center gap-2">
                      <input type="radio" />
                      <label className="text-sm font-normal">Per day</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" />
                      <label className="text-sm font-normal">Per Hour</label>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#A1A1A1]">
                  This shift occurs every single day, and no weekend is defined.
                </p>
              </div>
              <div className="flex flex-col gap-5 px-3 py-3">
                <div className="flex items-center gap-14">
                  <h1 className="text-sm font-semibold">Weekend definition</h1>
                  <div className="flex items-center gap-7">
                    <div className="flex items-center gap-2">
                      <input type="radio" />
                      <label className="text-sm font-normal">
                        Based on calender settings
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" />
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
            </div>
          </div>
        </form>
      </>
    </>
  );
}
