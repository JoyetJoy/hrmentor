import {
  GET_SHIFT,
  ROSTER_LIST,
  SHIFT_LIST,
} from "@/api/setup";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import Select from "react-select";
import { newRequest } from "@/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { RosterSchema } from "@/schema/dashboard/masters/roster.schema";
import toast from "react-hot-toast";
import { ADD_ROSTER, EMPLOYEE_LIST_SHIFT, SWAP_SHIFT } from "@/api/master";

export default function ChangeShift({ popupOpen, setPopupOpen, datas, shiftIds ,refetch}) {
  const [selectedShiftId, setSelectedShiftId] = useState(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(RosterSchema),
  });

  function close() {
    setPopupOpen(false);
    reset();
  }
console.log(errors);

  

  const { data: shiftList } = useQuery({
    queryKey: ["rosterEmpList", datas],
    queryFn: () => {
      return newRequest.get(`${GET_SHIFT}?shift_id=${datas?.shiftId}&employee_id=${datas?.empId}&date=${datas?.date}`).then((res) => {
        return res.data;
      });
    },
    enabled: datas?.type==='add',
  });
// console.log(shiftlist);

  const { data: employeeList } = useQuery({
    queryKey: ["employeeList", datas],
    queryFn: () => {
      return newRequest.get(`${EMPLOYEE_LIST_SHIFT}?roster_id=${datas?.rosterid}&employee_id=${datas?.empId}&department_id=${datas?.departmentId}`).then((res) => {
        return res.data;
      });
    },
    enabled: datas?.type==='change',
  });


  const handleShiftChange = (selectedOption) => {
    console.log("Selected shift:", selectedOption);
    if(datas?.type === 'add'){

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
  
  const onSubmit = async () => {
    try {
      
      if (datas?.type === "change") {
        const formdata = {
          swaping_from_employee_id: datas?.empId,
          swaping_to_employee_id: selectedShiftId,
          shift_id: datas?.shiftId,
          roster_id: datas?.rosterid,
          swaping_date: datas?.date,
          swap_id: datas?.swap_id 
        };
  
        const response = await newRequest.post(SWAP_SHIFT, formdata);
        if (response?.data?.status === 201) {
          toast.success(response?.data?.message);
          refetch();
        } else {
          toast.error(response?.data?.message);
        }
      }else if(datas?.type === "add"){
        const formdata = {
          date:datas?.date,
          shift_id:selectedShiftId,
          employee_id:datas?.empId
        }
        const response = await newRequest.post(ADD_ROSTER, formdata);
        if (response?.data?.status === 201) {
          toast.success(response?.data?.message);
          refetch();
        } else {
          toast.error(response?.data?.message);
        }
      }
      // await handleRoster(datas);
      close();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing your request.");
    }
  };
  console.log("selectedShiftId:", selectedShiftId);
  console.log("data", datas);

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
                <h1 className="text-md font-bold">{datas?.type === 'change' ? 'Change Shift' : 'Add Shift' }</h1>
                <button onClick={close}>
                  <X />
                </button>
              </div>
              <div className="gap-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="text-sm font-medium">{datas?.type === 'change'? 'Employee' : 'Shift' }</label>
                        {datas?.type === 'change' ?
                        <Controller
                        name="shift"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable={true}
                            styles={customSelectStyles}
                            options={employeeList?.data?.original?.map(
                              (item) => ({
                                label: item.name,
                                value: item.id,
                              }),
                            )}
                            placeholder="Select Employee"
                            className="input-box w-full text-black"
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption);
                              handleShiftChange(selectedOption);
                            }}
                          />
                        )}
                      /> :
                      <Controller
                          name="shift"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable={true}
                              styles={customSelectStyles}
                              options={shiftList?.data?.original?.map(
                                (item) => ({
                                  label: item.name,
                                  value: item.shift_id,
                                }),
                              )}
                              placeholder="Select Shift"
                              className="input-box w-full text-black"
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption);
                                handleShiftChange(selectedOption);
                              }}
                            />
                          )}
                        />
                        }
                        {errors?.shift&&(
                        <p className="text-red-500 text-xs">{errors?.shift?.message}</p>
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
