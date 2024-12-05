import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export default function PaySlipDispute({ popupOpen, setPopupOpen }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(),
  });

  function close() {
    setPopupOpen(false);
    reset();
  }
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
                Dispute
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
              //   onSubmit={handleSubmit(onSubmit)}
            >
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Add Dispute
                </label>
                <input
                  {...register("dispute", { required: "Name is required" })}
                  type="text"
                  className="input-box h-24 w-full"
                />
                {errors.dispute && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.dispute.message}
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-row items-end justify-end gap-3">
                <button
                  onClick={close}
                  className="flex h-11 w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-normal text-black focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex h-11 w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md bg-black text-sm font-normal text-white focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
