import { newFormRequest, newRequest } from "@/api";
import { referenceSchema } from "@/schema/dashboard/employee/form/reference.schema";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import { customSelectStyles } from "@/utils/customStyles";
import Select from "react-select";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { TEMPLATE } from "@/api/master";

export default function ReferenceSendEmail({
  popupOpen,
  setPopupOpen,
  selectedField,
  setSelectedField,
  qrKey,
  api,
  uid,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(referenceSchema),
  });
  const { data: templateList } = useEmployeeMaster(TEMPLATE, "templateList");
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption.value);
  };

  // Get selected data
  const { data: employeeReferenceid, isLoading } = useQuery({
    queryKey: ["employeeReferenceid", api, selectedField],
    queryFn: () =>
      newRequest
        .get(`${"employee-references"}/${selectedField}/edit`)
        .then((res) => res.data),
    enabled: !!selectedField != 0,
  });

  const { data: employeeDetails } = useQuery({
    queryKey: ["employeeDetails", api, selectedField],
    queryFn: () =>
      newRequest.get(`${"employee"}/${uid}`).then((res) => res.data),
    enabled: !!uid,
  });

  useEffect(() => {
    if (employeeReferenceid) {
      setValue("type", employeeReferenceid.type);
      setValue("reference_name", employeeReferenceid.reference_name);
      setValue("personal_email", employeeReferenceid.personal_email);
    }
  }, [employeeReferenceid]);

  function close() {
    reset();
    setPopupOpen(false);
    setSelectedField(0);
    setSelectedType(null);
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("type", data?.type?.value);
      formData.append("id", selectedField);
      formData.append("user_id", uid);
      formData.append("reference_name", data.reference_name);
      formData.append("personal_email", data.personal_email);
      // formData.append("template_heading", data.template_heading); // Correct value of template heading
      // formData.append("description", description);

      let res;
      if (selectedField !== 0) {
        res = await newFormRequest.post(
          `sent-email-employee-references`,
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
                Send Reference
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
                      name="type"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={true}
                          styles={customSelectStyles}
                          options={[
                            { value: "work", label: "Work" },
                            { value: "personal", label: "Personal" },
                          ]}
                          placeholder="Select Type"
                          onChange={(e) => {
                            field.onChange(e);
                            handleTypeChange(e);
                          }}
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
                  <div className="group flex w-full flex-col gap-1">
                    <label className="label-text">Template</label>
                    <Controller
                      name="template_heading"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={true}
                          styles={customSelectStyles}
                          options={templateList}
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption?.label); // Update form value
                            setDescription(selectedOption?.content); // Set description content dynamically
                          }}
                          placeholder="Select Template"
                          className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                        />
                      )}
                    />
                    {errors.template_heading && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.template_heading?.message}
                      </span>
                    )}
                  </div>
                  <div className="group flex flex-col space-y-1">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Email Address
                    </label>
                    <input
                      {...register("personal_email", { required: true })}
                      className="input-box h-10 w-full"
                    />
                    {errors.personal_email && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.personal_email?.message}
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
                  {/* )} */}
                </div>

                <div className="group flex flex-col space-y-1">
                  <label className="label-text">
                    Description-Professionals
                  </label>
                  <div className="relative min-h-52 w-full flex-grow overflow-hidden rounded-md border border-black/10">
                    <ReactQuill
                      theme="snow"
                      name="description"
                      value={description}
                      onChange={setDescription}
                      placeholder={"Type here.."}
                      className="relative z-10 h-full w-full rounded-md border-b border-transparent"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                      }}
                    />
                  </div>
                  {errors?.description && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.designation?.message}
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
                          {selectedField ? "Sending" : "Saving"}
                        </div>
                      ) : (
                        <span>{selectedField ? "Send" : "Save"}</span>
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
