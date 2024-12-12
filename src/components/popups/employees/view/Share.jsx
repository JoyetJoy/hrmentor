import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Share2, X } from 'lucide-react';
import React from 'react'

export default function Share({sharePopupOpen,setSharePopupOpen}) {
    const handleSave = () => {
        setSharePopupOpen(false);
      };
      const onClose = () => {
        setSharePopupOpen(false);
      };
  return (
    <Dialog
      open={sharePopupOpen}
      as="div"
      className="relative z-10"
      onClose={onClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-[26rem] rounded bg-white p-10">
            <div className="mb-5 flex justify-between">
              <DialogTitle as="h1" className="text-md font-bold">
                Share
              </DialogTitle>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-black"
              >
                <X />
              </button>
            </div>
           <p className='text-xs '>Do you want to share the form? </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded border border-black px-4 py-3"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="w-full rounded bg-black px-7 py-2 flex items-center justify-center gap-1 text-white"
              >
                <Share2 className='size-4'/>Share
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
