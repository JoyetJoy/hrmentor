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
import Select from "react-select";

export default function SaveEmployeeMasterForm({
  popupOpen,
  setPopupOpen,
  selectedField,
  setSelectedField,
  qrKey,
  type,
  colKeys,
  api,
}) {
  let enableKey = selectedField === 0 ? false : true;

  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
  // Get selected data
  const { data: employeeMastersDetailByid, isLoading } = useQuery({
    queryKey: ["employeeMastersDetailByid", colKeys, type, api, selectedField],
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
    if (employeeMastersDetailByid) {
      setValue("name", employeeMastersDetailByid?.[colKeys.field1.key]);
      setValue("status", employeeMastersDetailByid?.[colKeys.field2.key]);
      type === "Work Location" &&
        setValue("address", employeeMastersDetailByid?.[colKeys.field3.key]);
      const expiryValue = employeeMastersDetailByid?.expiry_status === 1;
      setValue("expiry_status", expiryValue);
    }
  }, [employeeMastersDetailByid, type, setValue]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
  }
  const isWorkLocation = type === "Work Location";

  const onSubmit = async (data) => {
    if (isWorkLocation && (!data?.address || data?.address.trim() === "")) {
      setError("address", {
        type: "manual",
        message: "Work Location requires an address",
      });
      return;
    }
    setLoader(true);
    try {
      const formData = new URLSearchParams();
      if (type === "Document Category") {
        formData.append("expiry_status", data?.expiry_status ? 1 : 0);
      }
      formData.append(colKeys.field1.key, data?.name);
      formData.append(colKeys.field2.key, data?.status?.value);
      type === "Work Location" &&
        formData.append("work_location_address", data?.address);

      let res;

      if (selectedField !== 0) {
        res = await XFormRequest.patch(`${api}/${selectedField}`, formData);
      } else {
        res = await XFormRequest.post(api, formData);
      }
      if (res?.data?.success === true || res?.status === 200) {
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
            className="data-[closed]:transform-[scale(95%)] w-full max-w-sm rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
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
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    {type} Name
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
                {type === "Work Location" ? (
                  <div className="group flex flex-col space-y-1">
                    <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                      {type} Address
                    </label>
                    <textarea
                      {...register("address")}
                      type="text"
                      className="input-box h-20 w-full"
                    />
                    {errors.address && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.address?.message}
                      </span>
                    )}
                  </div>
                ) : null}
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
                {type === "Document Category" && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("expiry_status")}
                      className="mr-2"
                    />
                    <label className="label-text">is expiry needed</label>
                    {errors.status && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.status?.message}
                      </span>
                    )}
                  </div>
                )}

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
