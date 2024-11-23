import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RejectCandidate({ open, setPopupOpen, selectedField }) {
  const handleReject = () => {};

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm rounded bg-white px-9 py-7 shadow-lg">
            <h2 className="text-base font-semibold text-black/70">
              Reason for Rejection
            </h2>
            <textarea
              className="mt-3 h-20 w-full rounded border px-2 text-sm"
              name=""
              id=""
            ></textarea>
            <div className="mt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  setPopupOpen(false);
                }}
                className="h-10 w-full rounded-lg border border-black/20 px-4 text-sm font-semibold text-black/70 hover:bg-gray-pale"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-black/80 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
