import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { customSelectStyles } from "@/utils/customStyles";
import Select from "react-select";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { EMPLOYEE_LEAVE_TYPE } from "@/api/master";
import { newRequest } from "@/api";

// ✅ Validation Schema
const schema = yup.object().shape({
  checkIn: yup
    .string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)")
    .required("Check-in time is required"),
  checkOut: yup
    .string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)")
    .required("Check-out time is required"),
  remarks: yup.string().optional(),
});

const AddEntryModal = ({
  addEntry,
  setAddEntry,
  type,
  entry,
  setEntry,
}) => {
  const close = () => {
    setAddEntry(false);
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver( schema),
  });

  const { data } = useQuery({
    queryKey: ["leavetype"],
    queryFn: () =>
      newRequest
        .get(
          EMPLOYEE_LEAVE_TYPE,
        )
        .then((res) => res.data),
  });

  useEffect(() => {
    if (type === "Edit") {
        setValue("checkIn", entry?.clockIn);
        setValue("checkOut", entry?.clockOut);
        setValue("remarks", entry?.remarks || " ");
    }
  }, [addEntry,type]);

  // ✅ Handle Form Submission
  const onSubmit = (data) => {
      setEntry( {
        clockIn: data?.checkIn,
        clockOut: data?.checkOut,
        remarks: data?.remarks || "",
      })
    reset();
    close();
  };

  const formatTime = (input) => {
    let value = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    // Format input as HH:MM
    if (value.length >= 3) {
      value = value.slice(0, 2) + ":" + value.slice(2, 4); // Insert colon
    }

    return value;
  };

  return (
    <Dialog open={addEntry} as="div" className="relative z-30" onClose={close}>
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-30 flex items-center justify-center p-5">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white shadow-lg">
          {/* Header */}
          <div className="flex justify-between rounded-t-xl bg-[#dadae4] px-6 py-4">
            <p className="text-lg font-semibold text-[#555c5f]">
              {" "}
              {type === "Edit" ? "Edit Entry" : `Add ${type}`}
            </p>
            <button
              onClick={close}
              className="text-lg font-extrabold text-[#555c5f]"
            >
              <X />
            </button>
          </div>

          {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 space-y-4 px-6 py-4"
            >
              {/* ✅ Check-in Time */}
              <div className="flex gap-4 w-full">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Clock-in Time
                  </label>
                  <input
                    type="text"
                    {...register("checkIn")}
                    onChange={(e) => {
                      e.target.value = formatTime(e.target.value); // Call the helper function
                    }}
                    className="mt-1 w-full rounded-md border p-2 text-sm"
                    placeholder="Enter time (HH:mm)"
                  />
                  {errors.checkIn && (
                    <p className="text-xs text-red-500">
                      {errors.checkIn.message}
                    </p>
                  )}
                </div>

                {/* ✅ Check-out Time */}
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Clock-out Time
                  </label>
                  <input
                    type="text"
                    {...register("checkOut")}
                    onChange={(e) => {
                      e.target.value = formatTime(e.target.value); // Call the helper function
                    }}
                    className="mt-1 w-full rounded-md border p-2 text-sm"
                    placeholder="Enter time (HH:MM)"
                  />
                  {errors.checkOut && (
                    <p className="text-xs text-red-500">
                      {errors.checkOut.message}
                    </p>
                  )}
                </div>
              </div>
              {/* ✅ Remarks */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Remarks
                </label>
                <textarea
                  {...register("remarks")}
                  className="mt-1 w-full rounded-md border p-2"
                  rows="3"
                  placeholder="Optional"
                ></textarea>
                {errors.remarks && (
                  <p className="text-xs text-red-500">
                    {errors.remarks.message}
                  </p>
                )}
              </div>

              {/* ✅ Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="w-full rounded-md bg-gray-500 px-3 py-2 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-700 px-3 py-2 text-white"
                >
                  Save
                </button>
              </div>
            </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AddEntryModal;
