import { EMPLOYEE_PASSWORD, newFormRequest, newRequest } from "@/api";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from "yup";

const passwordSchema = Yup.object({
  current: Yup.string().required("Current password is required"),

  new_pass: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include letters, numbers, and symbols"
    ),

  confirm_pass: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("new_pass")], "Passwords must match"),
});

export default function Password({ popupOpen, setPopupOpen }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(passwordSchema),
  });

  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);

  // 👁️ password visibility states
  const [showPassword, setShowPassword] = useState({
    current: false,
    new_pass: false,
    confirm_pass: false,
  });

  // toggle password visibility
  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  function close() {
    setPopupOpen(false);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const body = {
        current_password:data?.current,
        new_password : data?.new_pass,
        confirm_password : data?.confirm_pass
      }
      const res = await newRequest.post(EMPLOYEE_PASSWORD, body);
console.log(res);

      if (res?.status === 200) {
        toast.success(res?.data.message);
        console.log('dfg');
        
        close();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoader(false);
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
                Update Password
              </h1>
              <button
                type="button"
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
              {/* Current Password */}
              <div className="group flex flex-col gap-1 relative">
                <label className="required label-text">Current Password</label>
                <input
                  {...register("current")}
                  type={showPassword.current ? "text" : "password"}
                  placeholder="Enter current password"
                  className="input-box h-10 w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePassword("current")}
                  className="absolute right-3 top-8 text-gray-500"
                >
                  {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.current && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.current.message}
                  </span>
                )}
              </div>

              {/* New Password */}
              <div className="group flex flex-col gap-1 relative">
                <label className="required label-text">New Password</label>
                <input
                  {...register("new_pass")}
                  type={showPassword.new_pass ? "text" : "password"}
                  placeholder="Enter new password"
                  className="input-box h-10 w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePassword("new_pass")}
                  className="absolute right-3 top-8 text-gray-500"
                >
                  {showPassword.new_pass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.new_pass && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.new_pass.message}
                  </span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="group flex flex-col gap-1 relative">
                <label className="required label-text">Confirm Password</label>
                <input
                  {...register("confirm_pass")}
                  type={showPassword.confirm_pass ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className="input-box h-10 w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => togglePassword("confirm_pass")}
                  className="absolute right-3 top-8 text-gray-500"
                >
                  {showPassword.confirm_pass ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
                {errors.confirm_pass && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.confirm_pass.message}
                  </span>
                )}
              </div>

              <div className="mt-2 flex flex-row items-center justify-center gap-3">
                <button
                  type="submit"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                  disabled={loader}
                >
                  {loader ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                      Saving...
                    </div>
                  ) : (
                    <span>Save</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
