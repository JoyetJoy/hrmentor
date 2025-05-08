import { newFormRequest, newRequest } from "@/api";
import useImageUpload from "@/hooks/useImageUpload";
import { empExperienceSchema } from "@/schema/dashboard/employee/form/experience.schema";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function EmployeeExperienceEditForm({
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
    resolver: yupResolver(empExperienceSchema),
  });

  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);

  // Get selected data
  const { data: employeeExperienceDetailByid, isLoading } = useQuery({
    queryKey: ["employeeExperienceDetailByid", api, selectedField],
    queryFn: () =>
      newRequest.get(`${api}/${selectedField}/edit`).then((res) => res.data),
    enabled: !!selectedField != 0,
  });

  useEffect(() => {
    if (employeeExperienceDetailByid) {
      setValue("job_role", employeeExperienceDetailByid.job_role);
      setValue("employer", employeeExperienceDetailByid.employer);
      setValue(
        "employer_details",
        employeeExperienceDetailByid.employer_details,
      );
      setValue("start_date", employeeExperienceDetailByid.start_date);
      setValue("end_date", employeeExperienceDetailByid.end_date);
    }
  }, [employeeExperienceDetailByid]);

  useEffect(() => {
    if (employeeExperienceDetailByid) {
      setImage(employeeExperienceDetailByid?.certificate);
    }
  }, [employeeExperienceDetailByid, setImage]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("job_role", data?.job_role);
      formData.append("user_id", uid);
      formData.append("employer", data.employer);
      formData.append("employer_details", data.employer_details);
      formData.append("start_date", data.start_date);
      formData.append("end_date", data.end_date);
      imageFile && formData.append("certificate", imageFile);
      let res;
      if (selectedField !== 0) {
        res = await newFormRequest.post(
          `update-employee-experience/${selectedField}`,
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
      toast.error(error?.response?.data?.error||error?.response?.data?.errors?.document[0]);
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
                {selectedField ? "Update" : "Add"} Experience
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
                <div className="group flex w-full flex-col gap-1">
                  <label className="required label-text">Job Role </label>
                  <input
                    {...register("job_role", { required: true })}
                    type="text"
                    placeholder="Enter job role"
                    className="input-box h-10 w-full"
                  />
                  {errors.job_role && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.job_role?.message}
                    </span>
                  )}
                </div>

                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Employer
                  </label>
                  <input
                    {...register("employer", { required: true })}
                    type="text"
                    placeholder="Enter employer name"
                    className="input-box h-10 w-full"
                  />
                  {errors.employer && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.employer?.message}
                    </span>
                  )}
                </div>

                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Employer Details
                  </label>
                  <textarea
                    {...register("employer_details", { required: true })}
                    placeholder="Enter employer details"
                    className="input-box h-14 w-full pt-1 placeholder:text-[0.8rem]"
                  />
                  {errors.employer_details && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.employer_details?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Start Date
                  </label>
                  <input
                    {...register("start_date", { required: true })}
                    type="date"
                    className="input-box h-10 w-full pr-2"
                  />
                  {errors.start_date && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.start_date?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    End Date
                  </label>
                  <input
                    {...register("end_date", { required: true })}
                    type="date"
                    className="input-box h-10 w-full pr-2"
                  />
                  {errors.end_date && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.end_date?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col gap-1.5">
                  {image ? (
                    <div className="relative flex w-full items-center justify-center">
                    <img
                      src={image}
                      alt="Uploaded"
                      className="max-h-24 w-full rounded-md border border-black/20 object-contain"
                      onError={(e) => {
                        e.target.style.display = "none"; // Hide broken image
                        e.target.nextElementSibling.style.display = "flex"; // Show alt text
                      }}
                    />

                    {/* Styled Alt Text Overlay with Border */}
                    <div className="absolute inset-0 hidden items-center text-sm justify-center rounded-md border border-gray-400 bg-gray-200 p-4 text-gray-600">
                    Document Uploaded
                    </div>

                    {/* Close Button */}
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
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div
                  className={`${image ? "mt-8" : ""} flex flex-row items-center justify-center gap-3`}
                >                  <button
                    type="submit"
                    className="bg-hrmblack flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-normal text-white focus:outline-none"
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
