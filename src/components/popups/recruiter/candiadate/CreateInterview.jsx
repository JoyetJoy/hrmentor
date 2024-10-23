import { ACTIVE_EMPLOYEE, newRequest, XFormRequest } from "@/api";
import { INTERVIEW_GUIDES_LIST, INTERVIEWERS_BY_GUID } from "@/api/recruiter";
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

  const [selectedInterviewers, setSelectedInterviewers] = useState([]);
  const [selectedpeople, setSelectedPeople] = useState([]);
  const { interview_guide_id } = watch();

  // INTERVIEW_GUIDES_LIST
  const { data: interviewGuideList } = useEmployeeMaster(
    `${INTERVIEW_GUIDES_LIST}/6`,
    "interviewGuideList",
  );

  //   INTERVIWERS
  const { data: interviewersList } = useEmployeeMaster(
    ACTIVE_EMPLOYEE,
    "interviewersList",
  );
  //   INTERVIEWERS BY GUIDE ID;
  const { data: interviewersByGuideId } = useEmployeeMaster(
    `${INTERVIEWERS_BY_GUID}/${interview_guide_id?.id}`,
    "interviewersByGuideId",
  );

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
  let interviewer_id = selectedInterviewers?.map((i) => {
    return i.id;
  });

  useEffect(() => {
    if (interviewersByGuide?.length) {
      setSelectedInterviewers(interviewersByGuide);
    }
  }, [interviewersByGuide, setSelectedInterviewers]);

  const handleSelectNewInterviewer = () => {
    const newInterviewers = selectedpeople;
    // check only added once
    setSelectedInterviewers([
      ...selectedInterviewers,
      ...newInterviewers.filter(
        (person) => !selectedInterviewers.includes(person),
      ),
    ]);
  };

  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
  // Get selected data
  const { data: recCandidateDocumentByid, isLoading } = useQuery({
    queryKey: ["recCandidateDocumentByid", api, selectedField],
    queryFn: () =>
      newRequest
        .get(`candidate-document-id/${selectedField}`)
        .then((res) => res.data),
    enabled: !!selectedField != 0,
  });

  useEffect(() => {
    if (recCandidateDocumentByid) {
      setValue("document_name", recCandidateDocumentByid?.document_name);
      setValue("document_type_id", recCandidateDocumentByid?.documentTypeName);
    }
  }, [recCandidateDocumentByid, setValue]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("candidate_id", cid);
      formData.append("scheduled_date", data?.scheduled_date);
      formData.append("interview_time", data?.interview_time);
      formData.append("interview_guide_id", data?.interview_guide_id);
      formData.append("interviewer_id", JSON.stringify(interviewer_id));
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
                  <input
                    {...register("interview_time")}
                    type="time"
                    className="input-box"
                  />

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
                      {i.label}
                      <CircleXIcon
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
