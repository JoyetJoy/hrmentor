import QueryTable from "@/components/table/QueryTable";
import { tableRosterData } from "@/constants/tableDummy";
import { customSelectStyles } from "@/utils/customStyles";
import { Dialog, DialogPanel, Select } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function NewRoster({ popupOpen, setPopupOpen }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  function close() {
    setPopupOpen(false);
    reset();
  }

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

  const columns = React.useMemo(
    () => [
      {
        header: "Emp:ID",
        accessorKey: "sno",
      },
      {
        header: "Emp:Name",
        accessorKey: "shift-name",
        cell: ({ row }) => row.original.details || "N/A",
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
                          placeholder="Select Shift"
                          className="input-box w-full"
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
                  <table className="mt-4 w-full table-auto border bg-[#9E9E9E] bg-opacity-20">
                    <tbody>
                      {tableRosterData.map((item, index) => (
                        <tr key={index}>
                          <td className="border border-[#9E9E9E] px-2 py-1 text-sm font-bold">
                            {item.label}
                          </td>
                          <td className="border border-[#9E9E9E] px-2 py-1 text-sm">
                            {item.value}
                          </td>
                        </tr>
                      ))}
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
                      name="shift"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={true}
                          styles={customSelectStyles}
                          placeholder="Select Shift"
                          className="input-box w-full"
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
