import { newRequest, XFormRequest } from "@/api";
import { HIRING_DOCUMENT_TYPE } from "@/api/hiring";
import { employeeMasterOptions } from "@/constants/data";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
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

export default function SaveHiringMasterForm({
  popupOpen,
  setPopupOpen,
  selectedField,
  setSelectedField,
  qrKey,
  type,
  colKeys,
  api,
}) {
  const { data: documentTypesHiring } = useEmployeeMaster(
    HIRING_DOCUMENT_TYPE,
    "documentTypesHiring",
  );

  let enableKey = selectedField === 0 ? false : true;
  const queryClient = useQueryClient();
  const [description, setDescription] = useState("");
  const [isdefault, setIsDefault] = useState(false);
  const [loader, setLoader] = useState(false);

  // Get selected data
  const { data: hiringMastersDetailByid, isLoading } = useQuery({
    queryKey: ["hiringMastersDetailByid", colKeys, type, api, selectedField],
    queryFn: () =>
      newRequest.get(`${api}/${selectedField}`).then((res) => res.data),
    enabled: enableKey,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(EmployeeMasterCommanFormSchema),
  });

  useEffect(() => {
    if (hiringMastersDetailByid) {
      setValue("name", hiringMastersDetailByid?.[colKeys.field1?.key]);
      setValue("status", hiringMastersDetailByid?.[colKeys.field2?.key]);
      setValue(
        "document_type_id",
        hiringMastersDetailByid?.[colKeys.field3?.key],
      );
    }
  }, [hiringMastersDetailByid, type, setValue]);

  useEffect(() => {
    if (type === "Document & Templates") {
      setDescription(hiringMastersDetailByid?.[colKeys?.field3?.key]);
    }
  }, [hiringMastersDetailByid, type, setValue]);

  useEffect(() => {
    if (type === "Document & Templates") {
      setDescription(hiringMastersDetailByid?.[colKeys?.field4?.key]);
    }
  }, [hiringMastersDetailByid, type, setDescription]);

  useEffect(() => {
    if (hiringMastersDetailByid?.default) {
      setIsDefault(hiringMastersDetailByid?.default === 1 ? true : false);
    }
  }, [hiringMastersDetailByid, setIsDefault]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    setIsDefault(false);
    reset();
  }

  const isTemplateDescription = type === "Document & Templates";
  const onSubmit = async (data) => {
    if (isTemplateDescription && !description) {
      setError("description", {
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
      formData.append(colKeys.field3?.key, data?.document_type_id?.id);
      formData.append("default", isdefault ? 1 : 0);
      type === "Document & Templates" &&
        formData.append("description", description);
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
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-lg rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                {selectedField ? "Update" : "Add"} {type}
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
                  <label className="required label-text">{type} Name</label>
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
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Document Type</label>
                  <Controller
                    name="document_type_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={documentTypesHiring}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select document type"
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
                <div className="group flex w-full flex-col gap-1">
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
                {type === "Document & Templates" ? (
                  <div className="group flex flex-col space-y-1">
                    <label className="label-text">
                      Description-Professionals
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                      placeholder={"Type here.."}
                      className="min-h-52 w-full flex-grow rounded-md border border-black/10 placeholder:text-[#8b8b8b]"
                    />
                    {errors?.description && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.description?.message}
                      </span>
                    )}
                  </div>
                ) : null}

                <div className="group z-[50] flex w-full items-center gap-3">
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
