import React from 'react'
import loginimg from "/assets/images/login-img.png";
import hrlogo from "/assets/images/hr-logo.svg";
import { Link } from "react-router-dom";

function ForgotPass() {
    return (
        <>
            <div className="flex flex-row h-screen items-center gap-48 p-9  ">
                <div className="col-span-1 w-[32%]">
                    <img
                        src={loginimg}
                        alt="login image"
                        className="object-contain h-full w-full"
                    />
                </div>
                <div className="flex flex-col  items-center gap-8">
                    <div className="text-center  flex flex-col gap-2 ">
                        <h2 className="text-base font-bold text-black">Forgot Password  </h2>
                        <p className="text-gray m-auto w-52 text-sm">
                            Send mail ID to higher authority to reset password
                        </p>
                    </div>
                    <div>
                        <form action="" className="flex flex-col gap-3  w-96">
                            <label className="font-semibold text-sm">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email id"
                                className=" border   outline-none placeholder:text-sm py-2 px-3 rounded-md"
                            />
                            <button className=" btn bg-btncolor text-white text-center text-sm hover:bg-btncolor">
                                Send              </button>
                            {/* <Link className="text-btncolor">Forgot password ?</Link> */}
                            <div className="flex flex-col  items-center justify-center mt-2">
                                <p className="text-gray text-sm font-abold">Powered By</p>
                                <div className="w-28">
                                    <img
                                        src={hrlogo}
                                        alt="HR menteor logo"
                                        className="w-full object-contain "
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPass
