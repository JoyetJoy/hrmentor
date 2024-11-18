import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";

const AdvancedSettings = ({ formtype = "save" }) => {
  const [isOn1, setIsOn1] = useState(false); // For applyDays
  const [isOn4, setIsOn4] = useState(false); // For documentsMandatoryDays

  const advancedSettingsSchema = Yup.object().shape({
    leave: Yup.string().required("This field is required"),
    leaveDaysAllowed: Yup.number().min(0, "Value must be 0 or greater"),
    applyDays: Yup.number()
      .min(0, "Value must be 0 or greater")
      .when("isOn1", {
        is: true,
        then: Yup.number().required(
          "This field is required when toggle is enabled",
        ),
      }),
    daysBeforeLeave: Yup.number().min(0, "Value must be 0 or greater"),
    documentsMandatoryDays: Yup.number()
      .min(0, "Value must be 0 or greater")
      .when("isOn4", {
        is: true,
        then: Yup.number().required(
          "This field is required when toggle is enabled",
        ),
      }),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(advancedSettingsSchema),
    defaultValues: {
      isOn1: false,
      isOn4: false,
    },
  });

  const [loader, setLoader] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [isOn2, setIsOn2] = useState(false);
  const [isOn3, setIsOn3] = useState(false);
  const [isOn5, setIsOn5] = useState(false);
  const [leaveBalance, setLeaveBalance] = useState("dontallow");

  const onSubmit = (data) => {
    console.log("Form data:", data);
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      console.log(
        formtype === "update" ? "Updated successfully!" : "Saved successfully!",
      );
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5">
      <div className="flex w-full flex-row items-center justify-between">
        <h1 className="text-lg font-bold">Advanced Setting</h1>
      </div>

      <div className="mt-5 grid gap-x-3 lg:grid-cols-2">
        <div className="mt-4 flex w-full flex-col gap-5">
          <div className="group flex flex-col text-[0.85rem] font-medium">
            <label htmlFor="leave" className="required label-text">
              What are the leaves that cannot be clubbed with this leave?
            </label>
            <div className="group col-span-2 flex w-full flex-col gap-1.5 py-2 lg:w-[49.5%]">
              <input
                autoComplete="off"
                name="leave"
                type="text"
                placeholder="Leave Type"
                {...register("leave")}
                className="input-box"
              />
              {errors.leave && (
                <span className="text-xs font-medium text-red-500">
                  {errors.leave.message}
                </span>
              )}
            </div>
          </div>
          <div className="group flex flex-col gap-3 text-[0.85rem] font-medium">
            <label className="required label-text">
              How do you want to allow the employee to take leaves after
              exhausting leave balances?
            </label>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="leaveStatus"
                  value="dontallow"
                  onClick={() => setLeaveBalance("dontallow")}
                  className="radio-black"
                  defaultChecked
                />
                <label className="text-sm font-normal">Don’t allow</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="leaveStatus"
                  value="allowwithnegativebalance"
                  onClick={() => setLeaveBalance("allowwithnegativebalance")}
                  className="radio-black"
                />
                <label className="text-sm font-normal">
                  Allow with negative balance
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="leaveStatus"
                  value="allowwithlop"
                  onClick={() => setLeaveBalance("dontallow")}
                  className="radio-black"
                />
                <label className="text-sm font-normal">Allow with LOP</label>
              </div>
            </div>
          </div>
          <div className="group flex flex-col text-[0.85rem] font-medium">
            <p className="required label-text">
              How many consecutive day(s) of leave allowed?
            </p>
            <p className="text-[0.7rem] text-[#7f7f7f]">
              You can apply for any number of consecutive leave without any
              limit.
            </p>
            <div className="group col-span-2 flex w-full flex-col gap-1.5 py-2 lg:w-[49.5%]">
              <label htmlFor="leaveDaysAllowed" className="label-text">
                Days
              </label>
              <input
                autoComplete="off"
                name="leaveDaysAllowed"
                type="number"
                min={0}
                placeholder="0"
                {...register("leaveDaysAllowed")}
                className="input-box"
              />
              {errors.leaveDaysAllowed && (
                <span className="text-xs font-medium text-red-500">
                  {errors.leaveDaysAllowed.message}
                </span>
              )}
            </div>
          </div>
          <div className="group col-span-2 flex flex-col gap-1.5 py-2">
            <div className="flex justify-between">
              <p className="label-text">Allow half day leave</p>
              <div
                onClick={() => {
                  if (isOn) {
                    setIsOn(false);
                  } else {
                    setIsOn(true);
                  }
                }}
                className={`h-5 w-10 rounded-full p-[1px] ${isOn ? "bg-[#8be691] pt-[2.1px]" : "border border-[#888888] bg-white"}`}
              >
                <div
                  className={`h-4 w-4 ${isOn ? "bg-[#00b448]" : "bg-black"} transform rounded-full transition-transform ${
                    isOn ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
          </div>
          <div className="group col-span-2 flex flex-col gap-1.5 py-2">
            <div className="flex justify-between">
              <p className="label-text">
                Allow the employee to apply the leaves which are taken in the
                past
              </p>
              <div
                onClick={() => {
                  if (isOn1) {
                    setIsOn1(false);
                  } else {
                    setIsOn1(true);
                  }
                }}
                className={`h-5 w-10 rounded-full p-[1px] ${isOn1 ? "bg-[#8be691] pt-[2.1px]" : "border border-[#888888] bg-white"}`}
              >
                <div
                  className={`h-4 w-4 ${isOn1 ? "bg-[#00b448]" : "bg-black"} transform rounded-full transition-transform ${
                    isOn1 ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
          </div>
          {isOn1 && (
            <div className="group flex flex-col text-[0.85rem] font-medium">
              <p className="required label-text">
                Within how many days they should apply?
              </p>
              <p className="text-[0.7rem] text-[#7f7f7f]">
                You can apply for past leave anytime, except when a pay run has
                been submitted for the current or next month.
              </p>
              <div className="group col-span-2 flex w-full flex-col gap-1.5 py-2 lg:w-[49.5%]">
                <label htmlFor="applyDays" className="label-text">
                  Days
                </label>
                <input
                  autoComplete="off"
                  name="applyDays"
                  type="number"
                  min={0}
                  placeholder="0"
                  {...register("applyDays")}
                  className="input-box"
                />
                {errors.applyDays && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.applyDays.message}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="group col-span-2 flex flex-col gap-1.5 py-2">
            <div className="flex justify-between">
              <p className="label-text">
                Do you want to consider the holidays as leaves which falls in
                between leaves?
              </p>
              <div
                onClick={() => {
                  if (isOn2) {
                    setIsOn2(false);
                  } else {
                    setIsOn2(true);
                  }
                }}
                className={`h-5 w-10 rounded-full p-[1px] ${isOn2 ? "bg-[#8be691] pt-[2.1px]" : "border border-[#888888] bg-white"}`}
              >
                <div
                  className={`h-4 w-4 ${isOn2 ? "bg-[#00b448]" : "bg-black"} transform rounded-full transition-transform ${
                    isOn2 ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
          </div>
          <div className="group col-span-2 flex flex-col gap-1.5 py-2">
            <div className="flex justify-between">
              <p className="label-text">
                Do you want to consider the weekends as leaves which falls in
                between leaves?
              </p>
              <div
                onClick={() => {
                  if (isOn3) {
                    setIsOn3(false);
                  } else {
                    setIsOn3(true);
                  }
                }}
                className={`h-5 w-10 rounded-full p-[1px] ${isOn3 ? "bg-[#8be691] pt-[2.1px]" : "border border-[#888888] bg-white"}`}
              >
                <div
                  className={`h-4 w-4 ${isOn3 ? "bg-[#00b448]" : "bg-black"} transform rounded-full transition-transform ${
                    isOn3 ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
          </div>

          <div className="group flex flex-col text-[0.85rem] font-medium">
            <p className="required label-text">
              How many days before the leave application needs to be submitted?
            </p>
            <p className="text-[0.7rem] text-[#7f7f7f]">
              You can apply for this leave anytime, except when a pay run is
              submitted for the current or next month.
            </p>
            <div className="group col-span-2 flex w-full flex-col gap-1.5 py-2 lg:w-[49.5%]">
              <label htmlFor="daysBeforeLeave" className="label-text">
                Days
              </label>
              <input
                autoComplete="off"
                name="daysBeforeLeave"
                type="number"
                placeholder="0"
                {...register("daysBeforeLeave")}
                className="input-box"
              />
              {errors.daysBeforeLeave && (
                <span className="text-xs font-medium text-red-500">
                  {errors.daysBeforeLeave.message}
                </span>
              )}
            </div>
          </div>
          <div className="group col-span-2 flex flex-col gap-1.5 py-2">
            <div className="flex justify-between">
              <p className="label-text">
                Allow the employees to apply for this leave with supporting
                documents?
              </p>
              <div
                onClick={() => {
                  if (isOn4) {
                    setIsOn4(false);
                  } else {
                    setIsOn4(true);
                  }
                }}
                className={`h-5 w-10 rounded-full p-[1px] ${isOn4 ? "bg-[#8be691] pt-[2.1px]" : "border border-[#888888] bg-white"}`}
              >
                <div
                  className={`h-4 w-4 ${isOn4 ? "bg-[#00b448]" : "bg-black"} transform rounded-full transition-transform ${
                    isOn4 ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
          </div>
          {isOn4 && (
            <div className="group flex flex-col text-[0.85rem] font-medium">
              <p className="required label-text">
                For how many day(s) of leave, the supporting documents
                submission is mandatory?
              </p>
              <p className="text-[0.7rem] text-[#7f7f7f]">
                Uploading documents is non-mandatory
              </p>
              <div className="group col-span-2 flex w-full flex-col gap-1.5 py-2 lg:w-[49.5%]">
                <label htmlFor="documentsMandatoryDays" className="label-text">
                  Days
                </label>
                <input
                  autoComplete="off"
                  name="documentsMandatoryDays"
                  type="number"
                  min={0}
                  placeholder="0"
                  {...register("documentsMandatoryDays")}
                  className="input-box"
                />
                {errors.documentsMandatoryDays && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.documentsMandatoryDays.message}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="group col-span-2 flex flex-col gap-1.5 py-2">
            <div className="flex justify-between">
              <p className="label-text">
                During notice period does employee allowed to take this leave?
              </p>
              <div
                onClick={() => {
                  if (isOn5) {
                    setIsOn5(false);
                  } else {
                    setIsOn5(true);
                  }
                }}
                className={`h-5 w-10 rounded-full p-[1px] ${isOn5 ? "bg-[#8be691] pt-[2.1px]" : "border border-[#888888] bg-white"}`}
              >
                <div
                  className={`h-4 w-4 ${isOn5 ? "bg-[#00b448]" : "bg-black"} transform rounded-full transition-transform ${
                    isOn5 ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-end gap-4">
            <button
              type="button"
              className="btn flex h-10 min-h-10 min-w-[10rem] items-center border border-gray-400 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => console.log("Cancel clicked")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn flex h-10 min-h-10 min-w-[10rem] items-center bg-hrmblack text-sm font-medium text-white transition-all duration-500 hover:bg-hrmdarkblue/70"
            >
              {loader ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  {formtype === "update" ? "Updating" : "Saving"}
                </div>
              ) : (
                <>{formtype === "update" ? "Update" : "Save"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdvancedSettings;
