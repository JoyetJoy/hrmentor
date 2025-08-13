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
import {
  RosterEditSchema,
  RosterSchema,
} from "@/schema/dashboard/masters/roster.schema";
import toast from "react-hot-toast";
import {
  ADD_ROSTER,
  DELETE_SHIFT,
  EMPLOYEE_LIST_SHIFT,
  SWAP_SHIFT,
} from "@/api/master";

export default function EmployeeList({ popupOpen, setPopupOpen, datas }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [hover, setHover] = useState(false);

  function close() {
    setIsDeleted(false);
    setPopupOpen(false);
    reset();
  }

  return (
    <>
      <Dialog
        open={popupOpen}
        as="div"
        className="relative z-30"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black/20">
          <div className="flex min-h-full items-center justify-center ">
            <DialogPanel className="min-w-[21rem] rounded bg-white p-10">
              <div className="mb-5 flex justify-between">
                <h1 className="text-md font-bold">{datas?.shift}</h1>
                <button onClick={close}>
                  <X />
                </button>
              </div>
              <hr className="mb-5 h-[0.03rem] bg-gray-500" />
              <div className="flex flex-col gap-6">
                {datas?.emp?.length > 0 &&
                  datas.emp.map((employee, i) => (
                    <li key={i}>{employee.full_name}</li>
                  ))}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
