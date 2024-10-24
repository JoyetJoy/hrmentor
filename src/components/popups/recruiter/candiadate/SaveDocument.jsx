import { newRequest, XFormRequest } from "@/api";
import { EMPLOYEE_DOCUMENT_TYPE_LIST } from "@/api/master";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import useImageUpload from "@/hooks/useImageUpload";
import { recCandidateDocumentSchema } from "@/schema/dashboard/recruiter/candidate/candidate.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";

export default function SaveCandidateDocument({
  popupOpen,
  setPopupOpen,
  selectedField,
  setSelectedField,
  qrKey,
  api,
  cid,
}) {
  const { data: documentTypes } = useEmployeeMaster(
    EMPLOYEE_DOCUMENT_TYPE_LIST,
    "documentTypes",
  );
  const {
    image: document,
    imageFile: documentFile,
    handleImageChange: handleDocumentChange,
    clearImage: clearDocument,
    setImage: setDocument,
  } = useImageUpload();

  let enableKey = selectedField === 0 ? false : true;
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
  // Get selected data
  const { data: recCandidateDocumentByid, isLoading } = useQuery({
    queryKey: ["recCandidateDocumentByid", api, selectedField],
    queryFn: () =>
      newRequest
        .get(`candidate-document-id/${selectedField}`)
        .then((res) => res.data),
    enabled: enableKey,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(recCandidateDocumentSchema),
  });

  useEffect(() => {
    if (recCandidateDocumentByid) {
      setValue("document_name", recCandidateDocumentByid?.document_name);
      setValue("document_type_id", recCandidateDocumentByid?.documentTypeName);
    }
  }, [recCandidateDocumentByid, setValue]);

  useEffect(() => {
    if (recCandidateDocumentByid) {
      setDocument(recCandidateDocumentByid?.file);
    }
  }, [recCandidateDocumentByid, setDocument]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    clearDocument();
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("document_name", data?.document_name);
      formData.append("document_type_id", data?.document_type_id?.id);
      documentFile && formData.append("file", documentFile);
      let res;
      if (selectedField !== 0) {
        res = await XFormRequest.patch(`${api}/${selectedField}`, formData);
      } else {
        res = await XFormRequest.post(`${api}/${cid}`, formData);
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
  const handleImageError = (event) => {
    event.target.src = "/assets/icons/tort.svg";
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
                {selectedField ? "Update" : "Add"} Candidate Document
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
                    Document Name
                  </label>
                  <input
                    {...register("document_name")}
                    type="text"
                    className="input-box"
                  />

                  {errors.document_name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.document_name?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Document Type</label>
                  <Controller
                    name="document_type_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={documentTypes}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select document type"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    )}
                  />
                  {errors.document_type_id && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.document_type_id?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5">
                  <label className="label-text">File </label>
                  {document ? (
                    <div className="relative">
                      <img
                        src={document}
                        alt="Uploaded"
                        onError={handleImageError}
                        className="max-h-24 w-full rounded-md border border-black/20 object-contain"
                      />
                      <X
                        onClick={clearDocument}
                        className="absolute -right-2 -top-2 h-5 w-5 cursor-pointer rounded-full bg-hrmdarkblue p-1 text-white"
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="employee-profile-pic"
                      className="input-box flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed"
                    >
                      <div className="flex items-center gap-2">
                        <UploadCloud />
                        <span className="font-semibold text-[#2C2C2C]">
                          Upload File
                        </span>
                      </div>
                      <input
                        id="employee-profile-pic"
                        onChange={handleDocumentChange}
                        type="file"
                        className="hidden"
                      />
                    </label>
                  )}
                  {errors.employeeId && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.employeeId?.message}
                    </span>
                  )}
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
