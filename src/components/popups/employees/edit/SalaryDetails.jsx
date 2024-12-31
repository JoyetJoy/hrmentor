import { newRequest } from "@/api";
import { ROLES_LIST, SALARY_DEFAULT_MASTERS } from "@/api/master";
import { employeeMasterOptions, overTimeList } from "@/constants/data";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { empSalaryDetailsSchema } from "@/schema/dashboard/employee/form/salarydetails.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

export default function EmployeeSalaryDetailsEditForm({
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
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(empSalaryDetailsSchema),
  });

  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
  const [selectedOverTime, setSelectedOverTime] = useState("");

  //  EMPLOYEE SALARY MASTERS
  const { data: empSalaryMasterList } = useEmployeeMaster(
    SALARY_DEFAULT_MASTERS,
    "empSalaryMasterList",
  );
  const { data: rolesList } = useEmployeeMaster(ROLES_LIST, "rolesList");

  // Get selected data
  const { data: employeeSalaryDetailByid, isLoading } = useQuery({
    queryKey: ["employeeSalaryDetailByid", api, selectedField],
    queryFn: () =>
      newRequest.get(`${api}/${selectedField}/edit`).then((res) => res.data),
    enabled: !!selectedField != 0,
  });
  console.log(employeeSalaryDetailByid);

  useEffect(() => {
    if (employeeSalaryDetailByid) {
      setValue("user_id", employeeSalaryDetailByid.user_id);
      setValue("effective_from", employeeSalaryDetailByid.effective_from);
      setValue("effective_to", employeeSalaryDetailByid.effective_to);
      setValue("currency", employeeSalaryDetailByid.currency);
      setValue("pay_rate", employeeSalaryDetailByid.pay_rate);
      setValue("per", employeeSalaryDetailByid.per);
      setValue("pay_schedule", employeeSalaryDetailByid.pay_schedule);
      setValue("pay_type", employeeSalaryDetailByid.pay_type);
      setValue("over_time", employeeSalaryDetailByid.over_time);
      setValue("roles", employeeSalaryDetailByid?.role_id);
      setValue(
        "weekly_contract_hours",
        employeeSalaryDetailByid.weekly_contract_hours,
      );
      setValue("weekly_pay", employeeSalaryDetailByid.weekly_pay);
      setValue("pay_calculation", employeeSalaryDetailByid?.pay_calculation);
      setValue("annual_pay", employeeSalaryDetailByid.annual_pay);
      setValue("status", employeeSalaryDetailByid.status);
      if (employeeSalaryDetailByid.over_time) {
        setSelectedOverTime(employeeSalaryDetailByid.over_time?.value);
      }
    }
  }, [employeeSalaryDetailByid]);

  // Watch input values
  const payRate = watch("pay_rate") || 0;
  const payCalculation = watch("pay_calculation") || 0;
  const weeklyContractHours = watch("weekly_contract_hours") || 0;

  // Calculate Weekly Pay
  useEffect(() => {
    const payRateNum = parseFloat(payRate);
    // const payCalculationNum = parseFloat(payCalculation);
    const weeklyContractHoursNum = parseFloat(weeklyContractHours);

    if (
      !isNaN(payRateNum) &&
      // !isNaN(payCalculationNum) &&
      !isNaN(weeklyContractHoursNum)
    ) {
      const total = payRateNum + payRateNum;
      const calculatedWeeklyPay = total * weeklyContractHoursNum;
      const annualPay = calculatedWeeklyPay * 52;

      // Update weekly_pay in the form
      setValue("weekly_pay", calculatedWeeklyPay.toFixed(2));
      setValue("annual_pay", annualPay.toFixed(2));
    }
  }, [payRate, payCalculation, weeklyContractHours, setValue]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
  }

  const onSubmit = async (data) => {
    if (data.over_time?.value === "nonExempt" && !data.pay_calculation) {
      toast.error("Pay Calculation is required for Non-Exempt");
      return;
    }
    try {
      console.log(data);
      setLoader(true);
      const formData = new FormData();
      formData.append("user_id", uid);
      formData.append("effective_from", data.effective_from);
      formData.append("effective_to", data.effective_to);
      formData.append("currency", data.currency?.id);
      formData.append("role_id", data?.roles?.id);
      formData.append("pay_rate", data.pay_rate);
      formData.append("per", data.per?.id);
      formData.append("pay_schedule", data.pay_schedule?.id);
      formData.append("pay_type", data.pay_type?.id);
      formData.append("over_time", data.over_time?.value);
      formData.append("pay_calculation", data?.pay_calculation);
      formData.append("weekly_contract_hours", data.weekly_contract_hours);
      formData.append("weekly_pay", data.weekly_pay);
      formData.append("annual_pay", data.annual_pay);
      formData.append("status", data.status?.value);

      let res;
      if (selectedField !== 0) {
        res = await newRequest.patch(`${api}/${selectedField}`, formData);
      } else {
        console.log(formData);

        res = await newRequest.post(api, formData);
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
  console.log(empSalaryMasterList);

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
            className="data-[closed]:transform-[scale(95%)] w-full max-w-3xl rounded bg-white/90 px-10 py-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                {selectedField ? "Update" : "Add"} Salary Details
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
                className="grid grid-cols-2 gap-3 gap-x-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Effective from
                  </label>
                  <input
                    {...register("effective_from", { required: true })}
                    type="date"
                    className="input-box h-10 w-full placeholder:text-[0.8rem]"
                  />
                  {errors.effective_from && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.effective_from?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Effective To
                  </label>
                  <input
                    {...register("effective_to", { required: true })}
                    type="date"
                    className="input-box h-10 w-full placeholder:text-[0.8rem]"
                  />
                  {errors.effective_to && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.effective_to?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Currency</label>
                  <Controller
                    name="currency"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={empSalaryMasterList?.currencies}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select currency"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    )}
                  />
                  {errors.currency && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.currency?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="label-text">Roles</label>
                  <Controller
                    name="roles"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={rolesList}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select role"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    )}
                  />
                  {errors.roles && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.roles?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Pay Rate</label>
                  <input
                    {...register("pay_rate", { required: true })}
                    onKeyPress={(event) => {
                      const inputChar = event.key;
                      const currentValue = event.target.value;

                      // Allow only digits, a single decimal point, and control keys
                      if (
                        !/^[0-9.]$/.test(inputChar) ||
                        (inputChar === "." && currentValue.includes("."))
                      ) {
                        event.preventDefault();
                      }
                    }}
                    placeholder="Enter Pay Rate"
                    className="input-box h-10 w-full placeholder:text-[0.8rem]"
                  />
                  {errors.pay_rate && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.pay_rate?.message}
                    </span>
                  )}
                </div>

                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Per</label>
                  <Controller
                    name="per"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={empSalaryMasterList?.pers}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select Pay rate"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    )}
                  />
                  {errors.per && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.per?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Pay Schedule</label>
                  <Controller
                    name="pay_schedule"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={empSalaryMasterList?.paySchedules}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select Pay schedule"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    )}
                  />
                  {errors.pay_schedule && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.pay_schedule?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Pay Type</label>
                  <Controller
                    name="pay_type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={empSalaryMasterList?.payTypes}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select Pay schedule"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    )}
                  />
                  {errors.pay_type && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.pay_type?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Over Time</label>
                  <Controller
                    name="over_time"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={overTimeList}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select Over Time"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption); // Update form value
                          setSelectedOverTime(selectedOption.value); // Update state
                        }}
                      />
                    )}
                  />
                  {errors.over_time && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.over_time?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="label-text">
                    Pay Calculation (Percentage)
                  </label>
                  <input
                    {...register("pay_calculation", {
                      validate: (value) => {
                        if (selectedOverTime === "nonExempt" && !value) {
                          return "Pay Calculation is required for Non-Exempt";
                        }
                        return true;
                      },
                    })}
                    type="text"
                    disabled={selectedOverTime !== "nonExempt"} // Disable if not exempt
                    onKeyPress={(event) => {
                      const inputChar = event.key;
                      const currentValue = event.target.value;

                      // Allow digits, a single decimal point, and control keys
                      if (
                        !/^[0-9.]$/.test(inputChar) ||
                        (inputChar === "." && currentValue.includes("."))
                      ) {
                        event.preventDefault();
                      }
                    }}
                    className="input-box h-10 w-full placeholder:text-[0.8rem] disabled:bg-gray-200"
                  />

                  {errors.pay_calculation && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.pay_calculation?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">
                    Weekly Contract Hours
                  </label>
                  <input
                    {...register("weekly_contract_hours", { required: true })}
                    type="text"
                    onKeyPress={(event) => {
                      if (!/^[0-9]$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    placeholder="Enter weekly contract hours"
                    className="input-box h-10 w-full placeholder:text-[0.8rem]"
                  />
                  {errors.weekly_contract_hours && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.weekly_contract_hours?.message}
                    </span>
                  )}
                </div>

                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Weekly Pay
                  </label>
                  <input
                    {...register("weekly_pay")}
                    readOnly
                    placeholder="Calculated Weekly Pay"
                    className="input-box h-10 w-full bg-gray-100 placeholder:text-[0.8rem]"
                  />
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Annual Pay
                  </label>
                  <input
                    {...register("annual_pay")}
                    readOnly
                    placeholder="Calculated Weekly Pay"
                    className="input-box h-10 w-full bg-gray-100 placeholder:text-[0.8rem]"
                  />
                  {errors.annual_pay && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.annual_pay?.message}
                    </span>
                  )}
                </div>
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
                <div />
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
