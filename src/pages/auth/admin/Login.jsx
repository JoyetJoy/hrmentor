import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginimg from "/assets/images/login-img.png";
import hr1logo from "/assets/images/hr1-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema } from "@/schema/auth/login.schema";
import { basicXFormRequest } from "@/api";
import { LOGIN } from "@/api/auth";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const onSubmit = (data) => {
    saveForm(data);
  };

  const saveForm = async (data) => {
    console.log("Form data:", data);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      const res = await basicXFormRequest.post(LOGIN, formData);
      if (res?.data?.success === true) {
        toast.success("Login successful");
        localStorage.setItem("token", res?.data?.data?.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
      toast.error("Failed to login");
    }
  };

  return (
    <div className="mx-auto grid px-5 2xl:container lg:grid-cols-5 lg:p-10">
      <div className="hidden w-full lg:col-span-2 lg:block">
        <img src={loginimg} alt="auth banner" className="h-full w-full" />
      </div>
      <div className="col-span-3 flex flex-col items-center gap-8 py-20 lg:-ml-7">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="mb-7 text-3xl font-bold text-black">COMPANY LOGO</h1>
          <h2 className="text-2xl font-bold text-black">Log In</h2>
          <p className="mt-2 text-center text-lg text-[#808080B2]">
            Access is granted only to <br /> company employees.
          </p>
        </div>
        <form
          className="flex w-full flex-col gap-4 text-sm lg:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <label className="text-base font-semibold text-[#2C2C2C]">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email id"
              className={`h-12 min-h-12 w-full rounded-md border px-4 py-2 font-medium outline-none placeholder:text-base placeholder:text-[#7F7F7F] ${
                errors.email ? "border-red-500" : "border-[#181C3A4D]"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-base font-semibold text-[#2C2C2C]">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className={`h-12 min-h-12 w-full rounded-md border px-4 py-2 font-medium outline-none placeholder:text-base placeholder:text-[#7F7F7F] ${
                errors.password ? "border-red-500" : "border-[#181C3A4D]"
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="h-14 w-full rounded-md bg-[#2B2B2B] text-center text-base text-white hover:bg-[#2B2B2B]"
          >
            Log In
          </button>
          <Link
            to="/forgot-password"
            className="mt-3 text-center text-base font-semibold text-[#E95D39]"
          >
            Forgot password?
          </Link>
          <div className="mt-7 flex flex-col items-center justify-center gap-1">
            <p className="text-center text-base font-medium text-[#808080B2]">
              Powered By
            </p>
            <div className="w-36">
              <img src={hr1logo} alt="logo" className="w-full object-contain" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
