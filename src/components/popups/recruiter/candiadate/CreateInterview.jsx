import { ACTIVE_EMPLOYEE, newRequest, XFormRequest } from "@/api";
import {
  CANDIDATE_INTERVIEW_DETAIL,
  INTERVIEW_GUIDES_LIST,
  INTERVIEWERS_BY_GUID,
  JOB_DETAIL_BY_CANDIDATE,
} from "@/api/recruiter";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { recCandidateCreateInterviewSchema } from "@/schema/dashboard/recruiter/candidate/candidate.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleXIcon, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";

export default function RecCreateInterview({
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

  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
  const [time, setTime] = useState({ hour: "", minute: "" });

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0"),
  );

  const handleTimeChange = (key, value) => {
    const updatedTime = { ...time, [key]: value };
    setTime(updatedTime);

    // Combine hour and minute into a single value
    if (updatedTime.hour && updatedTime.minute) {
      setValue("interview_time", `${updatedTime.hour}:${updatedTime.minute}`);
    }
  };
  let enableKey = selectedField === 0 ? false : true;

  // Get selected data
  const { data: candidateInterviewDetail, isLoading } = useQuery({
    queryKey: ["candidateInterviewDetail", api, selectedField],
    queryFn: () =>
      newRequest
        .get(`${CANDIDATE_INTERVIEW_DETAIL}/${selectedField}`)
        .then((res) => res.data),
    enabled: enableKey,
  });

  const [selectedInterviewers, setSelectedInterviewers] = useState([]);
  const [selectedpeople, setSelectedPeople] = useState([]);
  const { interview_guide_id } = watch();

  // JOB DETAIL BY CANDIDATE;
  const { data: candidateAppliedJobDetail } = useQuery({
    queryKey: ["candidateAppliedJobDetail", cid],
    queryFn: () =>
      newRequest
        .get(`${JOB_DETAIL_BY_CANDIDATE}/${cid}`)
        .then((res) => res.data),
    enabled: !!cid,
  });

  // INTERVIEW_GUIDES_LIST
  const { data: interviewGuideList } = useQuery({
    queryKey: ["interviewGuideList", candidateAppliedJobDetail],
    queryFn: () =>
      newRequest
        .get(`${INTERVIEW_GUIDES_LIST}/${candidateAppliedJobDetail?.job_id}`)
        .then((res) => res.data),
    enabled: !!candidateAppliedJobDetail?.job_id,
  });

  //   INTERVIWERS
  const { data: interviewersList } = useEmployeeMaster(
    ACTIVE_EMPLOYEE,
    "interviewersList",
  );
  //   INTERVIEWERS BY GUIDE ID;
  const { data: interviewersByGuideId } = useQuery({
    queryKey: ["interviewersByGuideId", interview_guide_id],
    queryFn: () =>
      newRequest
        .get(`${INTERVIEWERS_BY_GUID}/${interview_guide_id?.id}`)
        .then((res) => res.data),
    enabled: !!interview_guide_id?.id,
  });

  let interviewersByGuide = useMemo(
    () =>
      interviewersByGuideId?.map((guide) => {
        return {
          value: guide.interviewer_name?.id,
          id: guide.interviewer_name?.id,
          label: guide.interviewer_name?.name,
        };
      }),
    [interview_guide_id, interviewersByGuideId],
  );

  useEffect(() => {
    if (interviewersByGuide?.length) {
      setSelectedInterviewers(interviewersByGuide);
    }
  }, [interviewersByGuide, setSelectedInterviewers]);

  useEffect(() => {
    if (candidateInterviewDetail?.interviewers?.length) {
      const existingInterviewers = selectedInterviewers?.map(
        (interviewer) => interviewer.id,
      );
      const prevselectedInterviewers =
        candidateInterviewDetail?.interviewers?.filter(
          (interviewer) => !existingInterviewers?.includes(interviewer.id),
        );
      setSelectedInterviewers(prevselectedInterviewers);
    }
  }, [interviewersByGuide, setSelectedInterviewers]);

  const handleSelectNewInterviewer = () => {
    const newInterviewers = selectedpeople;
    setSelectedInterviewers((prev) => {
      return [
        ...prev,
        ...newInterviewers.filter((person) => {
          return !prev?.some((interviewer) => interviewer?.id === person?.id);
        }),
      ];
    });
  };

  useEffect(() => {
    if (candidateInterviewDetail) {
      setValue(
        "interview_guide_id",
        candidateInterviewDetail?.interview_guide_id,
      );
      setValue("interviewer_id", candidateInterviewDetail?.interviewers);
      setValue("scheduled_date", candidateInterviewDetail?.scheduled_date);
      setValue("interview_time", candidateInterviewDetail?.interview_time);
      if (candidateInterviewDetail?.interview_time) {
        const timeParts = candidateInterviewDetail.interview_time.split(":");
        const updatedTime = {hour: timeParts[0],minute:timeParts[1] };
    setTime(updatedTime);
      }
    }
  }, [candidateInterviewDetail, setValue]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    setSelectedInterviewers([]);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new URLSearchParams();
      formData.append("candidate_id", cid);
      formData.append("scheduled_date", data?.scheduled_date);
      formData.append("interview_time", data?.interview_time);
      formData.append("interview_guide_id", data?.interview_guide_id?.id);
      selectedInterviewers &&
        selectedInterviewers?.forEach((interviewer) => {
          formData.append("interviewer_id[]", interviewer.id);
        });
      let res;
      if (selectedField != 0) {
        res = await XFormRequest.patch(`${api}/${selectedField}`, formData);
      } else {
        res = await XFormRequest.post(api, formData);
      }
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

  const removeInterviewer = (id) => {
    setSelectedInterviewers(
      selectedInterviewers?.filter((interviewer) => interviewer?.id !== id),
    );
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
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                {selectedField ? "Update" : "Add"} Interview
              </h1>
              <button
                onClick={close}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>
            {isLoading ? (
              <div className="flex min-h-72 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <form
                className="grid grid-cols-1 gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Interview Type
                  </label>
                  <Controller
                    name="interview_guide_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={interviewGuideList}
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
                    Date
                  </label>
                  <input
                    {...register("scheduled_date")}
                    type="date"
                    className="input-box"
                  />
                  {errors.scheduled_date && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.scheduled_date?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Scheduled Time
                  </label>
                  <div className="flex space-x-2">
                    {/* Hours Dropdown */}
                    <select
                      className="input-box w-16 text-center"
                      value={time.hour}
                      onChange={(e) => handleTimeChange("hour", e.target.value)}
                    >
                      <option value="" disabled>
                        HH
                      </option>
                      {hours.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>

                    {/* Minutes Dropdown */}
                    <select
                      className="input-box w-16 text-center"
                      value={time.minute}
                      onChange={(e) =>
                        handleTimeChange("minute", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        MM
                      </option>
                      {minutes.map((minute) => (
                        <option key={minute} value={minute}>
                          {minute}
                        </option>
                      ))}
                    </select>
                  </div>

                  {errors.interview_time && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.interview_time?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="label-text">Interviewer</label>
                  <div className="flex items-center gap-2">
                    <Select
                      options={interviewersList}
                      isSearchable={false}
                      isMulti={true}
                      onChange={setSelectedPeople}
                      styles={customSelectStyles}
                      placeholder="Select interviewer"
                      className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                    />
                    <button
                      type="button"
                      onClick={handleSelectNewInterviewer}
                      className="flex h-10 w-12 items-center justify-center rounded bg-black text-white"
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 py-4">
                  {selectedInterviewers?.map((i) => (
                    <div
                      className="relative flex h-8 w-fit min-w-20 items-center justify-center rounded bg-black px-3 text-sm font-medium text-white"
                      key={i.id}
                    >
                      {i?.label}
                      <CircleXIcon
                        onClick={() => removeInterviewer(i.id)}
                        fill="red"
                        className="absolute -right-1 -top-2 size-4"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-row items-center justify-center gap-3">
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
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
