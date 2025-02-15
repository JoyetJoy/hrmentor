import { ArrowUpFromLine } from "lucide-react";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";

export default function ResumeDragzoneApplyJob({ file, setFile }) {
  const [filePreview, setFilePreview] = useState(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error("Invalid file. Only PDF and image formats up to 5MB are allowed.");
      return;
    }
    
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    if (selectedFile.type.includes("image") || selectedFile.type.includes("pdf")) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setFilePreview(previewUrl);
    } else {
      setFilePreview(null);
    }
  };

  return (
    <>
      {file ? (
        <div className="flex flex-col">
          <div className="flex items-center gap-4 pb-1 pt-10">
            <h1 className="required text-[0.84rem] font-bold">Resume Upload</h1>
            <div
              onClick={() => {
                setFile(null);
                setFilePreview(null);
              }}
              className="cursor-pointer rounded border border-hrmprimaryorange px-2 py-1.5 text-xs font-bold text-black/90"
            >
              Change File
            </div>
          </div>
          <div className="h-full overflow-hidden rounded-lg border border-gray-lightSoft py-2">
            {filePreview ? (
              file.type.includes("image") ? (
                <img
                  src={filePreview}
                  alt="file preview"
                  className="mt-2 h-auto w-full max-w-full"
                />
              ) : (
                <iframe
                  src={filePreview}
                  title="PDF Preview"
                  className="mt-2 h-full w-full"
                  frameBorder="0"
                />
              )
            ) : (
              <p className="text-sm text-gray-500">
                Preview not available for this file type.
              </p>
            )}
          </div>
        </div>
      ) : (
        <Dropzone
          onDrop={onDrop}
          accept={ALLOWED_TYPES.join(", ")}
          maxSize={MAX_FILE_SIZE}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="flex flex-col justify-center">
              <input {...getInputProps()} />
              <h1 className="required pb-1 pt-10 text-[0.84rem] font-bold">
                Resume Upload
              </h1>
              <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg border border-gray-lightSoft py-7">
                <p className="text-sm font-semibold">Upload or drag and drop</p>
                <p className="text-sm text-gray-dark">
                  (Preferred) PDF, PNG, JPG up to 5 MB
                </p>
                <button
                  type="button"
                  className="flex h-10 min-h-10 flex-row items-center justify-center gap-2 rounded-md border border-gray-platinum bg-white px-7 py-1"
                >
                  <ArrowUpFromLine className="size-4" strokeWidth={2} />
                  <h5 className="text-[0.8rem] font-bold">Upload</h5>
                </button>
              </div>
            </div>
          )}
        </Dropzone>
      )}
    </>
  );
}
