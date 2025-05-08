import { newRequest, AVAILABLE_SLOT } from "@/api";
import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { customSelectStyles } from "@/utils/customStyles";

export default function RequestClaimshift({
  popupOpen,
  refetch,
  type,
  setPopupOpen,
  selectedField,
}) {
  const [note, setNote] = useState("");
  const [error, setError] = useState({ shift: '', note: '' });
  const [selectedShift, setSelectedShift] = useState('');

  const { control, reset } = useForm();
  function close() {
    setError({shift:'Select a shift', note:'Note is required'})
    setNote("");
    reset();
    setPopupOpen(false);
  }
  
  const options = [
    {
      id: 1,
      label: "Morning",
      value: 1,
    },
    {
      id: 2,
      label: "Morning",
      value: 2,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (note === "" && selectedShift==='') {
      setError({shift:'Select a shift', note:'Note is required'})
      return;
    }else if(note === ""){
      setError(prev => ({ ...prev, note: "Note is required." }));
    }else if (shift === ''){
      setError(prev => ({ ...prev, note: "Select a shift" }));
    }
    const payload = {
      shift_id: selectedField?.slot?.shift_id,
      roster_id: selectedField?.slot?.id,
      note: note,
      shift_date: selectedField?.date,
    };

    const response = await newRequest.post(AVAILABLE_SLOT, payload);
    if (response.status === 200) {
      refetch();
      reset();
      setPopupOpen(false);
      toast.success("Requested successfully");
    } else {
      setPopupOpen(false);
      toast.error("Failed to request slot, Try again.");
    }
    setError(null);
    setNote("");
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
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md justify-between rounded bg-white/90 px-14 py-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-md font-bold leading-7 text-textcolor-darkCharcoal">
                {type === 'claim' ? 'Request for Claim shift' : 'Requested shift details'}
              </h1>
              <button
                onClick={close}
                className="text-xl font-extrabold text-textcolor-darkCharcoal"
              >
                <X />
              </button>
            </div>
            <div className="flex flex-col justify-between gap-3 gap-y-7">
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Select Shift
                </label>
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
                      value={field.value}
                      options={options}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setSelectedShift(selectedOption.value);
                      }}
                    />
                  )}
                />
                {error?.shift && <div className="text-sm text-red-500">{error.shift}</div>}
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Shift Time
                </label>
                <p className="text-sm font-semibold">
                  {selectedField?.slot?.shift?.start_time || ""}-
                  {selectedField?.slot?.shift?.end_time || ""}
                </p>
              </div>
              <div className="group col-span-2 flex w-full flex-col gap-1">
                <label className="label-text">Note</label>
                <textarea
                  onChange={(e) => setNote(e.target.value)}
                  className="h-20 w-full rounded-md border border-gray-muted p-2 text-sm"
                  rows="4"
                />
                {error?.note && <div className="text-sm text-red-500">{error.note}</div>}
              </div>

              {type === 'claim' && (
                <div className="mt-2 flex w-full items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="flex h-11 w-fit min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex h-11 w-fit min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md border border-black bg-black text-sm font-semibold text-white focus:outline-none"
                >
                  Send Request
                </button>
              </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
