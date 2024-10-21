import { EMPLOYEE_TYPE_LIST, REC_INTERVIEW_TYPES, SALARY_DEFAULT_MASTERS } from "@/api/master";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, X } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
  }

  const [notes, setNotes] = useState("");
  // EMOPLOYEE TYPE LIST
  const { data: employeeTypeList } = useEmployeeMaster(
    EMPLOYEE_TYPE_LIST,
    "employeeTypeList",
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
  const { data: jobHiringMemberByid, isLoading } = useQuery({
    queryKey: ["jobHiringMemberByid", api, selectedField],
    queryFn: () =>
      newRequest.get(`${api}/${selectedField}`).then((res) => res.data),
    enabled: !!selectedField != 0,
  });
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(),
  });
  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new URLSearchParams();
      formData.append("job_id", jid);
      formData.append("user_id", data?.user_id?.id);
      formData.append("recruiting_role", data?.recruiting_role?.value);
      let res;
      if (selectedField !== 0) {
        res = await XFormRequest.patch(`${api}/${selectedField}`, formData);
      } else {
        res = await XFormRequest.post(api, formData);
      }
      if (res?.data?.success === true) {
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
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
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
                <div className="my-1 h-screen w-full overflow-hidden rounded-md bg-white p-3">
                  <div className="mb-7 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowLeft className="size-4" />
                      <p className="text-base font-bold text-black">
                        Create Interview Guide
                      </p>
                    </div>
                    <button
                      onClick={close}
                      className="text-lg font-extrabold text-[#00000080]"
                    >
                      <X />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-x-10">
                    <div className="grid grid-cols-2 gap-x-3 py-2">
                      <div className="group flex flex-col px-3 py-2">
                        <label className="required label-text">
                          Interview Type
                        </label>
                        <Controller
                          name="bloodGroup"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              isSearchable={false}
                              styles={customSelectStyles}
                              placeholder="Select"
                              className="input-box h-10 w-full focus:border-gray-300"
                            />
                          )}
                        />
                        {errors.bloodGroup && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.bloodGroup?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col px-3 py-2">
                        <label className="required label-text">
                          Interview Mode
                        </label>
                        <Controller
                          name="bloodGroup"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              isSearchable={false}
                              styles={customSelectStyles}
                              placeholder="Select"
                              className="input-box h-10 w-full focus:border-gray-300"
                            />
                          )}
                        />
                        {errors.bloodGroup && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.bloodGroup?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-2">
                        <label className="required label-text">Duration</label>
                        <input
                          autoComplete="off"
                          type="text"
                          placeholder="Hrs"
                          className="input-box"
                        />
                        {errors.job_title && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.job_title?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1 px-3 py-2 mt-6">
                        <input
                          autoComplete="off"
                          type="text"
                          placeholder="Min"
                          className="input-box"
                        />
                        {errors.job_title && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.job_title?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col px-3 py-2">
                        <label className="required label-text">
                          Candidate type
                        </label>
                        <Controller
                          name="bloodGroup"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              // required
                              //   selected={''}
                              //   value={''}
                              //   onChange={(selectedOption) => {
                              //     handle(selectedOption);
                              //     field.onChange(selectedOption);
                              //   }}
                              //   options={}
                              isSearchable={false}
                              styles={customSelectStyles}
                              placeholder="Select Candidate type"
                              className="input-box h-10 w-full focus:border-gray-300"
                            />
                          )}
                        />
                        {errors.bloodGroup && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.bloodGroup?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col px-3 py-2">
                        <label className="label-text">Interviewer</label>
                        <Controller
                          name="bloodGroup"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              // required
                              //   selected={''}
                              //   value={''}
                              //   onChange={(selectedOption) => {
                              //     handle(selectedOption);
                              //     field.onChange(selectedOption);
                              //   }}
                              //   options={}
                              isSearchable={false}
                              styles={customSelectStyles}
                              placeholder="Select interviewer"
                              className="input-box h-10 w-full focus:border-gray-300"
                            />
                          )}
                        />
                        {errors.bloodGroup && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.bloodGroup?.message}
                          </span>
                        )}
                      </div>
                      <div className="my-5 flex gap-5 px-3 py-2">
                        <div className="flex h-10 w-1/2 items-center justify-center rounded-md border border-[#ECE9F1] font-semibold">
                          Cancel
                        </div>
                        <button
                          // onClick={() => navigate("/admin/recruiter/request-refferals")}
                          className="flex h-10 w-1/2 cursor-pointer items-center justify-center rounded-md bg-[#181C3A] font-semibold text-white"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="group flex flex-col px-3 py-2">
                        <label className="label-text">Preparation notes</label>
                        <ReactQuill
                          theme="snow"
                          value={notes}
                          onChange={setNotes}
                          placeholder={"Type here.."}
                          className="overflow-y-min h-full max-h-96 w-full flex-grow overflow-y-auto rounded-md bg-[#F5F5F5] placeholder:text-[#8b8b8b]"
                        />
                      </div>
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
