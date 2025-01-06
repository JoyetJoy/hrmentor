import { BreakTimeSchema } from "@/schema/dashboard/masters/shift.schema";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export default function BreakTime({
  popupOpen,
  setPopupOpen,
  selectedField,
  formtype,
  setNew_break,
  new_break,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(BreakTimeSchema),
  });

  const onSubmit = async (data) => {
    if (!data.start_time && !data.time) {
      setError("time", {
        type: "manual",
        message: "Either duration or start and end time should be provided",
      });
    } else {
      await handleShift(data);
      close();
    }
  };

  const handleShift = async (data) => {
    const formData = {
      id: uuidv4(),
      type_name: data.type_name,
      start_time: data.start_time,
      end_time: data.end_time,
      pay_node: data.pay_node,
      time: data.time,
    };

    console.log(formData);

    try {
      if (formData) {
        setNew_break((prevtime) => [...prevtime, formData]);
      }
      toast.success("Saved break time successfully");
      setPopupOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to break time.");
    }
  };

  function close() {
    setPopupOpen(false);
    reset();
  }

  const formatTime = (input) => {
    let value = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    // Format input as HH:MM
    if (value.length >= 3) {
      value = value.slice(0, 2) + ":" + value.slice(2, 4); // Insert colon
    }

    return value;
  };

  return (
    <Dialog
      open={popupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-sm rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                Add Break Time
              </h1>
              <button
                onClick={close}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>
            <form
              className="grid grid-cols-1 gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Type Name */}
              <div className="group flex flex-col space-y-1">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Name
                </label>
                <input
                  {...register("type_name", { required: "Name is required" })}
                  type="text"
                  className="input-box h-10 w-full"
                />
                {errors.type_name && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.type_name.message}
                  </span>
                )}
              </div>

              {/* Pay Mode */}
              <div className="group flex flex-col space-y-1">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Pay Mode
                </label>
                <select
                  {...register("pay_node", {
                    required: "Pay mode is required",
                  })}
                  className="input-box h-10 w-full"
                >
                  <option value="">Select pay mode</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
                {errors.pay_node && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.pay_node.message}
                  </span>
                )}
              </div>

              {/* Time Duration (HH:MM) */}
              <div className="group flex flex-col space-y-1">
                <label className="label-text" htmlFor="time">
                  Break Time (Duration)
                </label>
                <input
                  {...register("time", {
                    required: "Time is required",
                    pattern: {
                      value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                      message: "Please enter a valid time format (HH:MM)",
                    },
                  })}
                  id="time"
                  autoComplete="off"
                  name="time"
                  type="text"
                  placeholder="hh:mm"
                  className="input-box"
                  onChange={(e) => {
                    e.target.value = formatTime(e.target.value); // Call the helper function
                  }}
                />
                {errors.time && (
                  <span className="whitespace-nowrap text-xs font-medium text-red-500">
                    {errors.time?.message}
                  </span>
                )}
              </div>

              {/* OR between Time Input and Time Pickers */}
              <div className="flex items-center space-x-2">
                <hr className="flex-grow border-t-2 border-gray-300" />
                <p className="text-gray-500">or</p>
                <hr className="flex-grow border-t-2 border-gray-300" />
              </div>

              {/* Start Time and End Time (Only visible if 'time' is not provided) */}
              {!new_break.time && (
                <div className="gap flex items-center justify-center gap-2">
                  <div className="group flex w-full flex-col gap-1.5 py-2">
                    <label className="required label-text">Start Time</label>
                    <input
                      {...register("start_time")}
                      autoComplete="off"
                      // type="time"
                      placeholder="hh:mm"
                      className="input-box pr-2"
                    />
                    {errors.start_time && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.start_time?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex w-full flex-col gap-1.5 py-2">
                    <label className="required label-text">End Time</label>
                    <input
                      {...register("end_time", { required: true })}
                      autoComplete="off"
                      // type="time"
                      placeholder="hh:mm"
                      className="input-box pr-2"
                    />
                    {errors.end_time && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.end_time?.message}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-2 flex flex-row items-end justify-end gap-3">
                <button
                  type="submit"
                  className="flex h-11 w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmprimaryorange text-sm font-normal text-white focus:outline-none"
                >
                  <span>Save</span>
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
