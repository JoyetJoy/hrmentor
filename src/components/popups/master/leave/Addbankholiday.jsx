import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BankHolidaySchema } from "@/schema/dashboard/leave/bankholiday.schema";
import toast from "react-hot-toast";

export default function AddBankHoliday({ popupOpen, setPopupOpen }) {
  const [selectedlocationId, setSelectedlocationId] = useState(null);
  const [percentage, setPercentage] = useState(true)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(BankHolidaySchema),
  });

  const locationList = [
    { label: "Kochi", value: "kochi" },
    { label: "Kozhikode", value: "kozhikode" },
    { label: "Kannur", value: "kannur" },
  ];

  const close = () => {
    setPopupOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    const formData = {
      shift_id: selectedShiftId,
      ...data,
    };

    console.log(formData);

    try {
      // Simulate API call
      const res = { status: 200 }; // Replace with actual API call
      if (res?.status === 200) {
        toast.success("Saved bank holiday details successfully");

        close();
      } else {
        toast.error("Failed to save holiday.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save holiday.");
    }
  };

  return (
    <Dialog open={popupOpen} as="div" className="relative z-10" onClose={close}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-[26rem] rounded bg-white p-10">
            <div className="mb-5 flex justify-between">
              <h1 className="text-md font-bold">Add Bank Holiday</h1>
              <button onClick={close}>
                <X />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                {/* Holiday Name */}
                <div>
                  <label className="label-text">Holiday Name</label>
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Holiday Name"
                    {...register("name")}
                    className="input-box label-text"
                  />
                  {errors.name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="label-text">Date</label>
                  <input
                    type="date"
                    {...register("date")}
                    className="input-box w-full"
                  />
                  {errors.date && (
                    <span className="text-xs text-red-500">
                      {errors.date.message}
                    </span>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="label-text">Location</label>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable
                        styles={customSelectStyles}
                        options={locationList}
                        placeholder="Select Location"
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setSelectedlocationId(selectedOption.value);
                        }}
                        className="input-box w-full"
                      />
                    )}
                  />
                  {errors.location && (
                    <span className="text-xs text-red-500">
                      {errors.location.message}
                    </span>
                  )}
                </div>

                {/* Holiday Status */}
                <div className="group items-center gap-3 text-[0.85rem]">
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="holiday_status"
                        value="paid"
                        onClick={()=>setPercentage(true)}
                        className="radio-black"
                        {...register("holiday_status")}
                        defaultChecked
                      />
                      <label className="label-text">Paid</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="holiday_status"
                        value="unpaid"
                        onClick={()=>setPercentage(false)}
                        className="radio-black"
                        {...register("holiday_status")}
                      />
                      <label className="label-text">Unpaid</label>
                    </div>
                  </div>
                  {errors.holiday_status && (
                    <span className="text-xs text-red-500">
                      {errors.holiday_status.message}
                    </span>
                  )}
                </div>
                {percentage&&
                    <div>
                        <label className="label-text">Percentage</label>
                        <input
                            autoComplete="off"
                            type="text"
                            placeholder="Enter Percentage"
                            {...register("percentage")}
                            className="input-box label-text"
                        />
                        {errors.percentage && (
                            <span className="text-xs font-medium text-red-500">
                            {errors.percentage.message}
                            </span>
                        )}
                    </div>
                }

                {/* Description */}
                <div className="flex flex-col gap-2 mt-2">
                  <label className="label-text">Description</label>
                  <textarea
                    className="w-full p-1 h-20 border border-[#cecdcd] rounded-md label-text"
                    placeholder="Enter description here..."
                    {...register("description")}
                  ></textarea>
                  {errors.description && (
                    <span className="text-xs text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={close}
                    className="w-full rounded border border-black px-4 py-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full rounded bg-hrmblack px-7 py-3 text-white"
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
