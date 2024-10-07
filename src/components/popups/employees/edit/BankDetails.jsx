import { EMPLOYEE_BANK_DETAILS, newFormRequest, newRequest } from "@/api";
import { ACCOUNT_TYPE_LIST, SKILL_FIELD_TYPE } from "@/api/master";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { empBankDetailsSchema } from "@/schema/dashboard/employee/form/bankdetails.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

export default function EmployeeBankDetailsEditForm({
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
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(empBankDetailsSchema),
  });

  const queryClient = useQueryClient();
  const [isDefault, setIsDefault] = useState(false);
  const [loader, setLoader] = useState(false);

  // Get selected data
  const { data: employeeBankDetailByid, isLoading } = useQuery({
    queryKey: ["employeeBankDetailByid", api, selectedField],
    queryFn: () =>
      newRequest.get(`${api}/${selectedField}/edit`).then((res) => res.data),
    enabled: !!selectedField != 0,
  });

  console.log(employeeBankDetailByid);

  const { data: bankAccountTypeList } = useEmployeeMaster(
    ACCOUNT_TYPE_LIST,
    "bankAccountTypeList",
  );

  useEffect(() => {
    if (employeeBankDetailByid) {
      setValue("account_type", employeeBankDetailByid?.data?.account_type);
      setValue("bank_name", employeeBankDetailByid?.data?.bank_name);
      setValue("branch", employeeBankDetailByid?.data?.branch);
      setValue("iban", employeeBankDetailByid?.data?.iban);
      setValue("account_number", employeeBankDetailByid?.data?.account_number);
      setValue(
        "account_holder_name",
        employeeBankDetailByid?.data?.account_holder_name,
      );
      setValue("swift_code", employeeBankDetailByid?.data?.swift_code);
      setValue("sort_code", employeeBankDetailByid?.data?.sort_code);
    }
  }, [employeeBankDetailByid, setValue]);

  useEffect(() => {
    if (employeeBankDetailByid) {
      setIsDefault(employeeBankDetailByid?.data?.default === 1 ? true : false);
    }
  }, [employeeBankDetailByid, setIsDefault]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("user_id", uid);
      formData.append("account_type", data.account_type?.id);
      formData.append("bank_name", data.bank_name);
      formData.append("branch", data.branch);
      formData.append("iban", data.iban);
      formData.append("account_number", data.account_number);
      formData.append("account_holder_name", data.account_holder_name);
      formData.append("swift_code", data.swift_code);
      formData.append("sort_code", data.sort_code);
      formData.append("default", isDefault ? 1 : 0);

      let res;
      if (selectedField !== 0) {
        res = await newFormRequest.put(
          `${EMPLOYEE_BANK_DETAILS}/${selectedField}`,
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
                {selectedField ? "Update" : "Add"} Bank Details
              </h1>
              <div className="flex items-center gap-7">
                <div className="group flex gap-2">
                  <input
                    onChange={(e) => {
                      setIsDefault(e.target.checked);
                    }}
                    className="input-box h-5 w-5"
                    type="checkbox"
                  />
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Set as default
                  </label>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="text-lg font-extrabold text-[#00000080]"
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
                className="grid grid-cols-2 gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Account Type</label>
                  <Controller
                    name="account_type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={bankAccountTypeList}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select Type"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    )}
                  />
                  {errors.account_type && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.account_type?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Bank Name
                  </label>
                  <input
                    {...register("bank_name", { required: true })}
                    className="input-box h-10 w-full"
                  />
                  {errors.bank_name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.bank_name?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Branch
                  </label>
                  <input
                    {...register("branch", { required: true })}
                    className="input-box h-10 w-full"
                  />
                  {errors.branch && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.branch?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    IBAN Number
                  </label>
                  <input
                    {...register("iban", { required: true })}
                    className="input-box h-10 w-full"
                  />
                  {errors.iban && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.iban?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Account Number
                  </label>
                  <input
                    {...register("account_number", { required: true })}
                    className="input-box h-10 w-full"
                  />
                  {errors.account_number && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.account_number?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Acc. Holder Name
                  </label>
                  <input
                    {...register("account_holder_name", { required: true })}
                    className="input-box h-10 w-full"
                  />
                  {errors.account_holder_name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.account_holder_name?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Swift Code
                  </label>
                  <input
                    {...register("swift_code", { required: true })}
                    className="input-box h-10 w-full"
                  />
                  {errors.swift_code && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.swift_code?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Sort Code
                  </label>
                  <input
                    {...register("sort_code", { required: true })}
                    className="input-box h-10 w-full"
                  />
                  {errors.sort_code && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.sort_code?.message}
                    </span>
                  )}
                </div>
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
              </form>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
