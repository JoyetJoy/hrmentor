import { newFormRequest } from "@/api";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UploadConfirmation({
  open,
  setPopupOpen,
  resume,
  setResume,
  setResumeFileName,
  api,
}) {
  const [loader, setLoader] = useState(false);
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume_file", resume);
    try {
      setLoader(true);
      const res = await newFormRequest.post(api, formData);
      if (res?.data?.status === 201) {
        setResumeFileName(res?.data?.data);
        setLoader(false);
        toast.success(res?.data?.message);
        setPopupOpen(false);
      }
    } catch (error) {
      setLoader(false);
      setPopupOpen(false);
      toast.error(error?.response?.data?.message);
      console.error(error);
    }
  };
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-extrabold text-black/70">
              Confirm File Upload
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to upload this file?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setResume("");
                  setPopupOpen(false);
                }}
                className="rounded-lg border border-black/20 px-4 py-2 text-sm font-semibold text-black/70 hover:bg-gray-100"
              >
                Change File
              </button>
              <button
                type="button"
                onClick={handleUpload}
                className="flex items-center gap-2 rounded-lg bg-hrmprimaryorange px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                {loader ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    Uploading
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UploadCloud />
                    Upload
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
