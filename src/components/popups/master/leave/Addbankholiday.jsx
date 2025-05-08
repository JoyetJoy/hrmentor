import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BankHolidaySchema } from "@/schema/dashboard/leave/bankholiday.schema";
import toast from "react-hot-toast";
import { newRequest, TEAM_BANK_HOLIDAY, WORK_LOCATIONS } from "@/api";
import { useUserStore } from "@/lib/slices/auth.slice";
import { date } from "yup";
import moment from "moment";

export default function AddBankHoliday({
  popupOpen,
  setPopupOpen,
  selectedField,
  setSelectedField,
  type
}) {
  const [selectedlocationId, setSelectedlocationId] = useState(null);
  const [percentage, setPercentage] = useState("");
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);

  // Get user details
  const { user } = useUserStore((state) => ({ user: state.user }));

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
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
    setSelectedField(null);
    setPopupOpen(false);
    reset();
  };

  const { data: bankHolidayDetails } = useQuery({
    queryKey: ["bankHolidayDetail", selectedField],
    queryFn: async () => {
      const response = await newRequest.get(
        `${TEAM_BANK_HOLIDAY}/${selectedField}`,
      );
      return response?.data;
    },
    enabled: !!selectedField != 0, // Ensures the query runs only when selectedField is truthy
  });

  useEffect(() => {
    if (bankHolidayDetails) {
      setValue("holiday_name", bankHolidayDetails.leave_name || "");
      setValue("date", bankHolidayDetails.date || "");
      setValue("percentage", bankHolidayDetails.percentage || "");
      setValue("description", bankHolidayDetails.description || "");
      setPercentage(bankHolidayDetails.type || "");
      setSelectedlocationId(
        bankHolidayDetails?.work_location?.location_id || "",
      );
    }
  }, [bankHolidayDetails, setValue]);

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
        type: percentage,
        percentage: Number(data.percentage),
        description: data.description,
      };
      let res;

      if (!formData.location_id) {
        return toast.error("Please Select Location");
      }
      if (!formData.type) {
        return toast.error("Please Select Type");
      }

      if (formData.type === "paid" && !formData.percentage) {
        return toast.error("Percentage is manditory");
      }
      if (selectedField) {
        res = await newRequest.post(
          `${"team-bank-holiday-update"}/${selectedField}`,
          formData,
        );
      } else {
        res = await newRequest.post(TEAM_BANK_HOLIDAY, formData);
      }
      setSelectedField("");
      toast.success(res?.data?.message);
      queryClient.invalidateQueries(["bank_holidays"]);
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
      <div className="overflow-y-min fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-[26rem] rounded bg-white p-10">
            <div className="mb-5 flex justify-between">
              {type==='View' ?
              <h1 className="text-md font-bold">View Bank Holiday</h1>
            :type==='Edit' ?
            <h1 className="text-md font-bold">Edit Bank Holiday</h1>
          : <h1 className="text-md font-bold">Add Bank Holiday</h1>}
              <button onClick={close}>
                <X />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                {/* Holiday Name */}
                <div>
                  <label className="required label-text">Holiday Name</label>
                  <input
                    autoComplete="off"
                    type="text"
                    disabled={type === "View"}
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
                  <label className="required label-text">Date</label>
                  <input
                    type="date"
                    disabled={type === "View"}
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
                  <label className="required label-text">Location</label>
                  <Controller
                    name="location_id"
                    disabled={type === "View"}
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
                          setSelectedlocationId(selectedOption.id);
                        }}
                        className="input-box w-full"
                      />
                    )}
                  />
                  {errors.location_id && (
                    <span className="text-xs text-red-500">
                      {errors.location_id.message}
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
                        disabled={type === "View"}
                        onClick={() => setPercentage("paid")}
                        className="radio-black"
                        checked={percentage === "paid"}
                      />
                      <label className="label-text">Paid</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        disabled={type === "View"}
                        name="type"
                        value="unpaid"
                        onClick={() => setPercentage("unpaid")}
                        className="radio-black"
                        checked={percentage === "unpaid"}
                      />
                      <label className="label-text">Unpaid</label>
                    </div>
                  </div>
                </div>

                {/* Conditionally Render Percentage Input */}
                {percentage === "paid" && (
                  <div>
                    <label className="required label-text">
                      Additional Percentage
                    </label>
                    <input
                      autoComplete="off"
                      type="number"
                      disabled={type === "View"}
                      placeholder="Enter Additional Percentage"
                      {...register("percentage", {
                        required: {
                          value: percentage === "paid",
                          message: "Percentage is required",
                        },
                      })}
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
                  <label className="label-text">Description</label>
                  <textarea
                    className="input-box h-20 w-full rounded-md border border-[#cecdcd] p-1"
                    placeholder="Enter description here..."
                    disabled={type === "View"}
                    {...register("description")}
                  ></textarea>
                  {errors.description && (
                    <span className="text-xs text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                {type !== "View" && (
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
                )}
                
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
