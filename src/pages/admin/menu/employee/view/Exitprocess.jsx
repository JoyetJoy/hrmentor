import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import { EMPLOYEE, newFormRequest, newRequest, SEND_ONBORDING } from "@/api";
import { useUserStore } from "@/lib/slices/auth.slice";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customSelectStyles } from "@/utils/customStyles";
import ResumeDragzone from "@/components/recruiter/candidate/ResumeDragzone";
import { Checkbox } from "@headlessui/react";
import { ExitProcessSchema } from "@/schema/dashboard/employee/form/exitprocess.schema";

export default function ExitProcess() {
  const location = useLocation();
  const [isLoader, setIsLoader] = useState();
  const [resumefile, setResumeFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const types = searchParams.get("types");
  const employee_id = searchParams.get("employee_id");
  const statusId = 9;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "on",
    reValidateMode: "onChange",
    resolver: yupResolver(ExitProcessSchema),
  });

  const { data: exitProcess, isLoading } = useQuery({
    queryKey: ["exitProcess", uid],
    queryFn: () =>
      newRequest.get(`Exit_process/${uid}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (exitProcess) {
      setResumeFile(exitProcess?.data?.pdf_upload);
    }
  }, [exitProcess, setResumeFile]);

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

  const options = [
    {
      value: "serswe",
      label: "sefss",
    },
  ];
  return (
    <div className="flex h-full w-full flex-col gap-4 bg-gray-100 p-10">
      <div
        className="flex min-h-48 max-w-full items-center justify-between rounded-bl-lg rounded-ee-lg rounded-tr-lg bg-cover bg-no-repeat px-20 py-16"
        style={{
          backgroundImage: `url(/onbording.png)`,
        }}
      >
        <div className="flex flex-col gap-5">
          <h1 className="text-lg font-semibold text-white">
            Exit Process Form
          </h1>
        </div>
      </div>
      <div className="rounded-md bg-white px-10 py-8">
        <form className="grid min-h-[50rem] grid-cols-2 gap-4">
          <div className="mt-4 flex flex-col justify-between">
            <div className="mt-4 grid h-[20rem] w-full items-start gap-2">
            <div className="group flex flex-col gap-1.5 px-3 py-2">
              <label className="required label-text">Registration Date</label>
              <input
                {...register("registration_date", { required: true })}
                autoComplete="off"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                className="input-box pr-2"
              />
              {/* {errors.dob && (
                <span className="text-xs font-medium text-red-500">
                  {errors.dob?.message}
                </span>
              )} */}
            </div>
            {/* <div className="group flex flex-col gap-1.5 px-3 py-2">
              <label className="required label-text">Last Working Date</label>
              <input
                {...register("last_working_date", { required: true })}
                autoComplete="off"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                className="input-box pr-2"
              /> */}
              {/* {errors.dob && (
                <span className="text-xs font-medium text-red-500">
                  {errors.dob?.message}
                </span>
              )} */}
            {/* </div> */}
            <div className="group flex flex-col gap-1.5 px-3 py-2">
              <label className="required label-text">Reason For Exit</label>
              <input
                {...register("reason", { required: true })}
                autoComplete="off"
                type="text"
                className="input-box pr-2"
              />
              {/* {errors.dob && (
                <span className="text-xs font-medium text-red-500">
                  {errors.dob?.message}
                </span>
              )} */}
            </div>
            <div className="group flex flex-col gap-1.5 px-3 py-2">
              <label className="required label-text">Exit Type</label>
              <Controller
                name="exit_type"
                className=""
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={true}
                    styles={customSelectStyles}
                    options={options}
                    placeholder="Select Gender"
                    className="input-box"
                  />
                )}
              />
              {/* {errors.dob && (
                <span className="text-xs font-medium text-red-500">
                  {errors.dob?.message}
                </span>
              )} */}
            </div>
            <div className="flex gap-1.5 px-3 py-2">
              <input
                type="checkbox"
                {...register("portalAccess", { required: true })}
              />
              <span className="mt-0.5 whitespace-nowrap text-[0.5rem] font-medium text-gray-dim md:text-xs">
                Portal access disable
              </span>
            </div>
            <div className="group col-span-2 grid gap-1.5 px-3 py-2">
              <label className="required label-text">Note</label>
              <textarea
                name="note"
                id=""
                className="min-h-[6rem] rounded-lg border"
              ></textarea>
              {/* {errors.dob && (
                <span className="text-xs font-medium text-red-500">
                  {errors.dob?.message}
                </span>
              )} */}
            </div>
            </div>
            <div className="w-1/2 flex gap-3"><button
              className="btn flex h-10 min-h-10 items-center gap-2 rounded-md border border-black px-14 text-xs font-semibold text-black "
            >
             Cancel
            </button>
          <button
              type="submit"
              className="btn flex h-10 min-h-10 items-center gap-2 rounded-md bg-hrmblack px-14 text-xs font-semibold text-white hover:bg-hrmdarkblue"
            >
             Submit
            </button></div>
          </div>
          <ResumeDragzone
            file={resumefile}
            setFile={setResumeFile}
            types={types}
            filePreview={filePreview}
            setFilePreview={setFilePreview}
          />
          
        </form>
      </div>
    </div>
  );
}
