import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";

const AddEntryModal = ({ addEntry, setAddEntry }) => {
  const close = () => {
    setAddEntry(false);
  };
  return (
    <Dialog open={addEntry} as="div" className="relative z-10" onClose={close}>
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
          {/* Header */}
          <div className="flex justify-between bg-[#354ff3] px-6 py-4">
            <p className="text-lg font-semibold text-white">Add Entry</p>
            <button
              type="button"
              onClick={() => setAttendance(false)}
              className="text-lg font-extrabold text-[#00000080]"
            >
              <X />
            </button>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter details"
              className="w-full rounded-md border p-2"
            />
          </div>

          {/* Buttons */}
          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={close}
              className="rounded-md bg-gray-500 px-3 py-2 text-white"
            >
              Cancel
            </button>
            <button className="rounded-md bg-blue-700 px-3 py-2 text-white">
              Save
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AddEntryModal;
