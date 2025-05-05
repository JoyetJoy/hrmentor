import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import hr1logo from "/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema } from "@/schema/auth/login.schema";
import { basicXFormRequest } from "@/api";
import { LOGIN } from "@/api/auth";
import toast from "react-hot-toast";
import { useState } from "react";
import { Eye } from "lucide-react";
import { useRoleStore } from "@/lib/slices/auth.slice";

function Login() {
  const [loader, setLoader] = useState(false);
  const [passwordVisible, ispasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const { setRole } = useRoleStore((state) => ({
    setRole: state.setRole,
  }));

  const navigate = useNavigate();
  const onSubmit = (data) => {
    saveForm(data);
  };

  const saveForm = async (data) => {
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      const res = await basicXFormRequest.post(LOGIN, formData);
      if (res?.data?.success === true) {
        toast.success("Login successful");
        if (res?.data?.data?.roles?.length === 1) {
          if (res?.data?.data?.roles?.includes(1)) {
            localStorage.removeItem("token");
            localStorage.setItem("token", res?.data?.data?.token);
            setRole(res?.data?.data?.roles);
            navigate("/admin/dashboard");
          } else {
            localStorage.removeItem("token");
            localStorage.setItem("token", res?.data?.data?.token);
            setRole(res?.data?.data?.roles);
            navigate("/employee-access/dashboard");
          }
        } else {
          if (res?.data?.data?.roles?.includes(1)) {
            localStorage.setItem("super_token", res?.data?.data?.token);
            navigate("/admin/dashboard");
          } else if (res?.data?.data?.roles?.includes(2, 3 || 2, 4)) {
            localStorage.setItem("hr_token", res?.data?.data?.token);
          } else if (res?.data?.data?.roles?.includes(3, 4)) {
            localStorage.setItem("team_token", res?.data?.data?.token);
          } else {
            localStorage.setItem("employee_token", res?.data?.data?.token);
            navigate("/employee-access/dashboard");
          }
        }
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error?.response?.data?.message || "Failed to login");
    }
  };

  return (
    <div className="mx-auto grid h-screen w-full items-center px-5 2xl:container lg:grid-cols-7 lg:px-12">
      <div className="hidden h-screen w-full lg:col-span-3 lg:flex">
        <img
          src={"/assets/images/auth/banner.svg"}
          alt="auth banner"
          className="h-full w-full rounded-br-3xl"
        />
      </div>
      <div className="col-span-4 -mb-10 flex flex-col lg:px-14">
        <div className="flex flex-col items-start">
          {/* <h1 className="mb-4 text-xl font-bold text-hrmprimaryorange">
            <span className="text-black">Welcome,</span>
            <br />
            Techbutomy Private Limited
          </h1> */}
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
              className={`h-11 min-h-11 w-full rounded-md border px-4 py-2 font-medium outline-none placeholder:text-[0.94rem] placeholder:text-gray-dark ${
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
            {/* <input
              type="password"
              placeholder="Enter Password"
              className={``}
              {...register("password")}
            /> */}
            <div
              className={`relative h-11 min-h-11 w-full overflow-hidden rounded-md border font-medium outline-none placeholder:text-[0.94rem] placeholder:text-gray-dark ${
                errors.password ? "border-red-500" : "border-tdarkblue"
              }`}
            >
              <input
                type={passwordVisible ? "text" : "password"}
                {...register("password", { required: true })}
                autoComplete="off"
                spellCheck="false"
                placeholder="*****************"
                className="h-11 w-full flex-grow bg-transparent px-4 py-2 placeholder:text-[#8b8b8b]"
              />
              <div className="absolute right-3 top-3">
                <Eye
                  onClick={() => ispasswordVisible(!passwordVisible)}
                  className={`h-4 cursor-pointer ${
                    passwordVisible ? "text-black" : "text-[#7e7e7e]"
                  }`}
                />
              </div>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="h-12 w-full rounded-md bg-neutralmedium text-center text-base font-medium text-white hover:bg-neutralmedium"
          >
            {loader ? (
              <div className="flex h-full w-full items-center justify-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                Signing you in
              </div>
            ) : (
              "Login"
            )}
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
      <div className="col-span-7 text-sm flex justify-end w-full text-[#b0a9ad]">Version 0.0.1</div>
    </div>
  );
}

export default Login;
