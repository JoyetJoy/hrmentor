import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

export default function AddLeave({ popupOpen, setPopupOpen }) {
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
  }
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
            <DialogPanel className="w-full max-w-2xl rounded bg-white px-10 py-10">
              <div className="mb-5 flex justify-between">
                <h1 className="text-md font-bold">Add Leave</h1>
                <button onClick={close}>
                  <X />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <form>
                  <div className="flex w-1/2 flex-col gap-4">
                    <div>
                      <label className="text-sm font-medium">Leave Type</label>
                      <Controller
                        name="shift"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable={true}
                            styles={customSelectStyles}
                            placeholder="Select Shift"
                            className="input-box w-full text-black"
                          />
                        )}
                      />
                      {errors.shift && (
                        <span className="text-xs text-red-500">
                          {errors.shift?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="gap flex gap-2">
                    <div className="w-full">
                      <label className="text-sm font-medium">Start Date</label>
                      <input
                        type="date"
                        {...register("start_date", { required: true })}
                        className="input-box w-full"
                      />
                      {errors.start_date && (
                        <span className="text-xs text-red-500">
                          {errors.start_date?.message}
                        </span>
                      )}
                    </div>
                    <div className="w-full">
                      <label className="text-sm font-medium">End Date</label>
                      <input
                        type="date"
                        {...register("end_date", { required: true })}
                        className="input-box w-full"
                      />
                      {errors.end_date && (
                        <span className="text-xs text-red-500">
                          {errors.end_date?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2">
                    <label className="text-sm font-medium">
                      Reason for leave
                    </label>
                    <input
                      type="text"
                      {...register("end_date", { required: true })}
                      className="input-box h-20 w-full"
                    />
                    {errors.end_date && (
                      <span className="text-xs text-red-500">
                        {errors.end_date?.message}
                      </span>
                    )}
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
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
