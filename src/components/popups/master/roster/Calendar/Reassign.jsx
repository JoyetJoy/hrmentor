import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { newRequest, SHIFT_CLAIM } from "@/api";
import toast from "react-hot-toast";

function Reassign({ popupOpen, setPopupOpen, type, id, onConfirm }) {
  const [claimcount, setClaimcount] = useState(0);

  const handleSave = async () => {
    try {
      if (type === "claim") {
        const data = { roster_id: id, auto_close_at_claim: claimcount };
        const res = await newRequest.post(SHIFT_CLAIM, data);
        toast.success(res?.data?.message);

        // Close modal & confirm checkbox update
        setPopupOpen(false);
        onConfirm(); // Call the function to update checkbox state
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Dialog open={popupOpen} as="div" className="relative z-10" onClose={() => setPopupOpen(false)}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-[26rem] rounded bg-white p-10">
            <div className="mb-5 flex justify-between">
              <DialogTitle as="h1" className="text-md font-bold">Shift Claim</DialogTitle>
              <button onClick={() => setPopupOpen(false)} className="text-gray-500 hover:text-black">
                <X />
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <p>Auto Close at</p>
              <input
                type="number"
                className="h-8 w-40 rounded-md border px-2 text-sm"
                value={claimcount}
                onChange={(e) => setClaimcount(e.target.value.replace(/[eE]/g, ""))}
              />
              <p>Requests</p>
            </div>
            <div className="mt-5 flex w-full items-center justify-center">
              <button
                type="button"
                onClick={handleSave}
                className="w-[48%] rounded bg-black py-2 text-white"
              >
                Update
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default Reassign;
