import { newFormRequest, newRequest } from "@/api";
import { EMPLOYEE_TYPE } from "@/api/master";
import { employeeMasterOptions } from "@/constants/data";
import { EmployeeTypeSchema } from "@/schema/dashboard/employee/masters/employeeType.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

export default function AddEmployementType({
  popupOpen,
  setPopupOpen,
  selectedField,
  setSelectedField,
}) {
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);

  // Get selected data
  const { data: employeeTypeDetail, isLoading: employeeTypeLoading } = useQuery(
    {
      queryKey: ["employeeTypeDetail", selectedField],
      queryFn: () =>
        newRequest
          .get(`${EMPLOYEE_TYPE}/${selectedField}`)
          .then((res) => res.data),
      enabled: !!selectedField != 0,
    },
  );
  console.log(employeeTypeDetail);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(EmployeeTypeSchema),
  });

  useEffect(() => {
    if (employeeTypeDetail) {
      setValue(
        "employment_type_name",
        employeeTypeDetail?.employment_type_name,
      );
      setValue(
        "employment_type_status",
        employeeTypeDetail?.employment_type_status,
      );
    }
  }, [employeeTypeDetail, setValue]);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("employment_type_name", data?.employment_type_name);
      formData.append(
        "employment_type_status",
        data?.employment_type_status?.value,
      );
      const res = await newFormRequest.post(EMPLOYEE_TYPE, formData);
      if (res?.data?.success === true) {
        toast.success("Employee Type added successfully!");
        queryClient.invalidateQueries(["employeeTypes"]);
        close();
      }
    } catch (error) {
      toast.error("Failed to add Employee Type!");
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
                {selectedField ? "Update" : "Add"} Employee Type
              </h1>
              <button
                onClick={close}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>
            <form
              className="mt-4 grid grid-cols-1 gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Employee Type Name
                </label>
                <input
                  {...register("employment_type_name", { required: true })}
                  type="text"
                  className="input-box h-10 w-full"
                />
                {errors.employment_type_name && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.employment_type_name?.message}
                  </span>
                )}
              </div>

              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Status</label>
                <Controller
                  name="employment_type_status"
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
                {errors.employment_type_status && (
                  <span className="text-xs font-medium text-red-500">
                    {errors.employment_type_status?.message}
                  </span>
                )}
              </div>

              <div className="mt-2 flex flex-row items-center justify-center gap-3">
                <button
                  type="submit"
                  className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#030E5C] text-sm font-normal text-white focus:outline-none"
                  disabled={loader}
                >
                  {loader ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                      Saving
                    </div>
                  ) : (
                    "Save"
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
