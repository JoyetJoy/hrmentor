import { newRequest } from "@/api";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from "yup";

const ForgotPassSchema = Yup.object({
  email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
});

export default function ForgotPassword({ popupOpen, setPopupOpen }) {
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(ForgotPassSchema),
  });

  function close() {
    setPopupOpen(false);
    reset();
  }
console.log(errors);

  const onSubmit = async (data) => {
    console.log('fg');
    
    setLoader(true);
    try {
        const response = await newRequest.post()
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
    //   setLoader(false);
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
            className="data-[closed]:transform-[scale(95%)] w-full max-w-sm rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                Forgot Password
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
              <div className="group flex flex-col space-y-1 ">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  type="text"
                  className="input-box h-10 w-full"
                />
                {errors.email && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <p className="text-[0.7rem] font-semibold text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                You will receive a new password at your registered email ID
              </p>

              <div className="mt-2 flex flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                >
                  {loader ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                      Sending
                    </div>
                  ) : (
                    <span>Send</span>
                  )}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
