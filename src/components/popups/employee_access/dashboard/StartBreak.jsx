import { BREAKLIST, newRequest } from "@/api";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function StartBreak({ breakpopupOpen, setBreakPopupOpen }) {
  const [selectedBreak, setSelectedBreak] = useState(null);
  const [note, setNote] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const shiftid = localStorage.getItem('shiftid');

  // Fetch break list when the popup opens
  const { data: breaklist, refetch } = useQuery({
    queryKey: ["breaklist", shiftid],
    queryFn: () => newRequest.get(`${BREAKLIST}/${shiftid}`).then((res) => res.data),
    enabled: false, // Disabled by default, so it doesn't run on initial render
  });

  // Trigger refetch when the popup is opened
  useEffect(() => {
    if (breakpopupOpen) {
      refetch();
    }
  }, [breakpopupOpen, refetch]);

  function close() {
    setBreakPopupOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBreak) {
      setError("Please select a break time.");
      return;
    }
    setError("");
    setLoader(true);
    // Add form submission logic here
  };

  return (
    <Dialog
      open={breakpopupOpen}
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
              <h1 className="text-lg font-bold leading-7 text-textcolor-darkCharcoal">
                Start Break
              </h1>
              <button
                onClick={close}
                className="text-xl font-extrabold text-textcolor-darkCharcoal"
              >
                <X />
              </button>
            </div>
            <form className="grid grid-cols-1" onSubmit={handleSubmit}>
              <div className="w-full">
                <div className="mx-auto w-full max-w-md">
                  <div className="space-y-4">
                    {(breaklist || []).map((breakTime) => (
                      <div
                        key={breakTime.id}
                        onClick={() => setSelectedBreak(breakTime)}
                        className={`cursor-pointer flex w-full flex-col items-start justify-between rounded-lg border px-5 py-1 text-sm/6 transition ${
                          selectedBreak?.id === breakTime.id
                            ? "border-hrmprimaryorange bg-hrmprimaryorange/15"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        <p className="font-medium text-textcolor-darkCharcoal">
                          {breakTime.type_name}
                        </p>
                        <p className="font-bold text-textcolor-darkCharcoal">
                          Duration :{breakTime.break_time_duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>          

                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
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
                    <span>Start</span>
                  )}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
