import loginimg from "/assets/images/login-img.png";
import hr1logo from "/assets/images/hr1-logo.svg";
import { Link } from "react-router-dom";

function Login() {
  //
  return (
    <div className="mx-auto grid p-10 2xl:container lg:grid-cols-5">
      <div className="hidden w-full lg:col-span-2 lg:block">
        <img src={loginimg} alt="auth banner" className="h-full w-full" />
      </div>
      <div className="col-span-3 flex flex-col items-center gap-8 py-20">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="mb-7 text-3xl font-bold text-black">COMPANY LOGO</h1>
          <h2 className="text-2xl font-bold text-black">Log In</h2>
          <p className="mt-2 text-center text-lg text-[#808080B2]">
            Access is granted only to <br /> company employees.
          </p>
        </div>
        <form className="flex w-full flex-col gap-4 text-sm lg:w-1/2">
          <div className="flex flex-col gap-1">
            <label className="text-base font-bold text-[#2C2C2C]">Email</label>
            <input
              type="email"
              placeholder="Enter email id"
              className="h-12 min-h-12 w-full rounded-md border border-[#181C3A4D] px-4 py-2 font-medium outline-none placeholder:text-base placeholder:text-[#7F7F7F]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-base font-bold text-[#2C2C2C]">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="h-12 min-h-12 w-full rounded-md border border-[#181C3A4D] px-4 py-2 font-medium outline-none placeholder:text-base placeholder:text-[#7F7F7F]"
            />
          </div>
          <button className="h-14 w-full rounded-md bg-[#2B2B2B] text-center text-base text-white hover:bg-[#2B2B2B]">
            Log In
          </button>
          <Link className="mt-3 text-center text-base font-semibold text-[#E95D39]">
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
