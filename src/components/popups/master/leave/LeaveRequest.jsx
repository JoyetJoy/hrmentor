import { BreakTimeSchema } from "@/schema/dashboard/masters/shift.schema";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { X,ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export default function LeaveRequest({
  popupOpen,
  setPopupOpen,
  
}) {
    const [showLeaveList, setShowLeaveList] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [rejected,setRejected] = useState(false);
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      mode: "onChange",
      resolver: yupResolver(BreakTimeSchema),
    });
  
    const onSubmit = async (data) => {
      await handleShift(data);
      close();
    };
  
    const handleShift = async (data) => {
      
    };
  
    function close() {
      setPopupOpen(false);
      reset();
    }
  
  return (
    <Dialog
      open={popupOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-md h-full rounded bg-white/90 p-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="mb-7 flex items-center justify-between">
              <h1 className="text-[0.99rem] font-bold leading-7 text-neutral-700">
                View leave request
              </h1>
              <button
                onClick={close}
                className="text-lg font-extrabold text-[#00000080]"
              >
                <X />
              </button>
            </div>
            <form
              className="grid grid-cols-1n gap-1"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="group flex flex-col space-y-1 mt-3 font-medium text-[0.85rem]">
                <p className=" font-extrabold text-[0.95rem] text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Mathew
                </p>
                <p >#12345</p>
                <p>Department</p>
              </div>
              <div className="group flex justify-between mt-5 font-medium text-[0.85rem]">
                <div className="flex flex-col">
                <p >Start Date</p>
                <p className=" font-extrabold text-[0.95rem] text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Oct 14, 2022
                </p>
                </div>
                <div>
                <p >End Date</p>
                <p className=" font-extrabold text-[0.95rem] text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Oct 14, 2022
                </p>
                </div>
              </div>
              <div className="group flex justify-between space-y-1 mt-5 font-medium text-[0.85rem]">
                <div>
                <p >Leave Type</p>
                <p className=" font-extrabold text-[0.95rem] text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Sick Leave
                </p>
                </div>
                <div className="w-[25%]">
                <p >Leave Count</p>
                <p className=" font-extrabold text-[0.95rem] text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  1 Day
                </p>
                </div>
              </div>
              <div className="group flex justify-between space-y-1 mt-5 font-medium text-[0.85rem]">
                <div>
                <p >Applied on</p>
                <p className=" font-extrabold text-[0.95rem] text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  Oct 14, 2022
                </p>
                </div>
                <div className="w-[25%]">
                <p >LOP Days</p>
                <p className=" font-extrabold text-[0.95rem] text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  1
                </p>
                </div>
              </div>
              <div className="group flex flex-col justify-between space-y-1 mt-5 font-medium text-[0.85rem]">
                <p >Description</p>
                <p className=" font-extrabold text-[0.95rem] text-[#3A3A3A] group-focus-within:text-[#2E2E2E]">
                  This term is not commonly used in the UK. In other countries,casual leave is a general term including all holidays or annual leave, other than mandatory/leagally defined or statutory leave.
                </p>
              </div>
              <div className="group flex space-y-1 mt-5 items-center font-medium text-[0.85rem] text-[#030e5c] cursor-pointer"
                onClick={() => setShowLeaveList((prev) => !prev)}>
                <p >Available Leaves</p>
                <span>
                    <ChevronDown size={24} color="#1f008f" strokeWidth={0.75} />
                </span>
              </div>
              {showLeaveList && (
              <div className="group grid grid-cols-3 w-full p-3 justify-between space-y-1 gap-3 mt-5 font-medium text-[0.85rem] border border-[#cecdcd] rounded-md">
                <div className="pt-1">
                <p >Casual Leave</p>
                <p>0/5</p>
                </div>
                <div>
                <p >Sick Leave</p>
                <p>0/5</p>
                </div>
                <div>
                <p >Comp Off</p>
                <p>0/5</p>
                </div>
                <div>
                <p >Lop</p>
                <p>0/5</p>
                </div>
                <div>
                <p >Comp Off</p>
                <p>0/5</p>
                </div>
                <div>
                <p >Special Leave</p>
                <p>0/5</p>
                </div>
              </div>)}
              <div className="group flex items-center gap-3 mt-5 font-medium text-[0.85rem]">
                <div className="flex items-center gap-2">
                    <input
                    type="radio"
                    name="leaveStatus" 
                    value="pending"
                    onClick={()=>setRejected(false)}
                    className="radio-black " 
                    defaultChecked
                    />
                    <label className="text-sm font-normal">Pending</label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                    type="radio"
                    name="leaveStatus"
                    value="approved"
                    onClick={()=>setRejected(false)}
                    className="radio-black "
                    />
                    <label className="text-sm font-normal">Approved</label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                    type="radio"
                    name="leaveStatus" 
                    value="rejected"
                    onClick={()=>setRejected(true)}
                    className="radio-black "
                    />
                    <label className="text-sm font-normal">Rejected</label>
                </div>
              </div>
              {rejected&&
              <div className="font-medium text-[0.85rem] flex flex-col gap-2 mt-2 ">
              <label >Reason for rejection</label>
                <textarea className="w-full p-1 h-20 border border-[#cecdcd] rounded-md" placeholder="Enter your reason here..."></textarea>
              </div>}
              <div className="mt-3 flex flex-row gap-3">
              <button
                  onClick={close}
                  className="flex h-11 w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md  text-black text-sm font-normal border border-[#cecdcd] focus:outline-none"
                >
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="flex h-11 w-1/2 cursor-pointer items-center justify-center gap-2 rounded-md bg-hrmblack text-sm font-normal text-white focus:outline-none"
                >
                  <span>Save</span>
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
