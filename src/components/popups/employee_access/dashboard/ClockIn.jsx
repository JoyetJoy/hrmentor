import { Dialog, DialogPanel, Radio, RadioGroup } from "@headlessui/react";
import { X } from "lucide-react";
import React, { useState } from "react";
import { newRequest } from "@/api/master";
import moment from 'moment';

export default function ClockIn({ clockInpopupOpen, setClockInPopupOpen, api, data, clockindata }) {
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState(null);

  function close() {
    setClockInPopupOpen(false);
  } 

  function formatTime(time) {
    if (!time) return "";
    const [hours, minutes, seconds] = time.split(":");
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(!selected){
        return;
      }
      const payload = {
        shift_id: selected?.shift_id,
        roster_id: selected?.id,
      };

      const response = await newRequest.post(api, payload);
      close();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Dialog
      open={clockInpopupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded bg-white/90 px-14 py-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-lg font-bold leading-7 text-textcolor-darkCharcoal">{clockindata?.clock_in_time?'Clock Out':'Clock In'}</h1>
              <button
                onClick={close}
                className="text-xl font-extrabold text-textcolor-darkCharcoal"
              >
                <X />
              </button>
            </div>
            {loader ? (
              <div className="flex min-h-72 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-hrmprimaryorange"></div>
              </div>
            ) : (
              <form className="grid grid-cols-1" onSubmit={handleSubmit}>
                <div className="w-full">
                  <div className="mx-auto w-full max-w-md">
                    <RadioGroup
                      value={selected}
                      onChange={setSelected}
                      aria-label="Time Slots"
                      className="space-y-4"
                    >
                      {clockindata?.shift_detail?(
                        <>
                          <RadioGroup.Option
                            key={clockindata?.shift_detail?.name}
                            value={{ id: clockindata?.shift_detail?.id, shift_id: clockindata?.shift_id }}
                            className="group cursor-pointer"
                            aria-label={`Select ${clockindata?.shift_detail?.name}`}
                            disabled
                          >
                            {({ checked }) => (
                              <div
                                className={`flex w-full flex-col items-start justify-between rounded-lg border px-5 py-1 text-sm/6 transition ${
                                  clockindata
                                    ? "border-hrmprimaryorange bg-hrmprimaryorange/15"
                                    : "border-gray-300 bg-white"
                                }`}
                              >
                                <p className="font-medium text-textcolor-darkCharcoal">
                                  {clockindata?.shift_detail?.name || "Unnamed Shift"}
                                </p>
                                <p className="font-bold text-textcolor-darkCharcoal">
                                  {formatTime(clockindata?.shift_detail?.start_time)} - {formatTime(clockindata?.shift_detail?.end_time)}
                                </p>
                              </div>
                            )}
                          </RadioGroup.Option>
                        
                      
                        </>
                      ):(
                        <>
                        {data?.map((times) => {
                        return (
                          <RadioGroup.Option
                            key={times?.shift?.name}
                            value={{ id: times?.id, shift_id: times?.shift_id }}
                            className="group cursor-pointer"
                            aria-label={`Select ${times?.shift?.name}`}
                          >
                            {({ checked, disabled }) => (
                              <div
                                className={`flex w-full flex-col items-start justify-between rounded-lg border px-5 py-1 text-sm/6 transition ${
                                  disabled
                                    ? "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                                    : checked
                                    ? "border-hrmprimaryorange bg-hrmprimaryorange/15"
                                    : "border-gray-300 bg-white"
                                }`}
                              >
                                <p className="font-medium text-textcolor-darkCharcoal">
                                  {times?.shift?.name}
                                </p>
                                <p className="font-bold text-textcolor-darkCharcoal">
                                  {formatTime(times?.shift?.start_time)} -{" "}
                                  {formatTime(times?.shift?.end_time)}
                                </p>
                                
                              </div>
                            )}
                          </RadioGroup.Option>
                        );
                      })}
                        </>
                      )}
                    </RadioGroup>
                  </div>
                </div>
                <div className="col-span-2 mt-6 flex w-full flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={close}
                    className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md ${
                      loader
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-hrmblack text-white"
                    } text-sm font-normal focus:outline-none`}
                    disabled={loader}
                  >
                    {loader ? (
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-full animate-spin rounded-full border-b-2 border-white"></div>
                        Starting...
                      </div>
                    ) : (
                      <span>{clockindata?.clock_in_time?'Clock Out':'Start'}</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
