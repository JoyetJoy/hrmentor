import {
  EMPLOYEE_RIGHT_TO_WORK_UPDATE,
  newFormRequest,
  newRequest,
} from "@/api";
import useImageUpload from "@/hooks/useImageUpload";
import { referenceSchema } from "@/schema/dashboard/employee/form/reference.schema";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import { useCallback } from "react";
import { customSelectStyles } from "@/utils/customStyles";
import Select from "react-select";

export default function ReferenceForm({
  popupOpen,
  setPopupOpen,
  selectedField,
  setSelectedField,
  qrKey,
  api,
  uid,
}) {
  const { image, imageFile, handleImageChange, clearImage, setImage } =
    useImageUpload();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(referenceSchema),
  });

  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
  const [description, setDescription] = useState("");

  // Get selected data
  const { data: employeeRightToWorkDetailByid, isLoading } = useQuery({
    queryKey: ["employeeRightToWorkDetailByid", api, selectedField],
    queryFn: () =>
      newRequest.get(`${api}/${selectedField}/edit`).then((res) => res.data),
    enabled: !!selectedField != 0,
  });

  useEffect(() => {
    if (employeeRightToWorkDetailByid) {
      setValue("type", employeeRightToWorkDetailByid.type);
      setValue("reference_name", employeeRightToWorkDetailByid.reference_name);
      setValue("email", employeeRightToWorkDetailByid.email);
    }
  }, [employeeRightToWorkDetailByid]);

  useEffect(() => {
    if (employeeRightToWorkDetailByid) {
      setImage(employeeRightToWorkDetailByid?.document);
    }
  }, [employeeRightToWorkDetailByid, setImage]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
  }

  const handleClearImage = useCallback(() => {
    clearImage();
    setDescription(""); // Reset description if needed
  }, [clearImage]);

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("type", data?.type);
      formData.append("reference_name", data.reference_name);
      formData.append("email", data.email);
      imageFile && formData.append("document", imageFile);
      let res;
      if (selectedField !== 0) {
        res = await newFormRequest.post(
          `${EMPLOYEE_RIGHT_TO_WORK_UPDATE}/${selectedField}`,
          formData,
        );
      } else {
        res = await newFormRequest.post(api, formData);
      }
      if (res.data?.status === 201) {
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
            className="data-[closed]:transform-[scale(95%)] w-full max-w-2xl rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                {selectedField ? "Update" : "Add"} Reference
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
                <div className="grid grid-cols-2 gap-3">
                  <div className="group flex w-full flex-col gap-1">
                    <label className="label-text">Type</label>
                    <Controller
                      name="document_type_id"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={true}
                          styles={customSelectStyles}
                          options={[{ label: "Work" }, { label: "Personal" }]}
                          placeholder="Select Type"
                          className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                        />
                      )}
                    />
                    {errors.type && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.type?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Name of the reference
                    </label>
                    <input
                      {...register("reference_name", { required: true })}
                      className="input-box h-10 w-full"
                    />
                    {errors.reference_name && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.reference_name?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Email Address
                    </label>
                    <input
                      {...register("email", { required: true })}
                      className="input-box h-10 w-full"
                    />
                    {errors.email && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.email?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex w-full flex-col gap-1">
                    <label className="label-text">Template</label>
                    <Controller
                      name="document"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={true}
                          styles={customSelectStyles}
                          options={[
                            { label: "Personal" },
                            { label: "Inactive" },
                          ]}
                          placeholder="Select Type"
                          className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1] z-50"
                        />
                      )}
                    />
                    {errors.type && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.type?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="label-text">
                    Description-Professionals
                  </label>
                  <div className="relative min-h-52 w-full flex-grow overflow-hidden rounded-md border border-black/10">
                    {/* Background Image with Blur */}
                    {image && (
                      <div
                        className="absolute inset-0 z-0"
                        style={{
                          backgroundImage: `url(${image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          filter: "blur(1px)", // Adjust the blur level as needed
                        }}
                      />
                    )}
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                      placeholder={"Type here.."}
                      className="relative z-10 h-full w-full rounded-md border-b border-transparent"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)", // White background with transparency for readability
                      }}
                    />
                  </div>
                  {errors?.description && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.description?.message}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2">
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
              </form>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
