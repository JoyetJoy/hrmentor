import React, { useState } from "react";
import BasicDetails from "./BasicDetails";
import WorkInfo from "./WorkInfo";
import Skills from "./Skills";
import Registration from "./Registration";
import Experience from "./Experience";
import DBScheck from "./DBScheck";
import RightToWork from "./RightToWork";
import Emergency from "./Emergency";
import Bank from "./Bank";
import Document from "./Document";
import toast from "react-hot-toast";

import { EMPLOYEE, newFormRequest, SEND_ONBORDING } from "@/api";
import { useUserStore } from "@/lib/slices/auth.slice";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function OnboardingForm() {
  const location = useLocation();
  const [errors, serErrors] = useState();
  const [isLoader, setIsLoader] = useState();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const employee_id = searchParams.get("employee_id");
  const statusId = 9;
  const [id, setId] = useState("");
  const navigate = useNavigate();

  // const { data: employeeDetails} = useQuery({
  //   queryKey: ["employeeDetails", uid],
  //   queryFn: () =>
  //     newRequest.get(`${EMPLOYEE}/${uid}`).then((res) => {
  //       return res.data;
  //     }),
  //   enabled: formtype == "update",
  // });


  console.log(employee_id,"employee_idemployee_id");
  
  const handleShare = async () => {
    try {
      setIsLoader(true);
      const onboarding = {
        employee_id: employee_id,
        status: statusId,
      };
      const response = await newFormRequest.post(
        `employee-status-update`,
        onboarding,
      );
      if (response?.status === 200) {
        setIsLoader(false);
        toast.success("Approve successfully");
        navigate(`/admin/employee/details/?uid=${uid}`);
      } else {
        toast.error("Failed to approve,");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message[0] || "Failed to Approve employee.",
      );
    }
  };
  return (
    <div className="flex h-full w-full flex-col gap-4 bg-gray-100 p-10">
      <div
        className="flex min-h-48 max-w-full items-center justify-between rounded-bl-lg rounded-ee-lg rounded-tr-lg bg-cover bg-no-repeat px-20 py-16"
        style={{
          backgroundImage: `url(/onbording.png)`,
        }}
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <div className="mr-2 h-10">
              <img
                src={"/logo-white.svg"}
                alt="hr mentor"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-monorope text-sm font-normal text-white">
              Welcome,
              <h1 className="-mt-0.5 text-sm font-semibold">
                Tech Butomy pvt Ltd
              </h1>
            </span>
          </div>
          <h1 className="text-lg font-semibold text-white">
            Employee Onboarding Form
          </h1>
        </div>
        <button
          type="submit"
          onClick={() => {
            handleShare();
          }}
          className="rounded-md bg-hrmprimaryorange px-8 py-2 text-sm font-semibold text-white"
        >
          {isLoader ? (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              Sending
            </div>
          ) : (
            <>
              <span> Approve</span>
            </>
          )}
        </button>
      </div>
      <div className="rounded-md bg-white px-10 py-8">
        <form className="flex flex-col gap-4">
          <BasicDetails formtype="update" />
          <WorkInfo formtype="update" />
          <Skills />
          <Experience />
          <Registration />
          <DBScheck />
          <RightToWork />
          <Emergency />
          <Bank />
          <Document />
        </form>
      </div>
    </div>
  );
}
