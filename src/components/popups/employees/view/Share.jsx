import { newFormRequest, SEND_ONBORDING } from "@/api";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Share2, X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Share({ sharePopupOpen, setSharePopupOpen,uid }) {
  
  const [isLoader,setIsLoader] =useState();
  const handleShare = async () => {
    try {
      setIsLoader(true);
      const response = await newFormRequest.post(`${SEND_ONBORDING}/${uid}`);

      if (response?.status === 200) {
        toast.success("Form shared successfully");
        setSharePopupOpen(false)
      } else {
        toast.error("Failed to share");
      }
    } catch (error) {
      console.error("Error sharing the form:", error);
      toast.error(
        error?.response?.data?.error ||
          "Failed to share the form. Please try again!",
      );
    } finally {
      setIsLoader(false); 
    }
  };
  const onClose = () => {
    setSharePopupOpen(false);
  };
  return (
    <Dialog
      open={sharePopupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] h-full w-full max-w-md rounded bg-white/90 p-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.99rem] font-bold leading-7 text-neutral-700">
                Share
              </h1>
              <button
                onClick={onClose}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>
            <p className="mt-2 text-sm text-black">
              Do u want to share the form?
            </p>
            <div className="mt-3 flex flex-row gap-3">
              <button
                onClick={onClose}
                className="flex h-11 w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#cecdcd] text-sm font-normal text-black focus:outline-none"
              >
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="flex h-11 w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                onClick={() => {
                  handleShare();
                }}
              >
                {isLoader ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    Sharing
                  </div>
                ) : (
                  <>
                    <Share2 className="size-4" color="white" />
                    <span> Share</span>
                  </>
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
