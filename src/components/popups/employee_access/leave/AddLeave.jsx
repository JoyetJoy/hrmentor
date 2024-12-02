import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

export default function AddLeave({ popupOpen, setPopupOpen }) {
  const [selectedLeaveType, setSelectedLeaveType] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(),
  });

  function close() {
    setPopupOpen(false);
    reset();
    setSelectedLeaveType(null);
  }

  const leaveOptions = [
    { id: 1, label: "Casual Leave", value: "casual" },
    { id: 2, label: "Sick Leave", value: "sick" },
    { id: 3, label: "Loss of Pay", value: "loss" },
    { id: 4, label: "Com-off", value: "Com-off" },
  ];

  const handleLeaveTypeChange = (selectedOption) => {
    setSelectedLeaveType(selectedOption.value);
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
              <form className="grid grid-cols-1 gap-4">
                <div className="flex w-1/2 flex-col gap-2">
                  <label className="text-sm font-medium">Leave Type</label>
                  <Controller
                    name="leaveType"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={true}
                        styles={customSelectStyles}
                        options={leaveOptions}
                        placeholder="Select Leave Type"
                        className="input-box w-full text-black caret-white"
                        onChange={(e) => {
                          field.onChange(e);
                          handleLeaveTypeChange(e);
                        }}
                      />
                    )}
                  />
                  {errors.leaveType && (
                    <span className="text-xs text-red-500">
                      {errors.leaveType?.message}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <div className="flex w-full flex-col gap-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <input
                      type="date"
                      {...register("start_date", { required: true })}
                      className="input-box w-full pr-2"
                    />
                    {errors.start_date && (
                      <span className="text-xs text-red-500">
                        {errors.start_date?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label className="text-sm font-medium">End Date</label>
                    <input
                      type="date"
                      {...register("end_date", { required: true })}
                      className="input-box w-full pr-2"
                    />
                    {errors.end_date && (
                      <span className="text-xs text-red-500">
                        {errors.end_date?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-1/2 flex-col gap-2">
                  <label className="text-sm font-medium">
                    Reason for Leave
                  </label>
                  <textarea
                    {...register("reason", { required: true })}
                    className="input-box overflow-y-min h-20 w-full overflow-y-auto pt-2"
                    rows="4"
                  />
                  {errors.reason && (
                    <span className="text-xs text-red-500">
                      {errors.reason?.message}
                    </span>
                  )}
                </div>
                {selectedLeaveType && (
                  <>
                    <div className="mt-4 flex items-center justify-center gap-3 border-t">
                      <h1 className="mt-4 whitespace-nowrap text-xs font-semibold text-textcolor-darkCharcoal">
                        Thu 21 - Nov 2024
                      </h1>
                      <div className="mt-4 w-full">
                        <Controller
                          name="additionalShift"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable={true}
                              styles={customSelectStyles}
                              placeholder="Select Shift"
                              className="input-box w-full text-black caret-white"
                            />
                          )}
                        />
                        {errors.additionalShift && (
                          <span className="text-xs text-red-500">
                            {errors.additionalShift?.message}
                          </span>
                        )}
                      </div>
                      <div className="mt-4 w-full">
                        <input
                          type="text"
                          {...register("additionalInfo", { required: true })}
                          className="input-box w-full"
                        />
                        {errors.additionalInfo && (
                          <span className="text-xs text-red-500 caret-white">
                            {errors.additionalInfo?.message}
                          </span>
                        )}
                      </div>
                      {selectedLeaveType === "Com-off" && (
                        <>
                          <div className="mt-4 w-full">
                            <input
                              type="text"
                              {...register("comp-off", { required: true })}
                              className="input-box w-full"
                            />
                            {errors.extraField1 && (
                              <span className="text-xs text-red-500">
                                {errors.extraField1?.message}
                              </span>
                            )}
                          </div>
                          <div className="mt-4 w-full">
                            <input
                              type="text"
                              {...register("comp-off", { required: true })}
                              className="input-box w-full"
                            />
                            {errors.extraField2 && (
                              <span className="text-xs text-red-500">
                                {errors.extraField2?.message}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex items-center whitespace-nowrap text-xs font-semibold text-textcolor-darkCharcoal">
                      <h1 className="w-3/5">Total</h1>
                      <h1>1 day</h1>
                    </div>
                  </>
                )}

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
