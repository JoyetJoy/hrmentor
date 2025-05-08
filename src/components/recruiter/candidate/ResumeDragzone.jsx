import { ArrowUpFromLine } from "lucide-react";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";

export default function ResumeDragzone({
  file,
  types,
  setFile,
  filePreview,
  setFilePreview,
}) {
  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile.size > 1024 * 1024 * 5) {
      toast.error("File size exceeds 5MB. Please upload a smaller file.");
      return;
    }
    setFile(selectedFile);

    // Generate a preview for images or PDFs
    if (
      selectedFile.type.includes("image") ||
      selectedFile.type.includes("pdf")
    ) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setFilePreview(previewUrl);
    } else {
      setFilePreview(null); // Clear preview if file is not supported
    }
  };

  return (
    <>
      {file ? (
        <div className="flex flex-col">
          <div className="flex items-center gap-4 pb-1 pt-14">
            <h1 className="text-[0.84rem] font-bold">Resume Upload</h1>
            {types==2 &&(
              <div
              onClick={() => setFile(null)}
              className="cursor-pointer rounded border border-hrmprimaryorange px-2 py-1.5 text-xs font-bold text-black/90"
            >
              Change File
            </div>
            )}
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
              <iframe
                src={file}
                title="PDF Preview"
                className="mt-2 h-full w-full"
                frameBorder="0"
              />
            )}
          </div>
        </div>
      ) : (
        <Dropzone onDrop={onDrop} accept={{
          "application/pdf": [".pdf"],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
          "application/msword": [".doc"],
        }}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="flex flex-col justify-center">
              <input {...getInputProps()} />
              <h1 className="pb-1 pt-14 text-[0.84rem] font-bold">
                Resume Upload
              </h1>
              <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-gray-lightSoft py-2">
                <p className="text-sm font-semibold">Upload or Drag and Drop</p>
                <p className="text-sm text-gray-dark">
                  (Preferred), DOCX, DOC, PDF up to 5 MB
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
