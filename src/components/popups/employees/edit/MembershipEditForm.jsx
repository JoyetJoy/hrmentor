import { EMPLOYEE_MEMBERSHIP_UPDATE, newFormRequest, newRequest } from "@/api";
import { empMembershipSchema } from "@/schema/dashboard/employee/form/membership.schema";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function EmployeeMembershipEditForm({
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
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(empMembershipSchema),
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

  console.log(employeeExperienceDetailByid);

  useEffect(() => {
    if (employeeExperienceDetailByid) {
      setValue("reg_memb_body", employeeExperienceDetailByid.reg_memb_body);
      setValue(
        "professional_reg_number",
        employeeExperienceDetailByid.professional_reg_number,
      );
      setValue("expiry_date", employeeExperienceDetailByid.expiry_date);
      setValue(
        "first_registered_date",
        employeeExperienceDetailByid.first_registered_date,
      );
      setValue("renewal_date", employeeExperienceDetailByid.renewal_date);
    }
  }, [employeeExperienceDetailByid]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("reg_memb_body", data?.reg_memb_body);
      formData.append("user_id", uid);
      formData.append("professional_reg_number", data.professional_reg_number);
      formData.append("expiry_date", data.expiry_date);
      formData.append("first_registered_date", data.first_registered_date);
      formData.append("renewal_date", data.renewal_date);
      let res;
      if (selectedField !== 0) {
        res = await newFormRequest.post(
          `${EMPLOYEE_MEMBERSHIP_UPDATE}/${selectedField}`,
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
                {selectedField ? "Update" : "Add"} Registration & Memberships
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
                  <label className="required label-text">
                    Registration/Membership body
                  </label>
                  <input
                    {...register("reg_memb_body", { required: true })}
                    type="text"
                    placeholder="Enter job role"
                    className="input-box h-10 w-full"
                  />
                  {errors.reg_memb_body && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.reg_memb_body?.message}
                    </span>
                  )}
                </div>

                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Professional Registration Number
                  </label>
                  <input
                    {...register("professional_reg_number", { required: true })}
                    type="text"
                    placeholder="Enter employer name"
                    className="input-box h-10 w-full"
                  />
                  {errors.professional_reg_number && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.professional_reg_number?.message}
                    </span>
                  )}
                </div>

                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Expiry Date
                  </label>
                  <input
                    {...register("expiry_date", { required: true })}
                    type="date"
                    className="input-box h-10 w-full pr-2"
                  />
                  {errors.expiry_date && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.expiry_date?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Registered Date
                  </label>
                  <input
                    {...register("first_registered_date", { required: true })}
                    type="date"
                    className="input-box h-10 w-full pr-2"
                  />
                  {errors.first_registered_date && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.first_registered_date?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Revalidation/Renewal Date
                  </label>
                  <input
                    {...register("renewal_date", { required: true })}
                    type="date"
                    className="input-box h-10 w-full pr-2"
                  />
                  {errors.renewal_date && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.renewal_date?.message}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-row items-center justify-center gap-3">
                  <button
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
