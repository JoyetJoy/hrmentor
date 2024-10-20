import MenuHeader from "@/components/common/MenuHeader";
import CreateJobSideBar from "@/components/sidebars/recruiter/CreateJobSideBar";
import { customSelectStyles } from "@/utils/customStyles";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Select from "react-select";
import { ArrowLeft, ChevronRight, Eye, X } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GET_PROFILE_QUESTIONS, SALARY_DEFAULT_MASTERS } from "@/api/master";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { newFormRequest, newRequest, XFormRequest } from "@/api";
import {
  CHANGE_STATUS_PROFILE_QUESTION,
  DELETE_PROFILE_QUESTION,
  GET_PROFILE_QUESTIONNAIRE,
  POST_PROFILE_QUESTION,
  POST_PROFILE_QUESTIONNAIRE,
} from "@/api/recruiter";
import toast from "react-hot-toast";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { recruiterApplicationQuestionSchema } from "@/schema/dashboard/recruiter/job/applicationQuestion.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteConfirmation from "@/components/common/DeleteConfirmation";
import QuestionnaireListing from "@/components/recruiter/job/application/QuestionnaireListing";

function JobApplicationQuestion() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jid = searchParams.get("jid");
  const navigate = useNavigate();
  const [profileQuestions, setProfileQuestions] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [pQloader, setPQLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(recruiterApplicationQuestionSchema),
  });

  // GET PROFILE QUESTIONS;
  const { data: jobProfileQuestions } = useQuery({
    queryKey: ["jobProfileQuestions", jid],
    queryFn: () =>
      newRequest.get(`${GET_PROFILE_QUESTIONS}/${jid}`).then((res) => {
        return res.data;
      }),
    enabled: !!jid,
  });

  // GET PROFILE QUESTIONNAIRE;
  const { data: jobProfileQuestionnaire } = useQuery({
    queryKey: ["jobProfileQuestionnaire", jid],
    queryFn: () =>
      newRequest.get(`${GET_PROFILE_QUESTIONNAIRE}/${jid}`).then((res) => {
        return res.data;
      }),
    enabled: !!jid,
  });

  // RECRUITER MASTERS LISTING
  const { data: recruiterMasters } = useEmployeeMaster(
    SALARY_DEFAULT_MASTERS,
    "recruiterMasters",
  );

  const handleUpdateProfileQuestion = async () => {
    setPQLoader(true);
    try {
      const res = await newRequest.post(POST_PROFILE_QUESTION, {
        job_list_id: parseInt(jid),
        profile_questions: profileQuestions?.map((i) => {
          return {
            profile_question_id: i,
          };
        }),
      });
      if (res?.status === 200) {
        queryClient.invalidateQueries(["jobProfileQuestions"]);
        setPQLoader(false);
        setLoader(false);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      setPQLoader(false);
      console.log(error);
      toast.error(error?.response?.data?.error);
    }
  };

  // CHANGE STATUS PROFILE QUESTION
  const handleChangeProfileQuestion = async (
    is_required,
    candidate_profile_question_id,
  ) => {
    const formData = new FormData();
    formData.append("is_required", is_required);
    formData.append(
      "candidate_profile_question_id",
      candidate_profile_question_id,
    );
    try {
      const res = await XFormRequest.post(
        CHANGE_STATUS_PROFILE_QUESTION,
        formData,
      );
      if (res?.status === 200) {
        queryClient.invalidateQueries(["jobProfileQuestions"]);
        setPQLoader(false);
        setLoader(false);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      setPQLoader(false);
      console.log(error);
      toast.error(error?.response?.data?.error);
    }
  };

  const onSubmit = (data) => {
    setLoader(true);
    handleSave(data);
  };
  const handleSave = async (data) => {
    const formData = new FormData();
    formData.append("job_list_id", jid);
    formData.append("answer_type", data.answer_type?.id);
    formData.append("is_required", data.is_required ? 1 : 0);
    formData.append("question", data.question);
    try {
      const res = await newFormRequest.post(
        POST_PROFILE_QUESTIONNAIRE,
        formData,
      );
      if (res.data?.status === 201) {
        toast.success(res?.data?.message);
        queryClient.invalidateQueries(["jobDetails"]);
        reset();
        setLoader(false);
      } else {
        toast.error("Failed to save questionnaire.");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save questionnaire.");
      setLoader(false);
    }
  };
  return (
    <>
      <MenuHeader
        backlink={""}
        menu={"Menu"}
        subMenu={""}
        currentpath={"Recruiter"}
        activeMenu={"Jobs"}
      />

      <DeleteConfirmation
        open={deletePopup}
        onCancel={setDeletePopup}
        selectedId={selectedField}
        qrkey={"jobProfileQuestions"}
        api={DELETE_PROFILE_QUESTION}
      />

      <div className="flex flex-row items-start justify-between gap-3">
        <div className="w-full">
          <div className="mb-3 mt-1 flex items-center justify-between">
            <h1 className="text-md flex flex-row items-center justify-center gap-2 font-bold text-black">
              <ArrowLeft
                onClick={() => history.back()}
                className="size-4 cursor-pointer"
              />
              Create New Job <div className="h-4 w-[.07rem] bg-[#B0B0B0]"></div>
              <span className="text-sm font-medium text-[#2C2C2C]">
                Application
              </span>
            </h1>
            <button
              onClick={() => {
                navigate(`/admin/recruiter/jobs/hiring-team?job=${jid}`);
              }}
              className="btn flex h-10 min-h-10 min-w-24 items-center rounded bg-hrmprimaryorange text-sm font-medium text-white transition-all duration-500 hover:bg-[#030E5C]/70"
            >
              Next
            </button>
          </div>
          <div className="w-full rounded-md bg-white px-7 py-4">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-base font-medium text-[#2C2C2C]">
                  Customize the application that candidate will complete when
                  they apply.
                </p>
                <p className="text-medium text-sm text-[#7F7F7F]">
                  All the preset questions and the custom questions for the
                  application to make it easier to screen candidate later.
                </p>
              </div>
              <Link className="btn flex flex-row items-center gap-2 border border-[#181C3A] bg-white text-[#181C3A]">
                <Eye className="size-4" />
                Application Preview
              </Link>
            </div>
            <div>
              <p className="my-7 flex flex-row items-center gap-4 whitespace-nowrap text-sm font-bold">
                Job application
                <div className="h-px w-full bg-[#ECE9F1]"></div>
              </p>
              <div className="mb-7 flex flex-col gap-1">
                <p className="text-base font-medium text-[#2C2C2C]">
                  Select the standard profile questions you want all candidate
                  to answer.
                </p>
                <p className="text-medium text-sm text-[#7F7F7F]">
                  Some field are required and cannot be removed from the
                  application, while other field are optional, including the
                  resume.
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <div className="w-full rounded-md border border-[#ECE9F1]">
                  <h1 className="rounded-t-sm bg-[#EBEBF0] px-5 py-5 text-sm font-semibold text-[#181C3A]">
                    Candidate profile questions
                  </h1>
                  <div className="flex flex-col gap-2 px-4 pb-16 pt-4">
                    {jobProfileQuestions?.default_profile_questions?.map(
                      (i) => {
                        console.log(i);
                        return (
                          <div className="label cursor-pointer justify-between rounded-sm bg-[#F5F5F7] px-4 py-3 text-xs font-medium text-[#2C2C2C]">
                            <div className="flex flex-row items-center gap-2">
                              <input
                                type="checkbox"
                                onChange={(e) => {
                                  let checked = e.target.checked;
                                  let value = checked ? 1 : 0;
                                  handleChangeProfileQuestion(value, i?.id);
                                }}
                                checked={i?.is_required ? 1 : 0}
                                className="checkbox size-4 rounded-sm checked:accent-slate-600"
                              />
                              <span className="label-text">{i?.label}</span>
                            </div>
                            <X
                              onClick={() => {
                                setSelectedField(i?.id);
                                setDeletePopup(true);
                              }}
                              className="size-4 rounded-sm border border-[#D0D0D0] text-[#2C2C2C]"
                              strokeWidth={1}
                            />
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
                <div className="w-full rounded-md border border-[#ECE9F1]">
                  <h1 className="rounded-t-sm bg-[#EBEBF0] px-5 py-5 text-sm font-semibold text-[#181C3A]">
                    Select profile questions
                  </h1>
                  <div className="flex flex-col gap-2 px-4 py-4">
                    {jobProfileQuestions?.profile_questions?.map((i) => {
                      return (
                        <label className="label cursor-pointer justify-between rounded-sm bg-[#F5F5F7] px-4 py-3 text-xs font-medium text-[#2C2C2C]">
                          <div className="flex flex-row items-center gap-2">
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  profileQuestions.push(i?.id);
                                  setProfileQuestions([...profileQuestions]);
                                  console.log(profileQuestions);
                                } else {
                                  let id = i?.id;
                                  setProfileQuestions(() => {
                                    return profileQuestions.filter(
                                      (item) => item !== id,
                                    );
                                  });
                                }
                              }}
                              className="checkbox size-4 rounded-sm checked:accent-slate-600"
                            />
                            <span className="label-text">{i?.label}</span>
                          </div>
                        </label>
                      );
                    })}
                    <div
                      onClick={handleUpdateProfileQuestion}
                      className="mx-auto mt-4 flex h-10 w-fit cursor-pointer items-center rounded bg-black/70 px-5 text-sm font-semibold text-white"
                    >
                      {pQloader ? (
                        <div className="flex items-center gap-3">
                          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                          Updating
                        </div>
                      ) : (
                        "Update"
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Disclosure as="div" className="" defaultOpen={false}>
                  <DisclosureButton className="group my-14 flex w-full items-center gap-x-2 font-bold">
                    <div className="flex size-5 items-center justify-center rounded-full bg-[#F7F7F7]">
                      <ChevronRight className="size-6 group-data-[open]:rotate-90 group-data-[hover]:text-black/50" />
                    </div>
                    <p className="flex w-full flex-row items-center gap-1 whitespace-nowrap text-sm">
                      Screening questionnaire(Optional)
                      <div className="h-px w-full bg-[#ECE9F1]"></div>
                    </p>
                  </DisclosureButton>
                  <DisclosurePanel className="text-sm/5 text-black/50">
                    <div>
                      <div className="mb-10 flex flex-col gap-1">
                        <p className="text-base font-medium text-[#2C2C2C]">
                          Get answer to job-specific questions by attaching a
                          questionnaire.
                        </p>
                        <p className="text-medium text-sm text-[#7F7F7F]">
                          Questionnaire are reusable template that can be
                          attached to the job application or Sent to candidates
                          after they apply
                        </p>
                      </div>
                      <div className="mt-3 flex flex-row items-start justify-between gap-8">
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="w-full"
                        >
                          <h1 className="mb-5 text-sm font-bold text-[#2C2C2C]">
                            Create questionnaire
                          </h1>
                          <div className="group flex flex-col gap-1 py-2">
                            <label className="text-s label-text font-medium">
                              Name the questionnaire
                            </label>
                            <input
                              autoComplete="off"
                              type="text"
                              placeholder="Type Here"
                              {...register("question", { required: true })}
                              className="input-box h-10 w-full placeholder:text-xs placeholder:text-[#7F7F7F] focus:border-gray-300"
                            />
                            {errors.question && (
                              <span className="text-xs font-medium text-red-500">
                                {errors.question?.message}
                              </span>
                            )}
                            <label className="label cursor-pointer justify-normal gap-1.5 text-xs">
                              <input
                                type="checkbox"
                                {...register("is_required", { required: true })}
                                className="checkbox size-4 rounded-sm checked:accent-slate-600"
                              />
                              <span className="label-text text-xs">
                                Required an answer to this question
                              </span>
                            </label>
                          </div>
                          <div className="group flex flex-col gap-1 py-2">
                            <label className="label-text">Answer type</label>
                            <Controller
                              name="answer_type"
                              control={control}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isSearchable={false}
                                  styles={customSelectStyles}
                                  options={recruiterMasters?.answerTypes}
                                  placeholder="Select Type"
                                  className="input-box"
                                />
                              )}
                            />
                            {errors.answer_type && (
                              <span className="text-xs font-medium text-red-500">
                                {errors.answer_type?.message}
                              </span>
                            )}
                          </div>
                          <div className="mt-6 flex flex-row items-center justify-between">
                            <div
                              onClick={() => {
                                reset();
                              }}
                              className="btn h-11 min-h-11 border border-[#ECE9F1] bg-white px-12 text-[#7F7F7F] hover:border-[#ECE9F1] hover:bg-white"
                            >
                              Clear
                            </div>
                            <button
                              type="submit"
                              className="btn h-11 min-h-11 bg-bgColor-100 px-12 text-white hover:bg-bgColor-100"
                            >
                              {loader ? (
                                <div className="flex items-center gap-3">
                                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                                  Saving
                                </div>
                              ) : (
                                "Create"
                              )}
                            </button>
                          </div>
                        </form>
                        <QuestionnaireListing
                          jobProfileQuestionnaire={jobProfileQuestionnaire}
                          jid={jid}
                        />
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <CreateJobSideBar stepCounter={2} />
      </div>
    </>
  );
}

export default JobApplicationQuestion;
