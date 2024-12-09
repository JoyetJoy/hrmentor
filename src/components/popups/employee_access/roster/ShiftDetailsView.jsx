import { Dialog, DialogPanel } from '@headlessui/react';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ROASTER_GET, newRequest } from "@/api/master";
import { useQuery } from "@tanstack/react-query";

export default function ShiftDetailsView({ popupOpen, setPopupOpen, selectedField, convertTo12HourFormat }) {

  const { data, refetch } = useQuery({
    queryKey: ['shiftDetails', selectedField?.id], // Array of query keys
    queryFn: () => newRequest.get(`${ROASTER_GET}/${selectedField?.id}`).then((res) => res.data),
    enabled: !!selectedField,  // Only run query if selectedField is defined
  });
  

  useEffect(() => {
    if (popupOpen && selectedField?.id) {
      refetch();  // Refetch the data every time the popup opens and selectedField changes
    }
  }, [popupOpen, selectedField, refetch]);

  function close() {
    setPopupOpen(false);
  }

  function convertToHourMinutes(time){
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  }

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
            className="justify-between data-[closed]:transform-[scale(95%)] w-full max-w-md rounded bg-white/90 px-12 py-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-lg font-bold leading-7 text-textcolor-darkCharcoal">
                Shift details
              </h1>
              <button
                onClick={close}
                className="text-xl font-extrabold text-textcolor-darkCharcoal"
              >
                <X />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 gap-y-7 justify-between">
              {/* Rendering Shift Details */}
              <div className="group col-span-2 flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  {data?.shift?.name}
                </label>
                <p className="text-sm font-semibold">{convertTo12HourFormat(data?.shift?.start_time||'')}-{convertTo12HourFormat(data?.shift?.end_time||'')}</p>
              </div>
              <div className="group flex flex-col space-y-1">
                <label className="text-[0.8rem] font-medium text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Clock in time
                </label>
                <p className="text-sm font-semibold">{convertTo12HourFormat(data?.shift?.start_time||'')}</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Clock Out</label>
                <p className="text-sm font-semibold">3:00pm</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Over time</label>
                <p className="text-sm font-semibold">30:00</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Break time</label>
                <p className="text-sm font-semibold">07:55 min</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Total work time</label>
                <p className="text-sm font-semibold">{convertToHourMinutes(data?.shift?.shift_duration||'00:00:00')} Hr</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Members</label>
                <p className="text-sm font-semibold">{data?.shift?.people_required||'0'}</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Department</label>
                <p className="text-sm font-semibold">{data?.shift?.department?.department_name||''}</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Work Location</label>
                <p className="text-sm font-semibold">{data?.shift?.location?.work_location_name||''}</p>
              </div>
              <div className="group flex w-full flex-col gap-1">
                <label className="label-text">Work Area</label>
                <p className="text-sm font-semibold">{data?.shift?.work_area?.name||''}</p>
              </div>
              <div className="mt-2 flex w-full items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="flex h-11 w-fit min-w-40 cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
