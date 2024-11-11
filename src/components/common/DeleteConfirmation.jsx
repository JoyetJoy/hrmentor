import { newRequest } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteConfirmation({
  open,
  selectedId,
  onCancel,
  type,
  setNew_break,
  setSelectedEmployees,
  qrkey,
  api,
}) {
  const [loader, setLoader] = useState(false);
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    try {
      setLoader(true);console.log('kp');
      
      if(type!=='break'&& type!=='roster' ){
        const res = await newRequest.delete(`${api}/${selectedId}`);
        if (res?.data?.status === 200) {
          queryClient.invalidateQueries([qrkey]);
          setLoader(false);
          toast.success(res?.data?.message);
          onCancel(false);
        }
      }else {
        if (type === 'break') {
          setNew_break((prevBreaks) => prevBreaks.filter((breakTime) => breakTime.id !== selectedId));
          toast.success("Deleted break time successfully");
        }
        console.log('hii');
        // if (type === 'roster') {
        //   console.log('jii');
      
        //   setSelectedEmployees((prevEmployees) => prevEmployees.filter((selectedEmployees) => selectedEmployees.unique_id !== selectedId));
        //   toast.success("Deleted roster item successfully");
        // }
        if (type === 'roster') {
          console.log('Attempting to delete roster item');
          console.log('Selected ID:', selectedId);
          console.log('Selected Employees before delete:', employee);
        
          setSelectedEmployees((prevEmployees) =>
            prevEmployees.filter((selectedEmployees) => selectedEmployees.value !== selectedId)
          );
          toast.success("Deleted roster item successfully");
        }
  
        setLoader(false);
        onCancel(false);
      }
    } catch (error) {
      setLoader(false);
      onCancel(false);
      toast.error(error?.response?.data?.message);
      console.error(error);
    }
  };
  
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-extrabold text-black/70">
              Confirm Delete
            </h2>
            <p className="mt-2 text-sm text-gray-medium">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  onCancel(false);
                }}
                className="rounded-lg border border-gray-light px-4 py-2 text-sm font-semibold text-gray-medium hover:bg-gray-smoke"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                {loader ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    Deleting
                  </div>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
