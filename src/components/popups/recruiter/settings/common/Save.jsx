import { newRequest, XFormRequest } from "@/api";
import { employeeMasterOptions } from "@/constants/data";
import { EmployeeMasterCommanFormSchema } from "@/schema/dashboard/employee/masters/employeeType.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function SaveRecruiterMasterForm({
  popupOpen,
  setPopupOpen,
  selectedField,
  setSelectedField,
  qrKey,
  type,
  colKeys,
  api,
})
 {
  console.log(qrKey, type, colKeys, api);
  
  let enableKey = selectedField === 0 ? false : true;
  const queryClient = useQueryClient();
  const [description, setDescription] = useState("");
  const [isdefault, setIsDefault] = useState(false);
  const [loader, setLoader] = useState(false);
  const [generateLoader, setGenerateLoader] = useState(false);
  // Get selected data
  const { data: recMastersDetailByid, isLoading } = useQuery({
    queryKey: ["recMastersDetailByid", colKeys, type, api, selectedField],
    queryFn: () =>
      newRequest.get(`${api}/${selectedField}`).then((res) => res.data),
    enabled: enableKey,
  });
console.log(type);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(EmployeeMasterCommanFormSchema),
  });

  useEffect(() => {
    if (recMastersDetailByid) {
      setValue("name", recMastersDetailByid?.[colKeys.field1?.key]);
      setValue("status", recMastersDetailByid?.[colKeys.field2?.key]);
    }
  }, [recMastersDetailByid, type, setValue]);

  useEffect(() => {
    if (type === "Job Description") {
      setDescription(recMastersDetailByid?.[colKeys?.field3?.key]);
    }
  }, [recMastersDetailByid, type, setDescription]);

  useEffect(() => {
    if (recMastersDetailByid?.is_default) {
      setIsDefault(recMastersDetailByid?.is_default?.id === "1" ? true : false);
    }
  }, [recMastersDetailByid, setIsDefault]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    setDescription('');
    reset();
  }

  const Generate_text = async () => {
    const nameValue = getValues("name"); // Get the value of the "name" field
    if (!nameValue) {
      toast.error("Enter a Job Description");
      return;
    }

    try {
      setGenerateLoader(true);
      const genAI = new GoogleGenerativeAI(
        "AIzaSyCBgwP-pT6WdPM9ksvpEbZT44BZSYML8yM",
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Write a job description for ${nameValue} within 300 words`;

      const result = await model.generateContent(prompt);

      // Extract the full content text from the response
      const jobDescription = result.response.text();

      setDescription(jobDescription);
      setGenerateLoader(false);
    } catch (error) {
      console.error("Error generating text:", error.message);
      setDescription("Error generating text. Please try again.");
    }
  };
  const isJobDescription = type === "Job Description";
  const onSubmit = async (data) => {
    if (isJobDescription && !description) {
      setError("jobDescription", {
        type: "manual",
        message: "Job description is required",
      });
      return;
    }
    setLoader(true);

    try {
      const formData = new URLSearchParams();
      formData.append(colKeys.field1?.key, data?.name);
      formData.append(colKeys.field2?.key, data?.status?.value);
      type === "Profile Questions" &&
        formData.append("is_default", isdefault ? 1 : 0);
      type === "Job Description" &&
        formData.append("job_description", description);
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

  const customizedDescription = description
    ? description
        .replace(/(\*\*Job Title:\*\*)/g, "<br /><strong>Job Title:</strong>")
        .replace(
          /(\*\*Job Description:\*\*)/g,
          "<br /><strong>Job Description:</strong>",
        )
        .replace(
          /(\*\*About the Role:\*\*)/g,
          "<br /><strong>About the Role:</strong>",
        )
        .replace(/(\*\*Department:\*\*)/g, "<br /><strong>Department:</strong>")
        .replace(/(\*\*Reports To:\*\*)/g, "<br /><strong>Reports To:</strong>")
        .replace(/(\*\*Summary:\*\*)/g, "<br /><strong>Summary:</strong>")
        .replace(
          /(\*\*Responsibilities:\*\*)/g,
          "<br /><strong>Responsibilities:</strong>",
        )
        .replace(
          /(\*\*Qualifications:\*\*)/g,
          "<br /><strong>Qualifications:</strong>",
        )
        .replace(
          /(\*\*Bonus Points:\*\*)/g,
          "<br /><strong>Bonus Points:</strong>",
        )
    : "";

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
            className={`data-[closed]:transform-[scale(95%)] w-full rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0 ${isJobDescription ? "max-w-2xl" : "max-w-md"}`}
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                {selectedField ? "Update" : "Add"} {type}
              </h1>
              <div className="flex">
                {type === "Job Description" && (
                  <button
                    className="rounded bg-red-500 px-4 py-2 text-sm font-extrabold text-white"
                    onClick={Generate_text}
                    disabled={generateLoader}
                  >
                    {generateLoader ? (
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                        Generating
                      </div>
                    ) : (
                      <span>Generate</span>
                    )}
                  </button>
                )}
                <button
                  onClick={close}
                  className="px-4 py-2 text-lg font-extrabold text-[#00000080]"
                >
                  <X />
                </button>
              </div>
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
                    {type}
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="input-box h-10 w-full"
                  />
                  {errors.name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.name?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1 z-50">
                  <label className="required label-text">Status</label>
                  <Controller
                    name="status"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={employeeMasterOptions}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select Status"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    )}
                  />
                  {errors.status && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.status?.message}
                    </span>
                  )}
                </div>
                {type === "Job Description" ? (
                  <div className="group flex flex-col space-y-1">
                    <label className="required text-sm font-bold text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Description-Professionals
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={customizedDescription}
                      onChange={setDescription}
                      placeholder={"Type here.."}
                      className="flex-grow rounded-md border-black/10 placeholder:text-[#8b8b8b]"
                    />
                    {errors?.jobDescription && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.jobDescription?.message}
                      </span>
                    )}
                  </div>
                ) : null}

                {type === "Profile Questions" ? (
                  <div className="group flex w-full items-center gap-3">
                    <label className="required label-text">Is Default</label>
                    <div className="flex">
                      <input
                        onChange={(e) => {
                          setIsDefault(e.target.checked);
                        }}
                        checked={isdefault}
                        className="size-5"
                        type="checkbox"
                        name=""
                        id=""
                      />
                    </div>
                    {errors.status && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.status?.message}
                      </span>
                    )}
                  </div>
                ) : null}

                <div className="z-10 mt-2 flex flex-row items-center justify-center gap-3">
                  <button
                    type="submit"
                    className="flex h-11 w-full !cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
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
              </form>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
