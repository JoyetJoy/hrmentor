import { SHIFT_BREAK_TIME } from "@/api/setup";
import { BreakTimeSchema } from "@/schema/dashboard/masters/shift.schema";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form"; 
import Select from "react-select"; 

export default function BreakTime({ popupOpen, setPopupOpen, selectedField,formtype ,break_time , setBreak_time}) {
  // Initialize useForm
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(BreakTimeSchema),
  });

  const { data: shiftbreaktime, isLoading } = useQuery({
    queryKey: ["shiftbreaktime",  formtype],
    queryFn: () =>
      newRequest.get(`${SHIFT_BREAK_TIME}`).then((res) => res.data),
    enabled: formtype == "update",
  });

  const onSubmit = async (data) => {
    setLoader(true);
    handleShift(data);
    close();
  };

  const handleShift = async (data) => {
    const formData = new FormData();
    formData.append("type_name", data.type_name);
    formData.append("start_time", data.start_time);
    formData.append("end_time", data.end_time);
    formData.append("pay_node", data.pay_node);
    try {
      let res;
        // res = await newFormRequest.post(SHIFT_BREAK_TIME, formData);
        console.log(res)
    
        if (res?.status === 201) {
          toast.success("Saved break time successfully");
          queryClient.invalidateQueries(["shiftDetails"]);
          reset();
          setLoader(false);
          formtype === "save"
            ? navigate("/admin/setup/shift")
            : window.location.reload();
        } else {
          toast.error("Failed to break time.");
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to break time.");
        setLoader(false);
      }
  }
  console.log(shiftbreaktime)

  function close() {
    setPopupOpen(false);
    reset();
  }
  useEffect(() => {
    if (shiftbreaktime) {
      setValue("name", shiftbreaktime?.type_name);
      setValue("start_time", shiftbreaktime?.data?.start_time);
      setValue("end_time", shiftbreaktime?.data?.end_time);
      setValue("pay_node", shiftbreaktime?.data?.pay_node);
    }
    },[shiftbreaktime,setValue])

  const employeeMasterOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ]; // Example options

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "#C2C1C1",
    }),
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
              <div className="group flex flex-col space-y-1">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Pay Mode
                </label>
                <input
                  {...register("pay_node", { required: "Pay mode is required" })}
                  type="text"
                  className="input-box h-10 w-full"
                />
                {errors.pay_node && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.pay_node.message}
                  </span>
                )}
              </div>

              <div className="gap flex items-center justify-center gap-2">
                  <div className="group flex w-full flex-col gap-1.5 py-2">
                    <label className="required label-text">Start Time</label>
                    <input
                      {...register("start_time", { required: true })}
                      autoComplete="off"
                      type="time"
                      className="input-box"
                    />
                    {errors.start_time && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.start_time?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex w-full flex-col gap-1.5 py-2 ">
                    <label className="required label-text">End Time</label>
                    <input
                      {...register("end_time", { required: true })}
                      autoComplete="off"
                      type="time"
                      className="input-box"
                    />
                    {errors.end_time && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.end_time?.message}
                      </span>
                    )}
                  </div>
                </div>
              <div className="mt-2 flex flex-row items-end justify-end  gap-3">
                <button
                  type="submit"
                  className="flex h-11 w-1/2  cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmprimaryorange text-sm font-normal text-white focus:outline-none"
                >
                  <span>{selectedField ? "Update" : "Save"}</span>
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
