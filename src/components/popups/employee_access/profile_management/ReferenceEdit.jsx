import { newFormRequest, newRequest } from "@/api";
import { referenceSchema } from "@/schema/dashboard/employee/form/reference.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { customSelectStyles } from "@/utils/customStyles";
import Select from "react-select";
import { Dialog, DialogPanel } from "@headlessui/react";

export default function ReferenceEdit({
  popupAddOpen,
  setPopupAddOpen,
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
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(referenceSchema),
  });

  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
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
      setValue("company_email", employeeReferenceid.company_email);
      setValue("company_name", employeeReferenceid.company_name);
      setValue("designation", employeeReferenceid.designation);
      setValue("contact_number", employeeReferenceid.contact_number);
    }
  }, []);

  function close() {
    setPopupAddOpen(false);
    setSelectedField(0);
    setSelectedType(null);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("type", data?.type?.value);
      formData.append("employee_id", employeeDetails?.employee_id);
      formData.append("user_id", uid);
      formData.append("reference_name", data.reference_name);
      formData.append("personal_email", data.personal_email);
      // {
      //   selectedType === "work"
      //     ? (formData.append("company_email", data.company_email),
      //       formData.append("company_name", data.company_name),
      //       formData.append("reference_name", data.reference_name),
      //       formData.append("personal_email", data.personal_email))
      //     : (formData.append("reference_name", data.reference_name),
      //       formData.append("personal_email", data.personal_email));
      // }

      {
        if (selectedType === "work") {
          formData.append("company_email", data.company_email);
          formData.append("company_name", data.company_name);
          formData.append("designation", data.designation);
        }
      }
      formData.append("contact_number", data.contact_number);
      formData.append("designation", data.designation);

      if (selectedType === "work") {
        if (!data?.company_name || !data?.company_email || !data?.designation) {
          return toast.error("Filed Missing");
        }
      }

      let res;
      if (selectedField !== 0) {
        res = await newFormRequest.post(
          `update-employee-references/${selectedField}`,
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
      open={popupAddOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-sm rounded bg-white/90 p-7 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
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
                <div className="grid grid-cols-1 gap-3">
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
                            { label: "Personal", value: "personal" },
                            { label: "Work", value: "work" },
                            ,
                          ]}
                          onChange={(e) => {
                            field.onChange(e);
                            handleTypeChange(e);
                          }}
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
                      {...register("personal_email", { required: true })}
                      className="input-box h-10 w-full"
                    />
                    {errors.personal_email && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.personal_email?.message}
                      </span>
                    )}
                  </div>
                  {selectedType === "work" && (
                    <>
                      <div className="group flex flex-col space-y-1">
                        <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                          Company Name
                        </label>
                        <input
                          {...register("company_name", { required: true })}
                          className="input-box h-10 w-full"
                        />
                        {errors.company_name && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.company_name?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1">
                        <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                          Designation
                        </label>
                        <input
                          {...register("designation", { required: true })}
                          className="input-box h-10 w-full"
                        />
                        {errors.designation && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.designation?.message}
                          </span>
                        )}
                      </div>
                      <div className="group flex flex-col space-y-1">
                        <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                          Company Email Address
                        </label>
                        <input
                          {...register("company_email", { required: true })}
                          className="input-box h-10 w-full"
                        />
                        {errors.company_email && (
                          <span className="text-xs font-medium text-red-500">
                            {errors.company_email?.message}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                  <div className="group flex flex-col space-y-1">
                    <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      Contact Number
                    </label>
                    <input
                      {...register("contact_number", { required: true })}
                      className="input-box h-10 w-full"
                    />
                    {errors.contact_number && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.contact_number?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1">
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
