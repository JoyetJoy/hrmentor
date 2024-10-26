import { newRequest, XFormRequest } from "@/api";
import { CANDIDATE_MASTER } from "@/api/master";
import {
  CANDIDATE_INTERVIEW_DETAIL,
  UPDATE_INTERVIEW_PERFORMANCE_RESULT,
} from "@/api/recruiter";
import Loader from "@/components/ui/Loader";
import { successStatus } from "@/constants/data";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { recCandidateInterviewPerformanceSchema } from "@/schema/dashboard/recruiter/candidate/candidate.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock, StopCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";

export default function RecStartScreening({
  popupOpen,
  setPopupOpen,
  selectedField,
  setSelectedField,
  qrKey,
}) {
  let enableKey = selectedField === 0 ? false : true;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(recCandidateInterviewPerformanceSchema),
  });

  // CANDIDATE MASTERS;
  const { data: candidateMasters } = useEmployeeMaster(
    CANDIDATE_MASTER,
    "candidateMasters",
  );

  const [interviewStatus, setInterviewStatus] = useState(0);
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);

  // Interview DETAIL BY CANDIDATE;
  const { data: candidateInterviewDetail, isLoading } = useQuery({
    queryKey: ["candidateInterviewDetail", selectedField],
    queryFn: () =>
      newRequest
        .get(`${CANDIDATE_INTERVIEW_DETAIL}/${selectedField}`)
        .then((res) => res.data),
    enabled: enableKey,
  });

  useEffect(() => {
    if (candidateInterviewDetail?.interview_start_stop) {
      setInterviewStatus(
        parseInt(candidateInterviewDetail?.interview_start_stop),
      );
    }
  }, [candidateInterviewDetail, setInterviewStatus]);

  useEffect(() => {
    if (candidateInterviewDetail) {
      setValue(
        "interview_performance_id",
        candidateInterviewDetail?.interview_performance_id,
      );
      setValue(
        "interview_performance_status_id",
        candidateInterviewDetail?.interview_performance_status,
      );
      setValue("interview_note", candidateInterviewDetail?.interview_note);

      setValue("have_finished", candidateInterviewDetail?.have_finished);
    }
  }, [candidateInterviewDetail, setValue]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("have_finished", data?.have_finished?.value);
      formData.append(
        "interview_performance_id",
        data?.interview_performance_id?.id,
      );
      formData.append(
        "interview_performance_status_id",
        data?.interview_performance_status_id?.id,
      );
      formData.append("interview_note", data?.interview_note);
      const res = await XFormRequest.post(
        `${UPDATE_INTERVIEW_PERFORMANCE_RESULT}/${selectedField}`,
        formData,
      );
      if (res?.data?.success === true) {
        setLoader(false);
        toast.success(res?.data?.message);
        queryClient.invalidateQueries([qrKey]);
        close();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
  };

  // CANDIDATE INTERVIEW START STOP
  const handleInterviewStartStop = async () => {
    try {
      const res = await newRequest.post(
        `candidate-interview-start-stop/${selectedField}`,
        {
          interview_start_stop:
            interviewStatus == "0" ? "1" : interviewStatus == "1" ? "2" : "0",
        },
      );
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        queryClient.invalidateQueries(["candidateInterviewDetail"]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
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
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-base font-bold leading-7 text-neutral-700">
                Screening Result
              </h1>
              <button
                onClick={close}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {" "}
                {interviewStatus === 0 ? (
                  <button
                    onClick={handleInterviewStartStop}
                    className="flex h-10 items-center gap-2 rounded bg-black px-5 text-[0.8rem] font-medium capitalize text-white"
                  >
                    Start Interview
                    <Clock className="size-5" />
                  </button>
                ) : interviewStatus === 1 ? (
                  <button
                    onClick={handleInterviewStartStop}
                    className="flex h-10 cursor-pointer items-center gap-2 rounded bg-red-500 px-5 text-[0.8rem] font-medium capitalize text-white"
                  >
                    Stop Interview
                    <StopCircle className="size-5" />
                  </button>
                ) : (
                  <button className="flex h-10 cursor-pointer items-center gap-2 rounded bg-blue-400 px-5 text-[0.8rem] font-medium capitalize text-white">
                    Interview Finished
                  </button>
                )}
                <form
                  className="grid grid-cols-1 gap-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="group mt-5 flex flex-col space-y-1">
                    <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Have You Finished The Interview ?
                    </label>
                    <Controller
                      name="have_finished"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={successStatus}
                          isSearchable={false}
                          styles={customSelectStyles}
                          placeholder="Select type"
                          className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                        />
                      )}
                    />
                    {errors.have_finished && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.have_finished?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1">
                    <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Select Performance
                    </label>
                    <Controller
                      name="interview_performance_id"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={candidateMasters?.inteviewPerfomances ?? []}
                          isSearchable={false}
                          styles={customSelectStyles}
                          placeholder="Select type"
                          className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                        />
                      )}
                    />
                    {errors.interview_performance_id && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.interview_performance_id?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1">
                    <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Pass/ Fail
                    </label>
                    <Controller
                      name="interview_performance_status_id"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={
                            candidateMasters?.interviewPerfomanceStatus ?? []
                          }
                          isSearchable={false}
                          styles={customSelectStyles}
                          placeholder="Select type"
                          className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                        />
                      )}
                    />
                    {errors.interview_performance_status_id && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.interview_performance_status_id?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex w-full flex-col gap-1">
                    <label className="label-text">Interview Notes</label>
                    <textarea
                      {...register("interview_note")}
                      className="input-box h-24"
                    />
                    {errors.interview_note && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.interview_note?.message}
                      </span>
                    )}
                  </div>
                  {candidateInterviewDetail?.have_finished?.value ==
                  1 ? null : (
                    <div className="flex flex-row items-center justify-center gap-3">
                      <button
                        type="submit"
                        className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                        disabled={loader && interviewStatus != 2}
                      >
                        {loader ? (
                          <div className="flex items-center gap-3">
                            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                            Saving
                          </div>
                        ) : (
                          <span>Update</span>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={close}
                        className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
