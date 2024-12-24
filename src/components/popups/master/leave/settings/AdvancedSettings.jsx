import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { HOLIDAY_ADVANCE_SETTINGS, newRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useUserStore } from "@/lib/slices/auth.slice";

const AdvancedSettings = ({ formtype = "save" }) => {
  const [isOn1, setIsOn1] = useState(false); // For applyDays
  const [isOn4, setIsOn4] = useState(false); // For documentsMandatoryDays
  const { user } = useUserStore((state) => ({ user: state.user }));
  const navigate = useNavigate();

  const getStoredData = () => {
    const storedData = localStorage.getItem("myData");
    return storedData ? JSON.parse(storedData) : null; // Parse only if storedData exists
  };

  const storedData = getStoredData();
  const { id: routeId } = useParams(); // Use `routeId` to avoid naming conflicts
  const [searchParams] = useSearchParams();

  // Determine `id` with priority: searchParams -> routeId -> storedData
  const id = searchParams.get("id") || routeId || storedData?.id || null;

  const advancedSettingsSchema = Yup.object().shape({
    leave_type: Yup.string(),
    leave_balance: Yup.string(),
    consecutive_leave_allow: Yup.number(),
    half_day_leave: Yup.string(),
    taken_past_leave: Yup.string(),
    taken_past_leave_days: Yup.number(),
    holiday_leaves: Yup.string(),
    weekend_leaves: Yup.string(),
    before_leave_apply: Yup.number(),
    support_documents: Yup.string(),
    support_document_leave: Yup.number(),
    notice_period_leave: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
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
  const [leaveBalance, setLeaveBalance] = useState();

  const close = () => {
    reset();
  };

  const { data: AdvanceholidayDetails } = useQuery({
    queryKey: ["AdvanceholidayDetails", user?.id, id],
    queryFn: () =>
      newRequest
        .get(`${HOLIDAY_ADVANCE_SETTINGS}/${id}`, {
          params: { user_id: user?.id },
        })
        .then((res) => res.data),
    enabled: !!user?.id && !!id,
  });

  useEffect(() => {
    if (AdvanceholidayDetails) {
      reset({
        leave_type: AdvanceholidayDetails?.leave_type,
        consecutive_leave_allow: AdvanceholidayDetails?.consecutive_leave_allow,
        taken_past_leave_days: AdvanceholidayDetails?.taken_past_leave_days,
        before_leave_apply: AdvanceholidayDetails?.before_leave_apply,
        support_document_leave: AdvanceholidayDetails?.support_document_leave,
      });
      setLeaveBalance(AdvanceholidayDetails?.leave_balance);
      setIsOn(AdvanceholidayDetails?.half_day_leave);
      setIsOn1(AdvanceholidayDetails?.taken_past_leave);
      setIsOn2(AdvanceholidayDetails?.holiday_leaves);
      setIsOn3(AdvanceholidayDetails?.weekend_leaves);
      setIsOn4(AdvanceholidayDetails?.support_documents);
      setIsOn5(AdvanceholidayDetails?.notice_period_leave);
    }
  }, [AdvanceholidayDetails, reset]);

  const removeIdFromLocalStorage = () => {
    const storedData = localStorage.getItem("myData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      delete parsedData.id; // Remove the `id` property
      localStorage.setItem("myData", JSON.stringify(parsedData)); // Save the updated object
    }
  };

  const onSubmit = async (data) => {
    handledSubmit(data);
  };

  const handledSubmit = async (data) => {
    try {
      setLoader(true);

      const formData = {
        leave_type: data.leave_type,
        leave_balance: leaveBalance,
        consecutive_leave_allow: data.consecutive_leave_allow ?? 0,
        half_day_leave: isOn,
        taken_past_leave: isOn1,
        taken_past_leave_days: data.taken_past_leave_days ?? 0,
        holiday_leaves: isOn2,
        weekend_leaves: isOn3,
        before_leave_apply: data.before_leave_apply ?? 0,
        support_documents: isOn4,
        support_document_leave: data.support_document_leave ?? 0,
        notice_period_leave: isOn5,
        holiday_id: id,
      };
      // Make the API call
      const res = await newRequest.post(HOLIDAY_ADVANCE_SETTINGS, formData);

      toast.success(res?.data?.message);
      close();
      removeIdFromLocalStorage();
      navigate(`/admin/leave/settings`);
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
    <div className="min-h-[570px] w-full rounded-md bg-white px-5 py-4">
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
                  name="leave_type"
                  type="text"
                  placeholder="Leave Type"
                  {...register("leave_type")}
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
                    name="leave_balance"
                    value="dont_allow"
                    onClick={() => setLeaveBalance("dont_allow")}
                    className="radio-black"
                    defaultChecked
                  />
                  <label className="text-sm font-normal">Don’t allow</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="leave_balance"
                    value="allow_negative"
                    onClick={() => setLeaveBalance("allow_negative")}
                    className="radio-black"
                  />
                  <label className="text-sm font-normal">
                    Allow with negative balance
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="leave_balance"
                    value="allow_lop"
                    onClick={() => setLeaveBalance("allow_lop")}
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
                  name="consecutive_leave_allow"
                  type="number"
                  min={0}
                  placeholder="0"
                  {...register("consecutive_leave_allow")}
                  className="input-box"
                />
                {errors.consecutive_leave_allow && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.consecutive_leave_allow.message}
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
                  className={`h-[1.30rem] w-10 rounded-full p-[1px] ${isOn1 ? "bg-[#8be691] pt-[2.5px]" : "border border-[#888888] bg-white pt-[1.1px]"}`}
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
                  You can apply for past leave anytime, except when a pay run
                  has been submitted for the current or next month.
                </p>
                <div className="group col-span-2 flex w-full flex-col gap-1.5 py-2 lg:w-[49.5%]">
                  <label htmlFor="applyDays" className="label-text">
                    Days
                  </label>
                  <input
                    autoComplete="off"
                    name="taken_past_leave_days"
                    type="number"
                    min={0}
                    placeholder="0"
                    {...register("taken_past_leave_days")}
                    className="input-box"
                  />
                  {errors.taken_past_leave_days && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.taken_past_leave_days.message}
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
                  className={`h-[1.30rem] w-10 rounded-full p-[1px] ${isOn2 ? "bg-[#8be691] pt-[2.1px]" : "border border-[#888888] bg-white"}`}
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
                  className={`h-[1.30rem] w-10 rounded-full p-[1px] ${isOn3 ? "bg-[#8be691] pt-[2.1px]" : "border border-[#888888] bg-white"}`}
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
                How many days before the leave application needs to be
                submitted?
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
                  name="before_leave_apply"
                  type="number"
                  placeholder="0"
                  {...register("before_leave_apply")}
                  className="input-box"
                />
                {errors.before_leave_apply && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.before_leave_apply.message}
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
                  <label
                    htmlFor="documentsMandatoryDays"
                    className="label-text"
                  >
                    Days
                  </label>
                  <input
                    autoComplete="off"
                    name="support_document_leave"
                    type="number"
                    min={0}
                    placeholder="0"
                    {...register("support_document_leave")}
                    className="input-box"
                  />
                  {errors.support_document_leave && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.support_document_leave.message}
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
                  className={`h-[1.30rem] w-10 rounded-full p-[1px] ${isOn5 ? "bg-[#8be691] pt-[2.5px]" : "border border-[#888888] bg-white pt-[1.1px]"}`}
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
                {loader ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdvancedSettings;
