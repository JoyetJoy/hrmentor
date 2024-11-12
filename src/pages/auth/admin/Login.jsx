import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import hr1logo from "/logo.svg";
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
    <div className="mx-auto grid h-screen w-full items-center px-5 2xl:container lg:grid-cols-7 lg:px-12">
      <div className="hidden h-full w-full lg:col-span-3 lg:flex">
        <img
          src={"/assets/images/auth/banner.svg"}
          alt="auth banner"
          className="h-full w-full"
        />
      </div>
      <div className="col-span-4 -mb-10 flex flex-col lg:px-14">
        <div className="flex flex-col items-start">
          <h1 className="mb-4 text-xl font-bold text-hrmprimaryorange">
            <span className="text-black">Welcome,</span>
            <br />
            Techbutomy Private Limited
          </h1>
          <h2 className="text-xl font-bold text-black">Log In</h2>
          <p className="mt-1 text-softslate">
            Access is granted only to <br /> company employees.
          </p>
        </div>
        <form
          className="mt-8 flex w-full flex-col gap-4 text-sm lg:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <label className="text-base font-semibold text-textcolor-darkCharcoal">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email id"
              className={`h-11 min-h-11 w-full rounded-md border px-4 py-2 font-medium outline-none placeholder:text-[0.94rem] placeholder:text-gray-dark  ${
                errors.email ? "border-red-500" : "border-tdarkblue"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-base font-semibold text-textcolor-darkCharcoal">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className={`h-11 min-h-11 w-full rounded-md border px-4 py-2 font-medium outline-none placeholder:text-[0.94rem] placeholder:text-gray-dark ${
                errors.password ? "border-red-500" : "border-tdarkblue"
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="h-12 w-full rounded-md bg-neutralmedium text-center text-base font-medium text-white hover:bg-neutralmedium"
          >
            Log In
          </button>
          <Link
            to="/forgot-password"
            className="mt-2.5 text-center text-base font-semibold text-hrmprimaryorange"
          >
            Forgot password?
          </Link>
          <div className="mt-5 flex flex-col items-center justify-center">
            <p className="text-center text-[0.94rem] font-medium text-softslate">
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
