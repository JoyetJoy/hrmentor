import { ROSTER_EMPLIST, ROSTER_LIST, SHIFT_LIST } from "@/api/setup";
import QueryTable from "@/components/table/QueryTable";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import Select from "react-select";
import { newRequest } from "@/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { RosterSchema } from "@/schema/dashboard/masters/roster.schema";
import toast from "react-hot-toast";

export default function NewRoster({ popupOpen, setPopupOpen }) {
  const [selectedShiftId, setSelectedShiftId] = useState(23);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeesdetails, setEmployeesdetails] = useState([]);
  const [employeeError, setEmployeeError] = useState('');
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

  const { data: shiftList } = useEmployeeMaster(SHIFT_LIST, "shiftList");

  const { data: rosterEmpList } = useQuery({
    queryKey: ["rosterEmpList", selectedShiftId],
    queryFn: () => {
      console.log(`Fetching employee list for shift ID: ${selectedShiftId}`);
      return newRequest
        .get(`${ROSTER_EMPLIST}/${selectedShiftId}`)
        .then((res) => {
          return res.data;
        });
    },
    enabled: !!selectedShiftId,
    onSuccess: (data) => {
      console.log("Fetched employee list:", data);
    },
    onError: (error) => {
      console.error("Error fetching employee list:", error?.message || error);
    },
  });

  const selectedShift = shiftList?.data?.original?.data.find(
    (item) => item.id === selectedShiftId,
  );

  const handleShiftChange = (selectedOption) => {
    console.log("Selected shift:", selectedOption);
    setSelectedShiftId(selectedOption.value);
  };

  const handleDeleteEmployee = (employeeId) => {
    setSelectedEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.unique_id !== employeeId),
    );
    toast.success("Employee deleted successfully");
  };
  const handleAddEmployee = () => {
    if (selectedEmployee) {
      setSelectedEmployees((prev) => [
        ...prev,
        {
          unique_id: selectedEmployee.value,
          first_name: selectedEmployee.label,
        },
      ]);
      setEmployeesdetails((prev) => [
        ...prev,
        {
          employee_id: Number(selectedEmployee.value),
        },
      ]);
    } else {
      console.log("No employee selected to add.");
    }
  };

  useEffect(()=>{
    setTimeout(() => {
      setEmployeeError('')
    }, 3000)
    
  },[employeeError])

  const onSubmit = async (data) => {
    if(employeesdetails.length===0){
      setEmployeeError('Employee is required');
    }else{
      await handleRoster(data);
      close();
    }
    
  };

  const handleRoster = async (data) => {
    const formData = {
      shift_id: selectedShiftId,
      start_date: data.start_date,
      end_date: data.end_date,
      rosterDetails: employeesdetails,
    };

    console.log(formData);
    try {
      let res;
      res = await newRequest.post(ROSTER_LIST, formData);
      console.log(res);
      if (res?.status === 200) {
        toast.success("Saved roster details successfully");
        queryClient.invalidateQueries([""]);
        reset();
        setPopupOpen(false);
      } else {
        toast.error("Failed to save roster.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error||"Failed roster.");
    }
  };
  useEffect(() => {
    if (selectedShiftId) {
      console.log(`Shift selected: ${selectedShiftId}`);
    }
  }, [selectedShiftId]);

  const columns = React.useMemo(
    () => [
      {
        header: "Emp:ID",
        accessorKey: "unique_id",
        cell: ({ row }) => row?.original?.unique_id || "NA",
      },
      {
        header: "Emp:Name",
        accessorKey: "first_name",
        cell: ({ row }) => row?.original?.first_name || "NA",
      },

      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDeleteEmployee(row.original.unique_id)}
              className="flex cursor-pointer items-center justify-center rounded-full bg-[#EBEBF0] p-2 text-[#2C2C2C]"
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );
  return (
    <>
      <Dialog
        open={popupOpen}
        as="div"
        className="relative z-10"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-4xl rounded bg-white p-6">
              <div className="mb-5 flex justify-between">
                <h1 className="text-md font-bold">Create New Roster</h1>
                <button onClick={close}>
                  <X />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="text-sm font-medium">Shift</label>
                        <Controller
                          name="shift"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable={true}
                              styles={customSelectStyles}
                              options={shiftList?.data?.original?.data.map(
                                (item) => ({
                                  label: item.name,
                                  value: item.id,
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
                        {errors.shift && (
                          <span className="text-xs text-red-500">
                            {errors.shift?.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Start Date
                        </label>
                        <input
                          type="date"
                          {...register("start_date", { required: true })}
                          className="input-box w-full"
                        />
                        {errors.start_date && (
                          <span className="text-xs text-red-500">
                            {errors.start_date?.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium">End Date</label>
                        <input
                          type="date"
                          {...register("end_date", { required: true })}
                          className="input-box w-full"
                        />
                        {errors.end_date && (
                          <span className="text-xs text-red-500">
                            {errors.end_date?.message}
                          </span>
                        )}
                      </div>
                      <table className="mt-4 table-auto border bg-[#9E9E9E] bg-opacity-20">
                        <tbody>
                          <tr>
                            <td className="border border-[#9E9E9E] px-2 py-1 text-sm font-bold">
                              Pay type
                            </td>
                            <td className="border border-[#9E9E9E] px-2 py-1 text-sm">
                              {selectedShift?.calculation_type}
                            </td>
                          </tr>
                          <tr>
                            <td className="w-fit border border-[#9E9E9E] px-2 py-1 text-sm font-bold">
                              Clock In time
                            </td>
                            <td className="border border-[#9E9E9E] px-2 py-1 text-sm">
                              {selectedShift?.start_time}
                            </td>
                          </tr>
                          <tr>
                            <td className="w-fit border border-[#9E9E9E] px-2 py-1 text-sm font-bold">
                              Clock Out time
                            </td>
                            <td className="border border-[#9E9E9E] px-2 py-1 text-sm">
                              {selectedShift?.end_time}
                            </td>
                          </tr>
                          <tr>
                            <td className="w-fit border border-[#9E9E9E] px-2 py-1 text-sm font-bold">
                              Department
                            </td>
                            <td className="border border-[#9E9E9E] px-2 py-1 text-sm">
                              {selectedShift?.department?.label}
                            </td>
                          </tr>
                          <tr>
                            <td className="w-fit border border-[#9E9E9E] px-2 py-1 text-sm font-bold">
                              Work Location
                            </td>
                            <td className="border border-[#9E9E9E] px-2 py-1 text-sm">
                              {selectedShift?.location?.label}
                            </td>
                          </tr>
                          <tr>
                            <td className="w-fit border border-[#9E9E9E] px-2 py-1 text-sm font-bold">
                              Work Area
                            </td>
                            <td className="border border-[#9E9E9E] px-2 py-1 text-sm">
                              {selectedShift?.workArea?.label}
                            </td>
                          </tr>
                          <tr>
                            <td className="w-fit border border-[#9E9E9E] px-2 py-1 text-sm font-bold">
                              People Required
                            </td>
                            <td className="border border-[#9E9E9E] px-2 py-1 text-sm">
                              {selectedShift?.people_required}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="mt-4 flex gap-3">
                        <button
                          type="submit"
                          className="w-full rounded bg-hrmprimaryorange px-7 py-3 text-white"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={close}
                          className="w-full rounded border border-black px-4 py-3"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="mt-1 flex h-full flex-col gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Add Employee</label>
                    <div className="flex gap-2">
                      <Controller
                        name="employees"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            isSearchable={true}
                            styles={customSelectStyles}
                            placeholder="Select Employee"
                            className="input-box w-full"
                            options={rosterEmpList?.employees?.map((item) => ({
                              label: item.first_name,
                              value: item.unique_id,
                            }))}
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption);
                              setSelectedEmployee(selectedOption);
                            }}
                          />
                        )}
                      />
                      <button
                        type="submit"
                        className="flex items-center whitespace-nowrap rounded bg-black px-3 py-2 text-sm text-white"
                        onClick={handleAddEmployee}
                      >
                        <Plus className="size-4" /> Add
                      </button>
                    </div>
                    {employeeError!==''&&(
                          <span className=" mt-2 text-xs text-red-500">
                            {employeeError}
                          </span>
                        )}
                  </div>
                  <QueryTable columns={columns} list={selectedEmployees} />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
