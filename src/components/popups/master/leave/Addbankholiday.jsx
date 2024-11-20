import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BankHolidaySchema } from "@/schema/dashboard/leave/bankholiday.schema";
import toast from "react-hot-toast";
import { newRequest, TEAM_BANK_HOLIDAY, WORK_LOCATIONS } from "@/api";
import { useUserStore } from "@/lib/slices/auth.slice";
import { date } from "yup";
import moment from "moment";

export default function AddBankHoliday({ popupOpen, setPopupOpen }) {
  const [selectedlocationId, setSelectedlocationId] = useState(null);
  const [percentage, setPercentage] = useState(false);
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);

  // Get user details
  const { user } = useUserStore((state) => ({ user: state.user }));

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

  // Location List API Query
  const {
    isLoading: isWorkLocations,
    data: locationList,
    error,
  } = useQuery({
    queryKey: ["locationList", user?.id],
    queryFn: () =>
      newRequest
        .get(WORK_LOCATIONS, {
          params: { user_id: user?.id },
        })
        .then((res) => res.data),
    enabled: !!user?.id, // Only run if user.id is defined
  });

  const close = () => {
    setPopupOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    handledSubmit(data);
  };

  const handledSubmit = async (data) => {
    try {
      setLoader(true);

      const formData = {
        holiday_name: data.holiday_name,
        date: moment(data.date).format("YYYY-MM-DD"),
        location_id: selectedlocationId,
        type: data.type,
        percentage: Number(data.percentage),
        description: data.description,
      };
      // Make the API call
      const res = await newRequest.post(TEAM_BANK_HOLIDAY, formData);

      toast.success(res?.data?.message);
      queryClient.invalidateQueries(["bankHolidays"]);
      close();
    } catch (error) {
      console.error("Error Details:", error);
      console.error("Error Response Data:", error?.response?.data);

      // Display a specific error message from the server if available
      const errorMessage =
        error?.response?.data?.error || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setLoader(false);
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
                    {...register("holiday_name")}
                    className="input-box"
                  />
                  {errors.holiday_name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.holiday_name.message}
                    </span>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="text-sm font-medium">Date</label>
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
                  <label className="text-sm font-medium">Location</label>
                  <Controller
                    name="location_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable
                        styles={customSelectStyles}
                        options={locationList}
                        placeholder="Select Location"
                        onChange={(selectedOption) => {
                          console.log(
                            selectedOption,
                            "selectedOptionselectedOption",
                          );

                          field.onChange(selectedOption);
                          setSelectedlocationId(selectedOption.id);
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
                        name="type"
                        value="paid"
                        onClick={() => setPercentage(true)}
                        className="radio-black"
                        {...register("type")}
                      />
                      <label className="text-sm font-normal">Paid</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="type"
                        value="unpaid"
                        onClick={() => setPercentage(false)}
                        className="radio-black"
                        {...register("type")}
                      />
                      <label className="text-sm font-normal">Unpaid</label>
                    </div>
                  </div>
                  {errors.type && (
                    <span className="text-xs text-red-500">
                      {errors.type.message}
                    </span>
                  )}
                </div>
                {percentage && (
                  <div>
                    <label className="label-text">Percentage</label>
                    <input
                      autoComplete="off"
                      type="text"
                      placeholder="Enter Percentage"
                      {...register("percentage")}
                      className="input-box"
                    />
                    {errors.percentage && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.percentage.message}
                      </span>
                    )}
                  </div>
                )}

                {/* Description */}
                <div className="mt-2 flex flex-col gap-2">
                  <label>Description</label>
                  <textarea
                    className="h-20 w-full rounded-md border border-[#cecdcd] p-1"
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
