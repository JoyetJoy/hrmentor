import React, { Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { Popover, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { newRequest } from "@/api/master";
import { JOB_LISTING, JOB_POST } from "@/api/recruiter";
import { customSelectStyles } from "@/utils/customStyles";
import toast from "react-hot-toast";

// Define the validation schema
const schema = yup.object().shape({
  job: yup
    .object()
    .nullable()
    .required("Job is required"),
  workflow: yup
    .object()
    .nullable()
    .required("Workflow is required"),
});

function Addtransfer({ popupOpen, setPopupOpen, cid }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { data: joblisting, isLoading } = useQuery({
    queryKey: ["joblisting"],
    queryFn: () =>
      newRequest.get(JOB_LISTING).then((res) => {
        return res.data;
      }),
  });

  const workflow = [
    {
      "id": 3,
      "label": "Short Listed",
      "value": "Short Listed"
  },
  {
      "id": 4,
      "label": "New Hiring",
      "value": "New Hiring"
  },
  ]

  function closeModal() {
    setPopupOpen(false);
  }
  const onSubmit = async (data) => {
    try {
      const formData = {
        job_id: data?.job?.id,
        status: data.workflow.id,
        candidate_id: parseInt(cid),
      };
  
      const res = await newRequest.post(`${JOB_POST}`, formData);

      if(res.data.status){
        toast.success(res?.data?.message)
      }
      closeModal();
    } catch (error) {
      console.error("Error updating candidate: ", error);
    }
  };
  
  return (
    <>
      {popupOpen && (
        <div className="fixed inset-0 z-[100] flex h-full w-full items-center justify-center bg-black/20">
          <Popover className="relative">
            <>
              <Transition
                as={Fragment}
                show={popupOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="w-[22rem] transform rounded-sm bg-white px-9 pb-10 pt-6">
                  <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-sm font-bold leading-7 text-neutral-700">
                      Transfer to Job
                    </h1>
                    <button
                      onClick={closeModal}
                      className="text-lg font-extrabold text-[#00000080]"
                    >
                      <X />
                    </button>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-4 grid grid-cols-1 gap-3"
                  >
                    {/* Select Job Field */}
                    <div className="group flex w-full flex-col gap-1">
                      <label className="label-text">Select Job</label>
                      <Controller
                        name="job"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={joblisting}
                            isSearchable={false}
                            styles={customSelectStyles}
                            placeholder="Select Job"
                            className="input-box h-10 w-full rounded-md border-[#C2C1C1] placeholder:text-[#7F7F7F] focus:border-[#C2C1C1]"
                          />
                        )}
                      />
                      {errors.job && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.job.message}
                        </span>
                      )}
                    </div>

                    {/* Select Workflow Field */}
                    <div className="group flex w-full flex-col gap-1">
                      <label className="label-text">Select Workflow</label>
                      <Controller
                        name="workflow"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={workflow}
                            isSearchable={false}
                            styles={customSelectStyles}
                            placeholder="Select Workflow"
                            className="input-box h-10 w-full rounded-md border-[#C2C1C1] placeholder:text-[#7F7F7F] focus:border-[#C2C1C1]"
                          />
                        )}
                      />
                      {errors.workflow && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.workflow.message}
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="mt-2 flex flex-row items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded border border-[#ECE9F1] bg-white text-sm font-semibold text-[#7F7F7F] focus:outline-none"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-bgColor-100 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded bg-hrmblack text-sm font-semibold text-white focus:outline-none"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Popover.Panel>
              </Transition>
            </>
          </Popover>
        </div>
      )}
    </>
  );
}

export default Addtransfer;
