import { newRequest } from "@/api";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RecCandidateInterviewActions({
  popupOpen,
  setPopupOpen,
  selectedField,
  setSelectedField,
  qrKey,
  cid,
}) {
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);

  function close() {
    setPopupOpen(false);
    setSelectedField(0);
  }

  const handleChangeStatus = async () => {
    setLoader(true);
    try {
      const res = await newRequest.post(
        `candidate-status-update/${cid}/${selectedField}`,
      );
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        queryClient.invalidateQueries([qrKey]);
        close();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoader(false);
    }
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
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex flex-col items-center gap-3">
              <h1 className="text-base font-bold leading-7 text-neutral-700">
                {selectedField === 3
                  ? "Shortlist the candidate ?"
                  : "Move candidate ?"}
              </h1>
              <p className="text-sm font-medium text-black/70">
                {selectedField === 3
                  ? "Do you want to Shortlist the candidate ?"
                  : "Do you want to move to hiring candidate ?"}
              </p>
            </div>
            <div className="mt-7 flex flex-row items-center justify-center gap-4 px-7">
              <button
                type="button"
                onClick={close}
                className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black/20 text-sm font-semibold text-black focus:outline-none"
              >
                No
              </button>
              <button
                type="button"
                onClick={handleChangeStatus}
                className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                disabled={loader}
              >
                {loader ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    Updating
                  </div>
                ) : (
                  <span>Yes</span>
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
