import { newRequest, XFormRequest } from "@/api";
import { CANDIDATE_MASTER } from "@/api/master";
import { CANDIDATE_INTERVIEW_DETAIL } from "@/api/recruiter";
import { successStatus } from "@/constants/data";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { recCandidateCreateInterviewSchema } from "@/schema/dashboard/recruiter/candidate/candidate.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleXIcon, Clock, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
  api,
  cid,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(recCandidateCreateInterviewSchema),
  });
  const [interviewStatus, setInterviewStatus] = useState(0);
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);

  // Interview DETAIL BY CANDIDATE;
  const { data: candidateInterviewDetail } = useEmployeeMaster(
    `${CANDIDATE_INTERVIEW_DETAIL}/${selectedField}`,
    "candidateInterviewDetail",
  );

  console.log(candidateInterviewDetail?.interview_start_stop);
  useEffect(() => {
    if (candidateInterviewDetail?.interview_start_stop) {
      setInterviewStatus(
        parseInt(candidateInterviewDetail?.interview_start_stop),
      );
    }
  }, [setInterviewStatus]);

  console.log(interviewStatus);
  // CANDIDATE MASTERS;
  const { data: candidateMasters } = useEmployeeMaster(
    CANDIDATE_MASTER,
    "candidateMasters",
  );

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("candidate_id", cid);
      formData.append("scheduled_date", data?.scheduled_date);
      formData.append("interview_time", data?.interview_time);
      formData.append("interview_guide_id", data?.interview_guide_id?.id);

      const res = await XFormRequest.post(api, formData);
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
        `candidate-interview-start-stop/${cid}`,
        { interview_start_stop: 2 },
      );
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
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
            <button
              onClick={handleInterviewStartStop}
              className="flex h-10 cursor-pointer items-center gap-2 rounded bg-black px-5 text-[0.8rem] font-medium capitalize text-white"
            >
              Start Interview
              <Clock className="size-5" />
            </button>

            <form
              className="grid grid-cols-1 gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="group mt-5 flex flex-col space-y-1">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Have You Finished The Interview ?
                </label>
                <Controller
                  name="interview_guide_id"
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
                {errors.interview_guide_id && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.interview_guide_id?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Select Performance
                </label>
                <Controller
                  name="interview_guide_id"
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
                {errors.scheduled_date && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.scheduled_date?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Pass/ Fail
                </label>
                <Controller
                  name="interview_guide_id"
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
                {errors.interview_time && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.interview_time?.message}
                  </span>
                )}
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Interview Notes</label>
                <textarea className="input-box h-24" />
              </div>
              <div className="flex flex-row items-center justify-center gap-3">
                <button
                  type="submit"
                  className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                  disabled={loader}
                >
                  {loader ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                      {selectedField ? "Updating" : "Saving"}
                    </div>
                  ) : (
                    <span>{selectedField ? "Update" : "Add"}</span>
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
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
