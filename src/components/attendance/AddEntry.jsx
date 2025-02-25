import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Validation Schema
const schema = yup.object().shape({
  checkIn: yup
    .string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)")
    .required("Check-in time is required"),
  checkOut: yup
    .string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)")
    .required("Check-out time is required"),
  remarks: yup.string().min(5, "Remarks should be at least 5 characters").optional(),
});

const AddEntryModal = ({ addEntry, setAddEntry }) => {
  const close = () => {
    setAddEntry(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Handle Form Submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    close(); // Close modal after submission
  };

  const formatTime = (input) => {
    console.log(input);
    
    let value = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    // Format input as HH:MM
    if (value.length >= 3) {
      value = value.slice(0, 2) + ":" + value.slice(2, 4); // Insert colon
    }

    return value;
  };


  return (
    <Dialog open={addEntry} as="div" className="relative z-10" onClose={close}>
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
          {/* Header */}
          <div className="flex justify-between bg-[#555c5f] px-6 py-4">
            <p className="text-lg font-semibold text-white">Add Entry</p>
            <button onClick={close} className="text-lg font-extrabold text-white">
              <X />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4 px-6 py-4">
            {/* ✅ Check-in Time */}
            <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Clock-in Time</label>
              <input
                type="text"
                {...register("checkIn")}
                onChange={(e) => {
                    e.target.value = formatTime(e.target.value); // Call the helper function
                  }}
                className="w-full p-2 border rounded-md mt-1"
                placeholder="Enter time (HH:mm)"
              />
              {errors.checkIn && <p className="text-red-500 text-xs">{errors.checkIn.message}</p>}
            </div>

            {/* ✅ Check-out Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Check-out Time</label>
              <input
                type="text"
                {...register("checkOut")}
                onChange={(e) => {
                    e.target.value = formatTime(e.target.value); // Call the helper function
                  }}
                className="w-full p-2 border rounded-md mt-1"
                placeholder="Enter time (HH:MM)"
              />
              {errors.checkOut && <p className="text-red-500 text-xs">{errors.checkOut.message}</p>}
            </div>

            </div>
            {/* ✅ Remarks */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Remarks</label>
              <textarea
                {...register("remarks")}
                className="w-full p-2 border rounded-md mt-1"
                rows="3"
                placeholder="Optional"
              ></textarea>
              {errors.remarks && <p className="text-red-500 text-xs">{errors.remarks.message}</p>}
            </div>

            {/* ✅ Buttons */}
            <div className="flex  gap-3">
              <button
                type="button"
                onClick={close}
                className="px-3 py-2 w-full bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button type="submit" className="px-3 w-full py-2 bg-blue-700 text-white rounded-md">
                Save
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AddEntryModal;
