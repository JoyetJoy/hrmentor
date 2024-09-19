import { EmployeeTypeSchema } from "@/schema/dashboard/employee/masters/employeeType.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

export default function AddEmployementType({ popupOpen, setPopupOpen }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(EmployeeTypeSchema),
  });
  function close() {
    setPopupOpen(false);
  }

  return (
    <>
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
              <div className="mb-8 flex items-center justify-between">
                <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                  Add Employee Type
                </h1>
                <button
                  onClick={close}
                  className="text-lg font-extrabold text-[#00000080]"
                >
                  <X />
                </button>
              </div>
              <form className="mt-4 grid grid-cols-1 gap-3">
                <div className="group flex flex-col space-y-1">
                  <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                    Employee Type Name
                  </label>
                  <input
                    // {...register("name", { required: true })}
                    type="text"
                    className="input-box h-10 w-full"
                  />
                  {/* {errors.name && (
                      <span className="text-xs font-medium text-red-500">
                        {errors.name?.message}
                      </span>
                    )} */}
                </div>
                <div className="group flex w-full flex-col gap-1">
                  <label className="label-text">Status</label>
                  <Controller
                    name="nationality"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        // required
                        //   selected={''}
                        //   value={''}
                        //   onChange={(selectedOption) => {
                        //     handle(selectedOption);
                        //     field.onChange(selectedOption);
                        //   }}
                        //   options={}
                        isSearchable={false}
                        styles={customSelectStyles}
                        placeholder="Select Status"
                        className="input-box h-10 w-full rounded-md border-[#C2C1C1] focus:border-[#C2C1C1]"
                      />
                    )}
                  />
                  {errors.nationality && (
                    <span className="text-xs font-medium text-red-500">
                      {errors.nationality?.message}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-row items-center justify-center gap-3">
                  <button className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#030E5C] text-sm font-normal text-white focus:outline-none">
                    Save
                  </button>
                  <button className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none">
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
