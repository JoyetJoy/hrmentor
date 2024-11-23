export default function ResumePreview({
  file,
  setFile,
  filePreview,
  setFilePreview,
}) {
  return (
    <>
      {file ? (
        <div className="flex flex-col">
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
      ) : null}
    </>
  );
}
