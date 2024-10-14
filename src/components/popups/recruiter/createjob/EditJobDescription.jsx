import Loader from "@/components/ui/Loader";
import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditJobDescriptionRecruiterJobForm({
  popupOpen,
  setPopupOpen,
  jobDescription,
  setJobDescription,
}) {
  const [loader, setLoader] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setLoader(true);
    if (jobDescription) {
      setDescription(jobDescription);
      setLoader(false);
    }
  }, [jobDescription, setDescription]);

  function close() {
    setPopupOpen(false);
  }

  const handleSave = () => {
    setJobDescription(description);
    close();
  };
  return (
    <Dialog
      open={popupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex h-full min-h-full items-center justify-end">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] relative h-full w-full max-w-lg bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.94rem] font-bold leading-7 text-neutral-700">
                Update Job Description
              </h1>
              <button
                onClick={close}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>
            <div className="flex h-fit flex-col justify-between gap-3">
              {loader ? (
                <Loader />
              ) : (
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  placeholder={"Type here.."}
                  className="h-full w-full flex-grow rounded-md bg-[#F5F5F5] placeholder:text-[#8b8b8b]"
                />
              )}
            </div>
            <div className="absolute inset-x-0 bottom-4 mt-2 flex flex-row items-center justify-center gap-3 px-5">
              <button
                type="button"
                onClick={handleSave}
                className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
              >
                <span>Update</span>
              </button>
              <button
                type="button"
                onClick={close}
                className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-black text-sm font-semibold text-black focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
