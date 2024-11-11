import { ROSTER_EMPLIST, ROSTER_LIST, SHIFT_LIST } from "@/api/setup";
import QueryTable from "@/components/table/QueryTable";
import { tableRosterData } from "@/constants/tableDummy";
import useEmployeeMaster from "@/hooks/useEmployeeMasters";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel } from "@headlessui/react";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { Plus, Trash2, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function NewRoster({ popupOpen, setPopupOpen}) {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [selectedShiftId, setSelectedShiftId] = useState("");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(),
  });
  
  function close() {
    setPopupOpen(false);
    reset();
  }

  const { data: shiftList } = useEmployeeMaster(SHIFT_LIST, "shiftList");
  const { data: rosterEmpList, refetch: refetchRosterEmpList } = useQuery({
    queryKey: ["rosterEmpList", selectedShiftId], 
    queryFn: () => {
      console.log(`Fetching employee list for shift ID: ${selectedShiftId}`);
      return newRequest
        .get(`${ROSTER_EMPLIST}`)
        .then((res) => res.data);
    },
    enabled: !!selectedShiftId, 
    onSuccess: (data) => {
      console.log("Fetched employee list:", data);
    },
    onError: (error) => {
      console.error("Error fetching employee list:", error?.message || error);
    },
  });

  const selectOptions = rosterEmpList?.employees?.map((item) => ({
    label: item.first_name, 
  }));
 
  const handleShiftChange = (selectedOption) => {
    console.log("Selected shift:", selectedOption);
    setSelectedShiftId(selectedOption.value);
  };

  useEffect(() => {
    console.log("Roster employee list:", rosterEmpList);
  }, [rosterEmpList]);

  
  console.log("Current selectedShiftId:", selectedShiftId);
  console.log("ROSTER_EMPLIST URL:", ROSTER_EMPLIST)
  console.log(selectedShiftId);


  const columns = React.useMemo(
    () => [
      {
        header: "Emp:ID",
        accessorKey: "sno",
        cell: ({ row }) => row.original.rosterlisting || "#001",
      },
      {
        header: "Emp:Name",
        accessorKey: "shift-name",
        cell: ({ row }) => row.original.rosterlisting || "Vaisakh T G",
      },

      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
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
  const data = [
    { sno: 1, details: "vmffghgfhfghj" },
    { sno: 2, details: "fdgdfghfh" },
  ];

  const selectedShift = shiftList?.data?.original?.data.find(
    (item) => item.id === selectedShiftId,
  );
  // const list = shiftList?.data?.original?.data;
  return (
    <Dialog open={popupOpen} as="div" className="relative z-10" onClose={close}>
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
                    <label className="text-sm font-medium">Start Date</label>
                    <input
                      type="date"
                      {...register("startDate", { required: true })}
                      className="input-box w-full"
                    />
                    {errors.startDate && (
                      <span className="text-xs text-red-500">
                        {errors.startDate?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">End Date</label>
                    <input
                      type="date"
                      {...register("endDate", { required: true })}
                      className="input-box w-full"
                    />
                    {errors.endDate && (
                      <span className="text-xs text-red-500">
                        {errors.endDate?.message}
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
                          placeholder="Select Shift"
                          className="input-box w-full"
                          options={selectOptions}
                        />
                      )}
                    />
                    {errors.endDate && (
                      <span className="text-xs text-red-500">
                        {errors.endDate?.message}
                      </span>
                    )}
                    <button className="flex items-center whitespace-nowrap rounded bg-black px-3 py-2 text-sm text-white">
                      <Plus className="size-4" /> Add
                    </button>
                  </div>
                </div>
                <QueryTable
                  columns={columns}
                  list={data}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
