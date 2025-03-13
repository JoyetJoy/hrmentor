import { GET_SHIFT } from "@/api/setup";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import Select from "react-select";
import { newRequest } from "@/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RosterSchema } from "@/schema/dashboard/masters/roster.schema";
import toast from "react-hot-toast";
import {
  ADD_ROSTER,
  DELETE_SHIFT,
  EMPLOYEE_LIST_SHIFT,
  SWAP_SHIFT,
} from "@/api/master";

export default function ChangeShift({
  popupOpen,
  setPopupOpen,
  datas,
  shiftIds,
  refetch,
}) {
  const [selectedShiftId, setSelectedShiftId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [hover, setHover] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(RosterSchema),
  });
console.log(datas);

  function close() {
    setPopupOpen(false);
    reset();
  }

  const { data: listData } = useQuery({
    queryKey: ["rosterData", datas],
    queryFn: () => {
      const url =
        datas?.type === "change"
          ? `${EMPLOYEE_LIST_SHIFT}?roster_id=${datas?.rosterid}&employee_id=${datas?.empId}&department_id=${datas?.departmentId}`
          : `${GET_SHIFT}?shift_id=${datas?.shiftId}&employee_id=${datas?.empId}&date=${datas?.date}`;

      return newRequest.get(url).then((res) => res.data);
    },
    enabled: Boolean(datas?.type),
  });

  const handleShiftChange = (selectedOption) => {
    if (datas?.type === "add") {
    }
    setSelectedShiftId(selectedOption.value);
  };

  // const onSubmit = async () => {
  //   if(datas?.type === 'change'){
  //     const formdata={
  //       swaping_from_employee_id:datas?.empId,
  //       swaping_to_employee_id:selectedShiftId,
  //       shift_id:datas?.shiftId,
  //       roster_id:datas?.rosterid,
  //       swaping_date:datas?.date
  //     }
  //     const response = await newRequest.post(SWAP_SHIFT,formdata);
  //     console.log(response);

  //   }
  //   if (employeesdetails.length === 0) {
  //     setEmployeeError("Employee is required");
  //   } else {
  //     await handleRoster(datas);
  //     close();
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      console.log(isDeleted);
      if (!data?.shift && !isDeleted) {
        setError("shift", {
          type: "manual",
          message: "Select one of the above options",
        });
        return;
      }

      let formData;
      let apiUrl;

      if (datas?.type === "change" && data?.shift) {
        formData = {
          swaping_from_employee_id: datas?.empId,
          swaping_to_employee_id: selectedShiftId,
          shift_id: datas?.shiftId,
          roster_id: datas?.rosterid,
          swaping_date: datas?.date,
          swap_id: datas?.swap_id,
          is_swapped:datas?.is_swapped,
          swap_id:datas?.dateSwap?.swap_id
        };
        apiUrl = SWAP_SHIFT;
      } else if (datas?.type === "change" && isDeleted) {
        formData = {
          employee_id: datas?.empId,
          shift_id: datas?.shiftId,
          roster_id: datas?.rosterid,
          date: datas?.date,
        };
        apiUrl = DELETE_SHIFT;
      } else {
        formData = {
          date: datas?.date,
          shift_id: selectedShiftId,
          employee_id: datas?.empId,
        };
        apiUrl = ADD_ROSTER;
      }

      const response = await newRequest.post(apiUrl, formData);
      toast.success(response?.data?.message);
      refetch();
      close();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing your request.");
    }
  };

  return (
    <>
      <Dialog
        open={popupOpen}
        as="div"
        className="relative z-30"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black/20">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="min-w-[28rem] rounded bg-white p-6">
              <div className="mb-5 flex justify-between">
                <h1 className="text-md font-bold">
                  {datas?.type === "change" ? "Edit Shift" : "Add Shift"}
                </h1>
                <button onClick={close}>
                  <X />
                </button>
              </div>
              <hr className="mb-5 h-[0.03rem] bg-gray-500" />
              <div className="gap-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between text-sm font-semibold">
                        <p
                          className={`${isDeleted ? "text-gray-400 line-through" : ""}`}
                        >
                          {datas?.shift_name}
                        </p>
                        <button
                          type="button"
                          onClick={() => setIsDeleted(true)}
                          onMouseEnter={() => setHover(true)}
                          onMouseLeave={() => setHover(false)}
                          className="relative flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
                        >
                          <Trash2 className="size-3" />
                          {hover && (
                          <span className="absolute right-0 top-10 w-[7rem] rounded-md bg-gray-800 px-2 py-2 text-xs text-white shadow-md">
                            Delete Shift
                          </span>
                        )}
                        </button>
                      </div>

                      <div class="flex items-center gap-2">
                        <hr class="flex-1 border-t border-gray-300" />
                        <span class="text-gray-600">or</span>
                        <hr class="flex-1 border-t border-gray-300" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          {datas?.type === "change" ? "Reassign to" : "Shift"}
                        </label>
                        <Controller
                          name="shift"
                          control={control}
                          rules={{ required: "Please select a shift" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable
                              styles={customSelectStyles}
                              options={listData?.data?.original?.map(
                                (item) => ({
                                  label: item.name,
                                  value: item.id || item.shift_id,
                                }),
                              )}
                              placeholder={
                                datas?.type === "change"
                                  ? "Select Employee"
                                  : "Select Shift"
                              }
                              className="input-box w-full text-black"
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption);
                                handleShiftChange(selectedOption);
                              }}
                            />
                          )}
                        />
                        {errors?.shift && (
                          <p className="text-xs text-red-500">
                            {errors?.shift?.message}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 flex gap-3">
                        <button
                          type="button"
                          onClick={close}
                          className="w-full rounded border border-black px-4 py-3"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="w-full rounded bg-hrmprimaryorange px-7 py-3 text-white"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
