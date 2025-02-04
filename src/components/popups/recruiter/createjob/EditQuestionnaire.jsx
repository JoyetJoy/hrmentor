import { newRequest, XFormRequest } from "@/api";
import { recruiterAppQuestionnaireSchema } from "@/schema/dashboard/recruiter/job/applicationQuestion.schema";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function EditQuestionnaireForm({
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
  const [options, setOptions] = useState([{ value: "" }]);

  // Get selected data
  const { data: questionnaireDetailByid, isLoading } = useQuery({
    queryKey: ["questionnaireDetailByid", api, selectedField],
    queryFn: () =>
      newRequest
        .get(`Jobs-screening-question-options/${selectedField}/${jid}`)
        .then((res) => res.data),
    enabled: !!selectedField != 0,
  });

  console.log(questionnaireDetailByid?.candidateScreeningQuestionOptions);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(recruiterAppQuestionnaireSchema),
  });

  useEffect(() => {
    if (questionnaireDetailByid) {
      setValue("question", questionnaireDetailByid?.question_detail?.question);
      setValue(
        "is_required",
        questionnaireDetailByid?.question_detail?.is_required,
      );
    }
  }, [questionnaireDetailByid, setValue]);

  useEffect(() => {
    if (questionnaireDetailByid) {
      setOptions(() => {
        const options =
          questionnaireDetailByid?.candidateScreeningQuestionOptions.map(
            (option) => ({ value: option.option }),
          );
        return options;
      });
    }
  }, [questionnaireDetailByid, setOptions]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
    setOptions([{ value: "" }]);
  }

  const handleAddOption = () => {
    setOptions([...options, { value: "" }]);
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleChangeOption = (index, value) => {
    setOptions(options.map((option, i) => (i === index ? { value } : option)));
  };

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = {
        id: selectedField || null,
        question: data.question,
        is_required: data.is_required ? 1 : 0,
        options: options
          .filter((opt) => opt.value)
          .map((opt) => ({ value: opt.value })),
      };
      const res = await XFormRequest.post(
        "Jobs-screening-question-update",
        formData,
      );

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
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-lg rounded bg-white/90 p-6 px-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                Edit
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
                <div className="group flex flex-col gap-y-1">
                  <label className="text-sm font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Question
                  </label>
                  <input
                    {...register("question")}
                    type="text"
                    className="input-box h-10 w-full"
                  />
                  <div className="flex items-center gap-2 py-2 text-sm">
                    <input
                      type="checkbox"
                      {...register("is_required")}
                      className="size-4"
                    />
                    <span>Required an answer to this question</span>
                  </div>
                  <div className="flex gap-1 text-sm">
                    Answer Type:{" "}
                    <b>
                      {
                        questionnaireDetailByid?.question_detail
                          ?.answer_type_value?.answer_type_name
                      }
                    </b>
                  </div>
                  {options.map((option, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                        Option {index + 1}
                      </label>
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={option.value}
                          onChange={(e) =>
                            handleChangeOption(index, e.target.value)
                          }
                          className="input-box h-10 w-full"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(index)}
                          className="text-[#ff0000] hover:text-[#ff0000aa]"
                        >
                          <X className="h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  onClick={handleAddOption}
                  className="my-4 flex h-11 w-fit cursor-pointer items-center gap-1 rounded border border-black/10 px-5 text-sm"
                >
                  <Plus className="h-4" />
                  Add New Option
                </div>

                <div className="mt-2 flex flex-row items-center justify-center gap-3">
                  <button
                    type="submit"
                    className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                    disabled={loader}
                  >
                    {loader ? (
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                        Saving
                      </div>
                    ) : (
                      <span>Add</span>
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
