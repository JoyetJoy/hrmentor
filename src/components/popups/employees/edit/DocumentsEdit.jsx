import { newFormRequest, newRequest, UPDATE_EMPLOYEE_DOCUMENTS } from "@/api";
import { EMPLOYEE_DOCUMENT_TYPE_LIST } from "@/api/master";
import { employeeMasterOptions } from "@/constants/data";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import useImageUpload from "@/hooks/useImageUpload";
import { empDocumentTypeSchema } from "@/schema/dashboard/employee/form/documentType.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

export default function EmployeeDocumentEditForm({
  popupOpen,
  setPopupOpen,
  selectedField,
  setSelectedField,
  qrKey,
  api,
  uid,
  documentName,
  cid,
  expiry
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(empDocumentTypeSchema),
  });

  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);

  const { image, imageFile, handleImageChange, clearImage, setImage } =
  useImageUpload();
  //   TYPE
  const { data: employeeDocumentTypeList } = useEmployeeMaster(
    EMPLOYEE_DOCUMENT_TYPE_LIST,
    "employeeDocumentTypeList",
  );

  // Get selected data
  const { data: employeeDocumentDetailByid, isLoading } = useQuery({
    queryKey: ["employeeDocumentDetailByid", api, selectedField],
    queryFn: () =>
      newRequest.get(`${api}/${selectedField}/edit`).then((res) => res.data),
    enabled: !!selectedField != 0,
  });

  useEffect(() => {
    if (employeeDocumentDetailByid) {
      const status = {
        value: employeeDocumentDetailByid.data.status.id,
        label: employeeDocumentDetailByid.data.status.label,
      }
      setValue("status", status);      
      setValue(
        "document_name",
        employeeDocumentDetailByid?.data?.document_name,
      );
      setValue(
        "document_type_id",
        employeeDocumentDetailByid?.data?.document_type_id,
      );
      setValue("issued_date", employeeDocumentDetailByid?.data?.issued_date);
      setValue("expiry_date", employeeDocumentDetailByid?.data?.expiry_date);
      setValue(
        "issued_authority",
        employeeDocumentDetailByid?.data?.issued_authority,
      );
      if (employeeDocumentDetailByid?.data?.upload_documents) {
        setImage(employeeDocumentDetailByid?.data?.upload_documents);
        setValue("document_image", employeeDocumentDetailByid?.data?.upload_documents);
      }
    }
  }, [employeeDocumentDetailByid]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("document_category_id", cid);
      formData.append("user_id", uid);
      formData.append("document_name", data.document_name||'N/A');
      formData.append("document_type_id", data.document_type_id?.id|| '');
      formData.append("status", data.status.value);
      formData.append("issued_date", data.issued_date);
      if(expiry===1){
        formData.append("expiry_date", data.expiry_date);
      }
      formData.append("issued_authority", data.issued_authority);
      if (imageFile instanceof File) {
        // It's already uploaded, just send the URL
        formData.append("document", imageFile);
      }

      let res;
      if (selectedField !== 0) {
        res = await newFormRequest.post(
          `${UPDATE_EMPLOYEE_DOCUMENTS}/${selectedField}`,
          formData,
        );
      } else {
        res = await newFormRequest.post(api, formData);
      }
      if (res.data?.status === 201) {
        toast.success(res?.data?.message);
        queryClient.invalidateQueries([qrKey]);
        reset();
        clearImage();
        close();
      }
    } catch (error) {
      console.log(error);
      toast.error(" Upload document");
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
            className="data-[closed]:transform-[scale(95%)] w-full max-w-sm rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                {selectedField ? "Update" : "Add"} {documentName}
              </h1>
              <button
                type="button"
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
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Document Name
                  </label>
                  <input
                    {...register("document_name")}
                    type="text"
                    placeholder="Enter document name"
                    className="input-box h-10 w-full placeholder:text-[0.8rem]"
                  />
                  {errors.document_name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.document_name?.message}
                    </span>
                  )}
                </div>

                <div className="group flex flex-col space-y-1">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Document Type
                  </label>
                  <Controller
                    name="document_type_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={employeeDocumentTypeList}
                        isSearchable={true}
                        styles={customSelectStyles}
                        placeholder="Select Type"
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

                <div className="group flex flex-col space-y-1">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Issued Authority
                  </label>
                  <input
                    {...register("issued_authority")}
                    type="text"
                    placeholder="Enter issued authority"
                    className="input-box h-10 w-full placeholder:text-[0.8rem]"
                  />
                  {errors.issued_authority && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.issued_authority?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Issued Date
                  </label>
                  <input
                    {...register("issued_date")}
                    type="date"
                    className="input-box h-10 w-full pr-2"
                  />
                  {errors.issued_date && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.issued_date?.message}
                    </span>
                  )}
                </div>
                {expiry === 1 && (
                  <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Expiry date
                  </label>
                  <input
                    {...register("expiry_date",{ required: true })}
                    type="date"
                    className="input-box h-10 w-full pr-2"
                  />
                  {errors.expiry_date && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.expiry_date?.message}
                    </span>
                  )}
                </div>
                )}
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Status
                  </label>
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
                <div className="group flex flex-col gap-1.5">
                  {image ? (
                    <div className="relative">
                      <p className="flex items-center justify-center">Uploaded</p>
                      <X
                        onClick={clearImage}
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
                          Upload Document
                        </span>
                      </div>
                      <input
                        id="employee-profile-pic"
                        onChange={handleImageChange}
                        type="file"
                        className="hidden"
                      />
                    </label>
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
