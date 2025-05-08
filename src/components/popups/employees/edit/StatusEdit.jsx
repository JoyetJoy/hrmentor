import { newFormRequest, newRequest } from "@/api";
import {  STATUS_UPDATELIST } from "@/api/master";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { empExperienceSchema } from "@/schema/dashboard/employee/form/experience.schema";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import * as Yup from "yup";

const referenceSchema = Yup.object({
  status: Yup.object({
    id: Yup.string(),
    value: Yup.string(),
    label: Yup.string(),
  }),
});

export default function StatusEdit({
  popupStatusOpen,
  setPopupStatusOpen,
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
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(referenceSchema),
  });

  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
  const { data: statusList } = useEmployeeMaster(STATUS_UPDATELIST, "statusList");
  const [status, setStatus] = useState(null);

  // const transformedStatusList = statusList?.map((status) => ({
  //   value: status.value,
  //   label: status.label,  // or any other field you want to display
  // }));

  const { data: referenceStatus, isLoading } = useQuery({
    queryKey: ["referenceStatus", api, selectedField],
    queryFn: () =>
      newRequest.get(`${api}/${selectedField}`).then((res) => res.data),
    enabled: !!selectedField,
  });

  useEffect(() => {
    if (referenceStatus) {
      setValue("status", referenceStatus.status);
    }
  }, [referenceStatus]);

  function close() {
    setPopupStatusOpen(false);
    setSelectedField(0);
    reset();
  }

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("status", status);
      let res;
      if (selectedField !== 0) {
        res = await newFormRequest.post(
          `reference-status-update/${selectedField}`,
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
  // (reference-status-update)
  return (
    <Dialog
      open={popupStatusOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-sm rounded bg-white/90 p-7 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                Change Status
              </h1>
              <button
                type="button"
                onClick={close}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>
            {loader ? (
              <div className="flex min-h-72 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <form
                className="grid grid-cols-1 gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-1 gap-3">
                  <div className="group flex w-full flex-col gap-1">
                    <label className="label-text">Status</label>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={true}
                          styles={customSelectStyles}
                          options={statusList}
                          onChange={(e) => {
                            setStatus(e?.value);
                          }}
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
                </div>
                <div className="grid grid-cols-1">
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
                </div>
              </form>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
