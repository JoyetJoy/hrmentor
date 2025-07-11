import { newRequest } from "@/api";
import { CREATE_PAYRUN } from "@/api/setup";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PayrunConfirmation({
  popupOpen,
  setPopupOpen,
  monthValue,
  startDate,
  endDate,
  start,
  end,
}) {
  const [loader, setLoader] = useState(false);

  const CreatePayrun = async () => {
    const body = {
      pay_schedule: monthValue,
      start_date: start,
      end_date: end,
    };
    try {
      setLoader(true);
      const response = await newRequest.post(CREATE_PAYRUN, body);
      setLoader(false);
      toast.success("Payroll created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try after somtimes");
      setLoader(false);
    } finally {
      setPopupOpen(false);
    }
  };

  return (
    <>
      {popupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-extrabold text-black/70">
              Confirm Submission
            </h2>
            <p className="mt-2 text-sm text-gray-medium">
              Are you sure you want to generate the payroll from {startDate} to{" "}
              {endDate}?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  setPopupOpen(false);
                }}
                className="rounded-lg border border-gray-light px-4 py-2 text-sm font-semibold text-gray-medium hover:bg-gray-smoke"
              >
                Cancel
              </button>
              <button
                onClick={CreatePayrun}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                {loader ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    Creating
                  </div>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
