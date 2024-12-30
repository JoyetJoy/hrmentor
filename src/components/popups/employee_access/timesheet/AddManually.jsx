import { newRequest } from "@/api";
import { TIME_SHEET } from "@/api/master";
import { useUserStore } from "@/lib/slices/auth.slice";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from "yup";

const timeSheetSchema = Yup.object({
  clock_out_time: Yup.string().required("Clock Out Time is required"),
  total_working_hour: Yup.string().required("Total Working Hour is required"),
  overtime_hours: Yup.string().required("OverTime is required"),
  start_time: Yup.string().required("Start Time is required"),
  end_time: Yup.string().required("End Time is required"),
  date: Yup.string().required("Date is required"),
  clock_in_time: Yup.string().required("Clock In Time is required"),
  break_duration_minutes: Yup.string(),
});

export default function AddManually({ popupOpen, setPopupOpen }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(timeSheetSchema),
  });

  const { user } = useUserStore((state) => ({ user: state.user }));
  const [loader, setLoader] = useState(false);

  function close() {
    setPopupOpen(false);
    reset();
  }

  console.log(errors, "cdcdc");

  const onSubmit = async (data) => {
    setLoader(true);

    const formatDate = (dateStr, timeStr) => {
      // Parse the date string
      const date = new Date(dateStr);

      // Format the date into the desired output format
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${timeStr}`;

      return formattedDate;
    };

    // Example usage
    const date = data?.date;
    const clock_in_time = formatDate(date, data?.clock_in_time);
    const clock_out_time = formatDate(date, data?.clock_out_time);

    try {
      const formData = {
        total_working_hour: data?.total_working_hour,
        overtime_hours: data?.overtime_hours,
        start_time: data?.start_time,
        end_time: data?.end_time,
        date: data?.date,
        clock_in_time: clock_in_time,
        clock_out_time: clock_out_time,
        break_duration_minutes: data?.break_duration_minutes,
      };

      let apiUrl = TIME_SHEET; // Default API URL
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
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md justify-between rounded bg-white/90 px-12 py-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-lg font-bold leading-7 text-textcolor-darkCharcoal">
                Add Manually
              </h1>
              <button
                onClick={close}
                className="text-xl font-extrabold text-textcolor-darkCharcoal"
              >
                <X />
              </button>
            </div>
            <form
              className="grid grid-cols-1 gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-2 justify-between gap-2">
                <div className="group col-span-2 flex flex-col gap-1">
                  <label className="label-text">Date</label>
                  <input
                    autoComplete="off"
                    type="date"
                    className="input-box pr-2"
                    {...register("date", { required: true })}
                  />
                  {errors.date && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.date?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1">
                  <label className="label-text">Clock in</label>
                  <input
                    autoComplete="off"
                    type="time"
                    className="input-box"
                    {...register("clock_in_time", { required: true })}
                  />
                  {errors.clock_in_time && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.clock_in_time?.message}
                    </span>
                  )}
                </div>{" "}
                <div className="group flex flex-col gap-1">
                  <label className="label-text">Clock out</label>
                  <input
                    autoComplete="off"
                    type="time"
                    className="input-box"
                    {...register("clock_out_time", { required: true })}
                  />
                  {errors.clock_out_time && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.clock_out_time?.message}
                    </span>
                  )}
                </div>
                <div className="group col-span-2 flex flex-col gap-1">
                  <label className="label-text">Total working Hours</label>
                  <input
                    autoComplete="off"
                    type="Number"
                    min={0}
                    className="input-box"
                    {...register("total_working_hour", { required: true })}
                  />
                  {errors.total_working_hour && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.total_working_hour?.message}
                    </span>
                  )}
                </div>
                <div className="group col-span-2 flex flex-col gap-1">
                  <label className="label-text">Overtime</label>
                  <input
                    autoComplete="off"
                    type="number"
                    min={0}
                    className="input-box"
                    {...register("overtime_hours", { required: true })}
                  />
                  {errors.overtime_hours && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.overtime_hours?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1">
                  <label className="label-text">Break Time start</label>
                  <input
                    autoComplete="off"
                    type="time"
                    className="input-box"
                    {...register("start_time", { required: true })}
                  />
                  {errors.start_time && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.start_time?.message}
                    </span>
                  )}
                </div>{" "}
                <div className="group flex flex-col gap-1">
                  <label className="label-text">Break Time End</label>
                  <input
                    autoComplete="off"
                    type="time"
                    className="input-box"
                    {...register("end_time", { required: true })}
                  />
                  {errors.end_time && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.end_time?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-2 my-2 flex items-center gap-2">
                  <p className="w-full border border-b"></p>
                  <p className="text-xs text-textcolor-darkCharcoal">or</p>
                  <p className="border-b-1 w-full border"></p>
                </div>
                <div className="group col-span-2 flex flex-col gap-1">
                  <label className="label-text">Break Time(Duration)</label>
                  <input
                    autoComplete="off"
                    type="number"
                    min={0}
                    className="input-box"
                    {...register("break_duration_minutes", { required: true })}
                  />
                  {errors.break_duration_minutes && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.break_duration_minutes?.message}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex w-full items-center gap-3">
                  <button
                    type="button"
                    onClick={close}
                    className="flex h-11 w-fit min-w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                  >
                    Close
                  </button>
                  <button
                    type="sumbit"
                    className="flex h-11 w-fit min-w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black bg-black text-sm font-semibold text-white focus:outline-none"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
