import React, { useState } from "react";
import loginimg from "/assets/images/login-img.png";
import hrlogo from "/assets/images/hr-logo.svg";
import hr1logo from "/assets/images/hr1-logo.svg";


function Login() {
    // State to track whether the "Forgot Password" form should be shown
    const [isForgotPassword, setIsForgotPassword] = useState(false);

    // Toggle to display the "Forgot Password" form
    const handleForgotPassword = () => {
        setIsForgotPassword(true);
    };

    // Toggle to go back to the login form
    const handleBackToLogin = () => {
        setIsForgotPassword(false);
    };

    return (
        <div className="flex flex-row row-span-3 items-center gap-52 py-11 px-14">
          
            <div className="w-2/5">
                <img
                    src={loginimg}
                    alt="login image"
                    className="block w-full h-full"
                />
            </div>
            
          
            <div className="flex flex-col col-span-2 items-center gap-8 justify-center  ">
               
                {!isForgotPassword ? (
                  
                    <>
                        <div className="text-center flex flex-col gap-2 mt-28">
                            <h1 className="text-3xl font-bold text-black mb-10">
                                COMPANY LOGO
                            </h1>
                            <h2 className="text-2xl font-bold text-black">Log In</h2>
                            <p className="text-[#808080B2] m-auto text-center text-lg">
                                Access is granted only to <br /> company employees.
                            </p>
                        </div>
                        <form action="" className="flex flex-col gap-4 w-[26rem]">
                            <div className="flex flex-col gap-1 ">
                            <label className="font-bold text-base text-[#2C2C2C]">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email id"
                                className="border  border-[#181C3A4D] outline-none placeholder:text-base placeholder:text-[#7F7F7F] py-2 px-6 rounded-md w-full min-h-12 h-12"
                            />
                            </div>
                            <div className="flex flex-col gap-1">
                            <label className="font-bold text-base text-[#2C2C2C]">Password</label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="border  border-[#181C3A4D] outline-none placeholder:text-base placeholder:text-[#7F7F7F] py-2 px-6 rounded-md w-full min-h-12 h-12"
                            />
                            </div>
                           
                         
                            <button className="btn bg-[#2B2B2B]  text-white text-center text-sm hover:bg-[#2B2B2B] w-full  min-h-12 h-12">
                                Log In
                            </button>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-[#E95D39] text-base text-center font-bold my-3"
                            >
                                Forgot password?
                            </button>
                            <div className="flex flex-col  gap-3 items-center justify-center ">
                                <p className="text-[#808080B2] m-auto text-center text-base">Powered By</p>
                                <div className="w-36">
                                    <img
                                        src={hr1logo}
                                        alt="HR menteor logo"
                                        className="w-full object-contain"
                                    />
                                </div>
                            </div>
                        </form>
                    </>
                ) : (
                    // Forgot Password form
                    <>
                        <div className="text-center flex flex-col gap-2 mt-36">
                            <h2 className="text-2xl font-bold text-black">Forgot Password</h2>
                            <p className="text-[#808080B2] m-auto text-center text-lg">
                                Send mail ID to higher authority to <br /> reset password
                            </p>
                        </div>
                        <form action="" className="flex flex-col gap-4 w-[26rem]">
                            <div className="flex flex-col gap-1 ">
                            <label className="font-bold text-base text-[#2C2C2C]">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email id"
                                className="border  border-[#181C3A4D] outline-none placeholder:text-base placeholder:text-[#7F7F7F] py-2 px-6 rounded-md w-full min-h-12 h-12"
                            />
                            </div>
                          
                            <button className="btn bg-[#2B2B2B]  text-white text-center text-sm hover:bg-[#2B2B2B] w-full  min-h-12 h-12">
                                Send
                            </button>
                            {/* <button
                                type="button"
                                onClick={handleBackToLogin}
                                className="text-btncolor text-sm text-center font-semibold my-3"
                            >
                                Back to Login
                            </button> */}
                            <div className="flex flex-col items-center justify-center mt-20">
                                <p className="text-[#808080B2] m-auto text-center text-base">Powered By</p>
                                <div className="w-36">
                                    <img
                                        src={hrlogo}
                                        alt="HR menteor logo"
                                        className="w-full object-contain"
                                    />
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;
