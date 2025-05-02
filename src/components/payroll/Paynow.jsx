import { newFormRequest, newRequest, XFormRequest } from "@/api";
import { PAY_NOW } from "@/api/payroll";
import { employeeMasterOptions } from "@/constants/data";
import useImageUpload from "@/hooks/useImageUpload";
import { EmployeeMasterCommanFormSchema } from "@/schema/dashboard/employee/masters/employeeType.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import * as Yup from "yup";
import { formatDate } from "@/utils/date";

const schema = Yup.object({
  id: Yup.string().required("Transaction Id is required"),
  date: Yup.date().required("Date is required"), // Add validation for date
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
});

export default function Paynow({ id, popupOpen, setPopupOpen }) {
  const [loader, setLoader] = useState(false);
  const [selectedField, setSelectedField] = useState();
  // Get selected data

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
    resolver: yupResolver(schema),
  });

  const { image, imageFile, handleImageChange, clearImage, setImage } =
    useImageUpload();

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
    clearImage(); // <-- Add this
  }

  const onSubmit = async (data) => {
    setLoader(true);
    const date = formatDate(data?.date)
    try {
      const formData = new FormData();
      formData.append("payrun_id", id);
      formData.append("transaction_id", data?.id);
      formData.append("transaction_date", date);
      formData.append("transaction_amount", Number(data?.amount));
      formData.append("payslip", imageFile);
    
      const response = await newFormRequest.post(PAY_NOW, formData);
      toast.success(response.data.message);
      setPopupOpen(false);

    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.error ||
          "Something went wrong while processing the payment.",
      );
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
                Pay Now
              </h1>
              <button
                onClick={close}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>
            <form
              className="grid grid-cols-1 gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="group flex flex-col space-y-1">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Transaction Id
                </label>
                <input
                  {...register("id", { required: true })}
                  type="text"
                  className="input-box h-10 w-full"
                />
                {errors.id && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.id?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Transaction Date
                </label>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className="input-box h-10 w-full"
                    />
                  )}
                />
                {errors.date && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.date?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Transaction Amount
                </label>
                <input
                  {...register("amount", { required: true })}
                  type="number"
                  className="input-box h-10 w-full"
                />
                {errors.amount && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.amount?.message}
                  </span>
                )}
              </div>
              <div className="group flex flex-col gap-1.5">
                {image ? (
                  <div className="input-box relative h-10 rounded-md border border-dashed">
                    <p className="flex h-full items-center justify-center font-semibold text-[#2C2C2C]">
                      Uploaded
                    </p>
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
                        Upload Payslip
                      </span>
                    </div>
                    <input
                      id="employee-profile-pic"
                      onChange={handleImageChange}
                      accept=".jpg,.jpeg,.png,.pdf"
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
