import {
  EMPLOYEE_RIGHT_TO_WORK_UPDATE,
  newFormRequest,
  newRequest,
} from "@/api";
import useImageUpload from "@/hooks/useImageUpload";
import { empRightToWorkSchema } from "@/schema/dashboard/employee/form/rightToWork.schema";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function EmployeeSalaryDetailsEditForm({
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
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(empRightToWorkSchema),
  });

  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);

  // Get selected data
  const { data: employeeRightToWorkDetailByid, isLoading } = useQuery({
    queryKey: ["employeeRightToWorkDetailByid", api, selectedField],
    queryFn: () =>
      newRequest.get(`${api}/${selectedField}/edit`).then((res) => res.data),
    enabled: !!selectedField != 0,
  });

  useEffect(() => {
    if (employeeRightToWorkDetailByid) {
      setValue("reference_no", employeeRightToWorkDetailByid.reference_no);
      setValue("condtion", employeeRightToWorkDetailByid.condtion);
      setValue("expiry_date", employeeRightToWorkDetailByid.expiry_date);
      setValue("reviewedBy", employeeRightToWorkDetailByid.reviewedBy);
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

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("reference_no", data?.reference_no);
      formData.append("user_id", uid);
      formData.append("condtion", data.condtion);
      formData.append("expiry_date", data.expiry_date);
      formData.append("reviewedBy", data.reviewedBy);
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
                    {...register("expiry_date", { required: true })}
                    type="date"
                    className="input-box h-10 w-full"
                  />
                  {errors.expiry_date && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.expiry_date?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Currency</label>
                  <input
                    {...register("reference_no", { required: true })}
                    type="text"
                    placeholder="Enter Reference No"
                    className="input-box h-10 w-full"
                  />
                  {errors.reference_no && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.reference_no?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Pay Rate</label>
                  <input
                    {...register("reference_no", { required: true })}
                    type="text"
                    placeholder="Enter Reference No"
                    className="input-box h-10 w-full"
                  />
                  {errors.reference_no && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.reference_no?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Per</label>
                  <input
                    {...register("reference_no", { required: true })}
                    type="text"
                    placeholder="Enter Reference No"
                    className="input-box h-10 w-full"
                  />
                  {errors.reference_no && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.reference_no?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Pay Schedule</label>
                  <input
                    {...register("reference_no", { required: true })}
                    type="text"
                    placeholder="Enter Reference No"
                    className="input-box h-10 w-full"
                  />
                  {errors.reference_no && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.reference_no?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Pay Type</label>
                  <input
                    {...register("reference_no", { required: true })}
                    type="text"
                    placeholder="Enter Reference No"
                    className="input-box h-10 w-full"
                  />
                  {errors.reference_no && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.reference_no?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Over Time</label>
                  <input
                    {...register("reference_no", { required: true })}
                    type="text"
                    placeholder="Enter Reference No"
                    className="input-box h-10 w-full"
                  />
                  {errors.reference_no && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.reference_no?.message}
                    </span>
                  )}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">
                    Weekly Contract Hours
                  </label>
                  <input
                    {...register("reference_no", { required: true })}
                    type="text"
                    placeholder="Enter Reference No"
                    className="input-box h-10 w-full"
                  />
                  {errors.reference_no && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.reference_no?.message}
                    </span>
                  )}
                </div>

                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Weekly Pay
                  </label>
                  <input
                    {...register("reviewedBy", { required: true })}
                    className="input-box h-10 w-full"
                  />
                  {errors.reviewedBy && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.reviewedBy?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Annual Pay
                  </label>
                  <input
                    {...register("reviewedBy", { required: true })}
                    className="input-box h-10 w-full"
                  />
                  {errors.reviewedBy && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.reviewedBy?.message}
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
