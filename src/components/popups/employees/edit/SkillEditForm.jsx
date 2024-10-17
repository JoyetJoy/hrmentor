import { newFormRequest, newRequest } from "@/api";
import { SKILL_FIELD_TYPE } from "@/api/master";
import { completionStatus } from "@/constants/data";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import useImageUpload from "@/hooks/useImageUpload";
import { empSkillSchema } from "@/schema/dashboard/employee/form/skill.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

export default function SkillEditForm({
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
    resolver: yupResolver(empSkillSchema),
  });

  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
  //   SKILL FIELD TYPE
  const { data: skillTypeList } = useEmployeeMaster(
    SKILL_FIELD_TYPE,
    "skillTypeList",
  );

  // Get selected data
  const { data: employeeSkillDetailByid, isLoading } = useQuery({
    queryKey: ["employeeSkillDetailByid", api, selectedField],
    queryFn: () =>
      newRequest.get(`${api}/${selectedField}`).then((res) => res.data),
    enabled: !!selectedField != 0,
  });

  useEffect(() => {
    if (employeeSkillDetailByid) {
      setValue("type", employeeSkillDetailByid?.type);
      setValue("institution", employeeSkillDetailByid?.institution);
      setValue("field_of_study", employeeSkillDetailByid?.field_of_study);
      setValue("cgpa_percentage", employeeSkillDetailByid?.cgpa_percentage);
      setValue("start_date", employeeSkillDetailByid?.start_date);
      setValue("end_date", employeeSkillDetailByid?.end_date);
      setValue("status", employeeSkillDetailByid?.status);
    }
  }, [employeeSkillDetailByid]);

  useEffect(() => {
    if (employeeSkillDetailByid) {
      setImage(employeeSkillDetailByid?.document);
    }
  }, [employeeSkillDetailByid, setImage]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("type", data.type?.id);
      formData.append("user_id", uid);
      formData.append("institution", data.institution);
      formData.append("field_of_study", data.field_of_study);
      formData.append("start_date", data.start_date);
      formData.append("end_date", data.end_date);
      imageFile && formData.append("document", imageFile);
      formData.append("status", data.status?.value);
      formData.append("cgpa_percentage", data.cgpa_percentage);
      let res;
      if (selectedField !== 0) {
        res = await newFormRequest.post(
          `${api}/update-employee-skills/${selectedField}`,
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
            className="data-[closed]:transform-[scale(95%)] w-full max-w-sm rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                {selectedField ? "Update" : "Add"} Skills/Qualifications
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
                  <label className="required label-text">Type</label>
                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={skillTypeList}
                        isSearchable={false}
                        styles={customSelectStyles}
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
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Field of study
                  </label>
                  <input
                    {...register("field_of_study", { required: true })}
                    type="text"
                    className="input-box h-10 w-full"
                  />
                  {errors.field_of_study && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.field_of_study?.message}
                    </span>
                  )}
                </div>

                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Name of the institution
                  </label>
                  <input
                    {...register("institution", { required: true })}
                    type="text"
                    placeholder="Enter name of the institution"
                    className="input-box h-10 w-full placeholder:text-[0.8rem]"
                  />
                  {errors.institution && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.institution?.message}
                    </span>
                  )}
                </div>

                <div className="group flex flex-col space-y-1">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    CGPA/Percentage
                  </label>
                  <input
                    {...register("cgpa_percentage")}
                    type="text"
                    placeholder="Enter CGPA/Percentage"
                    className="input-box h-10 w-full placeholder:text-[0.8rem]"
                  />
                  {errors.cgpa_percentage && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.cgpa_percentage?.message}
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
                    className="input-box h-10 w-full"
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
                    className="input-box h-10 w-full"
                  />
                  {errors.end_date && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.end_date?.message}
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
                        options={completionStatus}
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
                      <img
                        src={image}
                        alt="Uploaded"
                        className="max-h-24 w-full rounded-md border border-black/20 object-contain"
                      />
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
                          Upload Certificate
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
