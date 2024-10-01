import {
  newFormRequest,
  newRequest,
  UPDATE_EMPLOYEE_EMERGENCY_CONTACTS,
} from "@/api";
import { relationshipList } from "@/constants/data";
import { empEmergencyContactSchema } from "@/schema/dashboard/employee/form/emergencyContact.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

export default function EmployeeEmergencyContactEditForm({
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
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(empEmergencyContactSchema),
  });

  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);

  // Get selected data
  const { data: employeeEmergencyContactDetailByid, isLoading } = useQuery({
    queryKey: ["employeeEmergencyContactDetailByid", api, selectedField],
    queryFn: () =>
      newRequest.get(`${api}/${selectedField}/edit`).then((res) => res.data),
    enabled: !!selectedField != 0,
  });

  useEffect(() => {
    if (employeeEmergencyContactDetailByid) {
      setValue("name", employeeEmergencyContactDetailByid?.data?.name);
      setValue(
        "relationship",
        employeeEmergencyContactDetailByid?.data?.relationship,
      );
      setValue("address", employeeEmergencyContactDetailByid?.data?.address);
      setValue(
        "contact_number",
        employeeEmergencyContactDetailByid?.data?.contact_number,
      );
    }
  }, [employeeEmergencyContactDetailByid]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("user_id", uid);
      formData.append("relationship", data.relationship?.value);
      formData.append("address", data.address);
      formData.append("contact_number", data.contact_number);
      let res;
      if (selectedField !== 0) {
        res = await newFormRequest.post(
          `${UPDATE_EMPLOYEE_EMERGENCY_CONTACTS}/${selectedField}`,
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
                {selectedField ? "Update" : "Add"} Emergency Contact
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
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Enter name"
                    className="input-box h-10 w-full placeholder:text-[0.8rem]"
                  />
                  {errors.name && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.name?.message}
                    </span>
                  )}
                </div>

                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Relationship
                  </label>
                  <Controller
                    name="relationship"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={relationshipList}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select relationship"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    )}
                  />
                  {errors.relationship && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.relationship?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Phone Number
                  </label>
                  <input
                    {...register("contact_number", { required: true })}
                    onKeyPress={(event) => {
                      if (
                        !/^[0-9]$/.test(event.key) ||
                        event.target.value.length >= 10
                      ) {
                        event.preventDefault();
                      }
                    }}
                    className="input-box h-10 w-full"
                  />
                  {errors.contact_number && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.contact_number?.message}
                    </span>
                  )}
                </div>
                <div className="group flex flex-col space-y-1">
                  <label className="required text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Address
                  </label>
                  <textarea
                    {...register("address", { required: true })}
                    type="text"
                    placeholder="Enter address"
                    className="input-box h-20 w-full pt-1 placeholder:text-[0.8rem]"
                  />
                  {errors.address && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.address?.message}
                    </span>
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
