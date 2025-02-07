import { ACTIVE_EMPLOYEE, newRequest, XFormRequest } from "@/api";
import {
  CANDIDATE_TYPE_LIST,
  REC_INTERVIEW_TYPES,
  SALARY_DEFAULT_MASTERS,
} from "@/api/master";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { interviewGuidelineSchema } from "@/schema/dashboard/recruiter/job/applicationQuestion.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import Select from "react-select";

function InterviewGuideline({
  popupOpen,
  setPopupOpen,
  selectedField,
  setSelectedField,
  qrKey,
  api,
  jid,
}) {
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
  const [notes, setNotes] = useState("");

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(interviewGuidelineSchema),
  });

  function close() {
    setSelectedField(0);
    reset();
    setNotes("");
    setPopupOpen(false);
  }

  let enableKey = selectedField === 0 ? false : true;

  const { data: recInterviewGuidelinebyId, isLoading } = useQuery({
    queryKey: ["recInterviewGuidelinebyId", api, selectedField],
    queryFn: () =>
      newRequest.get(`${api}/${selectedField}/edit`).then((res) => res.data),
    enabled: enableKey,
  });

  // EMOPLOYEE TYPE LIST
  const { data: interviewer } = useEmployeeMaster(
    ACTIVE_EMPLOYEE,
    "interviewer",
  );
  const { data: candidateTypes } = useEmployeeMaster(
    CANDIDATE_TYPE_LIST,
    "candidateTypes",
  );
  // INTERVIEW TYPES
  const { data: interviewTypes } = useEmployeeMaster(
    REC_INTERVIEW_TYPES,
    "interviewTypes",
  );
  // MASTERS LISTING
  const { data: employeeMasters } = useEmployeeMaster(
    SALARY_DEFAULT_MASTERS,
    "employeeMasters",
  );

  useEffect(() => {
    if (recInterviewGuidelinebyId) {
      setValue(
        "candidate_type",
        recInterviewGuidelinebyId?.data?.candidate_type,
      );
      setValue(
        "interview_mode",
        recInterviewGuidelinebyId?.data?.interview_mode,
      );
      setValue("interviewer", recInterviewGuidelinebyId?.data?.interviewer);
      setValue(
        "interview_type",
        recInterviewGuidelinebyId?.data?.interview_type,
      );
      setValue("duration_hr", recInterviewGuidelinebyId?.data?.duration_hr);
      setValue(
        "duration_minute",
        recInterviewGuidelinebyId?.data?.duration_minute,
      );
    }
  }, [recInterviewGuidelinebyId, selectedField, setValue]);

  useEffect(() => {
    if (recInterviewGuidelinebyId) {
      setNotes(recInterviewGuidelinebyId?.data?.notes ?? "");
    }
  }, [recInterviewGuidelinebyId, selectedField, setNotes]);

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new URLSearchParams();
      formData.append("job_id", jid);
      formData.append("notes", notes);
      formData.append("interviewer", data.interviewer?.id);
      formData.append("interview_type", data.interview_type?.id);
      formData.append("interview_mode", data.interview_mode?.id);
      formData.append("duration_hr", data.duration_hr);
      formData.append("duration_minute", data.duration_minute);
      formData.append("candidate_type", data.candidate_type?.id);
      let res;
      if (selectedField !== 0) {
        res = await XFormRequest.patch(`${api}/${selectedField}`, formData);
      } else {
        res = await XFormRequest.post(api, formData);
      }
      if (res?.data?.status === 201) {
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

  return (
    <Dialog
      open={popupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-end">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-xl rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            {isLoading ? (
              <div className="flex min-h-72 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <form
                className="grid grid-cols-1 gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="h-screen rounded-md bg-white p-3">
                  <div className="mb-7 flex items-center justify-between">
                    <p className="text-base font-bold text-black">
                      Create Interview Guide
                    </p>
                    <button
                      type="button"
                      onClick={close}
                      className="text-lg font-extrabold text-[#00000080]"
                    >
                      <X />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 py-2">
                    <div className="group flex flex-col py-2">
                      <label className="required label-text">
                        Interview Type
                      </label>
                      <Controller
                        name="interview_type"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable={false}
                            styles={customSelectStyles}
                            options={interviewTypes}
                            placeholder="Select"
                            className="input-box h-10 w-full focus:border-gray-300"
                          />
                        )}
                      />
                      {errors.interview_type && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.interview_type?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col py-2">
                      <label className="required label-text">
                        Interview Mode
                      </label>
                      <Controller
                        name="interview_mode"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable={false}
                            options={employeeMasters?.interviewModes}
                            styles={customSelectStyles}
                            placeholder="Select"
                            className="input-box h-10 w-full focus:border-gray-300"
                          />
                        )}
                      />
                      {errors.interview_mode && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.interview_mode?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col space-y-1 py-2">
                      <label className="required label-text">Duration</label>
                      <input
                        {...register("duration_hr", { required: true })}
                        autoComplete="off"
                        type="text"
                        placeholder="Hrs"
                        className="input-box"
                        onKeyPress={(event) => {
                          if (
                            !/^[0-9]$/.test(event.key) || 
                            event.target.value.length >= 2
                          ) {
                            event.preventDefault();
                          }
                        }}
                      />
                      {errors.duration_hr && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.duration_hr?.message}
                        </span>
                      )}
                    </div>
                    <div className="group mt-6 flex flex-col space-y-1 py-2">
                      <input
                        {...register("duration_minute", { required: true })}
                        autoComplete="off"
                        type="text"
                        placeholder="Min"
                        className="input-box"
                        onKeyPress={(event) => {
                          if (
                            !/^[0-9]$/.test(event.key) || 
                            event.target.value.length >= 2 
                          ) {
                            event.preventDefault();
                          }
                        }}
                      />
                      {errors.duration_minute && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.duration_minute?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col py-2">
                      <label className="required label-text">
                        Candidate type
                      </label>
                      <Controller
                        name="candidate_type"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={candidateTypes}
                            isSearchable={false}
                            styles={customSelectStyles}
                            placeholder="Select Candidate type"
                            className="input-box h-10 w-full focus:border-gray-300"
                          />
                        )}
                      />
                      {errors.candidate_type && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.candidate_type?.message}
                        </span>
                      )}
                    </div>
                    <div className="group flex flex-col py-2">
                      <label className="label-text">Interviewer</label>
                      <Controller
                        name="interviewer"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={interviewer}
                            isSearchable={false}
                            styles={customSelectStyles}
                            placeholder="Select interviewer"
                            className="input-box h-10 w-full focus:border-gray-300"
                          />
                        )}
                      />
                      {errors.interviewer && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.interviewer?.message}
                        </span>
                      )}
                    </div>
                    <div className="group col-span-2 flex flex-col py-2">
                      <label className="label-text">Preparation notes</label>
                      <ReactQuill
                        theme="snow"
                        value={notes}
                        onChange={setNotes}
                        placeholder={"Type here.."}
                        className="overflow-y-min h-full  w-full flex-grow overflow-y-auto rounded-md border border-black/10 placeholder:text-[#8b8b8b]"
                      />
                    </div>
                    <div className="mt-7 flex flex-row items-center justify-center gap-3 px-2">
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
                          <span>{selectedField ? "Update" : "Save"}</span>
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
                  </div>
                </div>
              </form>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default InterviewGuideline;
