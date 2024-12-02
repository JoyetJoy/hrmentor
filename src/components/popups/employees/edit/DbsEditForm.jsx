import { newFormRequest, newRequest } from "@/api";
import useImageUpload from "@/hooks/useImageUpload";
import { dbsSchema } from "@/schema/dashboard/employee/form/dbs.schema";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpFromLine, Eye, UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";
import { customSelectStyles } from "@/utils/customStyles";

export default function DbsEditForm({
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
    resolver: yupResolver(dbsSchema),
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
      setValue("name", employeeExperienceDetailByid.name);
      setValue("start_date", employeeExperienceDetailByid.start_date);
      setValue("reference", employeeExperienceDetailByid.reference);
      setValue("comments", employeeExperienceDetailByid.comments);
      setValue("status", employeeExperienceDetailByid.status);
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
      formData.append("name", data?.name);
      formData.append("start_date", data.start_date);
      formData.append("reference", data.reference);
      formData.append("comments", data.comments);
      formData.append("status", data.status);
      imageFile && formData.append("certificate", imageFile);
      console.log(formData);

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
            className="data-[closed]:transform-[scale(95%)] w-full max-w-2xl rounded bg-white/90 p-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                {selectedField ? "Update" : "Add"} DBS Check
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
                className="grid grid-cols-2 gap-3"
                //   onSubmit={handleSubmit(onSubmit)}
              >
                <div className="group flex w-full flex-col gap-1">
                  <label className="label-text">DBS Type</label>
                  <Controller
                    name="db_type"
                    control={control}
                    // rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select Type"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    )}
                  />
                  {errors.name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.name?.message}
                    </span>
                  )}
                </div>

                <div className="group flex flex-col space-y-1">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Subscription
                  </label>
                  <Controller
                    name="account_type"
                    control={control}
                    // rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select Type"
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

                <div className="group flex flex-col space-y-1">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Renewal
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
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    DBS Number
                  </label>
                  <input
                    {...register("reference", { required: true })}
                    type="text"
                    placeholder="Enter reference"
                    className="input-box h-10 w-full"
                  />
                  {errors.reference && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.reference?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Date of issue
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
                <div className="group flex flex-col gap-1.5">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Document (optional)
                  </label>
                  <label
                    htmlFor="employee-profile-pic"
                    className="input-box flex h-10 cursor-pointer items-center justify-between gap-36 rounded-md border border-dashed bg-gray-soft px-2"
                  >
                    <div className="flex items-center justify-between gap-32">
                      <span className="flex items-center whitespace-nowrap text-xs font-semibold text-black/50">
                        <ArrowUpFromLine className="size-4" />
                        Upload Certificate
                      </span>
                      <Eye className="size-4" />
                    </div>
                    <input
                      id="employee-profile-pic"
                      onChange={handleImageChange}
                      type="file"
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="label-text">Status</label>
                  <Controller
                    name="status"
                    control={control}
                    // rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isSearchable={false}
                        styles={customSelectStyles}
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    )}
                  />
                  {errors.name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.name?.message}
                    </span>
                  )}
                </div>
                <div className="group col-span-2 flex flex-col space-y-1">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Note
                  </label>
                  <textarea
                    {...register("comments", { required: true })}
                    className="input-box h-24 w-full pt-1 placeholder:text-[0.8rem]"
                  />
                  {errors.employer_details && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.employer_details?.message}
                    </span>
                  )}
                </div>
                <div className="group col-span-2 flex flex-col space-y-1">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Self Declaration
                  </label>
                  <textarea
                    {...register("comments", { required: true })}
                    className="input-box h-24 w-full pt-1 placeholder:text-[0.8rem]"
                  />
                  {errors.employer_details && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.employer_details?.message}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-row items-center justify-center gap-3">
                  <button
                    type="submit"
                    className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmprimaryorange text-sm font-normal text-white focus:outline-none"
                    disabled={loader}
                  >
                    {loader ? (
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                        {selectedField ? "Updating" : "Saving"}
                      </div>
                    ) : (
                      <span>{selectedField ? "Add" : "Save"}</span>
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
